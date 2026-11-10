const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

// The upstream logger creates its home directory without a cross-process-safe mkdir.
process.env.HOME = fs.mkdtempSync(path.join(os.tmpdir(), 'flasher-runtime-'));
