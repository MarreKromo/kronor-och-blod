// KB-03.7.3 / IMP-025 3H.6.2 – visuell, skrivskyddad återläsningskontroll.
(function () {
  'use strict';
  const host = document.querySelector('.kb-profile');
  const slots = window.KB_CHARACTER_SLOTS;
  const preflight = window.KB_SLOT_RESTORE_PREFLIGHT;
  if (!host || !slots || !preflight || typeof preflight.inspect !== 'function') return;

  const panel = document.createElement('section');
  panel.style.cssText = 'margin-top:14px;padding:14px;border:1px solid #8f7b52;border-radius:6px';
  const title = document.createElement('h3');
  title.textContent = 'Återläsningskontroll · 3H.6';
  title.style.cssText = 'font-size:21px;margin:0 0 8px';
  const intro = document.createElement('p');
  intro.textContent = 'Kontrollerar om en sparplats är redo för framtida karaktärsbyte. Inga data återställs, ändras eller raderas.';
  intro.style.cssText = 'font:13px/1.5 system-ui;color:#d7c49a';
  const list = document.createElement('div');
  const result = document.createElement('p');
  result.setAttribute('role', 'status');
  result.style.cssText = 'font:13px/1.6 system-ui;color:#e2cf9e;white-space:pre-line';

  function draw() {
    list.replaceChildren();
    result.textContent = '';
    let items;
    try { items = slots.list(); }
    catch (e) { result.textContent = 'FAIL: Kunde inte läsa sparplatser: ' + e.message; return; }
    if (!items.length) {
      const empty = document.createElement('p');
      empty.textContent = 'Inga sparplatser att kontrollera.';
      list.appendChild(empty);
      return;
    }
    for (const slot of items) {
      const row = document.createElement('div');
      row.style.cssText = 'padding:10px 0;border-top:1px solid #786c4c';
      const name = document.createElement('div');
      name.textContent = slot.name;
      name.style.cssText = 'font-weight:bold;margin-bottom:8px';
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'Testa återläsning (utan ändring)';
      button.style.cssText = 'min-height:44px;padding:9px 12px;border:1px solid #e0bd73;border-radius:5px;background:#8e412e;color:#fff3d5;font:600 13px system-ui';
      button.addEventListener('click', function () {
        try {
          const check = preflight.inspect(slot.characterId);
          result.textContent = check.ok
            ? 'PASS: ' + check.name + ' är validerad för framtida återläsning.\n' + check.checks.join('\n') + '\nIngen återläsning eller karaktärsväxling har utförts.'
            : 'FAIL: ' + check.reason + '\nIngen data har ändrats.';
        } catch (_) {
          result.textContent = 'FAIL: Kontrollen kunde inte slutföras. Ingen data har ändrats.';
        }
      });
      row.append(name, button);
      list.appendChild(row);
    }
  }

  const refresh = document.createElement('button');
  refresh.type = 'button';
  refresh.textContent = 'Uppdatera kontrollistan';
  refresh.style.cssText = 'min-height:44px;padding:8px 12px;border:1px solid #bda77a;border-radius:5px;background:#283229;color:#f4e9ce;font:600 13px system-ui;margin-top:8px';
  refresh.addEventListener('click', draw);
  panel.append(title, intro, list, refresh, result);
  host.appendChild(panel);
  draw();
})();
