/* V2-03.2J – Mara as a chapter in the existing story; unchanged event persistence. */
(function(){
'use strict';
const model=window.KB_V2_EVENTS,host=document.getElementById('livingStoryChapters'),section=document.getElementById('livingStory'),story=document.querySelector('.story');
if(!model||!host||!section||!story)return;
const panel=document.createElement('article');panel.className='narrative-chapter';panel.hidden=true;panel.setAttribute('aria-label','Mara och kvarnens krav');host.appendChild(panel);
function node(tag,text,cls){const n=document.createElement(tag);n.textContent=text;if(cls)n.className=cls;return n;}
function visible(){const tab=document.getElementById('storyTab');return !!tab?.classList.contains('active')&&!story.hidden;}
function render(){
 const s=model.getState(),show=visible()&&s.ok&&s.available;
 panel.hidden=!show;panel.replaceChildren();
 if(!show){section.hidden=!Array.from(host.children).some(x=>!x.hidden);return;}
 panel.append(node('div','KELDRA · DAG '+s.eventDay,'narrative-kicker'),node('h4',s.title));
 panel.append(node('p','Händelsen började dag '+s.eventDay+'. Nu är det dag '+s.currentDay+'.','narrative-time'));
 panel.append(node('p',s.text,'narrative-prose'),node('p',s.note,'narrative-context'));
 if(s.decision){
  const o=s.options[s.decision.choice];
  panel.append(node('div','DITT SVAR · DAG '+s.decision.discoveredDay,'narrative-kicker'),node('p',o.label,'narrative-answer'),node('p',o.text,'narrative-prose'));
 }else{
  panel.append(node('p','Vad svarar du?','narrative-prompt'));
  for(const choice of ['act','decline']){
   const b=node('button',s.options[choice].label,'narrative-choice');b.type='button';
   b.addEventListener('click',()=>{const now=model.getState();if(!now.ok||!now.available||now.id!==s.id||now.variant!==s.variant||now.decision){render();return;}const result=model.decide(choice);if(!result.ok)window.alert(result.error);render();});panel.appendChild(b);
  }
 }
 section.hidden=false;
}
for(const event of ['kb:day-advanced','kb:v2-character-changed','kb:v2-event-decided','kb:v2-npc-decided'])window.addEventListener(event,render);
for(const id of ['storyTab','journalTab','mapTab','characterTab'])document.getElementById(id)?.addEventListener('click',()=>queueMicrotask(render));
document.getElementById('choices')?.addEventListener('click',e=>{if(e.target.closest('button'))queueMicrotask(render);});
render();
})();
