# Daglig utvecklingslogg – SVERIGE: Kronor & Blod
Uppdaterad: 2026-10-20

## 2026-10-19 – KB-01 till KB-02.6
- Repository, GDD, roadmap, beslutslogg, testlogg och historiskt referensunderlag etablerades.
- Fem platser med ID, kartprinciper, klickbar karta och plats-/ekonomipanel infördes.
- Kalender start 1 januari 1250 och lokal kalendersparning infördes.
- GitHub-kontroller PASS; grundläggande Safari-tester PASS inom dokumenterad omfattning.
- Kända begränsningar: förenklad gregoriansk kalender, fiktiva ekonomivärden, begränsad källgranskning och enbart lokal sparning.

## 2026-10-19 – KB-03.1 och KB-03.2
- Karaktärsmodell med fyra bakgrunder och lokal sparning infördes.
- Karaktärsskapare kopplades in; användaren bekräftade skapande och sparning efter omladdning.
- Kända begränsningar: ingen resa, molnsparning eller fullständig felhantering.

## 2026-10-19 – KB-03.3
- Karaktärsprofil i src/character-profile.js; den dubbla karaktärsvyn dold.
- Profilens resetknapp flyttades, skript versionsmärktes v=0336.
- GitHub/Safari PASS för profil; reset senare användarbekräftat.
- Designbeslut: spelbar man, 18 år vid start; kvinnliga NPC:er nu, kvinnliga spelkaraktärer senare.

## 2026-10-19 – KB-03.4
- Första berättelsescenen med tre val och lokal sparning.
- index.html gjord läsbar och kart-/kalenderlogik flyttad till src/app.js.
- GitHub/Safari PASS för berättelse, profil, kalender och karta.
- Tillfälligt kart-/kalenderproblem försvann utan kodändring; orsak okänd.

## 2026-10-19 – KB-03.5
- Ragnhilds scen, svar, relationsvärde och separat lokal sparning infördes.
- GitHub PASS och Safari PASS enligt skärmbild och användarbekräftelse.
- Begränsning: identitet bygger på namn/bakgrund och tidigare val.

## 2026-10-19 – KB-03.6
- »Mannen som försvann« planerad, implementerad i src/investigation.js och aktiverad i index.html.
- GitHub PASS; Safari PASS för två berättelsevägar och bestående ledtrådar.
- Relation −1 och samtliga sex val ännu inte fullständigt testade.

## 2026-10-19 – Kvalitetsbeslut och dokumentationsstädning
- KB-03.6.1 beslutad: rätta inaktuella texter, förbättra flöde och konsekvenser, testa relation −1 och planera riktiga sparfiler.
- docs/IMPROVEMENT_BACKLOG.md med ursprungligen 22 förbättringspunkter verifierad på GitHub.
- KB-DOC-01: fyra huvuddokument sammanslagna och GitHub-verifierade.
- Tio tilläggsfiler jämförda med originalen, arkiverade i `docs/archive/` och därefter borttagna från huvudmappen.
- Slutkontroll GitHub PASS: tio arkivfiler finns, inga `*_TILLAGG.md` direkt i `docs/`.
- Regel: uppdatera huvuddokumenten framöver; bevara unika paketdokument.

## 2026-10-19 till 2026-10-20 – KB-03.6.2
- Steg 1: aktiva berättelsescener, GitHub och visuell Safari PASS.
- Steg 2: dagbok med relationer, ledtrådar och val, GitHub och visuell Safari PASS.
- Steg 3: fliknavigation, GitHub PASS och positiv användarbekräftelse.

## 2026-10-20 – KB-03.6.3
- Steg 1: Hem – Mitt liv, kalender och sparad dagshistorik; GitHub PASS, Safari fungerade enligt användaren.
- Steg 2: kalenderknapparna på Hem och Karta använder gemensam dagshändelse; GitHub PASS.
- Safari-skärmbilder visar 22 januari 1250, dag 22 och dagshistorik. Separat test av båda knapparna och omladdning återstår.
- UX-brist identifierad: många vanliga dagar ger upprepad text och lång historik.
- IMP-023 tillagd i befintliga `docs/IMPROVEMENT_BACKLOG.md`, GitHub-verifierad PASS. Ingen tilläggsfil ska skapas.

## 2026-10-20 – Berättelsebeslut och omprioritering
- Ragnhilds nuvarande scener klassas som teknisk prototyp, inte färdig introduktion eller huvudberättelse.
- Beslut: Ragnhilds mysterium ska bli ett större frivilligt introduktionsuppdrag som öppnar upp den verkliga huvudberättelsen.
- IMP-024 planerad med P1: dramaturgi, Ragnhilds motiv, spelarens drivkraft, valens konsekvenser och möjligheten att avstå.
- Dagshändelser (KB-03.6.4) skjuts efter berättelsegenomgången. Befintliga sparningar får inte raderas eller skrivas över utan säker migrationsplan.
- Den nuvarande tekniska implementationen behålls tills en ersättningsplan är granskad och testad.

## 2026-10-20 – IMP-025, karaktärens egen bakgrund
- Beslut: alternativ C för berättelsen – personlig öppning som kan leda till större maktkonflikt, utan obligatoriskt hjälteöde.
- IMP-025 föreslagen och specificerad: identitet, uppväxt, familj, förflutet, ambition och frivillig biografi.
- Bakgrundsval ska ge startförutsättningar och alternativa berättelseingångar; vanlig uppväxt är fullvärdig och ingen livsväg låses.
- Första paketet är design och säker datamodell, inte levande familje-NPC:er. IMP-024 och IMP-025 ska samordnas innan kodändringar.
- GitHub-verifiering av detta dokumentationspaket återstår tills användaren committat det.

## 2026-10-20 – IMP-025 steg 2: startvärden och migrationskrav
- Beslutat som **designförslag**, inte implementerat: behåll befintliga `styrka`, `list`, `anseende`; föreslå separata färdigheter `jordbruk`, `hantverk`, `skriftkunskap`, `umgangesvana` med startvärde 2 för respektive uppväxt.
- Familj (`tillsammans`, `distanserad`, `ensam`), förflutet (`vanlig`, `skuld`, `lofte`, `konflikt`) och ambition (`gard`, `handel`, `resa`, `inflytande`) definierade som oberoende val utan låsta livsvägar.
- Ingen levande familje-NPC eller faktisk berättelsekonsekvens påstås finnas förrän systemen är byggda.
- Krav: inventera globala localStorage-nycklar, inför unikt `characterId`, skydda `character.v1` och övriga sparningar, migrera bara kända värden, testa gammal/ny/samma namn/reset/omladdning/Ragnhild/daglogg i Safari.
- IMP-024 samordnas med IMP-025: valfri Ragnhild-inledning, olika ingångar utan påtvingad familjehemlighet.
- Nästa steg efter GitHub-verifiering: granska sparnycklar och göra separat säker migrationsplan innan någon spelkod ändras.

## Aktuellt läge vid tidigare planeringsstopp (historiskt; ersatt av stoppnotering 2026-10-20 nedan)
Aktivt paket: IMP-025 – dokumentera karaktärsskaparens design och samordna med IMP-024.
Nästa exakta steg: GitHub-verifiera IMP-025 steg 2; inventera därefter sparnycklar och besluta om säker migration innan kodändringar.
Tester som återstår: båda kalenderknapparna, daglogg efter omladdning, befintlig karaktär/berättelse, relation −1 och samtliga undersökningsval.
Kända risker: ingen stabil unik karaktärsidentitet eller riktig sparfilsmigration. IMP-023 är planerad, inte implementerad.

### Mall för nästa arbetspass
Datum:
Aktivt paket:
Senaste fungerande commit/branch:
Vad ändrades:
Tester PASS/FAIL:
Kända problem:
Nästa exakta steg:

---

## 2026-10-20 – STOPP FÖR DAGEN · IMP-025 3H.11.5

**Status:** Utvecklingen pausad på användarens begäran. Inget 3H.11.6-paket är påbörjat.

### Godkända delpaket
- 3H.10.3–3H.10.6: säker separat karaktärsskapare, gammal riskabel knapp borttagen, cachekorrigering; Sven skapad och byte tillbaka till Mk fungerade enligt användaren.
- 3H.11.1: GitHub PASS. Safari-bilder visade återstående återläsningspanel; rättad i 3H.11.2.
- 3H.11.2: återläsningskontroll flyttad till avancerade verktyg. GitHub PASS, Safari PASS med bilder.
- 3H.11.3: kompakt hopfällbart byte. GitHub PASS, Safari PASS och användarbekräftad knappkontroll.
- 3H.11.4: historiskt inspirerade karaktärskort. GitHub PASS, Safari PASS och användarbekräftad knappkontroll.
- 3H.11.5: ny karaktärsprofil, större namn, emblem och egenskapsrutor, utvecklingstext dold. GitHub PASS och Safari PASS med bild.

### Nuvarande spelstatus
- Aktiv i vanlig Safari: **Mk**, Bonde, Skara.
- Ytterligare lokala karaktärer: **Erik** och **Sven**.
- GitHub: https://github.com/MarreKromo/kronor-och-blod
- Spelet: https://marrekromo.github.io/kronor-och-blod/
- Sparningarna finns i **vanliga Safaris localStorage**; privat Safari och ChatGPT:s inbyggda webbläsare delar inte automatiskt dessa.

### Nästa exakta steg – IMP-025 3H.11.6
1. Läs stoppnoteringen samt ROADMAP, TESTS och IMPROVEMENT_BACKLOG.
2. Hämta aktuella filer på GitHub: `index.html`, `src/character-cards-ui.js`, `src/character-cards-theme-ui.js`, `src/character-profile-theme-ui.js` och `src/character-switch-compact-ui.js`.
3. Gör **enbart aktiva karaktärens dubblettkort kompakt**. Behåll Erik och Sven som fulla kort. Ändra inte bytesmotorn eller sparsystemet.
4. Leverera ett litet ZIP-paket till iPhone. Testa syntax/ZIP, användaren committar, kontrollera GitHub, testa sedan i vanliga Safari med PASS/FAIL.
5. Kontrollera att Mk:s sparning och valknapparna för Erik/Sven är intakta. Uppdatera dokumenten efter PASS.

### Fortfarande ej färdigt
- IMP-025:s utökade livsbakgrund (familj, förflutet, ambition, biografi och nya färdigheter) är planerad.
- IMP-024 Ragnhilds introduktionsberättelse och IMP-023 kompakt dagshistorik är planerade.
- Full regression av kalender, berättelse, äldre sparningar och olika bakgrunder återstår.
- **3H.11.6 har inte kodats eller testats.**

**Arbetsregler:** ett steg i taget, inga oombedda bilder, inga manuella långredigeringar på iPhone, GitHub PASS och Safari PASS verifieras separat.

---

## 2026-10-20 – IMP-025 3H.12.7 J-H1–J-H3 · aktuell checkpoint

**Resultat:** nytt obligatoriskt karaktärsskapande har integrerats och användartestats inom avgränsad omfattning.
- J-H1: formulär med namn, roll, fyra obligatoriska livsval, frivillig biografi och förhandsgranskning. GitHub + Safari PASS.
- J-H2A: isolerade säkerhetstester med minneslagring, 10/10 Safari PASS.
- J-H2B: verklig create-only-sparning med ny UUID, separat inaktiv slot, explicit bekräftelse och återläsningskontroll. GitHub PASS. Användaren bekräftade lyckad sparning, omladdning och bevarade karaktärer i Safari.
- J-H3: användaren testade byte till JH2-Test och tillbaka samt att dess fyra livsval visades korrekt. Safari PASS.
- Testbonde, Mk, Erik, Sven och JH2-Test rapporterades finnas kvar. Sparningarna ligger lokalt i Safari.

**Kvarvarande:** bokstavligt `\\n` i kvittot efter sparning; rätta i separat rent presentationspaket. Ingen full regression av kalender, dagbok, Ragnhild och övriga berättelsegrenar. Ingen verifierad backup/export för riktiga spelare.

**Nästa exakta steg:** Läs `docs/STOPP_2026-10-20_JH.md`, rätta visningsfelet utan ändrad sparlogik, verifiera GitHub efter commit och Safari separat, genomför därefter avgränsad regression.

**Historik:** äldre stoppnoteringar ovan beskriver tidigare utvecklingslägen och ersätts i fråga om aktuell status av denna post.

---

## 2026-10-20 – J-I visningsfix och J-J grundläggande regression

- **J-I GitHub PASS:** korrigerad radbrytningssekvens efter UUID, uppdaterad missvisande kommentar och ny cacheversion i `index.html`. Ingen ändring av sparmotor eller sparnycklar.
- **J-I Safari PASS enligt användaren:** befintliga Testbonde och JH2-Test kvar och karaktärsbyte fungerar. Själva radbrytningen efter ny sparning är ännu inte visuellt testad.
- **J-J1 kalender 3/3 Safari PASS:** Hem +1 och omladdning; Karta +1 med samma datum på Hem; två senaste dagar i historiken efter omladdning.
- **J-J2 berättelse 2/2 Safari PASS:** scen, tidigare val och ledtrådar finns kvar, även efter omladdning. Inga nya berättelseval gjordes.
- **J-J3 karaktärer 2/2 Safari PASS:** Testbonde och JH2-Test visar separata korrekta livsbakgrunder vid byte; efter omladdning är Testbonde fortfarande aktiv och JH2-Test finns i listan.
- **Summa J-J: 7/7 användarrapporterade Safari PASS inom testad omfattning.**
- **Kvar:** feltest av lagring, backup/export, alla berättelsegrenar och visuell kontroll av radbrytning vid nästa faktiska karaktärsskapande.
- **Nästa steg:** dokumentera denna checkpoint i GitHub och GitHub-verifiera de fyra dokumentfilerna. Därefter planera nästa avgränsade paket utan att riskera befintliga sparningar.

**Senaste återstartspunkt:** `docs/STOPP_2026-10-20_JJ.md`. Tidigare stoppnoteringar ovan är historiska.

---

## 2026-10-20 – IMP-025 J-K1/J-K2 · fortsättning efter J-J

- **J-K1:** kodinventering av karaktär, livsbakgrund, slots, profil och berättelse. Fyra livsval och separat sparning finns; aktiva färdighetsbonusar, kontakter och livsvalsstyrda berättelsekonsekvenser återstår. Ingen kodändring i J-K1.
- **J-K2:** `src/life-background-skills-preview.js` och komplett `index.html` levererade som ZIP och uppladdade av användaren. GitHub PASS för filernas innehåll och skriptlänk. Safari PASS med två skärmbilder: korrekt informationsmeddelande utan verifierad livsbakgrund, samt ”Jordbruk +2” som enbart förslag för Testbonde med verifierad bakgrund.
- **Begränsning:** ingen aktiv bonus; inte fullständigt test av alla uppväxter, omladdning, karaktärsbyte eller felaktiga lagringsposter. Inga sparningar återställda eller avsiktligt ändrade.
- **Spelarupplevelse:** karaktärsfliken har flera hopfällbara paneler; gör UX-genomgång och välj hållbar struktur före ytterligare paneler.
- **Nästa exakta steg:** J-K3, testa läsningen med befintlig karaktär och omladdning utan att skapa ny karaktär eller ändra data. Därefter besluta separat om färdigheternas framtida spelmekanik.

---

## 2026-10-20 – IMP-025 J-K3 · Safari-test och nästa UX-steg

- **J-K3 Safari PASS enligt användaren:** Testbonde visar `Jordbruk +2` både före och efter omladdning i vanliga Safari.
- Ingen ny kod levererades i J-K3; testet bekräftar endast fortsatt visning för en befintlig karaktär.
- Färdigheten är fortfarande en skrivskyddad förhandsvisning, inte en aktiv spelbonus.
- Övriga bakgrunder, byte mellan karaktärer, felaktig lagring och bred regression är ännu inte godkända.
- **Nästa exakta steg:** granska karaktärsflikens befintliga paneler och prioritera en tydligare spelarupplevelse före ytterligare funktioner. Skydda alla befintliga sparningar.

---

## 2026-10-20 – IMP-025 J-L1–J-L3 · UX, Safari-cache och dokumentationsstopp

- **J-L1:** befintliga karaktärs- och livsbakgrundspaneler inventerades utan kodändring.
- **J-L2:** färdighetsförhandsvisningen integrerades i livsbakgrundspanelen. GitHub PASS; Safari PASS med skärmbild.
- **J-L3:** ”Min berättelse” och hopfällbart ”Visa formulär och sparningskontroller” infördes. GitHub PASS, men första Safari-testet **FAIL**: gammal vy visades.
- **Cachefix:** `index.html` uppdaterades från `?v=jk2-1` till `?v=jl3-2` för färdighets-/livsbakgrundsskriptet. GitHub PASS efter commit.
- **Slutligt Safari PASS med skärmbild:** Testbonde, verifierad livsbakgrund, ”Min berättelse”, ”Jordbruk +2” som förslag samt hopfällbart formulär visas.
- **Dataskydd:** inga avsiktliga ändringar i sparmotor eller localStorage; inget nytt formulärsparprov eller fullständig regression har utförts i J-L3.
- **Produktbeslut:** gör en större visuell redesign av karaktärsgränssnitt och karta i senare fas. Prioritera nu funktion, stabilitet och spelvärld.
- **Separat checkpoint:** `docs/CHECKPOINT_JL3_2026-10-20.md`, GitHub PASS.

**Nästa exakta steg:** GitHub-verifiera detta dokumentationspaket (`docs/TESTS.md` och `docs/DAILY_LOG.md`) efter användarens commit. Välj därefter nästa avgränsade utvecklingspaket. Behåll små ZIP-paket och separata GitHub-/Safari-tester. Tidigare poster är historiska och får inte raderas.

---

## 2026-10-20 – Kapitel A2 avslutat; startpunkt för B1
- A2.1–A2.6 är implementerade och GitHub-verifierade. Isolerade Safari-resultat: A2.2 6/6, A2.3 7/7, A2.4 7/7, A2.5 7/7 och A2.6 10/10 PASS.
- Full JSON-backup laddades ned och återvaldes i Safari. SHA-256-verifiering PASS. Fem karaktärer: Testbonde, JH2-Test, Mk, Sven och Erik.
- A2.6 kontrollerades mot verklig backup: fem befintliga sparplatser, noll saknade. Ingen riktig återställning utfördes; scenariot saknad sparplats har bara isolerat PASS.
- GitHub Pages visade tillfälligt 404 innan lyckad deployment; testet fungerade efter publicering.
- Dokumenten `docs/KB_A2_AVSLUT_OCH_B_START_2026-10-20.md` och `docs/KB_B1_POSITION_RESOR_PLAN.md` är uppladdade och GitHub-verifierade.
- **Aktivt nästa paket:** B1. Granska faktisk kod för karta, platser, kalender, karaktärsidentitet och byte innan ändringar. Skilj visad kartplats från karaktärens faktiska position. Först isolerade tester, sedan verklig Safari-testning utan att radera eller skriva över sparningar.
- Tidigare ”nästa steg”-poster är historik och ska inte användas som aktuella instruktioner.
