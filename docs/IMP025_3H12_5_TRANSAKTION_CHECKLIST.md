# IMP-025 · 3H.12.5 — Säker integrationskontroll

Status: FÖRBEREDELSE / KODGRANSKNING. Ingen implementation eller Safari PASS.

## Granskade GitHub-filer
- `src/character-slots.js` — SAVE_KEYS och snapshot saknar `life-background`.
- `src/character-switch.js` — KEYS, apply, equals och journalens before-bild saknar `life-background`.
- `src/switch-recovery.js` — laddas först; KEYS och journalvalidering saknar `life-background`.
- `src/slot-restore-preflight.js` och `src/slot-switch-preflight.js` — uppdaterade i 3H.12.4.
- `src/life-background-model.js` — valideringsmodell från 3H.12.3, ännu inte laddad i `index.html`.

## Säker integrationsordning (ett samordnat kodpaket)
1. Ladda `src/life-background-model.js` före förhandskontrollerna i `index.html`.
2. Utöka `src/character-slots.js` med båda bakgrundsnycklarna. Saknat par är giltigt för äldre karaktärer. Halvt par, fel ägare, ogiltig JSON/version och annan `backgroundRaw` avvisas.
3. Utöka `src/character-switch.js` med samma två nycklar i KEYS, journalens before-bild, apply, equals och restore.
4. Utöka `src/switch-recovery.js` med samma två nycklar och motsvarande ägar-/innehållsvalidering. Återstartsskyddet måste stödja nya journaler innan bytesmotorn börjar skapa dem.
5. Behåll format `slot.v1` och journalversion 1 bara om gamla sparplatser och journaler fortfarande kan verifieras; annars versionsbeslut före kodändring.
6. Uppdatera skriptens cacheversioner i `index.html` så att Safari inte blandar gammal och ny kod.

## Måste testas före leverans
- Äldre karaktärer utan livsbakgrund kan bytas A → B → A.
- Nytt korrekt bakgrundspar följer med vid A → B → A.
- Fel ägare, saknad halva, okänd version, ogiltig JSON och felaktig raw-match ger FAIL utan skrivning.
- Simulerat skrivfel under byte återställer aktiva nycklar, föregående slot och journal.
- Simulerad avbruten omladdning återställs av `switch-recovery.js`.
- Inga bakgrundsdata skapas automatiskt, ingen demokaraktär raderas.

## Stoppregel
Installera inte enbart bytesmotor utan matchande återstartsskydd. Detta dokument är en granskning, inte ett färdigt 3H.12.5-kodpaket.
