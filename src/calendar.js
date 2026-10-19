// KB-03.6.3 / IMP-025 steg 3F – kalenderägare med separat ID-koppling.
(function(){
  'use strict';
  const KEY='kronor-och-blod.calendar.v1';
  const OWNER_KEY='kronor-och-blod.calendar.owner.v1';
  const BACKUP_KEY='kronor-och-blod.backup.pre-migration.v1';
  const START=Date.UTC(1250,0,1);
  const months=['januari','februari','mars','april','maj','juni','juli','augusti','september','oktober','november','december'];
  let elapsed=0, storageAvailable=true, blocked=false;
  function currentId(){
    try { const c=window.KB_CHARACTER && window.KB_CHARACTER.get(); return c && typeof c.characterId==='string' ? c.characterId : null; }
    catch(_){return null;}
  }
  function verify(raw,id){
    if(!id) return false;
    try {
      const oldRaw=localStorage.getItem(OWNER_KEY);
      if(oldRaw!==null){
        const owner=JSON.parse(oldRaw);
        return !!(owner && owner.version===1 && owner.characterId===id && owner.calendarRaw===raw);
      }
      const backup=JSON.parse(localStorage.getItem(BACKUP_KEY)||'null');
      if(!backup || !backup.entries || backup.entries[KEY]!==raw) return false;
      const record=JSON.stringify({version:1,characterId:id,calendarRaw:raw});
      localStorage.setItem(OWNER_KEY,record);
      return localStorage.getItem(OWNER_KEY)===record;
    } catch(_){return false;}
  }
  function refresh(){
    elapsed=0; blocked=false; storageAvailable=true;
    try {
      const raw=localStorage.getItem(KEY);
      if(raw===null) return;
      const id=currentId();
      if(!verify(raw,id)){blocked=true;storageAvailable=false;return;}
      const parsed=JSON.parse(raw);
      if(!parsed || !Number.isSafeInteger(parsed.elapsedDays) || parsed.elapsedDays<0 || parsed.elapsedDays>365000){blocked=true;storageAvailable=false;return;}
      elapsed=parsed.elapsedDays;
    } catch(_){blocked=true;storageAvailable=false;}
  }
  function getState(){
    refresh();
    const date=new Date(START+elapsed*86400000);
    const year=date.getUTCFullYear(),month=date.getUTCMonth(),day=date.getUTCDate();
    const season=month<=1||month===11?'Vinter':month<=4?'Vår':month<=7?'Sommar':'Höst';
    return {year,month:month+1,day,dayNumber:elapsed+1,season,label:day+' '+months[month]+' '+year,storageAvailable,saveProtected:blocked};
  }
  function advanceDay(){
    const before=getState();
    const id=currentId();
    if(blocked || !id || elapsed>=365000){return before;}
    const next=elapsed+1;
    const raw=JSON.stringify({elapsedDays:next});
    const owner=JSON.stringify({version:1,characterId:id,calendarRaw:raw});
    try {
      // Verifiera båda posterna efter skrivning. Äldre data får aldrig skrivas över utan godkänd ägare.
      localStorage.setItem(OWNER_KEY,owner);
      if(localStorage.getItem(OWNER_KEY)!==owner) throw new Error('owner');
      localStorage.setItem(KEY,raw);
      if(localStorage.getItem(KEY)!==raw) throw new Error('calendar');
      elapsed=next;storageAvailable=true;
    } catch(_){storageAvailable=false;return getState();}
    const after=getState();
    if(after.dayNumber>before.dayNumber)window.dispatchEvent(new CustomEvent('kb:day-advanced',{detail:after}));
    return after;
  }
  window.KB_CALENDAR={getState,advanceDay};
})();
