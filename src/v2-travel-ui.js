/* V2-03.5: map-only travel and location-bound work. */
(function(){'use strict';
const api=window.KB_V2_TRAVEL,skills=window.KB_V2_SKILLS,host=document.getElementById('storyText'),map=document.getElementById('mapTab');
if(!api||!host||!map)return;
let selected='keldra',message='';
function el(tag,text,cls){const x=document.createElement(tag);x.textContent=text;if(cls)x.className=cls;return x;}
function show(){if(!map.classList.contains('active'))return;const s=api.getState();const panel=el('section','','travel-panel');panel.setAttribute('aria-label','Resor och arbeten');host.replaceChildren(panel);if(!s.ok){panel.append(el('p',s.error,'travel-error'));return;}if(!Object.hasOwn(s.places,selected))selected=s.placeId;
 panel.append(el('h3','Din plats: '+s.places[s.placeId].name));panel.append(el('p','Kartmarkering är inte en resa. Välj en plats för att läsa om den.'));
 const options=el('div','','travel-places');for(const [id,p] of Object.entries(s.places)){const b=el('button',p.name+(id===s.placeId?' · Du är här':''),'travel-place'+(id===selected?' selected':''));b.type='button';b.addEventListener('click',()=>{selected=id;message='';show();});options.append(b);}panel.append(options);
 const place=s.places[selected];panel.append(el('h4',place.name));panel.append(el('p',place.type));
 if(selected!==s.placeId){if(s.routes.includes(selected)){panel.append(el('p','Till fots · 1 dag (prototypvärde).'));const b=el('button','Res hit – 1 dag','travel-action');b.type='button';b.addEventListener('click',()=>{if(!window.confirm('Resa till '+place.name+'? Resan förbrukar en dag.'))return;b.disabled=true;const r=api.travel(selected);message=r.ok?'Du har anlänt till '+place.name+'.':r.error;show();});panel.append(b);}else panel.append(el('p','Ingen öppen färdväg hit ännu.'));}
 else if(place.jobs.includes('farm')){panel.append(el('h4','Arbete vid åkrarna'));panel.append(el('p','Arbeta en hel dag: +10 jordbrukserfarenhet. Ingen lön eller varor ännu.'));const b=el('button','Arbeta en dag på åkern','travel-action');b.type='button';b.addEventListener('click',()=>{if(!window.confirm('Arbeta en dag vid åkrarna i Keldra?'))return;b.disabled=true;const r=skills.work();message=r.ok?'Du har arbetat en dag. Tiden och erfarenheten är sparade.':r.error;show();});panel.append(b);}else panel.append(el('p','Inga spelbara arbeten på denna plats ännu.'));
 if(message)panel.append(el('p',message,'travel-message'));
}
map.addEventListener('click',()=>queueMicrotask(show));window.addEventListener('kb:v2-character-changed',()=>{selected='keldra';message='';queueMicrotask(show);});window.addEventListener('kb:travel-changed',()=>queueMicrotask(show));window.addEventListener('kb:day-advanced',()=>queueMicrotask(show));
const next=document.getElementById('advanceDayButton');next?.addEventListener('click',e=>{const r=api.getState();if(!r.ok){e.stopImmediatePropagation();e.preventDefault();window.alert(r.error);}},true);
})();
