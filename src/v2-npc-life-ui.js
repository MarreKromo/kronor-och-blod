/* V2-04S: evolving NPC dialogue, earned advice, compact mobile encounters. */
(function(){'use strict';
const model=window.KB_V2_NPC_LIFE,host=document.getElementById('livingStoryChapters'),section=document.getElementById('livingStory'),story=document.querySelector('.story');
if(!model||!host||!section||!story)return;
const panel=document.createElement('article');panel.className='narrative-chapter npc-life';panel.hidden=true;panel.setAttribute('aria-label','Människornas vardag');host.append(panel);
function el(tag,text,cls){const n=document.createElement(tag);n.textContent=text;if(cls)n.className=cls;return n;}
let selected=null,feedback='';
function render(){
 const visible=document.getElementById('storyTab')?.classList.contains('active')&&!story.hidden;
 const s=model.getRelationships();panel.replaceChildren();panel.hidden=!visible||!s.ok;
 if(!s.ok){if(visible){panel.hidden=false;panel.append(el('p',s.error||'Invånarnas sparning kunde inte läsas.','npc-life-feedback'));}section.hidden=!Array.from(host.children).some(n=>!n.hidden);return;}
 if(panel.hidden){section.hidden=!Array.from(host.children).some(n=>!n.hidden);return;}
 const people=s.people.filter(p=>p.available);
 if(!people.length){panel.hidden=true;section.hidden=!Array.from(host.children).some(n=>!n.hidden);return;}
 if(!people.some(p=>p.id===selected)){selected=people[0].id;feedback='';}
 panel.append(el('div','DORNMARK · DAG '+s.day,'narrative-kicker'),el('h4','Människorna omkring dig'));
 const tabs=el('div','','npc-life-tabs');
 for(const p of people){const b=el('button',p.name,'npc-life-tab'+(p.id===selected?' active':''));b.type='button';b.setAttribute('aria-pressed',String(p.id===selected));b.addEventListener('click',()=>{selected=p.id;feedback='';render();});tabs.append(b);}
 panel.append(tabs);
 const p=people.find(p=>p.id===selected);
 panel.append(el('p',p.name+' · '+p.role,'npc-life-role'));
 const status=el('p',p.standing+' · Förtroende +'+p.trust+' · '+p.history.length+' möten','npc-life-memory');panel.append(status);
 const current=document.createElement('details');current.className='npc-life-today';current.open=!p.last;
 current.append(el('summary','Dagens vardag och bekymmer'));
 current.append(el('p',p.routine,'narrative-prose'),el('p','Just nu: '+p.need,'narrative-context'));
 panel.append(current);
 if(p.last){
  const trustBefore=p.trust-(p.last.choice==='help'?2:p.last.choice==='listen'?1:0);
  const reply=p.last.first?p.actions[p.last.choice].reply:model.dialogue(p.id,p.last.choice,p.last.day,trustBefore,p.history.length);
  panel.append(el('p',reply,'npc-life-dialogue'));
 }
 if(p.canMeet){
  panel.append(el('p',p.history.length?'Ni möts igen. Vad vill du göra idag?':'Hur vill du bemöta '+p.name+'?','narrative-prompt'));
  const choices=[...Object.entries(p.actions)];
  if(p.history.length&&p.adviceUnlocked)choices.push(['advice',model.ADVICE[p.id]]);
  for(const [choice,a] of choices){const b=el('button',a.label,'narrative-choice');b.type='button';b.addEventListener('click',()=>{
   b.disabled=true;const r=p.history.length?model.meetAgain(p.id,choice):model.decide(p.id,choice);
   feedback=r.ok?'Mötet sparat.':r.error;render();
  });panel.append(b);}
  if(p.history.length&&!p.adviceUnlocked)panel.append(el('p','Lär känna '+p.name+' bättre för att få höra mer om '+(p.id==='mara'?'skörden':p.id==='edda'?'handeln':'hantverket')+'.','npc-life-hint'));
 }else panel.append(el('p','Ni har redan talats vid idag. Återkom en annan dag.','npc-life-wait'));
 if(p.history.length){
  const details=document.createElement('details');details.className='npc-life-history';
  details.append(el('summary','Tidigare möten ('+p.history.length+')'));
  const list=el('ol','','npc-life-history-list');
  for(const h of p.history.slice(-6).reverse()){
   const action=h.choice==='help'?'Du hjälpte till':h.choice==='listen'?'Du lyssnade':'Du fick ett förtroende';
   list.append(el('li','Dag '+h.day+' · '+action));
  }
  if(p.history.length>6)list.append(el('li','Äldre möten finns kvar i sparningen.'));
  details.append(list);panel.append(details);
 }
 if(feedback){const msg=el('p',feedback,'npc-life-feedback');msg.setAttribute('role','status');panel.append(msg);}
 section.hidden=false;
}
for(const ev of ['kb:day-advanced','kb:travel-changed','kb:v2-character-changed','kb:npc-life-changed'])window.addEventListener(ev,()=>queueMicrotask(()=>{if(ev==='kb:v2-character-changed'){selected=null;feedback='';}render();}));
for(const id of ['storyTab','journalTab','mapTab','characterTab'])document.getElementById(id)?.addEventListener('click',()=>queueMicrotask(render));
render();
})();
