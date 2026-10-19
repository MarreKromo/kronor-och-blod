# KB-02.4.1 – Platsregister och grundläggande ekonomi

**Status:** DATAMODELL / EJ INTEGRERAD I SPELVYN.

## Leverans
- `src/world.js`: separat datalager för de fem platserna.
- Refererar till befintliga `place_id` från `src/places.js`.
- Befolkning, resursnivåer, makt och ekonomisk roll är **påhittade prototypvärden**, inte historiska fakta om år 1250.
- Ingen befintlig fil behöver ersättas. Ingen handel eller tidsuppdatering är ännu implementerad.

## Modell
- `population`: spelmässigt exempelvärde; inte historiskt uppskattat invånarantal.
- `resources`: index 0–100 för food, wood, iron, cloth; **inte antal varor, priser eller produktion per dag**.
- `power`: textetikett för möjlig lokal makt; förenklad spelmodell.
- `economy`: textetikett för tänkbar ekonomisk roll.
- `currency`: reserverat namn för framtida system, **ingen fungerande valuta eller transaktion ännu**.

## Arkitektur
`src/places.js` äger platsnamn och skärmpositioner. `src/world.js` äger prototypens samhällsdata. Länkning sker via `place_id`. Spelvyn `index.html` ändras inte i detta delpaket, så användaren ska se samma karta som tidigare.

## Acceptanstest
- [ ] `src/world.js` finns i GitHub och innehåller fem settlements.
- [ ] Alla fem `place_id` matchar `src/places.js`.
- [ ] `index.html` och kartans funktion är oförändrade.
- [ ] Historiska påståenden och spelvärden hålls isär.

## Nästa paket – KB-02.4.2
Koppla världsdatan till kartans informationspanel utan att bryta befintlig markörfunktion. Testa i Safari, PASS/FAIL och uppdatera dagslogg.
