/* MAP-01.4: expanded Dornmark geography, view-only. */
(function(){'use strict';
const model=window.KB_MAP01_WORLD,travel=window.KB_V2_TRAVEL;
const host=document.getElementById('storyText'),tab=document.getElementById('mapTab');
if(!model||!travel||!host||!tab)return;
const data=model.getData(), check=model.validate(data,Object.keys(travel.PLACES));
if(!check.ok){console.warn('MAP-01: invalid geography',check.issues);return;}
const NS='http://www.w3.org/2000/svg';
let scale=1,offsetX=0,offsetY=0,gesture=false,activePointers=new Map(),start=null,previousDistance=0;
const byId=new Map([...data.settlements,...data.junctions].map(p=>[p.id,p]));
function svg(tag,attrs={},parent){const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,String(v));if(parent)parent.append(n);return n;}
function html(tag,cls,text,parent){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;if(parent)parent.append(e);return e;}
function path(parent,d,cls){return svg('path',{d,class:cls},parent);}
function apply(group){group.setAttribute('transform',`translate(${offsetX} ${offsetY}) scale(${scale})`);}
function limit(){scale=Math.max(0.8,Math.min(3.5,scale));offsetX=Math.max(-1700*scale+220,Math.min(780,offsetX));offsetY=Math.max(-1300*scale+180,Math.min(620,offsetY));}
function distance(a,b){return Math.hypot(a.x-b.x,a.y-b.y);}
function attach(canvas,group){
 function position(e){const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*1000/r.width,y:(e.clientY-r.top)*800/r.height};}
 function zoom(f,anchor){const old=scale;scale*=f;limit();offsetX=anchor.x-(anchor.x-offsetX)*(scale/old);offsetY=anchor.y-(anchor.y-offsetY)*(scale/old);limit();apply(group);}
 canvas.addEventListener('pointerdown',e=>{if(e.target.closest?.('[data-place]'))return;canvas.setPointerCapture?.(e.pointerId);activePointers.set(e.pointerId,position(e));start=position(e);gesture=false;previousDistance=0;});
 canvas.addEventListener('pointermove',e=>{if(!activePointers.has(e.pointerId))return;const p=position(e),old=activePointers.get(e.pointerId);activePointers.set(e.pointerId,p);const points=[...activePointers.values()];if(points.length>=2){gesture=true;const dist=distance(points[0],points[1]);const center={x:(points[0].x+points[1].x)/2,y:(points[0].y+points[1].y)/2};if(previousDistance)zoom(dist/previousDistance,center);previousDistance=dist;}else if(start){const dx=p.x-old.x,dy=p.y-old.y;if(Math.abs(dx)+Math.abs(dy)>0.1){gesture=true;offsetX+=dx;offsetY+=dy;limit();apply(group);}}});
 function end(e){activePointers.delete(e.pointerId);previousDistance=0;if(!activePointers.size)start=null;}
 canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);
 canvas.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?1.13:1/1.13,position(e));},{passive:false});
 return {zoom};
}
function paint(panel){
 if(panel.querySelector('.map01-frame'))return;
 const state=travel.getState();if(!state.ok)return;
 const frame=html('section','map01-frame',undefined);frame.setAttribute('aria-label','Geografisk karta över Dornmark');
 const heading=html('div','map01-heading',undefined,frame);html('strong','', 'DORNMARK · REGIONKARTA',heading);html('span','', 'Dornmark · År 1250',heading);
 const viewport=html('div','map01-viewport',undefined,frame);const canvas=svg('svg',{viewBox:'0 0 1000 800',role:'img','aria-label':'Terrängkarta med vägar och orter'},viewport);
 const defs=svg('defs',{},canvas);const grad=svg('linearGradient',{id:'map01-ground',x1:'0',y1:'0',x2:'1',y2:'1'},defs);svg('stop',{offset:'0%', 'stop-color':'#53634e'},grad);svg('stop',{offset:'55%','stop-color':'#768064'},grad);svg('stop',{offset:'100%','stop-color':'#394e42'},grad);
 const g=svg('g',{},canvas);svg('rect',{width:1700,height:1300,fill:'url(#map01-ground)'},g);
 // Layered terrain: deterministic artwork, provisional layout only.
 const hillPaths=[
  'M-35 125 C80 50 175 110 260 43 S425 10 555 85 S820 12 1040 65 L1040 -30 L-35 -30Z',
  'M-35 178 C105 118 172 181 280 108 S460 76 590 138 S850 60 1040 125',
  'M-35 214 C110 155 185 213 310 145 S480 119 595 177 S850 100 1040 168',
  'M-20 740 C120 655 210 740 330 675 S520 705 640 625 S855 650 1030 565 L1030 830 L-20 830Z'];
 path(g,hillPaths[0],'map01-highlands');
 path(g,hillPaths[1],'map01-contour');path(g,hillPaths[2],'map01-contour map01-contour-soft');
 path(g,hillPaths[3],'map01-meadow');
 for(let i=0;i<7;i++){const y=610+i*21;path(g,`M -30 ${y+90} C 140 ${y-28} 260 ${y+85} 430 ${y+9} S 740 ${y+35} 1040 ${y-70}`,'map01-contour map01-contour-soft');}
 const river='M-30 275 C95 250 150 325 255 278 S410 210 465 294 S515 385 610 380 S795 300 1030 365';
 path(g,river,'map01-river-bank');path(g,river,'map01-river');
 path(g,'M-30 269 C95 244 150 319 255 272 S410 204 465 288 S515 379 610 374 S795 294 1030 359','map01-river-light');
 // Organic woodland masses rather than scattered triangle symbols.
 const forests=[{x:95,y:385,rx:150,ry:130},{x:380,y:155,rx:125,ry:92},{x:875,y:185,rx:150,ry:135},{x:865,y:650,rx:170,ry:160},{x:445,y:695,rx:130,ry:80}];
 let seed=317;function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
 for(const f of forests){
  const outline=`M ${f.x-f.rx} ${f.y} C ${f.x-f.rx*.95} ${f.y-f.ry*.75} ${f.x-f.rx*.55} ${f.y-f.ry*1.2} ${f.x} ${f.y-f.ry} S ${f.x+f.rx*1.1} ${f.y-f.ry*.55} ${f.x+f.rx} ${f.y} S ${f.x+f.rx*.65} ${f.y+f.ry} ${f.x} ${f.y+f.ry} S ${f.x-f.rx*1.2} ${f.y+f.ry*.5} ${f.x-f.rx} ${f.y}Z`;
  path(g,outline,'map01-forest-mass');
  for(let j=0;j<55;j++){const theta=rnd()*Math.PI*2,radius=Math.sqrt(rnd())*.87,x=f.x+Math.cos(theta)*radius*f.rx,y=f.y+Math.sin(theta)*radius*f.ry;
   const size=7+rnd()*9;svg('path',{d:`M${x} ${y-size} l${size*.67} ${size*1.1} h${-size*.42} l${size*.55} ${size*.7} h${-size*1.6} l${size*.55} ${-size*.7} h${-size*.42}Z`,class:'map01-tree'},g);
  }
 }
 // Small agricultural parcels clustered near Keldra, not distributed randomly.
 for(let i=0;i<9;i++){const x=70+(i%3)*40,y=555+Math.floor(i/3)*26;svg('path',{d:`M${x} ${y} l32 -7 l11 15 l-32 7Z`,class:'map01-farm'},g);}
 for(let i=0;i<12;i++){const x=82+(i%4)*28,y=568+Math.floor(i/4)*21;path(g,`M${x} ${y} l27 -6`,'map01-field');}
 // MAP-01.4: land beyond the initial viewport, no travel or save changes.
 const far=svg('g',{class:'map014-wilderness'},g);
 path(far,'M930 90 C1100 20 1250 110 1400 45 S1600 80 1750 5 L1750 780 C1580 670 1490 750 1350 650 S1110 590 930 650Z','map014-uplands');
 for(let i=0;i<10;i++){
  const y=130+i*54;
  path(far,`M930 ${y} C1090 ${y-55} 1180 ${y+50} 1320 ${y-15} S1560 ${y+10} 1730 ${y-60}`,'map014-contour');
 }
 const peaks=[{x:1120,y:210,s:1.2},{x:1285,y:185,s:1.55},{x:1450,y:255,s:1.4},{x:1590,y:165,s:1.2},{x:1360,y:405,s:1.1},{x:1530,y:465,s:1.35},{x:1180,y:480,s:0.9}];
 for(const m of peaks){const peak=svg('g',{transform:`translate(${m.x} ${m.y}) scale(${m.s})`},far);
  path(peak,'M-90 68 L-26 -56 L3 -96 L40 -26 L100 68Z','map014-mountain-shadow');
  path(peak,'M-90 68 L3 -96 L18 -11 L100 68Z','map014-mountain');
  path(peak,'M3 -96 L-27 -37 L-5 -42 L10 -27 L18 -11Z','map014-mountain-ridge');
  path(peak,'M-42 14 L-18 -21 M22 2 L45 34 M-4 -44 L-12 -20','map014-mountain-lines');
 }
 path(far,'M1605 710 C1500 630 1410 740 1300 715 S1100 770 990 745 S870 810 800 825','map014-stream-bank');
 path(far,'M1605 710 C1500 630 1410 740 1300 715 S1100 770 990 745 S870 810 800 825','map014-stream');
 const extraForests=[{x:280,y:1010,rx:270,ry:170},{x:780,y:1110,rx:255,ry:140},{x:1090,y:910,rx:200,ry:150},{x:1570,y:1000,rx:135,ry:195}];
 for(const f of extraForests){
  svg('ellipse',{cx:f.x,cy:f.y,rx:f.rx,ry:f.ry,class:'map014-woodland'},far);
  for(let i=0;i<72;i++){
   const a=rnd()*Math.PI*2,r=Math.sqrt(rnd())*.88,x=f.x+Math.cos(a)*r*f.rx,y=f.y+Math.sin(a)*r*f.ry,size=8+rnd()*12;
   path(far,`M${x} ${y-size} l${size*.68} ${size*1.3} h${-size*.42} l${size*.55} ${size*.75} h${-size*1.62} l${size*.55} ${-size*.75} h${-size*.42}Z`,'map01-tree');
  }
 }
 for(let i=0;i<15;i++){const x=250+(i%5)*57,y=825+Math.floor(i/5)*34;
  path(far,`M${x} ${y} l44 -8 l16 22 l-44 8Z`,'map01-farm');
 }
 // Landmark symbols denote future resource zones, not playable sites.
 const quarry=svg('g',{transform:'translate(1250 625)',class:'map014-landmark'},far);
 path(quarry,'M-42 22 L-20 -8 L4 6 L26 -28 L51 18 L21 34Z','map014-quarry');
 path(quarry,'M-12 15 L4 6 L12 22 M26 -28 L28 16','map014-quarry-cut');
 const ore=svg('text',{x:1250,y:685,class:'map014-region-label','text-anchor':'middle'},far);ore.textContent='BERGSTRAKTEN';
 const oreSub=svg('text',{x:1250,y:711,class:'map014-sub-label','text-anchor':'middle'},far);oreSub.textContent='Framtida gruvmarker';
 const woods=svg('text',{x:450,y:1165,class:'map014-region-label','text-anchor':'middle'},far);woods.textContent='DJUPSKOGEN';
 const woodsSub=svg('text',{x:450,y:1191,class:'map014-sub-label','text-anchor':'middle'},far);woodsSub.textContent='Framtida jaktmarker';
 const valley=svg('text',{x:930,y:960,class:'map014-region-label','text-anchor':'middle'},far);valley.textContent='SÖDRA DALEN';
 // The cartographic boundary is decorative; geographic data remains provisional.
 path(g,'M1030 780 C1190 790 1280 820 1450 780 S1660 790 1740 830','map014-contour');
 // Road geometry is display-only; availability and duration stay with KB_V2_TRAVEL.
 const roadShapes={
 'road-keldra-west':'M230 540 C275 545 326 501 365 480',
 'road-west-cross':'M365 480 C398 450 462 429 500 395',
 'road-cross-dorneth':'M500 395 C556 390 602 342 670 330',
 'road-cross-north':'M500 395 C485 340 541 283 580 225',
 'road-north-varnhold':'M580 225 C630 194 686 171 760 150',
 'road-dorneth-east':'M670 330 C750 325 785 375 880 380'};
 for(const road of data.roads){const d=roadShapes[road.id];if(!d)continue;path(g,d,'map01-road-outline');path(g,d,'map01-road '+(road.kind==='track'?'map01-track':''));}
 // Named places gain miniature landscape-specific silhouettes.
 for(const place of data.settlements){const p=svg('g',{transform:`translate(${place.x} ${place.y})`,class:'map01-settlement-art'},g);
  if(place.id==='keldra'){
   for(const [x,y] of [[-32,12],[-8,18],[23,10]]){svg('rect',{x,y,width:15,height:11,rx:1,class:'map01-house'},p);svg('path',{d:`M${x-3} ${y} l10 -10 l11 10Z`,class:'map01-roof'},p);}
  }else if(place.id==='dorneth'){
   svg('rect',{x:-21,y:7,width:22,height:17,class:'map01-house'},p);svg('path',{d:'M-25 7 L-10 -7 L5 7Z',class:'map01-roof'},p);svg('circle',{cx:23,cy:15,r:14,class:'map01-mill-wheel'},p);svg('path',{d:'M23 1 V29 M9 15 H37 M13 5 L33 25 M33 5 L13 25',class:'map01-mill-spoke'},p);
  }else{
   svg('rect',{x:-23,y:-3,width:46,height:26,class:'map01-castle'},p);for(const x of [-26,13]){svg('rect',{x,y:-16,width:13,height:37,class:'map01-castle'},p);svg('path',{d:`M${x-2} -16 l8 -13 l9 13Z`,class:'map01-roof'},p);}
  }
 }
 const labels=svg('g',{class:'map01-labels'},g);
 for(const place of data.settlements){const current=state.placeId===place.id;const marker=svg('g',{transform:`translate(${place.x} ${place.y})`,'data-place':place.id,role:'button',tabindex:'0','aria-label':'Visa '+travel.PLACES[place.id].name},labels);
 svg('circle',{r:current?17:14,class:'map01-dot '+(current?'map01-current':'')},marker);
 svg('circle',{r:5,class:'map01-dot-inner'},marker);
 const label=svg('text',{x:0,y:-24,'text-anchor':'middle',class:'map01-place-name'},marker);label.textContent=travel.PLACES[place.id].name;
 function choose(){const button=panel.querySelector(`.travel-place[aria-label="Visa ${travel.PLACES[place.id].name}"]`);if(button)button.click();}
 marker.addEventListener('click',e=>{e.stopPropagation();choose();});marker.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose();}});
 }
 apply(g);const actions=html('div','map01-controls',undefined,frame);const interaction=attach(canvas,g);
 function control(label,cb){const b=html('button','map01-control',label,actions);b.type='button';b.addEventListener('click',cb);return b;}
 control('−',()=>interaction.zoom(1/1.3,{x:500,y:400}));control('+',()=>interaction.zoom(1.3,{x:500,y:400}));control('⛰ Berg',()=>{scale=1;offsetX=500-1290;offsetY=400-430;limit();apply(g);});control('⌖ Här är du',()=>{scale=1;offsetX=0;offsetY=0;const p=byId.get(state.placeId);if(p){offsetX=500-p.x;offsetY=400-p.y;}limit();apply(g);});
 html('p','map01-caption','Dra kartan mot öster eller söder för nya landskap. Berg och jaktmarker är ännu inte spelbara. Välj en ort för att se befintliga resvägar.',frame);
 const options=panel.querySelector('.travel-places');if(options){options.before(frame);const outdated=[...panel.querySelectorAll('p')].find(p=>p.textContent==='En geografisk världskarta kommer i ett senare kapitel.');outdated?.remove();}
}
let queued=false;function refresh(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;if(!tab.classList.contains('active'))return;const panel=host.querySelector('.travel-panel');if(panel&&panel.querySelector('.travel-places'))paint(panel);});}
const observer=new MutationObserver(refresh);observer.observe(host,{childList:true});
tab.addEventListener('click',refresh);window.addEventListener('kb:v2-character-changed',()=>{scale=1;offsetX=offsetY=0;refresh();});window.addEventListener('kb:travel-changed',refresh);refresh();
})();
