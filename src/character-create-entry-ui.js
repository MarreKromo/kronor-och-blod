// IMP-025 3H.10.3 – tydlig och säker ingång till ny karaktär.
// Återanvänder befintligt formulär och KB_SLOT_CREATOR; ingen ny sparlogik.
(function () {
  'use strict';
  const host = document.querySelector('.kb-profile');
  const model = window.KB_CHARACTER;
  if (!host || !model) return;
  const heading = Array.from(host.children).find(n =>
    n.querySelector('h3')?.textContent === 'Mina karaktärer');
  const advanced = Array.from(host.children).find(n =>
    n.tagName === 'DETAILS' && n.querySelector('summary')?.textContent?.includes('Skapa karaktär'));
  const creatorPanel = advanced && Array.from(advanced.children).find(n =>
    n.querySelector('h3')?.textContent?.startsWith('Skapa separat karaktär'));
  const form = creatorPanel?.querySelector('form');
  if (!heading || !advanced || !creatorPanel || !form) return;
  const name = form.querySelector('input[type="text"]');
  const status = creatorPanel.querySelector('[role="status"]');
  if (!name || !status) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = '+ Skapa ny karaktär';
  button.style.cssText = 'margin-top:12px;min-height:46px;width:100%;padding:10px 14px;border:1px solid #e0bd73;border-radius:6px;background:#8e412e;color:#fff3d5;font:600 15px system-ui';
  button.addEventListener('click', function () {
    advanced.open = true;
    creatorPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    name.focus({ preventScroll: true });
  });
  heading.appendChild(button);

  // Korrigera äldre testtexter som felaktigt nämner Mk och inaktiverat byte.
  const description = creatorPanel.querySelector('p');
  if (description) description.textContent =
    'Skapa en egen sparplats utan att ändra din aktiva karaktär (' +
    (model.get()?.name || 'okänd') + '). Välj sedan karaktären i listan.';
  form.addEventListener('submit', function () {
    // Befintlig submit-hanterare har redan skapat/avvisat sparplatsen.
    queueMicrotask(function () {
      if (!status.textContent.startsWith('PASS:')) return;
      const active = model.get()?.name || 'Din nuvarande karaktär';
      status.textContent = status.textContent.split('\n')[0] +
        '\n' + active + ' är fortfarande aktiv. Uppdatera sidan för att se den nya karaktären bland korten.';
    });
  });
})();
