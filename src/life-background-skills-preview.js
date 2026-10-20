// IMP-025 J-K2: read-only skill preview. No persistence or changes to attributes.
(function () {
  'use strict';
  const SKILLS = Object.freeze({
    farm: Object.freeze({name:'Jordbruk',level:2}),
    craft: Object.freeze({name:'Hantverk',level:2}),
    letters: Object.freeze({name:'Skriftkunskap',level:2}),
    freeborn: Object.freeze({name:'Umgängesvana',level:2})
  });
  function preview(background) {
    if (!Object.prototype.hasOwnProperty.call(SKILLS,background)) return null;
    const s=SKILLS[background];
    return Object.freeze({name:s.name,level:s.level,proposed:true});
  }
  window.KB_SKILLS_PREVIEW=Object.freeze({preview});
  const host=document.querySelector('.kb-profile');
  if (!host) return;
  const details=document.createElement('details');
  details.id='kb-jk2-skills-preview';
  details.style.cssText='margin:12px 0;border:1px solid #8e7a51;border-radius:8px;padding:12px;color:#f4e9ce;background:#1b2b22';
  const summary=document.createElement('summary');
  summary.textContent='Möjlig startfärdighet · förhandsvisning';
  summary.style.cssText='cursor:pointer;min-height:44px;font:600 14px system-ui';
  const content=document.createElement('p');
  content.style.cssText='font:14px/1.6 system-ui;margin:8px 0 0';
  details.append(summary,content);
  host.append(details);
  function render() {
    const c=window.KB_CHARACTER&&window.KB_CHARACTER.get();
    if(!c){details.hidden=true;return;}
    details.hidden=false;
    let life=null;
    try {
      const data=localStorage.getItem('kronor-och-blod.life-background.v1');
      const ownerRaw=localStorage.getItem('kronor-och-blod.life-background.owner.v1');
      if(data!==null&&ownerRaw!==null&&c.characterId){
        const owner=JSON.parse(ownerRaw);
        const model=window.KB_LIFE_BACKGROUND_MODEL;
        if(owner&&owner.version===1&&owner.characterId===c.characterId&&owner.backgroundRaw===data&&model){
          const parsed=model.parse(data);
          if(parsed.ok)life=parsed.value;
        }
      }
    } catch(_) {life=null;}
    const skill=life&&preview(life.upbringing);
    content.textContent=skill
      ? skill.name+' +'+skill.level+' (förslag – ger ännu ingen spelbonus).'
      : 'Ingen verifierad livsbakgrund för aktiv karaktär. Inga färdigheter ändras.';
  }
  render();
  // Read-only refresh when switching back to the profile tab or returning to the app.
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});
  document.addEventListener('click',()=>{if(!details.hidden)render();});
})();
