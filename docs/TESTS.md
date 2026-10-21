# KRONOR & BLOD — TESTS
Uppdaterad 2026-10-21. Fantasyvärlden Dornmark. Sverige-testhistorik finns i Git-historiken och är inte V2-testbevis.

## Aktiva testresultat
| Paket | GitHub | Safari | Omfattning |
|---|---|---|---|
| V2-03.2L | PASS | PASS enligt användaren | NPC-samtal |
| V2-03.3B | PASS | PASS enligt användaren | Jordbruk, XP, tid |
| V2-03.5 | PASS | PASS enligt användaren | Position och resa |
| V2-03.6 | PASS | Delvis | Ekonomi; full regression öppen |
| V2-03.6L | PASS | Begränsat PASS | Svenska etiketter, mynt |
| V2-03.7 | PASS | PASS 5/5 | Direkt resa +1 dag; dagbyte +1 dag; omladdning; ekonomi/XP oförändrade; berättelse/dagbok/karaktärsbyte |
| V2-03.8 | PASS | PASS i visad omfattning | Mobil platshantering, arbete och handel |
| V2-03.9 | PASS | PASS i visad omfattning | Jordbruk använder aktuell plats, pengar/spannmål och position kvar efter omladdning |
| **V2-04 KOMPLETT** | **PASS** | **PASS i bekräftad omfattning** | Mara/Toren i Keldra, Edda i Dorneth, mötesval och förtroende, minnen efter omladdning |

## V2-04 — specifik evidens
- GitHub: `index.html` och de tre nya `src/v2-npc-life*`-filerna hämtades och kontrollerades efter commit.
- Safari: användarens skärmbilder visar Mara +2 och Toren +1 efter möten dag 26; Edda +2 efter möte dag 27 fortfarande synligt dag 29. Användaren bekräftar att NPC-minnen överlever omladdning och att Edda visas efter resa.
- Eddas visade rutin dag 29 och bevarade minne är förenliga med avsedd modell. Full tre-dagars cykel är inte separat verifierad.
- Inga bevis ännu för karaktärsbyte mellan två separata NPC-minnesjournaler, trasiga sparningar, nekade skrivningar eller långvarig spelbalans. Dessa får inte markeras PASS.

## Öppna tester
1. Full V2-03.6 ekonomiregression: otillräckligt saldo, dubbelbelöningsskydd, avbrott, pending-återhämtning, ägarseparation, korrupt lagring.
2. V2-04: karaktärsbyte och NPC-minnesseparation, rutincykel över flera dagar, felvägar och återladdning efter flera val.
3. Bred regression av berättelsegrenar, Eddas äldre separata berättelsemöte och nya vardagsmöte.
4. V2-backup/export/import och felhantering.
