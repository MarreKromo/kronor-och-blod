# KRONOR & BLOD – V2-01 Världsbibel och ekonomisk grund
Datum: 2026-10-20
Status: DESIGNFÖRSLAG / första sammanhängande världsskelett. Namn, antal och geografi är arbetsmaterial tills projektägaren godkänner dem. Ingen spelkod implementerad.

## 1. Vision och omfattning
En självständig, lågmagisk medeltida fantasyvärld. Världen lever utan spelaren. Politik, resurser och invånarnas vardag hör till samma simulering. Spelaren kan leva som arbetare eller köpman, förvalta en by eller styra ett rike; inget livsspår krävs.

## 2. Politisk värld – kombination av stora och små
Förslag: sex större maktblock samt självständiga furstendömen, gränsmarker, fria handelsstäder och omstridda dalgångar. Maktblocken är inte statiska: tronföljd, skulder, uppror, krig och allianser kan skapa nya riken.

| Arbetsnamn | Geografi | Ekonomisk tyngd | Konfliktkrok |
| --- | --- | --- | --- |
| Valdren | Centrala bördiga slätter | Spannmål, hästar, skatt | Omtvistad tronföljd |
| Nordmark | Skogar och berg i norr | Timmer, järn, pälsar | Självständiga bergsherrar |
| Seldor | Västra kustens hamnar | Salt, fiske, handel | Fria städers privilegier |
| Avarin | Sydliga floddalar | Vin, hantverk, kvarnar | Maktkamp mellan adel och krona |
| Kharven | Östra höglandet | Sten, koppar, boskap | Gränsfästen och legosoldater |
| Merovia | Flodmynningar och handelsvägar | Tullar, spannmålsmarknad | Köpmanhus mot furstar |

Mindre makter: 4–8 furstendömen, 2–4 fria städer och omstridda gränsområden som första kartmål, inte låsta tal. En geografiskt rimlig startregion bör ligga där jordbruk, väg och gränspolitik möts.

## 3. Geografiska regler
Karta byggs kring floder, bergspass, skog, odlingsbar mark, kust och vägnät. Naturen avgör rimliga bosättningar, handelsvägar, flaskhalsar och militära mål. Inga exakta kartkoordinater eller permanenta ort-ID:n fastslås i detta steg.

## 4. Bosättningsmodell
Hierarki: gård/hamlet → by → köping → stad → regionalt centrum. Varje bosättning har stabilt ID, namn, region, överhöghet, befolkning, hushåll, arbetskraft, jordkvalitet, naturresurser, byggnader, lager, produktion, konsumtion, marknad, skattesats, ordning, försörjning, handelsförbindelser och historik. Kontroll av mark och ägande är separata från själva bosättningens identitet.

## 5. Resurser och ekonomisk logik
Första resursfamiljer: livsmedel (spannmål, boskap, fisk), råvaror (trä, sten, järn, koppar, salt), förädlade varor (virke, verktyg, tyg), tjänster och mynt. Alla behöver inte simuleras individuellt från dag ett.

Produktionskedjor: gård → spannmål → kvarn → mjöl → hushåll; skog → timmer → sågverk → byggmaterial; gruva → järn → smedja → verktyg/vapen. Varor produceras av arbete + byggnad + insatsvaror + lokal förutsättning, lagras och förbrukas av hushåll, verkstäder och härar. Underskott ger prispress, missnöje eller utflyttning; överskott kan säljas. Transport har tid, kapacitet, risk och kostnad.

## 6. Samma värld, olika spelroller
- Bonde: arbetar på jord, äger eller arrenderar mark, säljer överskott och påverkas av skatt.
- Hantverkare/köpman: förädlar varor, förhandlar priser, transporterar och riskerar kapital.
- Byfogde/borgmästare: beslutar om lager, vägar, byggnader, marknad och lokal ordning inom mandat.
- Länsherre: förvaltar jord, uppbär skatt, utser fogdar, mobiliserar trupper och förhandlar lojalitet.
- Kung: samordnar kronans inkomster, vasaller, lagar, krig och tronföljd; kan inte trolla fram resurser.

## 7. Town management – principer
Byggnader kräver plats, material, arbetskraft, pengar och byggtid. Beslut ska ha alternativkostnader: murar kontra kvarn, hög skatt kontra lojalitet, rekrytering kontra skörd. Invånare ska ha behov och reaktioner. Förvaltning kan delegeras till NPC:er så att spelet förblir ett RPG, inte ett obligatoriskt kalkylark.

## 8. Politik och dynamik
Titlar, anspråk, vasallband och territoriell kontroll är skilda begrepp. Adelshus har medlemmar, egendom, lojalitet och arvslinjer. Krig stör handel, förstör lager och förflyttar människor. Ett rike kan delas vid arv eller förenas genom giftermål, underkastelse och erövring. Systemet får inte kräva att spelaren är härskare.

## 9. Tid, simuleringsnivå och mobilprestanda
En gemensam världsklocka. Förslag: dagliga händelser lokalt, veckovis handel/produktion, månadsvis skatter och demografiska förändringar; simulering på lämplig detaljnivå för närliggande personer och aggregerad nivå på avstånd. Exakta tickregler beslutas och testas senare. Startår och kalendernamn ej fastställda.

## 10. Första spelbara vertikala kedjan (efter säker teknisk övergång)
En startby, närliggande köping och en lokal länsherre. Spelaren kan arbeta en dag, få lön eller varor, handla, se byns lager förändras och uppleva ett lokalt beslut (t.ex. höjd skatt). Varje förändring ska kunna följas i historik och återläsas utan dataläckage mellan karaktärer.

## 11. Viktiga skyddsregler
Den befintliga Sverige-prototypens fem plats-ID:n, kalender och localStorage tillhör äldre version. V2-01 ändrar endast dokument. Inga gamla ID:n återanvänds för nya platser; ingen migration eller reset. Befintliga Testbonde, JH2-Test, Mk, Sven och Erik lämnas orörda. V2-02 måste definiera separat datarymd och versionssäker övergång före ny spelkod.

## 12. Beslut som återstår
Godkänna eller byta namn på riken, geografi, startregion och grundkonflikt. Fastställa resursgranularitet, priser, äganderätt, skatter, tidsskalor, befolkningsmodell, arv, religionsnivå och mobilgränssnitt. Inga namn i tabellen är ännu kanon.

## 13. Acceptanskriterier för V2-01
En enda aktuell masterplan, en världsbibel som underdokument, resurs- och bosättningsmodell definierad, roadmap uppdaterad, äldre logg bevarad, inga spelkodändringar, GitHub-kontroll efter användarens commit. Safari-test behövs inte för dokumentation.
