const assert = require('node:assert/strict');
const { test } = require('node:test');
const { convertFirmware, download } = require('../build-firmware.cjs');

const stable = {
    model: 'dongle-pmg24', type: 'zigbee_ncp', version: '8.2.2.0',
    baudRate: 460800, flowControl: 'sw_flow', prerelease: false,
    filename: 'sonoff_dongle-pmg24_zigbee_ncp_8.2.2.0_460800_sw_flow.gbl',
};

test('PMG24 coordinator retains its model, software flow control and 460800 baud rate', () => {
    assert.deepEqual(convertFirmware(stable), {
        name: 'donglepmg24_mg24_zigbee_stable_8.2.2.0_460800.gbl',
        dongleType: 'Dongle-PMG24', chipModel: 'mg24', firmwareType: 'Zigbee',
        firmwareDesc: 'stable', version: '8.2.2.0', baudRate: '460800', sdkVersion: '',
        flowControl: 'sw_flow',
    });
});

test('ZBDongle-E Thread prerelease displays stack version, SDK and beta status separately', () => {
    assert.deepEqual(convertFirmware({ ...stable, model: 'zbdonglee', type: 'openthread_rcp',
        version: '2026.6.2_3.1.2', prerelease: true }), {
        name: 'donglee_mg21_openthread_beta_3.1.2_460800.gbl',
        dongleType: 'ZBDongle-E', chipModel: 'mg21', firmwareType: 'OpenThread',
        firmwareDesc: 'beta', version: '3.1.2', baudRate: '460800', sdkVersion: '2026.6.2',
        flowControl: 'sw_flow',
    });
});

test('stable Thread GitHub revision is not mistaken for the stack version', () => {
    const result = convertFirmware({ ...stable, model: 'zbdonglee', type: 'openthread_rcp',
        version: '2.7.2.0_GitHub-fb0446f53', baudRate: 921600 });
    assert.equal(result.version, '2.7.2.0');
    assert.equal(result.baudRate, '921600');
    assert.equal(result.sdkVersion, '');
});

test('unsupported model or protocol cannot be offered as compatible firmware', () => {
    assert.throws(() => convertFirmware({ ...stable, model: 'other-device' }));
    assert.throws(() => convertFirmware({ ...stable, type: 'bootloader' }));
});


test('catalogue metadata cannot escape the firmware directory or supply an invalid baud rate', () => {
    assert.throws(() => convertFirmware({ ...stable, version: '../../other' }));
    assert.throws(() => convertFirmware({ ...stable, baudRate: -1 }));
});
test('download rejects corrupted firmware and HTTP failures', async () => {
    const sha256 = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
    assert.deepEqual(await download('data:application/octet-stream,abc', sha256, 3), Buffer.from('abc'));
    await assert.rejects(download('data:application/octet-stream,abd', sha256, 3), /SHA-256/);
    await assert.rejects(download('data:application/octet-stream,abc', sha256, 4), /size/i);
    const server = require('node:http').createServer((req, res) => res.writeHead(404).end('missing'));
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    try {
        await assert.rejects(download(`http://127.0.0.1:${server.address().port}/missing`), /404/);
    } finally {
        server.close();
    }
});
