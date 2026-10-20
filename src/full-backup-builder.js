// KB-A2.2: isolated, read-only backup builder. Not wired to production UI.
(function () {
  'use strict';
  const BASE = 'kronor-och-blod.';
  const SLOT = BASE + 'slot.v1.';
  const JOURNALS = [BASE + 'switch.journal.v1', BASE + 'life-background.write-journal.v1'];
  const STEMS = ['story', 'encounter', 'investigation', 'calendar', 'daylog', 'life-background'];
  const ACTIVE = [BASE + 'character.v1', BASE + 'character.identity.v1'];
  STEMS.forEach(s => ACTIVE.push(BASE + s + '.v1', BASE + s + '.owner.v1'));
  const ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  const fail = m => { throw Error(m); };
  const parse = (raw, label) => { try { return JSON.parse(raw); } catch (_) { fail('Ogiltig JSON: ' + label); } };
  function checkEntries(entries, id, label) {
    if (!entries || typeof entries !== 'object' || Array.isArray(entries)) fail(label + ': saknar poster.');
    if (Object.keys(entries).some(k => !ACTIVE.includes(k) || typeof entries[k] !== 'string')) fail(label + ': okända eller ogiltiga poster.');
    const c = entries[BASE + 'character.v1'], i = entries[BASE + 'character.identity.v1'];
    if (!c || !i) fail(label + ': karaktär eller identitet saknas.');
    const char = parse(c, label + ' karaktär'), identity = parse(i, label + ' identitet');
    if (!char || char.version !== 1 || typeof char.name !== 'string' ||
        !identity || identity.version !== 1 || identity.characterId !== id || identity.characterRaw !== c) fail(label + ': fel identitet.');
    for (const stem of STEMS) {
      const d = entries[BASE + stem + '.v1'], o = entries[BASE + stem + '.owner.v1'];
      if ((d === undefined) !== (o === undefined)) fail(label + ': saknar ägarpar för ' + stem);
      if (o !== undefined) {
        const owner = parse(o, label + ' ägare ' + stem);
        const field = stem === 'calendar' ? 'calendarRaw' : stem === 'daylog' ? 'daylogRaw' : stem === 'life-background' ? 'backgroundRaw' : null;
        if (!owner || owner.version !== 1 || owner.characterId !== id || (field && owner[field] !== d)) fail(label + ': fel ägare för ' + stem);
      }
    }
    return char;
  }
  function build(storage, createdAt) {
    if (!storage || typeof storage.getItem !== 'function' || typeof storage.key !== 'function' || !Number.isSafeInteger(storage.length)) fail('Lagringsgränssnitt saknas.');
    for (const key of JOURNALS) if (storage.getItem(key) !== null) fail('Oavslutad transaktion: ' + key);
    const keys = [];
    for (let n = 0; n < storage.length; n++) {
      const key = storage.key(n);
      if (typeof key !== 'string') fail('Ogiltig lagringsnyckel.');
      keys.push(key);
    }
    if (new Set(keys).size !== keys.length) fail('Duplicerade lagringsnycklar.');
    const activeEntries = {}, slots = {}, otherEntries = {};
    for (const key of keys.sort()) {
      if (!key.startsWith(BASE)) continue;
      const raw = storage.getItem(key);
      if (typeof raw !== 'string') fail('Lagringen ändrades under export: ' + key);
      if (ACTIVE.includes(key)) activeEntries[key] = raw;
      else if (key.startsWith(SLOT)) slots[key] = raw;
      else if (key === BASE + 'backup.pre-migration.v1') otherEntries[key] = raw;
      else fail('Okänd sparnyckel kräver granskning: ' + key);
    }
    let activeCharacterId = null;
    const hasActive = Object.keys(activeEntries).length > 0;
    if (hasActive) {
      const identity = parse(activeEntries[BASE + 'character.identity.v1'], 'aktiv identitet');
      activeCharacterId = identity && identity.characterId;
      if (!ID.test(activeCharacterId || '')) fail('Aktivt ID saknas.');
      checkEntries(activeEntries, activeCharacterId, 'Aktiv karaktär');
    }
    for (const [key, raw] of Object.entries(slots)) {
      const id = key.slice(SLOT.length);
      if (!ID.test(id)) fail('Ogiltig slotnyckel: ' + key);
      const slot = parse(raw, key);
      if (!slot || slot.format !== 'kronor-och-blod-character-slot' || slot.version !== 1 ||
          slot.characterId !== id || typeof slot.name !== 'string') fail('Ogiltig slot: ' + key);
      const char = checkEntries(slot.entries, id, key);
      if (char.name !== slot.name) fail('Slotnamn skiljer sig: ' + key);
    }
    // Fail closed if keys or raw values changed during read.
    if (storage.length !== keys.length) fail('Lagringen ändrades under export.');
    for (const key of keys) {
      const value = storage.getItem(key);
      const recorded = own(activeEntries,key) ? activeEntries[key] : own(slots,key) ? slots[key] : own(otherEntries,key) ? otherEntries[key] : null;
      if (key.startsWith(BASE) && value !== recorded) fail('Lagringen ändrades under export: ' + key);
    }
    const date = createdAt === undefined ? new Date().toISOString() : createdAt;
    if (typeof date !== 'string' || !Number.isFinite(Date.parse(date))) fail('Ogiltigt exportdatum.');
    return Object.freeze({
      format: 'kronor-och-blod-full-backup', version: 2, createdAt: date,
      activeCharacterId, activeEntries, slots, otherEntries,
      manifest: {slotCount: Object.keys(slots).length, keyCount: Object.keys(activeEntries).length + Object.keys(slots).length + Object.keys(otherEntries).length,
                 checksumAlgorithm: null, checksum: null}
    });
  }
  // A2.2 intentionally has no file download, import, write, or checksum yet.
  window.KB_FULL_BACKUP_BUILDER = Object.freeze({build});
})();
