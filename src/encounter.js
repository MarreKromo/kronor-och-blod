// KB-03.5 / IMP-025 steg 3D – Ragnhilds sparning kopplas säkert till karaktärs-ID.
(function () {
  'use strict';
  const character = window.KB_CHARACTER;
  const story = document.querySelector('.kb-story');
  if (!character || !story) return;
  const KEY = 'kronor-och-blod.encounter.v1';
  const OWNER_KEY = 'kronor-och-blod.encounter.owner.v1';
  const STORY_KEY = 'kronor-och-blod.story.v1';
  const STORY_OWNER_KEY = 'kronor-och-blod.story.owner.v1';
  const BACKUP_KEY = 'kronor-och-blod.backup.pre-migration.v1';
  const openings = {
    follow: 'Vid gränden väntar en kvinna i mörk mantel. ”Du följde efter pojken. Det var modigt – eller dumdristigt.” Hon presenterar sig som Ragnhild.',
    ring: 'En kvinna knackar försiktigt på. När hon ser silverringen stannar hon upp. ”Du har undersökt den. Då förstår du kanske att någon ljuger.” Hon heter Ragnhild.',
    help: 'Din bekant leder dig till en kvinna vid namn Ragnhild. ”Du sökte hjälp i stället för att springa ensam. Det säger mig något om dig”, säger hon.'
  };
  const responses = {
    trust: { label: 'Visa Ragnhild ringen och be om sanningen', title: 'Ett förtroende', body: 'Ragnhild vänder försiktigt ringen mellan fingrarna. ”Den tillhörde någon som försvann efter en resa mot Varnhem. Jag kan berätta mer – men inte här.”', relation: 1, flag: 'visade_ringen' },
    bargain: { label: 'Kräv något i utbyte mot din hjälp', title: 'Ett pris för sanningen', body: 'Ragnhild drar åt manteln. ”Du tänker som en köpman. Jag kan ordna arbete, men jag glömmer inte att du satte ett pris på mitt förtroende.”', relation: -1, flag: 'kravde_ersattning' },
    guard: { label: 'Behåll ringen och fråga vem hon arbetar för', title: 'En försiktig allians', body: '”Klokt att inte lita på främlingar”, svarar Ragnhild. ”Men om du vill veta vem som förde bort mannen måste vi snart tala igen.”', relation: 0, flag: 'bevarade_hemligheten' }
  };
  const style = document.createElement('style');
  style.textContent = `.kb-encounter{max-width:1050px;margin:12px auto;padding:20px;background:linear-gradient(145deg,#30372e,#1a251e);border:1px solid #b29861;color:#f2e7ce}.kb-encounter h2{margin:9px 0;font-size:26px}.kb-encounter p{line-height:1.65}.kb-encounter .eyebrow{font:11px system-ui;letter-spacing:2px;color:#c8b17a}.kb-encounter button{display:block;width:100%;text-align:left;margin:9px 0;padding:13px;min-height:48px;border:1px solid #b29861;border-radius:5px;background:#394438;color:#fff0cf;font:600 15px system-ui}.kb-encounter .note{color:#c4b995;font:12px system-ui}`;
  document.head.appendChild(style);
  const panel = document.createElement('section');
  panel.className = 'kb-encounter'; panel.setAttribute('aria-label', 'Mötet med Ragnhild');
  story.insertAdjacentElement('afterend', panel);
  function element(tag, value, cls) { const e = document.createElement(tag); if (value !== undefined) e.textContent = value; if (cls) e.className = cls; return e; }
  function ownedRaw(c, key, ownerKey, raw) {
    if (!c || !c.characterId || !raw) return false;
    try {
      const ownerRaw = localStorage.getItem(ownerKey);
      if (ownerRaw !== null) {
        const owner = JSON.parse(ownerRaw);
        return !!(owner && owner.version === 1 && owner.characterId === c.characterId && (owner.storyRaw === raw || owner.encounterRaw === raw));
      }
      // Äldre sparning får bara knytas till en identitet om originalet finns i backupen.
      const backup = JSON.parse(localStorage.getItem(BACKUP_KEY) || 'null');
      if (!backup || !backup.entries || backup.entries[key] !== raw) return false;
      const record = JSON.stringify(ownerKey === STORY_OWNER_KEY
        ? { version:1, characterId:c.characterId, storyRaw:raw }
        : { version:1, characterId:c.characterId, encounterRaw:raw });
      localStorage.setItem(ownerKey, record);
      return localStorage.getItem(ownerKey) === record;
    } catch (_) { return false; }
  }
  function savedStory(c) {
    try {
      const raw = localStorage.getItem(STORY_KEY);
      if (!ownedRaw(c, STORY_KEY, STORY_OWNER_KEY, raw)) return null;
      const s = JSON.parse(raw);
      return s && s.version === 1 && s.characterName === c.name && s.background === c.background && Object.hasOwn(openings, s.choice) ? s : null;
    } catch (_) { return null; }
  }
  function savedEncounter(c, firstChoice) {
    try {
      const raw = localStorage.getItem(KEY);
      if (!ownedRaw(c, KEY, OWNER_KEY, raw)) return null;
      const s = JSON.parse(raw);
      return s && s.version === 1 && s.characterName === c.name && s.background === c.background && s.firstChoice === firstChoice && Object.hasOwn(responses, s.response) ? s : null;
    } catch (_) { return null; }
  }
  function save(c, firstChoice, response) {
    if (!c.characterId || !Object.hasOwn(responses,response)) return false;
    const r = responses[response];
    const data = { version:1, characterName:c.name, background:c.background, firstChoice, npcId:'ragnhild', response, relation:r.relation, flag:r.flag };
    try {
      const existing = localStorage.getItem(KEY);
      if (existing && !ownedRaw(c, KEY, OWNER_KEY, existing)) return false;
      const raw = JSON.stringify(data);
      const owner = JSON.stringify({ version:1, characterId:c.characterId, encounterRaw:raw });
      localStorage.setItem(OWNER_KEY,owner);
      if (localStorage.getItem(OWNER_KEY) !== owner) return false;
      localStorage.setItem(KEY,raw);
      return localStorage.getItem(KEY) === raw;
    } catch (_) { return false; }
  }
  function draw() {
    const c = character.get(); const first = c && savedStory(c);
    panel.replaceChildren(); panel.hidden = !first;
    if (!first) return;
    panel.appendChild(element('div','KAPITEL I · MÖTET','eyebrow'));
    const state = savedEncounter(c,first.choice);
    if (state) {
      const r = responses[state.response];
      panel.append(element('h2',r.title),element('p',r.body),element('p','Relation: Ragnhild '+(r.relation>0?'+1 (förtroende)':r.relation<0?'−1 (misstro)':'0 (avvaktande)')),element('p','Ragnhild minns ditt svar. Ditt val påverkar vilka ledtrådar hon delar i undersökningen nedan.','note'));
      return;
    }
    // Vid okänd ägare: visa aldrig val som kan skriva över en annan karaktärs sparning.
    if (localStorage.getItem(KEY) !== null) {
      panel.append(element('h2','Sparning skyddad'),element('p','Ragnhilds äldre sparning kunde inte säkert kopplas till denna karaktär. Inga uppgifter har skrivits över.','note'));
      return;
    }
    panel.append(element('h2','Kvinnan i den mörka manteln'),element('p',openings[first.choice]),element('p','”En man har försvunnit”, säger hon lågt. ”Jag tror att ringen kan leda oss till honom. Men först måste jag veta var du står.”'),element('p','Vad svarar du?'));
    Object.entries(responses).forEach(([id,r])=>{
      const button=element('button',r.label); button.type='button';
      button.addEventListener('click',()=>{
        const current=character.get(); const currentStory=current&&savedStory(current);
        if (!current || !currentStory || current.characterId!==c.characterId || currentStory.choice!==first.choice) return;
        if (!save(current,first.choice,id)) { window.alert('Ragnhilds val kunde inte sparas säkert. Äldre sparningar har inte skrivits över.'); return; }
        draw();
      });
      panel.appendChild(button);
    });
    panel.appendChild(element('p','Valet sparas lokalt och påverkar Ragnhilds förtroende.','note'));
  }
  draw(); new MutationObserver(draw).observe(story,{childList:true});
})();
