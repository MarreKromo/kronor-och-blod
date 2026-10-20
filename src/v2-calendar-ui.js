/* V2-03.2F.1 – prominent calendar in story view only. */
(function(){
'use strict';
const calendar=window.KB_V2_CALENDAR;
const box=document.getElementById('calendarPanel');
const label=document.getElementById('calendarLabel');
const season=document.getElementById('calendarSeason');
const status=document.getElementById('calendarStatus');
const button=document.getElementById('advanceDayButton');
const story=document.querySelector('.story');
const character=document.getElementById('characterPanel');
if(!box||!label||!season||!status||!button||!story)return;
function visibility(){
  const storySelected=document.getElementById('storyTab')?.classList.contains('active');
  box.hidden=!storySelected || story.hidden || !!(character&&!character.hidden);
}
function render(){
 const state=calendar?.getState()||{ok:false,error:'Kalendern kunde inte laddas.'};
 if(!state.ok){label.textContent='Kalendern väntar';season.textContent='';status.textContent=state.error;button.disabled=true;visibility();return;}
 label.textContent=state.label;
 season.textContent=state.season+' · Dag '+state.dayNumber;
 status.textContent='Tiden tillhör din aktiva karaktär.';
 button.disabled=state.elapsedDays>=365000;
 visibility();
}
button.addEventListener('click',()=>{
 const current=calendar?.getState();if(!current?.ok){render();return;}
 if(!window.confirm('Fortsätta till nästa dag för denna karaktär? Berättelseval ändras inte.'))return;
 const result=calendar.advanceDay();render();
 if(!result.ok)status.textContent=result.error;
});
// The story and character controllers update tab classes in their own click handlers.
// Registering after them makes visibility follow their final tab state.
['storyTab','journalTab','mapTab','characterTab'].forEach(id=>{
 document.getElementById(id)?.addEventListener('click',visibility);
});
window.addEventListener('kb:v2-character-changed',render);
window.addEventListener('kb:day-advanced',render);
render();
})();
