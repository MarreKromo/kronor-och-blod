// IMP-025 3H.11.6 – kompakt kort för redan visad aktiv karaktär.
// Endast presentation. Inga sparningar, valknappar eller bytesfunktioner ändras.
(function () {
  'use strict';
  const roster = document.querySelector('.kb-character-roster');
  if (!roster) return;
  const active = roster.querySelector('article[data-kb-active="true"]');
  if (!active) return;

  const style = document.createElement('style');
  style.textContent = `
    .kb-character-roster article.kb-active-compact {
      padding:12px 14px!important;
      border-color:#a8915e!important;
      background:linear-gradient(145deg,#2d4031,#23352a)!important;
    }
    .kb-character-roster article.kb-active-compact::before { inset:5px!important; }
    .kb-character-roster article.kb-active-compact .kb-card-kicker,
    .kb-character-roster article.kb-active-compact .kb-card-meta { display:none!important; }
    .kb-character-roster article.kb-active-compact .kb-card-top {
      align-items:center!important;
      gap:10px!important;
    }
    .kb-character-roster article.kb-active-compact .kb-card-name {
      font-size:19px!important;
      line-height:1.3!important;
    }
    .kb-character-roster article.kb-active-compact .kb-card-tag {
      font-size:11px!important;
      white-space:nowrap;
    }
  `;
  document.head.appendChild(style);
  active.classList.add('kb-active-compact');
})();
