# KRONOR & BLOD — ROADMAP v3.6
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

## UI/UX och kartarkitektur — beslutade framtida arbeten (delvis implementerade)
**Navigationsgrund NAV-01–04:**
1. Översikt är en spelöversikt, **inte** spelarens fysiska hem. Fysiska hem heter Bostad, Gård eller Egendom.
2. Senast valda huvudflik sparas per karaktär. Befintliga sparningar får inte återställas tyst.
3. NAV-01–04 har levererats och visuellt testats i Safari i rapporterad omfattning; full regression är fortfarande öppen. Fortsätt dagen ligger på Översikt. Fyra huvudflikar: Översikt, Berättelse, Platser, Meny.

**WORLD-02 — regional variation och kartdesign (beslutat, ej implementerat):**
- `docs/WORLD_ARCHITECTURE.md` v1.1, avsnitt H, är bindande: regionernas natur, klimat, resurser, samhällen, kultur och historia ska skapa verklig variation i spelvärlden.
- Regioner byggs en i taget, men kart- och datamodell måste tåla skogar, jordbruksbygder, kuster, berg och andra miljöer med olika ekonomi och livsvillkor.
- MAP-01 har en **visuell designgrind**: granska och godkänn konkreta kartkoncept före kod/ZIP. Föreslagen riktning är historiskt trovärdig, återhållsam mörk fantasy med tydliga resvägar, restider och framtida politiska lager.
- Namn, geografi och avstånd i konceptbilder är inte automatiskt spelkanon.

**MAP-01 och vidare – blockerande arkitekturbeslut:**
1. Läs **`docs/WORLD_ARCHITECTURE.md` v1.1** före all ny kartkod, ortdata, politiska system och rikesbildning. Detta är ett godkänt produktbeslut, inte en valfri idé.
2. MAP-01 bygger den första geografiska kartan för **regionen Dornmark** med Keldra, Dorneth och Varnhold, men ska vara utbyggbar till många regioner och kungariken.
3. Geografiska regioner, politiska riken, äganderätt, titlar och faktisk territoriell kontroll är separata begrepp och datalager. **En region är inte automatiskt ett kungarike.**
4. Etablerade riken, adelshus och härskare finns i världens startläge; omstridda gränsmarker och självständiga områden ger utrymme för nya makter.
5. Spelaren ska på sikt kunna grunda ett eget självständigt rike och expandera genom arv, diplomati, allianser, uppror eller erövring. Även NPC-aktörer kan bilda, förändra och förlora riken. Detta är valfri spelväg, inte ett krav.
6. Regioner byggs en i taget, med stabila ID:n och datadrivna kartlager. Undersök plats får aldrig automatiskt innebära resa eller tidskostnad. Befintliga platsvyer och reseregler återanvänds.
7. Före MAP-01-commit: verifiera att kartmodellen kan representera **flera riken i samma region, ett rike i flera regioner, och ett territorium som byter härskare utan att dess geografiska ID ändras**.
8. Kartan ska fungera på iPhone och undvika en enda lång platslista. Terräng, vägar, kartkunskap och regionala vyer ska kunna byggas ut senare.

## Bevarad framtida kapitelordning
- **V2-06:** följeslagare, lärlingar och resesällskap — reserverat, ej omnumrerat.
- **V2-07:** familj, barn, åldrande, arv och generationer.
- **V2-08:** grupper, kompanier, rövarband och legosoldater.
- **V2-09:** politik, titlar, vasaller, adelshus och diplomati.
- **V2-10:** borgar, arméer, krig, förvaltning och rikesbildning.
- Löpande: UI/UX, kartor, berättelse, porträtt, backup/export/import och regressionstester.

## Bevarandeprincip
BEVARAS: samtliga masterplanens kärnsystem, befintliga sparnycklar, öppen livsväg och beslutad framtidsordning. ÄNDRAS: kartarkitekturens bindande gränser och framtida rikesbildning förtydligas. UTGÅR: ingenting. Ändra aldrig WORLD_ARCHITECTURE-principerna tyst; dokumentera konsekvens och inhämta projektägarens uttryckliga godkännande.

## Arbetsregel
Större sammanhängande, spelbara ZIP-paket är standard: normalt ett paket, en commit, en samlad Safari-testomgång. Mindre paket bara vid konkret risk eller beroende. GitHub PASS/FAIL och Safari PASS/FAIL rapporteras separat. Dokumentation samlas vid kapitelavslut eller viktiga arkitekturbeslut.
