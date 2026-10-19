// KB-03.6.5 / IMP-025 steg 3G – dagbokens karaktärsägare.
// Äldre dagböcker ändras endast efter uttryckligt godkännande.
(function () {
  'use strict';
  const calendar = window.KB_CALENDAR;
  const character = window.KB_CHARACTER;
  const nav = document.querySelector('.kb-navigation');
  if (!calendar || !character || !nav) return;
  const KEY = 'kronor-och-blod.daylog.v1';
  const OWNER_KEY = 'kronor-och-blod.daylog.owner.v1';
  const MAX_ENTRIES = 60;
  const style = document.createElement('style');
  style.textContent = `
    .kb-home{max-width:1050px;margin:14px auto;padding:0 12px;color:#f2e7ce}
    .kb-home h2{margin:0 0 6px;font-size:29px}
    .kb-home h3{font-size:20px;margin:0 0 12px}
    .kb-home-card{background:#283229;border:1px solid #8e7c55;border-radius:9px;padding:17px;margin:12px 0}
    .kb-home-kicker{font:11px system-ui;letter-spacing:2px;color:#d5bd82}
    .kb-home-date{font-size:27px;margin:8px 0}
    .kb-home-muted{font:13px/1.6 system-ui;color:#c4b995}
    .kb-home-button{display:block;width:100%;min-height:48px;padding:12px;border:1px solid #e0bd73;background:#8e412e;color:#fff3d5;font:600 15px system-ui;border-radius:6px;margin-top:14px}
    .kb-home-button:disabled{opacity:.55}
    .kb-home-event{padding:13px 0;border-bottom:1px solid #5d614e}
    .kb-home-event:last-child{border-bottom:0}
    .kb-home-event strong{display:block;margin:5px 0}
    .kb-home-event p{margin:6px 0;font:14px/1.55 system-ui}
    .kb-home-empty{font:14px/1.55 system-ui;color:#d5c5a5}
    body:not([data-kb-view="home"]) .kb-home{display:none!important}
    @media(max-width:680px){.kb-home{margin:10px auto;padding:0 10px}}
  `;
  document.head.appendChild(style);
  const home = document.createElement('section');
  home.className = 'kb-home';
  home.setAttribute('aria-label','Hem – Mitt liv');
  nav.insertAdjacentElement('afterend',home);
  function el(tag, text, className) {
    const n = document.createElement(tag);
    if (text !== undefined) n.textContent=text;
    if (className) n.className=className;
    return n;
  }
  function currentId() {
    const c=character.get();
    return c && typeof c.characterId==='string' && c.characterId ? c.characterId : null;
  }
  function validEntries(raw) {
    if(raw===null) return [];
    const data=JSON.parse(raw);
    if(!data || data.version!==1 || !Array.isArray(data.entries)) throw new Error('Dagbokens format kan inte läsas.');
    return data.entries.filter(x=>x && Number.isSafeInteger(x.dayNumber) &&
      x.dayNumber>=2 && x.dayNumber<=365001 && typeof x.label==='string').slice(-MAX_ENTRIES);
  }
  function ownerRecord(raw,id) { return JSON.stringify({version:1,characterId:id,daylogRaw:raw}); }
  function status() {
    try {
      const raw=localStorage.getItem(KEY), ownerRaw=localStorage.getItem(OWNER_KEY), id=currentId();
      const entries=validEntries(raw);
      if(!id) return {kind:'blocked',entries:[],message:'Karaktärens ID saknas.'};
      if(ownerRaw===null) {
        if(raw===null) return {kind:'new',entries:[],id};
        return {kind:'legacy',entries,id,raw,message:'Äldre dagbok behöver kopplas till karaktären.'};
      }
      const owner=JSON.parse(ownerRaw);
      if(!owner || owner.version!==1 || owner.characterId!==id) return {kind:'blocked',entries:[],message:'Dagboken är kopplad till en annan karaktär.'};
      if(raw===null || owner.daylogRaw!==raw) return {kind:'blocked',entries:[],message:'Dagbokens data och ägarkoppling stämmer inte överens.'};
      return {kind:'ready',entries,id};
    } catch (_) {return {kind:'blocked',entries:[],message:'Dagboken kunde inte läsas säkert.'};}
  }
  function adoptLegacy(s) {
    if(s.kind!=='legacy') return s.kind==='new'||s.kind==='ready';
    if(!window.confirm('Säkerhetskontroll: En äldre dagbok med '+s.entries.length+' anteckningar saknar karaktärskoppling.\n\nVill du koppla den till din nuvarande karaktär? Välj Avbryt om du är osäker.')) return false;
    try {
      if(localStorage.getItem(KEY)!==s.raw || localStorage.getItem(OWNER_KEY)!==null || currentId()!==s.id) return false;
      const record=ownerRecord(s.raw,s.id);
      localStorage.setItem(OWNER_KEY,record);
      return localStorage.getItem(OWNER_KEY)===record;
    } catch (_) {return false;}
  }
  function saveLog(entries) {
    const s=status();
    if(s.kind!=='ready' && s.kind!=='new') return false;
    const raw=JSON.stringify({version:1,entries:entries.slice(-MAX_ENTRIES)});
    const record=ownerRecord(raw,s.id);
    try {
      const previousRaw=localStorage.getItem(KEY),previousOwner=localStorage.getItem(OWNER_KEY);
      // Skriv ägarposten först och kontrollera att båda posterna verkligen sparas.
      localStorage.setItem(OWNER_KEY,record);
      if(localStorage.getItem(OWNER_KEY)!==record) throw Error('owner');
      localStorage.setItem(KEY,raw);
      if(localStorage.getItem(KEY)!==raw) throw Error('daylog');
      return true;
    } catch (_) {
      // Återställning görs endast om den egna skrivningen fortfarande är aktuell.
      try {
        const currentOwner=localStorage.getItem(OWNER_KEY);
        if(currentOwner===record) {
          if(typeof previousRaw==='string') localStorage.setItem(KEY,previousRaw);
          else localStorage.removeItem(KEY);
          if(typeof previousOwner==='string') localStorage.setItem(OWNER_KEY,previousOwner);
          else localStorage.removeItem(OWNER_KEY);
        }
      } catch (__) {}
      return false;
    }
  }
  let warning='';
  function render() {
    const c=calendar.getState(),s=status();
    home.replaceChildren();
    home.append(el('div','VÄSTERGÖTLAND · ÅR '+c.year,'kb-home-kicker'),el('h2','Mitt liv'));
    const person=character.get();
    home.append(el('p',person?'Välkommen tillbaka, '+person.name+'.':'Skapa en karaktär under fliken Karaktär för att börja ditt liv.','kb-home-muted'));
    const card=el('div',undefined,'kb-home-card');
    card.append(el('div','SPELKALENDER','kb-home-kicker'),el('div',c.label,'kb-home-date'),
      el('p',c.season+' · Dag '+c.dayNumber+' · Startplats: Skara','kb-home-muted'));
    const next=el('button','Gå vidare en dag →','kb-home-button');
    next.type='button';
    next.disabled=!person || s.kind==='blocked';
    next.addEventListener('click',()=>{
      const latest=status();
      if(latest.kind==='blocked') {warning=latest.message;render();return;}
      if(latest.kind==='legacy' && !adoptLegacy(latest)) {warning='Dagboken ändrades inte. Godkänn kopplingen för att fortsätta.';render();return;}
      warning='';
      calendar.advanceDay();
      render();
    });
    card.append(next);
    if(!person) card.append(el('p','Skapa först din karaktär.','kb-home-muted'));
    if(s.kind==='blocked') card.append(el('p','Sparskydd: '+s.message+' Ingen dagbok skrivs över.','kb-home-muted'));
    if(c.saveProtected) card.append(el('p','Kalenderns sparskydd: '+(c.saveWarning||'Sparning kräver kontroll.'),'kb-home-muted'));
    home.append(card);
    const events=el('div',undefined,'kb-home-card');
    events.append(el('h3','Dagshändelser'),el('p','Daganteckningar från kalendern på Hem. Inga slumpmöten eller världsförändringar är implementerade ännu.','kb-home-muted'));
    if(s.kind==='legacy') events.append(el('p','Äldre dagbok visas endast för läsning tills du godkänner kopplingen till karaktären.','kb-home-muted'));
    const entries=s.entries.filter(x=>x.dayNumber<=c.dayNumber).slice(-7).reverse();
    if(!entries.length) events.append(el('p','Inga nya daganteckningar ännu.','kb-home-empty'));
    entries.forEach(item=>{
      const row=el('div',undefined,'kb-home-event');
      row.append(el('div','DAG '+item.dayNumber+' · '+item.label,'kb-home-kicker'),
        el('strong','En ny dag börjar'),
        el('p','En dag har passerat. Inga ytterligare händelser har registrerats.'));
      events.append(row);
    });
    if(warning)events.append(el('p',warning,'kb-home-muted'));
    home.append(events);
    const future=el('div',undefined,'kb-home-card');
    future.append(el('h3','Ditt liv i världen'),el('p',
      'Här kommer senare uppdrag, ekonomi, följeslagare och egendom att visas när systemen finns på riktigt.',
      'kb-home-muted'));
    home.append(future);
  }
  const profile=document.querySelector('.kb-profile');
  const form=document.querySelector('#kbCharacterContent');
  [profile,form].filter(Boolean).forEach(x=>new MutationObserver(render).observe(x,{childList:true}));
  window.addEventListener('kb:day-advanced',event=>{
    const after=event.detail,s=status();
    if(s.kind==='ready'||s.kind==='new') {
      if(!s.entries.some(x=>x.dayNumber===after.dayNumber)) {
        s.entries.push({dayNumber:after.dayNumber,label:after.label});
        warning=saveLog(s.entries)?'':'Dagen gick vidare, men dagboken kunde inte sparas säkert.';
      } else warning='';
    } else warning='Dagen gick vidare, men dagboken är skyddad: '+(s.message||'Äldre sparning behöver godkännas.');
    for(const [id,value] of [['gameDate',after.label],['gameSeason',after.season],['gameDay','Dag '+after.dayNumber],['headerYear',String(after.year)]]) {
      const target=document.getElementById(id);if(target)target.textContent=value;
    }
    render();
  });
  render();
})();
