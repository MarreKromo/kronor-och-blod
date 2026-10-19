# KB-03.4 – Ett namn ingen känner
Datum: 2026-10-19

## Syfte
Första spelbara berättelsescenen, anpassad efter spelarens bakgrund. Tre val ger olika fortsättningar och ett bestående flaggvärde i lokal sparning.

## Teknik
- `src/story.js` är en separat modul.
- Kräver `src/character.js`, `src/character-ui.js` och `src/character-profile.js`.
- Lagringsnyckel: `kronor-och-blod.story.v1`.
- Valet kopplas i prototypen till karaktärens namn och bakgrund; framtida version bör använda ett stabilt unikt karaktärs-ID.
- Inga förändringar av kalender eller karta.

## Viktiga reservationer
- Händelsen och silverringen är fiktiva, inte belagd historia.
- Scenen är en spelprototyp, inte ett färdigskrivet uppdragssystem.
- Valen ger än så länge olika text och sparade flaggor, men inga NPC-effekter eller världsändringar.
- Testkaraktärer är tillfälliga. En ny karaktär med exakt samma namn och bakgrund kan återanvända gammalt berättelseval; detta ska åtgärdas före riktiga sparfiler.

## Testplan
1. Skapa/öppna karaktär: scenen syns med rätt bakgrundstext.
2. Tryck ett av tre val: rätt fortsättning visas.
3. Ladda om Safari: samma fortsättning visas.
4. Karta, kalender och profil fungerar fortfarande.
5. Skapa ny karaktär med annat namn: första scenen visas igen.
