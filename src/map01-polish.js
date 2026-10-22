/* MAP-01.13C — additive visual polish, no save/travel mutations. */
(function(){'use strict';
const NS='http://www.w3.org/2000/svg';
function el(p,t,a){const n=document.createElementNS(NS,t);for(const k in a)n.setAttribute(k,a[k]);p.appendChild(n);return n}
function path(p,d,c){return el(p,'path',{d,class:c})}
function dot(p,x,y,r,c){return el(p,'circle',{cx:x,cy:y,r,class:c})}
function house(p,x,y,s=1){const g=el(p,'g',{transform:`translate(${x} ${y}) scale(${s})`});path(g,'M-12 4 L-12 -8 L12 -8 L12 4Z','m13c-stone');path(g,'M-16 -8 L0 -22 L16 -8Z','m13c-roof');path(g,'M-3 4 V-4 H3 V4','m13c-door');dot(g,8,-3,1.5,'m13c-window')}
function field(p,x,y,w,h,n){const g=el(p,'g',{transform:`translate(${x} ${y}) rotate(${n%2?3:-4})`});path(g,`M0 3 Q${w/2} -4 ${w} 1 L${w-3} ${h} Q${w/2} ${h+7} 2 ${h-2}Z`,'m13c-field-margin');for(let i=10;i<w-5;i+=11)path(g,`M${i} 9 Q${i+4} ${h/2} ${i+1} ${h-9}`,'m13c-crop');}
function improve(frame){if(frame.dataset.map0113c==='yes'||frame.dataset.map0113!=='yes')return;
const root=frame.querySelector('.map01-viewport svg > g');if(!root)return;
const arts=[...root.querySelectorAll('.map01-settlement-art')];if(arts.length!==3)return;
const layer=el(root,'g',{class:'m13c-world','aria-hidden':'true'});const firstRoad=[...root.children].find(n=>n.classList&&n.classList.contains('map01-road-outline'));if(firstRoad)root.insertBefore(layer,firstRoad);
 // Field detail: subtle irregular crop rows and boundary vegetation, not new square plots.
[[0,0,86,56],[111,1,88,54],[225,9,75,51],[14,67,91,51],[126,75,84,52],[245,91,72,46],[115,151,92,52],[240,160,79,50],[158,223,104,54],[328,240,84,51]].forEach(([x,y,w,h],i)=>{const gx=x-30,gy=y+588;field(layer,gx,gy,w,h,i);});
for(let i=0;i<38;i++){const x=10+(i*37)%340,y=635+(i*53)%260; if((i%4)===0)dot(layer,x,y,2.2,'m13c-grass');}
 // Landscape: stones, shrubs, carts and roadside milestones without obscuring the roads.
for(const [x,y] of [[359,479],[386,453],[419,433],[445,411],[562,324],[579,290],[602,261],[635,222]]){dot(layer,x+8,y+9,2.8,'m13c-pebble');path(layer,`M${x-7} ${y+8} q4 -7 9 -1`,'m13c-tuft')}
for(const [x,y] of [[558,305],[610,267],[680,225]]){path(layer,`M${x} ${y} l-3 -7 l8 -1 l3 8Z`,'m13c-mile');}
 // Additional hamlets outside Varnhold, modest and scattered.
[[659,278,.54],[688,286,.48],[771,272,.48],[839,260,.47]].forEach(a=>house(layer,...a));
 // Market lane, stalls, boat mooring and a cart near Dorneth's mill.
path(layer,'M616 421 Q672 438 735 420','m13c-footpath');
for(const [x,y] of [[647,424],[673,432],[710,429]]){path(layer,`M${x-6} ${y} l6 -7 l7 7Z`,'m13c-awning');path(layer,`M${x-6} ${y} v6 h13 v-6`,'m13c-stall');}
path(layer,'M794 403 q17 5 31 -2','m13c-riverbank');path(layer,'M806 406 l0 9 m6 -9 v9','m13c-post');
 // Stonework and asymmetric courtyard details in Varnhold.
const c=el(arts[2],'g',{class:'m13c-castle','aria-hidden':'true'});
for(const [x,y] of [[-58,4],[-53,17],[-42,43],[50,4],[51,23],[39,45],[-12,-18],[6,-17]])path(c,`M${x} ${y} h7`,'m13c-mortar');
house(c,-27,24,.38);house(c,28,30,.34);
path(c,'M-27 49 Q-5 41 15 50','m13c-courtyard');
 // Make long presses on map controls less likely to open native text menus.
frame.dataset.map0113c='yes';
}
function scan(){document.querySelectorAll('.map01-frame').forEach(improve)}
new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});scan();
})();
