// KB-03.3 – profilvy. Befintlig sparfil ändras inte.
(function () {
  'use strict';
  const model = window.KB_CHARACTER;
  if (!model) return;
  const old = document.querySelector('section[aria-label="Din karaktär"]');
  if (!old) return;
  const style = document.createElement('style');
  style.textContent = '.kb-profile{border:1px solid #9b8354;background:linear-gradient(145deg,#303b31,#1d2721);color:#f4e9ce;padding:18px;border-radius:10px;margin-top:12px}.kb-profile h3{margin:4px 0;font-size:25px}.kb-profile small{color:#d7c49a}.kb-profile-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:16px}.kb-profile-stat{padding:12px 5px;text-align:center;background:#18241d;border:1px solid #786c4c;border-radius:6px}.kb-profile-stat strong{display:block;font-size:23px}.kb-profile-stat span{font:12px system-ui;color:#d7c49a}.kb-profile-avatar{width:72px;height:86px;border:1px solid #bca16b;border-radius:5px;background:#18241d;display:grid;place-items:center;font-size:37px;flex-shrink:0}.kb-profile-head{display:flex;gap:15px;align-items:center}.kb-profile-note{font:12px system-ui;color:#d7c49a;margin:12px 0 0}';
  document.head.appendChild(style);
  const panel = document.createElement('div');
  panel.className = 'kb-profile';
  panel.setAttribute('aria-label', 'Karaktärsprofil');
  old.insertAdjacentElement('afterend', panel);
  function el(tag, text, className) { const node = document.createElement(tag); if (text != null) node.textContent = text; if (className) node.className = className; return node; }
  function render() {
    panel.replaceChildren();
    const c = model.get();
    if (!c) { panel.hidden = true; return; }
    panel.hidden = false;
    panel.appendChild(el('small','KARAKTÄRSPROFIL · KB-03.3'));
    const head = el('div',null,'kb-profile-head');
    const avatar = el('div','♟','kb-profile-avatar'); avatar.setAttribute('aria-label','Platshållare för framtida porträtt');
    const details = el('div');
    details.append(el('h3',c.name),el('div','Man · 18 år'),el('div',model.BACKGROUNDS[c.background].label+' · Skara'),el('small','Västergötland · år 1250'));
    head.append(avatar,details); panel.appendChild(head);
    const grid = el('div',null,'kb-profile-grid');
    for (const [label,key] of [['Styrka','styrka'],['List','list'],['Anseende','anseende']]) { const cell = el('div',null,'kb-profile-stat'); cell.append(el('strong',String(c.attributes[key])),el('span',label)); grid.appendChild(cell); }
    panel.append(grid,el('p','Porträtt, utrustning och livshistoria kommer i senare versioner.','kb-profile-note'));
  }
  render();
  const host = old.querySelector('#kbCharacterContent');
  if (host) new MutationObserver(render).observe(host,{childList:true});
})();
