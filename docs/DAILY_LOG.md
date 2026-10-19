# Daglig utvecklingslogg – SVERIGE: Kronor & Blod

## 2026-10-19 – KB-01 till KB-02.6
**Mål:** Etablera projektstruktur, historiskt underlag, klickbar karta, samhällsdatapanel, spelkalender och lokal kalendersparning.

**Genomfört:**
- GitHub-repository `MarreKromo/kronor-och-blod` etablerat med README, dokumentation, kartgrafik och källkod.
- GDD, roadmap, beslutslogg, testlogg och historisk referenskarta uppladdade.
- Kartprincip: 1600-talskartan är referens, inte spelkarta för 1250; grafik, platsdata och världsdata hålls separata.
- KB-02.1: fem historiska platser med stabila ID:n dokumenterade.
- KB-02.2: geografiska principer och forskningsbehov dokumenterade.
- KB-02.3: klickbar karta publicerad via GitHub Pages och grundtestad på iPhone/Safari.
- KB-02.4.1: `src/world.js` med fiktiva prototypvärden och dokumentation uppladdade och kontrollerade.
- KB-02.4.2: `index.html` visar befolkning, resurser, makt och ekonomisk roll för vald plats.
- KB-02.5: spelkalender med start 1 januari 1250 och manuell dagframflyttning; grundfunktion PASS i Safari.
- KB-02.6: `src/calendar.js` uppdaterad med `localStorage` för automatisk sparning av passerade dagar.
- Användaren visade KB-02.6-koden levererad av GitHub Pages och bekräftade att datumet finns kvar efter omladdning i samma Safari-flik.

**Verifierat:** `src/calendar.js` har lästs direkt från GitHub. KB-02.6 visas via GitHub Pages enligt användarens skärmbild. Omladdningstest rapporterat PASS. Stängning och återöppning av flik är inte separat testat.

**Teststatus:** KB-01 till KB-02.6 PASS inom respektive dokumenterad omfattning. Se `docs/TESTS.md` för öppna testpunkter.

**Aktiv uppgift:** Ladda upp och verifiera dokumentationspaketet för KB-02.6: `docs/KB-02_06_LOKAL_SPARNING.md`, `docs/TESTS.md` och `docs/DAILY_LOG.md`.
**Nästa exakta steg:** Ladda upp en dokumentfil i taget i GitHub `docs/`, commit och verifiera. Därefter korrigera gammal sidfotstext i separat UI-paket och planera KB-03 – spelarkaraktär.
**Kända begränsningar:** Endast kalenderns dagantal sparas lokalt i aktuell webbläsare/enhet; ingen molnsparning eller övrig spelvärldssparning. Ingen handel, produktion eller ekonomisk simulering. Kalendern är förenklad gregoriansk modell, inte historiskt exakt för 1250. Historisk detaljgranskning, koordinater och rättighetskontroll för originalkartan återstår. Befolkning och resursindex är fiktiva prototypvärden. `index.html` har ännu gammal text om att sparning saknas.


## 2026-10-19 – KB-03.1 och KB-03.2
**Mål:** Införa spelarkaraktär utan att påverka karta, kalender eller samhällsdata.

**Genomfört:**
- KB-03.1: `src/character.js` uppladdad och kontrollerad på GitHub. Modellen innehåller namn, fyra bakgrunder, egenskaper, startplats `VG-SKARA-001` och lokal sparning med nyckeln `kronor-och-blod.character.v1`.
- KB-03.2: `src/character-ui.js` uppladdad och kontrollerad. `index.html` uppdaterad med skripten i rätt ordning.
- Användaren skapade en karaktär i Safari och bekräftade att den visas samt finns kvar efter omladdning.

**Verifierat:** GitHub-filernas existens och skriptordning PASS. Grundflöde och omladdningssparning PASS enligt användaren. Se `docs/TESTS.md`.

**Teststatus:** KB-03.1 kodgranskning PASS; KB-03.2 grundfunktion och omladdning PASS. Felhantering, samtliga bakgrunder och återöppning efter stängd flik ej separat testade.

**Aktiv uppgift:** Dokumentera KB-03.1 och KB-03.2 i `docs/TESTS.md` och `docs/DAILY_LOG.md`; ladda upp och verifiera en fil i taget.
**Nästa exakta steg:** Efter dokumentations-PASS, planera KB-03.3 karaktärsprofil som separat, litet paket. Rätta samtidigt inte orelaterad kod.
**Kända begränsningar:** Karaktären kan ännu inte resa eller påverka världen. Endast lokal webbläsarsparning; ingen molnsynk. Sidfoten i `index.html` säger fortfarande felaktigt att sparning saknas och ska rättas separat.

### Mall för nästa pass
Datum:
Aktivt paket:
Senaste fungerande commit/branch:
Vad ändrades:
Tester PASS/FAIL:
Kända problem:
Nästa exakta steg:
