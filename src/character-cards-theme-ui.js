// IMP-025 3H.11.4 – karaktärskort med historisk känsla.
// Visningslager: ändrar inte kortens val, sparningar eller byteskontroll.
(function () {
  'use strict';
  const host = document.querySelector('.kb-profile');
  if (!host) return;
  const cards = Array.from(host.children).find(node =>
    node.querySelector('article') && node.querySelector('button'));
  if (!cards) return;

  const style = document.createElement('style');
  style.textContent = `
    .kb-character-roster { gap:12px!important; }
    .kb-character-roster article {
      position:relative; overflow:hidden;
      padding:18px 16px!important; border-radius:10px!important;
      background:linear-gradient(145deg,#29382d,#19271f)!important;
      box-shadow:inset 0 1px 0 #f4e9ce13;
    }
    .kb-character-roster article[data-kb-active="true"] {
      background:linear-gradient(145deg,#334937,#24392c)!important;
    }
    .kb-character-roster article::before {
      content:""; position:absolute; inset:7px;
      border:1px solid #d8bd7833; border-radius:5px;
      pointer-events:none;
    }
    .kb-character-roster .kb-card-kicker {
      font:600 10px/1.5 system-ui; letter-spacing:2px;
      text-transform:uppercase; color:#c6ad75; margin-bottom:8px;
    }
    .kb-character-roster .kb-card-name { font-size:clamp(22px,5.5vw,28px)!important; }
    .kb-character-roster .kb-card-tag {
      font:600 11px/1.4 system-ui!important; color:#e6d5a9!important;
      border:1px solid #a88f5c; padding:5px 7px;
      border-radius:4px; text-align:center;
    }
    .kb-character-roster .kb-card-meta { font:14px/1.6 Georgia,serif!important; margin-top:12px!important; }
    .kb-character-roster .kb-card-action {
      margin-top:14px!important; min-height:46px!important;
      background:#7c432f!important; border-color:#c9a86a!important;
      border-radius:5px!important;
    }
    @media(max-width:400px) {
      .kb-character-roster .kb-card-top { align-items:flex-start!important; }
      .kb-character-roster .kb-card-tag { max-width:130px; }
    }
  `;
  document.head.appendChild(style);
  cards.classList.add('kb-character-roster');
  for (const article of cards.querySelectorAll('article')) {
    const top = article.firstElementChild;
    const name = top?.querySelector('strong');
    const tag = top?.querySelector('span');
    const meta = article.querySelector('p');
    if (!top || !name || !tag || !meta) continue;
    top.classList.add('kb-card-top');
    name.classList.add('kb-card-name');
    tag.classList.add('kb-card-tag');
    const active = tag.textContent.includes('Aktiv nu');
    article.dataset.kbActive = String(active);
    const kicker = document.createElement('div');
    kicker.className = 'kb-card-kicker';
    kicker.textContent = active ? 'Din nuvarande gestalt' : 'En annan levnadsbana';
    article.insertBefore(kicker, top);
    if (active) tag.textContent = '● Spelar nu';
    else tag.textContent = 'Vilande';
    meta.classList.add('kb-card-meta');
    meta.textContent = meta.textContent
      .replace(/^Bakgrund: /, '')
      .replace(' · Pågående spel', ' · Ditt pågående äventyr')
      .replace(' · Sparplats: ', ' · Sparad ');
    const button = article.querySelector('button');
    if (button) {
      button.classList.add('kb-card-action');
      // Texten börjar fortsatt med "Välj " för befintlig klicklogik.
      button.textContent = 'Välj ' + name.textContent + ' →';
    }
  }
})();
