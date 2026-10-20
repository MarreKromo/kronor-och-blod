// KB-03.8.2 / IMP-025 3H.8.2 – skrivskyddat gränssnitt för byteskontroll.
// Inget byte utförs. Inga sparningar ändras.
(function () {
  'use strict';
  const host = document.querySelector('.kb-profile');
  const slots = window.KB_CHARACTER_SLOTS;
  const model = window.KB_CHARACTER;
  const preflight = window.KB_SWITCH_PREFLIGHT;
  if (!host || !slots || !model || !preflight || typeof preflight.inspect !== 'function') return;
  const panel = document.createElement('section');
  panel.style.cssText = 'margin-top:14px;padding:14px;border:1px solid #8f7b52;border-radius:6px';
  const title = document.createElement('h3');
  title.textContent = 'Förbered karaktärsbyte · 3H.8';
  title.style.cssText = 'font-size:21px;margin:0 0 8px';
  const intro = document.createElement('p');
  intro.textContent = 'Välj en annan karaktär och kontrollera om sparningarna är redo. Detta steg byter inte karaktär och ändrar inga data.';
  intro.style.cssText = 'font:13px/1.5 system-ui;color:#d7c49a';
  const label = document.createElement('label');
  label.textContent = 'Karaktär att kontrollera';
  label.style.cssText = 'display:grid;gap:6px;font:14px system-ui;margin-top:12px';
  const select = document.createElement('select');
  select.style.cssText = 'width:100%;min-height:44px;padding:10px;background:#15231b;border:1px solid #a58d56;color:#f4e9ce;border-radius:5px;font:16px system-ui';
  label.appendChild(select);
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Kontrollera karaktärsbyte (utan ändring)';
  button.style.cssText = 'min-height:44px;padding:10px 14px;border:1px solid #e0bd73;border-radius:5px;background:#8e412e;color:#fff3d5;font:600 14px system-ui;margin-top:12px';
  const refresh = document.createElement('button');
  refresh.type = 'button';
  refresh.textContent = 'Uppdatera karaktärslistan';
  refresh.style.cssText = 'min-height:44px;padding:9px 12px;border:1px solid #bda77a;border-radius:5px;background:#283229;color:#f4e9ce;font:600 13px system-ui;margin-top:10px';
  const result = document.createElement('p');
  result.setAttribute('role', 'status');
  result.style.cssText = 'font:13px/1.6 system-ui;color:#e2cf9e;white-space:pre-line';
  function draw() {
    select.replaceChildren();
    result.textContent = '';
    try {
      const current = model.get();
      const others = slots.list().filter(s => !current || s.characterId !== current.characterId);
      if (!others.length) {
        const empty = document.createElement('option');
        empty.value = ''; empty.textContent = 'Ingen annan sparad karaktär';
        select.appendChild(empty); button.disabled = true;
        return;
      }
      for (const slot of others) {
        const option = document.createElement('option');
        option.value = slot.characterId;
        option.textContent = slot.name;
        select.appendChild(option);
      }
      button.disabled = false;
    } catch (err) {
      button.disabled = true;
      result.textContent = 'FAIL: Kunde inte läsa sparplatserna.';
    }
  }
  button.addEventListener('click', function () {
    if (!select.value) return;
    try {
      const check = preflight.inspect(select.value);
      result.textContent = check.ok
        ? 'PASS: ' + check.fromName + ' → ' + check.toName + ' är redo för framtida karaktärsbyte.\n' +
          'Aktiva sparnycklar: ' + check.activeKeysPresent + '\n' +
          check.targetChecks.join('\n') + '\nIngen karaktär har bytts och inga data har ändrats.'
        : 'FAIL: ' + check.reason + '\nIngen karaktär har bytts och inga data har ändrats.';
    } catch (_) {
      result.textContent = 'FAIL: Byteskontrollen kunde inte slutföras. Ingen data har ändrats.';
    }
  });
  refresh.addEventListener('click', draw);
  panel.append(title, intro, label, button, refresh, result);
  host.appendChild(panel);
  draw();
})();
