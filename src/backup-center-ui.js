// KB-A2.5 – stand-alone backup center; no storage writes or import.
(function(){
'use strict';
const builder=window.KB_FULL_BACKUP_BUILDER, integrity=window.KB_FULL_BACKUP_INTEGRITY,
 validator=window.KB_FULL_BACKUP_VALIDATOR;
const exportButton=document.getElementById('export'),status=document.getElementById('status'),
file=document.getElementById('file'),previewStatus=document.getElementById('previewStatus'),
characters=document.getElementById('characters');
let busy=false;
const setBusy=value=>{busy=value;exportButton.disabled=value;file.disabled=value};
function download(json,filename){
 const blob=new Blob([json],{type:'application/json;charset=utf-8'});
 const url=URL.createObjectURL(blob);
 const a=document.createElement('a');
 a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),60000);
}
exportButton.addEventListener('click',async()=>{
 if(busy)return;
 setBusy(true);status.textContent='Kontrollerar sparningar…';
 try{
  if(!builder||!integrity||!validator)throw Error('En säkerhetsmodul saknas.');
  const raw=builder.build(localStorage);
  const sealed=await integrity.seal(raw);
  const result=await validator.preview(sealed,integrity);
  if(!result.ok)throw Error('Förhandskontroll misslyckades: '+result.reason);
  const filename='kronor-och-blod-alla-karaktarer-'+new Date().toISOString().slice(0,10)+'.json';
  download(JSON.stringify(sealed,null,2),filename);
  status.textContent='Export begärd för '+result.characters.length+' karaktär(er) och '+result.slotCount+' sparplats(er). Kontrollera själv att filen '+filename+' finns i Filer. Ingen import har gjorts.';
 }catch(e){status.textContent='Export stoppad: '+e.message+'. Dina sparningar har inte ändrats av exportverktyget.'}
 finally{setBusy(false)}
});
file.addEventListener('change',async()=>{
 if(busy)return;
 characters.replaceChildren();
 const selected=file.files&&file.files[0];
 if(!selected){previewStatus.textContent='Ingen fil vald.';return}
 if(selected.size>5*1024*1024){previewStatus.textContent='Filen är för stor (max 5 MB).';return}
 setBusy(true);previewStatus.textContent='Kontrollerar filen…';
 try{
  const raw=await selected.text();
  const payload=JSON.parse(raw);
  const result=await validator.preview(payload,integrity);
  if(!result.ok)throw Error(result.reason);
  previewStatus.textContent='PASS – kontrollsumma och karaktärsdata verifierade. '+result.characters.length+' karaktär(er), '+result.slotCount+' sparplats(er). Skapad: '+result.createdAt+'. Ingen import utförd.';
  for(const c of result.characters){
   const li=document.createElement('li');
   li.textContent=c.name+(c.active?' (aktiv vid export)':'')+' · ID: '+c.id;
   characters.appendChild(li);
  }
 }catch(e){previewStatus.textContent='FAIL – filen kan inte godkännas: '+e.message}
 finally{setBusy(false)}
});
})();
