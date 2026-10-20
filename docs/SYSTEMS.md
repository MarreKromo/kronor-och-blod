# KRONOR & BLOD – SYSTEMS

Status: teknisk översikt, 2026-10-20. V2-03.2J väntar på GitHub- och Safari-test.

## Arkitektur
- `index.html` laddar V2-moduler för karaktär, berättelse, kalender och händelser.
- `src/v2-data-contract.js` definierar V2-karaktär och nycklar. Varje karaktär har UUID och startplats Keldra.
- `src/v2-character.js` hanterar upp till tre karaktärsplatser och aktiv karaktär.
- `src/v2-story-binding.js` lagrar berättelsescen och valhistorik per karaktär.
- `src/v2.js` visar Regn över Keldra samt Dagbok och Platser.
- `src/v2-calendar.js` räknar dagar från 1 januari 1250 med separat kalender per karaktär; `src/v2-calendar-ui.js` visar Fortsätt dagen.
- `src/v2-events.js` och `src/v2-npc.js` är separata, befintliga händelsemodeller som används utan ändringar i V2-03.2J.

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
- GitHub PASS; Safari PASS för konfliktgrenen och omladdning. Full karaktärsregression återstår.

## V2-03.2J – levande berättelse (test väntar)
- `index.html` innehåller en gemensam `#livingStory` inne i `.scene-body`, efter ordinarie berättelseval.
- `src/v2-events-ui.js` och `src/v2-npc-ui.js` visar Mara och Edda som sammanhängande kapitel i `#livingStoryChapters` i stället för separata kort efter berättelseytan.
- `src/v2-narrative.css` ger en gemensam berättelsestil, tydliga repliker och mobilanpassade dialogknappar.
- Modeller, sparnycklar, beslut, tidströsklar och karaktärsägarskap är oförändrade. Varken migration eller automatisk radering sker.
- Denna version förbättrar presentationen; riktig platsbaserad NPC-dialog och rörelse byggs senare.

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
