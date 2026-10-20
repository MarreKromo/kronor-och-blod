/* V2-03.2F – adaptation of src/calendar.js (KB-03.6.4 / IMP-025).
   Preserves UTC date arithmetic, season logic, ownership checks and verified writes.
   Uses only the V2 character-scoped calendar key; never reads/writes old calendar keys. */
(function () {
'use strict';
const contract=window.KB_V2_DATA_CONTRACT;
const START=Date.UTC(1250,0,1),MAX=365000,DAY=86400000;
const months=['januari','februari','mars','april','maj','juni','juli','augusti','september','oktober','november','december'];
function active(){
 if(!contract)return {ok:false,error:'Kalenderns datakontrakt saknas.'};
 try{
  const id=localStorage.getItem(contract.activeKey());
  if(!id)return {ok:false,error:'Skapa en karaktär innan du använder kalendern.'};
  if(!contract.readCharacter(id).ok)return {ok:false,error:'Aktiv karaktär kunde inte verifieras. Inga data ändrades.'};
  return {ok:true,id};
 }catch(_){return {ok:false,error:'Karaktären kunde inte läsas. Inga data ändrades.'};}
}
function valid(v,id){return !!v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).sort().join(',')==='elapsedDays,ownerId,version'&&v.version===1&&v.ownerId===id&&Number.isSafeInteger(v.elapsedDays)&&v.elapsedDays>=0&&v.elapsedDays<=MAX;}
function read(){
 const a=active();if(!a.ok)return a;
 try{
  const raw=localStorage.getItem(contract.calendarKey(a.id));
  if(raw===null)return {ok:true,id:a.id,elapsedDays:0,initialized:false};
  const v=JSON.parse(raw);
  if(!valid(v,a.id))return {ok:false,error:'Kalendersparningen är ogiltig eller tillhör fel karaktär. Inga data ändrades.'};
  return {ok:true,id:a.id,elapsedDays:v.elapsedDays,initialized:true};
 }catch(_){return {ok:false,error:'Kalendersparningen kunde inte läsas. Inga data ändrades.'};}
}
function describe(days){
 const d=new Date(START+days*DAY),year=d.getUTCFullYear(),month=d.getUTCMonth(),day=d.getUTCDate();
 const season=month<=1||month===11?'Vinter':month<=4?'Vår':month<=7?'Sommar':'Höst';
 return {year,month:month+1,day,dayNumber:days+1,season,label:day+' '+months[month]+' '+year};
}
function getState(){const r=read();return r.ok?{...r,...describe(r.elapsedDays)}:r;}
function advanceDay(){
 const before=read();if(!before.ok)return before;
 if(before.elapsedDays>=MAX)return {ok:false,error:'Kalenderns högsta dagantal har uppnåtts.'};
 const a=active();if(!a.ok||a.id!==before.id)return {ok:false,error:'Aktiv karaktär ändrades. Ingen dag sparades.'};
 const key=contract.calendarKey(before.id),next=JSON.stringify({version:1,ownerId:before.id,elapsedDays:before.elapsedDays+1});
 try{
  const previous=localStorage.getItem(key);
  if(before.initialized!== (previous!==null))return {ok:false,error:'Kalendern ändrades under sparningen.'};
  if(previous!==null){const parsed=JSON.parse(previous);if(!valid(parsed,before.id)||parsed.elapsedDays!==before.elapsedDays)return {ok:false,error:'Kalendern ändrades under sparningen.'};}
  if(active().id!==before.id)return {ok:false,error:'Aktiv karaktär ändrades. Ingen dag sparades.'};
  localStorage.setItem(key,next);
  if(localStorage.getItem(key)!==next)return {ok:false,error:'Kalendern kunde inte verifieras efter sparning.'};
  const after=getState();
  if(!after.ok||after.id!==before.id||after.elapsedDays!==before.elapsedDays+1)return {ok:false,error:'Kalenderns nya tillstånd kunde inte verifieras.'};
  window.dispatchEvent(new CustomEvent('kb:day-advanced',{detail:after}));
  return after;
 }catch(_){return {ok:false,error:'Kalendern kunde inte sparas. Ingen automatisk återställning gjordes.'};}
}
window.KB_V2_CALENDAR=Object.freeze({getState,advanceDay});
})();
