/* V2-05A: compact local supply display in existing Places and NPC views. */
(function(){'use strict';
const api=window.KB_V2_LOCAL_ECONOMY,story=document.getElementById('storyTab'),map=document.getElementById('mapTab'),host=document.getElementById('storyText'),chapters=document.getElementById('livingStoryChapters');
if(!api||!story||!map||!host||!chapters)return;
const panel=document.createElement('section');panel.className='local-economy';panel.setAttribute('aria-label','Traktens försörjning');
const note=document.createElement('div');note.className='local-economy-note';note.setAttribute('aria-label','Försörjningens följder');
function add(parent,tag,text,cls){const e=document.createElement(tag);e.textContent=text;if(cls)e.className=cls;parent.append(e);return e;}
function render(){const s=api.getState();panel.replaceChildren();note.replaceChildren();if(!s.ok){add(panel,'p',s.error,'local-economy-error');note.hidden=true;}else{
 add(panel,'h4','Traktens försörjning');add(panel,'p',s.status,'local-economy-status');add(panel,'p',s.details);
 add(panel,'p','Arbetsdagar senaste veckan: '+s.recentWorkdays+' · Tillgångsindex: '+s.supply,'local-economy-small');
 add(panel,'p','Indexet speglar skörd och förbrukning, inte köpbara lagersäckar. Dina egna varor och priser ändras inte.','local-economy-small');
 add(note,'strong','Hur påverkas människorna?');const person=s.place==='keldra'?s.people.mara:s.place==='dorneth'?s.people.edda:null;
 if(person)add(note,'p',person.name+': '+person.message);else add(note,'p','Ingen ny leverans är känd här.');note.hidden=false;
 }
 if(map.classList.contains('active')){const section=host.querySelector('.travel-panel');if(section)section.append(panel);}
 if(story.classList.contains('active')&&!document.querySelector('.story')?.hidden){chapters.append(note);}
 else note.remove();
}
for(const ev of ['kb:economy-changed','kb:day-advanced','kb:travel-changed','kb:v2-character-changed','kb:npc-life-changed'])window.addEventListener(ev,()=>queueMicrotask(render));
for(const tab of ['storyTab','mapTab','journalTab','characterTab'])document.getElementById(tab)?.addEventListener('click',()=>queueMicrotask(render));
const observer=new MutationObserver(()=>{if(map.classList.contains('active')&&!host.contains(panel))queueMicrotask(render);});observer.observe(host,{childList:true});
render();
})();
