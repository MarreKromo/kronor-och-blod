/* MAP-01.7: illustrated landscape only; no storage, travel or calendar writes. */
(function(){'use strict';
const NS='http://www.w3.org/2000/svg';
function E(tag,attrs,parent){const n=document.createElementNS(NS,tag);Object.entries(attrs||{}).forEach(([k,v])=>n.setAttribute(k,String(v)));if(parent)parent.appendChild(n);return n;}
function P(parent,d,cls){return E('path',{d,class:cls},parent);}
function rand(seed){return()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);}
function landscape(g){const r=rand(1701250),root=E('g',{class:'map017-landscape','aria-hidden':'true'}),defs=E('defs',{},root);
const grad=E('linearGradient',{id:'map017-ground',x1:0,y1:0,x2:1,y2:1},defs);[['0%','#a9a78b'],['50%','#8e997d'],['100%','#687d6b']].forEach(([offset,c])=>E('stop',{offset,'stop-color':c},grad));
E('rect',{x:-100,y:-100,width:1950,height:1550,fill:'url(#map017-ground)'},root);
// Broad organic landforms: no rectangular tile boundaries.
P(root,'M-100 105 Q110 30 260 86 T580 72 T890 18 T1210 60 T1510 -35 L1850 -80 L1850 560 Q1630 490 1480 575 T1100 580 T700 540 T290 560 L-100 510Z','map017-upper');
P(root,'M-100 780 Q90 660 280 725 T630 695 T960 655 T1330 590 T1850 570 L1850 1450 L-100 1450Z','map017-valley');
for(let i=0;i<24;i++){const y=30+i*53,shift=r()*65;P(root,`M-60 ${y} Q210 ${y-26-shift} 410 ${y+18} T830 ${y-15} T1260 ${y+12} T1840 ${y-22}`,'map017-contour');}
// Meadows and undulating ridges; keep clear corridors around settlements.
for(let i=0;i<30;i++){const x=30+r()*1640,y=80+r()*1150,rx=35+r()*130,ry=12+r()*40;E('ellipse',{cx:x.toFixed(1),cy:y.toFixed(1),rx:rx.toFixed(1),ry:ry.toFixed(1),class:i%3===0?'map017-grass-light':'map017-grass'},root);}
// Mountain massif: continuous silhouette and interlocking ridges, rather than repeated triangles.
P(root,'M830 590 Q900 530 940 475 Q980 465 1020 392 Q1070 390 1115 320 Q1160 338 1200 272 Q1250 290 1310 220 Q1370 240 1420 160 Q1465 215 1515 200 Q1590 265 1650 245 L1850 355 L1850 845 Q1650 780 1510 805 T1210 765 T930 780 L830 735Z','map017-massif');
P(root,'M880 660 Q1040 570 1110 600 T1350 540 T1570 575 T1850 510 L1850 850 Q1570 785 1350 830 T880 780Z','map017-massif-front');
const ridge=[[980,475,92,100],[1070,405,105,135],[1160,335,135,175],[1275,370,120,155],[1370,285,155,205],[1510,310,125,165],[1610,405,135,155],[1150,555,90,100],[1350,550,115,125],[1550,565,105,115]];
ridge.forEach(([x,y,w,h],i)=>{const tipX=x+(i%3-1)*w*.13,tipY=y-h*.86,baseY=y+h*.56;
P(root,`M${x-w} ${baseY} Q${x-w*.64} ${y+h*.15} ${x-w*.43} ${y-h*.2} L${tipX} ${tipY} L${x+w*.25} ${y-h*.37} Q${x+w*.66} ${y+h*.2} ${x+w} ${baseY} Q${x} ${baseY+h*.15} ${x-w} ${baseY}Z`,'map017-ridge-dark');
P(root,`M${x-w} ${baseY} Q${x-w*.62} ${y+h*.12} ${x-w*.43} ${y-h*.2} L${tipX} ${tipY} L${x-w*.03} ${y-h*.2} L${x+w*.10} ${y+h*.2} L${x+w*.34} ${baseY+h*.06} Q${x-w*.26} ${baseY+h*.06} ${x-w} ${baseY}Z`,'map017-ridge-light');
P(root,`M${x-w*.43} ${y-h*.2} L${tipX} ${tipY} L${x+w*.25} ${y-h*.37} L${x+w*.05} ${y-h*.48} L${x-w*.12} ${y-h*.34}Z`,'map017-ridge-cap');
P(root,`M${x+w*.05} ${y-h*.42} Q${x+w*.22} ${y+h*.12} ${x+w*.38} ${baseY-h*.08} M${x-w*.35} ${y+h*.05} L${x-w*.52} ${baseY-h*.09}`,'map017-ridge-scratches');});
// River is routed through the open western valley and bends south BEFORE the mountain range.
const river='M-100 273 C60 251 143 322 248 277 S400 216 462 296 S517 385 608 380 S746 320 838 367 S913 465 872 555 S817 684 905 760 S1070 828 1170 950';
P(root,river,'map017-river-edge');P(root,river,'map017-river-water');P(root,river,'map017-river-sheen');
P(root,'M1710 815 C1560 770 1480 845 1370 833 S1180 870 1070 845 S920 930 800 955','map017-stream');
// Soft-edged woodland, varied crowns, with scattered saplings beyond the perimeter.
const woods=[[105,395,132,120],[375,153,116,92],[860,165,113,98],[855,650,132,114],[415,700,107,72],[285,1030,235,144],[775,1120,207,120],[1090,940,150,124],[1565,1010,145,168]];
woods.forEach(([cx,cy,rx,ry],idx)=>{const group=E('g',{class:'map017-wood'},root);let d='';for(let j=0;j<=72;j++){const a=j*Math.PI*2/72,w=1+.09*Math.sin(a*5+idx)+.055*Math.cos(a*9-idx),x=cx+Math.cos(a)*rx*w,y=cy+Math.sin(a)*ry*w;d+=(j?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)+' ';}P(group,d+'Z','map017-woodland-floor');
const count=Math.min(185,Math.round(rx*ry/160));for(let j=0;j<count;j++){const a=r()*Math.PI*2,rad=Math.sqrt(r())*(j%7===0?1.17:.96),x=cx+Math.cos(a)*rx*rad,y=cy+Math.sin(a)*ry*rad,s=5+r()*9;E('ellipse',{cx:x.toFixed(1),cy:y.toFixed(1),rx:(s*1.1).toFixed(1),ry:(s*.73).toFixed(1),class:j%4===0?'map017-crown-sun':'map017-crown'},group);if(j%8===0)P(group,`M${(x-s*.45).toFixed(1)} ${y.toFixed(1)} q${(s*.55).toFixed(1)} ${(-s*.65).toFixed(1)} ${s.toFixed(1)} 0`,'map017-crown-detail');}
});
// Farmsteads remain ornamental and are not resources or interactable places.
for(const [bx,by,cols,rows] of [[72,557,4,4],[255,833,5,3]])for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const x=bx+i*38+j*5,y=by+j*25-i*2;P(root,`M${x} ${y} l29 -7 l9 12 l-29 8Z`,'map017-field');if((i+j)%2===0)P(root,`M${x+8} ${y+1} l26 -7`,'map017-furrow');}
[['BERGSTRAKTEN',1370,780],['DJUPSKOGEN',450,1190],['SÖDRA DALEN',1010,1010]].forEach(([s,x,y])=>{const n=E('text',{x,y,'text-anchor':'middle',class:'map017-label'},root);n.textContent=s;});
g.insertBefore(root,g.firstChild);
}
function enhance(frame){if(frame.dataset.map017==='yes')return;const g=frame.querySelector('.map01-viewport svg > g');if(!g)return;const old=[...g.children],firstRoad=old.findIndex(n=>n.classList&&n.classList.contains('map01-road-outline'));if(firstRoad<0)return;for(let i=0;i<firstRoad;i++)old[i].remove();landscape(g);frame.dataset.map017='yes';frame.dataset.map016b='yes';const c=frame.querySelector('.map01-caption');if(c)c.textContent='Dra för att utforska · Nyp för att zooma · Välj en ort på kartan.';}
function scan(){document.querySelectorAll('.map01-frame').forEach(enhance);}const observer=new MutationObserver(scan);observer.observe(document.documentElement,{childList:true,subtree:true});scan();
})();
