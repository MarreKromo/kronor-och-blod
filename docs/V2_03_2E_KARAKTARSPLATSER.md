# V2-03.2E – Karaktärsplatser och byte

- Högst tre karaktärer på enheten. Befintlig V2-03.2C-karaktär hittas via samma lagringsnyckel, utan migrering.
- Karaktärslistan härleds från verifierade `character.<uuid>`-poster; inga nya indexnycklar behövs.
- Aktiv karaktär byts först efter verifiering, med kontroll av sparning och `kb:v2-character-changed` för att uppdatera berättelsen.
- Berättelseval ligger kvar per karaktär under `character.<id>.story`.
- Inga karaktärer, gamla prototypval eller berättelser raderas. Ingen automatisk migrering.
- Vid ogiltiga poster eller saknad aktiv pekare blockeras ändringar för att skydda data.
- Kalender, NPC:er och dynastier kopplas senare.

## Safari-acceptans
1. Tidigare karaktär och berättelse finns kvar.
2. Skapa en andra karaktär, kontrollera att berättelsen startar från början.
3. Välj ett annat berättelseval för karaktär två.
4. Växla tillbaka: karaktär ett har kvar sina egna val.
5. Växla till karaktär två igen och ladda om: dess val är kvar.
6. Övriga flikar fungerar.
