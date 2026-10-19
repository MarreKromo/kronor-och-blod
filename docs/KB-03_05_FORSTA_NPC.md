# KB-03.5 – Första NPC: Ragnhild

## Omfattning
- Ny separat modul `src/encounter.js`.
- En NPC, Ragnhild, introduceras efter spelarens första berättelseval.
- Hennes inledning beror på om spelaren följde pojken, undersökte ringen eller sökte hjälp.
- Spelaren får tre svar: visa förtroende, förhandla om ersättning eller vara försiktig.
- Ett relationsvärde (+1, 0, −1) och en flagga sparas under `kronor-och-blod.encounter.v1`.
- Inga ändringar i befintliga karaktärs-, kalender-, karta- eller berättelsesparningar.

## Design
Ragnhild är en fiktiv person. Hennes motiv ska utvecklas gradvis och hon ska ha egna mål, inte enbart fungera som uppdragsgivare. Relationsvärdet är en första prototyp, inte ett färdigt relationssystem.

## Begränsningar
- Befintlig karaktärsmodell saknar unikt ID. Därför matchas testdata fortfarande mot namn och bakgrund, samt första valet. Ny testkaraktär med samma värden kan ärva en gammal händelse.
- Inga ändringar i världens ekonomi, tid eller karta.
- Historiska detaljer och sociala möjligheter ska källgranskas innan de presenteras som historiska fakta.

## Safari-testplan
1. Öppna befintlig karaktär med sparat första val. Ragnhilds scen ska visas under den första scenen.
2. Kontrollera att Ragnhilds inledning passar det första valet.
3. Välj ett av tre svar. Rätt konsekvens och relationsvärde visas.
4. Ladda om sidan. Samma konsekvens finns kvar.
5. Kontrollera att kalenderknappen och fem kartmarkörer fortfarande fungerar.
6. Testa ny karaktär med ett annat namn: Ragnhilds scen ska inte synas förrän första berättelsevalet gjorts.

## Godkännandekrav
GitHub-filkontroll PASS och Safari-PASS krävs innan KB-03.5 avslutas och dokumenteras i testloggen.
