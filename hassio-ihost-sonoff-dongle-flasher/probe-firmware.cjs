const { GeckoBootloader, BootloaderState } = require('./src/utils/bootloader/bootloader');
const ember = require('./src/utils/bootloader/ember');
const { EFirmwareTag } = require('./src/utils/bootloader/enums');
const { logger } = require('./src/utils/logger');

function checkPortError(error) {
    if (error.code === 'ENOENT') {
        error.code = 10001;
        throw error;
    }
    if (['EBUSY', 'EAGAIN'].includes(error.code) || /cannot lock|already locked|resource temporarily unavailable/i.test(error.message)) {
        error.code = 10002;
        throw error;
    }
}

async function probeUsbFirmware(options) {
    const baudRates = [...new Set([Number(options.baudRate), 460800, 115200, 230400, 921600])]
        .filter(baudRate => Number.isSafeInteger(baudRate) && baudRate > 0);
    for (const baudRate of baudRates) {
        const config = { ...options, baudRate };
        const bootloader = new GeckoBootloader(config);
        try {
            // Select the response decoder; identity still requires a valid version reply.
            bootloader.firmwareTag = EFirmwareTag.OPEN_THREAD;
            bootloader.resolveState(BootloaderState.FIRMWARE_TAG);
            await bootloader.transport.initPort();
            await bootloader.openThreadVersion();
            if (bootloader.version) {
                return { firmwareType: EFirmwareTag.OPEN_THREAD, firmwareVersion: bootloader.version };
            }
        } catch (error) {
            checkPortError(error);
            logger.debug(`Active OpenThread probe at ${baudRate}: ${error.message}`);
        } finally {
            await bootloader.transport.close(false, false);
        }

        let client;
        try {
            client = await ember.emberStart(config);
            const version = await ember.emberVersion(client);
            return {
                firmwareType: EFirmwareTag.ZIGBEE,
                firmwareVersion: `${version.major}.${version.minor}.${version.patch}`,
            };
        } catch (error) {
            checkPortError(error);
            // The retained legacy probe owns NCPs below the modern codec's minimum.
            if (error.ezspProtocolVersion < 13) return undefined;
            if (client) throw error;
            logger.debug(`Active Zigbee probe at ${baudRate}: ${error.message}`);
        } finally {
            if (client) await ember.emberStop(client);
        }
    }
    // Preserve the upstream router, older NCP and board-specific fallback paths.
    return undefined;
}

module.exports = { probeUsbFirmware };
