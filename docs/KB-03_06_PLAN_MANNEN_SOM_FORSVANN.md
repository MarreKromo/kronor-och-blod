# KB-03.6 – Mannen som försvann
Datum: 2026-10-19
Status: PLAN – ännu inte implementerad eller testad.

## Vision
Fortsätt berättelsen efter Ragnhilds första möte. Gör tidigare val spelmässigt betydelsefulla: olika ledtrådar, handlingsalternativ och konsekvenser, inte bara alternativa formuleringar. Bevara spelarens frihet att fortsätta även vid låg relation.

## Utgångspunkt (verifierad i GitHub)
- `src/story.js` sparar första valet i `kronor-och-blod.story.v1` (`follow`, `ring`, `help`).
- `src/encounter.js` sparar Ragnhilds svar i `kronor-och-blod.encounter.v1` (`trust`, `bargain`, `guard`) med relation +1, −1 eller 0.
- `index.html` laddar story.js, encounter.js och app.js i den ordningen.
- KB-03.5 är användartestad och dokumenterad PASS.

## Kapitelidé – fiktion
Ragnhild uppger att en man försvunnit efter en färd i riktning mot Varnhem. En silverring kan ha samband med försvinnandet. Varken mannens identitet eller Ragnhilds motiv avslöjas helt. Berättelsen ska väcka frågor snarare än ge all information på en gång.

## Tre verkligt skilda vägar
1. **Förtroende +1 (`trust`):** Ragnhild delar en specifik ledtråd och ger tillgång till ett samtal som annars inte öppnas direkt.
2. **Misstro −1 (`bargain`):** Ragnhild undanhåller ledtråden. Spelaren kan i stället skaffa uppgiften genom ett separat uppdrag eller en annan kontakt. Det ska innebära en verklig kostnad eller risk, inte ett stopp.
3. **Avvaktande 0 (`guard`):** Ragnhild erbjuder ett begränsat förtroendeprov. Spelaren får välja att hjälpa henne eller söka en oberoende källa.

## Minimal första implementation
- En ny fristående modul, preliminärt `src/investigation.js`.
- Läs befintliga sparade val utan att skriva över dem.
- Visa rätt scen för relationen och erbjud ett faktiskt spelval per väg.
- Spara ett nytt, separat undersökningsläge under `kronor-och-blod.investigation.v1`.
- Visa en enkel översikt över upptäckta ledtrådar och en tydlig konsekvens av valet.
- Inga ändringar i kalender, karta, profil eller tidigare sparnycklar.
- Uppdatera `index.html` med ett färdigt komplett ersättningsdokument och cache-busting.

## Datakontrakt (förslag)
`{version:1, characterName, background, encounterResponse, route, decision, clues:[...], flags:[...]}`
Värden ska valideras. Ingen ny karaktärsidentitet införs i detta paket. Spara endast efter ett aktivt användarval; visa felmeddelande om lokal lagring misslyckas.

## Berättelseregler
- Ragnhild är fiktiv, med egna mål och skäl att undanhålla information.
- Varnhem är en verklig historisk plats; intrigen och ringen är påhittade.
- Undvik anakronismer och obelagda detaljer som presenteras som fakta.
- Val ska ha begriplig orsak och effekt, inte bara vara kosmetiska.
- Håll den första implementationen liten; större NPC-system och ekonomi kommer senare.

## Risker och framtida arbete
- Namn och bakgrund är ännu inte ett unikt karaktärs-ID. Ny testkaraktär med samma namn/bakgrund kan ärva sparad berättelse. Ska lösas före riktiga sparfiler.
- Relation är ännu ett värde från ett enda möte; ingen full relationsmotor.
- Historisk faktakontroll behövs inför detaljerade miljöbeskrivningar.

## Acceptanskriterier för KB-03.6
1. GitHub visar ny modul och korrekt scriptordning.
2. Tidigare val ger rätt gren, med tydligt skilda möjligheter.
3. Ett nytt beslut skapar sparad ledtråd/flagga och visas efter omladdning.
4. Det går att komma vidare även med relation −1.
5. Ny karaktär med annat namn börjar utan undersökningsresultat.
6. Kalender, fem kartmarkörer, profil, story och Ragnhild fungerar fortfarande.
7. Safari PASS/FAIL bekräftas av användaren.
8. Resultat och avslut dokumenteras i GitHub innan nästa paket.

## Arbetsmetod
Små färdiga ZIP-paket för iPhone. Användaren laddar upp och committar, assistenten verifierar GitHub, användaren testar Safari, därefter dokumentation. Ingen manuell kodredigering.
