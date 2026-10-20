// IMP-025 3H.12.7 J-B — isolated character creation preview, no persistence.
(function(){
'use strict';
const host=document.getElementById('kb-jb-demo');
const bundle=window.KB_NEW_CHARACTER_BUNDLE,life=window.KB_LIFE_BACKGROUND_MODEL;
if(!host||!bundle||!life)return;
const classes={bonde:{label:'Bonde',attributes:{styrka:3,list:1,anseende:1}},hantverkare:{label:'Hantverkare',attributes:{styrka:2,list:2,anseende:1}},skrivare:{label:'Skrivarkunnig',attributes:{styrka:1,list:3,anseende:1}},friboren:{label:'Friboren',attributes:{styrka:1,list:2,anseende:2}}};
const ID='12345678-1234-4234-8234-123456789abc'; // TEST ONLY. Never used to create a real slot.
host.innerHTML='';
const form=document.createElement('form');
const title=document.createElement('h2');title.textContent='Börja ett nytt liv – år 1250';
const intro=document.createElement('p');intro.textContent='Detta är en säker förhandsvisning. Inga karaktärer skapas eller sparas.';
const nameLabel=document.createElement('label');nameLabel.textContent='Namn';
const name=document.createElement('input');name.required=true;name.minLength=2;name.maxLength=32;name.placeholder='Karaktärens namn';nameLabel.append(name);
const classLabel=document.createElement('label');classLabel.textContent='Ursprunglig roll';
const cls=document.createElement('select');for(const [key,v] of Object.entries(classes)){const o=document.createElement('option');o.value=key;o.textContent=v.label;cls.append(o)}classLabel.append(cls);
const inputs={};
for(const [field,label] of Object.entries({upbringing:'Uppväxt',familySituation:'Familj',past:'Förflutet',ambition:'Ambition'})){
 const l=document.createElement('label');l.textContent=label;
 const s=document.createElement('select');s.required=true;
 const blank=document.createElement('option');blank.value='';blank.textContent='Välj…';s.append(blank);
 for(const opt of life.OPTIONS[field]){const o=document.createElement('option');o.value=opt;o.textContent=life.LABELS[field][opt];s.append(o)}
 l.append(s);form.append(l);inputs[field]=s;
}
const bioLabel=document.createElement('label');bioLabel.textContent='Din berättelse (frivillig, max 500 tecken)';
const bio=document.createElement('textarea');bio.maxLength=500;bioLabel.append(bio);
const previewButton=document.createElement('button');previewButton.type='submit';previewButton.textContent='Granska hela karaktären';
const preview=document.createElement('pre');preview.setAttribute('role','status');preview.textContent='Välj en komplett livsbakgrund för att fortsätta.';
const confirm=document.createElement('button');confirm.type='button';confirm.disabled=true;confirm.textContent='Bekräfta karaktär (endast test)';
const status=document.createElement('p');status.setAttribute('role','status');status.textContent='Ingen riktig sparning är möjlig här.';
form.prepend(title,intro,nameLabel,classLabel);form.append(bioLabel,previewButton,preview,confirm,status);host.append(form);
let approved=null;
function current(){return {name:name.value,background:cls.value,characterId:ID,lifeBackground:{version:1,upbringing:inputs.upbringing.value,familySituation:inputs.familySituation.value,past:inputs.past.value,ambition:inputs.ambition.value,biography:bio.value}}}
function reset(){approved=null;confirm.disabled=true;status.textContent='Ändrade val kräver ny granskning. Inget sparas.'}
form.addEventListener('input',reset);form.addEventListener('change',reset);
form.addEventListener('submit',e=>{
 e.preventDefault();reset();
 try{
  const slot=bundle.build(current(),{character:{BACKGROUNDS:classes},life});
  approved=JSON.stringify(current());
  const v=current().lifeBackground;
  preview.textContent='FÖRHANDSVISNING – INTE SPARAD\n\nNamn: '+slot.name+'\nRoll: '+classes[current().background].label+'\n'+Object.entries(inputs).map(([k])=>k+': '+life.LABELS[k][v[k]]).join('\n')+'\nBerättelse: '+(v.biography||'Ingen');
  confirm.disabled=false;status.textContent='Godkänd granskning. Testbekräftelse kan nu tryckas.';
 }catch(err){preview.textContent='Kan inte fortsätta: '+err.message;}
});
confirm.addEventListener('click',()=>{
 if(!approved||approved!==JSON.stringify(current())){reset();return;}
 confirm.disabled=true;approved=null;status.textContent='TEST PASS: Fullständig karaktär godkänd. Inga data har sparats.';
});
})();
