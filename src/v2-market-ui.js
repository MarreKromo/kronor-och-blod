/* V2-05C-FIX: marknadsknappen speglar lagret efter att alla defer-skript laddats. */
(function(){'use strict';
const map=document.getElementById('mapTab');
const host=document.getElementById('storyText');
if(!map||!host)return;
let queued=false;
function update(){
 queued=false;
 if(!map.classList.contains('active'))return;
 const api=window.KB_V2_LOCAL_ECONOMY;
 const button=[...host.querySelectorAll('button')].find(x=>x.textContent.includes('Köp spannmål')||x.dataset.kbMarketButton==='1');
 if(!button)return;
 button.dataset.kbMarketButton='1';
 const state=api?.getState();
 const unavailable=!state||!state.ok;
 const empty=!unavailable&&state.stocks.dorneth<=0;
 button.disabled=unavailable||empty;
 const label=empty?'Slutsålt – inväntar leverans':'Köp spannmål · 2 kopparmynt';
 if(button.textContent!==label)button.textContent=label;
 button.setAttribute('aria-disabled',String(button.disabled));
 let notice=host.querySelector('.market-stock-warning');
 if(unavailable||empty){
  if(!notice){notice=document.createElement('p');notice.className='travel-muted market-stock-warning';button.insertAdjacentElement('afterend',notice);}
  const message=unavailable?'Marknadens lager kan inte kontrolleras. Inga köp genomförs.':'Kvarnen har slut på spannmål. Nästa leverans väntas från Keldra.';
  if(notice.textContent!==message)notice.textContent=message;
 }else if(notice){notice.remove();}
}
function schedule(){if(queued)return;queued=true;queueMicrotask(update);}
const observer=new MutationObserver(schedule);
observer.observe(host,{childList:true,subtree:true});
for(const name of ['kb:economy-changed','kb:market-changed','kb:day-advanced','kb:travel-changed','kb:v2-character-changed'])window.addEventListener(name,schedule);
for(const name of ['mapTab','storyTab','journalTab','characterTab'])document.getElementById(name)?.addEventListener('click',schedule);
window.addEventListener('DOMContentLoaded',schedule);
schedule();
})();
