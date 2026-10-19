# Daglig utvecklingslogg – SVERIGE: Kronor & Blod

## 2026-10-19 – KB-01 till KB-02.5
**Mål:** Etablera projektstruktur, historiskt underlag, klickbar karta, samhällsdatapanel och fungerande spelkalender.

**Genomfört:**
- GitHub-repository `MarreKromo/kronor-och-blod` etablerat med README, dokumentation, kartgrafik och källkod.
- GDD, roadmap, beslutslogg, testlogg och historisk referenskarta uppladdade.
- Kartprincip: 1600-talskartan är referens, inte spelkarta för 1250; grafik, platsdata och världsdata hålls separata.
- KB-02.1: fem historiska platser med stabila ID:n dokumenterade.
- KB-02.2: geografiska principer och forskningsbehov dokumenterade.
- KB-02.3: klickbar karta publicerad via GitHub Pages och grundtestad på iPhone/Safari.
- KB-02.4.1: `src/world.js` med prototypvärden och dokumentation uppladdade och kontrollerade.
- KB-02.4.2: `index.html` visar befolkning, resurser, makt och ekonomisk roll för vald plats; dokumentation uppladdad.
- KB-02.5: `src/calendar.js`, uppdaterad `index.html` och `docs/KB-02_05_TID_OCH_ARSTIDER.md` uppladdade och kontrollerade.
- Safari visade först en äldre KB-02.4.2-version; uppdaterad GitHub Pages-länk i Safari löste problemet.
- Användaren bekräftade att kalendern visas och att knappen flyttar datumet från 1 till 2 januari 1250 (PASS).

**Verifierat:** GitHub-kod och dokumentation kontrollerade via läsning från repositoryt. Kalenderns grundfunktion rapporterad PASS av användaren på iPhone. Detaljtester är inte genomförda.

**Teststatus:** KB-01 till KB-02.5 PASS inom dokumenterad omfattning. Se `docs/TESTS.md` för öppna testpunkter.

**Aktiv uppgift:** Uppdatera `docs/TESTS.md` och `docs/DAILY_LOG.md` med KB-02.5 och verifiera båda på GitHub.
**Nästa exakta steg:** Ladda upp `docs/TESTS.md`, commit, verifiera; därefter `docs/DAILY_LOG.md`, commit, verifiera. Planera sedan separat paket KB-02.6 för lokal sparning av spelkalendern, utan att ändra ekonomi eller karta.
**Kända begränsningar:** Kalendern återställs vid omladdning; ingen fungerande handel, produktion eller spelvärldssparning. Kalendern använder förenklad gregoriansk modell och är inte historiskt exakt för år 1250. Historisk detaljgranskning, koordinater och rättighetskontroll för originalkartan återstår. Befolkning och resursindex är fiktiva prototypvärden.

### Mall för nästa pass
Datum:
Aktivt paket:
Senaste fungerande commit/branch:
Vad ändrades:
Tester PASS/FAIL:
Kända problem:
Nästa exakta steg:
