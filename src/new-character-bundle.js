// IMP-025 3H.12.7 J-A — pure builder for new character slots.
// No localStorage access, no writes, no changes to existing slots.
(function(){
'use strict';
const BASE='kronor-och-blod.';
const ID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function build(input,deps){
 if(!input||!deps||!deps.character||!deps.life)throw Error('Skapandeunderlag saknas.');
 const {name,background,characterId,lifeBackground}=input;
 if(typeof name!=='string'||name.trim().length<2||name.trim().length>32||/[<>\u0000-\u001f]/.test(name))throw Error('Ogiltigt namn.');
 if(!ID.test(characterId))throw Error('Ogiltigt ID.');
 if(!Object.prototype.hasOwnProperty.call(deps.character.BACKGROUNDS,background))throw Error('Ogiltig klassbakgrund.');
 const valid=deps.life.validate(lifeBackground);
 if(!valid.ok)throw Error('Livsbakgrund krävs: '+valid.errors.join(' '));
 const character={version:1,name:name.trim(),background,placeId:'VG-SKARA-001',attributes:{...deps.character.BACKGROUNDS[background].attributes}};
 const characterRaw=JSON.stringify(character);
 const identityRaw=JSON.stringify({version:1,characterId,characterRaw});
 const lifeRaw=JSON.stringify({version:1,upbringing:lifeBackground.upbringing,familySituation:lifeBackground.familySituation,past:lifeBackground.past,ambition:lifeBackground.ambition,biography:lifeBackground.biography});
 const ownerRaw=JSON.stringify({version:1,characterId,backgroundRaw:lifeRaw});
 const entries={
  [BASE+'character.v1']:characterRaw,
  [BASE+'character.identity.v1']:identityRaw,
  [BASE+'life-background.v1']:lifeRaw,
  [BASE+'life-background.owner.v1']:ownerRaw
 };
 return Object.freeze({format:'kronor-och-blod-character-slot',version:1,characterId,name:name.trim(),savedAt:new Date().toISOString(),entries:Object.freeze(entries)});
}
window.KB_NEW_CHARACTER_BUNDLE=Object.freeze({build});
})();
