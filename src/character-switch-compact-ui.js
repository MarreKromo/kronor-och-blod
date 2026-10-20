// IMP-025 3H.11.3 – kompakt karaktärsbyte via kort.
// Enbart presentation. Den befintliga kontrollen och bytesmotorn används oförändrade.
(function () {
  'use strict';
  const host = document.querySelector('.kb-profile');
  if (!host) return;
  const switchPanel = Array.from(host.children).find(node =>
    node.querySelector('h3')?.textContent?.startsWith('Byt karaktär · 3H.9'));
  const cards = Array.from(host.children).find(node =>
    node.querySelector('article') && node.querySelector('button'));
  if (!switchPanel || !cards || !switchPanel.querySelector('select')) return;

  const details = document.createElement('details');
  details.style.cssText = 'margin:14px 0;padding:10px 14px;border:1px solid #786c4c;border-radius:8px;background:#1b2920';
  const summary = document.createElement('summary');
  summary.textContent = 'Byt karaktär';
  summary.style.cssText = 'cursor:pointer;min-height:44px;padding:12px 2px;font:600 15px system-ui;color:#f4e9ce';
  details.appendChild(summary);
  switchPanel.insertAdjacentElement('beforebegin', details);
  details.appendChild(switchPanel);
  switchPanel.querySelector('h3').textContent = 'Bekräfta karaktärsbyte';
  switchPanel.style.marginTop = '8px';

  // Fångas före kortets befintliga klicklyssnare, så att den kan
  // välja målet och scrolla till en synlig förkontroll.
  cards.addEventListener('click', function (event) {
    const button = event.target.closest('button');
    if (!button || !cards.contains(button) || !button.textContent.startsWith('Välj ')) return;
    details.open = true;
  }, true);
})();
