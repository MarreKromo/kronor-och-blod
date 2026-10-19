// KB-03.4 – första berättelsescenen. Fristående från karta och kalender.
(function () {
  'use strict';
  const character = window.KB_CHARACTER;
  if (!character) return;
  const KEY = 'kronor-och-blod.story.v1';
  const introductions = {
    bonde: 'Du känner doften av vedrök och våt jord. Arbetet väntar, som det alltid gör.',
    hantverkare: 'Verktygen ligger framme. En beställning måste bli klar innan dagen är slut.',
    skrivare: 'På bordet ligger ett halvfärdigt brev. Du har ännu inte fått betalt för arbetet.',
    friboren: 'Ditt släktnamn öppnar vissa dörrar, men förväntningarna kan bli en börda.'
  };
  const choices = {
    follow: { label: 'Följ efter pojken', title: 'Spår i gränden', body: 'Du kastar manteln över axlarna och följer efter. Vid gränden hörs hastiga steg och en röst som säger ditt namn. Hur kan någon här känna dig?', flag: 'följde_pojken' },
    ring: { label: 'Undersök silverringen', title: 'Ett okänt sigill', body: 'I eldskenet ser du ett tecken på ringen. Inuti finns slitna ristningar. Någon har burit den länge – och någon annan tycks vilja ha den tillbaka.', flag: 'undersökte_ringen' },
    help: { label: 'Sök hjälp hos någon du litar på', title: 'Ett förändrat ansikte', body: 'Du berättar vad som hänt för en bekant. När du nämner silverringen tystnar personen och skjuter för dörren. ”Var fick du den?”', flag: 'sökte_hjälp' }
  };
  const css = document.createElement('style');
  css.textContent = '.kb-story{max-width:1050px;margin:12px auto;padding:20px;background:linear-gradient(145deg,#283229,#1b2520);border:1px solid #a28b5e;color:#f2e7ce}.kb-story h2{font-size:26px;margin:9px 0}.kb-story p{line-height:1.65}.kb-story-kicker{font:11px system-ui;letter-spacing:2px;color:#c8b17a}.kb-story-choice{display:block;width:100%;text-align:left;margin:9px 0;padding:13px;border:1px solid #a28b5e;background:#394438;color:#fff0cf;font:600 15px system-ui;border-radius:5px;min-height:48px}.kb-story-choice:focus-visible{outline:3px solid #fff}.kb-story-note{font:12px system-ui;color:#c4b995}';
  document.head.appendChild(css);
  const host = document.createElement('section');
  host.className = 'kb-story';
  host.setAttribute('aria-label','Berättelse');
  const anchor = document.querySelector('.kb-profile') || document.querySelector('section[aria-label="Din karaktär"]');
  if (!anchor) return;
  anchor.insertAdjacentElement('afterend',host);
  const node = (tag, value, cls) => { const el = document.createElement(tag); if (value !== undefined) el.textContent = value; if (cls) el.className = cls; return el; };
  function read(c) {
    try { const data = JSON.parse(localStorage.getItem(KEY) || 'null'); return data && data.version === 1 && data.characterName === c.name && data.background === c.background && choices[data.choice] ? data : null; }
    catch (_) { return null; }
  }
  function save(c, choice) {
    try { localStorage.setItem(KEY, JSON.stringify({ version:1, characterName:c.name, background:c.background, choice, flag:choices[choice].flag })); return true; }
    catch (_) { return false; }
  }
  function draw() {
    const c = character.get();
    host.replaceChildren();
    host.hidden = !c;
    if (!c) return;
    const state = read(c);
    host.append(node('div','KAPITEL I · SKARA · VINTERN 1250','kb-story-kicker'));
    if (state) {
      const outcome = choices[state.choice];
      host.append(node('h2',outcome.title),node('p',outcome.body),node('p','Ditt beslut är fattat. Berättelsen fortsätter i nästa kapitel.','kb-story-note'));
      return;
    }
    host.append(node('h2','Ett namn ingen känner'),node('p',introductions[c.background] || 'Dagen gryr över Skara.'),node('p','Det är ännu mörkt när någon bankar på dörren. Tre hårda slag.'),node('p','Utanför står en pojke, knappt äldre än tolv. Hans händer skakar av köld. ”Du måste komma. De har tagit honom.”'),node('p','Innan du hinner fråga vem han menar lägger han en liten silverring i din hand. ”Visa den inte för någon.” Sedan försvinner han mellan husen.'),node('p','Vad gör du?'));
    Object.entries(choices).forEach(([id, choice]) => {
      const button = node('button',choice.label,'kb-story-choice');
      button.type = 'button';
      button.addEventListener('click', () => { if (!character.get()) return; save(c,id); draw(); });
      host.appendChild(button);
    });
    host.append(node('p','Ditt första val sparas lokalt. Du kan inte ändra det utan att skapa en ny testkaraktär.','kb-story-note'));
  }
  draw();
  const profile = document.querySelector('.kb-profile');
  if (profile) new MutationObserver(draw).observe(profile,{childList:true,attributes:true,attributeFilter:['hidden']});
  const old = document.querySelector('#kbCharacterContent');
  if (old) new MutationObserver(draw).observe(old,{childList:true});
})();
