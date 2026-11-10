const assert = require('node:assert/strict');
const { test } = require('node:test');
const { compareFirmwareVersions } = require('../patch-ui.cjs');

function ordered(versions) {
    return versions.map(version => ({ version })).sort(compareFirmwareVersions).map(firmware => firmware.version);
}

test('newer four-component OpenThread versions precede older three-component versions', () => {
    assert.deepEqual(ordered(['2.4.4', '2.7.2.0', '2.5.3.0']), ['2.7.2.0', '2.5.3.0', '2.4.4']);
});

test('every numeric component participates without lexical or fractional ordering', () => {
    assert.deepEqual(ordered(['2.7.2.0', '2.7.2.1', '2.10.0', '2.9.0']), ['2.10.0', '2.9.0', '2.7.2.1', '2.7.2.0']);
    assert.equal(compareFirmwareVersions({ version: '2.7.2' }, { version: '2.7.2.0' }), 0);
});

test('date-based firmware and SDK-versioned products retain their ordering', () => {
    assert.deepEqual(ordered(['20240710', '20250321']), ['20250321', '20240710']);
    const firmware = [
        { version: '1.0.0', sdkVersion: '7.23.1' },
        { version: '1.0.0', sdkVersion: '8.0.0' },
    ];
    assert.deepEqual(firmware.sort(compareFirmwareVersions).map(f => f.sdkVersion), ['8.0.0', '7.23.1']);
});

test('unknown versions never receive the latest-firmware position ahead of known numeric versions', () => {
    assert.deepEqual(ordered(['unknown', '2.7.2.0', '']), ['2.7.2.0', 'unknown', '']);
});
