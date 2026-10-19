// KB-03.6.2 steg 2 – läsbar dagbok; befintliga sparningar ändras aldrig.
(function () {
  'use strict';
  const model = window.KB_CHARACTER;
  const anchor = document.querySelector('.kb-investigation');
  if (!model || !anchor) return;
  const STORY = 'kronor-och-blod.story.v1';
  const ENCOUNTER = 'kronor-och-blod.encounter.v1';
  const INVESTIGATION = 'kronor-och-blod.investigation.v1';

  const firstChoices = {
    follow: ['Följde efter pojken', 'Spår i gränden', 'Du följde pojken in i gränden och hörde en röst som kände ditt namn.'],
    ring: ['Undersökte silverringen', 'Ett okänt sigill', 'Du upptäckte ett tecken och slitna ristningar på silverringen.'],
    help: ['Sökte hjälp', 'Ett förändrat ansikte', 'En bekant reagerade starkt när du nämnde silverringen.']
  };
  const responses = {
    trust: ['Visade Ragnhild ringen', 'Ett förtroende', 'Ragnhild berättade om en försvunnen man och vägen mot Varnhem.', 1],
    bargain: ['Krävde ersättning', 'Ett pris för sanningen', 'Ragnhild vill ha något i utbyte och litar mindre på dig.', -1],
    guard: ['Behöll ringen', 'En försiktig allians', 'Du valde att inte lämna ifrån dig ringen.', 0]
  };
  const investigations = {
    trust: {
      servant: ['Sökte vittnet', 'Vittnet vid vägen', 'Du bestämde dig för att söka tjänaren som såg mannen.'],
      letter: ['Sökte brevets avsändare', 'Brevets avsändare', 'Du försöker ta reda på vem som gav mannen brevet.']
    },
    bargain: {
      work: ['Erbjöd en tjänst', 'Ett dyrköpt uppdrag', 'Du lovade Ragnhild en tjänst för att få information.'],
      market: ['Sökte rykten på torget', 'Röster på torget', 'Du söker en egen källa utan Ragnhild.']
    },
    guard: {
      deliver: ['Lovade att leverera meddelandet', 'Ett löfte i mörkret', 'Du lovade att lämna ett förseglat meddelande oöppnat.'],
      independent: ['Valde ett eget spår', 'Ett eget spår', 'Du undersöker ringens ristningar utan Ragnhilds hjälp.']
    }
  };

  const style = document.createElement('style');
  style.textContent = `
    .kb-journal{max-width:1050px;margin:12px auto;padding:18px;background:#252e27;border:1px solid #a28b5e;color:#f2e7ce}
    .kb-journal h2{margin:5px 0 10px;font-size:26px}
    .kb-journal summary{cursor:pointer;min-height:48px;padding:12px;border:1px solid #9c865c;background:#354238;border-radius:5px;font:600 15px system-ui;display:flex;align-items:center;justify-content:space-between}
    .kb-journal summary::after{content:"▾";color:#e4cb8d}
    .kb-journal details[open] summary::after{content:"▴"}
    .kb-journal-body{padding-top:14px}
    .kb-journal h3{font-size:18px;margin:16px 0 7px}
    .kb-journal p,.kb-journal li{line-height:1.55}
    .kb-journal ul{padding-left:22px}
    .kb-journal-entry{border-left:3px solid #a28b5e;padding:2px 0 3px 12px;margin:12px 0}
    .kb-journal-entry small{font:11px system-ui;color:#d6bf8e;letter-spacing:1px}
    .kb-journal-entry strong{display:block;margin:5px 0}
    .kb-journal-muted{color:#c4b995;font:13px system-ui}
  `;
  document.head.appendChild(style);

  const panel = document.createElement('section');
  panel.className = 'kb-journal';
  panel.setAttribute('aria-label', 'Dagbok');
  const details = document.createElement('details');
  const summary = document.createElement('summary');
  summary.textContent = 'Öppna dagboken';
  const content = document.createElement('div');
  content.className = 'kb-journal-body';
  details.append(summary, content);
  panel.append(document.createElement('h2'), details);
  panel.querySelector('h2').textContent = 'Din dagbok';
  anchor.insertAdjacentElement('afterend', panel);

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); }
    catch (_) { return null; }
  }
  function matches(data, c) {
    return !!(data && data.version === 1 &&
      data.characterName === c.name && data.background === c.background);
  }
  function node(tag, text, cls) {
    const n = document.createElement(tag);
    if (text !== undefined) n.textContent = text;
    if (cls) n.className = cls;
    return n;
  }
  function entry(section, title, body) {
    const item = node('div', undefined, 'kb-journal-entry');
    item.append(node('small', section), node('strong', title), node('p', body));
    return item;
  }
  function render() {
    const c = model.get();
    panel.hidden = !c;
    content.replaceChildren();
    if (!c) return;
    content.append(node('p', 'Tidigare beslut och upptäckter för ' + c.name + '.', 'kb-journal-muted'));
    const story = read(STORY);
    if (!matches(story, c) || !Object.prototype.hasOwnProperty.call(firstChoices, story.choice)) {
      content.append(node('p', 'Ännu inga sparade berättelseval.', 'kb-journal-muted'));
      return;
    }
    const f = firstChoices[story.choice];
    content.append(node('h3', 'Händelser och beslut'), entry('KAPITEL I · SKARA', f[1], f[2]));
    content.append(node('p', 'Ditt val: ' + f[0] + '.', 'kb-journal-muted'));

    const encounter = read(ENCOUNTER);
    if (!matches(encounter, c) || encounter.firstChoice !== story.choice ||
        !Object.prototype.hasOwnProperty.call(responses, encounter.response)) return;
    const e = responses[encounter.response];
    content.append(entry('KAPITEL I · RAGNHILD', e[1], e[2]));
    content.append(node('p', 'Ditt val: ' + e[0] + '.', 'kb-journal-muted'));
    content.append(node('h3', 'Relationer'), node('p',
      'Ragnhild: ' + (e[3] > 0 ? '+1 · Förtroende' : e[3] < 0 ? '−1 · Misstro' : '0 · Avvaktande')));

    const investigation = read(INVESTIGATION);
    if (!matches(investigation, c) || investigation.firstChoice !== story.choice ||
        investigation.encounterResponse !== encounter.response) return;
    const route = investigations[encounter.response];
    if (!route || !Object.prototype.hasOwnProperty.call(route, investigation.decision)) return;
    const result = route[investigation.decision];
    content.append(entry('KAPITEL II · UNDERSÖKNINGEN', result[1], result[2]));
    content.append(node('p', 'Ditt val: ' + result[0] + '.', 'kb-journal-muted'));
    if (Array.isArray(investigation.clues) && investigation.clues.length) {
      content.append(node('h3', 'Ledtrådar'));
      const list = node('ul');
      investigation.clues.filter(x => typeof x === 'string').forEach(x => list.append(node('li', x)));
      content.append(list);
    }
  }
  // Dagboken läser data, men skriver aldrig till localStorage.
  [document.querySelector('.kb-story'), document.querySelector('.kb-encounter'), anchor,
   document.querySelector('.kb-profile'), document.querySelector('#kbCharacterContent')]
    .filter(Boolean).forEach(el => new MutationObserver(render).observe(el, {childList:true}));
  details.addEventListener('toggle', () => { if (details.open) render(); });
  render();
})();
