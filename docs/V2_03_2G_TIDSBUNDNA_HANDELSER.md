# V2-03.2G – Tidens konsekvenser

## Återanvändning
Granskat `src/story.js`, `src/encounter.js` och `src/investigation.js`. Återanvänder principerna för valstyrda grenar, NPC-reaktioner och kontroll av karaktärsägare. Sverige-era manus och gamla nycklar laddas inte.

## Implementerat
- En ny **läsande adapter** `KB_V2_EVENTS` ovanpå befintlig `KB_V2_STORY_BINDING` och `KB_V2_CALENDAR`.
- Dag 1–2: ingen tidsstyrd händelse.
- Från dag 3: olika följder av Keldra-valet (hjälpa Mara, kvarnen, skatter, lämna).
- Händelsen visas endast på fliken Berättelse, under berättelsens val.
- Reagerar på `kb:day-advanced`, `kb:v2-character-changed` och berättelseval.
- Inga nya lagringsnycklar eller skrivningar. Händelsen beräknas från redan sparade val och datum, även efter omladdning.
- Världshändelsen är en första demonstration, inte ett autonomt simuleringssystem. Den ger ännu inga nya val eller resurser.

## Säkerhet
- Avbryt visning om berättelse och kalender inte verifieras eller har olika ägare.
- Ändra inte `src/v2.js`, `src/v2-calendar.js`, `src/v2-story-binding.js`, gamla sparningar eller karaktärsdata.
- Inga automatiska migreringar, nollställningar eller raderingar.

## Safari-acceptans
1. Berättelsen fungerar som förut och ingen händelse visas dag 1–2.
2. Efter dag 3 visas en följd som stämmer med karaktärens tidigare val.
3. Händelsen ligger i Berättelse, inte i Dagbok, Platser eller Karaktär.
4. Efter omladdning visas samma följd.
5. Byte till annan karaktär visar endast den karaktärens följd, eller ingen före dag 3.
6. Kalenderknapp, berättelseval och tidigare sparningar fungerar fortsatt.
