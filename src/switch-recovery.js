// KB-03.9.2 / IMP-025 3H.9.2 – återstartsskydd.
// Ska laddas FÖRE alla andra spelmoduler i index.html (kopplas in i nästa steg).
// Återställer ofullständigt byte utan att behöva läsa in karaktärsmodellen.
(function () {
  'use strict';
  const BASE = 'kronor-och-blod.';
  const JOURNAL = BASE + 'switch.journal.v1';
  const PREFIX = BASE + 'slot.v1.';
  const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const STEMS = ['story', 'encounter', 'investigation', 'calendar', 'daylog'];
  const KEYS = [BASE + 'character.v1', BASE + 'character.identity.v1'];
  STEMS.forEach(s => KEYS.push(BASE + s + '.v1', BASE + s + '.owner.v1'));
  const allowed = new Set(KEYS);
  function validEntries(entries) {
    return entries && typeof entries === 'object' && !Array.isArray(entries) &&
      Object.keys(entries).every(k => allowed.has(k) && typeof entries[k] === 'string');
  }
  function verifyJournal(j) {
    if (!j || j.version !== 1 || !validEntries(j.before) ||
        typeof j.activeSlotKey !== 'string' || !j.activeSlotKey.startsWith(PREFIX) ||
        !(j.previousSlot === null || typeof j.previousSlot === 'string')) {
      throw Error('Återställningsjournalen är ogiltig.');
    }
    const id = j.activeSlotKey.slice(PREFIX.length);
    if (!ID_RE.test(id)) throw Error('Journalen innehåller ogiltigt karaktärs-ID.');
    const characterRaw = j.before[BASE + 'character.v1'];
    const identityRaw = j.before[BASE + 'character.identity.v1'];
    if (!characterRaw || !identityRaw) throw Error('Journalen saknar karaktärsidentitet.');
    const character = JSON.parse(characterRaw);
    const identity = JSON.parse(identityRaw);
    if (!character || character.version !== 1 || typeof character.name !== 'string' ||
        !identity || identity.version !== 1 || identity.characterId !== id ||
        identity.characterRaw !== characterRaw) {
      throw Error('Journalens karaktärsidentitet stämmer inte.');
    }
    for (const stem of STEMS) {
      const data = j.before[BASE + stem + '.v1'];
      const ownerRaw = j.before[BASE + stem + '.owner.v1'];
      if ((data === undefined) !== (ownerRaw === undefined))
        throw Error('Journalen saknar ägarpar: ' + stem);
      if (ownerRaw !== undefined) {
        const owner = JSON.parse(ownerRaw);
        if (!owner || owner.version !== 1 || owner.characterId !== id)
          throw Error('Journalen har fel ägare: ' + stem);
        const field = stem === 'calendar' ? 'calendarRaw' : stem === 'daylog' ? 'daylogRaw' : null;
        if (field && owner[field] !== data) throw Error('Journalens data stämmer inte: ' + stem);
      }
    }
  }
  function recover() {
    const raw = localStorage.getItem(JOURNAL);
    if (raw === null) return false;
    const j = JSON.parse(raw);
    verifyJournal(j);
    // Behåll journalen tills samtliga sparningar är verifierade.
    for (const key of KEYS) {
      if (Object.prototype.hasOwnProperty.call(j.before, key))
        localStorage.setItem(key, j.before[key]);
      else localStorage.removeItem(key);
    }
    if (j.previousSlot === null) localStorage.removeItem(j.activeSlotKey);
    else localStorage.setItem(j.activeSlotKey, j.previousSlot);
    for (const key of KEYS) {
      const expected = Object.prototype.hasOwnProperty.call(j.before, key) ? j.before[key] : null;
      if (localStorage.getItem(key) !== expected) throw Error('Återställningen kunde inte verifieras.');
    }
    if (localStorage.getItem(j.activeSlotKey) !== j.previousSlot)
      throw Error('Sparplatsen kunde inte återställas.');
    localStorage.removeItem(JOURNAL);
    if (localStorage.getItem(JOURNAL) !== null) throw Error('Journalen kunde inte avslutas.');
    return true;
  }
  try {
    const recovered = recover();
    window.KB_SWITCH_RECOVERY = Object.freeze({ ok: true, recovered });
  } catch (error) {
    window.KB_SWITCH_RECOVERY = Object.freeze({ ok: false, recovered: false });
    // Avbryt inläsningen så att spelets moduler inte kan skriva över osäker data.
    // En tydlig felsida ersätter dokumentet; inga spelmoduler laddas därefter.
    document.open();
    document.write('<!doctype html><html lang="sv"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sparning skyddad</title><body style="background:#151a17;color:#f2e7ce;font:18px/1.5 system-ui;padding:24px"><h1>Sparningen är skyddad</h1><p>Ett avbrutet karaktärsbyte kunde inte återställas automatiskt. Spelet har stoppats för att skydda dina sparningar.</p><p>Rensa inte webbplatsens data. Kontakta utvecklaren innan du fortsätter.</p></body></html>');
    document.close();
    if (typeof window.stop === 'function') window.stop();
  }
})();
