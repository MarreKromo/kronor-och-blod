/* NAV-03: scalable four-destination navigation, existing tab controllers retained. */
(function(){'use strict';
const nav=document.querySelector('nav.bottom'),overview=document.getElementById('overviewPanel'),story=document.querySelector('.story'),character=document.getElementById('characterPanel'),calendar=document.getElementById('calendarPanel');
const tabs={overview:document.getElementById('overviewTab'),story:document.getElementById('storyTab'),map:document.getElementById('mapTab'),journal:document.getElementById('journalTab'),character:document.getElementById('characterTab')};
if(!nav||!overview||!story||!character||!calendar||Object.values(tabs).some(x=>!x))return;
const menuButton=document.createElement('button');menuButton.id='menuTab';menuButton.type='button';menuButton.className='nav-btn nav-menu-button';menuButton.textContent='☰ Meny';menuButton.setAttribute('aria-controls','kbMenuPanel');nav.append(menuButton);
const menu=document.createElement('section');menu.id='kbMenuPanel';menu.className='kb-menu-panel';menu.hidden=true;menu.setAttribute('aria-label','Spelmeny och funktioner');nav.before(menu);
function el(tag,text,cls,parent){const x=document.createElement(tag);x.textContent=text;if(cls)x.className=cls;parent.append(x);return x;}
function item(parent,title,subtitle,target){const b=el('button','','kb-menu-item',parent);b.type='button';el('strong',title,'',b);el('span',subtitle,'',b);if(target)b.addEventListener('click',()=>tabs[target].click());else{b.disabled=true;b.setAttribute('aria-label',title+' – kommer senare');}return b;}
function draw(){menu.replaceChildren();el('span','DIN VÄG GENOM DORNMARK','kb-menu-eyebrow',menu);el('h2','Meny','',menu);el('p','Här samlas spelets funktioner när Dornmark växer.','kb-menu-description',menu);
const back=el('button','← Tillbaka till Översikt','kb-menu-back',menu);back.type='button';back.addEventListener('click',()=>tabs.overview.click());
let group=el('div','','kb-menu-group',menu);el('h3','Ditt liv','',group);item(group,'Karaktär','Bakgrund och karaktärsplatser','character');item(group,'Dagbok','Dina val och tidigare händelser','journal');
group=el('div','','kb-menu-group',menu);el('h3','Världen','',group);item(group,'Platser och resor','Upptäck orter och res mellan dem','map');
group=el('div','','kb-menu-group',menu);el('h3','Kommande system','',group);item(group,'Relationer och familj','Följeslagare, familj och hushåll',null);item(group,'Egendomar och handel','Gårdar, ägande och verksamheter',null);item(group,'Makt och politik','Grupper, inflytande och konflikter',null);
}
function openMenu(){draw();overview.hidden=true;story.hidden=true;character.hidden=true;calendar.hidden=true;menu.hidden=false;nav.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b===menuButton));menuButton.setAttribute('aria-current','page');}
function closeMenu(){menu.hidden=true;menuButton.removeAttribute('aria-current');}
menuButton.addEventListener('click',openMenu);
Object.values(tabs).forEach(button=>button.addEventListener('click',closeMenu));
window.addEventListener('kb:v2-character-changed',closeMenu);
})();
