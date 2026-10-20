// IMP-025 · 3H.12.6 — explicit, karaktärsägd livsbakgrund.
// Ingen automatisk skrivning, ingen UI, ingen migration.
(function () {
  'use strict';
  const BASE = 'kronor-och-blod.';
  const DATA = BASE + 'life-background.v1';
  const OWNER = BASE + 'life-background.owner.v1';
  const CHAR = BASE + 'character.v1';
  const IDENTITY = BASE + 'character.identity.v1';
  const JOURNAL = BASE + 'life-background.write-journal.v1';
  const SWITCH_JOURNAL = BASE + 'switch.journal.v1';
  const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  let busy = false;
  const own = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
  function fail(message) { throw Error(message); }
  function activeId() {
    const c = window.KB_CHARACTER && window.KB_CHARACTER.get();
    if (!c || typeof c.characterId !== 'string' || !ID_RE.test(c.characterId)) fail('Ingen verifierbar aktiv karaktär.');
    const raw = localStorage.getItem(CHAR);
    const identityRaw = localStorage.getItem(IDENTITY);
    if (raw === null || identityRaw === null) fail('Karaktär eller identitet saknas.');
    const character = JSON.parse(raw), identity = JSON.parse(identityRaw);
    if (!character || character.version !== 1 || character.name !== c.name ||
        !identity || identity.version !== 1 || identity.characterId !== c.characterId || identity.characterRaw !== raw) {
      fail('Karaktärens identitet stämmer inte.');
    }
    return c.characterId;
  }
  function validatePair(data, owner, id) {
    if ((data === null) !== (owner === null)) fail('Livsbakgrund saknar ett komplett ägarpar.');
    if (data === null) return;
    const record = JSON.parse(owner);
    if (!record || record.version !== 1 || record.characterId !== id || record.backgroundRaw !== data) fail('Livsbakgrundens ägare stämmer inte.');
    const model = window.KB_LIFE_BACKGROUND_MODEL;
    if (!model || typeof model.parse !== 'function' || !model.parse(data).ok) fail('Livsbakgrunden har ogiltigt format.');
  }
  function checkJournal(j) {
    if (!j || j.version !== 1 || typeof j.characterId !== 'string' || !ID_RE.test(j.characterId) ||
        !(j.beforeData === null || typeof j.beforeData === 'string') ||
        !(j.beforeOwner === null || typeof j.beforeOwner === 'string') ||
        typeof j.characterRaw !== 'string' || typeof j.identityRaw !== 'string') fail('Livsbakgrundsjournalen är ogiltig.');
    const identity = JSON.parse(j.identityRaw);
    if (!identity || identity.version !== 1 || identity.characterId !== j.characterId || identity.characterRaw !== j.characterRaw) fail('Journalens identitet är ogiltig.');
    validatePair(j.beforeData, j.beforeOwner, j.characterId);
  }
  function put(key, value) { if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value); }
  function recover() {
    const raw = localStorage.getItem(JOURNAL);
    if (raw === null) return Object.freeze({ recovered: false });
    if (localStorage.getItem(SWITCH_JOURNAL) !== null) fail('Karaktärsbyte väntar på återställning.');
    const j = JSON.parse(raw);
    checkJournal(j);
    if (localStorage.getItem(CHAR) !== j.characterRaw || localStorage.getItem(IDENTITY) !== j.identityRaw) fail('Karaktären har ändrats sedan journalen skapades.');
    put(DATA, j.beforeData); put(OWNER, j.beforeOwner);
    if (localStorage.getItem(DATA) !== j.beforeData || localStorage.getItem(OWNER) !== j.beforeOwner) fail('Livsbakgrunden kunde inte återställas.');
    localStorage.removeItem(JOURNAL);
    if (localStorage.getItem(JOURNAL) !== null) fail('Återställningsjournalen kunde inte rensas.');
    return Object.freeze({ recovered: true });
  }
  function save(value) {
    if (busy) fail('En livsbakgrundssparning pågår redan.');
    busy = true;
    try {
      if (localStorage.getItem(JOURNAL) !== null || localStorage.getItem(SWITCH_JOURNAL) !== null) fail('En oavslutad sparning måste återställas först.');
      const id = activeId();
      const model = window.KB_LIFE_BACKGROUND_MODEL;
      if (!model || typeof model.validate !== 'function') fail('Livsbakgrundsmodellen saknas.');
      const validation = model.validate(value);
      if (!validation.ok) fail('Ogiltig livsbakgrund: ' + validation.errors.join(' '));
      const beforeData = localStorage.getItem(DATA), beforeOwner = localStorage.getItem(OWNER);
      validatePair(beforeData, beforeOwner, id);
      // Ändring av befintlig livsbakgrund skjuts upp tills UI erbjuder tydlig granskning.
      if (beforeData !== null) fail('Livsbakgrund finns redan. Ändring stöds inte i detta steg.');
      const characterRaw = localStorage.getItem(CHAR), identityRaw = localStorage.getItem(IDENTITY);
      const data = JSON.stringify({ version: 1, upbringing: value.upbringing,
        familySituation: value.familySituation, past: value.past,
        ambition: value.ambition, biography: value.biography });
      const owner = JSON.stringify({ version: 1, characterId: id, backgroundRaw: data });
      const journal = JSON.stringify({ version: 1, characterId: id, characterRaw, identityRaw, beforeData, beforeOwner });
      localStorage.setItem(JOURNAL, journal);
      if (localStorage.getItem(JOURNAL) !== journal) fail('Sparjournalen kunde inte verifieras.');
      try {
        localStorage.setItem(DATA, data);
        localStorage.setItem(OWNER, owner);
        if (localStorage.getItem(DATA) !== data || localStorage.getItem(OWNER) !== owner) fail('Livsbakgrunden kunde inte verifieras.');
        if (localStorage.getItem(CHAR) !== characterRaw || localStorage.getItem(IDENTITY) !== identityRaw) fail('Karaktären ändrades under sparningen.');
        localStorage.removeItem(JOURNAL);
        if (localStorage.getItem(JOURNAL) !== null) fail('Sparjournalen kunde inte avslutas.');
      } catch (error) {
        try { recover(); } catch (_) { fail('Sparningen avbröts. Återställning krävs innan du fortsätter.'); }
        fail('Sparningen avbröts och återställdes: ' + error.message);
      }
      return Object.freeze({ ok: true, characterId: id });
    } finally { busy = false; }
  }
  function inspect() {
    if (localStorage.getItem(JOURNAL) !== null || localStorage.getItem(SWITCH_JOURNAL) !== null) fail('Oavslutad sparjournal finns.');
    const id = activeId(), data = localStorage.getItem(DATA), owner = localStorage.getItem(OWNER);
    validatePair(data, owner, id);
    return Object.freeze({ exists: data !== null, characterId: id, value: data === null ? null : window.KB_LIFE_BACKGROUND_MODEL.parse(data).value });
  }
  window.KB_LIFE_BACKGROUND_SAVE = Object.freeze({ save, inspect, recover });
})();
