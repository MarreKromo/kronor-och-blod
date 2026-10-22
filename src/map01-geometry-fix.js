/* MAP-01.13E — replace failed 13D geometry with a single coordinated visual pass.
   No state, travel, coordinates or marker event handlers are modified. */
(function(){'use strict';
const NS='http://www.w3.org/2000/svg';
function el(p,t,a={}){const n=document.createElementNS(NS,t);for(const [k,v] of Object.entries(a))n.setAttribute(k,String(v));p.appendChild(n);return n;}
function path(p,d,c){return el(p,'path',{d,class:c});}
function enhance(frame){if(frame.dataset.map0113e==='yes'||frame.dataset.map0113c!=='yes')return;
 const root=frame.querySelector('.map01-viewport svg > g');if(!root)return;
 const arts=[...root.querySelectorAll('.map01-settlement-art')];if(arts.length!==3)return;
 // Delete obsolete independent bridge drawings, extra scribble overlays, and the failed 13D terrain.
 root.querySelectorAll('.m12b-crossing-holder,.m13c-world,.m13c-castle,.m13-landscape,.m13-keldra-details,.m13-dorneth-details,.m13-varnhold-details,.m13d-background,.m13d-water-crossings,.m13d-bridge-crossings,.m13d-road-details,.m13d-castle-base,.m13d-castle-foreground,.m13e-terrain,.m13e-crossings').forEach(n=>n.remove());
 // Place terrain below all canonical roads and settlements, not as a foreground overlay.
 const terrain=el(root,'g',{class:'m13e-terrain','aria-hidden':'true'});
 const firstRoad=[...root.children].find(n=>n.classList?.contains('map01-road-outline'));
 if(!firstRoad)return;
 root.insertBefore(terrain,firstRoad);
 // Gentle organic ridge BEHIND Varnhold: curved contours and woodland, no rectangular slab.
 path(terrain,'M614 203 C632 169 661 150 690 147 C716 117 751 125 773 130 C807 113 849 133 870 158 C902 165 922 188 918 216 C889 241 853 248 820 242 C785 256 741 248 710 252 C671 249 634 236 614 203Z','m13e-ridge-far');
 path(terrain,'M634 218 C663 187 690 185 711 179 C750 151 788 158 816 171 C847 168 880 184 896 210 C861 235 828 229 801 233 C751 248 688 239 634 218Z','m13e-ridge-near');
 for(let i=0;i<4;i++)path(terrain,`M${625+i*10} ${184+i*15} C${694+i*4} ${142+i*18} ${756+i*9} ${159+i*17} ${812+i*12} ${151+i*17} S${890+i*4} ${177+i*13} ${914-i*3} ${197+i*12}`,'m13e-ridge-contour');
 // Tree groups only outside castle silhouette. Deterministic positions and varied canopies.
 for(let i=0;i<45;i++){const x=627+(i*67)%291,y=151+(i*41)%83;if(x>684&&x<854&&y>183)continue;const r=4+(i*11)%8;el(terrain,'ellipse',{cx:x,cy:y,rx:r*1.3,ry:r,class:i%3?'m13e-tree':'m13e-tree-light'});}
 // Lower natural hill under Varnhold, visible as a curved escarpment rather than a flat polygon.
 path(terrain,'M643 229 C664 214 689 209 718 216 C761 202 812 212 853 226 C878 239 885 256 865 271 C824 288 749 289 695 273 C670 266 645 250 643 229Z','m13e-hill-base');
 path(terrain,'M651 246 C716 268 798 279 868 248','m13e-hill-contour');
 path(terrain,'M661 259 C726 286 805 289 856 264','m13e-hill-contour m13e-hill-contour-soft');
 // Remove spurious long ornamental lines crossing village/castle art.
 root.querySelectorAll('.m12-furrow,.m12-fence-post,.m12-lane,.m13-courtyard-path,.m13-hamlet-path,.m13c-courtyard,.m13c-mortar').forEach(n=>n.classList.add('m13e-suppress'));
 // Bridges: no invented water ovals. Decks are located at existing road/river crossings.
 // Existing canonical river is drawn BELOW roads; bridges are ABOVE roads and below settlement markers.
 const crossings=el(root,'g',{class:'m13e-crossings','aria-hidden':'true'});
 root.insertBefore(crossings,arts[0]);
 function bridge(x,y,angle,len,width){const g=el(crossings,'g',{transform:`translate(${x} ${y}) rotate(${angle})`});const h=len/2,w=width/2;
  path(g,`M${-h-3} ${-w-4} L${h+3} ${-w-4} L${h+3} ${w+4} L${-h-3} ${w+4}Z`,'m13e-bridge-shadow');
  path(g,`M${-h} ${-w} L${h} ${-w} L${h} ${w} L${-h} ${w}Z`,'m13e-bridge-deck');
  for(let t=-h+5;t<h;t+=9)path(g,`M${t} ${-w+1} L${t} ${w-1}`,'m13e-bridge-timber');
  for(const s of [-1,1]){path(g,`M${-h-3} ${s*(w+2)} L${h+3} ${s*(w+2)}`,'m13e-bridge-rail');for(let t=-h+2;t<=h;t+=17)path(g,`M${t} ${s*(w+1)} v${s*4}`,'m13e-bridge-post');}
 }
 bridge(493,378,-63,44,15);
 bridge(802,348,20,38,12);
 // Keep place graphics interactive and above bridge layer.
 frame.dataset.map0113e='yes';
}
function scan(){document.querySelectorAll('.map01-frame').forEach(enhance);}
new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});scan();
})();
