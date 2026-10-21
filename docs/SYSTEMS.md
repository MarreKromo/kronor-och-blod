# KRONOR & BLOD — SYSTEMS
Aktuell teknisk översikt 2026-10-21 för fantasyversionen Dornmark. Detta dokument skiljer verifierad kod från planerad funktion.

## Befintliga system
- Karaktärsseparering, berättelse, dagbok och NPC-samtal från V2-03.2-serien.
- V2-03.3B: jordbruksaktivitet med +10 jordbruks-XP och +1 dag. Karaktärsägd aktivitetsjournal med pending; nivågräns 50 XP i första prototypen.
- V2-03.5: faktisk position separat från startplatsen `character.placeId`; Keldra och Dorneth förbundna med resa som kostar en dag. Varnhold ännu stängd.
- V2-03.6: karaktärsbunden `kronor-och-blod.fantasy.v2.character.<uuid>.economy-v1` med `{version:1,ownerId,coins,grain,paidDays,pending}`. Betalt jordbruk i Keldra ger +1 dag, +10 XP, +3 kopparmynt och +1 spannmål. I Dorneth kostar ett spannmål 2 kopparmynt. Äldre arbetsdagar ger ingen retroaktiv lön.
- Arbets- och ekonomijournal ligger i olika localStorage-nycklar. `pending` är återhämtning, inte en atomär databastransaktion. Skadade data får inte tyst skrivas över.
- V2-03.6L: UI-orden ”Dina pengar”, ”Din väska”, ”Spannmål”. `grain` är oförändrat lagringsfält. Koppar aktiv valuta; silver/guld visas som noll, kan inte användas, ingen växelkurs beslutad.

## V2-03.7 — bekräftelseflöden
- `src/v2-travel-ui.js`: resor sker direkt via befintligt rese-API utan `window.confirm` före resa. Arbets- och köpbekräftelser är kvar.
- `src/v2-calendar-ui.js`: ”Fortsätt dagen” anropar befintlig `calendar.advanceDay()` utan `window.confirm`.
- `index.html`: cacheversion `v=2037` för dessa två skript.
- Inga avsiktliga ändringar av reskostnad, XP, mynt, spannmål, lagringsnycklar eller sparmotor.
- GitHub PASS genom filkontroll. Safari PASS 5/5 enligt användaren: direkt resa +1 dag, direkt dagbyte +1 dag, position/datum kvar efter omladdning, ekonomi/XP oförändrade av dessa handlingar och berättelse/dagbok/karaktärsbyte fungerar.

## Begränsningar
- Fullständig separat ekonomiregression för V2-03.6 är inte formellt avslutad. Tester av nekad/full lagring, alla felvägar och verklig V2-backup/import är inte automatiskt godkända.
- Autonoma NPC:er, egendom, dynamiska priser, skuld, silver/guld, familjer, följen och politik är planerade system, inte färdig implementation.
- Äldre Sverige-projektets systemtester är historiska och kan inte användas som bevis för Dornmarks nya system.
