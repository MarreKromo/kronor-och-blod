// IMP-025 3H.10.1 – samlad karaktärshantering.
// Enbart gränssnitt: flyttar befintliga paneler utan att ändra sparningar eller bytesmotor.
(function () {
  'use strict';
  const host = document.querySelector('.kb-profile');
  if (!host || !window.KB_CHARACTER) return;
  const active = window.KB_CHARACTER.get();
  if (!active) return;

  const switchPanel = Array.from(host.children).find(node =>
    node.querySelector('h3')?.textContent?.startsWith('Byt karaktär · 3H.9'));
  if (!switchPanel) return; // Ändra inget om gränssnittet inte är komplett.

  const heading = document.createElement('section');
  heading.style.cssText = 'margin-top:16px;padding:14px;border:1px solid #bda16a;border-radius:8px;background:#24352b';
  const title = document.createElement('h3');
  title.textContent = 'Mina karaktärer';
  title.style.cssText = 'margin:0 0 6px;font-size:23px';
  const description = document.createElement('p');
  description.textContent = 'Aktiv: ' + active.name + '. Byt karaktär nedan eller öppna fler verktyg för att skapa och kontrollera sparplatser.';
  description.style.cssText = 'margin:0;font:13px/1.6 system-ui;color:#e2cf9e';
  heading.append(title, description);
  host.insertBefore(heading, switchPanel);

  const advanced = document.createElement('details');
  advanced.style.cssText = 'margin-top:14px;padding:12px;border:1px solid #786c4c;border-radius:7px;background:#202b23';
  const summary = document.createElement('summary');
  summary.textContent = 'Skapa karaktär och avancerade sparverktyg';
  summary.style.cssText = 'cursor:pointer;min-height:44px;padding:10px 4px;font:600 14px system-ui;color:#f4e9ce';
  advanced.appendChild(summary);

  const legacyPrefixes = [
    'Separat sparplats', 'Mina sparplatser', 'Testa återläsning',
    'Kontrollera återläsning', 'Skapa separat karaktär',
    'Förbered karaktärsbyte'
  ];
  // Flytta bara kända paneler; den fungerande bytespanelen lämnas orörd.
  const panels = Array.from(host.children).filter(node => {
    if (node === switchPanel || node === heading || node === advanced) return false;
    const h = node.querySelector('h3');
    return !!h && legacyPrefixes.some(prefix => h.textContent.trim().startsWith(prefix));
  });
  panels.forEach(node => advanced.appendChild(node));
  if (panels.length) host.appendChild(advanced);
})();
