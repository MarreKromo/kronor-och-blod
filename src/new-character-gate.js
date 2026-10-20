// IMP-025 J-F — pure creation gate, no storage, no production activation.
(function(){
'use strict';
function check(request,model){
 if(!request||!model||typeof model.validate!=='function')return Object.freeze({ok:false,reason:'Skapandeunderlag eller validerare saknas.'});
 if(typeof request.name!=='string'||request.name.trim().length<2||request.name.trim().length>32||/[<>\u0000-\u001f]/.test(request.name))return Object.freeze({ok:false,reason:'Ogiltigt namn.'});
 if(typeof request.background!=='string'||!request.background)return Object.freeze({ok:false,reason:'Roll saknas.'});
 const result=model.validate(request.lifeBackground);
 if(!result.ok)return Object.freeze({ok:false,reason:'Fullständig livsbakgrund krävs.'});
 return Object.freeze({ok:true,reason:'Komplett skapandeunderlag.'});
}
function blockLegacy(){throw Error('Ny karaktär kräver fullständig livsbakgrund. Använd det nya karaktärsskapandet.');}
window.KB_NEW_CHARACTER_GATE=Object.freeze({check,blockLegacy});
})();
