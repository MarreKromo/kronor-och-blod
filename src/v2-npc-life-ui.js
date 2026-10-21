/* V2-04R: one compact encounter, repeat visits and readable relationship history. */
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
 panel.append(el('p',p.name+' · '+p.role,'npc-life-role'),el('p',p.routine,'narrative-prose'),el('p','Just nu: '+p.need,'narrative-context'));
 panel.append(el('p',p.standing+' · Förtroende '+(p.trust>=0?'+':'')+p.trust+' · '+p.history.length+' möten','npc-life-memory'));
 if(p.last){panel.append(el('p',p.actions[p.last.choice].reply,'narrative-prose'));}
 if(p.canMeet){
  panel.append(el('p',p.history.length?'Ni möts igen. Hur bemöter du '+p.name+' idag?':'Hur vill du bemöta '+p.name+'?','narrative-prompt'));
  for(const [choice,a] of Object.entries(p.actions)){const b=el('button',a.label,'narrative-choice');b.type='button';b.addEventListener('click',()=>{
   b.disabled=true;const r=p.history.length?model.meetAgain(p.id,choice):model.decide(p.id,choice);
   feedback=r.ok?'Mötet är sparat. '+a.reply:r.error;render();
  });panel.append(b);}
 }else{panel.append(el('p','Ni har redan talats vid idag. Återkom en annan dag.','npc-life-wait'));}
 if(p.history.length){
  const details=document.createElement('details');details.className='npc-life-history';
  const summary=el('summary','Tidigare möten ('+p.history.length+')');details.append(summary);
  const list=el('ol','','npc-life-history-list');
  for(const h of p.history.slice(-6).reverse()){list.append(el('li','Dag '+h.day+' · '+(h.choice==='help'?'Du hjälpte till':'Du lyssnade')));}
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
