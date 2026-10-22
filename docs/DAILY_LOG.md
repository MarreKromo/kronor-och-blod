# KRONOR & BLOD — DAILY LOG / STOPP & START

## STOPP — 2026-10-22, efter MAP-01.13E
**Repo:** `MarreKromo/kronor-och-blod` · branch `main`  
**Live:** https://marrekromo.github.io/kronor-och-blod/

### SENASTE FAKTISKA STATUS
- MAP-01.13E är committad och **GitHub PASS** för `index.html`, `src/map01-geometry-fix.js`, `src/map01-geometry-fix.css` och `tests/map0113e-quality.test.js`.
- **Safari FAIL**: användarens tre senaste skärmbilder visar äldre hus som syns genom Varnholds nya terräng, försämrade borgmurar och bortfallna hus runt huvudborgen. Broarna och vägarna är fortfarande visuellt felaktiga.
- MAP-01.13D var också **Safari FAIL** med felplacerade broar, konstgjorda vattenovaler, för breda vägar och platt borg.
- **Inget nytt kodpaket har påbörjats.** Användaren vill sova och har begärt obligatoriskt helhetsdokumentationstillfälle och STOPP innan fortsatt utveckling.
- Den senaste fungerande *fullständigt visuellt godkända* kartversionen är **inte fastställd**. Tidigare paket innehöll fler detaljer kring Varnhold och bättre murar; jämför Git-historiken före återställning.
- Ingen fullständig regression av sparningar, NPC, ekonomi eller reseflöde är gjord.

### BESLUTAT NÄSTA KODPAKET — MAP-01.13F
**Visual Recovery & Layer Cleanup** — **PLANERAT, EJ IMPLEMENTERAT**.
1. Läs aktuella styrdokument och kartkod i GitHub.
2. Jämför tidigare fungerande illustrationer med 13D/13E. Identifiera original-SVG-lager, ritordning, dubbletter och varför äldre hus syns genom terräng.
3. Återställ huvudborgens murar, torn, borggård och hus runt Varnhold. Bevara värdshus och naturlig sluttning där det fungerar.
4. Placera broar på faktiska flodövergångar och rätta väggeometri utan blå ovaler eller nya maskeringslager.
5. Kontrollera Dorneths kvarn/marknad och Keldras hus/åkrar, skog och terräng.
6. Leverera EN ZIP med kompletta filer, tester och cacheversioner i `index.html`; användaren committar via iPhone.
7. GitHub PASS/FAIL efter commit; därefter Safari PASS/FAIL med översikt, broar och Varnhold inzoomat. **Ingen visuell godkänning i förväg.**

### BEVARAT FRÅN TIDIGARE CHATT
- Berg, träd och terräng ska förbättras. **Bergsby, gruva och naturresurser** är viktiga planerade tillägg men ska inte läggas ovanpå defekt kartbas.
- `MAP-01.4 – World Locations & Travel Encounters` är en separat tidigare beslutad **framtida** arbetsström; inte implementerad. MAP-01.4-ID används även för äldre geografisk kartutbyggnad: ge resehändelsekapitlet ett nytt ID utan att tappa idéerna.
- Varnhold = regionens huvudborg; Dorneth = handels-/kvarnort; Keldra = jordbruksby.
- Inspektion är inte resa; befintliga sparningar, karaktärer, ekonomi, NPC och kalender måste bevaras.
- Användaren arbetar **endast med iPhone**, vill ha riktiga ZIP-filer, en commit, GitHub PASS/FAIL och Safari PASS/FAIL. **Generera inte bilder i stället för kod.**

### START — vid nästa arbetspass / ny chatt
Läs i GitHub:
`docs/MASTERPLAN_V2.md`, `docs/ROADMAP.md`, `docs/SYSTEMS.md`, `docs/DEVLOG.md`, `docs/TESTS.md`, `docs/DAILY_LOG.md`, `docs/ARBETSMETOD.md`, `docs/WORLD_ARCHITECTURE.md`, `docs/MAP_01_APPROVED_IMPROVEMENTS.md`, samt aktuell kartkod och tidigare fungerande versioner i Git-historiken.

**Första uppgift:** analysera 13D/13E:s SVG-lager och planera exakt riktad återställning för MAP-01.13F. Börja inte med bergsby/gruva och skriv inte ett nytt överlägg innan orsaken hittats.

### Dokumentationens installationsstatus
Detta är ett **lokalt förberett helhetsdokumentationspaket**, inte GitHub PASS. Efter användarens commit: verifiera alla sex ersatta dokument. Inget Safari-test för enbart docs.

---

## Historisk checkpoint — 2026-10-22, MAP-01.6B
- MAP-01.6B GitHub PASS för terräng-JS/CSS/test och cachefix. Safari-bilder av normal karta och Berg-vy; grafik inte slutgodkänd.
- Nästa planerade MAP-01.7 genomfördes därefter som del av senare kartutveckling; aktuell status återges ovan.
- World Locations & Travel Encounters bevaras som separat framtida funktion.

## Historisk checkpoint — V2-05, 2026-10-21
- V2-05A–F: lokal resurskedja, lager, leveranser, marknad, försörjningsvy och ortsvyer.
- Översikt är inte bostad; kartinspektion är inte resa; V2-06 reserverat för följeslagare.
- Full regression, backup/export/import och fortsatt ekonomivision återstår.
