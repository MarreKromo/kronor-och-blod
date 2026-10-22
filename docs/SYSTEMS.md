# KRONOR & BLOD — SYSTEMS
Teknisk status 2026-10-22. Faktiskt kodläge, inte önskad funktionalitet.

## Karaktär, tid, ekonomi och berättelse
- Karaktärsbunden berättelse, dagbok, kalender och separat äldre Edda-händelse.
- Jordbruk Keldra: +1 dag, +10 jordbruks-XP, +3 koppar, +1 spannmål, journal och pending-återhämtning.
- Keldra–Dorneth: en dags resa; faktisk plats från `.travel-v1`. Varnhold ännu spärrad.
- `.economy-v1`: `{version:1,ownerId,coins,grain,paidDays,pending}`; Dorneth-köp 2 koppar per spannmål. Silver/guld endast visning.
- V2-03.7–.9: dagbyte/resa utan bekräftelser, mobilvy och platsbundet arbete.

## NPC V2-04/R/S
- `src/v2-npc-life.js`: Mara/Toren i Keldra, Edda i Dorneth. Deterministiska rutiner.
- `.npc-life-v1`, `.npc-relations-v1`: karaktärsbundna möten, max 500 per NPC, högst ett/dag.
- Hjälp +2, lyssna +1 förtroende; råd vid +5. Förtroende härlett ur möteshistorik.
- `src/v2-npc-life-ui.js`: dialog, förtroende, vardag och historik.

## Lokal ekonomi V2-05A–F
- `src/v2-local-economy.js`: karaktärsbunden lokal försörjningsmodell, lager, leveranser och marknad.
- Keldra producerar spannmål, Dorneth tar emot leveranser; köp minskar lager. Bakgrundsproduktion utan spelararbete.
- `src/v2-local-economy-ui.js`: lagerkort och hopfällbar försörjningsvy.
- `src/v2-travel-ui.js`: separata ortsvyer; inspektion gratis, resa via `KB_V2_TRAVEL.travel()`.

## NAV och MAP-01
- `src/v2-navigation.js`: mobilnavigation.
- `src/map01-world-model.js`: geografisk modell med stabila ort-ID:n och vägreferenser.
- `src/map01-interactive.js`/`.css`: SVG-karta, vägar, ortmarkörer, zoom/panorering, Berg och Här är du.
- `src/map01-resource-zones.js`: förberedande resurszoner, inte gruv-/jaktmekanik.
- `src/map01-unified-terrain.js`/`.css`: terrängrendering med skog, berg och flod.
- Senare kartfiler omfattar ortgrafik, vägar, broar och grafiska korrigeringar. **`src/map01-geometry-fix.js` och `.css` finns i GitHub för MAP-01.13E; `index.html` är cacheuppdaterad och `tests/map0113e-quality.test.js` finns.**
- **Känd teknisk/visuell defekt:** MAP-01.13E visar äldre bebyggelse genom nya lager, försämrad Varnhold-borg och saknade kringhus, felaktig bro-/vägplacering. Grundorsaken i SVG-lager och geometri är **inte fastställd**. Kodnärvaro är inte visuell acceptans.

## Ej implementerat
- Bergsby och gruva som spelbara platser eller produktionskedja.
- `World Locations & Travel Encounters`: nya besökbara världspunkter, dynamiska möten, risker/val och kartkunskap.
- Färdiga jakt-/gruvaktiviteter, fog-of-war, flera färdsätt, flera regioner, politiska kartlager.
- Full NPC-autonomi, hela ekonomivisionen, följeslagare, familj, grupper, riken och backup/export/import.

## Säkerhet
- MAP-01.13F ska endast ändra presentation efter kodgranskning; inga ändringar i sparningar, ekonomi, NPC, kalender, resa eller ort-ID:n.
- Full ekonomiregression, korrupt lagring, pending-felvägar, karaktärsbyte och långtidstest återstår.
- `pending` i localStorage är återhämtningsdesign, inte atomär databastransaktion.
