// KB-A2.4 – read-only backup validation and preview.
// Never reads or writes localStorage. Never imports.
(function () {
'use strict';
const B='kronor-och-blod.', P=B+'slot.v1.';
const ID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const STEMS=['story','encounter','investigation','calendar','daylog','life-background'];
const ACTIVE=[B+'character.v1',B+'character.identity.v1'];
STEMS.forEach(s=>ACTIVE.push(B+s+'.v1',B+s+'.owner.v1'));
const fail=m=>{throw Error(m)};
const parse=(raw,context)=>{try{return JSON.parse(raw)}catch(_){fail('Trasig JSON: '+context)}};
const obj=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const has=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
function checkEntries(entries,id,label){
 if(!obj(entries))fail(label+': ogiltiga poster.');
 const keys=Object.keys(entries);
 if(keys.some(k=>!ACTIVE.includes(k)||typeof entries[k]!=='string'))fail(label+': okända eller ogiltiga nycklar.');
 const cr=entries[B+'character.v1'], ir=entries[B+'character.identity.v1'];
 if(typeof cr!=='string'||typeof ir!=='string')fail(label+': karaktär/identitet saknas.');
 const c=parse(cr,label+' karaktär'),i=parse(ir,label+' identitet');
 if(!obj(c)||c.version!==1||typeof c.name!=='string'||c.name.trim().length<2||c.name.length>32||
    typeof c.background!=='string'||!['bonde','hantverkare','skrivare','friboren'].includes(c.background)||
    c.placeId!=='VG-SKARA-001'||!obj(i)||i.version!==1||i.characterId!==id||i.characterRaw!==cr)
    fail(label+': identitet eller karaktärsdata stämmer inte.');
 for(const stem of STEMS){
   const d=entries[B+stem+'.v1'],o=entries[B+stem+'.owner.v1'];
   if((d===undefined)!==(o===undefined))fail(label+': saknar ägarpar för '+stem);
   if(o!==undefined){
     const owner=parse(o,label+' ägare '+stem);
     const field=stem==='calendar'?'calendarRaw':stem==='daylog'?'daylogRaw':stem==='life-background'?'backgroundRaw':null;
     if(!obj(owner)||owner.version!==1||owner.characterId!==id||(field&&owner[field]!==d))
       fail(label+': fel ägare för '+stem);
     parse(d,label+' data '+stem);
     if(stem==='life-background'){
       const life=parse(d,label+' livsbakgrund');
       if(!obj(life)||life.version!==1||typeof life.upbringing!=='string'||typeof life.familySituation!=='string'||
          typeof life.past!=='string'||typeof life.ambition!=='string')fail(label+': ogiltig livsbakgrund.');
     }
   }
 }
 return c.name;
}
function checkStructure(p){
 if(!obj(p)||p.format!=='kronor-och-blod-full-backup'||p.version!==2||
   typeof p.createdAt!=='string'||!Number.isFinite(Date.parse(p.createdAt))||
   !obj(p.activeEntries)||!obj(p.slots)||!obj(p.otherEntries)||!obj(p.manifest))
   fail('Ogiltigt backupformat.');
 if(!(p.activeCharacterId===null||(typeof p.activeCharacterId==='string'&&ID.test(p.activeCharacterId))))
   fail('Ogiltigt aktivt ID.');
 if(Object.keys(p.otherEntries).some(k=>k!==B+'backup.pre-migration.v1'||typeof p.otherEntries[k]!=='string'))
   fail('Okända övriga poster.');
 if(Object.keys(p.activeEntries).some(k=>!ACTIVE.includes(k)||typeof p.activeEntries[k]!=='string'))
   fail('Okända aktiva poster.');
 if(Object.keys(p.slots).some(k=>!k.startsWith(P)||!ID.test(k.slice(P.length))||typeof p.slots[k]!=='string'))
   fail('Ogiltiga slotnycklar.');
 if(p.manifest.slotCount!==Object.keys(p.slots).length||
    p.manifest.keyCount!==Object.keys(p.activeEntries).length+Object.keys(p.slots).length+Object.keys(p.otherEntries).length)
   fail('Fel antal poster.');
 if(p.activeCharacterId===null&&Object.keys(p.activeEntries).length)fail('Aktiva data utan aktivt ID.');
 if(p.activeCharacterId!==null&&!Object.keys(p.activeEntries).length)fail('Aktivt ID utan aktiva data.');
}
async function preview(backup, integrity){
 try{
  checkStructure(backup);
  if(!integrity||typeof integrity.verify!=='function')fail('Integritetskontroll saknas.');
  const seal=await integrity.verify(backup);
  if(!seal||seal.ok!==true)fail('Kontrollsumma: '+(seal&&seal.reason||'FAIL'));
  const characters=[];
  const seen=new Set();
  if(backup.activeCharacterId!==null){
    const name=checkEntries(backup.activeEntries,backup.activeCharacterId,'Aktiv');
    characters.push({id:backup.activeCharacterId,name,active:true});
    seen.add(backup.activeCharacterId);
  }
  for(const [key,raw] of Object.entries(backup.slots)){
    const id=key.slice(P.length),slot=parse(raw,'slot '+id);
    if(!obj(slot)||slot.format!=='kronor-och-blod-character-slot'||slot.version!==1||
      slot.characterId!==id||typeof slot.name!=='string'||!obj(slot.entries))
      fail('Ogiltig slot: '+id);
    const name=checkEntries(slot.entries,id,'Slot '+id);
    if(name!==slot.name)fail('Slotnamn stämmer inte: '+id);
    if(!seen.has(id)){characters.push({id,name,active:false});seen.add(id);}
    else if(id!==backup.activeCharacterId)fail('Duplicerat karaktärs-ID.');
    else {
      const activeName=characters.find(c=>c.id===id).name;
      if(activeName!==name)fail('Aktiv karaktär och slot har olika namn.');
    }
  }
  return {ok:true,reason:'Kontrollerad backup. Ingen import utförd.',
    createdAt:backup.createdAt,activeCharacterId:backup.activeCharacterId,
    slotCount:Object.keys(backup.slots).length,characters};
 }catch(e){return {ok:false,reason:e.message,characters:[]};}
}
window.KB_FULL_BACKUP_VALIDATOR=Object.freeze({preview});
})();
