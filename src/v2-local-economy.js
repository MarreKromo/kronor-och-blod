/* V2-05A: deterministic local supply derived from verified player work; read-only compatibility layer. */
(function(){'use strict';
const c=window.KB_V2_DATA_CONTRACT,cal=window.KB_V2_CALENDAR,travel=window.KB_V2_TRAVEL,eco=window.KB_V2_ECONOMY,npc=window.KB_V2_NPC_LIFE;
const MAX=365000;
function getState(){
 try{
  const id=localStorage.getItem(c.activeKey());if(!id||!c.readCharacter(id).ok)return {ok:false,error:'Aktiv karaktär saknas.'};
  const d=cal.getState(),t=travel.getState(),e=eco.getState(),n=npc.getRelationships();
  if(!d.ok||!t.ok||!e.ok||!n.ok||[d.id,t.id,e.id,n.id].some(x=>x!==id))return {ok:false,error:'Karaktärens ekonomi eller relationer kunde inte verifieras.'};
  const k=c.characterKey(id)+'.economy-v1',raw=localStorage.getItem(k);
  let days=[];
  if(raw!==null){const v=JSON.parse(raw);if(!v||v.version!==1||v.ownerId!==id||!Array.isArray(v.paidDays)||v.pending!==null)return {ok:false,error:'Arbetsjournalen kunde inte verifieras.'};days=v.paidDays;let prev=-1;for(const x of days){if(!Number.isSafeInteger(x)||x<=prev||x<0||x>=MAX||x>=d.elapsedDays)return {ok:false,error:'Arbetsdagarna kunde inte verifieras.'};prev=x;}}
  // All figures are a local supply *indicator*, not an inventory or a new currency.
  // Existing wage grain remains owned by the player. No historical purchases are invented.
  const recent=days.filter(x=>d.elapsedDays-x<=7).length;
  const baseline=4,production=recent*2,consumption=Math.min(7,d.elapsedDays%8),supply=Math.max(0,baseline+production-consumption);
  const status=supply<=2?'Brist på spannmål':supply<=5?'Knapp tillgång':'Gott om spannmål';
  const edda=n.people.find(p=>p.id==='edda'),mara=n.people.find(p=>p.id==='mara');
  const details=supply<=2?'Kvarnen väntar på leveranser från åkrarna.':supply<=5?'Kvarnen har få säckar att fördela.':'Kvarnen har fått fler säckar att arbeta med.';
  return {ok:true,id,day:d.dayNumber,place:t.placeId,coins:e.coins,grain:e.grain,production,recentWorkdays:recent,supply,status,details,people:{mara:mara?{name:'Mara',message:recent?'Arbetet på åkrarna har bidragit till traktens försörjning.':'Mara väntar på hjälp med nästa skörd.'}:null,edda:edda?{name:'Edda',message:details}:null,toren:{name:'Toren',message:'Verkstaden behöver fortfarande virke; det ingår inte i spannmålsflödet.'}}};
 }catch(_){return {ok:false,error:'Den lokala ekonomin kunde inte läsas. Inga sparningar ändrades.'};}
}
window.KB_V2_LOCAL_ECONOMY=Object.freeze({getState});
})();
