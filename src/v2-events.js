/* V2-03.2H – V2 event extension; legacy encounter/investigation branching and owner checks adapted. */
(function(){
'use strict';
const story=window.KB_V2_STORY_BINDING,calendar=window.KB_V2_CALENDAR,contract=window.KB_V2_DATA_CONTRACT;
const routes={
 help:{title:'Ett bud från Mara',text:'Mara har fått ett nytt besked från kvarnen. Bäraren tog inte utsädet, men Edda kräver ett svar. ”Du stod vid min sida”, säger Mara. ”Kan du hjälpa mig igen?”',note:'Mara minns att du skyddade utsädet.'},
 mill:{title:'Kvarnens besked',text:'En bärare från Dorneth känner igen dig. Edda räknar om skulderna och vill att byborna kommer till kvarnen för att tala.',note:'Du har tidigare sökt svar vid kvarnen.'},
 tax:{title:'Rykten vid vägskälet',text:'Två resande talar om fogdens skrivare. Ingen vet om besöket gäller skatten eller kvarnens skulder.',note:'Du har tidigare frågat om pålagorna.'},
 leave:{title:'Säcken som försvann',text:'Maras säck står inte längre vid grinden. Någon säger att kvarnens folk hämtade den. Ingen vet säkert.',note:'Du valde att lämna gården, men byns liv fortsätter.'},
 other:{title:'Oro i Keldra',text:'Vid brunnen viskar folk om kvarnens krav. Ingen verkar säker på vad som ska hända med utsädet.',note:'Världen fortsätter röra sig.'}
};
const outcomes={
 help:{act:{label:'Lova Mara att följa med till Edda',text:'Mara tackar dig. Ni har ännu inte förhandlat, men hon vet att hon kan räkna med dig.',flag:'mara_stod_utlovat'},decline:{label:'Säg att du inte kan hjälpa henne mer',text:'Mara nickar utan att säga mycket. Hon måste söka stöd någon annanstans.',flag:'mara_avbojd'}},
 mill:{act:{label:'Erbjud dig att framföra beskedet',text:'Du lovar att föra kvarnens besked vidare till Keldra.',flag:'kvarn_bud_utlovat'},decline:{label:'Låt bäraren hitta någon annan',text:'Du tar inte på dig budet. Kvarnens krav står ändå kvar.',flag:'kvarn_bud_avbojt'}},
 tax:{act:{label:'Försök ta reda på vem som sprider ryktet',text:'Du börjar söka en säkrare källa. Än så länge är ryktet obekräftat.',flag:'fogde_rykte_undersoks'},decline:{label:'Låt ryktet bero',text:'Du väljer att inte jaga ännu ett obekräftat rykte.',flag:'fogde_rykte_lamnat'}},
 leave:{act:{label:'Fråga byborna vad som hände med säcken',text:'Du börjar ställa frågor, men ingen ger dig ett säkert svar.',flag:'mara_sack_undersoks'},decline:{label:'Fortsätt utan att lägga dig i',text:'Du går vidare. Vad som hänt med säcken är fortfarande oklart.',flag:'mara_sack_lamnad'}},
 other:{act:{label:'Lyssna efter mer information',text:'Du hör fler röster, men inget säkert besked.',flag:'keldra_lyssnar'},decline:{label:'Gå vidare',text:'Du låter byborna tala vidare.',flag:'keldra_avstar'}}
};
function key(id){return contract.characterKey(id)+'.event.keldra-seed-v1';}
function readDecision(id,variant){
 try{
  const raw=localStorage.getItem(key(id));if(raw===null)return {ok:true,value:null};
  const d=JSON.parse(raw);
  if(!d||Object.keys(d).sort().join(',')!=='choice,discoveredDay,eventDay,ownerId,variant,version'||d.version!==1||d.ownerId!==id||!Object.hasOwn(routes,d.variant)||!['act','decline'].includes(d.choice)||!Number.isSafeInteger(d.discoveredDay)||d.discoveredDay<3||d.discoveredDay>365001||d.eventDay!==3)return {ok:false,error:'Händelsens sparning är ogiltig. Den har inte ändrats.'};
  if(d.variant!==variant)return {ok:false,error:'Ett tidigare händelseval tillhör en annan berättelsegren. Sparningen skyddas.'};
  return {ok:true,value:d};
 }catch(_){return {ok:false,error:'Händelsesparningen kunde inte läsas. Ingen data ändrades.'};}
}
function getState(){
 const s=story?.read(),c=calendar?.getState();
 if(!s?.ok)return {ok:false,error:s?.error||'Berättelsen kunde inte läsas.'};
 if(!c?.ok)return {ok:false,error:c?.error||'Kalendern kunde inte läsas.'};
 if(s.id!==c.id)return {ok:false,error:'Berättelse och kalender tillhör olika karaktärer.'};
 const h=s.value.history;
 if(!h.length||c.dayNumber<3)return {ok:true,available:false};
 const variant=h.includes('Hjälp Mara att skydda utsädet')?'help':h.includes('Sök upp kvarnen i Dorneth')?'mill':h.includes('Fråga om skatterna vid Varnhold')?'tax':h.includes('Gå vidare med ditt eget liv')?'leave':'other';
 const decision=readDecision(s.id,variant);if(!decision.ok)return decision;
 return {ok:true,available:true,id:s.id,variant,eventDay:3,currentDay:c.dayNumber,...routes[variant],options:outcomes[variant],decision:decision.value};
}
function decide(choice){
 if(!['act','decline'].includes(choice))return {ok:false,error:'Ogiltigt val.'};
 const state=getState();if(!state.ok||!state.available)return {ok:false,error:state.error||'Händelsen är inte tillgänglig.'};
 if(state.decision)return {ok:false,error:'Händelsen har redan ett sparat beslut.'};
 const record=JSON.stringify({version:1,ownerId:state.id,variant:state.variant,eventDay:3,discoveredDay:state.currentDay,choice});
 try{
  if(localStorage.getItem(key(state.id))!==null)return {ok:false,error:'Ett beslut finns redan. Inget har skrivits över.'};
  const again=getState();if(!again.ok||!again.available||again.id!==state.id||again.variant!==state.variant||again.currentDay!==state.currentDay||again.decision)return {ok:false,error:'Händelsen ändrades före sparning.'};
  localStorage.setItem(key(state.id),record);
  if(localStorage.getItem(key(state.id))!==record)return {ok:false,error:'Beslutet kunde inte verifieras. Ingen automatisk återställning.'};
  const verified=getState();if(!verified.ok||verified.decision?.choice!==choice)return {ok:false,error:'Beslutet kunde inte läsas tillbaka.'};
  window.dispatchEvent(new Event('kb:v2-event-decided'));
  return {ok:true};
 }catch(_){return {ok:false,error:'Händelsebeslutet kunde inte sparas. Befintliga data har inte raderats.'};}
}
window.KB_V2_EVENTS=Object.freeze({getState,decide});
})();
