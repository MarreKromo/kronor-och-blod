// IMP-025 3H.12.7 H — read-only production save preflight.
// Loads real save engine but NEVER calls save(), recover() or writes to storage.
(function(){
'use strict';
const root=document.getElementById('kb-life-profile-entry');
const save=window.KB_LIFE_BACKGROUND_SAVE;
if(!root||!save)return;
const status=document.createElement('p');
status.setAttribute('role','status');
status.style.cssText='margin:10px 16px;padding:12px;border:1px solid #7d755d;border-radius:6px;font:13px/1.6 system-ui;color:#ead9af';
const form=root.querySelector('#kb-life-background-form');
if(form)form.before(status);else root.appendChild(status);
function inspect(){
 try{
  const result=save.inspect();
  status.textContent=result.exists
   ? 'Sparstatus: Den aktiva karaktären har redan en verifierad livsbakgrund. Ny sparning är spärrad.'
   : 'Sparstatus: Karaktären är verifierad och saknar livsbakgrund. Riktig sparning är ännu inte aktiverad.';
 }catch(e){
  status.textContent='Sparstatus: Säkerhetskontroll stoppad – '+e.message+' Ingen sparning utförs.';
 }
}
root.addEventListener('toggle',()=>{if(root.open)inspect()});
window.addEventListener('pageshow',inspect);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)inspect()});
inspect();
})();
