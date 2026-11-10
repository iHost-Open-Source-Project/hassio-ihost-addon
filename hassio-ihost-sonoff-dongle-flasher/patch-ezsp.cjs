const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const filename = path.join('src', 'utils', 'bootloader', 'ember.js');
let source = fs.readFileSync(filename, 'utf8');
function replace(from, to) {
    assert.equal(source.split(from).length - 1, 1, 'Unsupported upstream Ember probe');
    source = source.replace(from, to);
}

// VERSION, GET_VALUE and bootloader launch retain their wire formats in EZSP 19.
// shortcut: patches the pinned 1.3.4 module; recheck these command layouts when upgrading the upstream application.
replace(
    "if(_0x2dd0a8<consts_1[_0x231e97(0x208)]&&_0x3c8200['BbFoC'](_0x2dd0a8,consts_1[_0x231e97(0x211)]))",
    "if(_0x3c8200['BbFoC'](_0x2dd0a8,consts_1[_0x231e97(0x211)]))",
);
replace(String.raw`)\x20lower\x20than\x20Host.\x20Switched.`, ') negotiated with host.');
replace(
    "throw new Error(_0x231e97(0x212)+_0x2dd0a8+_0x231e97(0x1f5)+consts_1[_0x231e97(0x211)]+'-'+consts_1['EZSP_PROTOCOL_VERSION']+'].');",
    "throw Object.assign(new Error('NCP EZSP protocol version ('+_0x2dd0a8+') is older than minimum supported version '+consts_1[_0x231e97(0x211)]+'.'),{ezspProtocolVersion:_0x2dd0a8});",
);
fs.writeFileSync(filename, source);
console.log('Removed the coordinator-only EZSP ceiling from the firmware probe; response validation remains enabled');
