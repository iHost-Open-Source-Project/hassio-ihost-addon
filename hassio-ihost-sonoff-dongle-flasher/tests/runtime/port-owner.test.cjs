const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { test, beforeEach, afterEach } = require('node:test');
process.env.SUPERVISOR_TOKEN = 'test-only-token';
const constants = require('../../src/constants');
const { guardSerialPort } = require('../../port-owner.cjs');

let directory, selected, other, alias, metadata, hardware, original;
beforeEach(async () => {
    original = { fetch: global.fetch, IN_HA: constants.IN_HA };
    constants.IN_HA = true;
    directory = await fs.mkdtemp(path.join(os.tmpdir(), 'port-owner-'));
    selected = path.join(directory, 'ttyUSB1');
    other = path.join(directory, 'ttyUSB0');
    alias = path.join(directory, 'by-id-thread');
    await fs.writeFile(selected, '');
    await fs.writeFile(other, '');
    await fs.symlink(selected, alias);
    metadata = { state: 'started', options: { device: alias, network_device: null } };
    hardware = { devices: [] };
    global.fetch = async url => {
        assert.ok(['http://supervisor/addons/core_openthread_border_router/info', 'http://supervisor/hardware/info'].includes(String(url)), `Unexpected Supervisor URL: ${url}`);
        return Response.json({ result: 'ok', data: String(url) === 'http://supervisor/hardware/info' ? hardware : metadata });
    };
});
afterEach(async () => {
    global.fetch = original.fetch;
    constants.IN_HA = original.IN_HA;
    await fs.rm(directory, { recursive: true, force: true });
});
async function check(port) {
    let payload;
    const allowed = await guardSerialPort(port, { json: value => { payload = value; } });
    return { allowed, error: payload?.error };
}

test('a running OTBR using the same physical port is blocked even through a by-id alias', async () => {
    assert.deepEqual(await check(selected), { allowed: false, error: 10002 });
});
test('a different Zigbee dongle remains available while OTBR owns its Thread dongle', async () => {
    assert.deepEqual(await check(other), { allowed: true, error: undefined });
});
test('stopped OTBR and network-connected OTBR do not reserve a local serial device', async () => {
    metadata.state = 'stopped';
    assert.equal((await check(selected)).allowed, true);
    metadata.state = 'started';
    metadata.options.network_device = '192.0.2.10:6638';
    assert.equal((await check(selected)).allowed, true);
});
test('a missing OTBR app is not a serial-port conflict', async () => {
    global.fetch = async () => new Response(null, { status: 404 });
    assert.deepEqual(await check(selected), { allowed: true, error: undefined });
});
test('failed or malformed ownership queries do not permit potentially unsafe probing', async () => {
    global.fetch = async () => new Response(null, { status: 403 });
    assert.deepEqual(await check(selected), { allowed: false, error: 500 });
    global.fetch = async () => new Response('not json');
    assert.deepEqual(await check(selected), { allowed: false, error: 500 });
    global.fetch = async () => Response.json({ result: 'ok', data: {} });
    assert.deepEqual(await check(selected), { allowed: false, error: 500 });
});
test('a missing selected port keeps the existing invalid-serial-port error', async () => {
    assert.deepEqual(await check(path.join(directory, 'missing')), { allowed: false, error: 10001 });
});
test('a stale configured OTBR alias does not reserve another present dongle', async () => {
    metadata.options.device = path.join(directory, 'unplugged');
    assert.deepEqual(await check(other), { allowed: true, error: undefined });
});
test('an unmounted by-id alias is matched using authoritative Supervisor hardware links', async () => {
    metadata.options.device = path.join(directory, 'unmounted-by-id');
    hardware.devices = [{ dev_path: selected, by_id: metadata.options.device, attributes: {} }];
    assert.deepEqual(await check(selected), { allowed: false, error: 10002 });
    assert.deepEqual(await check(other), { allowed: true, error: undefined });
});
test('missing hardware metadata cannot turn an unresolved owner into a free port', async () => {
    metadata.options.device = path.join(directory, 'unmounted-by-id');
    delete hardware.devices;
    assert.deepEqual(await check(selected), { allowed: false, error: 500 });
});
test('standalone operation does not depend on a Home Assistant Supervisor', async () => {
    constants.IN_HA = false;
    global.fetch = async () => { throw new Error('Supervisor must not be queried'); };
    assert.deepEqual(await check(selected), { allowed: true, error: undefined });
});
