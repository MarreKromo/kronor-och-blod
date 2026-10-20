// KB-A2.6 – create-only restore of missing inactive slots.
// Never writes active entries, never overwrites any existing key.
(function(){'use strict';
const B='kronor-och-blod.',P=B+'slot.v1.',J=[B+'switch.journal.v1',B+'life-background.write-journal.v1'];
const fail=m=>{throw Error(m)};
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
function checkStorage(storage){if(!storage||typeof storage.getItem!=='function'||typeof storage.setItem!=='function'||typeof storage.removeItem!=='function'||typeof storage.key!=='function'||!Number.isSafeInteger(storage.length))fail('Lagring saknas.');for(const j of J)if(storage.getItem(j)!==null)fail('Oavslutad transaktion: '+j)}
function state(storage){const out={};for(let i=0;i<storage.length;i++){const k=storage.key(i);if(typeof k!=='string'||own(out,k))fail('Lagringsnycklar ändrades.');if(k.startsWith(B)){const v=storage.getItem(k);if(typeof v!=='string')fail('Lagringen ändrades.');out[k]=v}}return out}
async function plan(backup,storage,validator,integrity){
 checkStorage(storage);const valid=await validator.preview(backup,integrity);if(!valid.ok)fail('Backup nekad: '+valid.reason);
 const before=state(storage);const candidates=[];const conflicts=[];
 for(const [key,raw] of Object.entries(backup.slots)){
  const id=key.slice(P.length),slot=JSON.parse(raw);
  if(own(before,key)){conflicts.push({id,name:slot.name,reason:'Sparplatsen finns redan'});continue}
  // An active character may lack a slot. Never import a second copy of it.
  const identity=before[B+'character.identity.v1'];
  if(identity){let current;try{current=JSON.parse(identity)}catch(_){fail('Aktiv identitet är skadad.')}if(current&&current.characterId===id){conflicts.push({id,name:slot.name,reason:'Karaktären är redan aktiv'});continue}}
  candidates.push({id,name:slot.name,key,raw});
 }
 return {ok:true,candidates,conflicts,baseline:before,createdAt:backup.createdAt};
}
async function restore(backup,storage,validator,integrity,expectedIds){
 if(!Array.isArray(expectedIds)||!expectedIds.length||new Set(expectedIds).size!==expectedIds.length)fail('Välj minst en unik karaktär.');
 const p=await plan(backup,storage,validator,integrity);
 const chosen=p.candidates.filter(c=>expectedIds.includes(c.id));
 if(chosen.length!==expectedIds.length)fail('Valda sparplatser är inte längre tillgängliga.');
 // Recheck entire storage before first write; fail closed on any concurrent changes.
 const now=state(storage);if(JSON.stringify(now)!==JSON.stringify(p.baseline))fail('Sparningar ändrades. Starta om kontrollen.');
 const written=[];
 try{
  for(const c of chosen){
   checkStorage(storage);
   if(storage.getItem(c.key)!==null)fail('Sparplats upptagen: '+c.name);
   storage.setItem(c.key,c.raw);
   if(storage.getItem(c.key)!==c.raw)fail('Skrivverifiering misslyckades: '+c.name);
   written.push(c);
  }
  return {ok:true,restored:chosen.map(c=>({id:c.id,name:c.name}))};
 }catch(e){
  let rollbackOK=true;
  for(const c of written.reverse()){
   try{if(storage.getItem(c.key)===c.raw)storage.removeItem(c.key);else rollbackOK=false;
       if(storage.getItem(c.key)!==null)rollbackOK=false;}catch(_){rollbackOK=false}
  }
  fail(rollbackOK?'Återställning avbruten och nya poster återtagna: '+e.message:'Återställning avbruten. En eller flera nya poster kan finnas kvar: '+e.message);
 }
}
window.KB_FULL_BACKUP_RESTORE=Object.freeze({plan,restore});
})();
