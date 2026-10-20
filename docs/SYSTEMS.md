# KRONOR & BLOD – SYSTEMS

Status: teknisk översikt, 2026-10-20. V2-03.2K väntar på GitHub- och Safari-test.

## Arkitektur
- `index.html` laddar V2-moduler för karaktär, berättelse, kalender och händelser.
- `src/v2-data-contract.js` definierar V2-karaktär och nycklar. Varje karaktär har UUID och startplats Keldra.
- `src/v2-character.js` hanterar upp till tre karaktärsplatser och aktiv karaktär.
- `src/v2-story-binding.js` lagrar berättelsescen och valhistorik per karaktär.
- `src/v2.js` visar Regn över Keldra samt Dagbok och Platser.
- `src/v2-calendar.js` räknar dagar från 1 januari 1250 med separat kalender per karaktär; `src/v2-calendar-ui.js` visar Fortsätt dagen.
- `src/v2-events.js` och `src/v2-npc.js` är separata, befintliga händelsemodeller.

## V2-03.2H – händelsekedja
- Keldras utsädeshändelse inträffar modelldag 3 men kan upptäckas senare.
- Händelsedag och aktuell dag visas separat. Två svar per gren.
- Beslut och beslutsdag sparas per karaktär. En konsekvensflagga härleds ur valet; ännu ingen full NPC-ekonomi eller relationsmodell.
- Safari PASS för visad Mara-kedja dag 7 med beslut dag 6. Full karaktärsregression ej verifierad.

## V2-03.2I – Edda
- `src/v2-npc.js` läser sparat Mara-beslut från `KB_V2_EVENTS` och kalendern.
- Om karaktären hjälpte Mara och lovade följa med blir Edda-mötet tillgängligt tidigast dag 7 och minst dagen efter löftet.
- Två dialogval: be om anstånd eller vägra godta kvarnens krav.
- Create-only-nyckel: `character.<uuid>.event.edda-meeting-v1`, post `{version:1,ownerId,day,choice}`.
- GitHub PASS; Safari PASS för konfliktgrenen och omladdning.

## V2-03.2J – levande berättelse
- `index.html` innehåller gemensamt `#livingStory` inne i `.scene-body`.
- `src/v2-events-ui.js` och `src/v2-npc-ui.js` visar Mara och Edda som kapitel.
- `src/v2-narrative.css` ger gemensam berättelsestil och mobilanpassade dialogknappar.
- GitHub PASS och Safari PASS för visade kapitel och två olika karaktärers separata händelser.

## V2-03.2K – aktuell scen och historik (test väntar)
- `src/v2-focus.js` är ett läsande presentationslager ovanpå befintliga modeller och UI; `src/v2-focus.css` styr synligheten.
- Prioritet: oavgjort Edda-möte, därefter oavgjord Keldra-händelse, annars den befintliga grundscenen.
- Avgjorda Mara- och Edda-möten visas inte längre under Berättelse; de sammanfattas i Dagbok med beslutsdag, valt svar och resultat.
- Dagboken visar fortfarande `src/v2.js` ordinarie valhistorik.
- Inga nya sparnycklar, inga skrivningar, inga migrationer eller raderingar. UI-lagret läser endast `getState()`.
- V2-03.2K gör ännu inte platsbaserade möten eller fullständig scenmotor. Grundscenen kan fortfarande ha en äldre berättelseknapp för nollställning; tryck inte på den under regressionstest.

## Sparsäkerhet
- V2-prefix: `kronor-och-blod.fantasy.v2.`.
- Karaktär: `character.<uuid>`; berättelse `.story`; kalender `.calendar`; händelse `.event.keldra-seed-v1`; Edda `.event.edda-meeting-v1`.
- Aktiv karaktär: `active-character-id`.
- Äldre Sverige-sparningar migreras eller raderas inte automatiskt.
- Ogiltiga/främmande sparningar ska blockeras, inte tyst nollställas.
- Safari localStorage är enhets- och webbläsarbunden; ingen molnsynk/full export.

## Fortsatt princip
- Återanvänd V2-kontrakt och testade skydd; undvik dubbla motorer.
- Världshändelse, upptäckt och beslut är skilda tidpunkter.
- Uppdatera detta dokument vid tekniska systemändringar i stället för att skapa paketdokument.
