const { createHash } = require('node:crypto');
const { mkdir, writeFile } = require('node:fs/promises');
const path = require('node:path');

const LEGACY_BASE = 'https://raw.githubusercontent.com/iHost-Open-Source-Project/hassio-ihost-sonoff-dongle-flasher/136ab2fe736a1e5e9c880c2334d2c95adf1e2f25/firmware-build';
const SONOFF_BASE = 'https://raw.githubusercontent.com/SONOFF-Technologies/sonoff-dongle-series-open-source-firmware/aa9dafc12db5f7eee01593f083d679d7d1ef31f0';
const MODELS = {
    zbdonglee: ['donglee', 'ZBDongle-E', 'mg21'],
    'dongle-pmg24': ['donglepmg24', 'Dongle-PMG24', 'mg24'],
    'dongle-lmg21': ['donglelmg21', 'Dongle-LMG21', 'mg21'],
    'dongle-m': ['donglem', 'Dongle-M', 'mg24'],
};
const PROTOCOLS = {
    zigbee_ncp: ['zigbee', 'Zigbee'],
    zigbee_router: ['zigbeerouter', 'Zigbee Router'],
    openthread_rcp: ['openthread', 'OpenThread'],
};

function validateName(name) {
    const match = typeof name === 'string' && name.match(/^[A-Za-z0-9][A-Za-z0-9._-]*\.(?:gbl|bin|hex)$/);
    if (!match || match[0] !== name) throw new Error(`Unsafe firmware filename: ${name}`);
    return name;
}

function convertFirmware(record) {
    if (!Object.hasOwn(MODELS, record.model)) throw new Error(`Unsupported firmware model: ${record.model}`);
    if (!Object.hasOwn(PROTOCOLS, record.type)) throw new Error(`Unsupported firmware protocol: ${record.type}`);
    validateName(record.filename);
    const match = typeof record.version === 'string' && record.version.match(/^(\d+(?:\.\d+)+)(?:_(?:GitHub-[a-fA-F0-9]+|(\d+(?:\.\d+)+)))?$/);
    if (!match || match[0] !== record.version) throw new Error(`Unsafe firmware version: ${record.version}`);
    if (!Number.isSafeInteger(record.baudRate) || record.baudRate <= 0) {
        throw new Error(`Invalid firmware baud rate: ${record.baudRate}`);
    }
    const [model, dongleType, chipModel] = MODELS[record.model];
    const [protocol, firmwareType] = PROTOCOLS[record.type];
    const version = match[2] || match[1];
    const sdkVersion = match[2] ? match[1] : '';
    const firmwareDesc = record.prerelease ? 'beta' : 'stable';
    const baudRate = String(record.baudRate);
    return {
        name: validateName(`${model}_${chipModel}_${protocol}_${firmwareDesc}_${version}_${baudRate}.gbl`),
        dongleType, chipModel, firmwareType, firmwareDesc, version, baudRate, sdkVersion,
        flowControl: record.flowControl,
    };
}

async function download(url, sha256, size) {
    if (sha256 !== undefined && (typeof sha256 !== 'string' || !/^[a-fA-F0-9]{64}$/.test(sha256) || sha256.length !== 64)) {
        throw new Error(`Invalid SHA-256 for ${url}`);
    }
    if (size !== undefined && (!Number.isSafeInteger(size) || size <= 0)) {
        throw new Error(`Invalid expected size for ${url}`);
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Download failed: HTTP ${response.status} for ${url}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    if (size !== undefined && buffer.length !== size) {
        throw new Error(`Firmware size mismatch for ${url}: expected ${size}, received ${buffer.length}`);
    }
    if (sha256 !== undefined && createHash('sha256').update(buffer).digest('hex') !== sha256.toLowerCase()) {
        throw new Error(`Firmware SHA-256 mismatch for ${url}`);
    }
    return buffer;
}

async function main() {
    const legacy = JSON.parse(await download(`${LEGACY_BASE}/FIRMWARE_LIST.json`));
    const registry = JSON.parse(await download(`${SONOFF_BASE}/firmwares.json`));
    if (!Array.isArray(legacy.firmwareList) || !legacy.firmwareList.length) {
        throw new Error('Legacy firmware catalogue is empty or invalid');
    }
    if (!Array.isArray(registry.firmwares) || !registry.firmwares.length) {
        throw new Error('SONOFF firmware catalogue is empty or invalid');
    }
    const directory = path.resolve('firmware');
    await mkdir(directory, { recursive: true });
    for (const firmware of legacy.firmwareList) {
        const name = validateName(firmware.name);
        await writeFile(path.join(directory, name), await download(`${LEGACY_BASE}/${name}`));
    }
    const firmwareList = [...legacy.firmwareList];
    for (const record of registry.firmwares) {
        const firmware = convertFirmware(record);
        if (record.sha256 === undefined || record.size === undefined) {
            throw new Error(`Missing SHA-256 or size for ${record.filename}`);
        }
        const buffer = await download(`${SONOFF_BASE}/firmwares/nerivec/${record.filename}`, record.sha256, record.size);
        await writeFile(path.join(directory, firmware.name), buffer);
        firmwareList.push(firmware);
    }
    await writeFile(path.join(directory, 'FIRMWARE_LIST.json'), `${JSON.stringify({ ...legacy, firmwareList }, null, 2)}\n`);
    console.log(`Downloaded ${legacy.firmwareList.length} legacy and ${registry.firmwares.length} SONOFF firmware files (${firmwareList.length} total)`);
}

module.exports = { convertFirmware, download };

if (require.main === module) {
    main().catch(error => {
        console.error(error);
        process.exitCode = 1;
    });
}
