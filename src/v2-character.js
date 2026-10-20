/* V2-03.2C: character UI and safe creation using the existing background model and v2 contract. */
(function () {
  'use strict';
  const model = window.KB_LIFE_BACKGROUND_MODEL;
  const contract = window.KB_V2_DATA_CONTRACT;
  const host = document.getElementById('characterPanel');
  const story = document.querySelector('.story');
  const nav = document.querySelector('.bottom');
  const characterTab = document.getElementById('characterTab');
  if (!host || !story || !nav || !characterTab) return;
  const status = document.getElementById('characterStatus');
  const content = document.getElementById('characterContent');
  function notice(message) { status.textContent = message; }
  function add(tag, text, parent, cls) {
    const e = document.createElement(tag);
    if (text != null) e.textContent = text;
    if (cls) e.className = cls;
    parent.appendChild(e);
    return e;
  }
  function showCharacter() {
    story.hidden = true;
    host.hidden = false;
    nav.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b === characterTab));
    render();
  }
  function showStory() { host.hidden = true; story.hidden = false; }
  characterTab.addEventListener('click', showCharacter);
  ['storyTab','journalTab','mapTab'].forEach(id => {
    const button = document.getElementById(id);
    if (button) button.addEventListener('click', showStory);
  });
  function readActive() {
    let id;
    try { id = localStorage.getItem(contract.activeKey()); }
    catch (_) { return {error:'Det går inte att läsa webbläsarens lagring.'}; }
    if (!id) return {empty:true};
    try {
      const result = contract.readCharacter(id);
      if (!result.ok) return {error:'En aktiv karaktär finns registrerad, men kunde inte verifieras. Inga data har ändrats.'};
      return {character:result.value};
    } catch (_) { return {error:'Karaktärens ID kunde inte verifieras. Inga data har ändrats.'}; }
  }
  function uuid() {
    if (!window.crypto || !crypto.getRandomValues) throw Error('Säker ID-generering saknas.');
    if (crypto.randomUUID) return crypto.randomUUID();
    const b = new Uint8Array(16); crypto.getRandomValues(b);
    b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
    const s = Array.from(b, x => x.toString(16).padStart(2,'0')).join('');
    return [s.slice(0,8),s.slice(8,12),s.slice(12,16),s.slice(16,20),s.slice(20)].join('-');
  }
  function saveNew(character) {
    const key = contract.characterKey(character.id);
    const active = contract.activeKey();
    const raw = JSON.stringify(character);
    try {
      if (localStorage.getItem(active) !== null) throw Error('En aktiv karaktär finns redan.');
      if (localStorage.getItem(key) !== null) throw Error('Karaktärens ID är redan upptaget.');
      localStorage.setItem(key, raw);
      if (localStorage.getItem(key) !== raw) throw Error('Karaktären kunde inte verifieras efter sparning.');
      localStorage.setItem(active, character.id);
      if (localStorage.getItem(active) !== character.id) throw Error('Aktiv karaktär kunde inte verifieras.');
      return {ok:true};
    } catch (e) {
      // Only remove a new, exact match if the active pointer was not written.
      try {
        if (localStorage.getItem(active) !== character.id && localStorage.getItem(key) === raw) localStorage.removeItem(key);
      } catch (_) {}
      return {ok:false,error:e.message || 'Lagringen misslyckades.'};
    }
  }
  function render() {
    content.replaceChildren();
    if (!model || !contract) { notice('Karaktärssystemet kunde inte laddas. Kontrollera filerna.'); return; }
    const current = readActive();
    if (current.error) { notice(current.error); return; }
    if (current.character) {
      notice('Karaktären är sparad på den här enheten.');
      const c = current.character;
      add('h3',c.name,content);
      add('p','Startplats: Keldra',content);
      for (const field of ['upbringing','familySituation','past','ambition']) {
        const title = {upbringing:'Uppväxt',familySituation:'Familj',past:'Förflutet',ambition:'Ambition'}[field];
        add('p',title + ': ' + model.LABELS[field][c.background[field]],content);
      }
      if (c.background.biography) add('p','Livshistoria: ' + c.background.biography,content);
      add('p','Karaktärsbyte och koppling till berättelsen kommer i nästa paket. Befintliga Keldra-val är oförändrade.',content,'character-hint');
      return;
    }
    notice('Skapa din första karaktär i Dornmark.');
    const form = add('form',null,content,'character-form');
    const nameLabel = add('label','Namn',form);
    const name = add('input',null,nameLabel); name.type='text'; name.required=true; name.minLength=2; name.maxLength=32; name.autocomplete='off';
    const fields = [
      ['upbringing','Uppväxt'],['familySituation','Familjesituation'],['past','Förflutet'],['ambition','Ambition']
    ];
    const selects = {};
    fields.forEach(([field,title]) => {
      const label = add('label',title,form);
      const select = add('select',null,label); select.required=true;
      for (const value of model.OPTIONS[field]) {
        const option = add('option',model.LABELS[field][value],select); option.value=value;
      }
      selects[field]=select;
    });
    const bioLabel = add('label','Livshistoria (valfri, högst 500 tecken)',form);
    const bio = add('textarea',null,bioLabel); bio.maxLength=500; bio.rows=3;
    const error = add('p','',form,'character-error'); error.setAttribute('role','alert');
    const submit = add('button','Skapa karaktär',form,'character-submit'); submit.type='submit';
    form.addEventListener('submit',e => {
      e.preventDefault(); error.textContent='';
      const existing = readActive();
      if (!existing.empty) { error.textContent='En aktiv karaktär finns redan eller lagringen kan inte verifieras.'; return; }
      let id;
      try { id=uuid(); } catch (err) { error.textContent=err.message; return; }
      const background = {version:1,biography:bio.value};
      fields.forEach(([field]) => background[field]=selects[field].value);
      const character = {version:2,id,name:name.value.trim(),placeId:'keldra',background};
      const check = contract.validateCharacter(character);
      if (!check.ok) { error.textContent=check.errors.join(' '); return; }
      const saved=saveNew(character);
      if (!saved.ok) { error.textContent=saved.error; return; }
      render();
    });
  }
  render();
})();
