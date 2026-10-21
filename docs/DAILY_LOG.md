# KRONOR & BLOD — DAILY LOG / STOPP & START
Checkpoint 2026-10-21. Repo: `MarreKromo/kronor-och-blod` · `main`.
Spel: https://marrekromo.github.io/kronor-och-blod/

## STOPP — V2-05 prototypkapitlet avslutat
- V2-05A–D: lokal resurskedja med produktion, leveranser, marknad och autonom bakgrundsproduktion; tidigare GitHub/Safari PASS i angiven omfattning.
- V2-05E: GitHub PASS, Safari PASS för lagerkort, förklarande text och hopfällbar försörjningsstatistik. Ekonomimotorn inte fullständigt omtestad.
- V2-05F: GitHub PASS för tre filer; Safari-bilder på platsöversikt, Keldra och Dorneth; användaren bekräftade tillbaka-knapp och resa en dag. Safari PASS i rapporterad omfattning.
- Ingen av dessa leveranser innebar beslut att stryka kvarstående ekonomisystem ur masterplanen.

## Beslut att komma ihåg
1. **Översikt** blir en framtida huvudflik; inte samma sak som fysisk bostad.
2. Aktiv huvudflik återställs efter omladdning och är karaktärsbunden.
3. Varje ort ska ha egen återanvändbar vy; karta → ort → lokala byggnader/aktiviteter.
4. Inspektion av ort skiljs från resa; faktisk resa kostar tid enligt resemodellen.
5. Geografisk karta, vägar och kartkunskap är planerade, inte implementerade av V2-05F.
6. **V2-06 är reserverat för följeslagare**; navigation/karta får egna ID:n utan att skriva över ordningen.
7. Större sammanhängande ZIP-paket som standard; ett paket, en commit och en samlad Safari-testomgång; små paket endast vid konkret teknisk risk.

## START — nästa session
1. Installera detta dokumentationspaket i en commit och svara `Klar`.
2. Assistenten läser samtliga ändrade `docs/`-filer från GitHub och rapporterar GitHub PASS/FAIL. Inget Safari-test behövs för docs.
3. Läs aktuell roadmap, masterplan och faktisk spelkod innan nästa spelpaket. Bekräfta vilken navigations-/kartfunktion som ska byggas först och välj leverans-ID utan konflikt med V2-06.
4. Bygg ett större sammanhängande iPhone-testbart ZIP-paket med komplett UI, dataskydd, relevanta tester och cacheversionering.
5. Kontrollera särskilt att `src/v2.js` och `src/v2-character.js` delar tabbnavigation; bevara alla karaktärs- och berättelsesparningar. Undvik att stapla ytterligare paneler på Platser.
6. GitHub PASS/FAIL efter commit; Safari PASS/FAIL efter test av spelaren. Full ekonomiregression och backup/export/import förblir öppna.

## Dokumentansvar
`MASTERPLAN_V2.md`: vision/funktionsregister. `ROADMAP.md`: prioritet och UI/UX-beslut. `SYSTEMS.md`: faktiskt byggt. `DEVLOG.md`: historik. `TESTS.md`: evidens och öppna tester. `DAILY_LOG.md`: checkpoint. `ARBETSMETOD.md`: bindande arbetsprocess.
