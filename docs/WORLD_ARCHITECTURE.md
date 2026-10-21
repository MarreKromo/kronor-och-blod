# KRONOR & BLOD — WORLD ARCHITECTURE v1.0
**Status: BESLUTAD PRODUKTVISION / ARKITEKTURKRAV, EJ IMPLEMENTERAD MEKANIK**
Beslutad 2026-10-21. Gäller MAP-01 och alla senare världskartor, regioner, orter, politik, arv och rikesbildning. Underordnad `MASTERPLAN_V2.md`; refererad som blockerande kartkrav i `ROADMAP.md` v3.5. Ingen kod eller sparfil ändras av detta dokument.

## A. Världens omfattning och utbyggnad
- Världen är avsedd att bli **mycket stor**, med många regioner, kungariken, självständiga områden, städer, byar, borgar och egendomar.
- Vi utvecklar **en region i taget** för att säkerställa djup och spelbarhet. Dornmark är den **första regionen**, inte fastslaget namn på hela världen eller på ett kungarike.
- Keldra, Dorneth och Varnhold är första platserna. Nya regioner ska kunna läggas till utan omskrivning av tidigare geografiska identiteter eller förstörda sparningar.
- Den geografiska världen finns oberoende av spelarens ambitioner och utvecklas också genom NPC:ers handlingar.

## B. Geografi är inte politik
**Obrytbar modellprincip:** region != kungarike != territorium != bosättning != egendom.
- **Region:** geografisk indelning, relativt stabil.
- **Territorium/landområde:** politiskt kontrollerbar geografisk enhet; exakt skala och underindelning fastställs före mekanikbygge.
- **Rike:** politisk organisation som kan kontrollera delar av en eller flera regioner.
- **Bosättning:** by, stad, borg eller annan plats med beständig identitet.
- **Egendom:** ägda eller brukade tillgångar; ägande betyder inte automatiskt suveränitet.
- **Dynasti/hus, person, titel och ämbete:** separata identiteter och relationer.
- **Legitimitet, anspråk, äganderätt, titel, vasallskap och faktisk kontroll** får inte sammanblandas.
- En region kan rymma flera riken eller fria territorier; ett rike kan omfatta flera regioner. Gränser och härskare kan ändras utan att regioner, vägar och ort-ID:n ändras.

## C. Levande politiskt startläge
- Från spelstart finns **etablerade kungariken eller motsvarande makter, adelshus och härskare**, med relationer, intressen och konkurrens. Exakt namn, antal och territoriell fördelning beslutas i separat världsskapande; hitta inte på kanon utan godkännande.
- Det finns även **gränsmarker, omstridda områden och potentiellt självständiga territorier** som gör nya maktbildningar möjliga.
- Inget krav att varje region har exakt ett kungarike, eller ens ett eget kungarike.
- Härskare och politiska enheter är inte statiska dekorobjekt: allianser, arv, uppror, krig, splittring och diplomati kan påverka kontroll över tid.

## D. Spelarens frihet: egen rikesbildning
- Spelaren ska **kunna** bilda ett eget självständigt rike och senare utvidga det, men detta är **frivilligt**, inte spelets obligatoriska slutmål.
- Möjliga vägar inkluderar markförvärv, lokalt inflytande, följeslagare, allianser, äktenskap/arv, diplomati, uppror och erövring. Detaljer och balans beslutas senare.
- Spelaren behöver **inte** kontrollera en hel region för att grunda ett rike; ett mindre självständigt territorium kan vara startpunkten.
- Riket kan växa, splittras, förlora självständighet eller falla. NPC-aktörer omfattas av motsvarande världsprinciper.
- Familj, barn, succession, anspråk och dynastier ska kunna påverka framtida generationers makt och ägande.
- Spelaren ska också kunna välja ett vanligt liv som bonde, köpman, hantverkare, följeslagare eller annat utan att bli härskare.

## E. Tekniska krav från MAP-01
1. Datadriven hierarki med stabila ID:n för värld/region/territorium/ort, utan att ort-ID byggs av nuvarande härskare eller politisk tillhörighet.
2. Separata geografiska och politiska kartlager. Kartan får initialt visa bara geografiska orter och vägar; politiskt lager behöver inte vara spelbart i MAP-01, men datamodellen får inte blockera det.
3. Spelarens **faktiska position** skiljs från markerad/inspekterad plats. Inspektion kostar ingen tid; resa använder existerande rese-/kalendersystem.
4. Vägar och avstånd ska kunna knyta samman orter över regionsgränser. Kartvyer måste kunna skalas till regioner och senare större världskarta utan hundratals knappar på en enda sida.
5. Dynamisk territoriell kontroll ska i framtiden kunna ändras utan att geografi eller befintliga spar-ID:n behöver migreras.
6. Befintlig Keldra–Dorneth-ekonomi, karaktärsägda sparningar, tid och NPC-system får inte brytas. MAP-01 kräver inte en färdig politisk simulation.
7. Mobilförst: begriplig karta, tillgängliga tryckytor, möjlighet att öppna individuell platsvy och tydlig skillnad mellan Visa plats och Res hit.

## F. Acceptanskriterier och skydd mot oavsiktlig avvikelse
- Testscenario 1: Två politiska riken kan kontrollera olika territorier inom **samma** region.
- Testscenario 2: Ett rike kan kontrollera territorier i **två** regioner.
- Testscenario 3: Ett territorium byter kontroll från en härskare till en annan utan ändrat region-/ort-ID.
- Testscenario 4: En karaktär kan inspektera en ort utan att resa eller förbruka en dag.
- Testscenario 5: Ny region kan läggas till utan att återställa tidigare karaktärsdata.
- Testscenario 6 (framtida mekanik): Ett mindre självständigt territorium kan bilda ett rike utan krav på att äga hela regionen.
- Inför varje MAP-, POLITIK-, DYNASTI- eller KRIG-paket: kontrollera mot dessa principer och skriv i testplanen om något ännu inte implementerats.
- **Ingen tyst avvikelse:** Förslag som ändrar en beslutad princip ska redovisas med konsekvenser, berörda dokument och uttryckligt godkännande från projektägaren före implementation. Inget får tas bort enbart för att första prototypen är liten.

## G. Beslut som återstår (inte fastställd kanon)
- Hela världens namn, antal kontinenter och regioner.
- Namn, antal, historia och politiska gränser för startkungarikena.
- Exakt territoriell detaljnivå, regionstorlek och datakontrakt.
- Hur anspråk, legitimitet, beskattning, vasallskap, grundande och krig balanseras.
- När politiskt kartlager och rikesbildning blir spelbara; roadmapens V2-09 och V2-10 förblir reserverade.

## Spårbarhet
- Grundvision och dynastier: `MASTERPLAN_V2.md`.
- Plan och MAP-01-blockerare: `ROADMAP.md` v3.5.
- Faktisk implementation: `SYSTEMS.md` först när funktionerna finns.
- Tester: `TESTS.md` och `DEVLOG.md` efter genomförd verifiering.
