# Testlogg – SVERIGE: Kronor & Blod

## KB-01 – Projektstruktur (2026-10-19)
- [x] PASS: Repository finns på GitHub.
- [x] PASS: `README.md` visas i repositoryt.
- [x] PASS: `docs/ROADMAP.md` finns och har kontrollerats via GitHub.
- [x] PASS: `docs/DAILY_LOG.md` finns och har kontrollerats via GitHub.
- [x] PASS: `docs/GDD_v1.0.docx` finns på GitHub (nedladdning på iPhone ej separat testad).
- [x] PASS: `assets/reference/O37_original_map.pdf` finns på GitHub.
- [x] PASS: GitHub-commits har publicerat filerna.

**KB-01 resultat:** PASS för repositorystruktur och filnärvaro. Separat nedladdningstest av GDD på iPhone återstår.

## KB-02.1 – Historiska platser (2026-10-19)
- [x] PASS: `docs/KB-02_01_HISTORISKA_PLATSER.md` finns på GitHub.
- [x] PASS: Fem stabila plats-ID:n och historiska reservationer dokumenterade.
- [ ] PENDING: Fördjupad källgranskning.

## KB-02.2 – Geografisk grund (2026-10-19)
- [x] PASS: `docs/KB-02_02_GEOGRAFISK_GRUND.md` finns på GitHub.
- [x] PASS: Kartgrafik och platsdata planerade som separata lager.
- [ ] PENDING: Verifierade geografiska koordinater och historiska färdvägar.

## KB-02.3 – Klickbar kartprototyp (2026-10-19)
- [x] PASS: `index.html`, `src/places.js`, `assets/map_art/vastragotaland_sketch.svg` och `docs/KB-02_03_KARTPROTOTYP.md` finns på GitHub.
- [x] PASS: Användaren bekräftar att GitHub Pages-spelet öppnas i Safari på iPhone.
- [x] PASS: Användaren rapporterar att kartan fungerar.
- [ ] EJ SEPARAT VERIFIERAT: Varje platsmarkörs namn, ID och beskrivning kontrollerade individuellt.
- [ ] EJ TESTAT: Liggande skärmläge.

**KB-02.3 resultat:** PASS för första fungerande Safari-prototypen enligt användarens test.

## KB-02.4.1 – Platsregister och ekonomi (2026-10-19)
- [x] PASS: `src/world.js` finns på GitHub och innehåller fem platser med befolkning, resurser, makt och ekonomisk roll.
- [x] PASS: `docs/KB-02_04_1_PLATSREGISTER_EKONOMI.md` finns på GitHub.
- [x] PASS: Datamodellen håller spelvärden skilda från historiskt belagda uppgifter.
- [ ] EJ TESTAT: Simulering av ekonomi (ingår inte i paketet).

## KB-02.4.2 – Kartpanel och ekonomi (2026-10-19)
- [x] PASS: Uppdaterad `index.html` finns på GitHub och laddar `src/world.js`.
- [x] PASS: Kodgranskning visar uppslag på plats-ID och visning av befolkning, makt, ekonomi och resursstaplar.
- [x] PASS: `docs/KB-02_04_2_KARTPANEL_EKONOMI.md` finns på GitHub.
- [x] RAPPORTERAT PASS: Användaren svarade 'Klar med bägge' efter fråga om Safari-test och dokumentationsuppladdning.
- [ ] EJ SEPARAT VERIFIERAT: Samtliga fem orters värden och resursstaplar i Safari.
- [ ] EJ TESTAT: Liggande skärmläge.

**KB-02.4.2 resultat:** PASS för kod- och filkontroll; övergripande Safari-PASS enligt användarens besked. Detaljtester kvarstår.

## KB-02.5 – Tid och årstider (2026-10-19)
- [x] PASS: `src/calendar.js` finns på GitHub; fristående kalender med start 1 januari 1250.
- [x] PASS: `index.html` laddar kalenderfilen och kopplar knappen till `advanceDay()`.
- [x] PASS: `docs/KB-02_05_TID_OCH_ARSTIDER.md` finns på GitHub.
- [x] PASS (användarrapporterat): Kalendern visas på iPhone efter att den uppdaterade GitHub Pages-sidan öppnats i Safari.
- [x] PASS (användarrapporterat): Knappen för nästa dag fungerar och datumet ändras från 1 till 2 januari 1250.
- [ ] EJ SEPARAT TESTAT: Övergången till 1 mars 1250 / vår efter 59 tryck.
- [ ] EJ SEPARAT TESTAT: Alla fem markörer och samhällsvärden efter kalenderändring.
- [ ] EJ TESTAT: JavaScript-konsol i Safari och liggande skärmläge.

**KB-02.5 resultat:** PASS för kalenderns grundfunktion enligt användarens iPhone-test. Sparning infördes senare i KB-02.6.

## KB-02.6 – Lokal sparning (2026-10-19)
- [x] PASS: Uppdaterad `src/calendar.js` finns på GitHub med `localStorage` och sparnyckeln `kronor-och-blod.calendar.v1`.
- [x] PASS: Användaren visade skärmbild där KB-02.6-filen serveras från GitHub Pages i Safari.
- [x] PASS (användarrapporterat): Efter tre dagsteg och omladdning av samma Safari-flik finns datumet kvar.
- [ ] EJ SEPARAT TESTAT: Stäng fliken helt och öppna spelet igen i samma Safari.
- [ ] EJ SEPARAT TESTAT: Sparning över månadsskifte och årsskifte.
- [ ] EJ SEPARAT TESTAT: Kartmarkörer och samhällsdata efter omladdning.
- [ ] EJ TESTAT: Beteende vid blockerad lagring, privat surfning eller rensad webbplatsdata.
- [ ] ÅTERSTÅR: `index.html` visar fortfarande gammal text om att sparning saknas; korrigera i separat UI-ändring.

**KB-02.6 resultat:** PASS för lokal sparning vid omladdning i samma Safari-flik. Fullständigt återöppningstest och UI-textkorrigering återstår.
