# KB-02.2 – Geografisk grund för Västergötland omkring 1250

**Status:** ARBETSUTKAST 2026-10-19. Geografisk plan, inte en verifierad rekonstruktion av medeltida vägar eller gränser.

## Syfte
Skapa ett separat geografiskt lager som kan kopplas till platsregistret i KB-02.1 utan att låsa spelet till en viss kartbild.

## Grundregler
1. Kartgrafik, geografiska ankarpunkter och världssimulering är separata.
2. Varje plats behåller sitt `place_id` från KB-02.1.
3. Geografiska ankarpunkter får framtida latitud/longitud och versionsmärkta spelkartkoordinater; de två är inte samma sak.
4. Inga medeltida vägsträckningar, riksgränser eller stadsplaner får ritas som historiskt säkra utan särskilda belägg.
5. 1600-talskartan O37 är referens, inte en direkt avbildning av år 1250.

## Fem ankarpunkter (arbetslista)
| place_id | Namn | Ankare att undersöka | Geografisk roll i spelet | Säkerhet för exakta 1250-detaljer |
|---|---|---|---|---|
| VG-SKARA-001 | Skara | Historiska stadskärnan | Kyrkligt och regionalt centrum | Ej fastställd |
| VG-LODOSE-002 | Lödöse | Gamla Lödöses stadsområde vid Göta älv | Handel och vattenburen transport | Ej fastställd |
| VG-VARNHEM-003 | Varnhem | Klosterområdet | Kloster och jordbrukslandskap | Ej fastställd |
| VG-GUDHEM-004 | Gudhem | Klosterområdet | Kloster och lokal ekonomi | Ej fastställd |
| VG-HUSABY-005 | Husaby | Kyrkplatsen | Kyrklig och äldre kunglig tradition | Ej fastställd |

## Naturgeografiska lager – för kartskissen
- **Vänern:** storskaligt geografiskt ankare i norr.
- **Göta älv:** viktigt vattenstråk för Lödöses geografiska läge. Farbarhet, färdvägar och kontrollpunkter kring 1250 kräver egen källgranskning.
- **Västgötaslätten och platåbergen:** landskapskaraktär som hjälper till att skilja jordbruksbygd och höjdpartier; exakta medeltida markslag är inte fastställda.
- **Skog och våtmark:** visas inledningsvis schematiskt, inte som rekonstruerad vegetation år 1250.

## Lagerstruktur för framtida kod
- `map_art/`: egenproducerad visuell karta; kan bytas ut.
- `places/`: stabila plats-ID:n, källstatus och geografiska ankarpunkter.
- `routes/`: hypoteser om förbindelser; märk `confirmed`, `inferred` eller `fictional` först efter källgranskning.
- `world/`: NPC:er, uppdrag, ägande, handel och sparfiler; refererar till plats-ID.

## Planerade kontroller före kartproduktion
1. Verifiera geografiska ankarpunkter och koordinater mot moderna öppna kartdata.
2. Kontrollera vilka vattenleder, färdvägar och övergångar som kan beläggas omkring 1250.
3. Undersök samtida politiska förhållanden och undvik moderna administrativa gränser.
4. Dokumentera källa, datum och säkerhetsgrad per påstående.
5. Ta fram en första egenproducerad skiss och testa att alla fem platserna kan klickas på i Safari.

## Källor för fortsatt arbete
- Lantmäteriet, Historiska kartor: https://www.lantmateriet.se/sv/kartor/vara-karttjanster/Historiska-kartor/
- Lantmäteriet, Lantmäteristyrelsens arkiv: https://www.lantmateriet.se/sv/kartor/vara-karttjanster/Historiska-kartor/Arkiven-som-ingar/Lantmateristyrelsens-arkiv---LMS/
- Lantmäteriet, Villkor och avgifter: https://www.lantmateriet.se/sv/geodata/vara-produkter/Villkor-och-avgifter/
- Projektets platsunderlag: `docs/KB-02_01_HISTORISKA_PLATSER.md`

## Acceptanstest
- [x] Fem plats-ID:n återanvänds oförändrade.
- [x] Kartbild och platsdata separeras i arkitekturplanen.
- [x] Osäkerhet kring år 1250 redovisas.
- [x] Researchuppgifter inför första spelkartan dokumenteras.
- [ ] Exakta ankarpunkter och historiska färdvägar verifierade (senare paket).
- [ ] Klickbar kartprototyp byggd (senare paket).
