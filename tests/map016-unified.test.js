const assert=require('node:assert/strict'),fs=require('node:fs');
const js=fs.readFileSync('src/map01-unified-terrain.js','utf8'),css=fs.readFileSync('src/map01-unified-terrain.css','utf8'),html=fs.readFileSync('index.html','utf8');
for(const s of ['map016-ridge','map016-woodland','map016-river','map016-field','map016-land-label']){assert(js.includes(s));assert(css.includes('.'+s));}
assert(!/localStorage|sessionStorage|setItem\s*\(|advanceDay\s*\(|travel\.travel\s*\(/.test(js));
assert(html.includes('map01-unified-terrain.js?v=map016v1'));assert(html.includes('map01-unified-terrain.css?v=map016v1'));
for(const s of ['src/v2-travel.js','src/map01-interactive.js','src/v2-navigation.js'])assert(html.includes(s));
console.log('MAP-01.6 static integration and save isolation PASS');
