# KB-03.6 – Implementation, steg 1

## Filer
- `src/investigation.js`: ny fristående modul.
- Aktivering i `index.html` sker i ett separat steg efter GitHub-verifiering.

## Beteende
Läser befintlig Ragnhild-sparning utan att ändra den. Ger tre olika berättelsevägar beroende på `trust`, `bargain` eller `guard`. Varje väg erbjuder två konkreta val. Spelarens beslut sparas under `kronor-och-blod.investigation.v1`, med ledtrådar och flaggor. Sparat beslut visas efter omladdning.

## Säkerhet och begränsningar
- Befintliga sparnycklar ändras inte.
- Ingen ändring av kalender eller karta.
- Prototypen matchar fortfarande karaktär på namn och bakgrund. Detta är en känd begränsning.
- Alla historiska intrighändelser och personer i denna modul är fiktiva.
- Ingen fullständig ekonomi, resa eller uppdragsmotor är implementerad ännu. Flagga och ledtråd är sparade speldata, inte genomförda uppdrag.

## Test efter aktivering
1. Ragnhilds tidigare val ger rätt väg.
2. Välj en handling och se unik konsekvens samt ledtrådar.
3. Ladda om och kontrollera att resultatet består.
4. Testa kalender, fem kartmarkörer och karaktärsprofil.
5. Testa en ny karaktär med annat namn.

## Status
Ej Safari-testat. Steg 1 inväntar GitHub-uppladdning och verifiering.
