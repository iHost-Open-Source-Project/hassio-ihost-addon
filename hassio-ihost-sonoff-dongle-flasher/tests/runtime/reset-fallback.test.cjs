require('./home.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const { test, beforeEach, afterEach } = require('node:test');
const { Transport, TransportEvent } = require('../../src/utils/bootloader/transport');
const { EFirmwareTag } = require('../../src/utils/bootloader/enums');
const { EDeviceType } = require('../../src/types/interface/IDevice');
const reset = require('../../src/utils/reset');

// Keep private detector access in the test, with the packaged module's real dependencies.
const filename = require.resolve('../../src/controllers/hardware');
const hardware = new Module(filename, module);
hardware.filename = filename;
hardware.paths = Module._nodeModulePaths(path.dirname(filename));
hardware._compile(fs.readFileSync(filename, 'utf8') + ';exports.getFirmwareInfo=getFirmwareInfo;', filename);
const { getFirmwareInfo } = hardware.exports;

const original = {
    initPort: Transport.prototype.initPort,
    close: Transport.prototype.close,
    serialSet: Transport.prototype.serialSet,
    gpioReset: reset.gpioReset,
};
const multiPanQuery = Buffer.from([0x14, 0x00, 0x0a, 0x00, 0xc4, 0x55, 0xd3, 0x02, 0x00, 0x04, 0x00, 0x03, 0x00, 0x00, 0x00, 0xdb, 0x12]);
let radio, open, attempts, resetPending, startupDelivered, queries;

function startup(transport) {
    if (transport.portConf.baudRate !== radio.baudRate) return;
    startupDelivered = true;
    if (radio.kind === 'router') {
        transport.emit(TransportEvent.DATA, Buffer.from('EmberZNet v'));
        transport.emit(TransportEvent.DATA, Buffer.from('6.10.3\r\n'));
    } else {
        transport.emit(TransportEvent.DATA, Buffer.from([0x14, 0x00]));
    }
}

beforeEach(t => {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    radio = { kind: 'multipan', baudRate: 115200 };
    open = new Set();
    attempts = [];
    resetPending = false;
    startupDelivered = false;
    queries = 0;
    // Only the physical serial/GPIO boundary is fake; bootloader waits and parsers stay real.
    Transport.prototype.initPort = async function () {
        assert.equal(open.size, 0, 'The preceding transport must close before trying another rate');
        open.add(this);
        attempts.push(this.portConf.baudRate);
        this.portWriter = { writeBuffer: request => {
            assert(open.has(this), 'Version requests require an open transport');
            assert.deepEqual(request, multiPanQuery);
            assert.equal(radio.kind, 'multipan');
            assert.equal(this.portConf.baudRate, radio.baudRate);
            queries++;
            const reply = Buffer.alloc(24);
            reply[0] = 0x14;
            reply[15] = 4;
            reply[19] = 6;
            reply[23] = 0;
            queueMicrotask(() => this.emit(TransportEvent.DATA, reply));
        } };
    };
    Transport.prototype.close = async function () { open.delete(this); };
    Transport.prototype.serialSet = async function (signals) {
        assert(open.has(this), 'RTS reset requires an open transport');
        if (signals.rts === true && signals.dtr === false) resetPending = true;
        if (signals.dtr === true) {
            resetPending = false;
            startup(this);
        }
    };
    reset.gpioReset = async () => {
        assert.equal(open.size, 1, 'GPIO reset must happen after the listener port opens');
        startup([...open][0]);
    };
});

afterEach(t => {
    Transport.prototype.initPort = original.initPort;
    Transport.prototype.close = original.close;
    Transport.prototype.serialSet = original.serialSet;
    reset.gpioReset = original.gpioReset;
    t.mock.timers.reset();
    assert.equal(open.size, 0, 'Fallback must release every transport');
});
async function detect(t, deviceType) {
    let done = false, result, failure;
    getFirmwareInfo('/dev/test-no-hardware', deviceType).then(
        value => { done = true; result = value; },
        error => { done = true; failure = error; },
    );
    for (let i = 0; !done && i < 50; i++) {
        await new Promise(setImmediate);
        if (done || startupDelivered) continue;
        // Retain the real RTS pulse delay; only silent rates may exhaust a tag timeout.
        t.mock.timers.tick(resetPending ? 10 : 10000);
    }
    assert(done, 'Immediate startup must resolve the armed waiter without advancing a tag timeout');
    if (failure) throw failure;
    return result;
}

test('an immediate MultiPAN startup during RTS reset yields the real queried version', async t => {
    assert.deepEqual(await detect(t, 'SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2'), {
        type: EFirmwareTag.MULTI_PAN,
        version: '4.6.0',
    });
    assert.deepEqual(attempts, [115200]);
    assert.equal(queries, 1);
    assert.equal(open.size, 0);
});

test('iHost opens and arms its listener before GPIO reset emits immediate router startup', async t => {
    radio.kind = 'router';
    assert.deepEqual(await detect(t, EDeviceType.IHOST_MG21), {
        type: EFirmwareTag.ZIGBEE_ROUTER,
        version: '6.10.3',
    });
    assert.deepEqual(attempts, [115200]);
    assert.equal(open.size, 0);
});

test('fallback returns the identity found at the final 230400 rate and releases its transport', async t => {
    radio.baudRate = 230400;
    assert.deepEqual(await detect(t, 'SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2'), {
        type: EFirmwareTag.MULTI_PAN,
        version: '4.6.0',
    });
    assert.deepEqual(attempts, [115200, 460800, 230400]);
    assert.equal(queries, 1);
    assert.equal(open.size, 0);
});
