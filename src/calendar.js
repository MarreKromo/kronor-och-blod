// KB-03.6.4 / IMP-025: säker kalenderkoppling med uttryckligt godkännande.
(function(){
  'use strict';
  const KEY='kronor-och-blod.calendar.v1';
  const OWNER_KEY='kronor-och-blod.calendar.owner.v1';
  const START=Date.UTC(1250,0,1);
  const months=['januari','februari','mars','april','maj','juni','juli','augusti','september','oktober','november','december'];
  let elapsed=0, storageAvailable=true, saveProtected=false, reason='';
  function id(){try{const c=window.KB_CHARACTER&&window.KB_CHARACTER.get();return c&&typeof c.characterId==='string'?c.characterId:null;}catch(_){return null;}}
  function parse(raw){const p=JSON.parse(raw);return p&&Number.isSafeInteger(p.elapsedDays)&&p.elapsedDays>=0&&p.elapsedDays<=365000?p.elapsedDays:null;}
  function owner(raw,characterId){return JSON.stringify({version:1,characterId,calendarRaw:raw});}
  function refresh(){
    elapsed=0;storageAvailable=true;saveProtected=false;reason='';
    try{
      const raw=localStorage.getItem(KEY), ownerRaw=localStorage.getItem(OWNER_KEY), who=id();
      if(raw===null){if(ownerRaw!==null){saveProtected=true;reason='Kalenderdata saknas men ägarkopplingen finns.';}return;}
      const days=parse(raw);
      if(days===null){saveProtected=true;reason='Kalendersparningen är skadad.';return;}
      elapsed=days; // Visa det verkliga sparade datumet även om skrivning är spärrad.
      if(!who){saveProtected=true;reason='Karaktärens ID saknas.';return;}
      if(ownerRaw===null){saveProtected=true;reason='Äldre kalender behöver kopplas till karaktären.';return;}
      const o=JSON.parse(ownerRaw);
      if(!o||o.version!==1||o.characterId!==who){saveProtected=true;reason='Kalendern är kopplad till en annan karaktär.';return;}
      if(o.calendarRaw!==raw){saveProtected=true;reason='Kalendern och ägarkopplingen skiljer sig åt.';return;}
    }catch(_){saveProtected=true;storageAvailable=false;reason='Kalendern kunde inte läsas.';}
  }
  function getState(){
    refresh();const d=new Date(START+elapsed*86400000),year=d.getUTCFullYear(),month=d.getUTCMonth(),day=d.getUTCDate();
    const season=month<=1||month===11?'Vinter':month<=4?'Vår':month<=7?'Sommar':'Höst';
    return {year,month:month+1,day,dayNumber:elapsed+1,season,label:day+' '+months[month]+' '+year,storageAvailable,saveProtected,saveWarning:reason};
  }
  function advanceDay(){
    let before=getState();const who=id();if(!who)return before;
    try{
      const raw=localStorage.getItem(KEY), ownerRaw=localStorage.getItem(OWNER_KEY);
      if(saveProtected){
        if(raw===null||parse(raw)===null){window.alert('Kalendern är spärrad: '+reason+' Ingen sparning har ändrats.');return before;}
        if(ownerRaw!==null){
          let o;try{o=JSON.parse(ownerRaw);}catch(_){o=null;}
          if(!o||o.version!==1||o.characterId!==who){window.alert('Kalendern är spärrad: '+reason+' Ingen sparning har ändrats.');return before;}
        }
        if(!window.confirm('Säkerhetskontroll: '+reason+'\n\nVill du uttryckligen koppla den befintliga kalendern (dag '+(elapsed+1)+') till din nuvarande karaktär? Välj Avbryt om du är osäker.'))return before;
        // Behåll kalenderns originalbytes. Vid misslyckande återställs tidigare ägarpost.
        const record=owner(raw,who);
        try{localStorage.setItem(OWNER_KEY,record);if(localStorage.getItem(OWNER_KEY)!==record)throw Error('verify');}
        catch(_){if(ownerRaw===null)localStorage.removeItem(OWNER_KEY);else localStorage.setItem(OWNER_KEY,ownerRaw);window.alert('Kopplingen kunde inte sparas. Kalendern är oförändrad.');return getState();}
        before=getState();if(before.saveProtected)return before;
      }
      if(elapsed>=365000)return before;
      const oldRaw=localStorage.getItem(KEY),oldOwner=localStorage.getItem(OWNER_KEY);
      const nextRaw=JSON.stringify({elapsedDays:elapsed+1}),nextOwner=owner(nextRaw,who);
      // Kalender och ägarpost verifieras. Vid fel görs bästa möjliga återställning.
      try{
        localStorage.setItem(OWNER_KEY,nextOwner);
        if(localStorage.getItem(OWNER_KEY)!==nextOwner)throw Error('owner');
        localStorage.setItem(KEY,nextRaw);
        if(localStorage.getItem(KEY)!==nextRaw)throw Error('calendar');
      }catch(_){
        try{if(oldRaw===null)localStorage.removeItem(KEY);else localStorage.setItem(KEY,oldRaw);
          if(oldOwner===null)localStorage.removeItem(OWNER_KEY);else localStorage.setItem(OWNER_KEY,oldOwner);}catch(__){}
        window.alert('Dagen kunde inte sparas säkert. Kontrollera webbläsarens lagring.');return getState();
      }
      const after=getState();if(!after.saveProtected&&after.dayNumber>before.dayNumber)window.dispatchEvent(new CustomEvent('kb:day-advanced',{detail:after}));
      return after;
    }catch(_){window.alert('Kalendern kunde inte uppdateras. Ingen avsiktlig återställning gjordes.');return getState();}
  }
  window.KB_CALENDAR={getState,advanceDay};
})();
