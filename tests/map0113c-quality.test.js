const fs=require('fs'),assert=require('assert');
const js=fs.readFileSync('src/map01-polish.js','utf8');
const css=fs.readFileSync('src/map01-polish.css','utf8');
assert(js.includes("dataset.map0113c='yes'"));
assert(js.includes("dataset.map0113!=='yes'"));
assert(!/localStorage|sessionStorage|advanceDay|travel\.travel|setItem/.test(js));
assert(css.includes('-webkit-touch-callout:none'));
assert(!css.includes('touch-action:none'));
console.log('MAP-01.13C PASS');
