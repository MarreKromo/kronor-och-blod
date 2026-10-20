// KB-03.8.1 / IMP-025 3H.12.4 – skrivskyddad förkontroll inför karaktärsbyte.
(function () {
  'use strict';
  const BASE = 'kronor-och-blod.';
  const PREFIX = BASE + 'slot.v1.';
  const STEMS = ['story', 'encounter', 'investigation', 'calendar', 'daylog', 'life-background'];
  const ACTIVE_KEYS = [BASE + 'character.v1', BASE + 'character.identity.v1'];
  STEMS.forEach(stem => ACTIVE_KEYS.push(BASE + stem + '.v1', BASE + stem + '.owner.v1'));
  function fail(reason) { return Object.freeze({ ok: false, reason }); }
  function inspect(targetId) {
    try {
      const model = window.KB_CHARACTER;
      const slots = window.KB_CHARACTER_SLOTS;
      const preflight = window.KB_SLOT_RESTORE_PREFLIGHT;
      if (!model || !slots || !preflight) return fail('Sparsystemet är inte redo.');
      const current = model.get();
      if (!current || !current.characterId) return fail('Ingen aktiv karaktär hittades.');
      if (targetId === current.characterId) return fail('Den karaktären är redan aktiv.');
      const destination = preflight.inspect(targetId);
      if (!destination.ok) return fail('Målsparplatsen: ' + destination.reason);
      const targetRaw = localStorage.getItem(PREFIX + targetId);
      const target = JSON.parse(targetRaw);
      if (!target || !target.entries) return fail('Målsparplatsen saknar data.');
      const charRaw = localStorage.getItem(BASE + 'character.v1');
      const identityRaw = localStorage.getItem(BASE + 'character.identity.v1');
      if (!charRaw || !identityRaw) return fail('Aktiv karaktär saknar sparad identitet.');
      const identity = JSON.parse(identityRaw);
      const activeCharacter = JSON.parse(charRaw);
      if (!identity || identity.version !== 1 || identity.characterId !== current.characterId ||
          identity.characterRaw !== charRaw || !activeCharacter ||
          activeCharacter.name !== current.name) return fail('Aktiv karaktärsidentitet stämmer inte.');
      for (const stem of STEMS) {
        const data = localStorage.getItem(BASE + stem + '.v1');
        const ownerRaw = localStorage.getItem(BASE + stem + '.owner.v1');
        if ((data === null) !== (ownerRaw === null)) return fail('Sparning och ägarpost saknar par: ' + stem);
        if (ownerRaw !== null) {
          const owner = JSON.parse(ownerRaw);
          if (!owner || owner.version !== 1 || owner.characterId !== current.characterId)
            return fail('Fel ägare för aktiv ' + stem + '.');
          const rawField = stem === 'calendar' ? 'calendarRaw' : stem === 'daylog' ? 'daylogRaw' :
            stem === 'life-background' ? 'backgroundRaw' : null;
          if (rawField && owner[rawField] !== data) return fail('Ägarkontroll misslyckades för ' + stem + '.');
          if (stem === 'life-background') {
            const backgroundModel = window.KB_LIFE_BACKGROUND_MODEL;
            if (!backgroundModel || typeof backgroundModel.parse !== 'function' || !backgroundModel.parse(data).ok)
              return fail('Ogiltig livsbakgrund för aktiv karaktär.');
          }
        }
      }
      const present = ACTIVE_KEYS.filter(key => localStorage.getItem(key) !== null).length;
      return Object.freeze({
        ok: true, fromId: current.characterId, fromName: current.name,
        toId: targetId, toName: destination.name, activeKeysPresent: present,
        targetChecks: destination.checks,
        note: 'Endast kontroll utförd. Ingen sparning eller karaktär har ändrats.'
      });
    } catch (_) { return fail('Kontrollen kunde inte slutföras. Inga ändringar har utförts.'); }
  }
  window.KB_SWITCH_PREFLIGHT = Object.freeze({ inspect });
})();
