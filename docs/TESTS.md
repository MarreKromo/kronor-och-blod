# KRONOR & BLOD — TESTS
Uppdaterad 2026-10-22. Skilj tidigare rapporterade PASS från ej utförd full regression.

## Historiska verifieringar
- V2-03.2L: NPC-samtal; V2-03.3B: jordbruk/XP/tid; V2-03.5: resa; V2-03.6/L: delvis ekonomi och språk/mynt.
- V2-03.7: resa/dagbyte PASS 5/5; V2-03.8–.9: mobilvy och platsbundet arbete PASS i visad omfattning.
- V2-04/R/S: NPC-möten, relationer, dagspärr, dialog och råd vid +5; tidigare GitHub PASS och Safari PASS i rapporterad omfattning.
- V2-05A–D: lokal produktion, lager, leveranser, marknad och autonom bakgrundsproduktion; tidigare GitHub/Safari PASS i rapporterad omfattning.
- V2-05E: GitHub PASS och Safari-bilder av lagerkort/hopfällbar redovisning; UI verifierat, motor ej omtestad.
- V2-05F: GitHub PASS och Safari-bilder av platsöversikt och separata ortsvyer; användaren bekräftade tillbaka och resa en dag.

## MAP-01 verifieringar
- MAP-01.5: tidigare GitHub filkontroll PASS; grafiken inte slutgodkänd.
- MAP-01.6: tidigare GitHub filkontroll PASS; Safari-bilder visade visuell kvalitetsbrist.
- MAP-01.6B: `src/map01-unified-terrain.js`, `.css`, `tests/map016b-terrain.test.js` och `index.html` kontrollerade i GitHub; `map016bv1` på JS/CSS. **GitHub PASS.**
- MAP-01.6B Safari: två skärmbilder av normal karta och Berg-vy; användaren: ”Allt verkar funka”. **Begränsat visuellt PASS**, men kartans storlek och kommersiella grafikkvalitet underkända som slutresultat. Ingen fullständig funktions-/sparregression utförd.

## Öppna regressioner — INTE PASS
1. Kartan: pan/zoom, dubbeltryck/pinch, ortval, inspektion utan tid, Berg/Här är du, omladdning, resa, spärrat Varnhold, små iPhone-skärmar.
2. Ekonomi: saldo, dubbelbelöning, avbrott, pending-återhämtning, ägarseparation och korrupt lagring.
3. Långtidstest av bakgrundsproduktion, leveranser, köp, slutsålt, kalendergränser och omladdning.
4. Samspel mellan äldre Edda-scen, NPC-vardagsmöten och ekonomirepliker.
5. Backup/export/import och återställning vid skadade data.
6. NPC-journalers maxgränser och längre dagscykler.
7. Framtida World Locations & Travel Encounters: säker datamodell, risker, tid, händelseval, karaktärsbundenhet och anti-repetition. **Ej implementerat och ej testat.**

## KB-DOC-02
Dokumentationspaket ändrar enbart `docs/`. Kontrollera ersatta dokument i GitHub efter commit. **Inget Safari-test för docs och inga nya spelfunktionstester påstås.**
