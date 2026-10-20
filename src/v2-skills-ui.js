/* V2-03.3B — agriculture inside the existing character view. */
(function(){
'use strict';
const api=window.KB_V2_SKILLS,content=document.getElementById('characterContent'),panel=document.getElementById('characterPanel');
if(!api||!content||!panel)return;
const section=document.createElement('section');section.className='skills-panel';section.setAttribute('aria-label','Färdigheter och arbete');
function el(tag,txt,cls){const n=document.createElement(tag);n.textContent=txt;if(cls)n.className=cls;return n;}
function render(){section.replaceChildren();const s=api.getState();section.append(el('h3','Färdigheter'));if(!s.ok){section.append(el('p',s.error,'skills-error'));return;}section.append(el('p','Jordbruk · nivå '+s.level,'skills-level'));section.append(el('p',s.progress+' / 50 erfarenhet till nästa nivå · '+s.count+' arbetsdagar','skills-progress'));const bar=el('div','','skills-track'),fill=el('div','','skills-fill');fill.style.width=(s.progress*2)+'%';bar.append(fill);section.append(bar);section.append(el('h3','Arbete i Keldra'));section.append(el('p','Hjälp till på åkrarna under en hel dag. Du får 10 erfarenhet i jordbruk. Ingen lön eller varor tillkommer ännu.','skills-description'));const button=el('button','Arbeta en dag på åkern','skills-work');button.type='button';button.disabled=s.day.elapsedDays>=365000;button.addEventListener('click',()=>{if(!window.confirm('Arbeta en hel dag i Keldra? En dag förbrukas och du får jordbrukserfarenhet.'))return;button.disabled=true;const result=api.work();render();if(!result.ok){section.append(el('p',result.error,'skills-error'));}else{section.append(el('p','Du har arbetat en dag. Jordbruket utvecklas och kalendern har gått framåt.','skills-success'));}});section.append(button);}
function attach(){if(panel.hidden)return;content.append(section);render();}
// Character controller replaces its content on creation and character changes.
const observer=new MutationObserver(()=>{if(!panel.hidden&&!content.contains(section)){content.append(section);render();}});observer.observe(content,{childList:true});
for(const id of ['characterTab','storyTab','journalTab','mapTab'])document.getElementById(id)?.addEventListener('click',()=>queueMicrotask(attach));
window.addEventListener('kb:v2-character-changed',()=>queueMicrotask(attach));
window.addEventListener('kb:day-advanced',()=>{if(content.contains(section))render();});
// Pending activity must settle before the generic next-day button can advance time.
const next=document.getElementById('advanceDayButton');next?.addEventListener('click',e=>{const s=api.getState();if(!s.ok){e.stopImmediatePropagation();e.preventDefault();window.alert(s.error);}},true);
attach();
})();
