/* V2-05B: location-specific supply view; brief consequence in story. */
(function(){'use strict';
const api=window.KB_V2_LOCAL_ECONOMY,story=document.getElementById('storyTab'),map=document.getElementById('mapTab'),host=document.getElementById('storyText'),chapters=document.getElementById('livingStoryChapters');
if(!api||!story||!map||!host||!chapters)return;
const panel=document.createElement('section');panel.className='local-economy';panel.setAttribute('aria-label','Traktens försörjning');
const note=document.createElement('div');note.className='local-economy-note';note.setAttribute('aria-label','Försörjningens följder');
function add(parent,tag,text,cls){const e=document.createElement(tag);e.textContent=text;if(cls)e.className=cls;parent.append(e);return e;}
function render(){const s=api.getState();panel.replaceChildren();note.replaceChildren();if(!s.ok){add(panel,'p',s.error,'local-economy-error');note.hidden=true;}else{
 add(panel,'h4','Traktens försörjning');add(panel,'p',s.status,'local-economy-status');
 add(panel,'p','Keldras förråd: '+s.stocks.keldra+' säckar · Dorneths kvarn: '+s.stocks.dorneth+' säckar.');
 add(panel,'p','Från dina arbetsdagar: '+s.flows.produced+' säckar producerade · '+s.recentWorkdays+' arbetsdagar senaste veckan.','local-economy-small');
 add(panel,'p','Bakgrundsproduktion, hushållens förbrukning och leveranser simuleras dag för dag. Marknadsköp och dina egna varor ändrar ännu inte dessa förråd.','local-economy-small');
 const person=s.place==='keldra'?s.people.mara:s.place==='dorneth'?s.people.edda:null;
 add(note,'strong',person?person.name+' · Försörjningen':'Försörjningen');add(note,'p',person?person.message:'Inga nya leveranser är kända här.');note.hidden=false;
 }
 if(map.classList.contains('active')){const section=host.querySelector('.travel-panel');if(section)section.append(panel);}
 if(story.classList.contains('active')&&!document.querySelector('.story')?.hidden){chapters.append(note);}else note.remove();
}
for(const ev of ['kb:economy-changed','kb:day-advanced','kb:travel-changed','kb:v2-character-changed','kb:npc-life-changed'])window.addEventListener(ev,()=>queueMicrotask(render));
for(const tab of ['storyTab','mapTab','journalTab','characterTab'])document.getElementById(tab)?.addEventListener('click',()=>queueMicrotask(render));
const observer=new MutationObserver(()=>{if(map.classList.contains('active')&&!host.contains(panel))queueMicrotask(render);});observer.observe(host,{childList:true});
render();
})();
