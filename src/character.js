// KB-03.1 – fristående karaktärsmodell. Ingen UI-ändring i detta steg.
(function () {
  'use strict';
  const KEY = 'kronor-och-blod.character.v1';
  const START_PLACE = 'VG-SKARA-001';
  const BACKGROUNDS = Object.freeze({
    bonde: { label: 'Bonde', description: 'Uppvuxen med jordbruk och hårt arbete.', attributes: { styrka: 3, list: 1, anseende: 1 } },
    hantverkare: { label: 'Hantverkare', description: 'Kunnig i ett yrke och van vid byteshandel.', attributes: { styrka: 2, list: 2, anseende: 1 } },
    skrivare: { label: 'Skrivarkunnig', description: 'Har lärt sig läsa, skriva och föra räkenskaper.', attributes: { styrka: 1, list: 3, anseende: 1 } },
    friboren: { label: 'Friboren', description: 'Har släktband som kan öppna dörrar.', attributes: { styrka: 1, list: 2, anseende: 2 } }
  });
  let character = null;
  function validName(name) { return typeof name === 'string' && name.trim().length >= 2 && name.trim().length <= 32 && !/[<>\u0000-\u001f]/.test(name); }
  function create(name, background) {
    if (!validName(name)) throw new Error('Namnet måste innehålla 2–32 tecken.');
    if (!Object.prototype.hasOwnProperty.call(BACKGROUNDS, background)) throw new Error('Ogiltig bakgrund.');
    character = { version: 1, name: name.trim(), background, placeId: START_PLACE, attributes: { ...BACKGROUNDS[background].attributes } };
    save(); return get();
  }
  function get() { return character ? JSON.parse(JSON.stringify(character)) : null; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(character)); return true; } catch (_) { return false; } }
  function load() {
    try {
      const raw = localStorage.getItem(KEY); if (!raw) return null;
      const value = JSON.parse(raw);
      if (!value || value.version !== 1 || !validName(value.name) || !Object.prototype.hasOwnProperty.call(BACKGROUNDS, value.background) || value.placeId !== START_PLACE) return null;
      character = { version: 1, name: value.name.trim(), background: value.background, placeId: START_PLACE, attributes: { ...BACKGROUNDS[value.background].attributes } };
      return get();
    } catch (_) { return null; }
  }
  function reset() { character = null; try { localStorage.removeItem(KEY); return true; } catch (_) { return false; } }
  load();
  window.KB_CHARACTER = Object.freeze({ BACKGROUNDS, create, get, load, reset });
})();
