// IMP-025 3H.12.5 – sparplatser inklusive livsbakgrund.
(function(){'use strict';
const PREFIX='kronor-och-blod.slot.v1.',BASE='kronor-och-blod.';
const KEY=BASE+'character.v1',ID_KEY=BASE+'character.identity.v1';
const STEMS=['story','encounter','investigation','calendar','daylog','life-background'];
const SAVE_KEYS=[KEY,ID_KEY];STEMS.forEach(s=>SAVE_KEYS.push(BASE+s+'.v1',BASE+s+'.owner.v1'));
const ID_RE=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function key(id){if(typeof id!=='string'||!ID_RE.test(id))throw Error('Ogiltigt karaktärs-ID.');return PREFIX+id;}
function active(){
 const c=window.KB_CHARACTER&&window.KB_CHARACTER.get();
 if(!c||!c.characterId||!ID_RE.test(c.characterId))throw Error('Aktiv karaktär saknar giltigt ID.');
 const raw=localStorage.getItem(KEY),identityRaw=localStorage.getItem(ID_KEY);
 if(!raw||!identityRaw)throw Error('Aktiv karaktär saknar verifierbar identitet.');
 const identity=JSON.parse(identityRaw),character=JSON.parse(raw);
 if(!identity||identity.version!==1||identity.characterId!==c.characterId||identity.characterRaw!==raw||!character||character.version!==1||character.name!==c.name)throw Error('Identiteten stämmer inte med karaktärssparningen.');
 return {id:c.characterId,name:c.name};
}
function snapshot(){
 const c=active(),entries={};
 SAVE_KEYS.forEach(k=>{const v=localStorage.getItem(k);if(v!==null)entries[k]=v;});
 for(const stem of STEMS){
  const dataKey=BASE+stem+'.v1',ownerKey=BASE+stem+'.owner.v1';
  const data=entries[dataKey],ownerRaw=entries[ownerKey];
  if(stem==='life-background'&&((data===undefined)!==(ownerRaw===undefined)))throw Error('Livsbakgrund saknar ägarpar.');
  if(ownerRaw===undefined)continue; // Äldre poster i övriga system bevaras.
  const owner=JSON.parse(ownerRaw);
  if(!owner||owner.version!==1||owner.characterId!==c.id||data===undefined)throw Error('Ägarkontrollen misslyckades för '+stem+'.');
  const field=stem==='calendar'?'calendarRaw':stem==='daylog'?'daylogRaw':stem==='life-background'?'backgroundRaw':null;
  if(field&&owner[field]!==data)throw Error('Sparning och ägarpost skiljer sig åt för '+stem+'.');
  if(stem==='life-background'&&(!window.KB_LIFE_BACKGROUND_MODEL||!window.KB_LIFE_BACKGROUND_MODEL.parse(data).ok))throw Error('Ogiltig livsbakgrund.');
 }
 return {format:'kronor-och-blod-character-slot',version:1,characterId:c.id,name:c.name,savedAt:new Date().toISOString(),entries};
}
function saveActive(){
 const data=snapshot(),slotKey=key(data.characterId),before=localStorage.getItem(slotKey),raw=JSON.stringify(data);
 if(before!==null){
  let previous;try{previous=JSON.parse(before);}catch(_){throw Error('Sparplatsen är skadad och skrivs inte över.');}
  if(!previous||previous.version!==1||previous.format!==data.format||previous.characterId!==data.characterId)throw Error('Sparplatsen är ogiltig och skrivs inte över.');
 }
 try{localStorage.setItem(slotKey,raw);if(localStorage.getItem(slotKey)!==raw)throw Error('Verifiering misslyckades.');}
 catch(_){try{if(before===null)localStorage.removeItem(slotKey);else localStorage.setItem(slotKey,before);}catch(__){}throw Error('Sparplatsen kunde inte sparas säkert.');}
 return {characterId:data.characterId,name:data.name,savedAt:data.savedAt};
}
function list(){
 const result=[];
 for(let i=0;i<localStorage.length;i++){
  const k=localStorage.key(i);if(!k||!k.startsWith(PREFIX))continue;
  try{const p=JSON.parse(localStorage.getItem(k));
   if(p&&p.format==='kronor-och-blod-character-slot'&&p.version===1&&key(p.characterId)===k&&typeof p.name==='string'&&typeof p.savedAt==='string'&&p.entries&&typeof p.entries==='object')result.push({characterId:p.characterId,name:p.name,savedAt:p.savedAt});
  }catch(_){}
 }
 return result.sort((a,b)=>a.name.localeCompare(b.name,'sv'));
}
window.KB_CHARACTER_SLOTS=Object.freeze({saveActive,list});
})();
