/* V2-03.2G: time-gated encounter displayed in the existing story, not a second story engine. */
(function(){
'use strict';
const model=window.KB_V2_EVENTS,story=document.querySelector('.story');
if(!story||!model)return;
const panel=document.createElement('aside');panel.className='timed-event';panel.setAttribute('aria-label','Tidens konsekvenser');panel.hidden=true;
const kicker=document.createElement('div');kicker.className='timed-event-kicker';kicker.textContent='VÄRLDEN REAGERAR';
const title=document.createElement('h3'),body=document.createElement('p'),note=document.createElement('p');note.className='timed-event-note';
panel.append(kicker,title,body,note);story.appendChild(panel);
function render(){
 const state=model.getState();
 const selected=document.getElementById('storyTab')?.classList.contains('active');
 panel.hidden=!selected||story.hidden||!state.ok||!state.available;
 if(!state.ok||!state.available)return;
 title.textContent=state.title;body.textContent=state.text;note.textContent=state.note;
}
window.addEventListener('kb:day-advanced',render);
window.addEventListener('kb:v2-character-changed',render);
['storyTab','journalTab','mapTab','characterTab'].forEach(id=>document.getElementById(id)?.addEventListener('click',render));
// Story buttons are created dynamically; update after their click handlers have saved a choice.
document.getElementById('choices')?.addEventListener('click',e=>{if(e.target.closest('button'))queueMicrotask(render);});
render();
})();
