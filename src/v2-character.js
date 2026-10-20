/* V2-03.2E: character slots, no deletion or migration. */
(function () {
'use strict';
const model=window.KB_LIFE_BACKGROUND_MODEL, contract=window.KB_V2_DATA_CONTRACT;
const host=document.getElementById('characterPanel'), story=document.querySelector('.story'),nav=document.querySelector('.bottom'),characterTab=document.getElementById('characterTab');
if(!host||!story||!nav||!characterTab)return;
const status=document.getElementById('characterStatus'),content=document.getElementById('characterContent');
const MAX_SLOTS=3;
function add(tag,text,parent,cls){const e=document.createElement(tag);if(text!==null)e.textContent=text;if(cls)e.className=cls;parent.appendChild(e);return e;}
function notify(text){status.textContent=text;}
function showCharacter(){story.hidden=true;host.hidden=false;nav.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b===characterTab));render();}
function showStory(){host.hidden=true;story.hidden=false;}
characterTab.addEventListener('click',showCharacter);
['storyTab','journalTab','mapTab'].forEach(id=>document.getElementById(id)?.addEventListener('click',showStory));
function slots(){
 if(!contract)return {ok:false,error:'Datakontraktet saknas.'};
 try{
  const prefix=contract.PREFIX+'character.',ids=[],seen=new Set();
  for(let i=0;i<localStorage.length;i++){
   const key=localStorage.key(i);
   if(!key||!key.startsWith(prefix))continue;
   const tail=key.slice(prefix.length);
   // Story, journal and calendar keys must not be mistaken for character records.
   if(tail.includes('.'))continue;
   const read=contract.readCharacter(tail);
   if(!read.ok)return {ok:false,error:'En karaktärssparning kan inte verifieras. Inga ändringar har gjorts.'};
   if(!seen.has(tail)){seen.add(tail);ids.push(read.value);}
  }
  ids.sort((a,b)=>a.name.localeCompare(b.name,'sv'));
  const activeId=localStorage.getItem(contract.activeKey());
  if(activeId!==null&&!ids.some(c=>c.id===activeId))return {ok:false,error:'Aktiv karaktär saknas eller är ogiltig. Inga ändringar har gjorts.'};
  if(activeId===null&&ids.length)return {ok:false,error:'Sparade karaktärer finns men aktiv karaktär saknas. Inga ändringar har gjorts.'};
  return {ok:true,characters:ids,activeId};
 }catch(_){return {ok:false,error:'Karaktärernas lagring kunde inte läsas.'};}
}
function uuid(){
 if(!window.crypto||!crypto.getRandomValues)throw Error('Säker ID-generering saknas.');
 if(crypto.randomUUID)return crypto.randomUUID();
 const b=new Uint8Array(16);crypto.getRandomValues(b);b[6]=(b[6]&15)|64;b[8]=(b[8]&63)|128;
 const s=Array.from(b,x=>x.toString(16).padStart(2,'0')).join('');
 return [s.slice(0,8),s.slice(8,12),s.slice(12,16),s.slice(16,20),s.slice(20)].join('-');
}
function changeActive(target){
 const current=slots();if(!current.ok)return {ok:false,error:current.error};
 if(!current.characters.some(c=>c.id===target))return {ok:false,error:'Karaktären finns inte.'};
 if(current.activeId===target)return {ok:true};
 const key=contract.activeKey(),old=current.activeId;
 try{
  if(localStorage.getItem(key)!==old)throw Error('Aktiv karaktär ändrades under bytet.');
  localStorage.setItem(key,target);
  if(localStorage.getItem(key)!==target)throw Error('Karaktärsbytet kunde inte verifieras.');
  window.dispatchEvent(new Event('kb:v2-character-changed'));
  return {ok:true};
 }catch(e){
  try{if(localStorage.getItem(key)===target){if(old===null)localStorage.removeItem(key);else localStorage.setItem(key,old);}}catch(_){}
  return {ok:false,error:e.message||'Kunde inte byta karaktär.'};
 }
}
function saveNew(character){
 const check=contract.validateCharacter(character);
 if(!check.ok)return {ok:false,error:check.errors.join(' ')};
 const existing=slots();if(!existing.ok)return {ok:false,error:existing.error};
 if(existing.characters.length>=MAX_SLOTS)return {ok:false,error:'Alla tre karaktärsplatser är upptagna.'};
 const key=contract.characterKey(character.id),active=contract.activeKey(),raw=JSON.stringify(character);
 try{
  if(localStorage.getItem(key)!==null)throw Error('Karaktärs-ID används redan.');
  if(localStorage.getItem(active)!==existing.activeId)throw Error('Aktiv karaktär ändrades under sparningen.');
  localStorage.setItem(key,raw);
  if(localStorage.getItem(key)!==raw||!contract.readCharacter(character.id).ok)throw Error('Karaktären kunde inte verifieras.');
  localStorage.setItem(active,character.id);
  if(localStorage.getItem(active)!==character.id)throw Error('Aktiv karaktär kunde inte verifieras.');
  window.dispatchEvent(new Event('kb:v2-character-changed'));
  return {ok:true};
 }catch(e){
  // Never delete the character record on failure: it may be recoverable.
  return {ok:false,error:(e.message||'Sparningen misslyckades.')+' Inga data har raderats.'};
 }
}
function details(c){
 add('h3',c.name,content);add('p','Startplats: Keldra',content);
 const labels={upbringing:'Uppväxt',familySituation:'Familj',past:'Förflutet',ambition:'Ambition'};
 for(const field of Object.keys(labels))add('p',labels[field]+': '+model.LABELS[field][c.background[field]],content);
 if(c.background.biography)add('p','Livshistoria: '+c.background.biography,content);
}
function form(){
 const f=add('form',null,content,'character-form');
 add('h3','Skapa en ny karaktär',f);
 const nameLabel=add('label','Namn',f),name=add('input',null,nameLabel);name.type='text';name.required=true;name.minLength=2;name.maxLength=32;name.autocomplete='off';
 const fields=[['upbringing','Uppväxt'],['familySituation','Familjesituation'],['past','Förflutet'],['ambition','Ambition']],selects={};
 fields.forEach(([field,title])=>{const label=add('label',title,f),sel=add('select',null,label);sel.required=true;for(const value of model.OPTIONS[field]){const option=add('option',model.LABELS[field][value],sel);option.value=value;}selects[field]=sel;});
 const bioLabel=add('label','Livshistoria (valfri, högst 500 tecken)',f),bio=add('textarea',null,bioLabel);bio.maxLength=500;bio.rows=3;
 const error=add('p','',f,'character-error');error.setAttribute('role','alert');
 const submit=add('button','Skapa karaktär',f,'character-submit');submit.type='submit';
 f.addEventListener('submit',e=>{
  e.preventDefault();error.textContent='';let id;
  try{id=uuid();}catch(err){error.textContent=err.message;return;}
  const background={version:1,biography:bio.value};fields.forEach(([field])=>background[field]=selects[field].value);
  const saved=saveNew({version:2,id,name:name.value.trim(),placeId:'keldra',background});
  if(!saved.ok){error.textContent=saved.error;return;}
  render();
 });
}
function render(){
 content.replaceChildren();
 if(!model||!contract){notify('Karaktärssystemet kunde inte laddas.');return;}
 const found=slots();if(!found.ok){notify(found.error);return;}
 notify('Karaktärsplatser: '+found.characters.length+' av '+MAX_SLOTS+'. Varje karaktär har egna berättelseval.');
 if(found.activeId){const active=found.characters.find(c=>c.id===found.activeId);details(active);}
 add('h3','Dina karaktärer',content);
 if(!found.characters.length)add('p','Du har ännu ingen karaktär.',content);
 for(const c of found.characters){
  const row=add('div',null,content,'character-slot');
  add('span',c.name+(c.id===found.activeId?' · Aktiv':''),row);
  if(c.id!==found.activeId){const button=add('button','Spela som '+c.name,row,'character-switch');button.type='button';button.addEventListener('click',()=>{const r=changeActive(c.id);if(!r.ok){notify(r.error);return;}render();});}
 }
 if(found.characters.length<MAX_SLOTS)form();
 else add('p','Tre karaktärsplatser används. Ingen karaktär raderas automatiskt.',content,'character-hint');
}
render();
})();
