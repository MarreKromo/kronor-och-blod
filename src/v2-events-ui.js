/* V2-03.2H – render choice and persistent consequence inside story view. */
(function(){
'use strict';
const model=window.KB_V2_EVENTS,story=document.querySelector('.story');if(!story||!model)return;
const panel=document.createElement('aside');panel.className='timed-event';panel.setAttribute('aria-label','Tidens konsekvenser');panel.hidden=true;story.appendChild(panel);
function node(tag,text,cls){const n=document.createElement(tag);n.textContent=text;if(cls)n.className=cls;return n;}
function render(){
 const state=model.getState(),selected=document.getElementById('storyTab')?.classList.contains('active');
 panel.hidden=!selected||story.hidden||!state.ok||!state.available;
 panel.replaceChildren();if(!state.ok||!state.available)return;
 panel.append(node('div','VÄRLDEN REAGERAR','timed-event-kicker'),node('h3',state.title));
 panel.append(node('p','Händelsen inträffade dag '+state.eventDay+'. Du befinner dig på dag '+state.currentDay+'.','timed-event-date'));
 panel.append(node('p',state.text),node('p',state.note,'timed-event-note'));
 if(state.decision){
  const o=state.options[state.decision.choice];
  panel.append(node('div','DITT BESLUT · DAG '+state.decision.discoveredDay,'timed-event-kicker'),node('p',o.label,'timed-event-decision'),node('p',o.text),node('p','Följd: '+o.flag.replaceAll('_',' ')+'. Beslutet är sparat för denna karaktär.','timed-event-note'));
 }else{
  panel.append(node('p','Vad gör du?'));
  for(const choice of ['act','decline']){
   const b=node('button',state.options[choice].label,'timed-event-choice');b.type='button';
   b.addEventListener('click',()=>{
    const now=model.getState();if(!now.ok||!now.available||now.id!==state.id||now.variant!==state.variant||now.decision){render();return;}
    const result=model.decide(choice);if(!result.ok){window.alert(result.error);render();return;}render();
   });panel.append(b);
  }
 }
}
window.addEventListener('kb:day-advanced',render);
window.addEventListener('kb:v2-character-changed',render);
window.addEventListener('kb:v2-event-decided',render);
['storyTab','journalTab','mapTab','characterTab'].forEach(id=>document.getElementById(id)?.addEventListener('click',render));
document.getElementById('choices')?.addEventListener('click',e=>{if(e.target.closest('button'))queueMicrotask(render);});
render();
})();
