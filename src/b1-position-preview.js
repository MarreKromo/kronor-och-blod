// KB-B1.1: read-only position and route preview. No persistent writes.
(function(root){'use strict';
const START='VG-SKARA-001', BASE='kronor-och-blod.';
function inspect(storage,places){
  try{
    if(!storage||!Array.isArray(places))throw Error('Data saknas.');
    const cr=storage.getItem(BASE+'character.v1'),ir=storage.getItem(BASE+'character.identity.v1');
    if(!cr||!ir)return {ok:false,reason:'Ingen verifierad aktiv karaktär. Ingen resa kan utföras.'};
    const c=JSON.parse(cr),i=JSON.parse(ir);
    if(!c||c.version!==1||c.placeId!==START||typeof c.name!=='string'||!i||i.version!==1||i.characterRaw!==cr||!/^([0-9a-f]{8}-){1}[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(i.characterId))throw Error('Karaktärsidentiteten kunde inte verifieras.');
    const p=places.find(p=>p.id===START);
    if(!p)throw Error('Startplatsen saknas.');
    return {ok:true,name:c.name,characterId:i.characterId,placeId:START,placeName:p.name,source:'Karaktärens befintliga startplats (inte en ny positionssparning)'};
  }catch(e){return {ok:false,reason:e.message||'Okänt läsfel.'};}
}
function route(from,to,places){
  const a=places.find(p=>p.id===from),b=places.find(p=>p.id===to);
  if(!a||!b)return {ok:false,reason:'Okänd plats.'};
  if(from===to)return {ok:false,reason:'Du är redan här.'};
  if(!((from==='VG-SKARA-001'&&to==='VG-VARNHEM-003')||(from==='VG-VARNHEM-003'&&to==='VG-SKARA-001')))return {ok:false,reason:'Ingen färdväg är definierad i denna förhandsvisning.'};
  return {ok:true,from:a.name,to:b.name,estimatedDays:1,warning:'Endast illustrativ tidskostnad. Resa och kalenderändring är INTE aktiverade.'};
}
root.KB_B1_POSITION_PREVIEW=Object.freeze({inspect,route});
})(window);
