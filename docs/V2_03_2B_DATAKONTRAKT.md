# V2-03.2B – Kanoniskt datakontrakt (första kodsteget)

## Syfte
Förbered återintegrering av tidigare spelmotor utan att påverka den spelbara Keldra-prototypen. Detta paket lägger till en **skrivskyddad kontraktsmodul**. Den skapar inte karaktärer, flyttar inga sparningar och laddas inte på startsidan ännu.

## Beroende
`src/v2-data-contract.js` använder den existerande, oförändrade `window.KB_LIFE_BACKGROUND_MODEL` från `src/life-background-model.js`. Vid framtida aktivering ska bakgrundsmodellen laddas före kontraktet.

## Karaktär v2
Fält: `version:2`, `id` (UUID), `name` (2–32 tecken), `placeId:'keldra'`, `background` (valideras av gamla livsbakgrundsmodellen, inklusive `version:1`). Inga andra fält tillåts. Bakgrundsmodellen återanvänds; dess version 1 är inte samma sak som karaktärens version 2.

## Separata lagringsnycklar
Prefix: `kronor-och-blod.fantasy.v2.`. Karaktär: `character.<id>`; berättelse: `character.<id>.story`; kalender: `character.<id>.calendar`; dagbok: `character.<id>.journal`; aktivt ID: `active-character-id`. Kontraktet **definierar** nycklar men skriver inte till dem.

## Säkerhet och gränser
- Gamla nycklar `kronor-och-blod.character.v1` m.fl. rörs inte.
- Nuvarande Keldra-nyckel `kronor-och-blod.fantasy.v2.first-scene.v1` rörs inte.
- Felaktig JSON eller ogiltiga data returnerar fel; inga automatiska återställningar.
- Modulen är inte en färdig karaktärs-/sparmotor. Den innehåller ingen skaparfunktion, ingen migrering och ingen växling av aktiv karaktär.
- Vid framtida skrivsteg krävs separat design för atomisk lagring, ägarverifiering och skydd mot dataförlust.

## Acceptans
1. GitHub innehåller de två nya filerna.
2. `index.html`, `src/v2.js`, `src/v2.css` och äldre moduler lämnas orörda.
3. Ingen Safari-funktion ändras. Safari-test krävs först när kontraktet kopplas in i spelet.

## Nästa steg
V2-03.2C: granskad, säker adapter för skapande/läsning av v2-karaktärer och anslutning till det nya gränssnittet. Implementera först efter GitHub PASS för detta kontrakt.
