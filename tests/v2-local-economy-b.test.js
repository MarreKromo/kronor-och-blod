const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const code=fs.readFileSync(__dirname+'/../src/v2-local-economy.js','utf8');
let id='A',elapsed=3,paid=[1],place='keldra';const store=new Map();let writes=0;
const contract={activeKey:()=> 'active',readCharacter:x=>({ok:x===id}),characterKey:x=>'char.'+x};
const storage={getItem:k=>k==='active'?id:store.get(k)??null,setItem(){writes++;throw Error('read only');}};
const w={KB_V2_DATA_CONTRACT:contract,KB_V2_CALENDAR:{getState:()=>({ok:true,id,elapsedDays:elapsed,dayNumber:elapsed+1})},KB_V2_TRAVEL:{getState:()=>({ok:true,id,placeId:place})},KB_V2_ECONOMY:{getState:()=>({ok:true,id,coins:11,grain:7})},KB_V2_NPC_LIFE:{getRelationships:()=>({ok:true,id,people:[]})}};
vm.runInNewContext(code,{window:w,localStorage:storage});const api=w.KB_V2_LOCAL_ECONOMY;
function save(){store.set('char.'+id+'.economy-v1',JSON.stringify({version:1,ownerId:id,coins:11,grain:7,paidDays:paid,pending:null}));}
save();const a=api.getState();assert(a.ok);assert.equal(a.flows.produced,3);assert.equal(api.getState().supply,a.supply);
paid=[];save();const b=api.getState();assert(b.ok);assert(a.stocks.keldra>b.stocks.keldra,'farm work increases real farm stock');
elapsed=8;const later=api.getState();assert(later.ok);assert(later.flows.consumed>b.flows.consumed,'days consume grain');
store.set('char.A.economy-v1','{bad');assert.equal(api.getState().ok,false,'corrupt save blocked');
id='B';elapsed=0;assert.equal(api.getState().stocks.keldra,12,'new character isolated');assert.equal(writes,0,'no writes');
console.log('PASS V2-05B: production, consumption, deterministic replay, corrupt data, isolation, no writes');
