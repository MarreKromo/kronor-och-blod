/* MAP-01.4 — reserved future resource zones; no mechanics or storage. */
(function(root,factory){'use strict';const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.KB_MAP01_RESOURCE_ZONES=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){'use strict';
const zones=Object.freeze([
 Object.freeze({id:'dornmark-northeast-highlands',regionId:'dornmark',kind:'highlands',resources:Object.freeze(['stone','iron-ore','copper-ore']),status:'reserved'}),
 Object.freeze({id:'dornmark-southern-woodland',regionId:'dornmark',kind:'woodland',resources:Object.freeze(['timber','game','herbs']),status:'reserved'}),
 Object.freeze({id:'dornmark-southern-valley',regionId:'dornmark',kind:'valley',resources:Object.freeze(['farmland','freshwater']),status:'reserved'})
]);return Object.freeze({getZones:()=>zones.map(z=>({...z,resources:[...z.resources]}))});});
