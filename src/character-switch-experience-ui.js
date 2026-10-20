// IMP-025 3H.11.9 – renare presentation av säkert karaktärsbyte.
// Endast gränssnitt. Ändrar aldrig sparningar, godkännanden eller bytesmotor.
(function () {
  'use strict';
  const host = document.querySelector('.kb-profile');
  if (!host) return;
  const panel = Array.from(host.querySelectorAll('section')).find(node =>
    node.querySelector('h3')?.textContent === 'Bekräfta karaktärsbyte');
  if (!panel) return;
  const title = panel.querySelector('h3');
  const intro = Array.from(panel.children).find(node => node.tagName === 'P');
  const select = panel.querySelector('select');
  const check = Array.from(panel.querySelectorAll('button')).find(node =>
    node.textContent.trim() === 'Kontrollera byte');
  const status = panel.querySelector('[role="status"]');
  if (!title || !select || !check || !status) return;

  title.textContent = 'Fortsätt en annan berättelse';
  if (intro) intro.textContent =
    'Välj vem du vill spela som. Vi kontrollerar först att bytet är säkert. ' +
    'Ingenting ändras förrän du bekräftar.';
  check.textContent = 'Granska karaktärsbyte';
  const confirm = Array.from(panel.querySelectorAll('button')).find(node =>
    node.textContent.trim() === 'Ja, byt karaktär');
  if (confirm) confirm.textContent = 'Ja, fortsätt som vald karaktär';

  const style = document.createElement('style');
  style.textContent = `
    .kb-switch-experience {border:1px solid #b69b66!important;
      border-radius:8px!important;background:linear-gradient(145deg,#2b3b2f,#1c2b22)!important;
      padding:16px!important}
    .kb-switch-experience h3 {font-size:23px!important;margin:0 0 10px!important}
    .kb-switch-experience button {border-radius:6px!important;min-height:46px!important}
    .kb-switch-experience [role="status"] {overflow-wrap:anywhere}
    .kb-switch-experience .kb-switch-notice {color:#e6d5ac!important}
    .kb-switch-experience .kb-switch-error {color:#f1b4a1!important}
  `;
  document.head.appendChild(style);
  panel.classList.add('kb-switch-experience');

  // Den äldre bytesmotorn skriver PASS/FAIL till ett statusfält.
  // Översätt bara synlig text. Orsaker och varningar bevaras.
  function clean(message) {
    if (message.startsWith('PASS: Förkontrollen godkänd.')) {
      return 'Bytet är kontrollerat. Läs igenom uppgifterna och bekräfta om du vill fortsätta.';
    }
    if (message.startsWith('PASS: Bytt till ')) {
      return message.replace(/^PASS: Bytt till /, 'Du fortsätter nu som ');
    }
    if (message.startsWith('FAIL: ')) {
      return 'Bytet kunde inte genomföras: ' + message.slice(6);
    }
    return message;
  }
  let busy = false;
  const observer = new MutationObserver(function () {
    if (busy) return;
    const before = status.textContent;
    const after = clean(before);
    if (after === before) return;
    busy = true;
    status.textContent = after;
    busy = false;
  });
  observer.observe(status, {childList:true, characterData:true, subtree:true});
})();
