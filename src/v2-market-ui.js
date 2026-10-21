/* V2-05C: disable purchase when the mill is empty; use existing market action. */
(function(){'use strict';
const map=document.getElementById('mapTab'),host=document.getElementById('storyText'),api=window.KB_V2_LOCAL_ECONOMY;
if(!map||!host||!api)return;
function update(){if(!map.classList.contains('active'))return;const b=[...host.querySelectorAll('button')].find(x=>x.textContent.includes('Köp spannmål'));if(!b)return;const s=api.getState();if(!s.ok){b.disabled=true;return;}if(s.stocks.dorneth<=0){b.disabled=true;if(!host.querySelector('.market-stock-warning')){const p=document.createElement('p');p.className='travel-muted market-stock-warning';p.textContent='Kvarnen har slut på spannmål. Vänta på nästa leverans.';b.parentNode.insertBefore(p,b);}}}
const obs=new MutationObserver(()=>queueMicrotask(update));obs.observe(host,{childList:true,subtree:false});
for(const ev of ['kb:economy-changed','kb:market-changed','kb:day-advanced','kb:travel-changed'])window.addEventListener(ev,()=>queueMicrotask(update));
map.addEventListener('click',()=>queueMicrotask(update));
})();
