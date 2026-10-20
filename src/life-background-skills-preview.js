// IMP-025 J-L2 – samlad livsbakgrund och skrivskyddad färdighetsvisning.
// Ersätter J-K2-modulens presentation. Ingen lagring, bonus eller byteslogik ändras.
(function () {
  'use strict';
  const SKILLS = Object.freeze({
    farm: Object.freeze({name:'Jordbruk',level:2}),
    craft: Object.freeze({name:'Hantverk',level:2}),
    letters: Object.freeze({name:'Skriftkunskap',level:2}),
    freeborn: Object.freeze({name:'Umgängesvana',level:2})
  });
  function preview(background) {
    if (!Object.prototype.hasOwnProperty.call(SKILLS, background)) return null;
    const skill = SKILLS[background];
    return Object.freeze({name:skill.name,level:skill.level,proposed:true});
  }
  window.KB_SKILLS_PREVIEW = Object.freeze({preview});

  const host = document.querySelector('.kb-profile');
  if (!host) return;

  const section = document.getElementById('kb-life-profile-entry');
  const panel = document.createElement('div');
  panel.id = 'kb-jk2-skills-preview';
  panel.style.cssText =
    'margin:12px 14px 16px;padding:12px 14px;border:1px solid #8e7a51;' +
    'border-radius:8px;background:#22362a;color:#f4e9ce';
  const heading = document.createElement('strong');
  heading.textContent = 'Möjlig startfärdighet';
  heading.style.cssText = 'display:block;font:600 14px system-ui;margin-bottom:8px';
  const content = document.createElement('p');
  content.style.cssText = 'font:14px/1.6 system-ui;margin:0';
  panel.append(heading, content);

  // Förslaget ligger inuti den befintliga livsbakgrundspanelen.
  // Saknas den används den tidigare fristående, utfällbara presentationen.
  if (section && section.tagName === 'DETAILS') {
    section.appendChild(panel);
    const summary = section.querySelector(':scope > summary');
    if (summary) summary.textContent = 'Din livsbakgrund och färdigheter · förhandsvisning';
  } else {
    const fallback = document.createElement('details');
    fallback.style.cssText = 'margin:12px 0;border:1px solid #8e7a51;border-radius:8px';
    const summary = document.createElement('summary');
    summary.textContent = 'Möjlig startfärdighet · förhandsvisning';
    summary.style.cssText = 'cursor:pointer;padding:12px;min-height:44px;font:600 14px system-ui';
    fallback.append(summary, panel);
    host.appendChild(fallback);
    panel.style.margin = '0 12px 12px';
  }

  function render() {
    const c = window.KB_CHARACTER && window.KB_CHARACTER.get();
    if (!c) { panel.hidden = true; return; }
    panel.hidden = false;
    let life = null;
    try {
      const data = localStorage.getItem('kronor-och-blod.life-background.v1');
      const ownerRaw = localStorage.getItem('kronor-och-blod.life-background.owner.v1');
      if (data !== null && ownerRaw !== null && c.characterId) {
        const owner = JSON.parse(ownerRaw);
        const model = window.KB_LIFE_BACKGROUND_MODEL;
        if (owner && owner.version === 1 &&
            owner.characterId === c.characterId &&
            owner.backgroundRaw === data && model) {
          const parsed = model.parse(data);
          if (parsed.ok) life = parsed.value;
        }
      }
    } catch (_) { life = null; }
    const skill = life && preview(life.upbringing);
    content.textContent = skill
      ? skill.name + ' +' + skill.level + ' (förslag – ger ännu ingen spelbonus).'
      : 'Ingen verifierad livsbakgrund för aktiv karaktär. Inga färdigheter ändras.';
  }
  render();
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) render();
  });
  document.addEventListener('click', function () {
    if (!panel.hidden) render();
  });
})();
