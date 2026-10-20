# IMP-025 3H.12.7 J-E — säkerhetsinventering
Status: säkerhetsinventering, INGEN produktionsaktivering.

## Verifierade skapandevägar i källkod
- `src/slot-creator.js`: `KB_SLOT_CREATOR.createSlot(name, background)` skapar separat slot utan livsbakgrund.
- `src/character.js`: `KB_CHARACTER.create(name, background)` kan skriva aktiv karaktär utan livsbakgrund.
- `src/slot-creator-ui.js`: äldre formulär använder `KB_SLOT_CREATOR`.
- `src/character-create-experience-ui.js`: flyttar äldre formulär; spärrar inte skapandet.
- `src/new-character-create-integration-ui.js`: endast förhandsvisning.
- `src/new-character-bundle.js`: komplett nytt paket, utan skrivning.
- `src/new-character-writer.js`: separat sparmotor, ännu inte produktionskopplad.

## Innan aktivering
1. Byt alla användarsynliga skapandevägar till det nya obligatoriska flödet.
2. Spärra äldre skapande-API:er mot nya karaktärer utan livsbakgrund (inte bara gömma knappar).
3. Bevara äldre karaktärer och deras sparningar oförändrade.
4. Testa nya sparplatser med preflight och riktig återläsning.
5. Testa att karaktärsbyte och omstart bevarar livsbakgrund.
6. Kräv uttrycklig bekräftelse före verklig sparning.

## Datahantering
Detta paket innehåller en separat testsida och dokumentation. Det ändrar inte index.html eller src/*.js. Testet läser systemets API:er; observera att laddning av äldre `character.js` kan utföra dess befintliga backup/identitetsinitiering i den webbläsare där testsidan öppnas. För maximal isolering, kör testet i privat Safari. Ingen befintlig sparning ska raderas eller skrivas över.
