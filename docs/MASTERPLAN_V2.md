# KRONOR & BLOD — MASTERPLAN v2.0
**Status:** OFFICIELL SPELVISION, beslutad 2026-10-20. **Fas:** koncept, inte implementerad spelvärld.

## En mening
Ett generationsbaserat, mörkt och huvudsakligen realistiskt fantasy-RPG där spelaren börjar som en vanlig invånare i en levande värld och genom relationer, arbete, makt, krig och arv kan skapa en dynasti — eller förlora allt.

## Beslutad identitet
- **Egen påhittad värld** i stället för historiska Sverige/Västergötland 1250.
- **Mörk, lågmäld fantasy** med trovärdiga mänskliga konflikter. Magi är inte ett normalt spelsystem. Sägner, tro och tvetydiga mysterier kan finnas; faktisk övernaturlighet beslutas separat.
- **Kombinerad politisk karta:** flera etablerade större kungadömen, mindre furstendömen, fria städer, omstridda områden och möjlighet till splittring, förening och imperiebyggande.
- **Spelaren är inte utvald.** Världen förändras även utan spelaren. Ingen garanterad väg till kungamakten.
- **Liv och generationer:** yrken, relationer, giftermål, barn, död, arv och fortsatt spel som efterträdare är långsiktiga kärnmål, ännu inte byggda.
- **Vägen till makt:** bonde, köpman, fredlös, soldat, riddare, vasall, länsherre och kung är möjliga livsvägar, inte låsta startklasser.
- **Kronor & Blod** är arbetsnamn tills namnfrågan avgörs.

## Spelupplevelse och systemsamband
1. Spelaren skapar en människa med ursprung, familj, hemort och social situation.
2. En gemensam världstid styr åldrande, resor, arbete, konflikter och NPC-händelser.
3. Varje NPC har en egen identitet och tillstånd; relationer, mål och konsekvenser byggs stegvis.
4. Bebyggelser tillhör politiska enheter. Adelshus och härskare kan äga titlar och mark; ägande och lojalitet kan ändras.
5. Handlingar skapar rykte, resurser, allianser, rivaler och risker.
6. Dynastier, arv och krig byggs **efter** att person-, tid- och positionsmodeller är stabila.

## Världsstruktur — princip, inte fastslagen lore
- Kartan får flera stora riken samt mindre självständiga och beroende områden.
- Inga definitiva namn, antal riken, religioner, språk, huvudstäder, datum eller kartgränser har ännu beslutats.
- Ingen färdig simulering av kungadömen, adelshus, krig eller generationer finns i nuvarande prototyp.
- Nästa designsteg: världens geografi, politiska nivåer, startregion, grundkonflikt och världstid — i ett sammanhängande världsbibel-dokument, inte i parallella planer.

## Teknisk verklighet och säker övergång
- Befintlig kod, kart-ID:n och lokalStorage-data kommer från **Sverige-prototypen**. De är inte redan omvandlade till fantasyvärlden.
- Ändra inte historiska plats-ID:n eller befintlig `character.placeId` i en dokumentationsuppdatering.
- Ingen automatisk migration, reset, ändring av backupformat, karaktärsbyte eller lagring utan separat design, test och uttryckligt godkännande.
- Testbonde, JH2-Test, Mk, Sven och Erik samt deras sparningar ska skyddas.
- Tidigare B1.1 och B1.2 är skrivskyddade tekniska prototyper. B1.3 är pausad; ingen verklig resa är godkänd.
- Äldre dokument bevaras som historik; se `docs/LEGACY_INDEX.md`. **Detta dokument styr visionen**; `docs/ROADMAP.md` styr nästa utvecklingsarbete.

## Öppna designbeslut
- Namn och form på världskartan, världens kalender/epok, antalet riken, trosföreställningar, samhällsklasser och startregion.
- Simuleringsdjup för NPC:er och ekonomi, tronföljdsregler, krigsmodell, mobilgränssnitt och hur gammal testdata migreras eller hålls separat.
- Dessa frågor ska beslutas innan implementering; undvik påhittad lore som sedan måste tas bort.

## Acceptans för övergångspaketet
Endast dokumentation uppdateras. Ingen spelkod, localStorage, spelardata eller teststatus ändras. Efter commit verifieras filerna på GitHub. Safari-test krävs inte för dokumentationspaketet.
