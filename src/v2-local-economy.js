/* V2-05D: autonomous background farming and mill deliveries; replay only, no save changes. */
(function(){'use strict';
const c=window.KB_V2_DATA_CONTRACT,cal=window.KB_V2_CALENDAR,travel=window.KB_V2_TRAVEL,eco=window.KB_V2_ECONOMY,npc=window.KB_V2_NPC_LIFE,market=window.KB_V2_MARKET;
const MAX=365000,CAP=40;
function simulate(elapsed,days,purchases=[]){
 let farm=12,mill=7,produced=0,backgroundProduced=0,consumed=0,delivered=0,work=0,bought=0,at=0,pi=0;
 while(pi<purchases.length&&purchases[pi].day===0){if(mill>0)mill--;bought++;pi++;}
 for(let day=1;day<=elapsed;day++){
  // Keldra's farmers work independently of the player. A small daily surplus
  // supports households and a delivery every second day.
  const background=Math.min(3,CAP-farm);
  farm+=background;backgroundProduced+=background;
  while(at<days.length&&days[at]===day-1){const bonus=Math.min(3,CAP-farm);farm+=bonus;produced+=3;work++;at++;}
  if(farm>0){farm--;consumed++;}
  if(day%2===0&&farm>0&&mill<CAP){const shipment=Math.min(3,farm,CAP-mill);farm-=shipment;mill+=shipment;delivered+=shipment;}
  if(mill>0){mill--;consumed++;}
  // Market purchases occur after the day's completed simulation.
  while(pi<purchases.length&&purchases[pi].day===day){if(mill>0)mill--;bought++;pi++;}
 }
 return {farm,mill,produced,backgroundProduced,consumed,delivered,work,bought};
}
function getState(){try{
 const id=localStorage.getItem(c.activeKey());if(!id||!c.readCharacter(id).ok)return {ok:false,error:'Aktiv karaktär saknas.'};
 const d=cal.getState(),t=travel.getState(),e=eco.getState(),n=npc.getRelationships(),m=market.purchases();
 if(!d.ok||!t.ok||!e.ok||!n.ok||!m.ok||[d.id,t.id,e.id,n.id,m.id].some(x=>x!==id)||!Number.isSafeInteger(d.elapsedDays)||d.elapsedDays<0||d.elapsedDays>MAX)return {ok:false,error:m.error||'Karaktärens ekonomi eller relationer kunde inte verifieras.'};
 const raw=localStorage.getItem(c.characterKey(id)+'.economy-v1');let days=[];
 if(raw!==null){const v=JSON.parse(raw);if(!v||v.version!==1||v.ownerId!==id||!Array.isArray(v.paidDays)||v.pending!==null)return {ok:false,error:'Arbetsjournalen kunde inte verifieras.'};days=v.paidDays;let prev=-1;for(const x of days){if(!Number.isSafeInteger(x)||x<=prev||x<0||x>=MAX||x>=d.elapsedDays)return {ok:false,error:'Arbetsdagarna kunde inte verifieras.'};prev=x;}}
 let prev=-1;for(const p of m.purchases){if(p.day<prev||p.day>d.elapsedDays)return {ok:false,error:'Marknadens dagar kunde inte verifieras.'};prev=p.day;}
 const sim=simulate(d.elapsedDays,days,m.purchases),recent=days.filter(x=>d.elapsedDays-x<=7).length;
 const low=sim.farm<=3||sim.mill<=2,status=low?'Brist på spannmål':sim.farm<=8||sim.mill<=5?'Knapp tillgång':'Stabil försörjning';
 const details=sim.mill<=2?'Edda väntar på nästa leverans från Keldra.':sim.mill<=5?'Edda fördelar varsamt spannmålet som bönderna skickat.':'Edda har spannmål att fördela vid kvarnen.';
 return {ok:true,id,day:d.dayNumber,place:t.placeId,coins:e.coins,grain:e.grain,production:sim.produced,recentWorkdays:recent,supply:sim.farm+sim.mill,status,details,stocks:{keldra:sim.farm,dorneth:sim.mill},flows:{produced:sim.produced,backgroundProduced:sim.backgroundProduced,consumed:sim.consumed,delivered:sim.delivered,bought:sim.bought},people:{mara:{name:'Mara',message:sim.farm<=3?'Mara oroar sig för byns nästan tomma förråd.':recent?'Mara ser att ditt arbete hjälpt gården att fylla förrådet.':'Mara och byns bönder fortsätter arbetet på åkrarna.'},edda:{name:'Edda',message:details},toren:{name:'Toren',message:'Toren behöver fortfarande virke till verkstaden.'}}};
 }catch(_){return {ok:false,error:'Den lokala ekonomin kunde inte läsas. Inga sparningar ändrades.'};}}
window.KB_V2_LOCAL_ECONOMY=Object.freeze({getState,simulate});
})();
