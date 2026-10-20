// IMP-025 3H.12.7 A — read-only preview form; no storage operations.
(function () {
  'use strict';
  const model = window.KB_LIFE_BACKGROUND_MODEL;
  const host = document.querySelector('.kb-profile');
  if (!model || !host || document.getElementById('kb-life-background-form')) return;
  const style = document.createElement('style');
  style.textContent = '.kb-life-form{margin-top:16px;padding:16px;background:#1b2b22;border:1px solid #a68c5c;border-radius:9px;color:#f4e9ce}.kb-life-form h3{margin:0 0 8px;font-size:23px}.kb-life-form label{display:block;font:600 14px system-ui;margin:14px 0 6px}.kb-life-form select,.kb-life-form textarea{width:100%;min-height:46px;border:1px solid #bca16b;border-radius:6px;background:#142018;color:#fff3d5;padding:10px;font:15px system-ui}.kb-life-form textarea{min-height:110px;resize:vertical}.kb-life-form button{min-height:46px;margin:12px 8px 0 0;padding:10px 14px;background:#8e412e;color:#fff3d5;border:1px solid #e0bd73;border-radius:6px;font:600 14px system-ui}.kb-life-form button:disabled{opacity:.5}.kb-life-preview{margin-top:14px;padding:12px;border:1px solid #786c4c;background:#26372c;border-radius:6px;white-space:pre-wrap;overflow-wrap:anywhere;font:14px/1.6 system-ui}';
  document.head.appendChild(style);
  const panel = document.createElement('section');
  panel.className = 'kb-life-form'; panel.id = 'kb-life-background-form';
  const heading = document.createElement('h3'); heading.textContent = 'Din livsbakgrund';
  const description = document.createElement('p'); description.textContent = 'Förhandsgranska din historia. I detta steg kan inget sparas.';
  const form = document.createElement('form');
  const selects = {};
  const labels = {upbringing:'Uppväxt',familySituation:'Familj',past:'Förflutet',ambition:'Ambition'};
  for (const field of Object.keys(labels)) {
    const label = document.createElement('label'); label.textContent = labels[field];
    const select = document.createElement('select'); select.required = true;
    const placeholder = document.createElement('option'); placeholder.value=''; placeholder.textContent='Välj…'; select.appendChild(placeholder);
    for (const option of model.OPTIONS[field]) { const el=document.createElement('option'); el.value=option; el.textContent=model.LABELS[field][option]; select.appendChild(el); }
    label.appendChild(select); form.appendChild(label); selects[field]=select;
  }
  const bioLabel = document.createElement('label'); bioLabel.textContent='Din berättelse (max 500 tecken)';
  const biography = document.createElement('textarea'); biography.maxLength=model.MAX_BIO_LENGTH; biography.placeholder='Berätta om din karaktär…'; bioLabel.appendChild(biography); form.appendChild(bioLabel);
  const previewButton = document.createElement('button'); previewButton.type='submit'; previewButton.textContent='Förhandsgranska';
  const cancelButton = document.createElement('button'); cancelButton.type='button'; cancelButton.textContent='Avbryt';
  const preview = document.createElement('div'); preview.className='kb-life-preview'; preview.setAttribute('role','status'); preview.textContent='Inga val har förhandsgranskats.';
  form.append(previewButton,cancelButton);
  form.addEventListener('submit',function(e){
    e.preventDefault();
    const value={version:1,upbringing:selects.upbringing.value,familySituation:selects.familySituation.value,past:selects.past.value,ambition:selects.ambition.value,biography:biography.value};
    const result=model.validate(value);
    if (!result.ok) { preview.textContent='Kontrollera dina val: '+result.errors.join(' '); return; }
    preview.textContent='FÖRHANDSVISNING – INTE SPARAD\n\n'+Object.keys(labels).map(k=>labels[k]+': '+model.LABELS[k][value[k]]).join('\n')+'\n\n'+(value.biography||'Ingen biografi angiven.');
  });
  cancelButton.addEventListener('click',function(){form.reset();preview.textContent='Avbrutet. Ingenting har sparats.';});
  panel.append(heading,description,form,preview);
  host.appendChild(panel);
})();
