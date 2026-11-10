const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

function compareFirmwareVersions(left, right) {
    const a = String(left.sdkVersion || left.version || '');
    const b = String(right.sdkVersion || right.version || '');
    const numericA = /^\d+(?:\.\d+)*$/.test(a);
    const numericB = /^\d+(?:\.\d+)*$/.test(b);
    if (numericA !== numericB) return numericA ? -1 : 1;
    if (!numericA) return 0;
    const partsA = a.split('.');
    const partsB = b.split('.');
    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
        const difference = Number(partsB[i] || 0) - Number(partsA[i] || 0);
        if (difference) return difference;
    }
    return 0;
}

// This function is embedded in the published Vue module, where Zi and ve already exist.
function ihostSerialSettings(name, reminder = false) {
    const firmware = Zi().firmwareList.value.find(item => item.name === name);
    const flow = {
        sw_flow: 'Software (XON/XOFF)',
        hw_flow: 'Hardware (RTS/CTS)',
        no_flow: 'None',
    }[firmware?.flowControl] || 'Not specified by source';
    const details = firmware
        ? `${firmware.baudRate || 'Not specified'} baud · Flow control: ${flow}${firmware.sdkVersion ? `\nFirmware ${firmware.version} · SDK ${firmware.sdkVersion}` : ''}`
        : 'Serial settings are not provided for this firmware. Check its vendor instructions.';
    const text = reminder
        ? `After flashing${firmware ? ` firmware ${firmware.version}` : ''}\n${details}\nApply these settings only after flashing completes. Your integration is not reconfigured automatically. Stop the flasher before reconnecting it.`
        : details;
    return ve('div', {
        class: reminder ? 'ihost-serial-settings-reminder' : 'ihost-serial-settings-info',
        role: reminder ? 'note' : undefined,
        'aria-live': reminder ? 'polite' : undefined,
    }, text, 1);
}

function main() {
    const bundlePath = path.join('public', 'assets', 'index-DNS-M9uF.js');
    let bundle = fs.readFileSync(bundlePath, 'utf8');
    // shortcut: patches the pinned 1.3.4 bundle; port these guarded hooks when upgrading the upstream application.
    function replace(from, to, count = 1) {
        assert.equal(bundle.split(from).length - 1, count, `Unsupported upstream UI: ${from}`);
        bundle = bundle.replaceAll(from, to);
    }
    replace('f.sort((c,p)=>{const h=c.sdkVersion||c.version,g=p.sdkVersion||p.version,v=oi.valid(h),m=oi.valid(g);if(v&&m)return oi.rcompare(h,g);if(v)return-1;if(m)return 1;const y=js(h),S=js(g);return!isNaN(y)&&!isNaN(S)?S-y:0})', 'f.sort(compareFirmwareVersions)', 2);
    replace('r.sort((o,i)=>{const a=o.sdkVersion||o.version,l=i.sdkVersion||i.version,u=oi.valid(a),f=oi.valid(l);if(u&&f)return oi.rcompare(a,l);const c=js(a),p=js(l);return!isNaN(c)&&!isNaN(p)?p-c:0})', 'r.sort(compareFirmwareVersions)');
    replace('ve("div",{class:hn(["operate",{disabled:w.value}])', 'ihostSerialSettings(Zi().upgradeFirmwareName.value),ve("div",{class:hn(["operate",{disabled:w.value}])');
    replace('default:Ve(()=>[o[4]||(o[4]=ve("div",{class:"flash-confirm"}', 'default:Ve(()=>[ihostSerialSettings(Zi().upgradeFirmwareName.value,true),o[4]||(o[4]=ve("div",{class:"flash-confirm"}');
    replace('ve("div",Xue,[', 've("div",Xue,[ihostSerialSettings(Zi().upgradeFirmwareName.value,true),');
    bundle += `\n${compareFirmwareVersions.toString()}\n${ihostSerialSettings.toString()}\n`;

    const indexPath = path.join('public', 'index.html');
    const index = fs.readFileSync(indexPath, 'utf8');
    assert.equal(index.split('</head>').length, 2, 'Unsupported upstream page');
    const style = `<style>
.ihost-serial-settings-info{width:100%;flex-basis:100%;margin-top:6px;color:#333;font-size:12px;line-height:1.5;white-space:pre-line;overflow-wrap:anywhere}
.ihost-serial-settings-reminder{margin:12px 0;padding:12px;border:1px solid #faad14;border-radius:6px;background:#fffbe6;color:#333;text-align:left;font-size:14px;line-height:1.5;white-space:pre-line;overflow-wrap:anywhere}
</style>`;
    fs.writeFileSync(bundlePath, bundle);
    fs.writeFileSync(indexPath, index.replace('</head>', `${style}</head>`));
    console.log('Added selected firmware serial details, post-flash reminders and numeric version ordering');
}

module.exports = { compareFirmwareVersions };
if (require.main === module) main();
