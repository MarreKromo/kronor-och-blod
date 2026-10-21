const fs=require('node:fs'),assert=require('node:assert/strict');
const js=fs.readFileSync('src/map01-unified-terrain.js','utf8'),css=fs.readFileSync('src/map01-unified-terrain.css','utf8');
for(const key of ['map016b-peak-face','map016b-tree','map016b-river','map016b-field','map016b-land-label']){assert(js.includes(key));assert(css.includes('.'+key));}
assert(!/localStorage|sessionStorage|setItem\s*\(|advanceDay\s*\(|travel\.travel\s*\(/.test(js));
assert(js.includes('map01-road-outline'));assert(js.includes('map016b'));
console.log('MAP-01.6B terrain quality / save isolation PASS');
