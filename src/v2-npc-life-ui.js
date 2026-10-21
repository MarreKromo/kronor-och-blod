/* V2-04 KOMPLETT: compact, location-aware living people in the story tab. */
(function(){'use strict';
const model=window.KB_V2_NPC_LIFE,host=document.getElementById('livingStoryChapters'),section=document.getElementById('livingStory'),story=document.querySelector('.story');if(!model||!host||!section||!story)return;
const panel=document.createElement('article');panel.className='narrative-chapter npc-life';panel.hidden=true;panel.setAttribute('aria-label','Människornas vardag');host.append(panel);
function el(tag,text,cls){const n=document.createElement(tag);n.textContent=text;if(cls)n.className=cls;return n;}
let selected=null,feedback='';
function render(){const visible=document.getElementById('storyTab')?.classList.contains('active')&&!story.hidden;const s=model.getState();panel.replaceChildren();panel.hidden=!visible||!s.ok;if(panel.hidden){section.hidden=!Array.from(host.children).some(n=>!n.hidden);return;}const people=s.people.filter(p=>p.available);if(!people.length){panel.hidden=true;section.hidden=!Array.from(host.children).some(n=>!n.hidden);return;}if(!people.some(p=>p.id===selected))selected=people[0].id;
 panel.append(el('div','DORNMARK · DAG '+s.day,'narrative-kicker'),el('h4','Människorna omkring dig'));
 const tabs=el('div','','npc-life-tabs');for(const p of people){const b=el('button',p.name,'npc-life-tab'+(p.id===selected?' active':''));b.type='button';b.setAttribute('aria-pressed',String(p.id===selected));b.addEventListener('click',()=>{selected=p.id;feedback='';render();});tabs.append(b);}panel.append(tabs);
 const p=people.find(p=>p.id===selected);panel.append(el('p',p.name+' · '+p.role,'npc-life-role'),el('p',p.routine,'narrative-prose'),el('p','Just nu: '+p.need,'narrative-context'));
 if(p.memory){panel.append(el('p',p.actions[p.memory.choice].reply,'narrative-prose'),el('p','Minns ert möte från dag '+p.memory.day+' · Förtroende +'+p.trust,'npc-life-memory'));}else{panel.append(el('p','Hur vill du bemöta '+p.name+'?','narrative-prompt'));for(const [choice,a] of Object.entries(p.actions)){const b=el('button',a.label,'narrative-choice');b.type='button';b.addEventListener('click',()=>{b.disabled=true;const r=model.decide(p.id,choice);feedback=r.ok?'Mötet är sparat. '+a.reply:r.error;render();});panel.append(b);}}
 if(feedback){const msg=el('p',feedback,'npc-life-feedback');msg.setAttribute('role','status');panel.append(msg);}section.hidden=false;
}
for(const ev of ['kb:day-advanced','kb:travel-changed','kb:v2-character-changed','kb:npc-life-changed'])window.addEventListener(ev,()=>queueMicrotask(()=>{if(ev==='kb:v2-character-changed'){selected=null;feedback='';}render();}));for(const id of ['storyTab','journalTab','mapTab','characterTab'])document.getElementById(id)?.addEventListener('click',()=>queueMicrotask(render));render();
})();
