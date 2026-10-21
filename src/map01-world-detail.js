/* MAP-01.11: additive visual art; no changes to game mechanics or persistence. */
(function(){'use strict';
const NS='http://www.w3.org/2000/svg';
function E(g,t,a){const n=document.createElementNS(NS,t);Object.entries(a||{}).forEach(([k,v])=>n.setAttribute(k,String(v)));g.appendChild(n);return n;}
function P(g,d,c){return E(g,'path',{d,class:c});}
function G(g,c){return E(g,'g',{class:c,'aria-hidden':'true'});}
function house(g,x,y,s,inn=false){const h=E(g,'g',{transform:`translate(${x} ${y}) scale(${s})`});E(h,'ellipse',{cx:0,cy:17,rx:23,ry:8,class:'m11-shadow'});P(h,'M-18 0 L17 0 L17 18 L-18 18Z','m11-wall');P(h,'M-23 0 L-3 -22 L22 0Z',inn?'m11-inn-roof':'m11-roof');E(h,'rect',{x:-3,y:8,width:7,height:10,class:'m11-door'});for(const xx of [-12,10])E(h,'rect',{x:xx,y:6,width:5,height:5,class:'m11-window'});if(inn){P(h,'M15 -18 v-18 M15 -35 h25 v17 h-25Z','m11-inn-sign');P(h,'M20 -27 h15','m11-sign-detail');}return h;}
function fields(g){const f=G(g,'m11-fields');
 const polys=[
 ['M-48 593 Q-11 575 33 583 L42 628 Q5 640 -38 633Z',0],
 ['M48 592 Q91 577 140 587 L151 630 Q101 644 58 635Z',1],
 ['M159 606 Q194 592 233 604 L241 653 Q193 666 165 651Z',2],
 ['M-27 652 Q22 637 77 649 L81 699 Q25 710 -28 697Z',1],
 ['M89 657 Q144 636 190 652 L199 708 Q145 724 93 709Z',0],
 ['M211 669 Q245 658 288 673 L292 723 Q247 731 212 720Z',2],
 ['M73 741 Q122 723 181 737 L190 789 Q123 799 76 787Z',1],
 ['M208 749 Q260 730 310 748 L319 801 Q257 811 209 796Z',0],
 ['M126 812 Q176 795 229 811 L239 862 Q171 872 130 855Z',2],
 ['M287 832 Q343 813 405 828 L417 884 Q354 893 296 875Z',1]
 ];
 polys.forEach(([d,k],i)=>{const clipId='m11-f'+i;const def=E(f,'defs',{}),clip=E(def,'clipPath',{id:clipId});P(clip,d,'m11-clip');P(f,d,['m11-field-gold','m11-field-brown','m11-field-green'][k]);const rows=E(f,'g',{'clip-path':`url(#${clipId})`});for(let n=0;n<17;n++){const x=-65+n*32+(i%3)*6;P(rows,`M${x} 550 Q${x-12} 680 ${x+13} 910`,'m11-furrow');}});
 P(f,'M121 567 Q147 612 164 648 T210 743 T317 885','m11-farm-track');
 P(f,'M35 644 Q57 630 88 645 T165 654 M78 714 Q124 726 158 717 T211 733','m11-ditch');
 P(f,'M-31 704 Q28 714 81 708 M201 791 Q260 815 316 800','m11-hedge');
 for(const [x,y] of [[48,685],[224,730],[323,867]]){P(f,`M${x-10} ${y+7} Q${x} ${y-18} ${x+10} ${y+7}Z`,'m11-hay');}
}
function roads(g){const r=G(g,'m11-roads');
 // Wide, maintained road to Varnhold, beneath the existing canonical road stroke.
 const d='M500 395 Q532 316 580 225 Q654 181 760 150';
 P(r,d,'m11-highway-bed');P(r,d,'m11-highway-gravel');
 P(r,'M493 393 Q526 312 573 220 Q650 174 755 144','m11-rut');
 P(r,'M507 398 Q540 321 587 230 Q658 188 764 157','m11-rut');
 P(r,'M633 195 Q653 215 674 232 T702 252 M704 168 Q720 191 733 217 M571 235 Q552 213 532 217','m11-side-track');
 P(r,'M638 209 Q664 189 691 205 L705 233 Q668 249 640 231Z','m11-yard');
 house(r,668,213,1.12,true);house(r,706,235,.64);house(r,818,239,.66);house(r,844,220,.56);house(r,620,267,.57);
 P(r,'M698 246 Q750 265 807 245','m11-side-track');
 for(const [x,y] of [[555,300],[606,224],[725,166],[345,485]]){E(r,'ellipse',{cx:x,cy:y+3,rx:5,ry:2,class:'m11-shadow'});P(r,`M${x-3} ${y+2} l2 -10 l6 -1 l2 11Z`,'m11-stone');}
 P(r,'M490 402 Q503 397 512 391 M490 410 Q503 404 518 398','m11-bridge');
 for(const [x,y] of [[494,404],[505,400],[515,396]])P(r,`M${x} ${y-6} l1 13`,'m11-bridge-post');
 P(r,'M607 217 v-19 M607 200 h23 l-5 10 h-18Z','m11-signpost');
}
function towns(g){const t=G(g,'m11-towns');
 P(t,'M625 363 Q656 384 714 392 M682 350 Q698 373 714 385','m11-side-track');
 house(t,622,402,.62);house(t,714,419,.54);
 P(t,'M726 370 Q752 374 787 387 M729 385 Q757 398 788 400','m11-millrace');
 P(t,'M752 380 L779 380 L784 402 L748 402Z','m11-mill-wall');
 P(t,'M745 380 L764 364 L788 380Z','m11-roof');
 for(const x of [641,663,685]){E(t,'rect',{x,y:408,width:12,height:8,class:'m11-stall'});P(t,`M${x-2} 408 l8 -9 l9 9Z`,'m11-awning');}
 const c=G(g,'m11-castle-outskirts');
 P(c,'M697 225 Q744 248 811 236 M711 251 Q754 268 806 251','m11-side-track');
 house(c,694,253,.58);house(c,733,265,.54);house(c,831,252,.58);
 P(c,'M785 268 l43 -8 l10 18 l-43 7Z','m11-fence');
 for(let i=0;i<5;i++)P(c,`M${788+i*9} 266 l4 17`,'m11-fence');
}
function ornaments(frame){const arts=[...frame.querySelectorAll('.map01-settlement-art')];if(arts.length!==3)return;
 const [k,d,v]=arts;const a=G(k,'m11-village-details');P(a,'M-66 29 Q-31 14 0 27 T66 37','m11-lane');
 const b=G(d,'m11-market-details');for(const x of [-29,-7,15]){E(b,'rect',{x,y:31,width:12,height:7,class:'m11-stall'});P(b,`M${x-2} 31 l8 -7 l8 7Z`,'m11-awning');}
 const c=G(v,'m11-fortress-details');for(let x=-50;x<=48;x+=12)E(c,'rect',{x,y:43,width:7,height:5,class:'m11-merlon'});for(const x of [-51,53])for(const y of [10,20,30])P(c,`M${x} ${y} l5 0`,'m11-stone-course');for(const y of [-12,0,12])P(c,`M-3 ${y} l6 0`,'m11-slit');P(c,'M-8 58 h16 M0 43 v15','m11-gate-detail');
}
function enhance(frame){if(frame.dataset.map0111==='yes'||frame.dataset.map0110!=='yes'||frame.dataset.map019!=='yes')return;const root=frame.querySelector('.map01-viewport svg > g');if(!root)return;const road=[...root.children].find(n=>n.classList&&n.classList.contains('map01-road-outline'));if(!road)return;const overlay=G(root,'m11-world');fields(overlay);roads(overlay);towns(overlay);root.insertBefore(overlay,road);ornaments(frame);frame.dataset.map0111='yes';}
function scan(){document.querySelectorAll('.map01-frame').forEach(enhance);}new MutationObserver(scan).observe(document.documentElement,{childList:true,subtree:true});scan();
})();