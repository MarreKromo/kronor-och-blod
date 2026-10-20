// KB-03.9.5 / IMP-025 3H.9.5 – bekräftat karaktärsbyte.
// Kräver KB_CHARACTER_SWITCH och byteskontroll. Skriver endast vid bekräftat byte.
(function () {
  'use strict';
  const host = document.querySelector('.kb-profile');
  const model = window.KB_CHARACTER;
  const slots = window.KB_CHARACTER_SLOTS;
  const preflight = window.KB_SWITCH_PREFLIGHT;
  const engine = window.KB_CHARACTER_SWITCH;
  if (!host || !model || !slots || !preflight || !engine ||
      typeof engine.switchTo !== 'function') return;

  const panel = document.createElement('section');
  panel.style.cssText = 'margin-top:14px;padding:14px;border:1px solid #bda16a;border-radius:6px;background:#1b2920';
  const title = document.createElement('h3');
  title.textContent = 'Byt karaktär · 3H.9';
  title.style.cssText = 'font-size:21px;margin:0 0 8px';
  const intro = document.createElement('p');
  intro.textContent = 'Spara den aktiva karaktären och fortsätt med en annan. Varje karaktär behåller sin egen sparning.';
  intro.style.cssText = 'font:13px/1.5 system-ui;color:#d7c49a';
  const label = document.createElement('label');
  label.textContent = 'Välj karaktär';
  label.style.cssText = 'display:grid;gap:6px;font:14px system-ui;margin-top:12px';
  const select = document.createElement('select');
  select.style.cssText = 'width:100%;min-height:44px;padding:10px;background:#15231b;border:1px solid #a58d56;color:#f4e9ce;border-radius:5px;font:16px system-ui';
  label.appendChild(select);
  const checkButton = document.createElement('button');
  checkButton.type = 'button';
  checkButton.textContent = 'Kontrollera byte';
  checkButton.style.cssText = 'min-height:44px;padding:10px 14px;border:1px solid #bda77a;border-radius:5px;background:#283229;color:#f4e9ce;font:600 14px system-ui;margin-top:12px';
  const confirmBox = document.createElement('div');
  confirmBox.hidden = true;
  confirmBox.style.cssText = 'margin-top:12px;padding:12px;border:1px solid #a58d56;border-radius:5px';
  const confirmText = document.createElement('p');
  confirmText.style.cssText = 'font:13px/1.5 system-ui;color:#f4e9ce;white-space:pre-line';
  const confirmButton = document.createElement('button');
  confirmButton.type = 'button';
  confirmButton.textContent = 'Ja, byt karaktär';
  confirmButton.style.cssText = 'min-height:44px;padding:10px 14px;border:1px solid #e0bd73;border-radius:5px;background:#8e412e;color:#fff3d5;font:600 14px system-ui';
  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.textContent = 'Avbryt';
  cancelButton.style.cssText = 'min-height:44px;padding:10px 14px;border:1px solid #bda77a;border-radius:5px;background:#283229;color:#f4e9ce;font:600 14px system-ui;margin-left:8px';
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  status.style.cssText = 'font:13px/1.6 system-ui;color:#e2cf9e;white-space:pre-line';
  let approved = null;
  let switching = false;
  function resetApproval() {
    approved = null;
    confirmBox.hidden = true;
    confirmButton.disabled = false;
  }
  function draw() {
    resetApproval();
    select.replaceChildren();
    status.textContent = '';
    try {
      const current = model.get();
      const others = slots.list().filter(s => current && s.characterId !== current.characterId);
      if (!others.length) {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Ingen annan karaktär finns';
        select.appendChild(option);
      } else {
        for (const slot of others) {
          const option = document.createElement('option');
          option.value = slot.characterId;
          option.textContent = slot.name;
          select.appendChild(option);
        }
      }
      checkButton.disabled = !others.length;
    } catch (_) {
      checkButton.disabled = true;
      status.textContent = 'FAIL: Kunde inte läsa karaktärerna.';
    }
  }
  select.addEventListener('change', function () { resetApproval(); status.textContent = ''; });
  checkButton.addEventListener('click', function () {
    resetApproval();
    if (!select.value || switching) return;
    try {
      const result = preflight.inspect(select.value);
      if (!result.ok) {
        status.textContent = 'FAIL: ' + result.reason + '\nInga sparningar ändrades.';
        return;
      }
      approved = { targetId: select.value, fromId: result.fromId };
      confirmText.textContent =
        'Från: ' + result.fromName + '\nTill: ' + result.toName +
        '\n\nDen aktiva karaktärens framsteg sparas innan bytet. Sidan laddas om direkt efteråt.';
      confirmBox.hidden = false;
      status.textContent = 'PASS: Förkontrollen godkänd. Inga sparningar har ändrats ännu.';
    } catch (error) {
      status.textContent = 'FAIL: ' + (error && error.message ? error.message : 'Kontrollen misslyckades.');
    }
  });
  cancelButton.addEventListener('click', function () {
    resetApproval();
    status.textContent = 'Avbrutet. Inga sparningar har ändrats.';
  });
  confirmButton.addEventListener('click', function () {
    if (!approved || switching || select.value !== approved.targetId) return;
    const current = model.get();
    if (!current || current.characterId !== approved.fromId) {
      resetApproval();
      status.textContent = 'FAIL: Aktiv karaktär ändrades. Kontrollera bytet igen.';
      return;
    }
    switching = true;
    confirmButton.disabled = true;
    checkButton.disabled = true;
    select.disabled = true;
    status.textContent = 'Byter karaktär och verifierar sparningarna…';
    try {
      const result = engine.switchTo(approved.targetId);
      if (!result || !result.ok || !result.reloadRequired)
        throw Error('Bytesmotorn bekräftade inte bytet.');
      // In-memory-moduler tillhör fortfarande den gamla karaktären tills omladdning.
      // Gör inga ytterligare operationer med spelmodulerna här.
      status.textContent = 'PASS: Bytt till ' + result.toName + '. Laddar om spelet…';
      window.location.reload();
    } catch (error) {
      status.textContent = 'FAIL: ' + (error && error.message ? error.message : 'Byte misslyckades.') +
        '\nLadda om sidan innan du fortsätter om du är osäker.';
      switching = false;
      select.disabled = false;
      draw();
    }
  });
  confirmBox.append(confirmText, confirmButton, cancelButton);
  panel.append(title, intro, label, select, checkButton, confirmBox, status);
  host.appendChild(panel);
  draw();
})();
