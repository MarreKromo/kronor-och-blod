# KB-02.4.2 – Visa samhälle och ekonomi i kartpanelen

**Status:** Kod levererad; väntar på iPhone/Safari-test.

## Ändring
- Endast `index.html` ersätts. `src/places.js`, `src/world.js` och kartans SVG lämnas oförändrade.
- `src/world.js` läses efter `src/places.js`.
- Platsens `id` matchas mot `settlements[].place_id`.
- Vald ort visar befolkning, lokal makt, ekonomisk roll och fyra resursindex (0–100).
- Om platsdata saknas visas ett begripligt meddelande; kartmarkörerna fortsätter fungera.
- Resursindex och befolkningssiffror är **fiktiva prototypvärden**, inte historiskt belagda fakta.
- Ingen ekonomi simuleras ännu: ingen tidsuppdatering, handel, produktion eller sparfunktion.

## Installation
1. Ersätt repositoryts `index.html` i roten med filen från paketet och commit.
2. Vänta på GitHub Pages-publicering och uppdatera Safari.
3. Öppna fem platser och kontrollera att samhällsdata ändras med valet.
4. Lägg denna dokumentationsfil i `docs/` efter att koden har testats.

## Acceptanstest
- [ ] Kartan visas som tidigare i iPhone/Safari.
- [ ] Alla fem platsmarkörer fungerar.
- [ ] Skara visar 420 och biskopens inflytande.
- [ ] Lödöse visar 360 och köpmän och kunglig kontroll.
- [ ] Varnhem, Gudhem och Husaby visar sina egna värden.
- [ ] Resursstaplar ändras mellan platserna.
- [ ] Det står tydligt att siffrorna är prototypvärden.
- [ ] Test i liggande läge (valfritt separat test).

**Resultat:** PENDING tills användaren rapporterat PASS/FAIL.
