/* NAV-04: focused overview; character-owned navigation and game models preserved. */
(function(){'use strict';
const contract=window.KB_V2_DATA_CONTRACT, travel=window.KB_V2_TRAVEL, economy=window.KB_V2_ECONOMY, calendar=window.KB_V2_CALENDAR;
const panel=document.getElementById('overviewPanel'),story=document.querySelector('.story'),character=document.getElementById('characterPanel'),calendarPanel=document.getElementById('calendarPanel');
const ids={overview:'overviewTab',story:'storyTab',journal:'journalTab',map:'mapTab',character:'characterTab'};
if(!contract||!panel||!story||!character||!calendarPanel||Object.values(ids).some(id=>!document.getElementById(id)))return;
let warning='',restoring=false;
function currentId(){try{const id=localStorage.getItem(contract.activeKey());return id&&contract.readCharacter(id).ok?id:null;}catch(_){return null;}}
function key(id){return contract.characterKey(id)+'.navigation-v1';}
function read(id){if(!id)return 'story';try{const raw=localStorage.getItem(key(id));if(raw===null)return 'story';const v=JSON.parse(raw);if(v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).sort().join(',')==='tab,version'&&v.version===1&&Object.hasOwn(ids,v.tab))return v.tab;warning='En tidigare navigationsinställning kunde inte läsas. Den har inte ändrats.';}catch(_){warning='En tidigare navigationsinställning kunde inte läsas. Den har inte ändrats.';}return 'story';}
function save(tab){if(restoring)return;const id=currentId();if(!id)return;try{const k=key(id),raw=localStorage.getItem(k);if(raw!==null){const v=JSON.parse(raw);if(!v||typeof v!=='object'||Array.isArray(v)||Object.keys(v).sort().join(',')!=='tab,version'||v.version!==1||!Object.hasOwn(ids,v.tab)){warning='Navigationsinställningen är ogiltig och har inte skrivits över.';return;}}const value=JSON.stringify({version:1,tab});localStorage.setItem(k,value);if(localStorage.getItem(k)!==value)warning='Den valda fliken kunde inte sparas.';}catch(_){warning='Den valda fliken kunde inte sparas.';}}
function add(parent,tag,value,cls){const e=document.createElement(tag);e.textContent=value;if(cls)e.className=cls;parent.append(e);return e;}
function go(tab){document.getElementById(ids[tab]).click();}
function draw(){panel.replaceChildren();const head=add(panel,'div','','overview-heading');add(head,'span','DIN VÄG GENOM DORNMARK','overview-eyebrow');add(head,'h2','Översikt').id='overviewTitle';
 const id=currentId();if(!id){add(panel,'p','Skapa en karaktär för att börja ditt liv i Dornmark.');add(panel,'button','Gå till karaktärer','overview-link').addEventListener('click',()=>go('character'));return;}
 const c=contract.readCharacter(id),t=travel?.getState(),e=economy?.getState(),d=calendar?.getState();
 add(panel,'p','Välkommen tillbaka, '+c.value.name+'.','overview-intro');
 if(warning)add(panel,'p',warning,'overview-warning');
 const cards=add(panel,'div','','overview-grid');
 for(const [label,value] of [['Du befinner dig',t?.ok?t.places[t.placeId]?.name||'Okänd plats':t?.error||'Platsen kunde inte läsas'],['Datum',d?.ok?d.label:'Datumet kunde inte läsas'],['Dina pengar',e?.ok?e.coins+' kopparmynt':'Ekonomin kunde inte läsas'],['Din väska',e?.ok?e.grain+' spannmål':'Väskan kunde inte läsas']]){const card=add(cards,'div','','overview-card');add(card,'span',label);add(card,'strong',value);}
 // One shared calendar model: the overview action advances exactly one day.
 const dayAction=add(panel,'button','Fortsätt dagen →','overview-advance');
 dayAction.type='button';
 const dayStatus=add(panel,'p','','overview-day-status');dayStatus.setAttribute('role','status');
 if(!d?.ok || d.elapsedDays>=365000){dayAction.disabled=true;dayStatus.textContent=d?.error||'Kalendern kan inte fortsätta.';}
 dayAction.addEventListener('click',()=>{
  dayAction.disabled=true;
  const current=calendar?.getState();
  const funds=economy?.getState();
  if(!current?.ok||!funds?.ok){dayStatus.textContent=current?.error||funds?.error||'Spelets tillstånd kunde inte verifieras.';return;}
  const result=calendar.advanceDay();
  if(!result.ok){dayStatus.textContent=result.error;return;}
  draw();
 });
 add(panel,'h3','Fortsätt ditt liv');add(panel,'p','Välj vad du vill göra härnäst. Översikten förbrukar ingen speltid.','overview-help');
 const actions=add(panel,'div','','overview-actions');for(const [tab,label,detail] of [['story','Fortsätt berättelsen','Händelser och människor'],['map','Utforska platser','Byar, marknader och resvägar']]){const b=add(actions,'button','','overview-link');b.type='button';add(b,'strong',label);add(b,'span',detail);b.addEventListener('click',()=>go(tab));}
}
function displayOverview(){draw();story.hidden=true;character.hidden=true;calendarPanel.hidden=true;panel.hidden=false;document.querySelectorAll('.bottom .nav-btn').forEach(b=>b.classList.toggle('active',b.id===ids.overview));}
function hideOverview(){panel.hidden=true;}
for(const [tab,id] of Object.entries(ids))document.getElementById(id).addEventListener('click',()=>{if(tab==='overview')displayOverview();else hideOverview();save(tab);});
function restore(){const tab=read(currentId());restoring=true;try{go(tab);}finally{restoring=false;}}
window.addEventListener('kb:v2-character-changed',()=>queueMicrotask(restore));
for(const event of ['kb:day-advanced','kb:travel-changed','kb:economy-changed','kb:market-changed'])window.addEventListener(event,()=>{if(!panel.hidden)queueMicrotask(draw);});
restore();
})();
