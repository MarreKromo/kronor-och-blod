/* MAP-01.2B-E: view-only geographic map, layered over existing place UI. */
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
function limit(){scale=Math.max(0.8,Math.min(3.5,scale));offsetX=Math.max(-1000*scale+220,Math.min(780,offsetX));offsetY=Math.max(-800*scale+180,Math.min(620,offsetY));}
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
 const heading=html('div','map01-heading',undefined,frame);html('strong','', 'DORNMARK · REGIONKARTA',heading);html('span','', 'Utkast till geografi',heading);
 const viewport=html('div','map01-viewport',undefined,frame);const canvas=svg('svg',{viewBox:'0 0 1000 800',role:'img','aria-label':'Terrängkarta med vägar och orter'},viewport);
 const defs=svg('defs',{},canvas);const grad=svg('linearGradient',{id:'map01-ground',x1:'0',y1:'0',x2:'1',y2:'1'},defs);svg('stop',{offset:'0%', 'stop-color':'#53634e'},grad);svg('stop',{offset:'55%','stop-color':'#768064'},grad);svg('stop',{offset:'100%','stop-color':'#394e42'},grad);
 const g=svg('g',{},canvas);svg('rect',{width:1000,height:800,fill:'url(#map01-ground)'},g);
 // Terrain and paths are illustrative and not canonical world geometry.
 path(g,'M -60 100 Q 160 140 260 45 T 570 70 T 1070 15 L1070 -50 L-60 -50Z','map01-highlands');
 path(g,'M -20 700 Q 200 585 360 680 T 710 620 T 1080 690 L1080 850 L-20 850Z','map01-meadow');
 path(g,'M 10 140 Q 210 210 350 145 T 600 260 T 1000 230','map01-river');
 path(g,'M 10 148 Q 210 218 350 153 T 600 268 T 1000 238','map01-river-highlight');
 for(let i=0;i<46;i++){const x=45+(i*137)%940,y=85+(i*193)%650;if((x>170&&x<790&&y>270&&y<570))continue;svg('path',{d:`M ${x} ${y+13} l 9 -19 l 9 19 z`,class:'map01-tree'},g);}
 for(let i=0;i<13;i++){const x=100+i*55,y=530+(i%3)*17;svg('path',{d:`M ${x} ${y} l 36 -14 M ${x+4} ${y+10} l 36 -14`,class:'map01-field'},g);}
 for(const road of data.roads){const a=byId.get(road.from),b=byId.get(road.to);const mx=(a.x+b.x)/2+((a.y-b.y)*0.06),my=(a.y+b.y)/2-((a.x-b.x)*0.04);path(g,`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`,'map01-road '+(road.kind==='track'?'map01-track':''));}
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
 control('−',()=>interaction.zoom(1/1.3,{x:500,y:400}));control('+',()=>interaction.zoom(1.3,{x:500,y:400}));control('⌖ Här är du',()=>{scale=1;offsetX=0;offsetY=0;const p=byId.get(state.placeId);if(p){offsetX=500-p.x;offsetY=400-p.y;}limit();apply(g);});
 html('p','map01-caption','Dra kartan eller zooma med två fingrar. Tryck på en ort för att undersöka den – ingen dag förbrukas.',frame);
 const options=panel.querySelector('.travel-places');if(options)options.before(frame);
}
let queued=false;function refresh(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;if(!tab.classList.contains('active'))return;const panel=host.querySelector('.travel-panel');if(panel&&panel.querySelector('.travel-places'))paint(panel);});}
const observer=new MutationObserver(refresh);observer.observe(host,{childList:true});
tab.addEventListener('click',refresh);window.addEventListener('kb:v2-character-changed',()=>{scale=1;offsetX=offsetY=0;refresh();});window.addEventListener('kb:travel-changed',refresh);refresh();
})();
