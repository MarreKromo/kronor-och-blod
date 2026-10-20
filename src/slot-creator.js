// KB-03.7.4 / IMP-025 3H.7.1 – skapa separat, inaktiv sparplats.
// Rör aldrig aktiva sparnycklar eller befintliga sparplatser.
(function () {
  'use strict';
  const BASE = 'kronor-och-blod.';
  const PREFIX = BASE + 'slot.v1.';
  const START_PLACE = 'VG-SKARA-001';
  function newId() {
    if (!window.crypto || !crypto.getRandomValues) throw Error('Säker ID-generering saknas.');
    if (crypto.randomUUID) return crypto.randomUUID();
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 15) | 64;
    bytes[8] = (bytes[8] & 63) | 128;
    const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
    return [hex.slice(0,8), hex.slice(8,12), hex.slice(12,16), hex.slice(16,20), hex.slice(20)].join('-');
  }
  function createSlot(name, background) {
    const model = window.KB_CHARACTER;
    if (!model || !model.BACKGROUNDS) throw Error('Karaktärssystemet är inte redo.');
    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 32 ||
        /[<>\u0000-\u001f]/.test(name)) throw Error('Namnet måste vara 2–32 tecken och får inte innehålla otillåtna tecken.');
    if (!Object.prototype.hasOwnProperty.call(model.BACKGROUNDS, background)) throw Error('Ogiltig bakgrund.');
    const cleanName = name.trim();
    const character = {
      version: 1, name: cleanName, background,
      placeId: START_PLACE, attributes: { ...model.BACKGROUNDS[background].attributes }
    };
    const characterRaw = JSON.stringify(character);
    let id, slotKey;
    for (let attempt = 0; attempt < 5; attempt++) {
      id = newId();
      slotKey = PREFIX + id;
      if (localStorage.getItem(slotKey) === null &&
          (!model.get() || model.get().characterId !== id)) break;
      if (attempt === 4) throw Error('Kunde inte hitta ett ledigt karaktärs-ID.');
    }
    const identityRaw = JSON.stringify({ version: 1, characterId: id, characterRaw });
    const entries = {
      [BASE + 'character.v1']: characterRaw,
      [BASE + 'character.identity.v1']: identityRaw
    };
    const slot = {
      format: 'kronor-och-blod-character-slot', version: 1,
      characterId: id, name: cleanName, savedAt: new Date().toISOString(), entries
    };
    const raw = JSON.stringify(slot);
    // Inget skrivs förrän allt är färdigbyggt. Endast en NY slot-nyckel får skrivas.
    if (localStorage.getItem(slotKey) !== null) throw Error('Sparplatsen finns redan.');
    try {
      localStorage.setItem(slotKey, raw);
      if (localStorage.getItem(slotKey) !== raw) throw Error('Sparplatsen kunde inte verifieras.');
      const preflight = window.KB_SLOT_RESTORE_PREFLIGHT;
      if (!preflight || typeof preflight.inspect !== 'function' ||
          !preflight.inspect(id).ok) throw Error('Ny sparplats klarade inte återläsningskontrollen.');
    } catch (_) {
      // Ta endast bort den egna NYA posten, och endast om den fortfarande har samma bytes.
      try { if (localStorage.getItem(slotKey) === raw) localStorage.removeItem(slotKey); } catch (__) {}
      throw Error('Ny karaktär kunde inte sparas och verifieras.');
    }
    return Object.freeze({ characterId: id, name: cleanName, savedAt: slot.savedAt });
  }
  window.KB_SLOT_CREATOR = Object.freeze({ createSlot });
})();
