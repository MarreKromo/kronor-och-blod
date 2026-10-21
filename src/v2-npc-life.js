/* V2-04 KOMPLETT: three NPCs, deterministic routines/needs, per-character memories. */
(function(){'use strict';
const c=window.KB_V2_DATA_CONTRACT,cal=window.KB_V2_CALENDAR,travel=window.KB_V2_TRAVEL;
const NPCS=Object.freeze({
 mara:{name:'Mara',place:'keldra',role:'Bonde',routines:['Ser över åkrarna och utsädet.','Hämtar vatten vid brunnen.','Lagar redskap vid gården.'],needs:['Orolig för nästa skörd.','Behöver hjälp med dagens sysslor.','Försöker hålla gården i skick.'],actions:{help:{label:'Hjälp Mara med sysslorna',reply:'Mara tackar dig och vet att hon kan be dig om hjälp.',trust:2},listen:{label:'Lyssna på Maras bekymmer',reply:'Mara berättar om utsädet och verkar lättad över att bli hörd.',trust:1}}},
 edda:{name:'Edda',place:'dorneth',role:'Kvarnförvaltare',routines:['Räknar säckar och leveranser vid kvarnen.','Förhandlar med handlare på marknaden.','Granskar kvarnens räkenskaper.'],needs:['Behöver få kvarnens skulder betalda.','Saknar pålitliga leveranser.','Försöker hålla kvarnen i gång.'],actions:{help:{label:'Hjälp Edda att räkna säckar',reply:'Edda ser att du tar arbetet på allvar.',trust:2},listen:{label:'Fråga om kvarnens problem',reply:'Edda berättar att kvarnen också har utgifter.',trust:1}}},
 toren:{name:'Toren',place:'keldra',role:'Bybo och hantverkare',routines:['Lagar ett hjul vid verkstaden.','Letar efter användbart virke.','Vässar verktyg inför morgondagen.'],needs:['Saknar bra virke till reparationer.','Har fler beställningar än han hinner med.','Vill få ordning på sina verktyg.'],actions:{help:{label:'Hjälp Toren med arbetet',reply:'Toren nickar uppskattande när arbetet går lättare.',trust:2},listen:{label:'Fråga Toren om hans arbete',reply:'Toren visar dig ett trasigt hjul och förklarar vad som behövs.',trust:1}}}
});
const suffix='.npc-life-v1',LIMIT=365000;
function key(id){return c.characterKey(id)+suffix;}
function valid(v,id){if(!v||Array.isArray(v)||typeof v!=='object'||Object.keys(v).sort().join(',')!=='memories,ownerId,version'||v.version!==1||v.ownerId!==id||!v.memories||Array.isArray(v.memories)||typeof v.memories!=='object')return false;const keys=Object.keys(v.memories);if(keys.length>Object.keys(NPCS).length)return false;return keys.every(n=>{const m=v.memories[n];return Object.hasOwn(NPCS,n)&&m&&!Array.isArray(m)&&Object.keys(m).sort().join(',')==='choice,day'&&Object.hasOwn(NPCS[n].actions,m.choice)&&Number.isSafeInteger(m.day)&&m.day>=1&&m.day<=LIMIT+1;});}
function read(id){try{const raw=localStorage.getItem(key(id));if(raw===null)return {ok:true,raw:null,value:{version:1,ownerId:id,memories:{}}};const value=JSON.parse(raw);return valid(value,id)?{ok:true,raw,value}:{ok:false,error:'Invånarnas minnen kunde inte verifieras. Inga data ändrades.'};}catch(_){return {ok:false,error:'Invånarnas minnen kunde inte läsas.'};}}
function context(){const d=cal?.getState(),t=travel?.getState();if(!d?.ok)return {ok:false,error:d?.error||'Kalendern saknas.'};if(!t?.ok)return {ok:false,error:t?.error||'Positionen saknas.'};if(d.id!==t.id)return {ok:false,error:'Kalender och position tillhör olika karaktärer.'};return {ok:true,id:d.id,day:d.dayNumber,place:t.placeId};}
function getState(){const a=context();if(!a.ok)return a;const r=read(a.id);if(!r.ok)return r;const people=Object.entries(NPCS).map(([id,n])=>{const phase=(a.day-1+({mara:0,edda:1,toren:2}[id]))%3;const memory=r.value.memories[id]||null;return {id,name:n.name,role:n.role,place:n.place,available:n.place===a.place,routine:n.routines[phase],need:n.needs[phase],memory,trust:memory?NPCS[id].actions[memory.choice].trust:0,actions:n.actions};});return {ok:true,id:a.id,day:a.day,place:a.place,people};}
/* V2-04R: additive relationship journal. The original .npc-life-v1 remains read-only and intact. */
const relSuffix='.npc-relations-v1',MAX_VISITS=500;
function relKey(id){return c.characterKey(id)+relSuffix;}
function validRelations(v,id){
 if(!v||Array.isArray(v)||typeof v!=='object'||Object.keys(v).sort().join(',')!=='ownerId,people,version'||v.version!==1||v.ownerId!==id||!v.people||Array.isArray(v.people)||typeof v.people!=='object')return false;
 return Object.entries(v.people).every(([npc,entries])=>Object.hasOwn(NPCS,npc)&&Array.isArray(entries)&&entries.length<=MAX_VISITS&&entries.every((e,i)=>e&&!Array.isArray(e)&&Object.keys(e).sort().join(',')==='choice,day'&&Object.hasOwn(NPCS[npc].actions,e.choice)&&Number.isSafeInteger(e.day)&&e.day>=1&&e.day<=LIMIT+1&&(i===0||e.day>entries[i-1].day)));
}
function readRelations(id){
 try{const raw=localStorage.getItem(relKey(id));if(raw===null)return {ok:true,raw,value:{version:1,ownerId:id,people:{}}};
 const value=JSON.parse(raw);return validRelations(value,id)?{ok:true,raw,value}:{ok:false,error:'Relationsjournalen är ogiltig. Ingen data ändrades.'};
 }catch(_){return {ok:false,error:'Relationsjournalen kunde inte läsas.'};}
}
function getRelationships(){
 const a=context();if(!a.ok)return a;
 const first=read(a.id),later=readRelations(a.id);if(!first.ok)return first;if(!later.ok)return later;
 const people=Object.entries(NPCS).map(([id,n])=>{
 const initial=first.value.memories[id],visits=later.value.people[id]||[];
 const history=[...(initial?[{...initial,first:true}]:[]),...visits.map(v=>({...v,first:false}))];
 const last=history.at(-1)||null,trust=history.reduce((sum,v)=>sum+n.actions[v.choice].trust,0);
 const available=n.place===a.place;
 return {id,name:n.name,role:n.role,place:n.place,available,routine:n.routines[(a.day-1+({mara:0,edda:1,toren:2}[id]))%3],need:n.needs[(a.day-1+({mara:0,edda:1,toren:2}[id]))%3],trust,history,last,canMeet:available&&(!last||a.day>last.day),actions:n.actions,standing:trust>=10?'Pålitlig vän':trust>=5?'Bekant':trust>=2?'Vänligt inställd':'Främling'};
 });
 return {ok:true,id:a.id,day:a.day,place:a.place,people};
}
let relationBusy=false;
function meetAgain(npc,choice){
 if(relationBusy)return {ok:false,error:'Ett möte sparas redan.'};
 if(!Object.hasOwn(NPCS,npc)||!Object.hasOwn(NPCS[npc].actions,choice))return {ok:false,error:'Ogiltigt samtalsval.'};
 relationBusy=true;
 try{
 const a=context();if(!a.ok)return a;
 if(a.place!==NPCS[npc].place)return {ok:false,error:'Personen finns inte här.'};
 const first=read(a.id),later=readRelations(a.id);if(!first.ok)return first;if(!later.ok)return later;
 const initial=first.value.memories[npc],visits=later.value.people[npc]||[];
 if(!initial)return {ok:false,error:'Börja med ert första möte.'};
 const last=visits.at(-1)||initial;
 if(a.day<=last.day)return {ok:false,error:'Ni har redan träffats idag. Återkom en annan dag.'};
 if(visits.length>=MAX_VISITS)return {ok:false,error:'Relationsjournalen är full. Ingen historik raderades.'};
 const next={...later.value,people:{...later.value.people,[npc]:[...visits,{choice,day:a.day}]}};
 if(!validRelations(next,a.id))return {ok:false,error:'Relationsjournalen kunde inte valideras.'};
 const again=context();if(!again.ok||again.id!==a.id||again.day!==a.day||again.place!==a.place)return {ok:false,error:'Karaktär, plats eller tid ändrades.'};
 try{
 if(localStorage.getItem(key(a.id))!==first.raw||localStorage.getItem(relKey(a.id))!==later.raw)return {ok:false,error:'Mötet ändrades innan det kunde sparas.'};
 const raw=JSON.stringify(next);localStorage.setItem(relKey(a.id),raw);
 if(localStorage.getItem(relKey(a.id))!==raw)return {ok:false,error:'Mötet kunde inte verifieras.'};
 }catch(_){return {ok:false,error:'Mötet kunde inte sparas. Äldre minnen raderades inte.'};}
 window.dispatchEvent(new Event('kb:npc-life-changed'));return {ok:true};
 }finally{relationBusy=false;}
}
let busy=false;
function decide(npc,choice){if(busy)return {ok:false,error:'Ett möte sparas redan.'};if(!Object.hasOwn(NPCS,npc)||!Object.hasOwn(NPCS[npc].actions,choice))return {ok:false,error:'Ogiltigt samtalsval.'};busy=true;try{const a=context();if(!a.ok)return a;if(a.place!==NPCS[npc].place)return {ok:false,error:'Personen finns inte på din aktuella plats.'};const r=read(a.id);if(!r.ok)return r;if(r.value.memories[npc])return {ok:false,error:'Det här första mötet är redan sparat.'};const next={...r.value,memories:{...r.value.memories,[npc]:{choice,day:a.day}}};if(!valid(next,a.id))return {ok:false,error:'Mötet kunde inte valideras.'};const again=context();if(!again.ok||again.id!==a.id||again.day!==a.day||again.place!==a.place)return {ok:false,error:'Karaktär, tid eller plats ändrades.'};try{if(localStorage.getItem(key(a.id))!==r.raw)return {ok:false,error:'Mötet ändrades under sparningen.'};const raw=JSON.stringify(next);localStorage.setItem(key(a.id),raw);if(localStorage.getItem(key(a.id))!==raw)return {ok:false,error:'Mötet kunde inte verifieras.'};}catch(_){return {ok:false,error:'Mötet kunde inte sparas. Ingen äldre data raderades.'};}window.dispatchEvent(new Event('kb:npc-life-changed'));return {ok:true};}finally{busy=false;}}
window.KB_V2_NPC_LIFE=Object.freeze({getState,decide,getRelationships,meetAgain});
})();
