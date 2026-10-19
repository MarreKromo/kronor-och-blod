// KB-03.6.3 steg 1 – hemskärm och sparad dagshistorik.
// Befintliga kalender-, karaktärs- och berättelsesparningar lämnas orörda.
(function () {
  'use strict';
  const calendar = window.KB_CALENDAR;
  const character = window.KB_CHARACTER;
  const nav = document.querySelector('.kb-navigation');
  if (!calendar || !character || !nav) return;
  const KEY = 'kronor-och-blod.daylog.v1';
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
  function loadLog() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY) || 'null');
      return data && data.version === 1 && Array.isArray(data.entries) ?
        data.entries.filter(x=>x && Number.isSafeInteger(x.dayNumber) &&
          x.dayNumber>=2 && x.dayNumber<=365001 && typeof x.label==='string').slice(-MAX_ENTRIES) : [];
    } catch (_) { return []; }
  }
  function saveLog(entries) {
    try { localStorage.setItem(KEY,JSON.stringify({version:1,entries:entries.slice(-MAX_ENTRIES)})); return true; }
    catch (_) { return false; }
  }
  let warning = '';
  function render() {
    const c = calendar.getState();
    home.replaceChildren();
    home.append(el('div','VÄSTERGÖTLAND · ÅR '+c.year,'kb-home-kicker'),el('h2','Mitt liv'));
    const person=character.get();
    home.append(el('p',person?'Välkommen tillbaka, '+person.name+'.':'Skapa en karaktär under fliken Karaktär för att börja ditt liv.','kb-home-muted'));
    const card=el('div',undefined,'kb-home-card');
    card.append(el('div','SPELKALENDER','kb-home-kicker'),el('div',c.label,'kb-home-date'),
      el('p',c.season+' · Dag '+c.dayNumber+' · Startplats: Skara','kb-home-muted'));
    const next=el('button','Gå vidare en dag →','kb-home-button');
    next.type='button';
    next.disabled=!person;
    next.addEventListener('click',()=>{
      const before=calendar.getState().dayNumber;
      const after=calendar.advanceDay();
      if(after.dayNumber>before){
        const entries=loadLog();
        entries.push({dayNumber:after.dayNumber,label:after.label});
        warning=saveLog(entries)?'':'Dagen gick vidare, men dagshistoriken kunde inte sparas i webbläsaren.';
        // Befintlig kalenderpanel uppdateras utan att dess gamla knapp behöver användas.
        document.getElementById('gameDate').textContent=after.label;
        document.getElementById('gameSeason').textContent=after.season;
        document.getElementById('gameDay').textContent='Dag '+after.dayNumber;
        document.getElementById('headerYear').textContent=after.year;
      } else warning='Kalenderns maximala daggräns har nåtts.';
      render();
    });
    card.append(next);
    if(!person)card.append(el('p','Skapa först din karaktär.','kb-home-muted'));
    home.append(card);
    const events=el('div',undefined,'kb-home-card');
    events.append(el('h3','Dagshändelser'),el('p','Daganteckningar i prototypen. Inga slumpmöten eller världsförändringar är implementerade ännu.','kb-home-muted'));
    const entries=loadLog().filter(x=>x.dayNumber<=c.dayNumber).slice(-7).reverse();
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
  // Om kalendern ändras via den äldre kalenderknappen uppdateras även hemvyn.
  document.getElementById('nextDay')?.addEventListener('click',()=>{
    warning='En dag gick vidare via den äldre kalenderknappen. Dagshistoriken loggar bara dagar som passerar via Hem.';
    render();
  });
  render();
})();
