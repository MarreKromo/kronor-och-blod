const assert=require('node:assert/strict'),fs=require('node:fs');
const js=fs.readFileSync('src/map01-interactive.js','utf8');
const css=fs.readFileSync('src/map01-interactive.css','utf8');
const html=fs.readFileSync('index.html','utf8');
for(const token of ['map015-foothills','map015-ridge-shadow','map015-ridge-face','map015-ridge-snow','map015-ridge-etch']){assert.ok(js.includes(token),token);assert.ok(css.includes('.'+token),token);}
assert.ok(!js.includes("path(far,'M930 90 C1100"),'old rectangular terrain overlay removed');
assert.ok(html.includes('map015v1'),'cache version');
assert.ok(!/localStorage|sessionStorage|setItem\s*\(/.test(js));
assert.ok(!/travel\.travel\s*\(|advanceDay\s*\(/.test(js));
console.log('MAP-01.5 cartography quality: PASS');
