/* MAP-01.12 consolidated settlement art, roads and farms; view-only. */
(function(){'use strict';const NS='http://www.w3.org/2000/svg';
function E(p,t,a={}){const n=document.createElementNS(NS,t);Object.entries(a).forEach(([k,v])=>n.setAttribute(k,String(v)));p.appendChild(n);return n;}
function P(p,d,c){return E(p,'path',{d,class:c});}function G(p,c){return E(p,'g',{class:c,'aria-hidden':'true'});}function R(p,x,y,w,h,c){return E(p,'rect',{x,y,width:w,height:h,class:c});}
function house(p,x,y,s=1,inn=false){const g=E(p,'g',{transform:`translate(${x} ${y}) scale(${s})`});E(g,'ellipse',{cx:0,cy:14,rx:20,ry:7,class:'m12-shadow'});R(g,-17,-2,34,19,'m12-wall');P(g,'M-22 -2 L-3 -22 L22 -2Z',inn?'m12-inn-roof':'m12-roof');R(g,-3,7,8,10,'m12-door');R(g,-12,4,5,5,'m12-window');R(g,10,4,5,5,'m12-window');if(inn){P(g,'M17 -14 V-37 M17 -35 H40 V-19 H17Z','m12-sign');P(g,'M23 -27 h11','m12-sign-mark');}}
function farms(root){const g=G(root,'m12-farms');const plots=[['M-30 595 Q15 577 62 588 L72 640 Q23 654 -33 637Z',0],['M78 590 Q127 571 170 592 L180 639 Q134 655 86 643Z',1],['M191 602 Q235 589 270 612 L275 662 Q229 668 197 651Z',2],['M-17 653 Q31 639 88 654 L94 710 Q37 717 -17 698Z',1],['M106 657 Q160 642 204 660 L210 719 Q157 729 109 712Z',0],['M220 679 Q263 663 304 684 L313 735 Q270 748 225 730Z',2],['M86 743 Q139 729 190 747 L198 800 Q143 810 93 794Z',2],['M211 751 Q262 739 313 756 L321 810 Q262 826 215 803Z',1],['M135 816 Q191 803 245 817 L251 875 Q195 884 139 864Z',0],['M307 832 Q359 816 410 833 L416 887 Q364 896 311 879Z',1]];plots.forEach(([d,k],i)=>{const id='m12-field-'+i,defs=E(g,'defs'),clip=E(defs,'clipPath',{id});P(clip,d,'m12-clip');P(g,d,['m12-grain','m12-earth','m12-pasture'][k]);const rows=E(g,'g',{'clip-path':`url(#${id})`});for(let j=0;j<19;j++){const x=-65+j*30+(i%3)*5;P(rows,`M${x} 565 Q${x-9} 700 ${x+14} 918`,'m12-furrow');}});P(g,'M120 570 Q142 616 168 651 T218 751 T315 892','m12-farm-lane');P(g,'M40 644 Q69 635 102 650 T188 657 M89 730 Q136 733 184 727','m12-irrigation');P(g,'M-21 708 Q35 722 94 712 M214 813 Q267 827 325 811','m12-hedge');for(const [x,y] of [[51,689],[218,737],[326,875]])P(g,`M${x-10} ${y+6} Q${x} ${y-15} ${x+10} ${y+6}Z`,'m12-hay');for(const [x,y] of [[100,557],[210,611],[278,779]])house(g,x,y,.55);}
function roads(root){const g=G(root,'m12-roadside');/* No duplicate main-road path: existing segments receive new CSS. */P(g,'M609 205 Q632 229 654 242 M711 173 Q729 197 737 222 M565 239 Q547 225 526 230','m12-lane');P(g,'M632 214 Q659 196 693 209 L710 234 Q671 253 640 234Z','m12-inn-yard');house(g,664,216,1.13,true);for(const [x,y,s] of [[709,241,.7],[623,266,.54],[814,242,.62],[843,230,.56],[690,267,.54]])house(g,x,y,s);P(g,'M709 259 Q750 275 811 250','m12-lane');P(g,'M788 272 L829 265 L838 287 L795 290Z','m12-fence');for(let i=0;i<6;i++)P(g,`M${790+i*8} 270 l3 19`,'m12-fence-post');for(const [x,y] of [[546,299],[605,219],[721,175],[350,486]])P(g,`M${x-4} ${y+2} l2 -11 l7 -1 l2 12Z`,'m12-waystone');P(g,'M605 221 V194 M605 198 h25 l-6 11 h-19Z','m12-signpost');}
function grounds(root){const g=G(root,'m12-grounds');P(g,'M594 343 Q648 310 704 323 T779 352 L783 402 Q713 427 630 400Z','m12-town-ground');P(g,'M611 375 Q669 356 728 379 M675 325 Q684 358 706 390','m12-lane');for(const [x,y,s] of [[603,368,.64],[625,414,.65],[730,415,.67],[746,347,.6]])house(g,x,y,s);P(g,'M738 371 Q762 371 787 389 M742 384 Q762 395 789 401','m12-millrace');R(g,752,375,29,23,'m12-wall');P(g,'M747 375 l19 -17 l21 17Z','m12-roof');for(const x of [640,662,684]){R(g,x,406,14,9,'m12-stall');P(g,`M${x-2} 406 l9 -10 l9 10Z`,'m12-awning');}P(g,'M664 175 Q680 119 740 100 Q806 98 846 150 L853 226 Q795 256 694 226Z','m12-castle-hill');P(g,'M692 239 Q745 261 816 239','m12-lane');for(const [x,y,s] of [[688,255,.57],[730,270,.55],[828,251,.61]])house(g,x,y,s);}
function village(g){P(g,'M-90 28 Q-47 11 -4 17 Q48 10 91 38 L87 64 Q10 79 -88 63Z','m12-village-yard');P(g,'M-83 55 Q-25 36 21 48 T82 54','m12-lane');for(const [x,y,s] of [[-61,8,.77],[-24,19,.7],[17,7,.8],[53,24,.65],[-48,40,.58]])house(g,x,y,s);E(g,'circle',{cx:3,cy:57,r:7,class:'m12-well'});}
function market(g){P(g,'M-87 34 Q-45 3 4 11 Q59 7 88 37 L83 73 L-84 70Z','m12-market-yard');P(g,'M-31 39 L9 17 L47 41 L3 64Z','m12-market-square');for(const [x,y,s] of [[-65,17,.75],[-31,3,.7],[18,0,.79],[55,20,.72],[-52,52,.62],[34,52,.64]])house(g,x,y,s);for(const x of [-13,5,23]){R(g,x,36,13,8,'m12-stall');P(g,`M${x-2} 36 l8 -9 l9 9Z`,'m12-awning');}R(g,65,22,26,30,'m12-mill-wall');P(g,'M62 22 l16 -19 l16 19Z','m12-roof');E(g,'circle',{cx:91,cy:50,r:17,class:'m12-wheel'});for(let i=0;i<8;i++){const a=i*Math.PI/4;P(g,`M91 50 l${(16*Math.cos(a)).toFixed(1)} ${(16*Math.sin(a)).toFixed(1)}`,'m12-wheel-spoke');}}
function castle(g){P(g,'M-96 42 L-74 -8 L-20 -31 L48 -23 L93 24 L75 72 L-59 73Z','m12-castle-earth');P(g,'M-78 27 L-59 -5 L-13 -19 L51 -6 L78 24 L58 58 L-61 58Z','m12-outer-wall');P(g,'M-61 25 L-43 6 L-3 -7 L43 5 L60 29 L47 46 L-45 46Z','m12-courtyard');const towers=[[-62,-10,20,38],[-8,-25,22,34],[46,-2,22,44],[-55,36,18,29],[45,38,21,30]];towers.forEach(([x,y,w,h],i)=>{R(g,x,y,w,h,'m12-tower');P(g,`M${x-4} ${y} l${w/2+4} ${-15-(i%3)*5} l${w/2+4} ${15+(i%3)*5}Z`,'m12-tower-roof');for(let k=0;k<3;k++)R(g,x+k*w/3,y-4,w/5,5,'m12-crenel');});R(g,-20,-27,42,55,'m12-keep');P(g,'M-25 -27 l24 -29 l27 29Z','m12-keep-roof');for(let i=0;i<4;i++)R(g,-20+i*11,-31,7,6,'m12-crenel');P(g,'M-10 4 h6 M8 -8 h6 M-9 16 h5','m12-slit');R(g,-14,38,28,22,'m12-gatehouse');P(g,'M-19 38 l19 -19 l19 19Z','m12-tower-roof');P(g,'M-8 60 V48 Q0 35 8 48 V60Z','m12-gate');P(g,'M0 60 Q4 69 9 82','m12-gate-road');P(g,'M30 -26 V-65 M30 -65 l28 11 l-28 10Z','m12-banner');}

/* Bridges are rendered over the canonical roads; neither roads nor world coordinates change. */
function bridge(parent,x,y,angle,length=48,major=false){
 const g=E(parent,'g',{class:'m12b-bridge',transform:`translate(${x} ${y}) rotate(${angle})`,'aria-hidden':'true'});
 const half=length/2;
 P(g,`M${-half-5} -10 Q0 -12 ${half+5} -10 L${half+5} 10 Q0 12 ${-half-5} 10Z`,'m12b-stone-abutment');
 P(g,`M${-half} -9 H${half} V9 H${-half}Z`,'m12b-deck');
 for(let v=-half+5;v<half;v+=7)P(g,`M${v} -8 V8`,'m12b-plank');
 for(const y of [-12,12]){
   P(g,`M${-half-4} ${y} Q0 ${y-2} ${half+4} ${y}`,'m12b-rail');
   for(let v=-half+3;v<=half;v+=14)P(g,`M${v} ${y-3} v7`,'m12b-post');
 }
 if(major){for(const x of [-half-5,half+5]){
   E(g,'circle',{cx:x,cy:-12,r:4,class:'m12b-cap'});
   E(g,'circle',{cx:x,cy:12,r:4,class:'m12b-cap'});
 }}
 return g;
}
function crossings(root){
 const layer=G(root,'m12b-crossings');
 // West ford / Varnhold main road bridge.
 bridge(layer,500,395,-67,56,true);
 // Dorneth's eastern river crossing on the cart road.
 bridge(layer,808,361,24,41,false);
 // Small farm irrigation footbridge in Keldra's agricultural valley.
 bridge(layer,128,650,-13,27,false);
 // Stone reinforcements and reeds at bridgeheads.
 for(const [x,y] of [[468,423],[523,366],[779,349],[840,379],[108,646],[147,654]]){
  E(layer,'ellipse',{cx:x,cy:y,rx:7,ry:3,class:'m12b-shore-stone'});
  P(layer,`M${x+7} ${y+2} q-1 -9 3 -15 M${x+9} ${y+2} q4 -10 8 -13`,'m12b-reeds');
 }
}

function enhance(frame){if(frame.dataset.map0112==='yes'||frame.dataset.map018!=='yes')return;const root=frame.querySelector('.map01-viewport svg > g');if(!root)return;const arts=[...root.querySelectorAll('.map01-settlement-art')];if(arts.length!==3)return;const road=[...root.children].find(n=>n.classList&&n.classList.contains('map01-road-outline'));if(!road)return;const layer=G(root,'m12-world');farms(layer);roads(layer);grounds(layer);root.insertBefore(layer,road);[...root.children].filter(n=>n.classList&&n.classList.contains('map01-road-outline')).forEach(n=>{const d=n.getAttribute('d')||'';if(d.startsWith('M500 395 C485 340')||d.startsWith('M580 225 C630 194')){n.classList.add('m12-highway-outline');const line=n.nextElementSibling;if(line&&line.classList.contains('map01-road'))line.classList.add('m12-highway-road');}});const crossingsLayer=G(root,'m12b-crossing-holder');crossings(crossingsLayer);root.insertBefore(crossingsLayer,arts[0]);arts.forEach((a,i)=>{a.replaceChildren();[village,market,castle][i](a);});frame.dataset.map0112='yes';frame.dataset.map0112b='yes';}
function scan(){document.querySelectorAll('.map01-frame').forEach(enhance);}new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});scan();})();
