// KB-03.6.2 steg 1 – en aktiv berättelsescen, utan ändring av sparfiler.
(function () {
  'use strict';
  const model = window.KB_CHARACTER;
  const story = document.querySelector('.kb-story');
  const encounter = document.querySelector('.kb-encounter');
  const investigation = document.querySelector('.kb-investigation');
  if (!model || !story || !encounter || !investigation) return;

  const keys = {
    story: 'kronor-och-blod.story.v1',
    encounter: 'kronor-och-blod.encounter.v1'
  };
  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); }
    catch (_) { return null; }
  }
  function sameCharacter(record, character) {
    return record && record.version === 1 &&
      record.characterName === character.name &&
      record.background === character.background;
  }
  function refresh() {
    const c = model.get();
    const s = c && read(keys.story);
    const e = c && read(keys.encounter);
    const validStory = !!(c && sameCharacter(s, c) && ['follow','ring','help'].includes(s.choice));
    const validEncounter = !!(validStory && sameCharacter(e, c) &&
      e.firstChoice === s.choice && ['trust','bargain','guard'].includes(e.response));
    // En scen visas i taget. Inga sparade data eller DOM-noder raderas.
    story.hidden = !c || validStory;
    encounter.hidden = !validStory || validEncounter;
    investigation.hidden = !validEncounter;
  }
  // De befintliga modulerna uppdaterar sina paneler efter ett val.
  // Lyssna endast på barnändringar, inte på hidden, för att undvika loopar.
  [story, encounter, investigation].forEach(panel => {
    new MutationObserver(refresh).observe(panel, {childList: true});
  });
  const profile = document.querySelector('.kb-profile');
  if (profile) new MutationObserver(refresh).observe(profile, {childList: true});
  const form = document.querySelector('#kbCharacterContent');
  if (form) new MutationObserver(refresh).observe(form, {childList: true});
  refresh();
})();
