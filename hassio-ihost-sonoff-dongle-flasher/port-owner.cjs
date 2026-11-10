const fs = require('node:fs/promises');
const constants = require('./src/constants');

async function guardSerialPort(serialPortPath, response) {
    if (!serialPortPath || !constants.IN_HA) return true;

    try {
        const result = await fetch(`${constants.HA_HTTP_URL}/addons/core_openthread_border_router/info`, {
            headers: { Authorization: `Bearer ${constants.HA_TOKEN}` },
        });
        if (result.status === 404) return true;
        if (!result.ok) throw new Error('Supervisor request failed');

        const info = await result.json();
        const data = info && info.data;
        if (info?.result !== 'ok' || !data || typeof data !== 'object' || Array.isArray(data)
            || typeof data.state !== 'string' || !data.state.trim()) {
            throw new Error('Invalid Supervisor metadata');
        }
        if (data.state !== 'started') return true;

        const options = data.options;
        if (!options || typeof options !== 'object' || Array.isArray(options)
            || (options.network_device != null && typeof options.network_device !== 'string')
            || (options.device != null && typeof options.device !== 'string')) {
            throw new Error('Invalid radio options');
        }
        if (options.network_device || !options.device) return true;

        let selectedPath;
        try {
            selectedPath = await fs.realpath(serialPortPath);
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
            response.json({ error: 10001, msg: 'Serial port does not exist.' });
            return false;
        }

        let ownerPath;
        try {
            ownerPath = await fs.realpath(options.device);
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
            // A container may lack by-id links even when the host still has the device.
            const hardwareResult = await fetch(`${constants.HA_HTTP_URL}/hardware/info`, {
                headers: { Authorization: `Bearer ${constants.HA_TOKEN}` },
            });
            if (!hardwareResult.ok) throw new Error('Hardware ownership lookup failed');
            const hardware = await hardwareResult.json();
            if (hardware?.result !== 'ok' || !Array.isArray(hardware.data?.devices)) {
                throw new Error('Invalid hardware metadata');
            }
            const device = hardware.data.devices.find(item =>
                item.by_id === options.device || item.dev_path === options.device
                || (typeof item.attributes?.DEVLINKS === 'string'
                    && item.attributes.DEVLINKS.split(/\s+/).includes(options.device)));
            if (!device) return true;
            if (typeof device.dev_path !== 'string') throw new Error('Invalid hardware device path');
            ownerPath = device.dev_path;
        }
        if (selectedPath !== ownerPath) return true;

        response.json({
            error: 10002,
            msg: 'OpenThread Border Router is using this serial port. Stop that app before connecting.',
        });
        return false;
    } catch {
        response.json({ error: 500, msg: 'Serial port ownership check failed.' });
        return false;
    }
}

module.exports = { guardSerialPort };
