/* V2-03.2D: Character-bound story storage. Never migrates or deletes legacy saves. */
(function(){
'use strict';
const contract=window.KB_V2_DATA_CONTRACT;
const notice=document.getElementById('storySaveNotice');
function message(s){if(notice)notice.textContent=s;}
function active(){
 if(!contract)return {ok:false,error:'Datakontraktet saknas.'};
 try{
  const id=localStorage.getItem(contract.activeKey());
  if(!id)return {ok:false,error:'Skapa en karaktär under Karaktär innan du fortsätter berättelsen.'};
  const result=contract.readCharacter(id);
  if(!result.ok)return {ok:false,error:'Den aktiva karaktären kunde inte verifieras. Inga sparningar har ändrats.'};
  return {ok:true,id};
 }catch(_){return {ok:false,error:'Karaktärens sparning kunde inte läsas.'};}
}
function read(){
 const a=active();if(!a.ok)return a;
 try{
  const raw=localStorage.getItem(contract.storyKey(a.id));
  if(raw===null)return {ok:true,id:a.id,value:{scene:'start',history:[]}};
  const v=JSON.parse(raw);
  if(!v||v.version!==1||v.ownerId!==a.id||typeof v.scene!=='string'||!Array.isArray(v.history)||v.history.length>100||v.history.some(x=>typeof x!=='string'||x.length>180))return {ok:false,error:'Berättelsesparningen är ogiltig. Inga data har ändrats.'};
  return {ok:true,id:a.id,value:{scene:v.scene,history:v.history}};
 }catch(_){return {ok:false,error:'Berättelsesparningen kunde inte läsas. Inga data har ändrats.'};}
}
function write(value){
 const a=active();if(!a.ok)return a;
 if(!value||typeof value.scene!=='string'||!Array.isArray(value.history)||value.history.length>100||value.history.some(x=>typeof x!=='string'||x.length>180))return {ok:false,error:'Ogiltigt berättelsesteg.'};
 const key=contract.storyKey(a.id),raw=JSON.stringify({version:1,ownerId:a.id,scene:value.scene,history:value.history});
 try{
  const old=localStorage.getItem(key);
  if(old!==null){const checked=read();if(!checked.ok||checked.id!==a.id)return {ok:false,error:'Befintlig berättelse kunde inte verifieras. Ingen överskrivning.'};}
  localStorage.setItem(key,raw);
  if(localStorage.getItem(key)!==raw)return {ok:false,error:'Sparningen kunde inte verifieras.'};
  return {ok:true};
 }catch(_){return {ok:false,error:'Berättelsen kunde inte sparas.'};}
}
window.KB_V2_STORY_BINDING=Object.freeze({active,read,write,message});
})();
