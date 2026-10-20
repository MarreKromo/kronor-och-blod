// IMP-025 3H.12.7 I — first real save: explicit, per-character opt-in.
// No automatic writes. Existing background cannot be overwritten.
(function(){
'use strict';
const root=document.getElementById('kb-life-profile-entry');
const panel=document.getElementById('kb-life-background-form');
const api=window.KB_LIFE_BACKGROUND_CONFIRM;
const save=window.KB_LIFE_BACKGROUND_SAVE;
const character=window.KB_CHARACTER;
const model=window.KB_LIFE_BACKGROUND_MODEL;
if(!root||!panel||!api||!save||!character||!model)return;
const form=panel.querySelector('form');
const selects=form&&Array.from(form.querySelectorAll('select'));
const biography=form&&form.querySelector('textarea');
if(!form||selects.length!==4||!biography)return;
const initial=character.get();
if(!initial||!initial.characterId)return;
const initialId=initial.characterId,initialName=initial.name;
const fields=['upbringing','familySituation','past','ambition'];
const gate=api.create({storage:localStorage,character,model});
const section=document.createElement('section');
section.style.cssText='margin:16px 0;padding:14px;border:1px solid #ad8e55;border-radius:7px;background:#243328;color:#f4e9ce;font:14px/1.6 system-ui';
const title=document.createElement('strong');title.textContent='Riktig sparning – kräver ditt godkännande';
const info=document.createElement('p');
info.textContent='Använd en separat testkaraktär vid första provet. Sparningen går inte att ångra eller skriva över i denna version. Spara INTE på Mk, Erik eller Sven under testet.';
const label=document.createElement('label');
label.style.cssText='display:block;margin:12px 0';
label.textContent='Skriv karaktärens namn exakt för att låsa upp sparningen:';
const name=document.createElement('input');name.type='text';name.autocomplete='off';name.placeholder='Karaktärens namn';
name.style.cssText='display:block;width:100%;padding:12px;background:#15251d;color:#fff3d5;border:1px solid #ad8e55;border-radius:5px;font:16px system-ui';
label.appendChild(name);
const consentLabel=document.createElement('label');
consentLabel.style.cssText='display:flex;align-items:flex-start;gap:10px;margin:12px 0';
const consent=document.createElement('input');consent.type='checkbox';consent.style.marginTop='5px';
const consentText=document.createElement('span');consentText.textContent='Jag godkänner att en ny livsbakgrund sparas permanent för denna karaktär.';
consentLabel.append(consent,consentText);
const button=document.createElement('button');button.type='button';button.disabled=true;
button.textContent='Spara livsbakgrund – permanent';
button.style.cssText='padding:12px;border-radius:5px;border:1px solid #e0bd73;background:#8e412e;color:#fff3d5;font:600 14px system-ui;min-height:48px';
const status=document.createElement('p');status.setAttribute('role','status');
status.textContent='Förhandsgranska dina val och ange namn och samtycke innan sparning.';
section.append(title,info,label,consentLabel,button,status);
panel.appendChild(section);
let ready=false,finished=false;
function value(){const v={version:1,biography:biography.value};fields.forEach((k,i)=>v[k]=selects[i].value);return v;}
function sameCharacter(){const c=character.get();return !!c&&c.characterId===initialId&&c.name===initialName;}
function update(){button.disabled=!ready||finished||!sameCharacter()||name.value!==initialName||!consent.checked;}
function clear(){ready=false;gate.cancel();update();}
form.addEventListener('input',clear);
form.addEventListener('change',clear);
name.addEventListener('input',update);
consent.addEventListener('change',update);
const cancel=Array.from(form.querySelectorAll('button')).find(b=>b.type==='button');
if(cancel)cancel.addEventListener('click',()=>{clear();name.value='';consent.checked=false;status.textContent='Avbrutet. Ingenting sparades.';});
form.addEventListener('submit',()=>{
 clear();
 try{
  if(!sameCharacter())throw Error('Karaktären har ändrats. Ladda om.');
  const v=value();if(!model.validate(v).ok)throw Error('Valen är inte giltiga.');
  gate.prepare(v);ready=true;
  status.textContent='Förhandsgranskad. Skriv namn och godkänn för att kunna spara.';
 }catch(e){status.textContent='Sparning spärrad: '+e.message;}
 update();
});
button.addEventListener('click',()=>{
 update();if(button.disabled)return;
 // Explicit user action, not an automatic effect.
 if(!window.confirm('Spara livsbakgrunden PERMANENT för '+initialName+'? Detta kan inte ångras i nuvarande version.')){clear();status.textContent='Avbrutet. Ingen sparning gjord.';return;}
 button.disabled=true;
 try{
  if(!sameCharacter()||name.value!==initialName||!consent.checked)throw Error('Samtycke eller karaktär har ändrats.');
  const approved=gate.approve(value());
  if(approved.characterId!==initialId)throw Error('Fel karaktär.');
  save.save(approved.value);
  const checked=save.inspect();
  if(!checked.exists||checked.characterId!==initialId)throw Error('Sparningen kunde inte verifieras. Ladda om och kontrollera status.');
  finished=true;ready=false;consent.checked=false;
  status.textContent='SPARAT OCH VERIFIERAT för '+initialName+'. Ladda om sidan för att kontrollera återläsning.';
 }catch(e){clear();status.textContent='Sparning stoppad eller behöver kontrolleras: '+e.message;}
 update();
});
root.addEventListener('toggle',()=>{if(!root.open)clear();});
window.addEventListener('pageshow',clear);
document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();});
})();
