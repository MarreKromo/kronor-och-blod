// KB-B1.2: pure, read-only position model. No storage writes or game mutations.
(function(root){'use strict';
const START='VG-SKARA-001';
const ROUTES=Object.freeze([Object.freeze({from:'VG-SKARA-001',to:'VG-VARNHEM-003',days:1})]);
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const OWN=Object.prototype.hasOwnProperty;
function fail(message){return Object.freeze({ok:false,reason:message});}
function places(){return Array.isArray(root.KB_PLACES)?root.KB_PLACES:[];}
function validPlace(id){return typeof id==='string'&&places().some(p=>p&&p.id===id);}
function parse(raw){try{return JSON.parse(raw);}catch(_){return null;}}
function inspect(storage){
 try{
  if(!storage||typeof storage.getItem!=='function')return fail('Lagring saknas.');
  const raw=storage.getItem('kronor-och-blod.character.v1');
  const idRaw=storage.getItem('kronor-och-blod.character.identity.v1');
  if(typeof raw!=='string'||typeof idRaw!=='string')return fail('Aktiv karaktär eller identitet saknas.');
  const character=parse(raw),identity=parse(idRaw);
  if(!character||character.version!==1||typeof character.name!=='string'||!identity||identity.version!==1||!UUID.test(identity.characterId)||identity.characterRaw!==raw)return fail('Karaktärens identitet kan inte verifieras.');
  // Legacy character.placeId is a starting place, not evidence of travel.
  if(character.placeId!==START)return fail('Okänt äldre startläge; kräver säker migration.');
  if(!validPlace(START))return fail('Startplats saknas i platsregistret.');
  return Object.freeze({ok:true,characterId:identity.characterId,name:character.name,placeId:START,source:'legacy-start',persisted:false});
 }catch(_){return fail('Karaktärsdata kunde inte läsas.');}
}
function route(from,to){
 if(!validPlace(from)||!validPlace(to))return fail('Ogiltigt plats-ID.');
 if(from===to)return fail('Du befinner dig redan här.');
 const r=ROUTES.find(x=>x.from===from&&x.to===to);
 if(!r)return fail('Ingen färdväg är öppnad mellan platserna.');
 return Object.freeze({ok:true,from:r.from,to:r.to,days:r.days,previewOnly:true});
}
function validateRecord(record,characterId){
 if(!UUID.test(characterId||''))return fail('Ogiltigt karaktärs-ID.');
 if(!record||typeof record!=='object'||Array.isArray(record)||record.version!==1||record.characterId!==characterId||!validPlace(record.placeId)||!Number.isSafeInteger(record.revision)||record.revision<0)return fail('Positionspost är ogiltig eller tillhör fel karaktär.');
 if(Object.keys(record).some(k=>!['version','characterId','placeId','revision'].includes(k)))return fail('Okända positionsfält.');
 return Object.freeze({ok:true,placeId:record.placeId,revision:record.revision});
}
root.KB_B1_POSITION_MODEL=Object.freeze({START,ROUTES,inspect,route,validateRecord});
})(window);
