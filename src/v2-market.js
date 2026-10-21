/* V2-05C: journaled market purchases. Installed before travel UI and local supply. */
(function(){'use strict';
const c=window.KB_V2_DATA_CONTRACT,cal=window.KB_V2_CALENDAR,travel=window.KB_V2_TRAVEL,original=window.KB_V2_ECONOMY;
if(!c||!cal||!travel||!original)return;
const MAX=365000, LIMIT=100000, PRICE=original.PRICE;
let locked=false;
const fail=error=>({ok:false,error});
function owner(){try{const id=localStorage.getItem(c.activeKey());if(!id||!c.readCharacter(id).ok)return fail('Aktiv karaktär saknas.');const d=cal.getState(),t=travel.getState();if(!d.ok||!t.ok||d.id!==id||t.id!==id||!Number.isSafeInteger(d.elapsedDays)||d.elapsedDays<0||d.elapsedDays>MAX)return fail('Karaktärens tid eller plats är ogiltig.');return {ok:true,id,day:d.elapsedDays,place:t.placeId};}catch(_){return fail('Lagringen kunde inte läsas.');}}
function journalKey(id){return c.characterKey(id)+'.market-v1';}
function econKey(id){return c.characterKey(id)+'.economy-v1';}
function validEconomy(v,id){return v&&v.version===1&&v.ownerId===id&&Number.isSafeInteger(v.coins)&&v.coins>=0&&Number.isSafeInteger(v.grain)&&v.grain>=0&&Array.isArray(v.paidDays)&&v.pending===null;}
function validJournal(j,id){if(!j||j.version!==1||j.ownerId!==id||!Array.isArray(j.purchases)||j.purchases.length>LIMIT||!(j.pending===null||typeof j.pending==='object'))return false;let prev=-1;for(const p of j.purchases){if(!p||!Number.isSafeInteger(p.day)||p.day<0||p.day>=MAX||p.day<prev||p.quantity!==1||p.price!==PRICE)return false;prev=p.day;}if(j.pending!==null){const p=j.pending;if(!Number.isSafeInteger(p.day)||p.day<0||p.day>=MAX||p.day<prev||p.price!==PRICE||!Number.isSafeInteger(p.beforeCoins)||p.beforeCoins<PRICE||!Number.isSafeInteger(p.beforeGrain)||p.beforeGrain<0||!Number.isSafeInteger(p.expectedCount)||p.expectedCount!==j.purchases.length)return false;}return true;}
function read(id){try{const raw=localStorage.getItem(journalKey(id));const j=raw===null?{version:1,ownerId:id,purchases:[],pending:null}:JSON.parse(raw);return validJournal(j,id)?{ok:true,raw,j}:fail('Marknadsjournalen är skadad. Inga data ändrades.');}catch(_){return fail('Marknadsjournalen kunde inte läsas.');}}
function write(id,expected,j){if(!validJournal(j,id))return fail('Ogiltig marknadstransaktion.');try{const k=journalKey(id);if(localStorage.getItem(k)!==expected)return fail('Marknadsjournalen ändrades samtidigt.');const next=JSON.stringify(j);localStorage.setItem(k,next);return localStorage.getItem(k)===next?{ok:true}:fail('Marknadsjournalen kunde inte verifieras.');}catch(_){return fail('Marknadsjournalen kunde inte sparas.');}}
function snapshot(id){try{const raw=localStorage.getItem(econKey(id));if(raw===null)return {ok:true,coins:0,grain:0};const v=JSON.parse(raw);return validEconomy(v,id)?{ok:true,coins:v.coins,grain:v.grain}:fail('Ekonomisparningen måste kontrolleras innan handel.');}catch(_){return fail('Ekonomisparningen kunde inte läsas.');}}
function recover(){const a=owner();if(!a.ok)return a;const r=read(a.id);if(!r.ok)return r;if(!r.j.pending)return {ok:true,id:a.id,j:r.j};const p=r.j.pending,now=snapshot(a.id);if(!now.ok)return now;
 const unchanged=now.coins===p.beforeCoins&&now.grain===p.beforeGrain;
 const applied=now.coins===p.beforeCoins-PRICE&&now.grain===p.beforeGrain+1;
 if(!unchanged&&!applied)return fail('Ett avbrutet köp kan inte verifieras. Inga nya köp tillåts; återställ sparningen innan du fortsätter.');
 const j={...r.j,pending:null,purchases:applied?[...r.j.purchases,{day:p.day,quantity:1,price:PRICE}]:r.j.purchases};const saved=write(a.id,r.raw,j);return saved.ok?{ok:true,id:a.id,j}:saved;
}
function purchases(){const r=recover();if(!r.ok)return r;return {ok:true,id:r.id,purchases:r.j.purchases.map(p=>({...p}))};}
function getState(){const r=recover();return r.ok?original.getState():r;}
function work(){const r=recover();return r.ok?original.work():r;}
function buyGrain(){if(locked)return fail('En marknadstransaktion pågår.');locked=true;try{
 const r=recover();if(!r.ok)return r;const a=owner();if(!a.ok||a.id!==r.id||a.place!=='dorneth')return fail('Marknaden finns bara i Dorneth.');
 const s=original.getState();if(!s.ok||s.id!==a.id)return fail('Ekonomin kunde inte verifieras.');if(s.coins<PRICE)return fail('Du saknar kopparmynt.');if(s.grain>=100000000)return fail('Väskan är full.');
 const supply=window.KB_V2_LOCAL_ECONOMY?.getState();if(!supply||!supply.ok||supply.id!==a.id)return fail('Kvarnens förråd kunde inte verifieras.');if(supply.stocks.dorneth<1)return fail('Kvarnen har slut på spannmål.');
 const before=snapshot(a.id);if(!before.ok||before.coins!==s.coins||before.grain!==s.grain)return fail('Ekonomin ändrades innan köpet.');
 const current=read(a.id);if(!current.ok||current.j.pending)return fail('Marknadsjournalen är upptagen.');
 const pending={day:a.day,price:PRICE,beforeCoins:s.coins,beforeGrain:s.grain,expectedCount:current.j.purchases.length};
 const marked=write(a.id,current.raw,{...current.j,pending});if(!marked.ok)return marked;
 const result=original.buyGrain();const settled=recover();if(!settled.ok)return settled;
 if(!result.ok)return result;
 window.dispatchEvent(new Event('kb:market-changed'));
 return {ok:true,state:original.getState()};
 }finally{locked=false;}}
window.KB_V2_MARKET=Object.freeze({purchases,recover,buyGrain});
window.KB_V2_ECONOMY=Object.freeze({...original,getState,work,buyGrain});
})();
