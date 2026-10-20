// IMP-025 3H.12.6 B – återställ livsbakgrund före övriga spelmoduler.
// Fristående för att kunna köras före character.js och life-background-model.js.
(function () {
  'use strict';
  const BASE = 'kronor-och-blod.';
  const JOURNAL = BASE + 'life-background.write-journal.v1';
  const SWITCH = BASE + 'switch.journal.v1';
  const DATA = BASE + 'life-background.v1';
  const OWNER = BASE + 'life-background.owner.v1';
  const CHAR = BASE + 'character.v1';
  const IDENTITY = BASE + 'character.identity.v1';
  const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const hasOwn = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
  function validBackground(raw) {
    if (typeof raw !== 'string') return false;
    const v = JSON.parse(raw);
    if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
    const fields = ['version', 'upbringing', 'familySituation', 'past', 'ambition', 'biography'];
    return Object.keys(v).length === fields.length && fields.every(k => hasOwn(v, k)) &&
      v.version === 1 &&
      ['farm', 'craft', 'letters', 'freeborn'].includes(v.upbringing) &&
      ['together', 'distant', 'alone'].includes(v.familySituation) &&
      ['ordinary', 'debt', 'promise', 'conflict'].includes(v.past) &&
      ['farmstead', 'trade', 'travel', 'influence'].includes(v.ambition) &&
      typeof v.biography === 'string' && v.biography.length <= 500 &&
      !/[\u0000-\u001f\u007f]/.test(v.biography);
  }
  function recover() {
    const raw = localStorage.getItem(JOURNAL);
    if (raw === null) return false;
    if (localStorage.getItem(SWITCH) !== null) throw Error('Två oavslutade transaktioner.');
    const j = JSON.parse(raw);
    if (!j || typeof j !== 'object' || Array.isArray(j) || j.version !== 1 ||
      typeof j.characterId !== 'string' || !ID_RE.test(j.characterId) ||
      typeof j.characterRaw !== 'string' || typeof j.identityRaw !== 'string' ||
      !(j.beforeData === null || typeof j.beforeData === 'string') ||
      !(j.beforeOwner === null || typeof j.beforeOwner === 'string')) {
      throw Error('Ogiltig bakgrundsjournal.');
    }
    const identity = JSON.parse(j.identityRaw);
    const character = JSON.parse(j.characterRaw);
    if (!identity || identity.version !== 1 || identity.characterId !== j.characterId ||
      identity.characterRaw !== j.characterRaw || !character || character.version !== 1 ||
      typeof character.name !== 'string') throw Error('Journalens identitet är ogiltig.');
    if ((j.beforeData === null) !== (j.beforeOwner === null)) throw Error('Ofullständigt tidigare ägarpar.');
    if (j.beforeData !== null) {
      const owner = JSON.parse(j.beforeOwner);
      if (!owner || owner.version !== 1 || owner.characterId !== j.characterId ||
        owner.backgroundRaw !== j.beforeData || !validBackground(j.beforeData)) {
        throw Error('Tidigare livsbakgrund är ogiltig.');
      }
    }
    // Kontrollera hela journalen innan första skrivningen.
    if (localStorage.getItem(CHAR) !== j.characterRaw ||
      localStorage.getItem(IDENTITY) !== j.identityRaw) {
      throw Error('Aktiv karaktär har ändrats.');
    }
    if (j.beforeData === null) localStorage.removeItem(DATA);
    else localStorage.setItem(DATA, j.beforeData);
    if (j.beforeOwner === null) localStorage.removeItem(OWNER);
    else localStorage.setItem(OWNER, j.beforeOwner);
    if (localStorage.getItem(DATA) !== j.beforeData ||
      localStorage.getItem(OWNER) !== j.beforeOwner) throw Error('Återställningen kunde inte verifieras.');
    localStorage.removeItem(JOURNAL);
    if (localStorage.getItem(JOURNAL) !== null) throw Error('Journalen kunde inte rensas.');
    return true;
  }
  try {
    const recovered = recover();
    window.KB_LIFE_BACKGROUND_RECOVERY = Object.freeze({ ok: true, recovered });
  } catch (_) {
    window.KB_LIFE_BACKGROUND_RECOVERY = Object.freeze({ ok: false, recovered: false });
    document.open();
    document.write('<!doctype html><html lang="sv"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sparning skyddad</title><body style="background:#151a17;color:#f2e7ce;font:18px/1.5 system-ui;padding:24px"><h1>Sparningen är skyddad</h1><p>Livsbakgrundens sparning kunde inte återställas automatiskt. Spelet har stoppats för att skydda dina sparningar.</p><p>Rensa inte webbplatsens data. Kontakta utvecklaren innan du fortsätter.</p></body></html>');
    document.close();
    if (typeof window.stop === 'function') window.stop();
  }
})();
