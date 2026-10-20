/* Kronor & Blod V2-03.2B: safe, read-only data contract. No storage writes. */
(function () {
  'use strict';
  const VERSION = 2;
  const START_PLACE = 'keldra';
  const PREFIX = 'kronor-och-blod.fantasy.v2.';
  const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const backgroundModel = window.KB_LIFE_BACKGROUND_MODEL;
  const isObject = x => x !== null && typeof x === 'object' && !Array.isArray(x);
  function validateCharacter(value) {
    const errors = [];
    if (!isObject(value)) return {ok:false, errors:['Karaktären måste vara ett objekt.']};
    const allowed = ['version','id','name','placeId','background'];
    for (const key of Object.keys(value)) if (!allowed.includes(key)) errors.push('Okänt karaktärsfält: '+key);
    if (value.version !== VERSION) errors.push('Fel karaktärsversion.');
    if (typeof value.id !== 'string' || !UUID.test(value.id)) errors.push('Ogiltigt karaktärs-ID.');
    if (typeof value.name !== 'string' || value.name.trim().length < 2 || value.name.trim().length > 32 || /[<>\u0000-\u001f\u007f]/.test(value.name)) errors.push('Ogiltigt namn.');
    if (value.placeId !== START_PLACE) errors.push('Okänd startplats.');
    if (!backgroundModel || typeof backgroundModel.validate !== 'function') errors.push('Bakgrundsmodellen saknas.');
    else {
      const check = backgroundModel.validate(value.background);
      if (!check.ok) errors.push(...check.errors);
    }
    return {ok:errors.length===0,errors};
  }
  function characterKey(id) {
    if (typeof id !== 'string' || !UUID.test(id)) throw Error('Ogiltigt karaktärs-ID.');
    return PREFIX+'character.'+id;
  }
  function storyKey(id) { return characterKey(id)+'.story'; }
  function calendarKey(id) { return characterKey(id)+'.calendar'; }
  function journalKey(id) { return characterKey(id)+'.journal'; }
  function activeKey() { return PREFIX+'active-character-id'; }
  function readCharacter(id) {
    const key=characterKey(id);
    try {
      const raw=localStorage.getItem(key);
      if (raw===null) return {ok:false,error:'not-found'};
      const value=JSON.parse(raw),check=validateCharacter(value);
      if (!check.ok || value.id!==id) return {ok:false,error:'invalid',details:check.errors};
      return {ok:true,value};
    } catch (_) {return {ok:false,error:'unreadable'};}
  }
  window.KB_V2_DATA_CONTRACT=Object.freeze({VERSION,START_PLACE,PREFIX,validateCharacter,characterKey,storyKey,calendarKey,journalKey,activeKey,readCharacter});
})();
