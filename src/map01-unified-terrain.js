/* MAP-01.6 — presentation-only replacement for the legacy SVG terrain. */
(function(){'use strict';
const NS='http://www.w3.org/2000/svg';
function node(tag,attrs,parent){const e=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs||{}))e.setAttribute(k,v);if(parent)parent.appendChild(e);return e;}
function curve(parent,d,cls){return node('path',{d,class:cls},parent);}
function random(seed){return function(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
function terrain(group){const rng=random(1601250),layer=node('g',{'class':'map016-terrain','aria-hidden':'true'});
 const defs=node('defs',{},layer);const gradient=node('linearGradient',{id:'map016-base',x1:'0',y1:'0',x2:'1',y2:'1'},defs);
 [['0%','#77836a'],['43%','#8c9576'],['100%','#526958']].forEach(([offset,color])=>node('stop',{offset,'stop-color':color},gradient));
 node('rect',{x:-150,y:-150,width:2100,height:1700,fill:'url(#map016-base)'},layer);
 // Continuous broad relief with no hard-edged rectangular overlays.
 const swells=[['M-180 90 C130 -65 300 155 540 28 S930 90 1160 -20 S1580 70 1900 -40 L1900 -160 L-180 -160Z','map016-high'],['M-150 590 C100 485 290 630 510 505 S850 565 1070 445 S1440 525 1900 355 L1900 900 C1400 740 1080 850 760 710 S210 790 -150 720Z','map016-low'],['M-150 1080 C220 920 410 1060 690 890 S1120 1010 1400 840 S1710 870 1900 760 L1900 1500 L-150 1500Z','map016-valley']];
 swells.forEach(([d,c])=>curve(layer,d,c));
 // Nested curved mountain contours form a coherent northeastern massif.
 for(let i=0;i<13;i++){let y=140+i*37;curve(layer,`M760 ${y+120} C890 ${y-45} 975 ${y+55} 1110 ${y-80} S1340 ${y-15} 1470 ${y-135} S1690 ${y-60} 1850 ${y-170}`,'map016-ridge '+(i%3===0?'map016-ridge-major':''));}
 for(let i=0;i<6;i++){let y=210+i*70;curve(layer,`M895 ${y+135} C1060 ${y+65} 1140 ${y+150} 1270 ${y+20} S1500 ${y+90} 1730 ${y-65}`,'map016-ridge-shade');}
 // Fine relief strokes across the same underlying land, avoiding tile seams.
 for(let i=0;i<34;i++){let y=50+i*39;curve(layer,`M-130 ${y+28*Math.sin(i)} C210 ${y-45} 350 ${y+72} 620 ${y+6} S1100 ${y-32} 1430 ${y+14} S1740 ${y-20} 1880 ${y+10}`,'map016-isoline');}
 // River and tributary, behind original road and settlement layers.
 curve(layer,'M-80 275 C95 250 150 325 255 278 S410 210 465 294 S515 385 610 380 S795 300 1030 365 S1290 475 1580 690','map016-river-bank');
 curve(layer,'M-80 275 C95 250 150 325 255 278 S410 210 465 294 S515 385 610 380 S795 300 1030 365 S1290 475 1580 690','map016-river');
 curve(layer,'M1580 690 C1480 650 1380 760 1280 740 S1090 810 930 785 S820 860 700 930','map016-brook');
 // Forest clusters have irregular organic edges and mixed canopy marks.
 const forests=[[105,390,130,125],[375,150,110,85],[865,165,115,100],[850,650,135,120],[420,700,110,70],[280,1020,245,145],[770,1120,210,115],[1090,925,165,130],[1570,1020,130,165]];
 forests.forEach(([cx,cy,rx,ry],fi)=>{
  let d='';const steps=24;for(let i=0;i<=steps;i++){const a=i/steps*Math.PI*2;const wave=1+.11*Math.sin(a*5+fi)+.08*Math.cos(a*9+fi*2);const x=cx+Math.cos(a)*rx*wave,y=cy+Math.sin(a)*ry*wave;d+=(i?' L':'M')+x.toFixed(1)+' '+y.toFixed(1);}curve(layer,d+' Z','map016-woodland');
  const count=Math.round(rx*ry/370);for(let i=0;i<count;i++){const a=rng()*Math.PI*2,r=Math.sqrt(rng())*.86,x=cx+Math.cos(a)*rx*r,y=cy+Math.sin(a)*ry*r,size=3+rng()*7;
   if(rng()<.64)node('circle',{cx:x.toFixed(1),cy:y.toFixed(1),r:size.toFixed(1),class:'map016-canopy'},layer);
   else curve(layer,`M${(x-size).toFixed(1)} ${y.toFixed(1)} q${size} ${(-size*2).toFixed(1)} ${size*2} 0 q${-size} ${size*.7} ${-size*2} 0`,'map016-canopy-stroke');
  }
 });
 // Irregular agricultural strips and restrained ground texture.
 for(let i=0;i<14;i++){const x=85+(i%4)*39,y=560+Math.floor(i/4)*26;curve(layer,`M${x} ${y} l32 -7 l10 13 l-32 8Z`,'map016-field');}
 for(let i=0;i<18;i++){const x=240+(i%6)*49,y=845+Math.floor(i/6)*32;curve(layer,`M${x} ${y} l40 -9 l13 16 l-40 9Z`,'map016-field');}
 // Decorative names do not become interactive places or new geography IDs.
 [['BERGSTRAKTEN',1320,665],['DJUPSKOGEN',450,1190],['SÖDRA DALEN',930,975]].forEach(([s,x,y])=>{const t=node('text',{x,y,'text-anchor':'middle',class:'map016-land-label'},layer);t.textContent=s;});
 group.insertBefore(layer,group.firstChild);
}
function enhance(frame){if(frame.dataset.map016==='yes')return;const group=frame.querySelector('.map01-viewport svg > g');if(!group||!group.querySelector('.map01-road-outline'))return;
 const old=[...group.children];const firstRoad=old.findIndex(e=>e.classList&&e.classList.contains('map01-road-outline'));
 if(firstRoad<0)return;
 // Remove only old display terrain; retain roads, markers and settlement art.
 for(let i=0;i<firstRoad;i++)old[i].remove();terrain(group);frame.dataset.map016='yes';
 const caption=frame.querySelector('.map01-caption');if(caption)caption.textContent='Dra för att utforska · Nyp för att zooma · Tryck på en ort för att visa den.';
}
function scan(){document.querySelectorAll('.map01-frame').forEach(enhance);}
const observer=new MutationObserver(scan);observer.observe(document.documentElement,{childList:true,subtree:true});scan();
})();
