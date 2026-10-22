/* MAP-01.13D: corrective map pass. Presentation only. */
(function(){'use strict';
const N='http://www.w3.org/2000/svg';
function E(p,t,a={}){const n=document.createElementNS(N,t);for(const [k,v] of Object.entries(a))n.setAttribute(k,String(v));p.appendChild(n);return n}
function P(p,d,c){return E(p,'path',{d,class:c})}
function house(p,x,y,s){const g=E(p,'g',{transform:`translate(${x} ${y}) scale(${s})`});P(g,'M-14 8 L-14 -8 H14 V8Z','m13d-wall');P(g,'M-18 -8 L0 -23 L18 -8Z','m13d-roof');P(g,'M-3 8 V0 H4 V8','m13d-door');return g}
function enhance(frame){if(frame.dataset.map0113d==='yes'||frame.dataset.map0113c!=='yes')return;
 const root=frame.querySelector('.map01-viewport svg > g');if(!root)return;
 const arts=[...root.querySelectorAll('.map01-settlement-art')];if(arts.length!==3)return;
 // Remove the last additive package's arbitrary overlay. Keep its touch fix in CSS.
 root.querySelectorAll('.m13c-world,.m13c-castle').forEach(n=>n.remove());
 // Remove overlaid ornamental scribbles from previous passes, not roads/markers.
 root.querySelectorAll('.m13-landscape,.m13-keldra-details,.m13-dorneth-details,.m13-varnhold-details').forEach(n=>n.remove());
 // Old bridge artwork had deck centres independent of river centreline. Replace it.
 root.querySelectorAll('.m12b-crossing-holder').forEach(n=>n.remove());
 const background=E(root,'g',{class:'m13d-background','aria-hidden':'true'});
 // Behind the citadel: rising ridge, winding treeline, and shadowed castle hill.
 P(background,'M610 188 Q641 134 677 143 Q709 98 749 112 Q795 91 842 127 Q879 116 912 162 L923 239 Q857 269 797 247 Q726 266 669 237Z','m13d-back-ridge');
 P(background,'M640 194 Q700 153 747 163 T857 168 L888 235 Q789 257 693 233Z','m13d-back-slope');
 P(background,'M671 211 Q732 183 804 203 T871 226','m13d-back-contour');
 for(let i=0;i<30;i++){const x=633+(i*47)%285,y=142+(i*29)%79,r=5+(i*7)%10;if(x>698&&x<820&&y>183)continue;E(background,'ellipse',{cx:x,cy:y,rx:r,ry:r*.72,class:i%3?'m13d-back-tree':'m13d-back-tree-light'});}
 P(background,'M645 242 Q731 265 839 240 L865 262 Q757 291 653 260Z','m13d-castle-shadow');
 // Correct the two road/water crossings by drawing a short visible river channel
 // directly below each bridge, then a deck perpendicular to that water.
 const water=E(root,'g',{class:'m13d-water-crossings','aria-hidden':'true'});
 const bridgeLayer=E(root,'g',{class:'m13d-bridge-crossings','aria-hidden':'true'});
 function crossing(x,y,riverAngle,roadAngle,length){
  const w=E(water,'g',{transform:`translate(${x} ${y}) rotate(${riverAngle})`});
  P(w,'M-39 0 Q-17 -3 0 0 T39 0','m13d-water-bank');P(w,'M-39 0 Q-17 -3 0 0 T39 0','m13d-water');
  const g=E(bridgeLayer,'g',{transform:`translate(${x} ${y}) rotate(${roadAngle})`});
  const a=length/2;
  P(g,`M${-a-4} -13 L${a+4} -13 L${a+4} 13 L${-a-4} 13Z`,'m13d-bridge-shadow');
  P(g,`M${-a} -10 H${a} V10 H${-a}Z`,'m13d-bridge-deck');
  for(let v=-a+6;v<a;v+=9)P(g,`M${v} -9 V9`,'m13d-bridge-plank');
  for(const s of [-13,13]){P(g,`M${-a-3} ${s} H${a+3}`,'m13d-bridge-rail');for(let v=-a;v<=a;v+=16)P(g,`M${v} ${s-3} v6`,'m13d-bridge-post');}
 }
 crossing(499,377,14,-61,57);crossing(809,359,18,108,44);
 // Bridges must be above the roads and the water, but below settlement labels.
 const firstArt=arts[0];root.insertBefore(background,root.firstChild.nextSibling);root.insertBefore(water,firstArt);root.insertBefore(bridgeLayer,firstArt);
 // Correct road hierarchy: keep canonical geometry, replace its thick highway styling
 // with narrower, more legible cart-road edges and natural transition at bridgeheads.
 const roadDetails=E(root,'g',{class:'m13d-road-details','aria-hidden':'true'});root.insertBefore(roadDetails,firstArt);
 P(roadDetails,'M547 324 Q561 298 587 273','m13d-shoulder');P(roadDetails,'M569 309 Q586 285 606 263','m13d-shoulder');
 // Smaller hamlet roofs outside Varnhold and a real foreground/base shadow.
 const castle=arts[2];const hill=E(castle,'g',{class:'m13d-castle-base','aria-hidden':'true'});castle.insertBefore(hill,castle.firstChild);
 P(hill,'M-110 62 Q-95 36 -72 24 Q-3 55 71 20 Q105 41 113 72 Q11 104 -102 81Z','m13d-castle-base-fill');
 const fore=E(castle,'g',{class:'m13d-castle-foreground','aria-hidden':'true'});
 P(fore,'M-97 76 Q-13 90 88 72','m13d-outer-approach');
 house(fore,-96,78,.46);house(fore,88,78,.42);
 frame.dataset.map0113d='yes';
}
function scan(){document.querySelectorAll('.map01-frame').forEach(enhance)}
new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});scan();
})();
