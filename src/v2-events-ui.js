/* V2-03.2L – short read-only conversational exchange before an existing decision. */
(function(){
'use strict';
const model=window.KB_V2_EVENTS,host=document.getElementById('livingStoryChapters'),section=document.getElementById('livingStory'),story=document.querySelector('.story');
if(!model||!host||!section||!story)return;
const panel=document.createElement('article');panel.className='narrative-chapter';panel.hidden=true;panel.setAttribute('aria-label','Mara och kvarnens krav');host.appendChild(panel);
function node(tag,text,cls){const n=document.createElement(tag);n.textContent=text;if(cls)n.className=cls;return n;}
function ask(label,reply,go){const b=node('button',label,'narrative-choice');b.type='button';b.addEventListener('click',()=>{go();});panel.append(b);}
let conversation=null;
function visible(){return !!document.getElementById('storyTab')?.classList.contains('active')&&!story.hidden;}
function render(){
 const s=model.getState(),show=visible()&&s.ok&&s.available;
 panel.hidden=!show;panel.replaceChildren();
 if(!show){section.hidden=!Array.from(host.children).some(x=>!x.hidden);return;}
 panel.append(node('div','KELDRA · DAG '+s.eventDay,'narrative-kicker'),node('h4',s.title));
 panel.append(node('p','Händelsen började dag '+s.eventDay+'. Nu är det dag '+s.currentDay+'.','narrative-time'));
 panel.append(node('p',s.text,'narrative-prose'),node('p',s.note,'narrative-context'));
 if(s.decision){const o=s.options[s.decision.choice];panel.append(node('div','DITT SVAR · DAG '+s.decision.discoveredDay,'narrative-kicker'),node('p',o.label,'narrative-answer'),node('p',o.text,'narrative-prose'));}
 else {
  const key=s.id+':'+s.variant;
  const phase=conversation?.key===key?conversation.phase:0;
  if(!phase){
   panel.append(node('p','Du kan fråga Mara innan du bestämmer dig.','narrative-prompt'));
   ask('Fråga Mara vad hon behöver','”Jag behöver någon som står kvar när Edda säger nej”, svarar Mara.',()=>{conversation={key,phase:1};render();});
   ask('Fråga vad som händer om du avstår','”Då får jag försöka själv. Men utsädet räcker knappt redan nu”, säger Mara.',()=>{conversation={key,phase:2};render();});
  }else{
   const reply=phase===1?'”Jag behöver någon som står kvar när Edda säger nej”, svarar Mara.':'”Då får jag försöka själv. Men utsädet räcker knappt redan nu”, säger Mara.';
   panel.append(node('p',reply,'narrative-prose'),node('p','Vad svarar du?','narrative-prompt'));
   for(const choice of ['act','decline']){
    const b=node('button',s.options[choice].label,'narrative-choice');b.type='button';
    b.addEventListener('click',()=>{const now=model.getState();if(!now.ok||!now.available||now.id!==s.id||now.variant!==s.variant||now.decision){render();return;}const result=model.decide(choice);if(!result.ok)window.alert(result.error);render();});panel.append(b);
   }
   ask('Ställ en annan fråga','',()=>{conversation={key,phase:0};render();});
  }
 }
 section.hidden=false;
}
for(const event of ['kb:day-advanced','kb:v2-character-changed','kb:v2-event-decided','kb:v2-npc-decided'])window.addEventListener(event,render);
for(const id of ['storyTab','journalTab','mapTab','characterTab'])document.getElementById(id)?.addEventListener('click',()=>queueMicrotask(render));
document.getElementById('choices')?.addEventListener('click',e=>{if(e.target.closest('button'))queueMicrotask(render);});
render();
})();
