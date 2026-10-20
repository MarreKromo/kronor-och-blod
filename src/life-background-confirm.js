// IMP-025 3H.12.7 E — pure confirmation gate, NO storage writes.
// A future UI must call prepare() after preview, and approve() on an explicit separate click.
// approve() returns a validated value, never saves it.
(function () {
  'use strict';
  const ID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const CHAR='kronor-och-blod.character.v1';
  const OWNER='kronor-och-blod.character.identity.v1';
  const SWITCH='kronor-och-blod.switch.journal.v1';
  const WRITE='kronor-och-blod.life-background.write-journal.v1';
  const DATA='kronor-och-blod.life-background.v1';
  const DATA_OWNER='kronor-och-blod.life-background.owner.v1';
  const own=(v,k)=>Object.prototype.hasOwnProperty.call(v,k);
  function create(deps) {
    if (!deps || !deps.storage || !deps.character || !deps.model) throw Error('Säkerhetsberoenden saknas.');
    const {storage,character,model}=deps;
    let pending=null;
    function clear(){pending=null;}
    function snapshot() {
      const c=character.get();
      if (!c || !ID.test(c.characterId) || typeof c.name!=='string') throw Error('Aktiv karaktär saknas.');
      const raw=storage.getItem(CHAR), idraw=storage.getItem(OWNER);
      if (raw===null || idraw===null) throw Error('Karaktärens identitet saknas.');
      const saved=JSON.parse(raw), identity=JSON.parse(idraw);
      if (!saved || saved.version!==1 || saved.name!==c.name ||
          !identity || identity.version!==1 || identity.characterId!==c.characterId ||
          identity.characterRaw!==raw) throw Error('Felaktig karaktärsidentitet.');
      if (storage.getItem(SWITCH)!==null || storage.getItem(WRITE)!==null) throw Error('Oavslutad journal.');
      const data=storage.getItem(DATA), owner=storage.getItem(DATA_OWNER);
      if ((data===null)!==(owner===null)) throw Error('Ofullständigt livsbakgrundspar.');
      if (data!==null) {
        const o=JSON.parse(owner);
        if (!o || o.version!==1 || o.characterId!==c.characterId || o.backgroundRaw!==data ||
            !model.parse(data).ok) throw Error('Livsbakgrunden kan inte verifieras.');
        throw Error('Livsbakgrund finns redan. Ändring stöds inte.');
      }
      return {id:c.characterId,raw,idraw};
    }
    function canonical(value){
      if (!value || !model.validate(value).ok) throw Error('Ogiltiga livsbakgrundsval.');
      return JSON.stringify({version:1,upbringing:value.upbringing,familySituation:value.familySituation,
        past:value.past,ambition:value.ambition,biography:value.biography});
    }
    function prepare(value) {
      clear();
      const s=snapshot(), raw=canonical(value);
      pending={s,raw};
      return Object.freeze({ok:true,characterId:s.id,value:Object.freeze(JSON.parse(raw))});
    }
    function approve(value) {
      const p=pending; clear(); // single-use even if subsequent checks fail
      if (!p) throw Error('Förhandsgranska innan du bekräftar.');
      const s=snapshot(), raw=canonical(value);
      if (s.id!==p.s.id || s.raw!==p.s.raw || s.idraw!==p.s.idraw || raw!==p.raw)
        throw Error('Karaktär eller val har ändrats. Förhandsgranska igen.');
      return Object.freeze({ok:true,characterId:s.id,value:Object.freeze(JSON.parse(raw))});
    }
    return Object.freeze({prepare,approve,cancel:clear});
  }
  window.KB_LIFE_BACKGROUND_CONFIRM=Object.freeze({create});
})();
