# KRONOR & BLOD — SYSTEMS
Teknisk nulägesbeskrivning 2026-10-21. Endast faktiskt implementerat, inte hela visionen.

## Befintlig grund
- Karaktärsbunden berättelse, dagbok, kalender och äldre separat Edda-händelse.
- Jordbruk i Keldra: +1 dag, +10 jordbruks-XP, +3 koppar och +1 spannmål, med journal och pending-återhämtning.
- Resa Keldra–Dorneth tar en dag; faktisk plats kommer från `.travel-v1`. Varnhold är ännu inte öppet.
- Ekonomi `.economy-v1`: `{version:1,ownerId,coins,grain,paidDays,pending}`. Spannmål i Dorneth kostar 2 koppar. Silver och guld visas men används inte. Ingen beslutad växelkurs.
- V2-03.7–V2-03.9: resa/dagbyte utan bekräftelser, mobilvy för arbete/handel och korrigerad platskontroll.

## V2-04, V2-04R och V2-04S — NPC-relationer
- `src/v2-npc-life.js`: Mara och Toren i Keldra, Edda i Dorneth. Dagliga rutiner och behov är deterministiska textvarianter, inte autonom simulering.
- Första mötet lagras per karaktär i `.npc-life-v1` som `{version:1,ownerId,memories:{npcId:{choice,day}}}`. Denna journal behålls oförändrad av återkommande möten.
- V2-04R: återkommande möten i separat `.npc-relations-v1` som `{version:1,ownerId,people:{npcId:[{choice,day}]}}`. Max 500 extra möten per NPC; strikt stigande dagar, en gång per dag. `help` +2 förtroende, `listen` +1.
- V2-04S: ytterligare `choice:'advice'` är tillåtet i den befintliga relationsjournalen, men endast vid minst +5 förtroende. Råd ger 0 förtroende och inga pengar, föremål, XP eller dagar. Äldre poster är kompatibla.
- Relationens visade förtroende härleds från historiken. Nivåer: främling, vänligt inställd, bekant, pålitlig vän. Varierade repliker beror på NPC, dag och möteshistorik; det är författad variation, inte generativ dialog.
- `src/v2-npc-life-ui.js` visar NPC-val, förtroende, dagens vardag i hopfällbar sektion, senaste svar, mötesval och hopfällbar historik. `src/v2-npc-life.css` ger mobilstilar.
- `getRelationships`, `meetAgain`, `dialogue` och `ADVICE` tillkom i modellen. Validering av ägare, plats, dag, schema och råvärde skyddar skrivningar. Ingen tyst återställning vid korrupt journal.
- Det äldre berättelsemötet med Edda (`src/v2-npc.js`) är ett **annat** system och har ingen gemensam sparning med Eddas vardagsmöten.

## Begränsningar
- NPC:er förbrukar inte resurser, driver inte gårdar eller kvarnar och påverkar ännu inte priser eller lager.
- Råd vid +5 ger författad information, inte en ekonomisk eller uppdragsmässig effekt.
- Dagliga rutiner är textscheman. Hushåll, produktion, skulder, skatter, dynamiska priser, familj och politik återstår.
- Äldre 'Ett bud väntar på svar' kan ligga kvar i berättelsevyn. Ingen städning får ändra dess sparade val.
- Full ekonomiregression, backup/export/import och långsiktigt stresstest är ännu öppna. `pending` är återhämtningsdesign, inte en atomär databastransaktion.
