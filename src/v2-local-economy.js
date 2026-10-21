/* V2-05B: reproducible regional grain simulation, derived from verified paid workdays.
   No new save key and no mutation of economy-v1. Market purchases remain outside this simulation. */
(function(){'use strict';
const c=window.KB_V2_DATA_CONTRACT,cal=window.KB_V2_CALENDAR,travel=window.KB_V2_TRAVEL,eco=window.KB_V2_ECONOMY,npc=window.KB_V2_NPC_LIFE;
const MAX=365000, CAP=40;
function simulate(elapsed,days){
 let farm=12,mill=7,produced=0,consumed=0,delivered=0,work=0,at=0;
 // Day zero is the first playable day. A paid workday x finishes at the start of x+1.
 for(let day=1;day<=elapsed;day++){
  if(day%4===0)farm=Math.min(CAP,farm+2); // background farmers
  while(at<days.length&&days[at]===day-1){farm=Math.min(CAP,farm+3);produced+=3;work++;at++;}
  if(farm>0){farm--;consumed++;} // households near Keldra
  if(day%2===0&&farm>0&&mill<CAP){farm--;mill++;delivered++;}
  if(mill>0){mill--;consumed++;} // Dorneth households and mill
 }
 return {farm,mill,produced,consumed,delivered,work};
}
function getState(){
 try{
  const id=localStorage.getItem(c.activeKey());if(!id||!c.readCharacter(id).ok)return {ok:false,error:'Aktiv karaktär saknas.'};
  const d=cal.getState(),t=travel.getState(),e=eco.getState(),n=npc.getRelationships();
  if(!d.ok||!t.ok||!e.ok||!n.ok||[d.id,t.id,e.id,n.id].some(x=>x!==id)||!Number.isSafeInteger(d.elapsedDays)||d.elapsedDays<0||d.elapsedDays>MAX)return {ok:false,error:'Karaktärens ekonomi eller relationer kunde inte verifieras.'};
  const raw=localStorage.getItem(c.characterKey(id)+'.economy-v1');let days=[];
  if(raw!==null){const v=JSON.parse(raw);if(!v||v.version!==1||v.ownerId!==id||!Array.isArray(v.paidDays)||v.pending!==null)return {ok:false,error:'Arbetsjournalen kunde inte verifieras.'};days=v.paidDays;let prev=-1;for(const x of days){if(!Number.isSafeInteger(x)||x<=prev||x<0||x>=MAX||x>=d.elapsedDays)return {ok:false,error:'Arbetsdagarna kunde inte verifieras.'};prev=x;}}
  const sim=simulate(d.elapsedDays,days),recent=days.filter(x=>d.elapsedDays-x<=7).length;
  const low=sim.farm<=3||sim.mill<=2,status=low?'Brist på spannmål':sim.farm<=8||sim.mill<=5?'Knapp tillgång':'Stabil försörjning';
  const details=sim.mill<=2?'Edda har svårt att hålla kvarnens leveranser igång.':sim.mill<=5?'Edda måste hushålla med säden vid kvarnen.':'Edda har spannmål att fördela vid kvarnen.';
  return {ok:true,id,day:d.dayNumber,place:t.placeId,coins:e.coins,grain:e.grain,production:sim.produced,recentWorkdays:recent,supply:sim.farm+sim.mill,status,details,stocks:{keldra:sim.farm,dorneth:sim.mill},flows:{produced:sim.produced,consumed:sim.consumed,delivered:sim.delivered},people:{mara:{name:'Mara',message:sim.farm<=3?'Mara oroar sig för byns nästan tomma förråd.':recent?'Mara ser att ditt arbete hjälpt gården att fylla förrådet.':'Mara försöker hålla åkrarna i bruk.'},edda:{name:'Edda',message:details},toren:{name:'Toren',message:'Toren behöver fortfarande virke till verkstaden.'}}};
 }catch(_){return {ok:false,error:'Den lokala ekonomin kunde inte läsas. Inga sparningar ändrades.'};}
}
window.KB_V2_LOCAL_ECONOMY=Object.freeze({getState,simulate});
})();
