// KB-03.6.6 / IMP-025 steg 3H.1 – exportera säkerhetskopia innan flerkaraktärsstöd.
// Den tidigare knappen som kunde radera aktiv karaktär är tillfälligt spärrad.
(function () {
  'use strict';
  const model = window.KB_CHARACTER;
  if (!model) return;
  const clock = document.querySelector('.clock');
  if (!clock) return;
  const section = document.createElement('section');
  section.setAttribute('aria-label', 'Din karaktär');
  section.style.cssText = 'max-width:1050px;margin:12px auto;padding:16px;background:#283229;border:1px solid #786c4c;color:#f2e7ce';
  section.innerHTML = '<div style="font:11px system-ui;letter-spacing:2px;color:#c8b17a">KB-03.6.6 · SPELARE</div><h2 style="margin:8px 0 12px">Din karaktär</h2><div id="kbCharacterContent"></div>';
  clock.insertAdjacentElement('afterend', section);
  const host = section.querySelector('#kbCharacterContent');
  const buttonStyle = 'min-height:44px;padding:10px 14px;border:1px solid #e0bd73;border-radius:5px;background:#8e412e;color:#fff3d5;font:600 14px system-ui';
  const SAVE_KEYS = [
    'kronor-och-blod.character.v1', 'kronor-och-blod.character.identity.v1',
    'kronor-och-blod.story.v1', 'kronor-och-blod.story.owner.v1',
    'kronor-och-blod.encounter.v1', 'kronor-och-blod.encounter.owner.v1',
    'kronor-och-blod.investigation.v1', 'kronor-och-blod.investigation.owner.v1',
    'kronor-och-blod.calendar.v1', 'kronor-och-blod.calendar.owner.v1',
    'kronor-och-blod.daylog.v1', 'kronor-och-blod.daylog.owner.v1',
    'kronor-och-blod.backup.pre-migration.v1'
  ];
  function makeButton(text) { const b = document.createElement('button'); b.type = 'button'; b.textContent = text; b.style.cssText = buttonStyle; return b; }
  function exportSave() {
    const c = model.get();
    if (!c || !c.characterId) throw new Error('Karaktärs-ID saknas. Exporten avbröts.');
    const entries = {};
    SAVE_KEYS.forEach(key => { const raw = localStorage.getItem(key); if (raw !== null) entries[key] = raw; });
    const identity = JSON.parse(entries['kronor-och-blod.character.identity.v1'] || 'null');
    if (!identity || identity.characterId !== c.characterId || identity.characterRaw !== entries['kronor-och-blod.character.v1']) {
      throw new Error('Karaktärens identitet kunde inte verifieras. Exporten avbröts.');
    }
    const payload = JSON.stringify({ format: 'kronor-och-blod-backup', version: 1, createdAt: new Date().toISOString(), characterId: c.characterId, entries }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'kronor-och-blod-sakerhetskopia.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }
  function draw() {
    host.replaceChildren();
    const c = model.get();
    if (c) {
      const title = document.createElement('h3'); title.textContent = c.name;
      const bg = document.createElement('p'); bg.textContent = 'Bakgrund: ' + model.BACKGROUNDS[c.background].label;
      const place = document.createElement('p'); place.textContent = 'Startplats: Skara';
      const stats = document.createElement('p'); stats.textContent = 'Styrka ' + c.attributes.styrka + ' · List ' + c.attributes.list + ' · Anseende ' + c.attributes.anseende;
      const note = document.createElement('p'); note.textContent = 'Karaktären sparas lokalt i denna webbläsare. En exporterad säkerhetskopia kan sparas i Filer. Återställning från fil finns ännu inte i spelet.';
      note.style.cssText = 'font:12px/1.6 system-ui;color:#c4b995';
      const message = document.createElement('p'); message.setAttribute('role', 'status'); message.style.cssText = 'font:13px/1.6 system-ui;color:#d5bd82';
      const exportButton = makeButton('Exportera säkerhetskopia');
      exportButton.addEventListener('click', () => {
        try { exportSave(); message.textContent = 'Export begärd. Kontrollera att JSON-filen verkligen har sparats i Filer.'; }
        catch (err) { message.textContent = 'Export misslyckades: ' + err.message; }
      });
      const locked = makeButton('Skapa ny karaktär (kommer snart)');
      locked.disabled = true;
      locked.style.opacity = '0.55'; locked.style.marginLeft = '8px';
      const explanation = document.createElement('p'); explanation.textContent = 'Karaktärsbyte är tillfälligt låst tills separata sparplatser har byggts och testats.';
      explanation.style.cssText = 'font:12px/1.6 system-ui;color:#c4b995';
      host.append(title, bg, place, stats, note, exportButton, locked, message, explanation);
      return;
    }
    const form = document.createElement('form'); form.style.cssText = 'display:grid;gap:10px;max-width:450px';
    const nameLabel = document.createElement('label'); nameLabel.textContent = 'Namn (2–32 tecken)'; nameLabel.htmlFor = 'kbCharacterName';
    const name = document.createElement('input'); name.id = 'kbCharacterName'; name.required = true; name.minLength = 2; name.maxLength = 32; name.autocomplete = 'off'; name.style.cssText = 'min-height:44px;padding:9px;font:16px system-ui;width:100%;border-radius:4px';
    const bgLabel = document.createElement('label'); bgLabel.textContent = 'Bakgrund'; bgLabel.htmlFor = 'kbCharacterBackground';
    const select = document.createElement('select'); select.id = 'kbCharacterBackground'; select.style.cssText = 'min-height:44px;padding:9px;font:16px system-ui';
    for (const [key, value] of Object.entries(model.BACKGROUNDS)) { const opt = document.createElement('option'); opt.value = key; opt.textContent = value.label; select.appendChild(opt); }
    const info = document.createElement('p'); info.style.cssText = 'font:13px system-ui;color:#c4b995;margin:0';
    function preview() { const b = model.BACKGROUNDS[select.value]; info.textContent = b.description + ' Styrka ' + b.attributes.styrka + ', list ' + b.attributes.list + ', anseende ' + b.attributes.anseende + '.'; }
    select.addEventListener('change', preview); preview();
    const error = document.createElement('p'); error.setAttribute('role','alert'); error.style.cssText = 'color:#ffb8a8;margin:0';
    const submit = document.createElement('button'); submit.type = 'submit'; submit.textContent = 'Börja ditt liv i Skara'; submit.style.cssText = buttonStyle;
    form.addEventListener('submit', e => { e.preventDefault(); try { model.create(name.value, select.value); draw(); } catch (err) { error.textContent = err.message; } });
    form.append(nameLabel,name,bgLabel,select,info,error,submit); host.appendChild(form);
  }
  draw();
})();
