# KB-B1 – Position och resor: genomförandeplan
Datum: 2026-10-20
Status: PLAN – ingen ny spelkod i detta dokumentationspaket.

## Spelarflöde på iPhone
Spelaren ser var karaktären befinner sig (första platsen Skara), kan trycka på en annan ort för att läsa om den utan att teleporteras och kan därefter välja 'Res hit' när en färdväg finns. Resan visar tydlig tidskostnad och en bekräftelse före genomförande. Efter resa visar både Hem och Karta den nya faktiska platsen. Omladdning ska behålla platsen.

## Paketets funktioner
1. Läsbar platsstatus: 'Du befinner dig i …' separat från 'Vald plats på kartan'.
2. Första reseförbindelsen mellan två redan registrerade plats-ID:n; verifiera platsernas historiska rimlighet före slutligt val.
3. Tydlig reseknapp med restid, avbryt och bekräfta; inget resande vid vanligt kartklick.
4. Kalendern avancerar genom befintligt gemensamt kalenderflöde; undvik dubbel dagshändelse.
5. Persistens per karaktär, inklusive slotbyte och återläsning; inga andra karaktärers platser får påverkas.
6. Isolerade feltester och Safari-regression av kalender, dagshistorik, livsbakgrund och backup.

## Säkerhetsgrind före kod
- Inventera `src/places.js`, `src/world.js`, `src/calendar.js`, `src/app.js`, `src/character.js`, kart-UI, samtliga slot-/switch-moduler och backupbyggare/validator/restore.
- Bestäm hur position ska lagras med ägar-ID, schema och default för äldre sparningar. Inga nya persistenta nycklar utan att export, återställning, slotbyte och förkontroller kan hantera dem.
- Position får inte härledas ur senast klickad kartmarkör.
- Planera atomär eller återhämtningsbar uppdatering av position och tid. Om gemensam transaktion saknas: begränsa första leveransen till skrivskyddad UI/förhandsvisning tills säkerhet finns.
- Visa inte 'resa genomförd' förrän lagring och återläsning verifierats.

## Acceptanskriterier
- Kartklick ändrar endast vald ort.
- Bekräftad resa ändrar faktisk position och förbrukar exakt avsedd tid en gång.
- Omladdning och byte till annan karaktär och tillbaka behåller rätt position, tid och livsbakgrund.
- Exportfilen innehåller positionen och godkänns av validator; återställd slot kan läsa positionen.
- Avbruten resa, ogiltigt mål, full lagring och oavslutad transaktion lämnar tidigare tillstånd säkert.
- Safari på iPhone visar tydliga plats- och resehandlingar utan överfulla paneler.

## Avgränsning
Inga slumpmöten, hästar, väder, ekonomi, generella NPC:er eller aktiv XP i B1. Dessa tillkommer senare i roadmapen.
