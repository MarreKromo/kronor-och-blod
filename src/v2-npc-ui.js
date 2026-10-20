/* V2-03.2I: one story-only NPC meeting after the Mara promise. */
(function(){
'use strict';
const model=window.KB_V2_NPC,story=document.querySelector('.story');if(!model||!story)return;
const panel=document.createElement('aside');panel.className='timed-event npc-meeting';panel.hidden=true;panel.setAttribute('aria-label','Möte med Edda');story.appendChild(panel);
function el(tag,text,cls){const n=document.createElement(tag);n.textContent=text;if(cls)n.className=cls;return n;}
function render(){
 const state=model.getState(),selected=document.getElementById('storyTab')?.classList.contains('active');
 panel.hidden=!selected||story.hidden||!state.ok||!state.available;
 panel.replaceChildren();if(!state.ok||!state.available)return;
 panel.append(el('div','ETT MÖTE I DORNETH','timed-event-kicker'),el('h3','Inför Edda vid kvarnen'));
 panel.append(el('p','Dag '+state.currentDay+' · Mara följer dig till Edda. Hon har inte glömt ditt löfte. Kvarnens skuld ligger kvar på bordet, och Edda väntar på ditt svar.'));
 if(state.decision){
  const o=state.choices[state.decision.choice];
  panel.append(el('div','DITT BESLUT · DAG '+state.decision.day,'timed-event-kicker'),el('p',o.label,'timed-event-decision'),el('p',o.text),el('p','Bestående följd: '+o.flag.replaceAll('_',' ')+'.','timed-event-note'));
 }else{
  panel.append(el('p','Hur svarar du Edda?'));
  for(const choice of ['negotiate','refuse']){
   const b=el('button',state.choices[choice].label,'timed-event-choice');b.type='button';
   b.addEventListener('click',()=>{
    const now=model.getState();if(!now.ok||!now.available||now.id!==state.id||now.decision){render();return;}
    const result=model.decide(choice);if(!result.ok)window.alert(result.error);render();
   });panel.append(b);
  }
 }
}
for(const name of ['kb:day-advanced','kb:v2-character-changed','kb:v2-event-decided','kb:v2-npc-decided'])window.addEventListener(name,render);
for(const id of ['storyTab','journalTab','mapTab','characterTab'])document.getElementById(id)?.addEventListener('click',render);
render();
})();
