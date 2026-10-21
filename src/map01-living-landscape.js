/* MAP-01.10: visual-only living landscape. Never changes IDs, roads, time, travel or saves. */
(function(){'use strict';
const NS='http://www.w3.org/2000/svg';
function E(p,t,a){const n=document.createElementNS(NS,t);for(const [k,v] of Object.entries(a||{}))n.setAttribute(k,String(v));p.appendChild(n);return n;}
function P(p,d,c){return E(p,'path',{d,class:c});}
function R(seed){return()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);}
function fence(g,x,y,w,h){P(g,`M${x} ${y} l${w} -${h*.18} l${h*.15} ${h} l-${w} ${h*.18}Z`,'map0110-fence');for(let i=0;i<=5;i++){let a=i/5;P(g,`M${x+w*a} ${y-h*.18*a-3} l0 8`,'map0110-post');}}
function parcel(g,x,y,w,h,kind,seed){const r=R(seed),skew=h*.25;P(g,`M${x} ${y} L${x+w} ${y-skew} L${x+w+8} ${y+h-skew} L${x+8} ${y+h}Z`,'map0110-plot '+kind);for(let k=1;k<7;k++){let t=k/7;P(g,`M${x+4+t*w} ${y-t*skew+3} l8 ${h-8}`,'map0110-furrow');}if(kind==='map0110-pasture'){for(let j=0;j<8;j++){const a=r(),b=r();E(g,'circle',{cx:x+10+a*(w-8),cy:y+b*h-a*skew,r:1.7+r()*2.8,class:'map0110-grass-tuft'});}}}
function cottage(g,x,y,s){const a=E(g,'g',{transform:`translate(${x} ${y}) scale(${s})`});E(a,'ellipse',{cx:0,cy:10,rx:18,ry:6,class:'map0110-shadow'});E(a,'rect',{x:-10,y:-1,width:21,height:14,rx:1,class:'map0110-cottage-wall'});P(a,'M-14 -1 L-2 -15 L14 -1Z','map0110-thatch');P(a,'M-2 -15 L-1 -19 L2 -19 L2 -12','map0110-chimney');E(a,'rect',{x:2,y:6,width:5,height:7,class:'map0110-door'});}
function roadside(g){const r=R(125010),group=E(g,'g',{class:'map0110-roadside'});
 // Tiny verge tracks and roadside details follow the existing road geometry; do not replace it.
 P(group,'M246 550 Q310 539 360 486 Q414 444 501 399 Q572 382 664 336','map0110-verge');
 P(group,'M505 386 Q510 300 579 224 Q655 182 760 157','map0110-verge');
 for(let i=0;i<65;i++){let x=255+r()*620,y=180+r()*430;if(Math.hypot(x-230,y-540)<65||Math.hypot(x-670,y-330)<90||Math.hypot(x-760,y-150)<100)continue;if(i%3===0){P(group,`M${x.toFixed(1)} ${y.toFixed(1)} q5 -5 11 -2 q5 -4 10 -1`,'map0110-scrub');}else{E(group,'ellipse',{cx:x.toFixed(1),cy:y.toFixed(1),rx:(2+r()*4).toFixed(1),ry:(1+r()*2).toFixed(1),class:'map0110-stone'});}}
 // Small roadside waystones and worn wagon tracks.
 for(const [x,y] of [[354,485],[495,400],[575,232],[604,371],[721,172]]){E(group,'ellipse',{cx:x,cy:y+3,rx:7,ry:3,class:'map0110-shadow'});P(group,`M${x-3} ${y+2} l1 -12 l6 -2 l3 14Z`,'map0110-milestone');}
 // A wayside shelter, wood stack and fencing on open ground.
 cottage(group,386,464,.68);P(group,'M399 472 l21 -7 l4 8 l-21 8Z','map0110-woodpile');
 for(let i=0;i<4;i++)P(group,`M${406+i*4} 467 l0 8`,'map0110-log');
 fence(group,286,576,68,27);fence(group,608,295,48,21);
}
function keldra(g){const farm=E(g,'g',{class:'map0110-keldra-fields'});
 // Field blocks use curved boundaries, varied crops and pasture; no floating checkerboard squares.
 const fields=[[-40,584,76,33,'map0110-ploughed'],[43,574,92,35,'map0110-rye'],[141,590,82,36,'map0110-pasture'],[-25,637,93,41,'map0110-rye'],[79,632,108,46,'map0110-ploughed'],[201,620,80,43,'map0110-pasture'],[70,704,120,47,'map0110-rye'],[202,707,97,38,'map0110-ploughed'],[282,774,117,43,'map0110-pasture'],[115,794,108,42,'map0110-rye'],[275,852,126,47,'map0110-ploughed']];
 fields.forEach(([x,y,w,h,c],i)=>parcel(farm,x,y,w,h,c,120+i*19));
 P(farm,'M118 563 Q146 603 172 639 T236 739 T311 852','map0110-field-path');
 P(farm,'M182 569 Q195 609 237 621 T310 648','map0110-field-path');
 for(const [x,y,w,h] of [[38,559,85,43],[143,684,66,38],[273,810,92,38]])fence(farm,x,y,w,h);
 for(const [x,y,s] of [[92,553,.72],[154,566,.65],[214,577,.63],[172,683,.62],[306,762,.7]])cottage(farm,x,y,s);
 // Orchard near the village, hedgerows and small grain stacks.
 for(const [x,y] of [[300,553],[323,566],[344,577],[310,597],[335,613]]){E(farm,'circle',{cx:x,cy:y,r:10,class:'map0110-orchard'});E(farm,'circle',{cx:x-3,cy:y-3,r:5,class:'map0110-orchard-light'});}
 for(const [x,y] of [[60,675],[83,688],[226,771],[250,784]]){P(farm,`M${x-7} ${y+8} L${x} ${y-11} L${x+8} ${y+8}Z`,'map0110-haystack');P(farm,`M${x-8} ${y+9} l17 0`,'map0110-haybase');}
}
function dorneth(g){const town=E(g,'g',{class:'map0110-dorneth-grounds'});
 P(town,'M593 339 Q627 309 660 308 T754 324 L764 385 Q700 409 626 385Z','map0110-town-clearance');
 P(town,'M613 365 Q675 347 740 363','map0110-town-track');
 P(town,'M676 325 Q690 353 704 380','map0110-town-track');
 for(const [x,y,s] of [[598,360,.75],[630,391,.69],[727,399,.78],[747,346,.66]])cottage(town,x,y,s);
 for(const [x,y] of [[612,399],[640,416],[739,415]]){E(town,'rect',{x,y,width:16,height:10,class:'map0110-crate'});P(town,`M${x} ${y} l16 10 M${x+16} ${y} l-16 10`,'map0110-crate-cross');}
 // The waterwheel remains on the original town symbol; a bank and millrace connect it to the river.
 P(town,'M733 363 Q755 367 780 379','map0110-millrace');
 P(town,'M756 383 Q775 389 794 383','map0110-millrace');
}
function varnhold(g){const castle=E(g,'g',{class:'map0110-varnhold-grounds'});
 P(castle,'M661 164 Q680 112 742 99 Q806 101 844 155 L836 218 Q781 244 694 212Z','map0110-castle-clearing');
 P(castle,'M702 207 Q691 225 659 237 Q630 244 609 269','map0110-castle-road');
 for(const [x,y,s] of [[663,215,.65],[688,228,.7],[822,220,.67],[835,190,.64]])cottage(castle,x,y,s);
 for(const [x,y,w,h] of [[657,184,37,19],[812,161,41,18]])fence(castle,x,y,w,h);
 for(let i=0;i<9;i++){const x=670+i*21,y=119+(i%3)*9;P(castle,`M${x} ${y} q7 -8 16 0`,'map0110-rampart-earth');}
}
function enhance(frame){if(frame.dataset.map0110==='yes'||frame.dataset.map019!=='yes'||frame.dataset.map018!=='yes')return;const g=frame.querySelector('.map01-viewport svg > g');if(!g)return;const road=[...g.children].find(n=>n.classList&&n.classList.contains('map01-road-outline'));if(!road)return;const overlay=E(g,'g',{class:'map0110-world','aria-hidden':'true'});keldra(overlay);dorneth(overlay);varnhold(overlay);roadside(overlay);g.insertBefore(overlay,road);frame.dataset.map0110='yes';}
function scan(){document.querySelectorAll('.map01-frame').forEach(enhance);}
new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});scan();
})();
