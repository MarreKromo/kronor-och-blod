// IMP-025 3H.12.7 B – koppla förhandsvisning till profilen, utan sparning.
(function () {
  'use strict';
  const host = document.querySelector('.kb-profile');
  const model = window.KB_LIFE_BACKGROUND_MODEL;
  const character = window.KB_CHARACTER && window.KB_CHARACTER.get();
  if (!host || !model || !character || document.getElementById('kb-life-profile-entry')) return;
  const wrapper = document.createElement('details');
  wrapper.id = 'kb-life-profile-entry';
  wrapper.style.cssText = 'margin-top:18px;border:1px solid #a68c5c;border-radius:9px;background:#1b2b22;overflow:hidden';
  const summary = document.createElement('summary');
  summary.textContent = 'Din livsbakgrund · Förhandsvisning';
  summary.style.cssText = 'cursor:pointer;padding:16px;font:600 16px system-ui;min-height:50px;color:#f4e9ce';
  const intro = document.createElement('p');
  intro.textContent = 'Utforska möjliga val för ' + character.name + '. Detta är en förhandsvisning. Inga uppgifter sparas.';
  intro.style.cssText = 'padding:0 16px;margin:0 0 12px;font:13px/1.6 system-ui;color:#dfcfac';
  const inner = document.createElement('div');
  inner.className = 'kb-life-form-mount';
  inner.style.cssText = 'padding:0 12px 12px';
  wrapper.append(summary,intro,inner);
  // Läggs sist för att inte störa befintliga karaktärskort och knappar.
  host.appendChild(wrapper);
  // Formulärmodulen skapar sin egen panel. Flytta den, utan att ändra dess logik.
  const form = document.getElementById('kb-life-background-form');
  if (form) {
    inner.appendChild(form);
    form.style.marginTop = '0';
    const description = form.querySelector('p');
    if (description) description.textContent = 'Välj din uppväxt, familj, ditt förflutna och din ambition. Förhandsgranska innan vi senare aktiverar sparning.';
  } else {
    const error = document.createElement('p');
    error.textContent = 'Förhandsvisningen kunde inte laddas. Inga uppgifter har ändrats.';
    inner.appendChild(error);
  }
})();
