# KRONOR & BLOD – SYSTEMS
**Status:** V2-03.2L förberett för GitHub- och Safari-test 2026-10-21.

## Befintlig V2-grund
- `src/v2-data-contract.js`: UUID, Keldra och separata karaktärsnycklar.
- `src/v2-character.js`: tre karaktärsplatser.
- `src/v2-story-binding.js` och `src/v2.js`: berättelse, dagbok och platser.
- `src/v2-calendar.js` och `src/v2-calendar-ui.js`: karaktärsbunden kalender.
- `src/v2-events.js` och `src/v2-npc.js`: Mara och Edda med val och ägarbundna create-only-beslut.
- `src/v2-focus.js`: aktuell händelse i berättelsen, avgjorda händelser i dagboken. V2-03.2K GitHub/Safari PASS.

## V2-03.2L – frågesteg i NPC-samtal (test väntar)
- `src/v2-events-ui.js` och `src/v2-npc-ui.js` visar två möjliga frågor innan befintliga beslutsknappar.
- Ett svar visas direkt efter frågan; spelaren kan ställa en annan fråga eller välja det tidigare befintliga beslutet.
- Frågor är tillfälliga presentationsval, inte sparade beslut, XP, NPC-minnen eller verkliga ekonomiska effekter. Omladdning kan återställa frågesteget.
- Beslut går fortfarande endast genom `KB_V2_EVENTS.decide()` respektive `KB_V2_NPC.decide()` med befintlig validering och lagring.
- `index.html` versionsmärker båda UI-skripten `?v=2032l` för Safari-cache.
- Inga nya lagringsnycklar, migrationer eller automatiska återställningar.

## Planerade kärnsystem, INTE implementerade
- Livsbakgrund: `src/life-background-model.js` är läsande valideringsmodell; aktiv effekt på kontakter, resurser och färdigheter saknas.
- Färdigheter: jordbruk, hantverk, handel, kunskap, socialt, överlevnad, ridning och strid; XP/nivåer och tid måste designas och testas.
- Ekonomi, arbete, resor, följeslagare, egna grupper, familjer, dynastier, politik och krig kvarstår som mål enligt masterplan v3.0 och roadmap v3.0.

## Sparsäkerhet
V2-prefix `kronor-och-blod.fantasy.v2.`. Äldre Sverige-sparningar raderas eller migreras inte automatiskt. Ogiltiga poster ska ge säkert stopp. Safari localStorage är lokal; full V2-backup/export återstår.
