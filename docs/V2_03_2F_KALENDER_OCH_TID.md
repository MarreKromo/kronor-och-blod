# V2-03.2F – Kalender och tid

## Återanvändning
Adapterar `src/calendar.js` (KB-03.6.4 / IMP-025): UTC-datum från 1 januari 1250, svenska månadsnamn, årstider, dagräkning, ägarskydd, kontroll av lagrade data och `kb:day-advanced`-händelse.

## Säker lagring
- Varje karaktär använder `KB_V2_DATA_CONTRACT.calendarKey(id)`.
- Postformat: `{version:1, ownerId:<uuid>, elapsedDays:<heltal>}`.
- Saknad kalender betyder dag 1 och skrivs inte automatiskt.
- Ogiltig kalender eller fel ägare blockerar ändringar.
- Äldre nycklar `kronor-och-blod.calendar.v1` och `kronor-och-blod.calendar.owner.v1` läses eller ändras aldrig.
- Ingen automatisk migrering eller radering.
- Vid sparfel lämnas posten för felsökning; ingen tyst återställning.

## Avgränsning
Tiden avancerar endast via uttrycklig knapp och bekräftelse. Berättelseval ändrar ännu inte kalendern; kalendern styr ännu inte NPC:er, resor eller händelser. Kalendern är karaktärsbunden, inte en gemensam världsklocka.

## Safari-acceptans
1. Aktiv karaktär visar 1 januari 1250, dag 1 om kalender saknas.
2. Knappen +1 dag visar bekräftelse och går till 2 januari, dag 2.
3. Datumet överlever omladdning.
4. Byt till karaktär två: egen kalender på dag 1 om den är ny.
5. Avancera karaktär två; byt tillbaka: karaktär ett behåller sitt datum.
6. Berättelse, dagbok, platser och karaktärsbyte fungerar fortsatt.
