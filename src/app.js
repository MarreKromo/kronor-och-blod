// KB-03.4 / UI – Kartan visar kalendern; endast Hem styr tiden.
(function () {
  'use strict';
  const markers = document.getElementById('markers');
  const buttons = [];
  const world = window.KB_WORLD;
  const byId = new Map((world?.settlements || []).map(s => [s.place_id, s]));

  function renderWorld(id) {
    const host = document.getElementById('worldContent');
    host.replaceChildren();
    const s = byId.get(id);
    if (!s) {
      const p = document.createElement('p');
      p.textContent = 'Samhällsdata saknas för denna plats.';
      host.appendChild(p);
      return;
    }
    const add = (label, value) => {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = label + ': ';
      p.append(strong, document.createTextNode(String(value)));
      host.appendChild(p);
    };
    add('Befolkning', s.population);
    add('Lokal makt', s.power);
    add('Ekonomi', s.economy);
    const h = document.createElement('h3');
    h.textContent = 'Resurser (index 0–100)';
    h.style.marginTop = '15px';
    host.appendChild(h);
    for (const [key, label] of Object.entries(world.resourceNames)) {
      const n = Number(s.resources[key]);
      const row = document.createElement('div');
      row.className = 'resource';
      const name = document.createElement('span');
      name.textContent = label;
      const track = document.createElement('div');
      track.className = 'track';
      const fill = document.createElement('div');
      fill.className = 'fill';
      fill.style.width = Math.max(0, Math.min(100, Number.isFinite(n) ? n : 0)) + '%';
      track.appendChild(fill);
      const value = document.createElement('span');
      value.textContent = Number.isFinite(n) ? n + '/100' : '–';
      row.append(name, track, value);
      host.appendChild(row);
    }
  }

  function selectPlace(p) {
    document.getElementById('placeName').textContent = p.name;
    document.getElementById('placeType').textContent = p.type;
    document.getElementById('placeDescription').textContent = p.description;
    document.getElementById('placeActivity').textContent = 'Spelidé: ' + p.activity;
    document.getElementById('placeId').textContent = 'Plats-ID: ' + p.id;
    renderWorld(p.id);
    buttons.forEach(b => {
      const active = b.dataset.id === p.id;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
  }

  if (Array.isArray(window.KB_PLACES)) {
    window.KB_PLACES.forEach(p => {
      const b = document.createElement('button');
      b.className = 'marker';
      b.type = 'button';
      b.dataset.id = p.id;
      b.style.left = p.x + '%';
      b.style.top = p.y + '%';
      b.setAttribute('aria-label', 'Visa ' + p.name);
      b.setAttribute('aria-pressed', 'false');
      const span = document.createElement('span');
      span.textContent = p.name;
      b.append('✦', span);
      b.onclick = () => selectPlace(p);
      markers.appendChild(b);
      buttons.push(b);
    });
    if (window.KB_PLACES.length) selectPlace(window.KB_PLACES[0]);
  }

  function renderCalendar() {
    const c = window.KB_CALENDAR.getState();
    document.getElementById('gameDate').textContent = c.label;
    document.getElementById('gameSeason').textContent = c.season;
    document.getElementById('gameDay').textContent = 'Dag ' + c.dayNumber;
    document.getElementById('headerYear').textContent = c.year;
  }
  // Den gamla knappen ligger i HTML för bakåtkompatibilitet men tas bort ur gränssnittet.
  // Kalenderns enda dag-framåt-knapp finns på Hem och använder KB_CALENDAR.advanceDay().
  const oldMapDayButton = document.getElementById('nextDay');
  if (oldMapDayButton) oldMapDayButton.remove();
  renderCalendar();
})();
