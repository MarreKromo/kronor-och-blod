# KB-02.5 – Tid och årstider

**Status:** Kodpaket klart för uppladdning och Safari-test. Inte verifierat i GitHub ännu.

## Leverans
- `src/calendar.js`: separat spelkalender. Start 1 januari 1250, manuell framflyttning en dag per klick.
- `index.html`: kalenderpanel ovanför kartan; datum, årstid, dagnummer och knapp. Befintliga fem markörer och samhällsdata behålls.

## Viktiga avgränsningar
- Datum beräknas med en **förenklad gregoriansk kalender** för prototypen. Detta är **inte** ett påstående om vilken kalender som användes i Sverige 1250.
- Årstider är fasta spelregler: vinter december–februari, vår mars–maj, sommar juni–augusti, höst september–november.
- Tid går bara framåt vid knapptryck. Ingen sparning: omladdning återställer till 1 januari 1250.
- Inga förändringar av befolkning, resurser, handel eller händelser ännu.

## Installation (i denna ordning)
1. Ladda upp `src/calendar.js` i GitHub `src/` och commit.
2. Ersätt repositoryts befintliga `index.html` med paketets `index.html` och commit.
3. Öppna GitHub Pages i Safari, testa och rapportera PASS/FAIL.
4. Ladda upp detta dokument i `docs/` efter godkänt test.

## Acceptanstester
- [ ] Start: 1 januari 1250, Vinter, Dag 1.
- [ ] Ett tryck: 2 januari 1250, Dag 2.
- [ ] Efter 59 tryck från start: 1 mars 1250, Vår, Dag 60.
- [ ] Kartan och de fem markörerna fungerar fortfarande.
- [ ] Samhällsdata ändras inte när tid går.
- [ ] Omladdning återställer kalendern (avsiktligt i detta paket).
- [ ] Inga JavaScript-fel i Safari.
