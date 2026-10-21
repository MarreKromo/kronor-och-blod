# KRONOR & BLOD — SYSTEMS
Teknisk status 2026-10-22. Här beskrivs faktisk implementation, inte önskad funktionalitet.

## Karaktär, tid, ekonomi och berättelse
- Karaktärsbunden berättelse, dagbok, kalender och äldre separat Edda-händelse.
- Jordbruk i Keldra: +1 dag, +10 jordbruks-XP, +3 koppar och +1 spannmål, med journal och pending-återhämtning.
- Resa Keldra–Dorneth tar en dag; faktisk plats från `.travel-v1`. Varnhold ännu stängd.
- `.economy-v1`: `{version:1,ownerId,coins,grain,paidDays,pending}`. Dorneth-köp 2 koppar per spannmål. Silver/guld är endast visning.
- V2-03.7–.9: resa/dagbyte utan bekräftelser, mobilvy och platsbundet arbete.

## NPC V2-04/R/S
- `src/v2-npc-life.js`: Mara/Toren i Keldra, Edda i Dorneth. Deterministiska rutiner, ej full autonomi.
- `.npc-life-v1` och `.npc-relations-v1` sparar karaktärsbundna möten. Max 500 per NPC, högst ett per dag.
- Hjälp +2, lyssna +1 förtroende; råd vid +5 utan belöning. Förtroende härleds från möteshistorik.
- `src/v2-npc-life-ui.js`: samtal, förtroende, vardag och historik. Äldre berättelse-Edda separat.

## Lokal ekonomi V2-05A–F
- `src/v2-local-economy.js`: karaktärsbunden lokal försörjningsmodell, lager och flöden kopplade till kalender och marknad.
- Keldra producerar spannmål; Dorneth får leveranser. Marknadsköp minskar tillgängligt lager; produktion sker även utan spelararbete.
- Spelarens inventarium skiljs från traktens lager; `.economy-v1` ska förbli kompatibel.
- `src/v2-local-economy-ui.js`: lagerkort, förklaring och hopfällbar redovisning av produktion/leveranser/köp.
- `src/v2-travel-ui.js`: ortsöversikt och separata ortsvyer. Inspektion kostar ingen dag; faktisk resa använder `KB_V2_TRAVEL.travel()`.

## NAV och MAP-01
- `src/v2-navigation.js` och tillhörande gränssnitt: mobilnavigation med Översikt, Berättelse, Platser och Meny i senare NAV-leveranser.
- `src/map01-world-model.js`: geografiskt datakontrakt för Dornmark; kartan använder stabila ort-ID:n och vägreferenser.
- `src/map01-interactive.js`/`.css`: SVG-karta med vägar, ortmarkörer, zoom, panorering, Berg-knapp och Här är du. Detta är kartinteraktion, inte en resehändelsemotor.
- `src/map01-resource-zones.js`: förberedande resurszoner/markeringar, inte aktiverad gruvdrift eller jakt.
- `src/map01-unified-terrain.js`/`.css`: MAP-01.6B deterministisk presentationsrendering. Ersätter äldre SVG-terräng framför befintliga vägar/ortmarkörer. JS/CSS laddas via `index.html` med `?v=map016bv1`.
- MAP-01.6B Safari-skärmbilder visar Keldra/Dorneth/Varnhold, skog, berg och flod. Användaren rapporterar att allt verkar fungera. Inte bevis för full regression.

## Ej implementerat
- `MAP-01.4 – World Locations & Travel Encounters` som spelmekanik: nya besökbara världspunkter, dynamiska resehändelser, risker och val; ID behöver särskiljas från redan använd MAP-01.4 kartgrafik.
- Färdiga jakt-/gruvaktiviteter, kartkunskap/fog-of-war, flera färdsätt, aktiv kontra simulerad resa, dynamiska restider, flera regioner och politiska kartlager.
- Full NPC-autonomi, hela ekonomivisionen, följeslagare, familj, grupper, riken och backup/export/import.

## Säkerhet och begränsningar
- Kartans terrängrenderare är presentationskod; ingen avsiktlig ändring av localStorage, resregler eller kalender.
- Full ekonomiregression, korrupt lagring, pending-felvägar, karaktärsbyte, långtidssimulering och backup/export/import återstår.
- `pending` i localStorage är återhämtningsdesign, inte atomär databastransaktion.
