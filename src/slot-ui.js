// KB-03.6.8 / IMP-025 3H.3 – manuell kopia av aktiv karaktär till separat sparplats.
// Inget byte, ingen automatisk migrering, ingen radering.
(function () {
  'use strict';
  const slots = window.KB_CHARACTER_SLOTS;
  const character = window.KB_CHARACTER;
  const host = document.getElementById('kbCharacterContent');
  if (!slots || !character || !host) return;
  const wrap = document.createElement('div');
  wrap.style.cssText = 'margin-top:16px;padding:14px;border:1px solid #786c4c;border-radius:6px';
  const title = document.createElement('h3');
  title.textContent = 'Separat sparplats · 3H.3';
  title.style.margin = '0 0 8px';
  const description = document.createElement('p');
  description.textContent = 'Skapar en lokal kopia av den aktiva karaktärens framsteg. Den externa JSON-säkerhetskopian ska också behållas. Karaktärsbyte är fortfarande låst.';
  description.style.cssText = 'font:13px/1.5 system-ui;color:#c4b995';
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Spara i egen sparplats';
  button.style.cssText = 'min-height:44px;padding:10px 14px;border:1px solid #e0bd73;border-radius:5px;background:#8e412e;color:#fff3d5;font:600 14px system-ui';
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  status.style.cssText = 'font:13px/1.5 system-ui;color:#d5bd82';
  button.addEventListener('click', () => {
    try {
      const before = character.get();
      if (!before || !before.characterId) throw Error('Ingen verifierad karaktär är aktiv.');
      const result = slots.saveActive();
      if (result.characterId !== before.characterId) throw Error('Fel karaktärs-ID efter sparning.');
      const found = slots.list().some(x => x.characterId === before.characterId);
      if (!found) throw Error('Sparplatsen kunde inte verifieras i listan.');
      status.textContent = 'Sparplats sparad och verifierad för ' + result.name + '. Din aktiva karaktär har inte bytts.';
    } catch (err) {
      status.textContent = 'Sparningen avbröts: ' + (err && err.message ? err.message : 'Okänt fel') + ' Din aktiva karaktär har inte bytts.';
    }
  });
  wrap.append(title, description, button, status);
  function mount() {
    if (!character.get()) { wrap.remove(); return; }
    if (wrap.parentElement !== host) host.appendChild(wrap);
  }
  const observer = new MutationObserver(() => {
    if (!character.get()) { wrap.remove(); return; }
    if (wrap.parentElement !== host) host.appendChild(wrap);
  });
  observer.observe(host, { childList: true });
  mount();
})();
