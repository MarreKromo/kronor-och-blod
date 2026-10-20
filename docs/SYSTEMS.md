# KRONOR & BLOD – SYSTEMS
**Status:** V2-03.5 kodpaket färdigställt lokalt; GitHub- och Safari-test återstår.

## V2-grund
- `v2-data-contract.js`: karaktärsbunden identitet, startplats Keldra. Den ursprungliga `character.placeId` är oföränderlig startplats, **inte aktuell position**.
- `v2-calendar.js`: kalender per karaktär; `advanceDay()` förbrukar en dag.
- `v2-skills.js`: jordbruksjournal med 10 XP per arbetsdag, nivå 2 efter fem arbetsdagar; återhämtningsbar pending-skrivning. Befintliga XP och sparningar bevaras.
- `v2-events*`, `v2-npc*`, `v2-focus.js`: berättelse, Mara/Edda, dagbok.

## V2-03.5 – Position, resa och platsbaserat arbete
- `v2-travel.js`: ny separat karaktärsbunden nyckel `kronor-och-blod.fantasy.v2.character.<uuid>.travel-v1`. Saknad nyckel betyder Keldra, utan migration eller skrivning. Format `{version:1,ownerId,placeId,pending:null|{from,to,day}}`.
- Kartmarkering och faktisk position är separata. Keldra och Dorneth har första prototypförbindelsen, 1 dag till fots per enkel resa. Varnhold syns men saknar ännu öppen färdväg. Restiden är prototypbalans, inte geografiskt fastställd.
- Bekräftad resa: skriv och verifiera pending, förflytta kalender exakt en dag, slutför och verifiera position. Vid avbrott kan nästa läsning återuppta samma resa. Inget nytt XP tillkommer av resa.
- `v2-travel-ui.js`: platsval, restid, bekräftelse och arbete under Platser. `v2-skills-ui.js` visar enbart färdighetsstatus på Karaktär. `v2-work-location.js` skyddar även direkta arbetsanrop mot jordbruk utanför Keldra.
- Ingen inkomst, egna gårdar, inventarium, vagnar, hästar, följen, slumpmöten eller riktig grafisk karta i denna vertikala kedja. Dessa **bevaras** i Masterplan v3.0.
- Äldre berättelsescener kan nämna Dorneth även när spelaren fysiskt är i Keldra. Detta är ett känt äldre berättelseberoende, **inte** en resa; scenkoppling till position ingår i senare berättelsearbete.
- Säkerhetsgräns: kalendern är fortfarande ett separat lagringsobjekt; avbrutna skrivningar hanteras med pending-journal, inte atomär fler-nyckelstransaktion. Skadad data stoppas utan automatisk radering. Export/backup för V2 återstår.

## Acceptans för Safari
1. Platser: vald plats ändrar inte faktisk position.
2. Keldra → Dorneth: bekräfta, +1 dag, plats Dorneth; där finns ingen jordbruksknapp.
3. Dorneth → Keldra: +1 dag; jordbruk kan åter användas, +10 XP och +1 dag.
4. Avbryt resbekräftelse: ingen förändring.
5. Omladdning och A→B→A: position, tid, XP per karaktär bevaras.
6. Varnhold är inte resbart; Mara/Edda och Dagbok fungerar fortsatt.
7. Avbruten/ogiltig pending och skadad ägar-/versionsdata ska inte tyst skrivas över.

## Kommande arbete
Förbättra verklig kartgrafik, fler orter/vägar, resetyper, vägfaror, årstider, väder, upptäckter, NPC-rutiner, platsbaserade yrken, ägda gårdar och verksamheter, ekonomi, följen och grupper. Bygg på samma plats-/tid-/aktivitetsmodell, inte separata yrkesknappar.
