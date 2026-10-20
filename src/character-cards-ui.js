// IMP-025 3H.10.2 – skrivskyddade karaktärskort.
// Byten går alltid via den befintliga kontroll- och bekräftelsepanelen.
(function () {
  'use strict';
  const host = document.querySelector('.kb-profile');
  const model = window.KB_CHARACTER;
  const slots = window.KB_CHARACTER_SLOTS;
  if (!host || !model || !slots) return;
  const heading = Array.from(host.children).find(n =>
    n.querySelector('h3')?.textContent === 'Mina karaktärer');
  const switchPanel = Array.from(host.children).find(n =>
    n.querySelector('h3')?.textContent?.startsWith('Byt karaktär · 3H.9'));
  if (!heading || !switchPanel) return;
  const select = switchPanel.querySelector('select');
  if (!select) return;
  const box = document.createElement('div');
  box.style.cssText = 'display:grid;gap:10px;margin:12px 0 16px';
  heading.insertAdjacentElement('afterend', box);

  function card(name, background, savedAt, isActive, id) {
    const article = document.createElement('article');
    article.style.cssText = 'padding:13px;border:1px solid ' +
      (isActive ? '#e0bd73' : '#786c4c') +
      ';border-radius:8px;background:' + (isActive ? '#304433' : '#202b23');
    const top = document.createElement('div');
    top.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:10px';
    const title = document.createElement('strong');
    title.textContent = name;
    title.style.cssText = 'font-size:19px';
    const tag = document.createElement('span');
    tag.textContent = isActive ? '● Aktiv nu' : 'Sparad karaktär';
    tag.style.cssText = 'font:12px system-ui;color:#e2cf9e';
    top.append(title, tag);
    const info = document.createElement('p');
    info.style.cssText = 'margin:9px 0 0;font:13px/1.5 system-ui;color:#d7c49a';
    info.textContent = 'Bakgrund: ' + background + ' · ' + savedAt;
    article.append(top, info);
    if (!isActive) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'Välj ' + name;
      button.style.cssText = 'margin-top:10px;min-height:44px;padding:10px 14px;border:1px solid #bda77a;border-radius:5px;background:#283229;color:#f4e9ce;font:600 14px system-ui';
      button.addEventListener('click', function () {
        // Endast val: ingen skrivning och inget karaktärsbyte.
        const option = Array.from(select.options).find(o => o.value === id);
        if (!option) { button.textContent = 'Uppdatera sidan och försök igen'; button.disabled = true; return; }
        select.value = id;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        switchPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      article.appendChild(button);
    }
    return article;
  }
  try {
    const active = model.get();
    if (!active) return;
    const list = slots.list();
    const activeBackground = model.BACKGROUNDS[active.background]?.label || 'Okänd';
    box.appendChild(card(active.name, activeBackground, 'Pågående spel', true, active.characterId));
    for (const slot of list) {
      if (slot.characterId === active.characterId) continue;
      let background = 'Okänd';
      try {
        const raw = localStorage.getItem('kronor-och-blod.slot.v1.' + slot.characterId);
        const parsed = JSON.parse(raw);
        const c = JSON.parse(parsed.entries['kronor-och-blod.character.v1']);
        background = model.BACKGROUNDS[c.background]?.label || 'Okänd';
      } catch (_) { /* Visningsfel påverkar aldrig sparningar. */ }
      let saved = 'Senaste sparning: okänd';
      const date = new Date(slot.savedAt);
      if (Number.isFinite(date.getTime())) saved = 'Sparplats: ' + date.toLocaleDateString('sv-SE');
      box.appendChild(card(slot.name, background, saved, false, slot.characterId));
    }
  } catch (_) {
    const error = document.createElement('p');
    error.textContent = 'Kunde inte visa karaktärskorten. Befintligt karaktärsbyte fungerar fortfarande.';
    box.appendChild(error);
  }
})();
