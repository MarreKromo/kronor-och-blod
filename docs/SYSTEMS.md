# KRONOR & BLOD – SYSTEMS

Status: aktuell teknisk översikt, 2026-10-20. Dokumenterar verifierad kodstruktur, inte framtida funktioner.

## Arkitektur
- `index.html` laddar V2-moduler för karaktär, berättelse, kalender och händelser.
- `src/v2-data-contract.js` definierar V2-karaktär och nycklar. Varje karaktär har UUID och startplats Keldra.
- `src/v2-character.js` hanterar upp till tre karaktärsplatser och aktiv karaktär.
- `src/v2-story-binding.js` lagrar berättelsescen och valhistorik per karaktär.
- `src/v2.js` visar berättelsen Regn över Keldra samt Dagbok och Platser. Dagboken visar för närvarande berättelsens valhistorik.
- `src/v2-calendar.js` räknar dagar från 1 januari 1250 med separat kalender per karaktär. `src/v2-calendar-ui.js` visar datum och knappen Fortsätt dagen.
- `src/v2-events.js` och `src/v2-events-ui.js` bygger på tidigare encounter-/investigation-principer och visar följder av Keldra-val.

## V2-03.2H – händelsekedja
- Keldras utsädeshändelse har modelldag 3, men kan upptäckas senare.
- Händelsedag och aktuell dag visas separat.
- Två svar per gren. När ett svar väljs sparas beslut, beslutsdag och en konsekvensflagga i en ny separat karaktärsnyckel.
- Händelsen är ännu inte ett fullständigt autonomt NPC-, relations- eller resurssystem. Konsekvensflaggan påverkar ännu inte andra system.
- V2-03.2H har kod på GitHub, men separat Safari PASS/FAIL har ännu inte rapporterats.

## Sparsäkerhet
- V2-prefix: `kronor-och-blod.fantasy.v2.`.
- Karaktär: `character.<uuid>`; berättelse `.story`; kalender `.calendar`; händelse `.event.keldra-seed-v1`.
- Aktiv karaktär identifieras av `active-character-id`.
- Sparningar från äldre Sverige-prototypen migreras eller raderas inte automatiskt.
- Skadade eller främmande sparningar ska blockeras, inte nollställas tyst.
- Safari localStorage är enhets- och webbläsarbunden; ingen molnsynk eller säker fullständig export är implementerad.

## Principer för framtida system
- Återanvänd befintliga V2-kontrakt och testade skydd. Undvik dubbla motorer.
- Världshändelse, upptäckt och spelarbeslut är skilda tidpunkter.
- NPC-relationer, arbete, resor, ekonomi och dynastier tillkommer i separata testade steg.
- Vid ny teknisk funktion: uppdatera detta dokument, inte skapa ett nytt permanent paketdokument.
