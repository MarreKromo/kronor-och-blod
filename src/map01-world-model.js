/* MAP-01.2A — read-only geography contract. No persistence, travel or calendar calls. */
(function (root) {
  'use strict';
  function freezeDeep(value) {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      Object.values(value).forEach(freezeDeep);
      Object.freeze(value);
    }
    return value;
  }
  // Coordinates are temporary layout coordinates, not approved geography or distance.
  const DATA = freezeDeep({
    version: 1,
    coordinateSystem: 'map01-local-draft-v1',
    coordinateStatus: 'provisional-not-canon',
    regions: [{ id: 'dornmark', name: 'Dornmark', bounds: { x: 0, y: 0, width: 1000, height: 800 } }],
    settlements: [
      { id: 'keldra', regionId: 'dornmark', x: 230, y: 540 },
      { id: 'dorneth', regionId: 'dornmark', x: 670, y: 330 },
      { id: 'varnhold', regionId: 'dornmark', x: 760, y: 150 }
    ],
    junctions: [
      { id: 'j-west', regionId: 'dornmark', x: 365, y: 480 },
      { id: 'j-cross', regionId: 'dornmark', x: 500, y: 395 },
      { id: 'j-north', regionId: 'dornmark', x: 580, y: 225 },
      { id: 'j-east', regionId: 'dornmark', x: 880, y: 380 }
    ],
    roads: [
      { id: 'road-keldra-west', from: 'keldra', to: 'j-west', kind: 'track' },
      { id: 'road-west-cross', from: 'j-west', to: 'j-cross', kind: 'road' },
      { id: 'road-cross-dorneth', from: 'j-cross', to: 'dorneth', kind: 'road' },
      { id: 'road-cross-north', from: 'j-cross', to: 'j-north', kind: 'track' },
      { id: 'road-north-varnhold', from: 'j-north', to: 'varnhold', kind: 'track' },
      { id: 'road-dorneth-east', from: 'dorneth', to: 'j-east', kind: 'road' }
    ],
    terrainAreas: [],
    territories: [],
    politicalControl: [],
    discovery: { enabled: false, perCharacter: false },
    routeRisk: { enabled: false },
    travel: { source: 'KB_V2_TRAVEL', derivesAvailability: false, derivesDuration: false }
  });
  function validate(data, placeIds) {
    const issues = [];
    if (!data || data.version !== 1) issues.push('Unsupported map data version');
    const regionIds = new Set((data?.regions || []).map(r => r.id));
    const points = [...(data?.settlements || []), ...(data?.junctions || [])];
    const pointIds = new Set();
    for (const point of points) {
      if (pointIds.has(point.id)) issues.push('Duplicate point: ' + point.id);
      pointIds.add(point.id);
      if (!regionIds.has(point.regionId)) issues.push('Unknown region: ' + point.id);
      if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) issues.push('Invalid coordinates: ' + point.id);
    }
    for (const settlement of data?.settlements || []) {
      if (placeIds && !placeIds.includes(settlement.id)) issues.push('Unknown game place: ' + settlement.id);
    }
    for (const road of data?.roads || []) {
      if (!pointIds.has(road.from) || !pointIds.has(road.to)) issues.push('Missing road endpoint: ' + road.id);
      if (road.from === road.to) issues.push('Self-loop road: ' + road.id);
    }
    return { ok: issues.length === 0, issues };
  }
  function getData() { return DATA; }
  const api = Object.freeze({ getData, validate });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.KB_MAP01_WORLD = api;
})(typeof window !== 'undefined' ? window : null);
