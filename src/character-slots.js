// KB-03.6.7 / IMP-025 3H.2 – fristående, icke-aktiverad sparplatsmotor.
// Ingen automatisk migrering, inget karaktärsbyte, inga ändringar i aktiva sparnycklar.
(function () {
  'use strict';
  const PREFIX = 'kronor-och-blod.slot.v1.';
  const KEY = 'kronor-och-blod.character.v1';
  const ID_KEY = 'kronor-och-blod.character.identity.v1';
  const SAVE_KEYS = Object.freeze([
    KEY, ID_KEY,
    'kronor-och-blod.story.v1', 'kronor-och-blod.story.owner.v1',
    'kronor-och-blod.encounter.v1', 'kronor-och-blod.encounter.owner.v1',
    'kronor-och-blod.investigation.v1', 'kronor-och-blod.investigation.owner.v1',
    'kronor-och-blod.calendar.v1', 'kronor-och-blod.calendar.owner.v1',
    'kronor-och-blod.daylog.v1', 'kronor-och-blod.daylog.owner.v1'
  ]);
  const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  function key(id) { if (typeof id !== 'string' || !ID_RE.test(id)) throw Error('Ogiltigt karaktärs-ID.'); return PREFIX + id; }
  function active() {
    const c = window.KB_CHARACTER && window.KB_CHARACTER.get();
    if (!c || !c.characterId || !ID_RE.test(c.characterId)) throw Error('Aktiv karaktär saknar giltigt ID.');
    const raw = localStorage.getItem(KEY), identityRaw = localStorage.getItem(ID_KEY);
    if (!raw || !identityRaw) throw Error('Aktiv karaktär saknar verifierbar identitet.');
    const identity = JSON.parse(identityRaw);
    if (!identity || identity.version !== 1 || identity.characterId !== c.characterId || identity.characterRaw !== raw) throw Error('Identiteten stämmer inte med karaktärssparningen.');
    const character = JSON.parse(raw);
    if (!character || character.version !== 1 || character.name !== c.name) throw Error('Karaktärens sparning stämmer inte.');
    return { id: c.characterId, name: c.name };
  }
  function snapshot() {
    const c = active(), entries = {};
    SAVE_KEYS.forEach(k => { const v = localStorage.getItem(k); if (v !== null) entries[k] = v; });
    // Säkerhetskontroll: ägarposter som finns måste peka på aktivt ID och exakta data.
    for (const stem of ['story', 'encounter', 'investigation', 'calendar', 'daylog']) {
      const dataKey = 'kronor-och-blod.' + stem + '.v1';
      const ownerKey = 'kronor-och-blod.' + stem + '.owner.v1';
      if (!(ownerKey in entries)) continue; // äldre data kan sakna ägarpost; bevaras oförändrade
      const owner = JSON.parse(entries[ownerKey]);
      if (!owner || owner.version !== 1 || owner.characterId !== c.id) throw Error('Ägarkontrollen misslyckades för ' + stem + '.');
      if (!(dataKey in entries)) throw Error('Ägarpost utan sparning för ' + stem + '.');
      const rawField = stem === 'calendar' ? 'calendarRaw' : stem === 'daylog' ? 'daylogRaw' : null;
      if (rawField && owner[rawField] !== entries[dataKey]) throw Error('Sparning och ägarpost skiljer sig åt för ' + stem + '.');
    }
    return { format: 'kronor-och-blod-character-slot', version: 1, characterId: c.id, name: c.name, savedAt: new Date().toISOString(), entries };
  }
  function saveActive() {
    const data = snapshot(), slotKey = key(data.characterId);
    const before = localStorage.getItem(slotKey), raw = JSON.stringify(data);
    if (before !== null) {
      let previous;
      try { previous = JSON.parse(before); } catch (_) { throw Error('Sparplatsen är skadad och skrivs inte över.'); }
      if (!previous || previous.version !== 1 || previous.format !== data.format || previous.characterId !== data.characterId) throw Error('Sparplatsen är ogiltig och skrivs inte över.');
    }
    try {
      localStorage.setItem(slotKey, raw);
      if (localStorage.getItem(slotKey) !== raw) throw Error('Verifiering misslyckades.');
    } catch (_) {
      try { if (before === null) localStorage.removeItem(slotKey); else localStorage.setItem(slotKey, before); } catch (__) {}
      throw Error('Sparplatsen kunde inte sparas säkert.');
    }
    return { characterId: data.characterId, name: data.name, savedAt: data.savedAt };
  }
  function list() {
    const result = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !k.startsWith(PREFIX)) continue;
      try {
        const p = JSON.parse(localStorage.getItem(k));
        if (p && p.format === 'kronor-och-blod-character-slot' && p.version === 1 && key(p.characterId) === k && typeof p.name === 'string' && typeof p.savedAt === 'string' && p.entries && typeof p.entries === 'object') result.push({ characterId: p.characterId, name: p.name, savedAt: p.savedAt });
      } catch (_) { /* En skadad post får inte krascha listningen. */ }
    }
    return result.sort((a, b) => a.name.localeCompare(b.name, 'sv'));
  }
  // Ingen load/switch/delete-funktion i detta steg – skyddar den aktiva sparningen.
  window.KB_CHARACTER_SLOTS = Object.freeze({ saveActive, list });
})();
