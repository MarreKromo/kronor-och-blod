# KRONOR & BLOD — ROADMAP v3.4
Uppdaterad 2026-10-21. Aktiv värld: Dornmark. `MASTERPLAN_V2.md` är överordnad; `ARBETSMETOD.md` v3.0 gäller.

## Avslutade och verifierade milstolpar
- V2-03.2L–V2-03.9: karaktärer, berättelse, kalender, jordbruks-XP, resa och grundekonomi. Se TESTS för begränsningar.
- V2-04/R/S: NPC-rutiner, första och återkommande möten, förtroende och dialog. GitHub PASS och Safari PASS i rapporterad omfattning.
- **V2-05A–F: prototypkapitel avslutat.** Lokal resurskedja Keldra–Dorneth, produktion, lager, leveranser, marknad, försörjningsvy och separata platsvyer. GitHub PASS och Safari PASS i rapporterad/visad omfattning. Se SYSTEMS, DEVLOG och TESTS; full regression är fortfarande öppen.

## V2-05 — uppnådd prototypomfattning, ej hela ekonomivisionen
- Keldras jordbruk bidrar till produktion; bakgrundsproduktion sker även utan spelarens arbete.
- Dagbaserade leveranser försörjer Dorneths kvarn och marknad; lager visas per ort.
- Köp av spannmål är knutet till marknadens lager. NPC-repliker ger försörjningskontext.
- V2-05E: begriplig mobilvy med separata lagerkort och hopfällbara produktions-/leveransuppgifter.
- V2-05F: platsöversikt och individuella ortsvyer; inspektion utan resa; faktisk resa via befintlig resemodell.
- Återstår: förädling i flera led, dynamiska priser, löner utöver jordbruk, skuld, skatt, transporter med kostnader, egendom och hushållsekonomi. Inget av detta är bortvalt.

## UI/UX och kartarkitektur — beslutade framtida arbeten (EJ implementerade)
**Navigationsförbättring, före större världsexpansion:**
1. Inför huvudfliken **Översikt** med nuvarande ort, datum, pengar, relevanta händelser och tydliga genvägar. Den är en spelöversikt, **inte** spelarens fysiska hem.
2. Bevara senast valda huvudflik efter omladdning och vid karaktärsbyte, med karaktärsägd och validerad sparning. Ändra inte befintliga karaktärsscheman eller återställ äldre data.
3. Fysiska hem i senare spel benämns **Bostad**, **Gård** eller **Egendom** efter ägande och funktion.

**Kart- och platsutbyggnad, efter navigationsgrunden:**
1. Geografisk världskarta för Dornmark, på sikt regionala kartor, vägar och kartkunskap.
2. Återanvändbara, datadrivna individuella ortsvyer med egna byggnader, invånare, aktiviteter och uppdrag. V2-05F är första fungerande prototypen, **inte** färdig kartmotor.
3. Separera **undersök plats** från **res hit**; kartvisning får aldrig automatiskt förbruka en dag.
4. Testa navigation, tillgänglighet, scrollning och spelkänsla på iPhone. Undvik en lång gemensam sida för hundratals orter.
5. Tilldela dessa arbeten egna tydliga leverans-ID:n vid planering utan att skriva över redan reserverade kapitelnummer.

## Bevarad framtida kapitelordning
- **V2-06:** följeslagare, lärlingar och resesällskap — reserverat, ej omnumrerat.
- **V2-07:** familj, barn, åldrande, arv och generationer.
- **V2-08:** grupper, kompanier, rövarband och legosoldater.
- **V2-09:** politik, titlar, vasaller, adelshus och diplomati.
- **V2-10:** borgar, arméer, krig, förvaltning och rikesbildning.
- Löpande: UI/UX, kartor, berättelse, porträtt, backup/export/import och regressionstester.

## Bevarandeprincip
BEVARAS: samtliga masterplanens kärnsystem, befintliga sparnycklar och beslutad framtidsordning. ÄNDRAS: V2-05 markeras som färdig prototypmilstolpe; UI/UX-beroenden preciseras. UTGÅR: ingenting.

## Arbetsregel
Större sammanhängande, spelbara ZIP-paket är standard: normalt ett paket, en commit, en samlad Safari-testomgång. Mindre paket bara vid konkret risk eller beroende. GitHub PASS/FAIL och Safari PASS/FAIL rapporteras separat. Dokumentation samlas vid kapitelavslut.
