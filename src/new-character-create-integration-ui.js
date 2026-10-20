// IMP-025 3H.12.7 J-D — integrated READ-ONLY preview of future creator.
// No writes, no legacy form changes, no character creation.
(function(){
'use strict';
const host=document.querySelector('.kb-profile');
if(!host||document.getElementById('kb-new-character-jd'))return;
const current=Array.from(host.querySelectorAll('details')).find(el=>el.classList.contains('kb-create-experience'));
if(!current)return;
const details=document.createElement('details');
details.id='kb-new-character-jd';
details.style.cssText='margin:14px 0;border:1px solid #c8a76c;border-radius:10px;background:#223428;color:#f4e9ce;overflow:hidden';
const summary=document.createElement('summary');
summary.textContent='⚔️ Nytt karaktärsskapande – förhandsvisning J-D';
summary.style.cssText='padding:16px;cursor:pointer;min-height:48px;font:600 15px/1.5 system-ui';
const info=document.createElement('p');
info.textContent='Det här är ett test av det kommande obligatoriska karaktärsskapandet. Inga nya karaktärer skapas eller sparas här. Den befintliga skaparfunktionen ändras inte i detta steg.';
info.style.cssText='margin:0;padding:14px 16px;font:13px/1.6 system-ui;color:#ead4a9';
const frame=document.createElement('iframe');
frame.title='Isolerad förhandsvisning av nytt karaktärsskapande';
frame.src='tests/new-character-creation-preview.html';
frame.loading='lazy';
frame.setAttribute('sandbox','allow-scripts');
frame.style.cssText='display:block;width:100%;height:830px;border:0;background:#18271e';
const notice=document.createElement('p');
notice.textContent='Testa: välj alla obligatoriska alternativ, granska och bekräfta. Ingen sparning utförs.';
notice.style.cssText='margin:0;padding:12px 16px;font:13px/1.5 system-ui;color:#ead4a9';
details.append(summary,info,frame,notice);
current.insertAdjacentElement('beforebegin',details);
})();
