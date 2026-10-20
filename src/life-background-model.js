// SVERIGE: Kronor & Blod — IMP-025 / 3H.12.3
// Pure, read-only schema and validation. No storage or UI side effects.
(function () {
  'use strict';
  const OPTIONS = Object.freeze({
    upbringing: Object.freeze(['farm', 'craft', 'letters', 'freeborn']),
    familySituation: Object.freeze(['together', 'distant', 'alone']),
    past: Object.freeze(['ordinary', 'debt', 'promise', 'conflict']),
    ambition: Object.freeze(['farmstead', 'trade', 'travel', 'influence'])
  });
  const LABELS = Object.freeze({
    upbringing: Object.freeze({farm:'Jordbruk',craft:'Hantverk',letters:'Skriftkunskap',freeborn:'Friboren uppväxt'}),
    familySituation: Object.freeze({together:'Familjen finns nära',distant:'Distanserad från familjen',alone:'Utan känd familj'}),
    past: Object.freeze({ordinary:'En vanlig uppväxt',debt:'En skuld',promise:'Ett löfte',conflict:'En konflikt'}),
    ambition: Object.freeze({farmstead:'Egen gård',trade:'Handel',travel:'Resor',influence:'Inflytande'})
  });
  const FIELDS = Object.freeze(['version','upbringing','familySituation','past','ambition','biography']);
  const MAX_BIO_LENGTH = 500;
  function isPlainObject(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
  }
  function validate(value) {
    const errors = [];
    if (!isPlainObject(value)) return Object.freeze({ok:false,errors:Object.freeze(['Bakgrunden måste vara ett objekt.'])});
    for (const key of Object.keys(value)) {
      if (!FIELDS.includes(key)) errors.push('Okänt fält: ' + key);
    }
    if (value.version !== 1) errors.push('Okänd bakgrundsversion.');
    for (const field of ['upbringing','familySituation','past','ambition']) {
      if (typeof value[field] !== 'string' || !OPTIONS[field].includes(value[field])) errors.push('Ogiltigt val: ' + field);
    }
    if (typeof value.biography !== 'string' || value.biography.length > MAX_BIO_LENGTH || /[\u0000-\u001f\u007f]/.test(value.biography)) {
      errors.push('Biografin måste vara text, högst 500 tecken, utan kontrolltecken.');
    }
    return Object.freeze({ok:errors.length === 0,errors:Object.freeze(errors)});
  }
  function parse(raw) {
    if (typeof raw !== 'string') return Object.freeze({ok:false,errors:Object.freeze(['Bakgrundsdata saknas eller är inte text.'])});
    try {
      const value = JSON.parse(raw);
      const result = validate(value);
      if (!result.ok) return result;
      return Object.freeze({ok:true,errors:Object.freeze([]),value:Object.freeze({
        version:1,upbringing:value.upbringing,familySituation:value.familySituation,
        past:value.past,ambition:value.ambition,biography:value.biography
      })});
    } catch (_) {return Object.freeze({ok:false,errors:Object.freeze(['Bakgrundsdata är inte giltig JSON.'])});}
  }
  window.KB_LIFE_BACKGROUND_MODEL = Object.freeze({OPTIONS,LABELS,MAX_BIO_LENGTH,validate,parse});
})();
