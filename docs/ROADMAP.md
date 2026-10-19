# Roadmap – SVERIGE: Kronor & Blod
Uppdaterad: 2026-10-20
Statusen nedan avser dokumenterade delpaket; fullständiga system är inte färdigutvecklade.

## KB-00 – Speldesign
- [x] GDD v1.0 framtagen.

## KB-01 – Projektgrund
- [x] Repo, README, dokumentstruktur och GitHub Pages-grund etablerade.
- [x] GitHub-verifiering genomförd.

## KB-02 – Historiskt kartunderlag och prototyp
- [x] Fem platser och plats-ID:n dokumenterade.
- [x] Geografiska grundprinciper dokumenterade.
- [x] Klickbar schematisk kartprototyp.
- [x] Platsregister, prototypvärden och kartpanel.
- [x] Spelkalender och lokal kalendersparning.
- [ ] Fördjupad historisk källgranskning, geografiska koordinater och färdvägar.
- [ ] Stor visuell kartomarbetning enligt IMP-006–008; kräver egen kravspecifikation.

## KB-03 – Karaktär och berättelse
- [x] KB-03.1 karaktärsmodell.
- [x] KB-03.2 karaktärsskapare och lokal sparning.
- [x] KB-03.3 karaktärsprofil utan dubbel vy.
- [x] KB-03.4 första berättelsescenen med tre val.
- [x] KB-03.5 Ragnhild, relationsvärde och sparade svar.
- [x] KB-03.6 undersökning med förgrenade ledtrådar, PASS inom testad omfattning.
- [ ] KB-03.6.1 förbättra berättelseflöde och konsekvenser, testa relation −1.
- [x] KB-03.6.2 steg 1: endast aktiv berättelsescen visas; GitHub PASS, Safari-bilder visar korrekt scen. Fullständiga regressionstester återstår.
- [x] KB-03.6.2 steg 2: dagbok med berättelseval, ledtrådar och relationer, GitHub och Safari PASS inom testad omfattning.
- [x] KB-03.6.2 steg 3: mobilnavigation med flikarna Berättelse, Karta, Karaktär, Dagbok; GitHub och Safari PASS.
- [x] KB-03.6.3 steg 1: Hem – Mitt liv, datum, nästa dag, lokal dagshistorik; GitHub och användarrapporterat Safari PASS.
- [x] KB-03.6.3 steg 2: båda kalenderknapparna kopplade till gemensam dagshändelse, GitHub PASS; Safari-skärmbilder visar dag 22 och dagshistorik.
- [ ] KB-03.6.3 kompletterande regressionstest: båda knapparnas loggning och sparning efter omladdning, separat bekräftelse.
- [ ] **IMP-025 – utökat karaktärsskapande:** fem designsteg (identitet, uppväxt, familj, förflutet, ambition) och frivillig biografi; konsekvenser för startkunskaper, kontakter, resurser och berättelse utan låsta livsvägar. En vanlig uppväxt ska vara lika spelbar som ett dramatiskt förflutet.
- [ ] **IMP-025 – säker implementation:** planera stabilt karaktärs-ID och migration före nya sparfält; skapa stegvis mobilformulär och förhandsvisning, testa ny/gammal karaktär, omladdning och Ragnhilds introduktion. Levande familje-NPC:er är framtida system, inte del av första paketet.
- [ ] **IMP-024 – berättelsegenomgång före KB-03.6.4:** Ragnhilds mysterium blir ett stort frivilligt introduktionsuppdrag, inte hela huvudberättelsen. Först design av motiv, dramatik, förgreningar, konsekvenser och bryggan till huvudberättelsen; därefter implementation och tester.
- [ ] KB-03.6.4 första riktiga dagshändelser: begränsad händelsepool, sparade beslut, inga oavsiktliga upprepningar; kravspecifikation och test först.
- [ ] IMP-023 kompakt dagshistorik: korta vanliga dagar, tydliga viktiga händelser, bevarad historik.
- [ ] Stabilt unikt karaktärs-ID, sparfiler och migration.
- [ ] Framtida åldrande, porträtt, utrustning och alternativa historiskt anpassade livsvägar.

### IMP-025 – Delpaket och godkännandegater (PLANERAT)
- [x] Dokumentera valbara uppväxter, familjesituation, förflutet och ambition (design, inte kod).
- [x] Föreslå startkunskaper och kontakter: jordbruk, hantverk, skriftkunskap, umgängesvana; värde 2 som preliminär balans.
- [x] Dokumentera migrationskrav och regressionstestfall för befintliga karaktärer.
- [ ] Inventera samtliga sparnycklar och besluta om stabilt `characterId` samt säker backup/återställning.
- [ ] Implementera och testa en säker minimal migration utan att radera äldre sparningar.
- [ ] Implementera nya bakgrundsfält och mobilanpassad förhandsvisning i separat litet paket.
- [ ] Testa Ragnhilds olika ingångar, möjlighet att avstå och bestående konsekvenser enligt IMP-024.
- [ ] Bygg riktiga familje-NPC:er först när NPC-identitet och världssystem stöder det.

## KB-DOC-01 – Dokumentationsstädning (AVSLUTAD)
- [x] Inventering av docs: ursprungligen 34 poster, varav 33 dokument.
- [x] Slå ihop TESTS.md, DAILY_LOG.md, ROADMAP.md och ARBETSMETOD.md.
- [x] GitHub-verifiera sammanslagna huvuddokument.
- [x] Granska och arkivera tio äldre `*_TILLAGG.md` i `docs/archive/`.
- [x] Kontrollera att arkivkopiorna överensstämmer med originalen innan originalen tas bort.
- [x] Kontrollera att inga `*_TILLAGG.md` återstår direkt i `docs/`.
- [x] Dokumentera regel: uppdatera befintliga huvuddokument i stället för att skapa tillägg.
- Paketdokument som innehåller unik planering, beslut eller testunderlag bevaras tills separat granskning beslutas.

## KB-04 – Världens grundsystem (FRAMTID)
### KB-04.1 – Position, resor och uppdragsvillkor
- [ ] Varje karaktär har en faktisk, sparad position (start Skara).
- [ ] Klick på en ort visar information; det innebär **inte** att spelaren har rest dit.
- [ ] Spelaren väljer en resa, färdas längs tillåtna förbindelser och förbrukar speltid.
- [ ] Resor kan ge händelser, möten och vägval.
- [ ] Uppdrag och berättelsescener kan kräva att spelaren faktiskt befinner sig på rätt plats, exempelvis Varnhem.
- [ ] Säker plan för sparfiler och migrering innan position kopplas till befintliga karaktärer.

### KB-04.2 – Fog of war och kartkunskap
- [ ] Tre kunskapsnivåer per plats/område: **okänd**, **känd genom karta eller rykte**, **själv utforskad**.
- [ ] Okända platser döljs eller framstår som osäkra; köp av karta kan avslöja orter, vägar och ungefärliga avstånd.
- [ ] Rykten, samtal och vägvisare kan avslöja information utan kartköp; kartor är aldrig ett obligatoriskt köp för att kunna fortsätta.
- [ ] Egna besök avslöjar fler detaljer, personer, möjligheter och uppdrag.
- [ ] Kartor från år 1250 behöver inte vara exakta eller fullständiga. Historisk trovärdighet ska granskas separat.
- [ ] Kartkunskap sparas för karaktären och finns kvar efter omladdning.
- [ ] Designa utforskning, resor och kartans gränssnitt tillsammans; lägg inte bara en visuell dimma över dagens schematiska karta.
- [ ] Testa både ny karaktär, kartköp, ryktesupptäckt, egen upptäckt, resa och sparning på iPhone.

### KB-04.3 – Färdsätt och levande resehändelser
- [ ] Resor förbrukar speltid; längd beror på avstånd, väg, årstid, väder, färdsätt och eventuella hinder.
- [ ] Till fots: låg direkt kostnad, men behov av mat, vila och övernattning; fler möjligheter till möten och upptäckter.
- [ ] Häst: kräver köp eller tillgång, foder och skötsel; ofta snabbare men inte riskfri.
- [ ] Hyrd vagn, kärra eller följe: kostar pengar, kan bära varor och medresenärer; hastighet och trygghet varierar.
- [ ] Dynamiska resehändelser kan ske oavsett färdsätt: väder, trasig utrustning, hjälpbehövande, rykten, handel, överfall, vägval och sociala möten.
- [ ] Händelser ger meningsfulla val med följder för tid, resurser, relationer, rykte och uppdrag; inte bara slumpmässiga strider.
- [ ] Resor till fots får inte bli ett orimligt straff för fattiga spelare; dyrare färdsätt ska ge andra fördelar, inte vara obligatoriska.
- [ ] Händelser och resor ska kunna påverkas av följeslagare och spelarens livsväg.

## KB-05 – Livsvägar, följeslagare och egendom (FRAMTID)
**Designprincip:** Livsvägar växer fram genom handlingar, relationer, resurser och historiskt rimliga möjligheter, inte låsta startklasser. Flera vägar ska kunna kombineras eller förändras över tid.

### KB-05.1 – Följeslagare och egna grupper
- [ ] Rekrytera namngivna NPC:er som själva kan tacka ja eller nej utifrån ålder, situation, relation, lojalitet och intressen.
- [ ] Varje följeslagare har färdigheter, personlighet, behov, mål, relationer och möjlighet att utvecklas, misslyckas, lämna eller svika.
- [ ] Interagera med följeslagare under resor och i vardagen; de ska vara personer, inte enbart bonusvärden.
- [ ] En riddare kan anta en historiskt rimligt lämpad **väpnare**, träna och bedöma honom samt, när villkoren är uppfyllda, välja att stödja eller avstå från hans riddarslag. Riddarskap är inte en automatisk knappbelöning.
- [ ] Rekrytering är inte fri kontroll över valfri NPC: samtycke, ålder, sociala förhållanden och historisk trovärdighet sätter gränser.
- [ ] En laglös spelare kan bygga ett rövarband med individuella medlemmar, lojalitet, delat byte, risker och interna konflikter.
- [ ] Gruppstorlek och förmåga begränsas av ekonomi, försörjning, anseende och ledarskap.

### KB-05.2 – Gård, verksamheter och försörjning
- [ ] Förvärva eller få tillgång till mark genom historiskt rimliga former; rättigheter och skyldigheter skiljer sig mellan livsvägar.
- [ ] Förvalta gård med byggnader, djur, åkrar, utsäde, skörd, arbetare, förråd och årstider.
- [ ] Byggande och drift kräver resurser, tid och pengar; avkastning och risker varierar.
- [ ] Spelaren fattar begripliga beslut med knappar och tydliga följder, utan att fastna i oändlig mikroadministration.
- [ ] Även handel, hantverk och andra försörjningsvägar ska kunna utvecklas.

### KB-05.3 – Borgar, adel, politik och arméer
- [ ] Högre status och titlar nås genom relationer, stöd, prestationer och historiskt rimlig legitimitet; inte enbart genom pengar eller erfarenhetspoäng.
- [ ] Förvalta borgar och större egendomar: underhåll, garnison, förråd, personal, försvar och inkomster.
- [ ] Större följen och arméer kräver rekrytering, försörjning, utrustning, lojalitet och löpande kostnader.
- [ ] Härskarroll med politiska beslut, vasaller, allianser, konflikter och följder för befolkningen.
- [ ] Möjlighet att bli hertig eller kung är ett mycket långsiktigt, svårt och historiskt granskat mål, inte ett utlovat tidigt spelmoment.

### KB-05.4 – Laglöshet, överfall och konsekvenser
- [ ] Rövarband kan välja mål som vägfarare eller handelskaravaner och försöka råna eller plundra inom spelets fiktiva värld.
- [ ] Risker inkluderar motstånd, rättsliga följder, ryktesspridning, vedergällning och bristande lojalitet.
- [ ] Samma öppna värld ska reagera på spelarens handlingar; lagliga och olagliga vägar ger olika möjligheter.

### Genomförandeordning och kvalitet
- [ ] Bygg först stabila NPC-identiteter, relationer, ekonomi, tid, resor och sparning.
- [ ] Prototypa **en** liten rekryterbar följeslagare med interaktion under resa innan större grupper eller arméer.
- [ ] Prototypa **en** liten förvaltningskedja för en gård innan borgar och riken.
- [ ] Skapa användarflöden och balansera kostnader före implementation; testa mobilupplevelsen.
- [ ] Historiska villkor (titlar, markrätt, riddarslag, samhällsskikt och krigsmakt år 1250) faktagranskas innan de presenteras som fakta.

### Övriga grundsystem
- [ ] NPC-data, relationer och händelser.
- [ ] Enkel handel och ekonomi.

## Senare utveckling
- Levande samhällen, uppdrag med följder, familjer och dynastier.
- Fördjupad kart- och UI-design.
- Eventuell framtida hybrid med spelbara 2D-miljöer, större krig och belägringar.

## Arbetsregel
Nästa större funktion påbörjas efter godkänt test och en förbättringsrunda. Kända begränsningar och öppna tester ska synas i TESTS.md och IMPROVEMENT_BACKLOG.md.
