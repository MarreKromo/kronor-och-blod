/* V2-03.2K – presentation-only scene focus and journal history.
   No writes, migrations or changes to existing story/event/NPC models. */
(function(){
'use strict';
const story=document.querySelector('.story');
const section=document.getElementById('livingStory');
const host=document.getElementById('livingStoryChapters');
const heading=section?.querySelector('.living-story-heading');
const journal=document.createElement('section');
if(!story||!section||!host||!heading)return;
journal.id='v2EventHistory';journal.className='v2-event-history';journal.hidden=true;
journal.setAttribute('aria-label','Tidigare möten och beslut');
document.getElementById('choices')?.after(journal);
const $=id=>document.getElementById(id);
function el(tag,value,cls){const n=document.createElement(tag);n.textContent=value;if(cls)n.className=cls;return n;}
function safeState(api){try{return api?.getState()||{ok:false};}catch(_){return {ok:false};}}
function addEntry(title,day,label,result){
 const entry=el('article','','v2-history-entry');
 entry.append(el('div','DAG '+day,'narrative-kicker'),el('h4',title),el('p',label,'v2-history-choice'),el('p',result,'v2-history-result'));
 journal.append(entry);
}
function render(){
 const storyTab=$('storyTab')?.classList.contains('active');
 const journalTab=$('journalTab')?.classList.contains('active');
 const visible=!story.hidden;
 const mara=safeState(window.KB_V2_EVENTS),edda=safeState(window.KB_V2_NPC);
 const maraPanel=host.querySelector('.narrative-chapter:not(.narrative-edda)');
 const eddaPanel=host.querySelector('.narrative-edda');
 // A pending meeting takes precedence. Completed meetings belong in the journal.
 const active=visible&&storyTab&&(edda.ok&&edda.available&&!edda.decision?'edda':mara.ok&&mara.available&&!mara.decision?'mara':null);
 story.classList.toggle('v2-focus-active',!!active);
 if(maraPanel)maraPanel.hidden=active!=='mara';
 if(eddaPanel)eddaPanel.hidden=active!=='edda';
 section.hidden=!active;
 heading.querySelector('span').textContent='DORNMARK · JUST NU';
 heading.querySelector('h3').textContent=active==='edda'?'Ett samtal vid kvarnen':'Ett bud väntar på svar';
 journal.replaceChildren();
 if(mara.ok&&mara.available&&mara.decision){
  const o=mara.options?.[mara.decision.choice];
  if(o)addEntry(mara.title+' · inträffade dag '+mara.eventDay,mara.decision.discoveredDay,o.label,o.text);
 }
 if(edda.ok&&edda.available&&edda.decision){
  const o=edda.choices?.[edda.decision.choice];
  if(o)addEntry('Inför Edda vid kvarnen',edda.decision.day,o.label,o.text);
 }
 journal.hidden=!(visible&&journalTab&&journal.children.length);
}
// Existing tab and event renderers run first; our presentation follows them.
for(const id of ['storyTab','journalTab','mapTab','characterTab'])$(id)?.addEventListener('click',()=>queueMicrotask(render));
for(const name of ['kb:day-advanced','kb:v2-character-changed','kb:v2-event-decided','kb:v2-npc-decided'])window.addEventListener(name,()=>queueMicrotask(render));
render();
})();
