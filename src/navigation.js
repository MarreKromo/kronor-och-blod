// KB-03.6.2 steg 3 – fyra mobilvyer. Ingen förändring av sparningar.
(function () {
  'use strict';
  const required = ['.clock', '.layout', '.kb-story', '.kb-encounter', '.kb-investigation',
    '.kb-journal', '.kb-profile', 'section[aria-label="Din karaktär"]'];
  if (required.some(s => !document.querySelector(s))) return;

  const css = document.createElement('style');
  css.textContent = `
    .kb-navigation{position:sticky;top:0;z-index:30;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;padding:9px max(8px,env(safe-area-inset-right)) 9px max(8px,env(safe-area-inset-left));background:#17221b;border-bottom:1px solid #9c865c;box-shadow:0 3px 12px #0008}
    .kb-navigation button{min-width:0;min-height:48px;padding:8px 2px;border:1px solid #72684c;border-radius:6px;background:#303b31;color:#eadcba;font:600 clamp(11px,3vw,15px) system-ui;cursor:pointer}
    .kb-navigation button[aria-current="page"]{background:#795333;border-color:#e2c78d;color:#fff7df}
    .kb-navigation button:focus-visible{outline:3px solid #fff;outline-offset:2px}
    body[data-kb-view="story"] .clock,
    body[data-kb-view="story"] .layout,
    body[data-kb-view="story"] .kb-profile,
    body[data-kb-view="story"] section[aria-label="Din karaktär"],
    body[data-kb-view="story"] .kb-journal,
    body[data-kb-view="character"] .clock,
    body[data-kb-view="character"] .layout,
    body[data-kb-view="character"] .kb-story,
    body[data-kb-view="character"] .kb-encounter,
    body[data-kb-view="character"] .kb-investigation,
    body[data-kb-view="character"] .kb-journal,
    body[data-kb-view="map"] .kb-profile,
    body[data-kb-view="map"] section[aria-label="Din karaktär"],
    body[data-kb-view="map"] .kb-story,
    body[data-kb-view="map"] .kb-encounter,
    body[data-kb-view="map"] .kb-investigation,
    body[data-kb-view="map"] .kb-journal,
    body[data-kb-view="journal"] .clock,
    body[data-kb-view="journal"] .layout,
    body[data-kb-view="journal"] .kb-profile,
    body[data-kb-view="journal"] section[aria-label="Din karaktär"],
    body[data-kb-view="journal"] .kb-story,
    body[data-kb-view="journal"] .kb-encounter,
    body[data-kb-view="journal"] .kb-investigation {display:none!important}
    .kb-navigation-hint{max-width:1050px;margin:14px auto;padding:16px;border:1px solid #786c4c;background:#283229;color:#f2e7ce;line-height:1.5}
    body:not([data-kb-view="story"]) .kb-navigation-hint{display:none}
    .kb-story[hidden],.kb-encounter[hidden],.kb-investigation[hidden],.kb-profile[hidden],.kb-journal[hidden]{display:none!important}
    @media(max-width:680px){.kb-navigation-hint{margin:10px}}
  `;
  document.head.appendChild(css);

  const nav = document.createElement('nav');
  nav.className = 'kb-navigation';
  nav.setAttribute('aria-label','Spelets huvudnavigation');
  const views = [['story','Berättelse'],['map','Karta'],['character','Karaktär'],['journal','Dagbok']];
  const buttons = new Map();
  for (const [id,label] of views) {
    const button = document.createElement('button');
    button.type='button'; button.textContent=label;
    button.addEventListener('click',()=>switchView(id));
    nav.append(button); buttons.set(id,button);
  }
  document.querySelector('.top').insertAdjacentElement('afterend',nav);
  const hint = document.createElement('p');
  hint.className='kb-navigation-hint';
  hint.textContent='Skapa din karaktär under fliken Karaktär för att börja berättelsen.';
  nav.insertAdjacentElement('afterend',hint);
  const journalDetails = document.querySelector('.kb-journal details');

  function switchView(id) {
    if (!buttons.has(id)) return;
    document.body.dataset.kbView=id;
    for (const [key,button] of buttons) {
      if (key===id) button.setAttribute('aria-current','page');
      else button.removeAttribute('aria-current');
    }
    if (id==='journal' && journalDetails) journalDetails.open=true;
    if (id==='story') hint.hidden=!!window.KB_CHARACTER?.get();
    window.scrollTo({top:0,behavior:'instant'});
  }

  const profile = document.querySelector('.kb-profile');
  const form = document.querySelector('#kbCharacterContent');
  function syncCharacter() {
    hint.hidden=!!window.KB_CHARACTER?.get();
  }
  [profile,form].filter(Boolean).forEach(el =>
    new MutationObserver(syncCharacter).observe(el,{childList:true}));
  syncCharacter();
  switchView(window.KB_CHARACTER?.get()?'story':'character');
})();
