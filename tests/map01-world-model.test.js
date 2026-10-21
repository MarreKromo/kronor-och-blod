'use strict';
const assert = require('node:assert/strict');
const map = require('../src/map01-world-model.js');
const data = map.getData();
assert.equal(map.validate(data, ['keldra', 'dorneth', 'varnhold']).ok, true);
assert.equal(Object.isFrozen(data), true);
assert.equal(Object.isFrozen(data.roads[0]), true);
assert.deepEqual(data.settlements.map(x => x.id), ['keldra','dorneth','varnhold']);
assert.equal(data.travel.derivesAvailability, false);
assert.equal(data.travel.derivesDuration, false);
assert.equal(data.discovery.enabled, false);
assert.equal(data.routeRisk.enabled, false);
const degree = {};
for (const road of data.roads) { degree[road.from] = (degree[road.from] || 0) + 1; degree[road.to] = (degree[road.to] || 0) + 1; }
assert.ok(Object.values(degree).some(x => x >= 3), 'branching road junction exists');
assert.equal(map.validate({...data, roads:[{id:'bad',from:'missing',to:'keldra'}]}).ok, false);
assert.equal(map.validate({...data, settlements:[{id:'unknown',regionId:'dornmark',x:1,y:1}]},['keldra','dorneth','varnhold']).ok, false);
console.log('MAP-01.2A: PASS (10 assertions/groups)');
