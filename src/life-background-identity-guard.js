// IMP-025 3H.12.7 C – fail-closed identity guard for preview only.
// No storage writes. Loaded AFTER life-background-profile-entry.js.
(function () {
  'use strict';
  const root = document.getElementById('kb-life-profile-entry');
  const panel = document.getElementById('kb-life-background-form');
  const characterApi = window.KB_CHARACTER;
  if (!root || !panel || !characterApi) return;
  const form = panel.querySelector('form');
  if (!form) return;
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  status.style.cssText = 'font:13px/1.5 system-ui;color:#e8c891;margin:10px 16px';
  root.insertBefore(status, root.querySelector('.kb-life-form-mount'));
  const initial = characterApi.get();
  const boundId = initial && initial.characterId;
  const boundName = initial && initial.name;
  const idPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  function identityValid() {
    try {
      if (!idPattern.test(boundId)) return false;
      const current = characterApi.get();
      if (!current || current.characterId !== boundId || current.name !== boundName) return false;
      const raw = localStorage.getItem('kronor-och-blod.character.v1');
      const identityRaw = localStorage.getItem('kronor-och-blod.character.identity.v1');
      if (!raw || !identityRaw) return false;
      const character = JSON.parse(raw), identity = JSON.parse(identityRaw);
      return character && character.version === 1 && character.name === boundName &&
        identity && identity.version === 1 && identity.characterId === boundId && identity.characterRaw === raw &&
        localStorage.getItem('kronor-och-blod.switch.journal.v1') === null &&
        localStorage.getItem('kronor-och-blod.life-background.write-journal.v1') === null;
    } catch (_) { return false; }
  }
  function blockIfChanged(event) {
    if (identityValid()) return false;
    if (event) { event.preventDefault(); event.stopImmediatePropagation(); }
    form.reset();
    const preview = panel.querySelector('.kb-life-preview');
    if (preview) preview.textContent = 'Förhandsgranskningen avbröts: aktiv karaktär kan inte verifieras.';
    root.open = false;
    status.textContent = 'Identiteten har ändrats eller kan inte verifieras. Ladda om spelet innan du fortsätter.';
    return true;
  }
  form.addEventListener('submit', blockIfChanged, true);
  root.addEventListener('toggle', function () { if (root.open) blockIfChanged(); });
  window.addEventListener('pageshow', function () { blockIfChanged(); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) blockIfChanged(); });
  if (!identityValid()) blockIfChanged();
})();
