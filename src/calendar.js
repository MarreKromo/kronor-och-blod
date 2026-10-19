// KB-02.5: fristående spelkalender, förenklad gregoriansk modell (ej historisk datering).
// Ingen automatisk tick, inga sidoeffekter på ekonomi och ingen persistens.
(function(){
  const months=['januari','februari','mars','april','maj','juni','juli','augusti','september','oktober','november','december'];
  const date=new Date(Date.UTC(1250,0,1));
  let elapsed=0;
  function getState(){
    const year=date.getUTCFullYear(),month=date.getUTCMonth(),day=date.getUTCDate();
    const season=month<=1||month===11?'Vinter':month<=4?'Vår':month<=7?'Sommar':'Höst';
    return {year,month:month+1,day,dayNumber:elapsed+1,season,label:day+' '+months[month]+' '+year};
  }
  function advanceDay(){date.setUTCDate(date.getUTCDate()+1);elapsed++;return getState()}
  window.KB_CALENDAR={getState,advanceDay};
})();
