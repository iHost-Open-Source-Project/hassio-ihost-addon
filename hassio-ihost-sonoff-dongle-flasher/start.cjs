const http = require('node:http');
const path = require('node:path');
const express = require('express');
const constants = require('./src/constants');

// The published flasher downloads from HTTP; keep its firmware API unchanged and serve the pinned catalogue locally.
const firmware = express().use(express.static(path.join(__dirname, 'firmware'), { index: false, dotfiles: 'deny' }));
const server = http.createServer(firmware);
server.listen(0, '127.0.0.1', () => {
    constants.FIRMWARE_BASE_URL = `http://127.0.0.1:${server.address().port}`;
    require('./src/index.js');
});
