// KB-03.7.2 / IMP-025 3H.12.4 – read-only slot validation.
(function () {
  'use strict';
  const PREFIX = 'kronor-och-blod.slot.v1.';
  const BASE = 'kronor-och-blod.';
  const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const STEMS = ['story', 'encounter', 'investigation', 'calendar', 'daylog', 'life-background'];
  const allowed = new Set([BASE + 'character.v1', BASE + 'character.identity.v1']);
  for (const stem of STEMS) {
    allowed.add(BASE + stem + '.v1');
    allowed.add(BASE + stem + '.owner.v1');
  }
  function fail(reason) { return Object.freeze({ ok: false, reason }); }
  function inspect(id) {
    try {
      if (typeof id !== 'string' || !ID_RE.test(id)) return fail('Ogiltigt karaktärs-ID.');
      const raw = localStorage.getItem(PREFIX + id);
      if (raw === null) return fail('Sparplatsen finns inte i denna webbläsare.');
      const slot = JSON.parse(raw);
      if (!slot || slot.format !== 'kronor-och-blod-character-slot' || slot.version !== 1 || slot.characterId !== id ||
          typeof slot.name !== 'string' || !slot.entries || typeof slot.entries !== 'object' || Array.isArray(slot.entries)) {
        return fail('Sparplatsens format är ogiltigt.');
      }
      const entries = slot.entries;
      if (Object.keys(entries).some(k => !allowed.has(k) || typeof entries[k] !== 'string')) return fail('Okända eller ogiltiga data i sparplatsen.');
      const characterRaw = entries[BASE + 'character.v1'];
      const identityRaw = entries[BASE + 'character.identity.v1'];
      if (typeof characterRaw !== 'string' || typeof identityRaw !== 'string') return fail('Karaktär eller identitet saknas.');
      const character = JSON.parse(characterRaw);
      const identity = JSON.parse(identityRaw);
      if (!character || character.version !== 1 || character.name !== slot.name ||
          typeof character.background !== 'string' || !window.KB_CHARACTER ||
          !Object.prototype.hasOwnProperty.call(window.KB_CHARACTER.BACKGROUNDS, character.background) ||
          !identity || identity.version !== 1 || identity.characterId !== id || identity.characterRaw !== characterRaw) {
        return fail('Karaktärens identitet eller bakgrund stämmer inte.');
      }
      const checks = [];
      for (const stem of STEMS) {
        const dataKey = BASE + stem + '.v1';
        const ownerKey = BASE + stem + '.owner.v1';
        const data = entries[dataKey];
        const ownerRaw = entries[ownerKey];
        if (ownerRaw !== undefined && data === undefined) return fail('Ägarpost saknar data: ' + stem);
        if (ownerRaw === undefined && data !== undefined) return fail('Ägar-ID saknas: ' + stem);
        if (ownerRaw !== undefined) {
          const owner = JSON.parse(ownerRaw);
          if (!owner || owner.version !== 1 || owner.characterId !== id) return fail('Fel ägare: ' + stem);
          const rawField = stem === 'calendar' ? 'calendarRaw' : stem === 'daylog' ? 'daylogRaw' :
            stem === 'life-background' ? 'backgroundRaw' : null;
          if (rawField && owner[rawField] !== data) return fail('Data och ägarpost skiljer sig: ' + stem);
          if (stem === 'life-background') {
            const model = window.KB_LIFE_BACKGROUND_MODEL;
            if (!model || typeof model.parse !== 'function' || !model.parse(data).ok)
              return fail('Ogiltig livsbakgrund i sparplatsen.');
          }
        }
        checks.push(stem + ': ' + (data === undefined ? 'tomt' : 'verifierat'));
      }
      return Object.freeze({ ok: true, characterId: id, name: slot.name, savedAt: slot.savedAt, checks: Object.freeze(checks) });
    } catch (_) { return fail('Sparplatsen kunde inte läsas eller valideras.'); }
  }
  window.KB_SLOT_RESTORE_PREFLIGHT = Object.freeze({ inspect });
})();
