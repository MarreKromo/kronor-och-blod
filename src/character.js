// KB-03 / IMP-025 steg 3B – separat stabil identitet; äldre sparformat bevaras.
(function () {
  'use strict';
  const KEY = 'kronor-och-blod.character.v1';
  const BACKUP_KEY = 'kronor-och-blod.backup.pre-migration.v1';
  const ID_KEY = 'kronor-och-blod.character.identity.v1';
  const SAVE_KEYS = [KEY, 'kronor-och-blod.story.v1', 'kronor-och-blod.encounter.v1', 'kronor-och-blod.investigation.v1', 'kronor-och-blod.calendar.v1', 'kronor-och-blod.daylog.v1'];
  let backupStatus = 'not-needed';
  try {
    if (localStorage.getItem(BACKUP_KEY) !== null) backupStatus = 'already-exists';
    else if (localStorage.getItem(KEY) !== null) {
      const entries = {};
      SAVE_KEYS.forEach(key => { const raw = localStorage.getItem(key); if (raw !== null) entries[key] = raw; });
      const snapshot = JSON.stringify({ version: 1, createdAt: new Date().toISOString(), entries });
      localStorage.setItem(BACKUP_KEY, snapshot);
      backupStatus = localStorage.getItem(BACKUP_KEY) === snapshot ? 'created' : 'failed';
    }
  } catch (_) { backupStatus = 'failed'; }
  window.KB_SAVE_GUARD = Object.freeze({ status: backupStatus, backupKey: BACKUP_KEY });

  const START_PLACE = 'VG-SKARA-001';
  const BACKGROUNDS = Object.freeze({
    bonde: { label: 'Bonde', description: 'Uppvuxen med jordbruk och hårt arbete.', attributes: { styrka: 3, list: 1, anseende: 1 } },
    hantverkare: { label: 'Hantverkare', description: 'Kunnig i ett yrke och van vid byteshandel.', attributes: { styrka: 2, list: 2, anseende: 1 } },
    skrivare: { label: 'Skrivarkunnig', description: 'Har lärt sig läsa, skriva och föra räkenskaper.', attributes: { styrka: 1, list: 3, anseende: 1 } },
    friboren: { label: 'Friboren', description: 'Har släktband som kan öppna dörrar.', attributes: { styrka: 1, list: 2, anseende: 2 } }
  });
  let character = null;
  let characterId = null;
  function validName(name) { return typeof name === 'string' && name.trim().length >= 2 && name.trim().length <= 32 && !/[<>\u0000-\u001f]/.test(name); }
  function newId() {
    if (typeof crypto === 'undefined' || !crypto.getRandomValues) throw new Error('Säker ID-generering saknas i webbläsaren.');
    if (crypto.randomUUID) return crypto.randomUUID();
    const bytes = new Uint8Array(16); crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
    const hex = Array.from(bytes, b => b.toString(16).padStart(2,'0')).join('');
    return [hex.slice(0,8),hex.slice(8,12),hex.slice(12,16),hex.slice(16,20),hex.slice(20)].join('-');
  }
  // Sidecar binder ID till exakta bytes i befintlig character.v1; filen skrivs inte om.
  function ensureIdentity(raw) {
    if (backupStatus === 'failed') return null;
    try {
      const old = JSON.parse(localStorage.getItem(ID_KEY) || 'null');
      if (old && old.version === 1 && typeof old.characterId === 'string' && /^[0-9a-f-]{36}$/i.test(old.characterId) && old.characterRaw === raw) return old.characterId;
      const id = newId();
      const record = JSON.stringify({ version: 1, characterId: id, characterRaw: raw });
      localStorage.setItem(ID_KEY, record);
      return localStorage.getItem(ID_KEY) === record ? id : null;
    } catch (_) { return null; }
  }
  function create(name, background) {
    if (!validName(name)) throw new Error('Namnet måste innehålla 2–32 tecken.');
    if (!Object.prototype.hasOwnProperty.call(BACKGROUNDS, background)) throw new Error('Ogiltig bakgrund.');
    if (backupStatus === 'failed') throw new Error('Säkerhetskopian misslyckades. Skapandet avbröts.');
    const next = { version: 1, name: name.trim(), background, placeId: START_PLACE, attributes: { ...BACKGROUNDS[background].attributes } };
    const raw = JSON.stringify(next);
    const id = newId();
    // Förbered identiteten först, men lämna gamla sparningar orörda.
    try {
      const record = JSON.stringify({ version: 1, characterId: id, characterRaw: raw });
      localStorage.setItem(ID_KEY, record);
      if (localStorage.getItem(ID_KEY) !== record) throw new Error('Identiteten kunde inte sparas.');
      localStorage.setItem(KEY, raw);
      if (localStorage.getItem(KEY) !== raw) throw new Error('Karaktären kunde inte sparas.');
    } catch (_) { throw new Error('Karaktären kunde inte sparas säkert.'); }
    character = next; characterId = id; return get();
  }
  function get() { return character ? { ...JSON.parse(JSON.stringify(character)), characterId } : null; }
  function load() {
    try {
      const raw = localStorage.getItem(KEY); if (!raw) { character = null; characterId = null; return null; }
      const value = JSON.parse(raw);
      if (!value || value.version !== 1 || !validName(value.name) || !Object.prototype.hasOwnProperty.call(BACKGROUNDS, value.background) || value.placeId !== START_PLACE) return null;
      character = { version: 1, name: value.name.trim(), background: value.background, placeId: START_PLACE, attributes: { ...BACKGROUNDS[value.background].attributes } };
      characterId = ensureIdentity(raw);
      return get();
    } catch (_) { return null; }
  }
  function reset() {
    try { localStorage.removeItem(KEY); localStorage.removeItem(ID_KEY); character = null; characterId = null; return true; }
    catch (_) { return false; }
  }
  load();
  window.KB_CHARACTER = Object.freeze({ BACKGROUNDS, create, get, load, reset });
})();
