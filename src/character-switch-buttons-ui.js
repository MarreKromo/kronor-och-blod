// IMP-025 3H.11.10 – jämna, mobilvänliga bekräftelseknappar.
// Endast CSS/presentation. Rör inte knapphändelser eller bytesmotorn.
(function () {
  'use strict';
  const panel = document.querySelector('.kb-switch-experience');
  if (!panel) return;
  const buttons = Array.from(panel.querySelectorAll('button'));
  const cancel = buttons.find(button => button.textContent.trim() === 'Avbryt');
  const confirm = buttons.find(button =>
    button.textContent.trim() === 'Ja, fortsätt som vald karaktär');
  if (!cancel || !confirm || cancel.parentElement !== confirm.parentElement) return;
  const box = confirm.parentElement;
  box.classList.add('kb-switch-confirm-box');
  confirm.classList.add('kb-switch-confirm-action');
  cancel.classList.add('kb-switch-cancel-action');

  const style = document.createElement('style');
  style.textContent = `
    .kb-switch-experience .kb-switch-confirm-box {
      padding:14px!important;
      border-radius:7px!important;
    }
    .kb-switch-experience .kb-switch-confirm-action,
    .kb-switch-experience .kb-switch-cancel-action {
      display:block!important;
      width:100%!important;
      max-width:100%!important;
      min-height:48px!important;
      margin:0!important;
      padding:12px 14px!important;
      white-space:normal!important;
      text-align:center!important;
      line-height:1.4!important;
      overflow-wrap:anywhere;
    }
    .kb-switch-experience .kb-switch-cancel-action {
      margin-top:10px!important;
      background:#283229!important;
    }
  `;
  document.head.appendChild(style);
})();
