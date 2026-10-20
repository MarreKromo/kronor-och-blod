// KB-03.7.5 / IMP-025 3H.7.2 – formulär för separat, inaktiv karaktär.
(function () {
  'use strict';
  const host = document.querySelector('.kb-profile');
  const creator = window.KB_SLOT_CREATOR;
  const model = window.KB_CHARACTER;
  if (!host || !creator || !model) return;
  const panel = document.createElement('section');
  panel.style.cssText = 'margin-top:14px;padding:14px;border:1px solid #8f7b52;border-radius:6px';
  const title = document.createElement('h3');
  title.textContent = 'Skapa separat karaktär · 3H.7';
  title.style.cssText = 'font-size:21px;margin:0 0 8px';
  const description = document.createElement('p');
  description.textContent = 'Den nya karaktären får en egen sparplats men blir inte aktiv ännu. Mk och hans framsteg lämnas orörda.';
  description.style.cssText = 'font:13px/1.5 system-ui;color:#d7c49a';
  const form = document.createElement('form');
  form.style.cssText = 'display:grid;gap:10px;margin-top:12px';
  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Karaktärens namn';
  nameLabel.style.cssText = 'display:grid;gap:6px;font:14px system-ui';
  const name = document.createElement('input');
  name.type = 'text'; name.required = true; name.minLength = 2; name.maxLength = 32;
  name.autocomplete = 'off'; name.placeholder = 'Till exempel Erik';
  name.style.cssText = 'width:100%;min-height:44px;padding:10px;background:#15231b;border:1px solid #a58d56;color:#f4e9ce;border-radius:5px;font:16px system-ui';
  nameLabel.appendChild(name);
  const backgroundLabel = document.createElement('label');
  backgroundLabel.textContent = 'Bakgrund';
  backgroundLabel.style.cssText = 'display:grid;gap:6px;font:14px system-ui';
  const background = document.createElement('select');
  background.style.cssText = 'width:100%;min-height:44px;padding:10px;background:#15231b;border:1px solid #a58d56;color:#f4e9ce;border-radius:5px;font:16px system-ui';
  for (const [key, value] of Object.entries(model.BACKGROUNDS)) {
    const option = document.createElement('option');
    option.value = key; option.textContent = value.label;
    background.appendChild(option);
  }
  backgroundLabel.appendChild(background);
  const button = document.createElement('button');
  button.type = 'submit'; button.textContent = 'Skapa separat sparplats';
  button.style.cssText = 'min-height:44px;padding:10px 14px;border:1px solid #e0bd73;border-radius:5px;background:#8e412e;color:#fff3d5;font:600 14px system-ui';
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  status.style.cssText = 'font:13px/1.5 system-ui;color:#e2cf9e;white-space:pre-line';
  form.append(nameLabel, backgroundLabel, button);
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    button.disabled = true;
    try {
      const before = model.get();
      const created = creator.createSlot(name.value, background.value);
      const after = model.get();
      if (JSON.stringify(before) !== JSON.stringify(after)) throw Error('Aktiv karaktär har oväntat ändrats.');
      status.textContent = 'PASS: ' + created.name + ' har fått en separat sparplats.\nMk är fortfarande aktiv. Karaktärsbyte är inte aktiverat.';
      form.reset();
    } catch (err) {
      status.textContent = 'FAIL: ' + (err && err.message ? err.message : 'Kunde inte skapa sparplats.');
    } finally { button.disabled = false; }
  });
  panel.append(title, description, form, status);
  host.appendChild(panel);
})();
