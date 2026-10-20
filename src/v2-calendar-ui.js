/* V2-03.2F – calendar panel for the existing story UI. */
(function(){
'use strict';
const calendar=window.KB_V2_CALENDAR;
const box=document.getElementById('calendarPanel');
const label=document.getElementById('calendarLabel');
const season=document.getElementById('calendarSeason');
const status=document.getElementById('calendarStatus');
const button=document.getElementById('advanceDayButton');
if(!box||!label||!season||!status||!button)return;
function render(){
 const state=calendar?.getState()||{ok:false,error:'Kalendern kunde inte laddas.'};
 if(!state.ok){label.textContent='Kalendern väntar';season.textContent='';status.textContent=state.error;button.disabled=true;return;}
 label.textContent=state.label;season.textContent='Dag '+state.dayNumber+' · '+state.season;
 status.textContent='Tid för '+(state.id?'aktiv karaktär':'spelvärlden')+'. Dagen går endast vidare när du väljer det.';
 button.disabled=state.elapsedDays>=365000;
}
button.addEventListener('click',()=>{
 const current=calendar?.getState();if(!current?.ok){render();return;}
 if(!window.confirm('Låt en dag passera för denna karaktär? Berättelseval ändras inte.'))return;
 const result=calendar.advanceDay();render();
 if(!result.ok)status.textContent=result.error;
});
window.addEventListener('kb:v2-character-changed',render);
window.addEventListener('kb:day-advanced',render);
render();
})();
