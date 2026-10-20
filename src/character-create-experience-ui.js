// IMP-025 3H.11.8 – karaktärsskapande som del av spelvyn.
// Flyttar ENBART det befintliga formuläret. Ingen sparning eller logik ändras.
(function () {
  'use strict';
  const host = document.querySelector('.kb-profile');
  if (!host) return;
  const manager = Array.from(host.children).find(n =>
    n.querySelector('h3')?.textContent === 'Mina karaktärer');
  const advanced = Array.from(host.children).find(n =>
    n.tagName === 'DETAILS' &&
    n.querySelector('summary')?.textContent?.includes('Skapa karaktär'));
  const creatorPanel = advanced && Array.from(advanced.children).find(n =>
    n.querySelector('h3')?.textContent?.startsWith('Skapa separat karaktär'));
  const button = manager?.querySelector('button');
  const form = creatorPanel?.querySelector('form');
  const nameInput = form?.querySelector('input[type="text"]');
  if (!manager || !advanced || !creatorPanel || !button || !form || !nameInput) return;

  const style = document.createElement('style');
  style.textContent = `
    .kb-create-experience {margin:12px 0 16px;border:1px solid #bba06a;
      border-radius:9px;background:linear-gradient(145deg,#293b2e,#1c2c22);overflow:hidden}
    .kb-create-experience > summary {cursor:pointer;padding:13px 16px;
      font:600 15px/1.5 system-ui;color:#f4e9ce;min-height:48px}
    .kb-create-experience[open] > summary {border-bottom:1px solid #8e7952}
    .kb-create-experience > section {margin:0!important;border:0!important;
      padding:16px!important}
    .kb-create-experience > section h3 {font-size:22px!important;
      margin:0 0 10px!important}
    .kb-create-experience > section form button[type="submit"] {
      min-height:48px!important;border-radius:6px!important}
    .kb-create-experience > section [role="status"] {overflow-wrap:anywhere}
  `;
  document.head.appendChild(style);

  const details = document.createElement('details');
  details.className = 'kb-create-experience';
  const summary = document.createElement('summary');
  summary.textContent = 'Ny karaktär – namn och bakgrund';
  details.append(summary, creatorPanel);
  manager.insertAdjacentElement('afterend', details);

  const title = creatorPanel.querySelector('h3');
  if (title) title.textContent = 'Börja ett nytt liv';
  const intro = creatorPanel.querySelector('p');
  if (intro) intro.textContent =
    'Ge din nya karaktär ett namn och välj en bakgrund. Din nuvarande karaktär och dess framsteg bevaras.';
  const submit = form.querySelector('button[type="submit"]');
  if (submit) submit.textContent = 'Skapa karaktär';

  // Fånga klicket före den äldre knapphanteraren: den öppnar annars
  // avancerade verktyg där formuläret inte längre ligger.
  button.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    details.open = true;
    details.scrollIntoView({behavior:'smooth',block:'start'});
    nameInput.focus({preventScroll:true});
  }, true);
})();
