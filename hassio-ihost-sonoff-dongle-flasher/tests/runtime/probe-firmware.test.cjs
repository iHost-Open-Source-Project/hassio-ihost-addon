require('./home.cjs');
const assert = require('node:assert/strict');
const { test, beforeEach, afterEach } = require('node:test');
const { CRC } = require('crc-full');
const { Transport, TransportEvent } = require('../../src/utils/bootloader/transport');
const ember = require('../../src/utils/bootloader/ember');
const { Ezsp } = require('zigbee-herdsman/dist/adapter/ember/ezsp/ezsp');
const { EzspBuffalo } = require('zigbee-herdsman/dist/adapter/ember/ezsp/buffalo');
const { probeUsbFirmware } = require('../../probe-firmware.cjs');

const original = { initPort: Transport.prototype.initPort, close: Transport.prototype.close, start: ember.emberStart, stop: ember.emberStop };
let radio, rawOpen, ncpOpen, attempts;

function spinelVersion(text, corrupt = false) {
    const payload = Buffer.concat([Buffer.from([0x81, 0x06, 0x02]), Buffer.from(text), Buffer.from([0])]);
    const checksum = CRC.default('CRC16_X_25').compute([...payload]);
    const bytes = [...payload, checksum & 0xff, checksum >> 8];
    if (corrupt) bytes[bytes.length - 1] ^= 1;
    const escaped = bytes.flatMap(byte => [0x7e, 0x7d, 0x11, 0x13].includes(byte) ? [0x7d, byte ^ 0x20] : [byte]);
    return Buffer.from([0x7e, ...escaped, 0x7e]);
}

function ncpClient(protocol = 19) {
    const client = new Ezsp({ adapter: 'ember', path: '/dev/test-no-hardware', baudRate: radio.baudRate });
    client.sendCommand = async request => {
        const bytes = request.getWritten();
        const legacy = !client.initialVersionSent;
        const command = legacy ? bytes[2] : bytes.readUInt16LE(3);
        let response;
        if (command === 0x00) {
            client.initialVersionSent = true;
            response = Buffer.from([protocol, 2, 0x20, 0x91]);
        } else if (command === 0xaa) {
            assert.equal(bytes[5], 0x11);
            response = Buffer.from([0, 0, 0, 0, 7, 0x78, 0x56, 9, 1, 2, 0, 0xaa]);
        } else {
            throw new Error('Unexpected NCP command');
        }
        client.buffalo = new EzspBuffalo(response, 0);
        return 0;
    };
    return client;
}

beforeEach(t => {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    radio = { kind: 'none', baudRate: 460800 };
    rawOpen = 0;
    ncpOpen = 0;
    attempts = [];
    // Replace only physical link operations; retain the actual bootloader and version decoders.
    Transport.prototype.initPort = async function () {
        if (radio.busy) throw Object.assign(new Error('Cannot lock port'), { code: 'EBUSY' });
        assert.equal(ncpOpen, 0, 'Raw transport must not overlap an NCP session');
        this.testOpen = true;
        rawOpen++;
        attempts.push(['spinel', this.portConf.baudRate]);
        this.portWriter = { writeBuffer: request => {
            assert.equal(request[0], 0x7e);
            if (radio.kind !== 'spinel' || this.portConf.baudRate !== radio.baudRate) return;
            const response = spinelVersion(radio.version, radio.corrupt);
            queueMicrotask(() => {
                if (radio.fragmented) {
                    const split = radio.splitAt || 12;
                    this.emit(TransportEvent.DATA, response.subarray(0, split));
                    this.emit(TransportEvent.DATA, response.subarray(split));
                } else {
                    this.emit(TransportEvent.DATA, response);
                }
            });
        } };
    };
    Transport.prototype.close = async function () {
        if (this.testOpen) { this.testOpen = false; rawOpen--; }
    };
    ember.emberStart = async config => {
        assert.equal(rawOpen, 0, 'Raw transport must close before opening the NCP client');
        attempts.push(['ncp', config.baudRate]);
        if (radio.kind !== 'ncp' || config.baudRate !== radio.baudRate) throw new Error('No ASH response');
        ncpOpen++;
        return ncpClient(radio.protocol);
    };
    ember.emberStop = async () => { ncpOpen--; };
});
afterEach(t => {
    Transport.prototype.initPort = original.initPort;
    Transport.prototype.close = original.close;
    ember.emberStart = original.start;
    ember.emberStop = original.stop;
    t.mock.timers.reset();
    assert.equal(rawOpen, 0, 'Raw port must always be released');
    assert.equal(ncpOpen, 0, 'NCP port must always be released');
});
async function detect(t, baudRate = 115200) {
    let done = false, result, failure;
    probeUsbFirmware({ path: '/dev/test-no-hardware', baudRate, rtscts: false })
        .then(value => { done = true; result = value; }, error => { done = true; failure = error; });
    for (let i = 0; !done && i < 200; i++) {
        await new Promise(setImmediate);
        t.mock.timers.tick(10000);
    }
    assert(done, 'Probe must finish after its bounded protocol timeouts');
    if (failure) throw failure;
    return result;
}

test('Zigbee 9.1.2 is actively queried at 460800 without a startup banner', async t => {
    radio.kind = 'ncp';
    assert.deepEqual(await detect(t), { firmwareType: 'Zigbee', firmwareVersion: '9.1.2' });
    assert(attempts.some(([kind, baud]) => kind === 'ncp' && baud === 460800));
});
test('official OpenThread replies are identified without unsolicited startup data', async t => {
    Object.assign(radio, { kind: 'spinel', version: 'SL-OPENTHREAD/2.4.4.0; EFR32' });
    assert.deepEqual(await detect(t), { firmwareType: 'OpenThread', firmwareVersion: 'SL-OPENTHREAD/2.4.4.0' });
});
test('community OpenThread replies with three or four version components are decoded', async t => {
    Object.assign(radio, { kind: 'spinel', version: 'OPENTHREAD/2.7.2.0; EFR32' });
    assert.deepEqual(await detect(t), { firmwareType: 'OpenThread', firmwareVersion: 'OPENTHREAD/2.7.2.0' });
    radio.version = 'OPENTHREAD/3.1.2; EFR32';
    assert.deepEqual(await detect(t, 460800), { firmwareType: 'OpenThread', firmwareVersion: 'OPENTHREAD/3.1.2' });
});
test('fragmented HDLC version replies remain recognizable', async t => {
    Object.assign(radio, { kind: 'spinel', version: 'OPENTHREAD/2.7.2.0; EFR32', fragmented: true });
    assert.deepEqual(await detect(t), { firmwareType: 'OpenThread', firmwareVersion: 'OPENTHREAD/2.7.2.0' });
});
test('an HDLC opening delimiter received alone is retained for the following bytes', async t => {
    Object.assign(radio, { kind: 'spinel', version: 'OPENTHREAD/2.7.2.0; EFR32', fragmented: true, splitAt: 1 });
    assert.deepEqual(await detect(t), { firmwareType: 'OpenThread', firmwareVersion: 'OPENTHREAD/2.7.2.0' });
});
test('corrupted CRCs never turn into guessed firmware identities', async t => {
    Object.assign(radio, { kind: 'spinel', version: 'OPENTHREAD/2.7.2.0; EFR32', corrupt: true });
    assert.equal(await detect(t), undefined);
});
test('921600 Thread radios are included in active probing', async t => {
    Object.assign(radio, { kind: 'spinel', version: 'OPENTHREAD/2.7.2.0; EFR32', baudRate: 921600 });
    assert.deepEqual(await detect(t), { firmwareType: 'OpenThread', firmwareVersion: 'OPENTHREAD/2.7.2.0' });
});
test('older NCPs return control to the retained legacy detector', async t => {
    Object.assign(radio, { kind: 'ncp', protocol: 8, baudRate: 115200 });
    assert.equal(await detect(t), undefined);
});
test('a busy serial port is an error, not an unknown successful detection', async t => {
    radio.busy = true;
    await assert.rejects(detect(t), error => error.code === 10002);
    assert.equal(attempts.length, 0);
});
