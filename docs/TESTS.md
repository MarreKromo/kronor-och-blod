# KRONOR & BLOD — TESTS
Uppdaterad 2026-10-21. Skiljer GitHub-kodkontroll, Safari-observation och öppna regressioner.

## Tidigare resultat
| Paket | GitHub | Safari | Omfattning |
|---|---|---|---|
| V2-03.2L | PASS | PASS enligt användaren | NPC-samtal |
| V2-03.3B | PASS | PASS enligt användaren | Jordbruk, XP, tid |
| V2-03.5 | PASS | PASS enligt användaren | Resa |
| V2-03.6 | PASS | Delvis | Ekonomi; full regression öppen |
| V2-03.6L | PASS | Begränsat PASS | Språk och mynt |
| V2-03.7 | PASS | PASS 5/5 | Dagbyte och resa |
| V2-03.8 | PASS | PASS i visad omfattning | Mobilvy |
| V2-03.9 | PASS | PASS i visad omfattning | Arbete på rätt plats |
| V2-04 | PASS | PASS i rapporterad omfattning | Första NPC-minnen |
| V2-04R | PASS | PASS 6/6 enligt användaren | Upprepade möten, relationer, dagspärr |
| V2-04S | PASS | PASS enligt användaren och bilder | Råd vid +5, varierade repliker |

## V2-04 — tidigare evidens
V2-04R/S: GitHub-kodkontroll och tidigare lokala Node-tester av äldre sparningar, dagspärr, ägarseparation, platskontroll, rådtröskel och korrupt journal. Safari-bilder visade Mara +6, Edda +7 och hopfällbara mötesvyer. Full ekonomiregression bevisades inte.

## V2-05 — verifierat
- **A–C:** tidigare GitHub/Safari-kontroller av första lokala produktions-, lager- och marknadskedjan. Ingen ny komplett regressionssvit utförd vid kapitelstängning.
- **D:** GitHub PASS och tidigare Safari PASS för autonom bakgrundsproduktion. Separat verifiering av omladdning och alla köpvägar saknas.
- **E:** GitHub PASS för index, lokal-ekonomi-UI och CSS. Fyra Safari-bilder visar lagerkort, textförklaring och hopfällbar redovisning. **Safari PASS för UI**, inte en ny verifiering av motorns transaktioner.
- **F:** GitHub PASS för `index.html`, `src/v2-travel-ui.js`, `src/v2-travel.css`. Safari-bilder visar platsöversikt, Keldra- och Dornethvyer, 25 koppar/20 spannmål och försörjningspanel. Användaren bekräftade fungerande tillbaka-knapp och resa som tar en dag. **Safari PASS i denna omfattning**.

## Öppna tester (ej PASS)
1. Full V2-ekonomiregression: saldo, dubbelbelöning, avbrott, pending-återhämtning, ägarseparation och korrupt lagring.
2. Långtidstest av bakgrundsproduktion, leveranser, köp, slutsålt, kalendergränser och reproducerbarhet efter omladdning.
3. Samspel mellan gamla Edda-berättelsemötet, NPC-vardagsmöten och ekonomins repliker.
4. Backup/export/import samt återställning vid skadade data.
5. NPC-journalernas maxgränser och längre dagscykler.
6. Framtida navigation: aktiv flik per karaktär, omladdning, växling, tillgänglighet och återgång till rätt vy.
7. Framtida karta: upptäckt/okänd plats, inspektion utan tidskostnad, resa med korrekt tidskostnad, stängda vägar och många orter.

## Dokumentationspaket V2-05-CLOSE
Ändrar endast dokument. Kräver GitHub PASS efter användarens commit; **inget Safari-test**. Inga nya körtester påstås.
