# KB-02.6 – Lokal sparning av spelkalendern

**Status:** Klar för uppladdning och Safari-test; ännu inte verifierad.

## Syfte
Spelkalendern ska fortsätta på samma datum efter omladdning i samma webbläsare på samma enhet.

## Ändringar
- `src/calendar.js` behåller samma publika API: `window.KB_CALENDAR.getState()` och `.advanceDay()`.
- Efter varje dagsteg sparas antalet passerade dagar i `localStorage` med nyckeln `kronor-och-blod.calendar.v1`.
- Vid sidstart återställs kalendern från en giltig sparning, annars startar den 1 januari 1250.
- Felaktiga sparvärden ignoreras. Om lagring är blockerad fungerar kalendern i minnet men sparas inte.
- Befintlig karta, platser och ekonomi ändras inte.

## Installation
1. Ersätt `src/calendar.js` i GitHub med paketets fil och commit.
2. Öppna GitHub Pages i Safari med ny frågeparameter om äldre version visas.
3. Utför testerna och rapportera PASS/FAIL.
4. Ladda upp detta dokument till `docs/` **efter godkänt test**.

## Acceptanstester
- [ ] Datumet syns som tidigare och knappen fungerar.
- [ ] Gå fram 3 dagar, ladda om sidan: samma datum och dagnummer finns kvar.
- [ ] Stäng Safari-fliken, öppna GitHub Pages igen i samma Safari: datumet finns kvar.
- [ ] Klicka på platsmarkörerna: samhällsdata fungerar som förut.
- [ ] Observera: Safari privat surfning, rensad webbplatsdata eller annan webbläsare kan sakna sparningen.

## Avgränsning
Ingen molnsparning, användarinloggning eller automatisk tidsframflyttning. Befintlig sidfot i `index.html` säger fortfarande ”Ingen sparning ... ännu”; texten ska korrigeras i ett separat litet UI-paket efter funktionstestet för att undvika onödiga ändringar i kartans kod.
