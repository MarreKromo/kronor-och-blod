// IMP-025 J-H1: complete mandatory creator preview; no storage writes.
(function(){
'use strict';
const host=document.querySelector('.kb-profile');
const life=window.KB_LIFE_BACKGROUND_MODEL, character=window.KB_CHARACTER, bundle=window.KB_NEW_CHARACTER_BUNDLE;
const old=host&&host.querySelector('.kb-create-experience');
if(!host||!old||!life||!character||!bundle)return;
const former=document.getElementById('kb-new-character-jd');
old.hidden=true;old.style.display='none';
if(former){former.hidden=true;former.style.display='none';}
const panel=document.createElement('details');panel.id='kb-jh1-creator';
panel.style.cssText='margin:12px 0;border:1px solid #c6a466;border-radius:10px;background:#223428;color:#f4e9ce;overflow:hidden';
const summary=document.createElement('summary');summary.textContent='⚔️ Börja ett nytt liv – fullständig livsbakgrund';summary.style.cssText='padding:15px;cursor:pointer;font:600 16px system-ui;min-height:48px';
const form=document.createElement('form');form.style.cssText='display:grid;gap:13px;padding:16px';
const intro=document.createElement('p');intro.textContent='J-H1: Förhandsgranskning. Ingen karaktär skapas eller sparas i detta steg.';form.append(intro);
function field(label,element){const wrap=document.createElement('label');wrap.style.cssText='display:grid;gap:6px;font:600 14px system-ui';wrap.append(document.createTextNode(label),element);element.style.cssText='width:100%;box-sizing:border-box;padding:11px;min-height:46px;border:1px solid #c9a768;border-radius:6px;background:#14251b;color:#f5e7cb;font:16px system-ui';form.append(wrap);return element;}
const name=document.createElement('input');name.type='text';name.required=true;name.minLength=2;name.maxLength=32;field('Namn',name);
const role=document.createElement('select');for(const [key,value] of Object.entries(character.BACKGROUNDS)){const option=document.createElement('option');option.value=key;option.textContent=value.label;role.append(option);}field('Roll',role);
const choices={};for(const [key,label] of Object.entries({upbringing:'Uppväxt',familySituation:'Familj',past:'Förflutet',ambition:'Ambition'})){const select=document.createElement('select');select.required=true;const blank=document.createElement('option');blank.value='';blank.textContent='Välj…';select.append(blank);for(const value of life.OPTIONS[key]){const option=document.createElement('option');option.value=value;option.textContent=life.LABELS[key][value];select.append(option);}choices[key]=field(label,select);}
const bio=document.createElement('textarea');bio.maxLength=500;bio.rows=3;field('Egen berättelse (frivillig)',bio);
const review=document.createElement('button');review.type='submit';review.textContent='Granska min karaktär';
const preview=document.createElement('pre');preview.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere;border:1px solid #786c4c;padding:12px;font:14px/1.6 system-ui';preview.textContent='Fyll i alla fyra livsval.';
const confirm=document.createElement('button');confirm.type='button';confirm.disabled=true;confirm.textContent='Bekräfta valen (test – sparar inte)';
for(const button of [review,confirm])button.style.cssText='min-height:48px;padding:12px;background:#8e412e;border:1px solid #e0bd73;color:#fff3d5;border-radius:6px;font:600 15px system-ui';
const status=document.createElement('p');status.setAttribute('role','status');status.textContent='Inga data sparas i J-H1.';
form.append(review,preview,confirm,status);panel.append(summary,form);old.insertAdjacentElement('beforebegin',panel);
let approved=null;
function current(){return {name:name.value,background:role.value,characterId:'12345678-1234-4234-8234-123456789abc',lifeBackground:{version:1,upbringing:choices.upbringing.value,familySituation:choices.familySituation.value,past:choices.past.value,ambition:choices.ambition.value,biography:bio.value}};}
function invalidate(){approved=null;confirm.disabled=true;status.textContent='Ändrade val kräver ny granskning. Inget sparas.';}
form.addEventListener('input',invalidate);form.addEventListener('change',invalidate);
form.addEventListener('submit',event=>{event.preventDefault();invalidate();try{const input=current();const slot=bundle.build(input,{character,life});approved=JSON.stringify(input);preview.textContent='FÖRHANDSGRANSKNING – EJ SPARAD\n\n'+slot.name+' · '+character.BACKGROUNDS[input.background].label+'\n'+Object.entries(choices).map(([key])=>life.LABELS[key][input.lifeBackground[key]]).join('\n')+'\n\n'+(bio.value||'Ingen egen berättelse');confirm.disabled=false;status.textContent='Komplett livsbakgrund godkänd. Testbekräftelse möjlig.';}catch(error){preview.textContent='Kan inte fortsätta: '+error.message;}});
confirm.addEventListener('click',()=>{if(!approved||approved!==JSON.stringify(current())){invalidate();return;}approved=null;confirm.disabled=true;status.textContent='J-H1 PASS: Bekräftelsen fungerar. Ingen karaktär skapad eller sparad.';});
// Capture on ancestor before the older button-level capture listener.
host.addEventListener('click',event=>{const button=event.target.closest&&event.target.closest('button');if(!button||!/skapa ny karaktär/i.test(button.textContent))return;event.preventDefault();event.stopImmediatePropagation();panel.open=true;panel.scrollIntoView({behavior:'smooth',block:'start'});name.focus({preventScroll:true});},true);
})();
