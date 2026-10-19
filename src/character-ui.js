// KB-03.2: fristående karaktärsskapare, kopplas till befintlig KB_CHARACTER.
(function () {
  'use strict';
  const model = window.KB_CHARACTER;
  if (!model) return;
  const clock = document.querySelector('.clock');
  if (!clock) return;
  const section = document.createElement('section');
  section.setAttribute('aria-label', 'Din karaktär');
  section.style.cssText = 'max-width:1050px;margin:12px auto;padding:16px;background:#283229;border:1px solid #786c4c;color:#f2e7ce';
  section.innerHTML = '<div style="font:11px system-ui;letter-spacing:2px;color:#c8b17a">KB-03.2 · SPELARE</div><h2 style="margin:8px 0 12px">Din karaktär</h2><div id="kbCharacterContent"></div>';
  clock.insertAdjacentElement('afterend', section);
  const host = section.querySelector('#kbCharacterContent');
  const buttonStyle = 'min-height:44px;padding:10px 14px;border:1px solid #e0bd73;border-radius:5px;background:#8e412e;color:#fff3d5;font:600 14px system-ui';
  function draw() {
    host.replaceChildren();
    const c = model.get();
    if (c) {
      const title = document.createElement('h3'); title.textContent = c.name;
      const bg = document.createElement('p'); bg.textContent = 'Bakgrund: ' + model.BACKGROUNDS[c.background].label;
      const place = document.createElement('p'); place.textContent = 'Startplats: Skara';
      const stats = document.createElement('p'); stats.textContent = 'Styrka ' + c.attributes.styrka + ' · List ' + c.attributes.list + ' · Anseende ' + c.attributes.anseende;
      const note = document.createElement('p'); note.textContent = 'Karaktären sparas lokalt i denna webbläsare.';
      note.style.cssText = 'font:12px system-ui;color:#c4b995';
      const reset = document.createElement('button'); reset.type = 'button'; reset.textContent = 'Skapa ny karaktär'; reset.style.cssText = buttonStyle;
      reset.addEventListener('click', () => { if (window.confirm('Ersätta din nuvarande karaktär?')) { model.reset(); draw(); } });
      host.append(title,bg,place,stats,note,reset);
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
