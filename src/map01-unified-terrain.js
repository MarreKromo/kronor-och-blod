/* MAP-01.8: terrain art overhaul. Visual SVG only; preserves travel, roads, markers and saves. */
(function(){'use strict';
const NS='http://www.w3.org/2000/svg';
function E(tag,attrs,parent){const n=document.createElementNS(NS,tag);Object.entries(attrs||{}).forEach(([k,v])=>n.setAttribute(k,String(v)));if(parent)parent.appendChild(n);return n;}
function P(parent,d,cls){return E('path',{d,class:cls},parent);}
function rand(seed){return()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);}
function landscape(g){const r=rand(1701250),root=E('g',{class:'map018-landscape','aria-hidden':'true'}),defs=E('defs',{},root);
const grad=E('linearGradient',{id:'map018-ground',x1:0,y1:0,x2:1,y2:1},defs);[['0%','#a9a78b'],['50%','#8e997d'],['100%','#687d6b']].forEach(([offset,c])=>E('stop',{offset,'stop-color':c},grad));
E('rect',{x:-1800,y:-1800,width:6000,height:5200,fill:'url(#map018-ground)'},root);
// Broad organic landforms: no rectangular tile boundaries.
P(root,'M-100 105 Q110 30 260 86 T580 72 T890 18 T1210 60 T1510 -35 L1850 -80 L1850 560 Q1630 490 1480 575 T1100 580 T700 540 T290 560 L-100 510Z','map018-upper');
P(root,'M-100 780 Q90 660 280 725 T630 695 T960 655 T1330 590 T1850 570 L1850 1450 L-100 1450Z','map018-valley');
for(let i=0;i<24;i++){const y=30+i*53,shift=r()*65;P(root,`M-60 ${y} Q210 ${y-26-shift} 410 ${y+18} T830 ${y-15} T1260 ${y+12} T1840 ${y-22}`,'map018-contour');}
// Meadows and undulating ridges; keep clear corridors around settlements.
for(let i=0;i<30;i++){const x=30+r()*1640,y=80+r()*1150,rx=35+r()*130,ry=12+r()*40;E('ellipse',{cx:x.toFixed(1),cy:y.toFixed(1),rx:rx.toFixed(1),ry:ry.toFixed(1),class:i%3===0?'map018-grass-light':'map018-grass'},root);}
// An eroded, connected highland spine. Rock strata, spurs and gullies, not isolated pyramid icons.
const mountains=E('g',{class:'map018-mountains'},root);
P(mountains,'M800 620 C865 557 910 552 949 474 L1000 443 L1045 378 L1105 371 L1155 311 L1210 328 L1261 250 L1300 275 L1361 190 L1420 207 L1473 154 L1538 230 L1604 209 L1670 286 L1760 258 L1900 375 L2050 350 L2050 925 C1820 875 1650 922 1500 854 S1170 856 1010 825 L800 800Z','map018-massif-base');
// Continuous, broad rock shelves with stepped irregular ridgelines.
const shelves=[
'M854 666 Q930 585 980 557 L1014 496 L1051 516 L1105 425 L1154 443 L1211 346 L1268 384 L1315 294 L1360 319 L1414 238 L1464 269 L1507 221 L1555 289 L1603 270 L1654 348 L1720 335 L1795 426 L1920 437 L2050 510 L2050 716 Q1770 680 1590 729 T1220 711 T854 790Z',
'M905 748 Q990 682 1036 654 L1094 579 L1144 598 L1201 513 L1254 534 L1310 452 L1373 469 L1429 394 L1487 429 L1546 373 L1600 459 L1667 437 L1728 527 L1800 510 L1900 610 L2050 650 L2050 852 Q1750 795 1540 837 T1120 833 L905 840Z'];
shelves.forEach((d,i)=>P(mountains,d,i?'map018-shelf-front':'map018-shelf-back'));
// Angular rock facets connect across the entire range rather than forming individual triangles.
const facets=[
['M1014 496 L1051 516 L1105 425 L1148 462 L1108 555 L1058 596Z','light'],
['M1105 425 L1154 443 L1211 346 L1255 390 L1202 512 L1144 598Z','dark'],
['M1211 346 L1268 384 L1315 294 L1358 325 L1308 452 L1254 534Z','light'],
['M1315 294 L1360 319 L1414 238 L1460 275 L1429 394 L1373 469Z','dark'],
['M1414 238 L1464 269 L1507 221 L1548 296 L1487 429 L1429 394Z','light'],
['M1507 221 L1555 289 L1603 270 L1650 349 L1600 459 L1546 373Z','dark'],
['M1603 270 L1654 348 L1720 335 L1795 426 L1728 527 L1667 437Z','light'],
['M1094 579 L1144 598 L1201 513 L1254 534 L1200 676 L1120 739Z','dark'],
['M1254 534 L1310 452 L1373 469 L1429 394 L1403 588 L1320 698Z','light'],
['M1487 429 L1546 373 L1600 459 L1667 437 L1620 608 L1535 650Z','dark']];
facets.forEach(([d,c])=>P(mountains,d,'map018-facet-'+c));
// Broken crags, erosion and fine ridge etching; restrained to keep mobile readability.
const fractures=['M1040 511 L1082 480 L1070 540 L1112 570','M1172 437 L1193 469 L1167 537 L1200 563','M1282 390 L1301 429 L1269 496 L1300 536','M1391 321 L1412 352 L1386 415 L1400 459','M1518 279 L1505 338 L1531 371 L1510 411','M1637 353 L1622 404 L1652 445','M1128 625 L1095 678 L1124 707','M1340 521 L1321 568 L1354 613','M1578 490 L1552 550 L1575 579'];
fractures.forEach(d=>P(mountains,d,'map018-fracture'));
for(let i=0;i<32;i++){const x=910+i*34,y=770+Math.sin(i*.48)*22+(i%3)*9;P(mountains,`M${x} ${y} q${15+(i%3)*9} ${-12-(i%4)*5} ${35+(i%5)*8} -5`,'map018-talus');}
// Patchy highland vegetation follows the lower foothills.
for(let i=0;i<42;i++){const x=920+r()*970,y=765+r()*100;E('ellipse',{cx:x.toFixed(1),cy:y.toFixed(1),rx:(8+r()*24).toFixed(1),ry:(3+r()*9).toFixed(1),class:'map018-scree'},mountains);}
// River is routed through the open western valley and bends south BEFORE the mountain range.
const river='M-100 273 C60 251 143 322 248 277 S400 216 462 296 S517 385 608 380 S746 320 838 367 S913 465 872 555 S817 684 905 760 S1070 828 1170 950';
P(root,river,'map018-river-edge');P(root,river,'map018-river-water');P(root,river,'map018-river-sheen');
P(root,'M1710 815 C1560 770 1480 845 1370 833 S1180 870 1070 845 S920 930 800 955','map018-stream');
// Forest systems: interlocking stands and dispersed woodland edges, no ellipse islands.
const woods=[
 [100,410,125,120,4],[370,165,135,92,3],[857,175,140,92,4],
 [846,665,165,140,5],[425,700,132,80,3],[280,1040,250,155,6],
 [780,1130,235,133,6],[1100,970,175,140,5],[1590,1035,165,160,5]
];
woods.forEach(([cx,cy,rx,ry,stands],idx)=>{
 const forest=E('g',{class:'map018-forest'},root);
 // Smaller overlapping, irregular patches; open glades remain between canopies.
 for(let k=0;k<stands;k++){
  const a=k*Math.PI*2/stands+.6,px=cx+Math.cos(a)*rx*.37,py=cy+Math.sin(a)*ry*.32;
  const sx=rx*(.46+r()*.16),sy=ry*(.49+r()*.17);
  let d='';for(let j=0;j<=30;j++){const t=j*Math.PI*2/30,w=1+.17*Math.sin(t*5+k*1.7)+.12*Math.sin(t*9+idx),x=px+Math.cos(t)*sx*w,y=py+Math.sin(t)*sy*w;d+=(j?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)+' ';}
  P(forest,d+'Z','map018-understory');
 }
 const n=Math.min(280,Math.round(rx*ry/105));
 for(let j=0;j<n;j++){
  const a=r()*Math.PI*2,rad=Math.sqrt(r())*(j%6===0?1.16:1),x=cx+Math.cos(a)*rx*rad,y=cy+Math.sin(a)*ry*rad;
  // Keep the canopy in staggered groves; breaks create paths and natural clearings.
  if(Math.sin(x*.024+y*.015+idx)>0.74&&j%3!==0)continue;
  const s=4+r()*9,cl=j%9===0?'map018-canopy-highlight':j%4===0?'map018-canopy-mid':'map018-canopy';
  E('path',{d:`M${(x-s).toFixed(1)} ${y.toFixed(1)} q${(-s*.4).toFixed(1)} ${(-s*.9).toFixed(1)} ${(s*.35).toFixed(1)} ${(-s*1.18).toFixed(1)} q${(s*.75).toFixed(1)} ${(-s*.65).toFixed(1)} ${(s*1.25).toFixed(1)} ${(-s*.12).toFixed(1)} q${(s*.95).toFixed(1)} ${(-s*.18).toFixed(1)} ${(s*1.03).toFixed(1)} ${(s*.7).toFixed(1)} q${(-s*.25).toFixed(1)} ${(s*.7).toFixed(1)} ${(-s*1.2).toFixed(1)} ${(s*.8).toFixed(1)} q${(-s*.9).toFixed(1)} ${(s*.3).toFixed(1)} ${(-s*1.43).toFixed(1)} ${(-s*.2).toFixed(1)}Z`,class:cl},forest);
  if(j%7===0)P(forest,`M${(x-s*.35).toFixed(1)} ${(y-s*.35).toFixed(1)} q${(s*.45).toFixed(1)} ${(-s*.4).toFixed(1)} ${(s*.8).toFixed(1)} ${(-s*.05).toFixed(1)}`,'map018-canopy-etch');
 }
});
// Farmsteads remain ornamental and are not resources or interactable places.
for(const [bx,by,cols,rows] of [[72,557,4,4],[255,833,5,3]])for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const x=bx+i*38+j*5,y=by+j*25-i*2;P(root,`M${x} ${y} l29 -7 l9 12 l-29 8Z`,'map018-field');if((i+j)%2===0)P(root,`M${x+8} ${y+1} l26 -7`,'map018-furrow');}
[['BERGSTRAKTEN',1370,780],['DJUPSKOGEN',450,1190],['SÖDRA DALEN',1010,1010]].forEach(([s,x,y])=>{const n=E('text',{x,y,'text-anchor':'middle',class:'map018-label'},root);n.textContent=s;});
g.insertBefore(root,g.firstChild);
}
function enhance(frame){if(frame.dataset.map018==='yes')return;const g=frame.querySelector('.map01-viewport svg > g');if(!g)return;const old=[...g.children],firstRoad=old.findIndex(n=>n.classList&&n.classList.contains('map01-road-outline'));if(firstRoad<0)return;for(let i=0;i<firstRoad;i++)old[i].remove();landscape(g);frame.dataset.map018='yes';frame.dataset.map016b='yes';const c=frame.querySelector('.map01-caption');if(c)c.textContent='Dra för att utforska · Nyp för att zooma · Välj en ort på kartan.';}
function scan(){document.querySelectorAll('.map01-frame').forEach(enhance);}const observer=new MutationObserver(scan);observer.observe(document.documentElement,{childList:true,subtree:true});scan();
})();
