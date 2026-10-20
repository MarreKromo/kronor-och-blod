// IMP-025 3H.12.5 – tidig återstartssäkring, laddas först.
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
   if(stem==='life-background'){const b=JSON.parse(d);if(!b||b.version!==1||!['farm','craft','letters','freeborn'].includes(b.upbringing)||!['together','distant','alone'].includes(b.familySituation)||!['ordinary','debt','promise','conflict'].includes(b.past)||!['farmstead','trade','travel','influence'].includes(b.ambition)||typeof b.biography!=='string'||b.biography.length>500||/[\\u0000-\\u001f\\u007f]/.test(b.biography)||Object.keys(b).some(k=>!['version','upbringing','familySituation','past','ambition','biography'].includes(k)))throw Error('Journalens livsbakgrund är ogiltig.');}
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

function recover(){const raw=localStorage.getItem(JOURNAL);if(raw===null)return false;restore(JSON.parse(raw));return true;}
try{window.KB_SWITCH_RECOVERY=Object.freeze({ok:true,recovered:recover()});}
catch(error){
 window.KB_SWITCH_RECOVERY=Object.freeze({ok:false,recovered:false});
 document.open();
 document.write('<!doctype html><html lang="sv"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sparning skyddad</title><body style="background:#151a17;color:#f2e7ce;font:18px/1.5 system-ui;padding:24px"><h1>Sparningen är skyddad</h1><p>Ett avbrutet karaktärsbyte kunde inte återställas automatiskt. Spelet har stoppats för att skydda dina sparningar.</p><p>Rensa inte webbplatsens data. Kontakta utvecklaren innan du fortsätter.</p></body></html>');
 document.close();if(typeof window.stop==='function')window.stop();
}
})();
