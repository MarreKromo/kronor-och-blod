/* V2-03.6: travel, location-bound employment and local market. */
(function(){'use strict';
const api=window.KB_V2_TRAVEL,eco=window.KB_V2_ECONOMY,host=document.getElementById('storyText'),map=document.getElementById('mapTab');
if(!api||!eco||!host||!map)return;
let selected='keldra',message='';
function el(tag,text,cls){const x=document.createElement(tag);x.textContent=text;if(cls)x.className=cls;return x;}
function show(){if(!map.classList.contains('active'))return;const s=api.getState(),panel=el('section','','travel-panel');panel.setAttribute('aria-label','Resor, arbete och ekonomi');host.replaceChildren(panel);if(!s.ok){panel.append(el('p',s.error,'travel-error'));return;}const economy=eco.getState();if(!economy.ok){panel.append(el('p',economy.error,'travel-error'));return;}if(!Object.hasOwn(s.places,selected))selected=s.placeId;
 panel.append(el('h3','Din plats: '+s.places[s.placeId].name));panel.append(el('p','Börs: '+economy.coins+' kopparmynt · Inventarium: '+economy.grain+' sädeskärvar','economy-balance'));panel.append(el('p','Kartmarkering är inte en resa. Välj en plats för att läsa om den.'));
 const options=el('div','','travel-places');for(const [id,p] of Object.entries(s.places)){const b=el('button',p.name+(id===s.placeId?' · Du är här':''),'travel-place'+(id===selected?' selected':''));b.type='button';b.addEventListener('click',()=>{selected=id;message='';show();});options.append(b);}panel.append(options);
 const place=s.places[selected];panel.append(el('h4',place.name));panel.append(el('p',place.type));
 if(selected!==s.placeId){if(s.routes.includes(selected)){panel.append(el('p','Till fots · 1 dag (prototypvärde).'));const b=el('button','Res hit – 1 dag','travel-action');b.type='button';b.addEventListener('click',()=>{if(!window.confirm('Resa till '+place.name+'? Resan förbrukar en dag.'))return;b.disabled=true;const r=api.travel(selected);message=r.ok?'Du har anlänt till '+place.name+'.':r.error;show();});panel.append(b);}else panel.append(el('p','Ingen öppen färdväg hit ännu.'));}
 else if(s.placeId==='keldra'){panel.append(el('h4','Dagsarbete vid åkrarna'));panel.append(el('p','Arbetsgivare: en gård i Keldra. En hel dag ger 10 jordbruks-XP, 3 kopparmynt i lön och 1 sädeskärve. Beloppen är prototypbalans.'));const b=el('button','Ta dagsarbete – 1 dag','travel-action');b.type='button';b.addEventListener('click',()=>{if(!window.confirm('Ta dagsarbete i Keldra? Det kostar en dag och ger 3 kopparmynt, 1 sädeskärve och 10 XP.'))return;b.disabled=true;const r=eco.work();message=r.ok?'Arbetsdagen är avslutad. Lön, varor och erfarenhet är bokförda.':r.error;show();});panel.append(b);}
 else if(s.placeId==='dorneth'){panel.append(el('h4','Marknaden vid kvarnen'));panel.append(el('p','Köp 1 sädeskärve för 2 kopparmynt. Köp förbrukar ingen hel dag i denna prototyp.'));const b=el('button','Köp sädeskärve – 2 kopparmynt','travel-action');b.type='button';b.disabled=economy.coins<2;b.addEventListener('click',()=>{if(!window.confirm('Köpa en sädeskärve för 2 kopparmynt?'))return;b.disabled=true;const r=eco.buyGrain();message=r.ok?'Du har köpt en sädeskärve.':r.error;show();});panel.append(b);}
 else panel.append(el('p','Inga spelbara arbeten på denna plats ännu.'));
 if(message)panel.append(el('p',message,'travel-message'));
}
map.addEventListener('click',()=>queueMicrotask(show));window.addEventListener('kb:v2-character-changed',()=>{selected='keldra';message='';queueMicrotask(show);});for(const ev of ['kb:travel-changed','kb:day-advanced','kb:economy-changed'])window.addEventListener(ev,()=>queueMicrotask(show));
const next=document.getElementById('advanceDayButton');next?.addEventListener('click',e=>{const r=eco.getState();if(!r.ok){e.stopImmediatePropagation();e.preventDefault();window.alert(r.error);}},true);
})();
