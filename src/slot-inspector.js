// KB-03.7.1 / IMP-025 3H.5 – endast läsning och kontroll av sparplatser.
(function () {
  'use strict';
  const host = document.querySelector('.kb-profile');
  const slots = window.KB_CHARACTER_SLOTS;
  const character = window.KB_CHARACTER;
  if (!host || !slots || !character) return;
  const PREFIX = 'kronor-och-blod.slot.v1.';
  const stems = ['story', 'encounter', 'investigation', 'calendar', 'daylog'];
  const panel = document.createElement('section');
  panel.style.cssText = 'margin-top:14px;padding:14px;border:1px solid #8f7b52;border-radius:6px';
  const title = document.createElement('h3');
  title.textContent = 'Mina sparplatser · 3H.5';
  title.style.cssText = 'font-size:21px;margin:0 0 8px';
  const intro = document.createElement('p');
  intro.textContent = 'Visa och kontrollera sparplatser. Inget återställs, byts eller raderas.';
  intro.style.cssText = 'font:13px/1.5 system-ui;color:#d7c49a';
  const listHost = document.createElement('div');
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  status.style.cssText = 'font:13px/1.6 system-ui;color:#e2cf9e;white-space:pre-line';
  function inspect(id) {
    const raw = localStorage.getItem(PREFIX + id);
    if (!raw) throw Error('Sparplatsen saknas.');
    const data = JSON.parse(raw);
    if (!data || data.format !== 'kronor-och-blod-character-slot' || data.version !== 1 || data.characterId !== id || !data.entries || typeof data.entries !== 'object' || Array.isArray(data.entries)) throw Error('Ogiltigt sparplatsformat.');
    const e = data.entries;
    const cRaw = e['kronor-och-blod.character.v1'];
    const iRaw = e['kronor-och-blod.character.identity.v1'];
    if (typeof cRaw !== 'string' || typeof iRaw !== 'string') throw Error('Karaktär eller identitet saknas.');
    const c = JSON.parse(cRaw), identity = JSON.parse(iRaw);
    if (!c || c.version !== 1 || typeof c.name !== 'string' || c.name !== data.name || !identity || identity.version !== 1 || identity.characterId !== id || identity.characterRaw !== cRaw) throw Error('Karaktärens identitet stämmer inte.');
    const parts = [];
    for (const stem of stems) {
      const dKey = 'kronor-och-blod.' + stem + '.v1';
      const oKey = 'kronor-och-blod.' + stem + '.owner.v1';
      const d = e[dKey], o = e[oKey];
      if (o !== undefined) {
        if (typeof d !== 'string' || typeof o !== 'string') throw Error('Ofullständiga data för ' + stem + '.');
        const owner = JSON.parse(o);
        if (!owner || owner.version !== 1 || owner.characterId !== id) throw Error('Fel ägare för ' + stem + '.');
        const rawField = stem === 'calendar' ? 'calendarRaw' : stem === 'daylog' ? 'daylogRaw' : null;
        if (rawField && owner[rawField] !== d) throw Error('Data skiljer sig från ägarpost för ' + stem + '.');
      }
      parts.push(stem + ': ' + (d === undefined ? 'saknas' : o === undefined ? 'äldre data utan ägarpost' : 'ägar-ID kontrollerat'));
    }
    return 'PASS: ' + c.name + ' – karaktär och identitet verifierade.\n' + parts.join('\n') + '\nIngen återläsning har gjorts.';
  }
  function draw() {
    listHost.replaceChildren();
    let list;
    try { list = slots.list(); } catch (err) { status.textContent = 'Kunde inte läsa listan: ' + err.message; return; }
    if (!list.length) { const empty = document.createElement('p'); empty.textContent = 'Inga sparplatser hittades i den här webbläsaren.'; listHost.appendChild(empty); return; }
    for (const slot of list) {
      const item = document.createElement('div');
      item.style.cssText = 'padding:10px 0;border-top:1px solid #786c4c';
      const name = document.createElement('div');
      name.textContent = slot.name + (character.get()?.characterId === slot.characterId ? ' · aktiv karaktär' : '');
      name.style.cssText = 'font-weight:bold;margin-bottom:5px';
      const saved = document.createElement('div');
      const date = new Date(slot.savedAt);
      saved.textContent = 'Sparad: ' + (Number.isNaN(date.getTime()) ? 'okänd tid' : date.toLocaleString('sv-SE'));
      saved.style.cssText = 'font:12px system-ui;color:#d7c49a;margin-bottom:8px';
      const button = document.createElement('button');
      button.type = 'button'; button.textContent = 'Kontrollera sparplats';
      button.style.cssText = 'min-height:44px;padding:9px 12px;border:1px solid #e0bd73;border-radius:5px;background:#8e412e;color:#fff3d5;font:600 13px system-ui';
      button.addEventListener('click', () => { try { status.textContent = inspect(slot.characterId); } catch (err) { status.textContent = 'FAIL: ' + err.message + '\nIngenting har ändrats.'; } });
      item.append(name, saved, button);
      listHost.appendChild(item);
    }
  }
  const refresh = document.createElement('button');
  refresh.type = 'button'; refresh.textContent = 'Uppdatera lista';
  refresh.style.cssText = 'min-height:44px;padding:8px 12px;border:1px solid #bda77a;border-radius:5px;background:#283229;color:#f4e9ce;font:600 13px system-ui;margin-top:8px';
  refresh.addEventListener('click', () => { status.textContent = ''; draw(); });
  panel.append(title, intro, listHost, refresh, status);
  host.appendChild(panel);
  draw();
})();
