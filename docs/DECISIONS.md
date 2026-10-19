# Beslutslogg

| ID | Beslut | Status |
|---|---|---|
| D-001 | Spelnamn: SVERIGE: Kronor & Blod (arbetsnamn) | Beslutat |
| D-002 | Historisk startpunkt år 1250, Västergötland | Beslutat |
| D-003 | Prototyp A: interaktiv karta; C möjlig framtida expansion | Beslutat |
| D-004 | Historisk realism som grund, spelaren kan förändra historien | Beslutat |
| D-005 | Kort introduktion, därefter fri spelstil | Beslutat |
| D-006 | iPhone/Safari är primär testmiljö | Beslutat |
| D-007 | En branch/ett arbetspaket, commit och PASS/FAIL | Beslutat |
| D-008 | 1600-talskartan används som historisk referens, inte som färdig spelkarta eller bevis för förhållanden år 1250 | Beslutat |
| D-009 | En egen spelkarta för Västergötland omkring år 1250 tas fram utifrån källgranskade uppgifter | Beslutat |
| D-010 | Kartgrafik, platsdata (stabila plats-ID:n och koordinater) och spelvärld (NPC:er, uppdrag, sparfiler) lagras separat | Beslutat |
| D-011 | Kartgrafiken ska kunna bytas utan att spelvärldens data går förlorade; platspositioner kan behöva justeras | Beslutat |
| D-012 | Rättigheter och källhänvisning för referenskartan kontrolleras innan själva kartbilden publiceras i spelet | Beslutat |
| D-013 | Resor tar speltid och kan ge dynamiska händelser oavsett färdsätt; häst, vagn och följe påverkar kostnad, tempo och möjligheter | Beslutat för framtida design |
| D-014 | Spelarens livsväg formas av val, relationer och resurser, inte låsta startklasser | Beslutat för framtida design |
| D-015 | Följeslagare är självständiga NPC:er med personlighet, utveckling och vilja; väpnare, rövarband och andra grupper ska kunna växa fram | Beslutat för framtida design |
| D-016 | Gårdar, borgar, följen och arméer kräver resurser, löpande kostnader och aktiv förvaltning | Beslutat för framtida design |
| D-017 | Makt, titlar och riddarslag kräver historiskt rimliga villkor och konsekvenser, inte enbart knapptryckning eller pengar | Beslutat för framtida design |

## Kartprincip – 2026-10-19

- **Referenslager:** 1600-talskartan från Lantmäteriet används för orientering och forskning, inte som exakt rekonstruktion av år 1250.
- **Spelkarta:** egenproducerad grafik, med historiska orter och gränser markerade efter källkontroll och osäkerhet.
- **Platsdata:** varje plats får ett beständigt ID, namn, geografisk anknytning och kartkoordinater som kan ändras utan att dess ID ändras.
- **Världsdata:** NPC:er, relationer, handel, uppdrag och sparfiler hänvisar till plats-ID:n, inte till pixlar i kartbilden.
- **Utbyte:** ny kartbild kan läggas in och koordinater kan mappas om; spelvärlden bevaras.
- **Rättigheter:** publicera inte originalbilden förrän dess digitala källa och eventuella villkor har dokumenterats.

## Designbeslut – livsvägar och levande resor, 2026-10-19

- Resor är spelbara händelseförlopp, inte omedelbar förflyttning mellan markörer.
- Resor till fots är ekonomiskt tillgängliga; köp av häst eller hyra av vagn ger alternativa fördelar, inte automatisk immunitet mot händelser.
- Resesällskap kan växa till ett personligt följe, med relationer och händelser längs vägen.
- Väpnare och andra lärlingar är individuella NPC:er; ålder, vilja, förutsättningar och historisk kontext avgör om rekrytering och framtida befordran är möjliga.
- Rövarband, gårdar, borgar och arméer delar grundsystem för NPC:er, ekonomi, resurser och tid, men ger olika spelupplevelser.
- Större förvaltning ska ske genom begripliga spelarval i mobilgränssnittet.
- Historisk rimlighet granskas före detaljerad implementation. Dessa beslut är **framtida mål**, inte färdiga funktioner.
