/* V2-03.2L – short read-only conversational exchange before an existing decision. */
(function(){
'use strict';
const model=window.KB_V2_NPC,host=document.getElementById('livingStoryChapters'),section=document.getElementById('livingStory'),story=document.querySelector('.story');
if(!model||!host||!section||!story)return;
const panel=document.createElement('article');panel.className='narrative-chapter narrative-edda';panel.hidden=true;panel.setAttribute('aria-label','Samtal med Edda');host.appendChild(panel);
function node(tag,text,cls){const n=document.createElement(tag);n.textContent=text;if(cls)n.className=cls;return n;}
function ask(label,reply,go){const b=node('button',label,'narrative-choice');b.type='button';b.addEventListener('click',()=>{go();});panel.append(b);}
let conversation=null;
function render(){
 const s=model.getState(),selected=document.getElementById('storyTab')?.classList.contains('active'),show=!!selected&&!story.hidden&&s.ok&&s.available;
 panel.hidden=!show;panel.replaceChildren();
 if(!show){section.hidden=!Array.from(host.children).some(x=>!x.hidden);return;}
 panel.append(node('div','DORNETH · KVARNEN','narrative-kicker'),node('h4','Inför Edda'));
 panel.append(node('p','Mara står bredvid dig. Edda lägger undan sin räknebok och ser upp. ”Du lovade att komma. Vad har du att säga om skulden?”','narrative-prose'));
 if(s.decision){const o=s.choices[s.decision.choice];panel.append(node('div','DITT SVAR · DAG '+s.decision.day,'narrative-kicker'),node('p',o.label,'narrative-answer'),node('p',o.text,'narrative-prose'));}
 else{
  const phase=conversation?.id===s.id?conversation.phase:0;
  if(!phase){
   panel.append(node('p','Du kan fråga Edda innan du tar ställning.','narrative-prompt'));
   ask('Fråga varför kvarnen kräver betalning','',()=>{conversation={id:s.id,phase:1};render();});
   ask('Fråga om Mara kan få mer tid','',()=>{conversation={id:s.id,phase:2};render();});
  }else{
   const reply=phase===1?'”Kvarnen kan inte leva på löften. Jag har egna skulder att betala”, säger Edda.':'”Mer tid betyder att någon annan får vänta på sina pengar”, svarar Edda.';
   panel.append(node('p',reply,'narrative-prose'),node('p','Hur svarar du Edda?','narrative-prompt'));
   for(const choice of ['negotiate','refuse']){
    const b=node('button',s.choices[choice].label,'narrative-choice');b.type='button';
    b.addEventListener('click',()=>{const now=model.getState();if(!now.ok||!now.available||now.id!==s.id||now.decision){render();return;}const result=model.decide(choice);if(!result.ok)window.alert(result.error);render();});panel.append(b);
   }
   ask('Ställ en annan fråga','',()=>{conversation={id:s.id,phase:0};render();});
  }
 }
 section.hidden=false;
}
for(const event of ['kb:day-advanced','kb:v2-character-changed','kb:v2-event-decided','kb:v2-npc-decided'])window.addEventListener(event,render);
for(const id of ['storyTab','journalTab','mapTab','characterTab'])document.getElementById(id)?.addEventListener('click',()=>queueMicrotask(render));
render();
})();
