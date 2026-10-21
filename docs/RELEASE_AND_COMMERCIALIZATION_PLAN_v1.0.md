# SVERIGE: Kronor & Blod
## Release & Commercialization Plan — v1.0

**Datum:** 2026-10-21  
**Status:** Strategisk plan / ej godkänd för implementation  
**Projekt:** `MarreKromo/kronor-och-blod`  
**Ansvar:** Solo developer, iPhone-baserat GitHub-arbetsflöde  
**Föreslagen plats i repo:** `docs/RELEASE_AND_COMMERCIALIZATION_PLAN.md`

> **Dokumenthierarki:** Den här planen kompletterar befintlig masterplan/GDD, roadmap, systems, devlog och arbetsmetod. Den ersätter inte dessa och ändrar inga befintliga prioriteringar automatiskt. Eventuella konflikter ska lyftas och beslutas separat. Planen är framtagen utifrån projektets kända mål; den är inte en verifierad genomgång av samtliga aktuella repo-filer.

---

## 1. Syfte och produktvision

Bygga ett kommersiellt, historiskt, berättelsedrivet rollspel där spelaren lever ett liv i Sverige från år 1250. Spelet ska kännas levande genom relationer, konsekvenser, ekonomi, familjer, dynastier och gradvis politiskt inflytande. Det ska vara lätt att förstå men ha djup och hög återspelningsbarhet.

**Produktprincip:** Djup genom sammanhängande system och meningsfulla val, inte genom onödigt komplicerade menyer.

**Primär lanseringsplattform:** iPhone / Apple App Store.  
**Möjlig framtida plattform:** PC / Steam.  
**Nuvarande utvecklingsform:** Webbspel, GitHub och Safari-testning.  
**Resursram:** En utvecklare, huvudsakligen iPhone, begränsad budget.

### 1.1 Avgränsning

Ingen ambition att kopiera omfattningen i ett stort strategispel vid första lanseringen. Världen kan ge ett intryck av stor skala genom att viktiga NPC:er simuleras detaljerat medan bakgrundsbefolkningen använder enklare modeller. Krig, rikstäckande politik och mycket stora kartutökningar är möjliga senare funktioner, inte automatiska krav för version 1.0.

## 2. Rekommenderad distributionsstrategi

1. **Webbprototyp:** Fortsätt nuvarande utveckling, automatiska och manuella tester samt dokumentation.
2. **Mobil release candidate:** Säkerställ stabil spelkärna, mobilanpassat gränssnitt, beständiga sparfiler och rimlig prestanda.
3. **iOS-paketering:** Utvärdera Capacitor eller annan lämplig lösning för att paketera befintlig webbteknik. Beslut tas efter teknisk granskning, inte i förväg.
4. **iOS-bygge och signering:** Utvärdera molnbyggtjänst/CI för utveckling från iPhone. GitHub lagrar källkod och kan starta byggflöden, men publicerar inte automatiskt spelet till App Store.
5. **TestFlight:** Begränsad extern testning av signerad app.
6. **App Store:** Skicka in för granskning och publicera först efter att release-kriterierna är uppfyllda.
7. **PC/Steam:** Utvärdera efter mobilvalidering; kräver egen anpassning av kontroller, skärmstorlek, paketering, distribution och testning.

**Obs:** Apple kan avslå appar som huvudsakligen är enkla webbplatsomslag eller inte uppfyller gällande App Review Guidelines. Appversionen måste upplevas som en fungerande, välanpassad app.

## 3. Tekniska arkitekturprinciper från och med nu

- **Separera spelregler från gränssnitt:** Relationer, tid, ekonomi, NPC-logik och sparformat ska inte vara beroende av en viss skärm.
- **Plattformsoberoende speldata:** Använd dokumenterade dataformat och tydliga versionsnummer för sparfiler.
- **Sparfiler:** Definiera migrering, återställning, backup och felhantering innan betatest.
- **Offline-first där det är rimligt:** Spelets kärnloop ska inte kräva onödiga externa tjänster; eventuella onlinetjänster dokumenteras separat.
- **Responsivt gränssnitt:** Pekskärm först, men undvik designbeslut som gör tangentbord/mus omöjliga senare.
- **Prestandabudget:** Begränsa bakgrundssimulering och mängden aktiva NPC:er. Mät på verkliga enheter.
- **Säkerhet:** Inga hemliga nycklar, certifikat eller lösenord i GitHub. Signering och CI-hemligheter hanteras i godkända secret stores.
- **Repo och licens:** Granska offentlig/privat repo-status och tredjepartslicenser innan kommersiell distribution. Ett offentligt repo gör källkoden synlig; avsaknad av licens innebär inte att andra automatiskt får rätt att återanvända den.

## 4. Förslag till affärsmodell

**Huvudspår att testa:** Engångsköp av grundspelet; eventuella större expansioner längre fram.

**Alternativ att jämföra före lansering:** Gratis demo/prolog med upplåsning, eller ett enda premiumköp. Ingen affärsmodell är slutligt beslutad.

**Undvik initialt:** Komplicerade abonnemang, annonser och mikrotransaktioner som tar fokus från spelets identitet.

### 4.1 Prissättning

Exempel för undersökning, **inte fastställt pris:** 49–99 SEK för en mobil premiumversion. Gör marknadstest, konkurrensanalys och kalkyl för nettointäkt före beslut. Räkna med plattformsavgifter, skatt/moms, återbetalningar, växelkurser och eventuella tjänstekostnader. Apples avgiftsstruktur beror på program, region och tillämpliga villkor.

## 5. Budget och konton

| Post | Planeringsantagande | Kommentar |
|---|---|---|
| GitHub | Kan starta med gratisnivå | CI-minuter, lagring och privata funktioner kan ha gränser |
| Apple Developer Program | Vanligen 99 USD per medlemsår | Kontrollera aktuellt pris och lokala villkor |
| TestFlight | Ingår normalt i utvecklarprogrammet | Kräver korrekt appdistribution |
| iOS molnbygge | Okänd / kan kosta | Utvärdera leverantör och kostnad innan beslut |
| Steam Direct | Normalt 100 USD per produkt | Kontrollera aktuella regler och eventuell återbetalningsmekanism |
| Grafik, ljud, typsnitt | Variabelt | Säkerställ kommersiella rättigheter |
| Domän, drift, support | Variabelt | Endast om lösningen kräver detta |

**Ingen kostnad ska aktiveras enbart på grund av detta dokument.**

## 6. Rättigheter, integritet och efterlevnad

Före offentlig beta eller försäljning ska projektet kontrollera:

- Rätten att använda all kod, grafik, musik, ljudeffekter, typsnitt och AI-genererat material, inklusive relevanta licensvillkor.
- Namnkontroll för **Kronor & Blod**: relevanta varumärkesregister, butiksnamn och domäner. Detta dokument utgör ingen varumärkesclearance.
- Apples aktuella App Review Guidelines och regler för betalningar i appar.
- Integritetspolicy, datakartläggning, lagringstid och användarrättigheter om personuppgifter samlas in; relevanta GDPR-krav.
- Åldersklassificering, innehållsbeskrivning och korrekt information om historiskt våld och andra känsliga teman.
- Konsumenträtt, skatter, bokföring och lämplig företagsform för försäljning i Sverige och internationellt; stäm av med sakkunnig vid behov.
- Supportkontakt, buggrapportering och rutin för säkerhetsuppdateringar.

**Primära kontrollpunkter:** developer.apple.com, App Store Connect, Steamworks/Steam Direct, PRV, EUIPO, IMY och Skatteverket. Läs aktuella villkor inför varje lanseringsbeslut.

## 7. Release gates: när får vi gå vidare?

### Gate A — Spelbar kärna
- [ ] En ny spelare förstår grundloopen utan handledning från utvecklaren.
- [ ] Val får konsekvenser som kan följas över flera speldagar.
- [ ] Resor, tid, relationer och ekonomi fungerar konsekvent.
- [ ] Sparning/laddning fungerar efter omladdning och versionsbyte.
- [ ] Inga kända blockerande fel i definierad testsvit.

### Gate B — Mobilkandidat
- [ ] Skärmar och text är läsbara på relevanta iPhone-storlekar.
- [ ] Touch, navigation och återgång fungerar utan återvändsgränder.
- [ ] Långa sessioner fungerar utan tydlig prestandaförsämring.
- [ ] Avbruten session och återstart orsakar inte dataförlust.
- [ ] Teknikval för iOS-paketering är dokumenterat och testat.

### Gate C — Extern beta
- [ ] Signerad iOS-app kan installeras genom korrekt testkanal.
- [ ] Testare kan rapportera buggar och lämna strukturerad feedback.
- [ ] Kritiska fel kan reproduceras, prioriteras och åtgärdas.
- [ ] Nödvändig integritets- och rättighetsdokumentation finns.

### Gate D — Kommersiell release
- [ ] En definierad 1.0-funktionslista är uppfylld; övrigt flyttat till backlog.
- [ ] Prissättning, butiksbeskrivning, skärmbilder och åldersklassificering är godkända.
- [ ] Licenser, betalningsmodell och tillämpliga regler är granskade.
- [ ] Support, uppdateringsrutin och rollback-plan är klara.
- [ ] Releasebygget har slutligt GitHub PASS och enhets-/Safari-/iOS PASS enligt relevant testmatris.

## 8. Arbetsmetod och versionshantering

Behåll nuvarande projektprocess: **sammanhängande ZIP-paket → GitHub commit → GitHub PASS/FAIL → Safari PASS/FAIL**. iOS-specifika bygg- och TestFlight-tester läggs till först när projektet når relevant fas.

Varje framtida kommersiell förändring ska ha:
1. Beslut med motivering och berörda masterdokument.
2. Avgränsat arbetspaket och acceptanskriterier.
3. Testutfall och kända begränsningar.
4. Uppdatering i devlog/daily stop-log.

**Regel:** Inga stora omstruktureringar, motorbyten eller betalningsfunktioner utan separat godkännande.

## 9. Riskregister

| Risk | Motåtgärd |
|---|---|
| Scope creep | Lås en liten 1.0-kärna och lägg resten i backlog |
| Solo-utvecklarbelastning | Små sammanhängande paket och tydliga stoppunkter |
| iPhone-only byggflöde | Prova molnbygge tidigt när mobilkandidat närmar sig |
| Apple-granskning | Läs aktuella regler och gör tidig teknisk provpaketering |
| Trasiga sparfiler | Versionerade format, migrering och regressionsprov |
| Oklara tillgångsrättigheter | Tillgångsregister med källa, licens och kvitto |
| Svag efterfrågan | Små externa tester och enkel marknadsvalidering |
| För tidig Steam-satsning | Håll PC som framtida möjlighet, inte 1.0-krav |

## 10. Marknadsföring och lanseringsförberedelser

- Skriv en kort, tydlig spelpitch och definiera målgrupp.
- Dokumentera vad som särskiljer spelet: ett personligt liv i ett levande medeltida Sverige.
- Samla skärmbilder och korta klipp först när de representerar verklig spelupplevelse.
- Rekrytera ett litet antal testspelare och mät begriplighet, återkomst och upplevt värde.
- Bestäm titel, ikon, butikstexter och lanseringsspråk efter rättighets- och namnkontroll.
- Skapa inte löften om lanseringsdatum förrän release gates har passerats.

## 11. Framtida PC/Steam-beslut

Steam är ett **möjligt steg 2**, inte ett löfte. Utvärdera när mobilversionens kvalitet, efterfrågan och resurser är kända. Särskilt viktiga frågor: desktop-UI, mus/tangentbord, upplösningar, paketering, Steamworks-krav, sparfiler och eventuell skillnad i pris eller innehåll.

## 12. Nästa beslut — inte nästa koduppgift

1. Lägg till denna fil i `docs/` när det passar i ordinarie arbetsflöde.
2. Länka den från dokumentindex/masterplan vid ett separat dokumentationspaket.
3. Behåll nuvarande roadmap och pågående utvecklingspaket oförändrade.
4. Gör en kort teknisk release-förstudie först när spelkärnan når relevant mognad.
5. Besluta om affärsmodell, pris och kontoregistrering senare, med aktuella källor.

---

## Beslutslogg

| Datum | Beslut | Status |
|---|---|---|
| 2026-10-21 | Mobil först, PC/Steam som möjlig framtida plattform | Föreslagen strategi |
| 2026-10-21 | Berättelsedrivet historiskt RPG med utvalda djupa strategisystem | Produktinriktning |
| 2026-10-21 | Premiumspel med möjliga expansioner | Preliminär affärsmodell |
| 2026-10-21 | Ingen ändring av befintlig roadmap utan separat beslut | Processregel |

**Nästa dokumentversion:** v1.1 först efter repo-avstämning och uttryckligt godkännande.
