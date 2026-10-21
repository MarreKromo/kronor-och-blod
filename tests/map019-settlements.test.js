const fs=require('fs'),assert=require('assert');
const html=fs.readFileSync('index.html','utf8'),js=fs.readFileSync('src/map01-settlement-art.js','utf8'),css=fs.readFileSync('src/map01-settlement-art.css','utf8');
assert(html.includes('map01-settlement-art.js?v=map019v1'));assert(html.includes('map01-settlement-art.css?v=map019v1'));
for(const n of ['keldra','dorneth','varnhold'])assert(js.includes(n));
for(const n of ['map019-keep','map019-wheel','map019-field'])assert(css.includes(n));
for(const bad of ['localStorage','sessionStorage','setItem(','advanceDay(','travel.travel(','KB_V2_TRAVEL.travel('])assert(!js.includes(bad),'Unexpected gameplay/storage access: '+bad);
assert(js.includes('.map01-settlement-art'));assert(!js.includes('.map01-labels'));assert(js.includes('dataset.map019'));
console.log('MAP-01.9 static checks PASS');
