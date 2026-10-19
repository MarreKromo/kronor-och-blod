// KB-02.6: kalender med lokal sparning i denna webblasare.
// Förenklad gregoriansk spelkalender; påverkar inte ekonomi eller kartdata.
(function(){
  'use strict';
  const KEY='kronor-och-blod.calendar.v1';
  const START=Date.UTC(1250,0,1);
  const months=['januari','februari','mars','april','maj','juni','juli','augusti','september','oktober','november','december'];
  let elapsed=0;
  let storageAvailable=true;
  try {
    const saved=window.localStorage.getItem(KEY);
    if(saved!==null){
      const parsed=JSON.parse(saved);
      if(Number.isSafeInteger(parsed.elapsedDays) && parsed.elapsedDays>=0 && parsed.elapsedDays<=365000){
        elapsed=parsed.elapsedDays;
      }
    }
  } catch(error){storageAvailable=false;}
  function getState(){
    const date=new Date(START+elapsed*86400000);
    const year=date.getUTCFullYear(),month=date.getUTCMonth(),day=date.getUTCDate();
    const season=month<=1||month===11?'Vinter':month<=4?'Vår':month<=7?'Sommar':'Höst';
    return {year,month:month+1,day,dayNumber:elapsed+1,season,label:day+' '+months[month]+' '+year,storageAvailable};
  }
  function advanceDay(){
    if(elapsed<365000) elapsed++;
    try {window.localStorage.setItem(KEY,JSON.stringify({elapsedDays:elapsed}));storageAvailable=true;}
    catch(error){storageAvailable=false;}
    return getState();
  }
  window.KB_CALENDAR={getState,advanceDay};
})();
