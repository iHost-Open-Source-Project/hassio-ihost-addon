require('./home.cjs');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { emberVersion } = require('../../src/utils/bootloader/ember');
const { Ezsp } = require('zigbee-herdsman/dist/adapter/ember/ezsp/ezsp');
const { EzspBuffalo } = require('zigbee-herdsman/dist/adapter/ember/ezsp/buffalo');

// Exercise the bundled request/response codec; only the physical command exchange is simulated.
function radio(protocol, { stackType = 2, status = 0, versionLength = 7 } = {}) {
    const ezsp = new Ezsp({ adapter: 'ember', path: '/dev/test-no-hardware', baudRate: 460800 });
    const requests = [];
    ezsp.sendCommand = async request => {
        const bytes = Buffer.from(request.getWritten());
        const legacy = !ezsp.initialVersionSent;
        const command = legacy ? bytes[2] : bytes.readUInt16LE(3);
        const parameters = bytes.subarray(legacy ? 3 : 5);
        requests.push({ command, parameters: [...parameters] });
        let response;
        if (command === 0x00) {
            ezsp.initialVersionSent = true;
            response = Buffer.from([protocol, stackType, 0x20, 0x91]);
        } else if (command === 0xaa) {
            assert.deepEqual([...parameters], [0x11]); // VERSION_INFO
            const prefix = protocol < 14 ? Buffer.from([status]) : Buffer.from([status, 0, 0, 0]);
            response = Buffer.concat([prefix, Buffer.from([versionLength, 0x78, 0x56, 9, 1, 2, 0, 0xaa])]);
        } else if (command === 0x8f) {
            assert.deepEqual([...parameters], [1]);
            response = Buffer.from([0]);
        } else {
            throw new Error(`Unexpected command 0x${command.toString(16)}`);
        }
        ezsp.buffalo = new EzspBuffalo(response, 0);
        return 0;
    };
    return { ezsp, requests };
}

for (const protocol of [13, 18, 19]) {
    test(`read firmware version over EZSP ${protocol} using the real bundled codec`, async () => {
        const { ezsp } = radio(protocol);
        const version = await emberVersion(ezsp);
        assert.deepEqual(version, {
            ezsp: protocol, revision: '9.1.2 [GA]', build: 0x5678,
            major: 9, minor: 1, patch: 2, special: 0, type: 0xaa,
        });
    });
}

test('a newer protocol with compatible version commands is not rejected by an arbitrary upper bound', async () => {
    const { ezsp } = radio(20);
    const version = await emberVersion(ezsp);
    assert.equal(version.ezsp, 20);
    assert.equal(version.revision, '9.1.2 [GA]');
});

test('EZSP 19 negotiation still permits the real bootloader-launch command', async () => {
    const { ezsp, requests } = radio(19);
    await emberVersion(ezsp);
    assert.equal(await ezsp.ezspLaunchStandaloneBootloader(true), 0);
    assert.deepEqual(requests, [
        { command: 0x00, parameters: [18] },
        { command: 0x00, parameters: [19] },
        { command: 0xaa, parameters: [0x11] },
        { command: 0x8f, parameters: [1] },
    ]);
});

test('an unsupported older protocol remains rejected', async () => {
    await assert.rejects(emberVersion(radio(12).ezsp));
});

test('a non-Zigbee stack is not reported as Zigbee firmware', async () => {
    await assert.rejects(emberVersion(radio(19, { stackType: 3 }).ezsp));
});

test('failed and malformed version responses remain errors, not guessed firmware versions', async () => {
    await assert.rejects(emberVersion(radio(19, { status: 1 }).ezsp));
    await assert.rejects(emberVersion(radio(19, { versionLength: 6 }).ezsp));
});
