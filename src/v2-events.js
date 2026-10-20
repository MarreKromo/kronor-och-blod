/* V2-03.2G: read-only, character-scoped timed encounter adapter.
   Reuses branching/ownership principles of legacy encounter.js and investigation.js.
   No legacy keys, migrations, writes or automatic story resets. */
(function(){
'use strict';
const story=window.KB_V2_STORY_BINDING,calendar=window.KB_V2_CALENDAR;
function getState(){
 const s=story?.read(),c=calendar?.getState();
 if(!s?.ok)return {ok:false,error:s?.error||'Berättelsen kunde inte läsas.'};
 if(!c?.ok)return {ok:false,error:c?.error||'Kalendern kunde inte läsas.'};
 if(s.id!==c.id)return {ok:false,error:'Berättelsen och kalendern tillhör olika karaktärer.'};
 const h=s.value.history;
 const helped=h.includes('Hjälp Mara att skydda utsädet');
 const wentMill=h.includes('Sök upp kvarnen i Dorneth');
 const left=h.includes('Gå vidare med ditt eget liv');
 const tax=h.includes('Fråga om skatterna vid Varnhold');
 if(!h.length)return {ok:true,available:false,message:'Ditt första val i Keldra avgör vilka följder som kan komma.'};
 if(c.elapsedDays<2)return {ok:true,available:false,message:'Det har ännu inte gått tillräckligt många dagar. En följd kan visa sig från dag 3.'};
 const variant=helped?'help':wentMill?'mill':tax?'tax':left?'leave':'other';
 const routes={
 help:{title:'Ett bud från Mara',text:'På tredje dagen söker Mara upp dig. Bäraren har återvänt utan att ta utsädet, men kvarnen kräver ett besked före nästa marknad. ”Du stod vid min sida”, säger hon. ”Vill du följa med när jag talar med Edda?”',note:'Du hjälpte Mara. Hon minns ditt stöd, men skulden är inte löst.'},
 mill:{title:'Kvarnens besked',text:'En bärare från Dorneth känner igen dig från kvarnen. Edda har börjat räkna om byns skulder. ”Säg åt dem att komma och tala”, säger han. ”Annars blir det värre.”',note:'Du sökte svar vid kvarnen. Du får information tidigare än andra.'},
 tax:{title:'Rykten vid vägskälet',text:'Två resande talar om att fogdens skrivare kan komma till Keldra. Ingen vet ännu om det gäller skatten eller kvarnens skulder.',note:'Du sökte svar om pålagorna. Ryktet är fortfarande obekräftat.'},
 leave:{title:'Säcken som försvann',text:'När du passerar gården märker du att Maras säck inte längre står vid grinden. Någon säger att kvarnens folk hämtade den under gårdagen. Du vet inte vad som är sant.',note:'Du valde att gå vidare. Händelserna i byn fortsätter ändå.'},
 other:{title:'Oro i Keldra',text:'Vid brunnen viskar folk om kvarnens krav. Ingen verkar säker på vad som ska hända med utsädet.',note:'Byborna fortsätter sina liv medan dagarna går.'}
 };
 return {ok:true,available:true,day:c.dayNumber,variant,...routes[variant]};
}
window.KB_V2_EVENTS=Object.freeze({getState});
})();
