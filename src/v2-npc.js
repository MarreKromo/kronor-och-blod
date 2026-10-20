/* V2-03.2I: follow-up meeting; independent, character-bound, create-only save. */
(function(){
'use strict';
const events=window.KB_V2_EVENTS,calendar=window.KB_V2_CALENDAR,contract=window.KB_V2_DATA_CONTRACT;
const KEY_SUFFIX='.event.edda-meeting-v1';
const choices={
 negotiate:{label:'Be Edda ge Mara mer tid',text:'Edda går med på att vänta till nästa marknad, men skulden står kvar. Mara får andrum.',flag:'edda_anstånd'},
 refuse:{label:'Vägra godta kvarnens krav',text:'Edda vägrar ge efter. Samtalet slutar utan uppgörelse, och Mara får bära osäkerheten vidare.',flag:'edda_konflikt'}
};
function key(id){return contract.characterKey(id)+KEY_SUFFIX;}
function read(id){
 try{
  const raw=localStorage.getItem(key(id));if(raw===null)return {ok:true,value:null};
  const d=JSON.parse(raw);
  if(!d||Array.isArray(d)||Object.keys(d).sort().join(',')!=='choice,day,ownerId,version'||d.version!==1||d.ownerId!==id||!Object.prototype.hasOwnProperty.call(choices,d.choice)||!Number.isSafeInteger(d.day)||d.day<7||d.day>365001)return {ok:false,error:'Eddas sparning är ogiltig. Ingen data ändrades.'};
  return {ok:true,value:d};
 }catch(_){return {ok:false,error:'Eddas sparning kunde inte läsas. Ingen data ändrades.'};}
}
function getState(){
 if(!events||!calendar||!contract)return {ok:false,error:'Händelsesystemet saknas.'};
 const e=events.getState(),c=calendar.getState();
 if(!e.ok)return {ok:false,error:e.error};if(!c.ok)return {ok:false,error:c.error};
 if(!e.available||!e.decision||e.variant!=='help'||e.decision.choice!=='act')return {ok:true,available:false};
 if(e.id!==c.id)return {ok:false,error:'Karaktärerna överensstämmer inte.'};
 const r=read(e.id);if(!r.ok)return r;
 const earliest=Math.max(7,e.decision.discoveredDay+1);
 return {ok:true,available:c.dayNumber>=earliest,id:e.id,currentDay:c.dayNumber,earliest,decision:r.value,choices};
}
function decide(choice){
 if(!Object.prototype.hasOwnProperty.call(choices,choice))return {ok:false,error:'Ogiltigt val.'};
 const before=getState();if(!before.ok||!before.available)return {ok:false,error:before.error||'Mötet är ännu inte tillgängligt.'};
 if(before.decision)return {ok:false,error:'Mötet är redan avgjort.'};
 const k=key(before.id),raw=JSON.stringify({version:1,ownerId:before.id,day:before.currentDay,choice});
 try{
  if(localStorage.getItem(k)!==null)return {ok:false,error:'Ett beslut finns redan. Ingen överskrivning.'};
  const now=getState();if(!now.ok||!now.available||now.id!==before.id||now.currentDay!==before.currentDay||now.decision)return {ok:false,error:'Mötets tillstånd har ändrats.'};
  localStorage.setItem(k,raw);
  if(localStorage.getItem(k)!==raw)return {ok:false,error:'Beslutet kunde inte verifieras.'};
  const verified=getState();if(!verified.ok||verified.decision?.choice!==choice)return {ok:false,error:'Beslutet kunde inte läsas tillbaka.'};
  window.dispatchEvent(new Event('kb:v2-npc-decided'));
  return {ok:true};
 }catch(_){return {ok:false,error:'Beslutet kunde inte sparas. Inga gamla sparningar har raderats.'};}
}
window.KB_V2_NPC=Object.freeze({getState,decide});
})();
