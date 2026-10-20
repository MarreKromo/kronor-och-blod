// IMP-025 3H.11.5 – presentation av den aktiva karaktären.
// Endast visning: ingen skrivning, ingen ändring av karaktärsdata.
(function () {
  'use strict';
  const panel = document.querySelector('.kb-profile');
  if (!panel) return;
  const style = document.createElement('style');
  style.textContent = `
    .kb-profile{background:linear-gradient(150deg,#303e32,#1b2a21)!important;border-color:#b79a62!important}
    .kb-profile > small:first-child{display:block;font:600 11px/1.5 system-ui!important;letter-spacing:2px;text-transform:uppercase;color:#c9ae77!important;margin-bottom:12px}
    .kb-profile-head{gap:14px!important;align-items:center!important}
    .kb-profile-head h3{font-size:clamp(30px,8vw,40px)!important;line-height:1.05;margin:0 0 8px!important}
    .kb-profile-avatar{width:76px!important;height:88px!important;border-radius:8px!important;border-color:#bfa56f!important;background:linear-gradient(145deg,#283b2c,#17251d)!important;color:#dfc990!important}
    .kb-profile-grid{gap:10px!important;margin-top:18px!important}
    .kb-profile-stat{padding:14px 4px!important;background:#19271e!important;border-color:#86744f!important;border-radius:8px!important}
    .kb-profile-stat strong{font-size:27px!important;color:#f5e5c1}
    .kb-profile-note{display:none!important}
    @media(max-width:380px){.kb-profile-head{gap:10px!important}.kb-profile-avatar{width:62px!important;height:74px!important}.kb-profile-head h3{font-size:28px!important}}
  `;
  document.head.appendChild(style);
  function refresh() {
    const kicker = panel.querySelector(':scope > small:first-child');
    if (kicker && kicker.textContent.includes('KB-03.3')) kicker.textContent = 'DIN KARAKTÄR · VÄSTERGÖTLAND';
    const head = panel.querySelector('.kb-profile-head');
    if (!head) return;
    const info = head.children[1];
    if (!info) return;
    // Äldre prototyptext angav kön och ålder utan att de sparades som data.
    // Dölj den raden i stället för att visa ogrundade uppgifter.
    const age = Array.from(info.children).find(n => /^Man · 18 år$/.test(n.textContent.trim()));
    if (age) age.hidden = true;
    const avatar = head.querySelector('.kb-profile-avatar');
    if (avatar) { avatar.textContent = '♜'; avatar.setAttribute('aria-label','Dekorativt emblem'); }
  }
  refresh();
  // Profilen kan renderas om när den äldre karaktärsvyn ändras.
  // Observera bara profilens översta noder; gör aldrig skrivningar till lagring.
  const observer = new MutationObserver(function () {
    observer.disconnect();
    refresh();
    observer.observe(panel,{childList:true});
  });
  observer.observe(panel,{childList:true});
})();
