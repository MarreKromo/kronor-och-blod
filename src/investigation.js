// KB-03.6 / IMP-025 steg 3E – säker identitet för undersökningens sparning.
(function () {
  'use strict';
  const model = window.KB_CHARACTER;
  const encounterPanel = document.querySelector('.kb-encounter');
  if (!model || !encounterPanel) return;
  const ENCOUNTER_KEY = 'kronor-och-blod.encounter.v1';
  const ENCOUNTER_OWNER = 'kronor-och-blod.encounter.owner.v1';
  const KEY = 'kronor-och-blod.investigation.v1';
  const OWNER_KEY = 'kronor-och-blod.investigation.owner.v1';
  const BACKUP_KEY = 'kronor-och-blod.backup.pre-migration.v1';
  const routes = {
    trust: { title:'En viskning om Varnhem', intro:'Ragnhild drar dig åt sidan. ”Han bar ett brev när han lämnade Skara. En av klostrets tjänare såg honom vid vägen mot Varnhem. Men säg inte att du fått höra det av mig.”', choices:{
      servant:{label:'Sök upp tjänaren som såg mannen',title:'Vittnet vid vägen',text:'Du vet vem du ska fråga. Ragnhild har gett dig ett försprång, men tjänaren kan vara rädd för att tala.',clues:['En tjänare såg mannen på vägen mot Varnhem','Mannen bar ett brev'],flags:['vittnesspar_oppnat']},
      letter:{label:'Undersök vem som skickade brevet',title:'Brevets avsändare',text:'Du börjar leta efter den som satte brevet i mannens hand. Någon i Skara måste veta.',clues:['Mannen bar ett brev','Brevets avsändare är okänd'],flags:['brevspaning_oppnad']}
    }},
    bargain: {title:'Ett arbete för en ledtråd',intro:'Ragnhild skakar på huvudet. ”Du ville ha betalt. Då får du arbeta för dina svar.” Hon nämner en skrivkunnig man vid torget, men vägrar säga mer.',choices:{
      work:{label:'Erbjud dig att bära ett meddelande åt Ragnhild',title:'Ett dyrköpt uppdrag',text:'Ragnhild accepterar, men håller inne namnet tills du utfört tjänsten. Du har tagit på dig en skuld i handling, inte mynt.',clues:['Ragnhild kräver en tjänst för sin information'],flags:['tjanst_utlovad']},
      market:{label:'Sök efter rykten på torget utan Ragnhild',title:'Röster på torget',text:'En handelsman minns en orolig resande på väg mot Varnhem. Uppgiften är osäker, men du har hittat en väg utan Ragnhild.',clues:['En handelsman nämner en resande mot Varnhem'],flags:['oberoende_kalla']}
    }},
    guard: {title:'En prövning av tilliten',intro:'Ragnhild betraktar dig. ”Du behöll ringen. Bra. Men innan jag berättar mer behöver jag veta om du kan hålla ett löfte.” Hon ber dig lämna ett förseglat meddelande utan att öppna det.',choices:{
      deliver:{label:'Lova att lämna meddelandet oöppnat',title:'Ett löfte i mörkret',text:'Ragnhild räcker dig ett förseglat meddelande. ”När det är lämnat ska vi tala om Varnhem.” Du har fått ett uppdrag och ett möjligt förtroende.',clues:['Ragnhild har ett förseglat meddelande'],flags:['lofte_om_leverans']},
      independent:{label:'Avböj och undersök ringen på egen hand',title:'Ett eget spår',text:'Du avböjer utan att lämna ifrån dig ringen. Ragnhild säger inget mer. Ristningarna på ringen blir din enda säkra utgångspunkt.',clues:['Ringens slitna ristningar kan undersökas vidare'],flags:['eget_spar']}
    }}
  };
  const css=document.createElement('style');
  css.textContent='.kb-investigation{max-width:1050px;margin:12px auto;padding:20px;background:linear-gradient(145deg,#2e352d,#1a231e);border:1px solid #b29861;color:#f2e7ce}.kb-investigation h2{margin:9px 0;font-size:26px}.kb-investigation p{line-height:1.65}.kb-investigation .eyebrow{font:11px system-ui;letter-spacing:2px;color:#c8b17a}.kb-investigation button{display:block;width:100%;text-align:left;margin:9px 0;padding:13px;min-height:48px;border:1px solid #b29861;border-radius:5px;background:#394438;color:#fff0cf;font:600 15px system-ui}.kb-investigation button:focus-visible{outline:3px solid #fff}.kb-investigation .note{color:#c4b995;font:12px system-ui}.kb-investigation ul{line-height:1.8;padding-left:24px}';
  document.head.appendChild(css);
  const panel=document.createElement('section');panel.className='kb-investigation';panel.setAttribute('aria-label','Undersökningen av försvinnandet');encounterPanel.insertAdjacentElement('afterend',panel);
  const el=(tag,value,cls)=>{const n=document.createElement(tag);if(value!==undefined)n.textContent=value;if(cls)n.className=cls;return n;};
  function owned(c,key,ownerKey,field,raw) {
    if (!c || !c.characterId || !raw) return false;
    try {
      const existing=localStorage.getItem(ownerKey);
      if(existing!==null){const record=JSON.parse(existing);return !!(record && record.version===1 && record.characterId===c.characterId && record[field]===raw);}
      const backup=JSON.parse(localStorage.getItem(BACKUP_KEY)||'null');
      if(!backup || !backup.entries || backup.entries[key]!==raw) return false;
      const record=JSON.stringify({version:1,characterId:c.characterId,[field]:raw});
      localStorage.setItem(ownerKey,record);
      return localStorage.getItem(ownerKey)===record;
    }catch(_){return false;}
  }
  function encounterFor(c){
    try{
      const raw=localStorage.getItem(ENCOUNTER_KEY);
      if(!owned(c,ENCOUNTER_KEY,ENCOUNTER_OWNER,'encounterRaw',raw))return null;
      const s=JSON.parse(raw);
      return s && s.version===1 && s.characterName===c.name && s.background===c.background && Object.prototype.hasOwnProperty.call(routes,s.response) && ['follow','ring','help'].includes(s.firstChoice)?s:null;
    }catch(_){return null;}
  }
  function saved(c,e){
    try{
      const raw=localStorage.getItem(KEY);
      if(!owned(c,KEY,OWNER_KEY,'investigationRaw',raw))return null;
      const s=JSON.parse(raw);
      return s && s.version===1 && s.characterName===c.name && s.background===c.background && s.firstChoice===e.firstChoice && s.encounterResponse===e.response && Object.prototype.hasOwnProperty.call(routes[e.response].choices,s.decision)?s:null;
    }catch(_){return null;}
  }
  function save(c,e,id){
    if(!c.characterId || !Object.prototype.hasOwnProperty.call(routes[e.response].choices,id))return false;
    const r=routes[e.response].choices[id];
    const data={version:1,characterName:c.name,background:c.background,firstChoice:e.firstChoice,encounterResponse:e.response,route:e.response,decision:id,clues:r.clues,flags:r.flags};
    try{
      const previous=localStorage.getItem(KEY);
      if(previous && !owned(c,KEY,OWNER_KEY,'investigationRaw',previous))return false;
      const raw=JSON.stringify(data);
      const owner=JSON.stringify({version:1,characterId:c.characterId,investigationRaw:raw});
      localStorage.setItem(OWNER_KEY,owner);
      if(localStorage.getItem(OWNER_KEY)!==owner)return false;
      localStorage.setItem(KEY,raw);
      return localStorage.getItem(KEY)===raw;
    }catch(_){return false;}
  }
  function draw(){
    const c=model.get();const e=c&&encounterFor(c);
    panel.replaceChildren();panel.hidden=!e;if(!e)return;
    const route=routes[e.response];panel.appendChild(el('div','KAPITEL II · MANNEN SOM FÖRSVANN','eyebrow'));
    const state=saved(c,e);
    if(state){
      const result=route.choices[state.decision];
      panel.append(el('h2',result.title),el('p',result.text),el('h3','Dina ledtrådar'));
      const list=el('ul');result.clues.forEach(clue=>list.appendChild(el('li',clue)));
      panel.append(list,el('p','Detta beslut är sparat. Nästa del av undersökningen kommer i ett senare paket.','note'));return;
    }
    if(localStorage.getItem(KEY)!==null){
      panel.append(el('h2','Sparning skyddad'),el('p','Undersökningens tidigare sparning kunde inte säkert kopplas till denna karaktär. Inga uppgifter har skrivits över.','note'));return;
    }
    panel.append(el('h2',route.title),el('p',route.intro),el('p','Vad gör du?'));
    Object.entries(route.choices).forEach(([id,choice])=>{
      const button=el('button',choice.label);button.type='button';
      button.addEventListener('click',()=>{
        const current=model.get();const currentEncounter=current&&encounterFor(current);
        if(!current || !currentEncounter || current.characterId!==c.characterId || currentEncounter.response!==e.response || currentEncounter.firstChoice!==e.firstChoice)return;
        if(!save(current,currentEncounter,id)){window.alert('Undersökningens beslut kunde inte sparas säkert. Äldre sparningar har inte skrivits över.');return;}
        draw();
      });panel.appendChild(button);
    });
    panel.appendChild(el('p','Ditt val sparas lokalt och ger ett eget undersökningsspår.','note'));
  }
  draw();new MutationObserver(draw).observe(encounterPanel,{childList:true});
})();
