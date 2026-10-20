// IMP-025 3H.12.7 J-C: isolated, create-only slot writer.
// Does not run automatically. Caller supplies storage, builder and verifier.
(function(){
'use strict';
const PREFIX='kronor-och-blod.slot.v1.';
const ID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function create(input,{storage,builder,character,life,verify}={}){
 if(!storage||!builder||typeof builder.build!=='function'||!character||!life||typeof verify!=='function')
  throw Error('Säkerhetsberoenden saknas.');
 if(!input||!ID.test(input.characterId))throw Error('Ogiltigt karaktärs-ID.');
 const key=PREFIX+input.characterId;
 if(storage.getItem(key)!==null)throw Error('Sparplatsen finns redan. Ingenting skrivs över.');
 const slot=builder.build(input,{character,life});
 if(slot.characterId!==input.characterId||slot.format!=='kronor-och-blod-character-slot')
  throw Error('Sparpaketets identitet stämmer inte.');
 const raw=JSON.stringify(slot);
 if(storage.getItem(key)!==null)throw Error('Sparplatsen upptogs innan skrivning.');
 try{
  storage.setItem(key,raw);
  if(storage.getItem(key)!==raw)throw Error('Skrivningen kunde inte verifieras.');
  const result=verify(input.characterId,storage);
  if(!result||result.ok!==true||result.characterId!==input.characterId)
   throw Error('Återläsningskontrollen misslyckades.');
 }catch(err){
  // Roll back only bytes created by this call. Never touch other keys.
  try{if(storage.getItem(key)===raw)storage.removeItem(key);}catch(_){}
  throw Error('Sparningen stoppades: '+err.message);
 }
 return Object.freeze({characterId:slot.characterId,name:slot.name,savedAt:slot.savedAt});
}
window.KB_NEW_CHARACTER_WRITER=Object.freeze({create});
})();
