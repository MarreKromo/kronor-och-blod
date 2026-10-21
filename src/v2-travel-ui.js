/* V2-05F: scalable place-detail navigation. Existing travel/economy transactions unchanged. */
(function(){'use strict';
const api=window.KB_V2_TRAVEL,eco=window.KB_V2_ECONOMY,host=document.getElementById('storyText'),map=document.getElementById('mapTab');
if(!api||!eco||!host||!map)return;
let selected=null,message='',messageError=false;
function el(tag,text,cls){const x=document.createElement(tag);x.textContent=text;if(cls)x.className=cls;return x;}
function feedback(panel){if(message){const p=el('p',message,'travel-message'+(messageError?' travel-error':''));p.setAttribute('role','status');panel.append(p);}}
function button(label,cls,action){const b=el('button',label,cls);b.type='button';b.addEventListener('click',action);return b;}
function show(){
 if(!map.classList.contains('active'))return;
 const s=api.getState(),panel=el('section','','travel-panel');panel.setAttribute('aria-label','Platser och försörjning');host.replaceChildren(panel);
 if(!s.ok){panel.append(el('p',s.error,'travel-error'));return;}
 const economy=eco.getState();if(!economy.ok){panel.append(el('p',economy.error,'travel-error'));return;}
 if(selected!==null&&!Object.hasOwn(s.places,selected))selected=null;
 const head=el('div','','travel-head');head.append(el('span','DU BEFINNER DIG I','travel-eyebrow'),el('h3',s.places[s.placeId].name));panel.append(head);
 const resources=el('div','','travel-resources');const money=el('div','','travel-resource');money.append(el('span','Dina pengar','travel-resource-label'),el('strong',economy.coins+' kopparmynt'),el('small','0 silver · 0 guld'));const grain=el('div','','travel-resource');grain.append(el('span','Din väska','travel-resource-label'),el('strong',economy.grain+' spannmål'));resources.append(money,grain);panel.append(resources);
 if(selected===null){
  panel.append(el('h4','Upptäckta platser','travel-section-title'));
  panel.append(el('p','Välj en plats för att se dess byggnader, möjligheter och färdvägar. Att undersöka en plats kostar ingen tid.','travel-muted'));
  const options=el('div','','travel-places');
  for(const [id,p] of Object.entries(s.places)){
   const b=button(p.name+(id===s.placeId?' · Här är du':''),'travel-place',()=>{selected=id;message='';show();});
   b.setAttribute('aria-label','Visa '+p.name);options.append(b);
  }
  panel.append(options);
  panel.append(el('p','En geografisk världskarta kommer i ett senare kapitel.','travel-muted'));
 }else{
  const place=s.places[selected];
  panel.append(button('← Alla platser','travel-back',()=>{selected=null;message='';show();}));
  const activity=el('div','','travel-activity');activity.append(el('h4',place.name),el('p',place.type,'travel-place-type'));
  if(selected===s.placeId)activity.append(el('p','Du befinner dig här.','travel-cost'));
  else if(s.routes.includes(selected)){
   activity.append(el('p','Vägen tar en dag att vandra.','travel-cost'));
   const b=button('Res till '+place.name+' · 1 dag','travel-action',()=>{b.disabled=true;const r=api.travel(selected);messageError=!r.ok;message=r.ok?'Du anlände till '+place.name+'. En dag har gått.':r.error;show();});activity.append(b);
  }else activity.append(el('p','Vägen hit är ännu inte öppen.','travel-muted'));
  if(selected==='keldra'){
   activity.append(el('h5','Gården och åkrarna'),el('p','Här odlas spannmål som förs vidare till Dorneth.','travel-muted'));
   if(s.placeId==='keldra'){
    activity.append(el('p','1 dag · +3 kopparmynt · +1 spannmål · +10 jordbruks-XP','travel-cost'));
    const b=button('Arbeta en dag','travel-action',()=>{if(!window.confirm('Arbeta en dag i Keldra? Du får 3 kopparmynt, 1 spannmål och 10 XP i jordbruk.'))return;b.disabled=true;const r=eco.work();messageError=!r.ok;message=r.ok?'Dagens arbete är klart. +3 kopparmynt, +1 spannmål och +10 jordbruks-XP. En dag har gått.':r.error;show();});activity.append(b);
   }else activity.append(el('p','Res hit för att arbeta på gården.','travel-muted'));
  }else if(selected==='dorneth'){
   activity.append(el('h5','Marknaden vid kvarnen'),el('p','Här handlas spannmål som levererats från Keldra.','travel-muted'));
   if(s.placeId==='dorneth'){
    activity.append(el('p','1 spannmål · 2 kopparmynt','travel-cost'));
    const b=button('Köp spannmål · 2 kopparmynt','travel-action',()=>{if(!window.confirm('Vill du köpa 1 spannmål för 2 kopparmynt?'))return;b.disabled=true;const r=eco.buyGrain();messageError=!r.ok;message=r.ok?'Köpet är klart. +1 spannmål, −2 kopparmynt. Ingen hel dag har gått.':r.error;show();});b.disabled=economy.coins<2;
    if(b.disabled)activity.append(el('p','Du behöver minst 2 kopparmynt för att handla.','travel-muted'));activity.append(b);
   }else activity.append(el('p','Res hit för att handla vid kvarnen.','travel-muted'));
  }else activity.append(el('p','Borgen kan ännu inte besökas.','travel-muted'));
  panel.append(activity);
 }
 feedback(panel);
}
map.addEventListener('click',()=>queueMicrotask(show));
window.addEventListener('kb:v2-character-changed',()=>{selected=null;message='';queueMicrotask(show);});
for(const ev of ['kb:travel-changed','kb:day-advanced','kb:economy-changed'])window.addEventListener(ev,()=>queueMicrotask(show));
const next=document.getElementById('advanceDayButton');next?.addEventListener('click',e=>{const r=eco.getState();if(!r.ok){e.stopImmediatePropagation();e.preventDefault();window.alert(r.error);}},true);
})();
