// IMP-025 3H.12.5 – transaktioner med livsbakgrund och återställning.
(function(){'use strict';
const BASE='kronor-och-blod.';
const PREFIX=BASE+'slot.v1.';
const JOURNAL=BASE+'switch.journal.v1';
const STEMS=['story','encounter','investigation','calendar','daylog','life-background'];
const KEYS=[BASE+'character.v1',BASE+'character.identity.v1'];
STEMS.forEach(s=>KEYS.push(BASE+s+'.v1',BASE+s+'.owner.v1'));
const ALLOWED=new Set(KEYS);
const ID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function validEntries(e){return !!e&&typeof e==='object'&&!Array.isArray(e)&&Object.keys(e).every(k=>ALLOWED.has(k)&&typeof e[k]==='string');}
function validateLife(entries,id){
 const stem='life-background',d=entries[BASE+stem+'.v1'],o=entries[BASE+stem+'.owner.v1'];
 if((d===undefined)!==(o===undefined))throw Error('Livsbakgrund saknar ägarpar.');
 if(d!==undefined){
  const owner=JSON.parse(o);
  if(!owner||owner.version!==1||owner.characterId!==id||owner.backgroundRaw!==d)throw Error('Livsbakgrundens ägare stämmer inte.');
  if(!window.KB_LIFE_BACKGROUND_MODEL||!window.KB_LIFE_BACKGROUND_MODEL.parse(d).ok)throw Error('Ogiltig livsbakgrund.');
 }
}
function readActive(){const e={};KEYS.forEach(k=>{const v=localStorage.getItem(k);if(v!==null)e[k]=v;});return e;}
function apply(e){KEYS.forEach(k=>{if(Object.prototype.hasOwnProperty.call(e,k))localStorage.setItem(k,e[k]);else localStorage.removeItem(k);});}
function equals(e){return KEYS.every(k=>localStorage.getItem(k)===(Object.prototype.hasOwnProperty.call(e,k)?e[k]:null));}
function validateJournal(j){
 if(!j||j.version!==1||!validEntries(j.before)||typeof j.activeSlotKey!=='string'||!j.activeSlotKey.startsWith(PREFIX)||!ID_RE.test(j.activeSlotKey.slice(PREFIX.length))||!(j.previousSlot===null||typeof j.previousSlot==='string'))throw Error('Återställningsjournalen är ogiltig.');
 const id=j.activeSlotKey.slice(PREFIX.length),c=j.before[BASE+'character.v1'],i=j.before[BASE+'character.identity.v1'];
 if(!c||!i)throw Error('Journalen saknar identitet.');
 const character=JSON.parse(c),identity=JSON.parse(i);
 if(!character||character.version!==1||typeof character.name!=='string'||!identity||identity.version!==1||identity.characterId!==id||identity.characterRaw!==c)throw Error('Journalens identitet är fel.');
 for(const stem of STEMS){
  const d=j.before[BASE+stem+'.v1'],o=j.before[BASE+stem+'.owner.v1'];
  if((d===undefined)!==(o===undefined))throw Error('Journalen saknar ägarpar: '+stem);
  if(o!==undefined){const owner=JSON.parse(o);
   if(!owner||owner.version!==1||owner.characterId!==id)throw Error('Journalen har fel ägare: '+stem);
   const field=stem==='calendar'?'calendarRaw':stem==='daylog'?'daylogRaw':stem==='life-background'?'backgroundRaw':null;
   if(field&&owner[field]!==d)throw Error('Journalens data skiljer sig: '+stem);
   if(stem==='life-background'&&(!window.KB_LIFE_BACKGROUND_MODEL||!window.KB_LIFE_BACKGROUND_MODEL.parse(d).ok))throw Error('Journalens livsbakgrund är ogiltig.');
  }
 }
}
function restore(j){
 validateJournal(j);apply(j.before);
 if(j.previousSlot===null)localStorage.removeItem(j.activeSlotKey);else localStorage.setItem(j.activeSlotKey,j.previousSlot);
 if(!equals(j.before)||localStorage.getItem(j.activeSlotKey)!==j.previousSlot)throw Error('Återställningen kunde inte verifieras.');
 localStorage.removeItem(JOURNAL);
 if(localStorage.getItem(JOURNAL)!==null)throw Error('Journalen kunde inte rensas.');
}

let busy=false;
function recover(){const raw=localStorage.getItem(JOURNAL);if(raw===null)return Object.freeze({recovered:false});restore(JSON.parse(raw));return Object.freeze({recovered:true});}
function switchTo(targetId){
 if(busy)throw Error('Ett karaktärsbyte pågår redan.');busy=true;
 try{
  if(localStorage.getItem(JOURNAL)!==null)throw Error('En tidigare bytesjournal måste återställas först.');
  const check=window.KB_SWITCH_PREFLIGHT&&window.KB_SWITCH_PREFLIGHT.inspect(targetId);
  if(!check||!check.ok)throw Error(check?check.reason:'Byteskontrollen saknas.');
  const before=readActive();validateLife(before,check.fromId);
  const activeSlotKey=PREFIX+check.fromId,previousSlot=localStorage.getItem(activeSlotKey);
  if(previousSlot!==null){const c=window.KB_SLOT_RESTORE_PREFLIGHT.inspect(check.fromId);if(!c.ok)throw Error('Aktiv sparplats är skadad: '+c.reason);}
  const targetRaw=localStorage.getItem(PREFIX+targetId),target=JSON.parse(targetRaw);
  if(!target||target.characterId!==targetId||!validEntries(target.entries))throw Error('Målsparplatsen har ändrats.');
  validateLife(target.entries,targetId);
  const again=window.KB_SLOT_RESTORE_PREFLIGHT.inspect(targetId);
  if(!again.ok||localStorage.getItem(PREFIX+targetId)!==targetRaw)throw Error('Målsparplatsen kunde inte verifieras.');
  const newActiveSlot=JSON.stringify({format:'kronor-och-blod-character-slot',version:1,characterId:check.fromId,name:check.fromName,savedAt:new Date().toISOString(),entries:before});
  const journal={version:1,activeSlotKey,previousSlot,before},journalRaw=JSON.stringify(journal);
  localStorage.setItem(JOURNAL,journalRaw);
  if(localStorage.getItem(JOURNAL)!==journalRaw)throw Error('Bytesjournalen kunde inte verifieras.');
  try{
   localStorage.setItem(activeSlotKey,newActiveSlot);
   if(localStorage.getItem(activeSlotKey)!==newActiveSlot)throw Error('Aktiv sparplats kunde inte verifieras.');
   if(!window.KB_SLOT_RESTORE_PREFLIGHT.inspect(check.fromId).ok)throw Error('Aktiv sparplats klarade inte kontrollen.');
   apply(target.entries);
   if(!equals(target.entries))throw Error('Aktiva sparningar kunde inte verifieras.');
   localStorage.removeItem(JOURNAL);
   if(localStorage.getItem(JOURNAL)!==null)throw Error('Journalen kunde inte avslutas.');
  }catch(error){
   try{restore(journal);}catch(_){throw Error('Byte avbrutet. Återställning krävs vid nästa sidstart.');}
   throw Error('Byte avbrutet och återställt: '+error.message);
  }
  return Object.freeze({ok:true,fromName:check.fromName,toName:check.toName,reloadRequired:true});
 }finally{busy=false;}
}
window.KB_CHARACTER_SWITCH=Object.freeze({switchTo,recover});
})();
