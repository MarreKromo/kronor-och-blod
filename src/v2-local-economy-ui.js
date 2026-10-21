/* V2-05E: mobile supply overview; read-only view of existing replay model. */
(function(){'use strict';
const api=window.KB_V2_LOCAL_ECONOMY,story=document.getElementById('storyTab'),map=document.getElementById('mapTab'),host=document.getElementById('storyText'),chapters=document.getElementById('livingStoryChapters');
if(!api||!story||!map||!host||!chapters)return;
const panel=document.createElement('section');panel.className='local-economy';panel.setAttribute('aria-label','Traktens försörjning');
const note=document.createElement('div');note.className='local-economy-note';note.setAttribute('aria-label','Försörjningens följder');
let expanded=false;
function add(parent,tag,text,cls){const e=document.createElement(tag);e.textContent=text;if(cls)e.className=cls;parent.append(e);return e;}
function render(){
 const s=api.getState();panel.replaceChildren();note.replaceChildren();
 if(!s.ok){add(panel,'p',s.error,'local-economy-error');note.hidden=true;}
 else{
  add(panel,'h4','Traktens försörjning');
  add(panel,'p',s.status,'local-economy-status');
  const row=add(panel,'div','','local-economy-stocks');
  for(const [name,count] of [['Keldra',s.stocks.keldra],['Dorneth',s.stocks.dorneth]]){
   const item=add(row,'div','','local-economy-stock');
   add(item,'span',name,'local-economy-stock-name');
   add(item,'strong',count+' säckar');
  }
  const tip=s.stocks.dorneth<=2?'Kvarnen väntar på leverans. Spannmålet kan ta slut på marknaden.':
    s.stocks.dorneth<=5?'Kvarnen har ett litet förråd. Nya leveranser behövs snart.':
    'Kvarnen har spannmål för handeln. Leveranserna från Keldra håller försörjningen igång.';
  add(panel,'p',tip,'local-economy-explain');
  const details=add(panel,'details','','local-economy-details');details.open=expanded;
  details.addEventListener('toggle',()=>{expanded=details.open;});
  add(details,'summary','Visa produktion och leveranser');
  const rows=[
   ['Böndernas produktion',s.flows.backgroundProduced],
   ['Ditt bidrag till gården',s.flows.produced],
   ['Levererat till kvarnen',s.flows.delivered],
   ['Köpt på marknaden',s.flows.bought],
   ['Arbetsdagar senaste veckan',s.recentWorkdays]
  ];
  const dl=add(details,'dl','','local-economy-ledger');
  for(const [label,value] of rows){add(dl,'dt',label);add(dl,'dd',String(value));}
  add(details,'p','Förbrukning och leveranser beräknas dag för dag. Äldre köp före marknadsjournalen kan inte räknas i efterhand.','local-economy-small');
  const person=s.place==='keldra'?s.people.mara:s.place==='dorneth'?s.people.edda:null;
  add(note,'strong',person?person.name+' · Försörjningen':'Försörjningen');
  add(note,'p',person?person.message:'Inga nya leveranser är kända här.');
  note.hidden=false;
 }
 if(map.classList.contains('active')){const section=host.querySelector('.travel-panel');if(section)section.append(panel);}
 if(story.classList.contains('active')&&!document.querySelector('.story')?.hidden){chapters.append(note);}else note.remove();
}
for(const ev of ['kb:economy-changed','kb:market-changed','kb:day-advanced','kb:travel-changed','kb:v2-character-changed','kb:npc-life-changed'])window.addEventListener(ev,()=>queueMicrotask(render));
for(const tab of ['storyTab','mapTab','journalTab','characterTab'])document.getElementById(tab)?.addEventListener('click',()=>queueMicrotask(render));
const observer=new MutationObserver(()=>{if(map.classList.contains('active')&&!host.contains(panel))queueMicrotask(render);});observer.observe(host,{childList:true});render();
})();
