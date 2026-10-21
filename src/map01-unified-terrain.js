/* MAP-01.6B — deterministic, display-only illustrated terrain. */
(function(){'use strict';
const NS='http://www.w3.org/2000/svg';
function el(t,a,p){const n=document.createElementNS(NS,t);for(const [k,v] of Object.entries(a||{}))n.setAttribute(k,String(v));if(p)p.appendChild(n);return n;}
function path(p,d,c){return el('path',{d,class:c},p);}
function rng(seed){return()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);}
function draw(g){const r=rng(125016),root=el('g',{class:'map016b-landscape','aria-hidden':'true'});const defs=el('defs',{},root);
const base=el('linearGradient',{id:'map016b-ground',x1:0,y1:0,x2:.7,y2:1},defs);[['0%','#92977b'],['55%','#858e72'],['100%','#697a67']].forEach(([offset,c])=>el('stop',{offset,'stop-color':c},base));
el('rect',{x:-100,y:-100,width:1950,height:1550,fill:'url(#map016b-ground)'},root);
path(root,'M-100 85 C120 -10 250 100 420 45 S760 100 920 -25 S1300 70 1500 -20 S1770 20 1850 -80 L1850 -100 L-100 -100Z','map016b-upland');
path(root,'M-100 610 C100 525 260 625 470 545 S800 600 1030 505 S1430 570 1850 420 L1850 910 C1510 830 1200 905 880 785 S230 830 -100 745Z','map016b-lowland');
path(root,'M-100 1030 C180 920 360 1070 650 910 S1100 1050 1420 860 S1700 910 1850 760 L1850 1450 L-100 1450Z','map016b-meadow');
for(let i=0;i<38;i++){const y=35+i*34;path(root,`M-70 ${y} C160 ${y-38} 360 ${y+46} 600 ${y+8} S1030 ${y-35} 1320 ${y+13} S1630 ${y-20} 1830 ${y+5}`,'map016b-texture');}
// Mountains: interlocking shaded rock faces with individual peaks and foothills.
const mountains=[[1010,375,155,175],[1150,310,180,220],[1305,355,165,205],[1455,295,180,245],[1590,390,160,190],[1160,565,135,135],[1410,565,155,150],[1660,555,150,165]];
path(root,'M825 600 C930 480 975 490 1040 425 S1160 410 1220 340 S1380 385 1470 300 S1630 385 1810 360 L1810 850 C1550 760 1420 820 1270 730 S960 765 825 730Z','map016b-foothills');
mountains.forEach(([x,y,w,h],i)=>{const p=el('g',{class:'map016b-peak'},root),top=y-h*.72,left=x-w*.72,right=x+w*.76,bottom=y+h*.58;
 path(p,`M${left} ${bottom} Q${x-w*.45} ${y+h*.12} ${x-w*.31} ${y-h*.22} L${x-w*.11} ${y-h*.39} L${x} ${top} L${x+w*.15} ${y-h*.36} L${x+w*.33} ${y-h*.18} Q${x+w*.48} ${y+h*.1} ${right} ${bottom} Q${x} ${bottom+h*.13} ${left} ${bottom}Z`,'map016b-peak-shadow');
 path(p,`M${left} ${bottom} Q${x-w*.45} ${y+h*.12} ${x-w*.31} ${y-h*.22} L${x-w*.11} ${y-h*.39} L${x} ${top} L${x+w*.07} ${y-h*.2} L${x+w*.1} ${y+h*.16} L${x+w*.21} ${bottom+h*.07} Q${x-w*.22} ${bottom+h*.08} ${left} ${bottom}Z`,'map016b-peak-face');
 path(p,`M${x-w*.11} ${y-h*.39} L${x} ${top} L${x+w*.15} ${y-h*.36} L${x+w*.06} ${y-h*.42} L${x-w*.015} ${y-h*.31}Z`,'map016b-peak-cap');
 path(p,`M${x+w*.07} ${y-h*.2} L${x+w*.28} ${y+h*.28} M${x-w*.18} ${y-h*.12} L${x-w*.32} ${y+h*.31} M${x+w*.39} ${y+h*.13} L${x+w*.51} ${bottom-h*.06}`,'map016b-peak-etch');
 for(let j=0;j<3;j++){const yy=bottom+12+j*16;path(root,`M${x-w*.8} ${yy} Q${x} ${yy-18-j*5} ${x+w*.85} ${yy+6}`,'map016b-foothill-line');}
});
// Rivers: continuous and behind roads, villages and labels.
const river='M-80 275 C95 250 150 325 255 278 S410 210 465 294 S515 385 610 380 S795 300 1030 365 S1290 475 1580 690';path(root,river,'map016b-river-bank');path(root,river,'map016b-river');path(root,river,'map016b-river-glint');
path(root,'M1580 690 C1480 650 1380 760 1280 740 S1090 810 930 785 S820 860 700 930','map016b-brook');
// Forests: softened organic perimeters, individual overlapping crowns and edge saplings.
const forests=[[105,390,130,125],[375,150,110,85],[865,165,115,100],[850,650,135,120],[420,700,110,70],[280,1020,245,145],[770,1120,210,115],[1090,925,165,130],[1570,1020,130,165]];
forests.forEach(([cx,cy,rx,ry],fi)=>{const forest=el('g',{class:'map016b-forest'},root);let d='';const steps=42;for(let i=0;i<=steps;i++){const a=i/steps*Math.PI*2,w=1+.045*Math.sin(a*7+fi)+.035*Math.cos(a*11+fi*2),x=cx+Math.cos(a)*rx*w,y=cy+Math.sin(a)*ry*w;d+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1);}path(forest,d+'Z','map016b-forest-floor');
 const count=Math.min(210,Math.round(rx*ry/135));for(let i=0;i<count;i++){const a=r()*Math.PI*2,rad=Math.sqrt(r())*.98,x=cx+Math.cos(a)*rx*rad,y=cy+Math.sin(a)*ry*rad,sz=5+r()*9;el('ellipse',{cx:x.toFixed(1),cy:y.toFixed(1),rx:sz.toFixed(1),ry:(sz*.72).toFixed(1),class:i%5===0?'map016b-tree-light':'map016b-tree'},forest);if(i%9===0)path(forest,`M${(x-sz*.5).toFixed(1)} ${(y-sz*.1).toFixed(1)} q${(sz*.5).toFixed(1)} ${(-sz*.8).toFixed(1)} ${sz.toFixed(1)} 0`,'map016b-tree-etch');}
});
// Fields and paths of cultivation near villages; not gameplay resources.
for(const [bx,by,cols,rows] of [[75,555,4,4],[250,840,6,3]])for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const x=bx+i*39+j*4,y=by+j*26-i*2;path(root,`M${x} ${y} l29 -7 l10 12 l-29 8Z`,'map016b-field');}
[['BERGSTRAKTEN',1300,745],['DJUPSKOGEN',450,1190],['SÖDRA DALEN',930,975]].forEach(([s,x,y])=>{const n=el('text',{x,y,'text-anchor':'middle',class:'map016b-land-label'},root);n.textContent=s;});
g.insertBefore(root,g.firstChild);
}
function enhance(frame){if(frame.dataset.map016b==='yes')return;const group=frame.querySelector('.map01-viewport svg > g');if(!group)return;const children=[...group.children],road=children.findIndex(n=>n.classList?.contains('map01-road-outline'));if(road<0)return;for(let i=0;i<road;i++)children[i].remove();draw(group);frame.dataset.map016b='yes';const caption=frame.querySelector('.map01-caption');if(caption)caption.textContent='Dra för att utforska · Nyp för att zooma · Välj en ort på kartan.';}
function scan(){document.querySelectorAll('.map01-frame').forEach(enhance);}
const observer=new MutationObserver(scan);observer.observe(document.documentElement,{childList:true,subtree:true});scan();
})();
