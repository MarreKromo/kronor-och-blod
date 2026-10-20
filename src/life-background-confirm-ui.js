// IMP-025 · 3H.12.7 F — explicit confirmation in profile, DRY RUN ONLY.
// No calls to KB_LIFE_BACKGROUND_SAVE.save; no localStorage writes.
(function(){
'use strict';
const panel=document.getElementById('kb-life-background-form');
const wrapper=document.getElementById('kb-life-profile-entry');
const api=window.KB_LIFE_BACKGROUND_CONFIRM;
const model=window.KB_LIFE_BACKGROUND_MODEL;
const character=window.KB_CHARACTER;
if(!panel||!wrapper||!api||!model||!character)return;
const form=panel.querySelector('form');
if(!form)return;
const fields=['upbringing','familySituation','past','ambition'];
const selects=Array.from(form.querySelectorAll('select'));
const biography=form.querySelector('textarea');
if(selects.length!==4||!biography)return;
const gate=api.create({storage:localStorage,character,model});
const status=document.createElement('p');
status.setAttribute('role','status');
status.style.cssText='padding:8px 0;color:#e8c891;font:14px/1.5 system-ui';
status.textContent='Förhandsgranska först. Bekräftelsen är endast ett test och sparar ingenting.';
const confirm=document.createElement('button');
confirm.type='button';
confirm.textContent='Bekräfta val (test – sparar inte)';
confirm.disabled=true;
confirm.style.cssText='min-height:48px;padding:10px 14px;background:#66513b;color:#fff3d5;border:1px solid #e0bd73;border-radius:6px;font:600 14px system-ui';
form.after(confirm,status);
function value(){const v={version:1,biography:biography.value};fields.forEach((k,i)=>v[k]=selects[i].value);return v;}
function clear(){gate.cancel();confirm.disabled=true;}
form.addEventListener('input',clear);
form.addEventListener('change',clear);
const cancel=Array.from(form.querySelectorAll('button')).find(b=>b.type==='button');
if(cancel)cancel.addEventListener('click',()=>{clear();status.textContent='Avbrutet. Ingenting sparades.';});
form.addEventListener('submit',()=>{
  clear();
  try{
    // Preview's original submit handler runs before this listener.
    const v=value(),check=model.validate(v);
    if(!check.ok)throw Error(check.errors.join(' '));
    gate.prepare(v);
    confirm.disabled=false;
    status.textContent='Granskat. Du kan bekräfta valet som test. Ingen data sparas.';
  }catch(e){status.textContent='Bekräftelsen är spärrad: '+e.message;}
});
confirm.addEventListener('click',()=>{
  confirm.disabled=true;
  try{
    const result=gate.approve(value());
    status.textContent='Bekräftelsetest PASS för '+result.characterId+'. Ingen livsbakgrund sparades.';
  }catch(e){status.textContent='Bekräftelsetest stoppat: '+e.message;}
});
wrapper.addEventListener('toggle',()=>{if(!wrapper.open)clear();});
window.addEventListener('pageshow',clear);
document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();});
})();
