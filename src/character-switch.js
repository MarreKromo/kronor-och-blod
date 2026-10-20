// KB-03.9.1 / IMP-025 3H.9.1 – transaktionsmotor för karaktärsbyte.
// INTE inkopplad i index.html förrän återstartsskyddet finns på plats.
// Förhindrar byte om sparningar är inkonsekventa. Återställer vid fel.
(function () {
  'use strict';
  const BASE = 'kronor-och-blod.';
  const PREFIX = BASE + 'slot.v1.';
  const JOURNAL = BASE + 'switch.journal.v1';
  const STEMS = ['story', 'encounter', 'investigation', 'calendar', 'daylog'];
  const KEYS = [BASE + 'character.v1', BASE + 'character.identity.v1'];
  STEMS.forEach(stem => KEYS.push(BASE + stem + '.v1', BASE + stem + '.owner.v1'));
  const ALLOWED = new Set(KEYS);
  let busy = false;
  function readActive() {
    const entries = {};
    for (const key of KEYS) {
      const raw = localStorage.getItem(key);
      if (raw !== null) entries[key] = raw;
    }
    return entries;
  }
  function apply(entries) {
    for (const key of KEYS) {
      if (Object.prototype.hasOwnProperty.call(entries, key)) localStorage.setItem(key, entries[key]);
      else localStorage.removeItem(key);
    }
  }
  function equals(entries) {
    return KEYS.every(key => localStorage.getItem(key) ===
      (Object.prototype.hasOwnProperty.call(entries, key) ? entries[key] : null));
  }
  function validEntries(entries) {
    return entries && typeof entries === 'object' && !Array.isArray(entries) &&
      Object.keys(entries).every(key => ALLOWED.has(key) && typeof entries[key] === 'string');
  }
  function restore(journal) {
    if (!journal || journal.version !== 1 || !validEntries(journal.before) ||
        typeof journal.activeSlotKey !== 'string' ||
        !journal.activeSlotKey.startsWith(PREFIX) ||
        !(journal.previousSlot === null || typeof journal.previousSlot === 'string')) {
      throw Error('Återställningsjournalen är ogiltig.');
    }
    // Behåll journalen tills återställningen är verifierad.
    apply(journal.before);
    if (journal.previousSlot === null) localStorage.removeItem(journal.activeSlotKey);
    else localStorage.setItem(journal.activeSlotKey, journal.previousSlot);
    if (!equals(journal.before) ||
        localStorage.getItem(journal.activeSlotKey) !== journal.previousSlot) {
      throw Error('Återställningen kunde inte verifieras.');
    }
    localStorage.removeItem(JOURNAL);
    if (localStorage.getItem(JOURNAL) !== null) throw Error('Journalen kunde inte rensas.');
  }
  function recover() {
    const raw = localStorage.getItem(JOURNAL);
    if (raw === null) return Object.freeze({ recovered: false });
    const journal = JSON.parse(raw);
    restore(journal);
    return Object.freeze({ recovered: true });
  }
  function switchTo(targetId) {
    if (busy) throw Error('Ett karaktärsbyte pågår redan.');
    busy = true;
    try {
      if (localStorage.getItem(JOURNAL) !== null)
        throw Error('En tidigare bytesjournal måste återställas först.');
      const check = window.KB_SWITCH_PREFLIGHT && window.KB_SWITCH_PREFLIGHT.inspect(targetId);
      if (!check || !check.ok) throw Error(check ? check.reason : 'Byteskontrollen saknas.');
      const before = readActive();
      const activeSlotKey = PREFIX + check.fromId;
      const previousSlot = localStorage.getItem(activeSlotKey);
      if (previousSlot !== null) {
        const existingCheck = window.KB_SLOT_RESTORE_PREFLIGHT.inspect(check.fromId);
        if (!existingCheck.ok) throw Error('Aktiv sparplats är skadad: ' + existingCheck.reason);
      }
      const targetRaw = localStorage.getItem(PREFIX + targetId);
      const targetSlot = JSON.parse(targetRaw);
      if (!targetSlot || targetSlot.characterId !== targetId || !validEntries(targetSlot.entries))
        throw Error('Målsparplatsen har ändrats.');
      // Dubbelkolla så att målsparplatsen inte ändrats efter förkontrollen.
      const again = window.KB_SLOT_RESTORE_PREFLIGHT.inspect(targetId);
      if (!again.ok || localStorage.getItem(PREFIX + targetId) !== targetRaw)
        throw Error('Målsparplatsen kunde inte verifieras.');
      const newActiveSlot = JSON.stringify({
        format: 'kronor-och-blod-character-slot', version: 1,
        characterId: check.fromId, name: check.fromName,
        savedAt: new Date().toISOString(), entries: before
      });
      const journal = {
        version: 1, activeSlotKey, previousSlot, before
      };
      const journalRaw = JSON.stringify(journal);
      localStorage.setItem(JOURNAL, journalRaw);
      if (localStorage.getItem(JOURNAL) !== journalRaw)
        throw Error('Bytesjournalen kunde inte verifieras.');
      try {
        localStorage.setItem(activeSlotKey, newActiveSlot);
        if (localStorage.getItem(activeSlotKey) !== newActiveSlot)
          throw Error('Den aktiva sparplatsen kunde inte verifieras.');
        const currentSlotCheck = window.KB_SLOT_RESTORE_PREFLIGHT.inspect(check.fromId);
        if (!currentSlotCheck.ok) throw Error('Den aktiva sparplatsen klarade inte kontrollen.');
        apply(targetSlot.entries);
        if (!equals(targetSlot.entries)) throw Error('De nya aktiva sparningarna kunde inte verifieras.');
        // Journalen tas bort först när alla nycklar är verifierade.
        localStorage.removeItem(JOURNAL);
        if (localStorage.getItem(JOURNAL) !== null)
          throw Error('Bytesjournalen kunde inte avslutas.');
      } catch (error) {
        try { restore(journal); }
        catch (_) { throw Error('Byte avbrutet. Återställning krävs vid nästa sidstart.'); }
        throw Error('Byte avbrutet och återställt: ' + error.message);
      }
      return Object.freeze({ ok: true, fromName: check.fromName, toName: check.toName,
        reloadRequired: true });
    } finally { busy = false; }
  }
  window.KB_CHARACTER_SWITCH = Object.freeze({ switchTo, recover });
})();
