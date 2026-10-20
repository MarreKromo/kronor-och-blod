# Roadmap – SVERIGE: Kronor & Blod
Uppdaterad: 2026-10-20
**Aktuell styrning:** KB-PLAN-01. Historiska delpaket och äldre prioriteringar finns i Git-historiken (föregående ROADMAP.md: blob `9d0c5c4d8e719fcf86740f8fd1e629222f37cabc`) och i `docs/TESTS.md`, `docs/DAILY_LOG.md` och äldre stoppunkter.
**Planunderlag:** `docs/KB_PLAN_01_ROADMAP_GENOMGANG.md`.
**Viktigt:** PASS betyder verifierad delomfattning, inte att hela systemet är färdigutvecklat.

## Vision
Ett öppet historiskt inspirerat RPG i Västergötland år 1250. Spelaren formar sitt liv genom resor, arbete, relationer, uppdrag, träning och beslut. Livsvägar är inte låsta klasser. Tid är en begränsad resurs och specialisering växer fram genom handlingar.

## Aktuellt läge
- [x] **KB-00:** GDD v1.0.
- [x] **KB-01:** repo, dokumentstruktur och GitHub Pages.
- [x] **KB-02 prototyp:** fem platser, schematisk klickbar karta, kalender och lokal sparning.
- [x] **KB-03 prototyp:** karaktärsskapande, flera karaktärsplatser, profil, berättelsescener, Ragnhild, ledtrådar, relation, dagbok och mobilnavigation.
- [x] **J-A–J-H:** stegvis skapande, validering, säkerhetsarbete och separat sparning; omfattning enligt testloggen.
- [x] **J-I:** radbrytnings-/kommentarsfix; Safari bevarandetest.
- [x] **J-J:** 7/7 rapporterade Safari PASS för kalender, berättelse och karaktärsbyte inom testad omfattning.
- [x] **J-K1–J-K3:** färdighetsförhandsvisning utan aktiv bonus, testad omladdning och dokumentation.
- [x] **J-L1–J-L3:** samlad livsbakgrundsvy, ”Min berättelse” och hopfällbart formulär. Cachefix `jl3-2`, GitHub/Safari PASS inom synlig UI-omfattning.
- [x] **KB-PLAN-01 steg 1:** strategidokument uppladdat och GitHub-verifierat.
- [ ] **KB-PLAN-01 steg 2:** detta uppdaterade huvuddokument inväntar GitHub-verifiering efter commit.
- [ ] **Ej färdigt:** export/backup, bred fel- och regressionsmatris, riktiga resor, spelposition, generella NPC:er, aktiviteter, aktiv XP/färdighetsmotor och större världssystem.

## Officiell utvecklingsordning – KB-PLAN-01

### Fas A – Dataskydd och sammanhängande grund (NÄSTA)
- [ ] **A1 – Läsbaserad sparinventering:** identifiera alla lokala nycklar, karaktärskoppling, globala värden, slotbyten och risker. Ingen spelkodändring.
- [ ] **A2 – Backup och återställning:** specificera säker export och återställning innan fler bestående världstillstånd införs.
- [ ] **A3 – Säker datamodell:** versionering, identifiering och migration i små testbara steg. Inga gamla sparningar får raderas.
**Gate:** befintliga karaktärer, livsbakgrunder, berättelse, dagbok, kalender och karaktärsbyte fungerar efter omladdning. Testa nekad/full lagring och återställning separat.

### Fas B – Position, resor och spelvärld (KB-04.1)
- [ ] Varje karaktär har en bestående faktisk position, initialt Skara.
- [ ] Vald ort på kartan skiljs från faktisk resa.
- [ ] En första väg mellan två platser med tydliga villkor och kostnad i speltid.
- [ ] Position och tid bevaras efter omladdning.
- [ ] Förbered platsvillkor för uppdrag och aktiviteter.
**Gate:** en säker resa genomförd, kalender korrekt och ingen påverkan på andra karaktärers data.

### Fas C – En levande aktivitet och en NPC
- [ ] Gemensam aktivitetsmodell: plats, krav, tidskostnad, resultat, ID och karaktärskoppling.
- [ ] En namngiven NPC med identitet, ett möte och en begriplig relation.
- [ ] En aktivitet med bestående resultat i dagbok/historik.
- [ ] Undvik dubbelbelöningar och oavsiktliga upprepningar efter omladdning.
**Gate:** spelaren kan möta en NPC, göra en aktivitet, förbruka tid och se en bestående konsekvens.

### Fas D – Arbete, färdigheter och utveckling
- [ ] Designa färdighetskatalog: strid, överlevnad, ridning, jordbruk, hantverk, handel, kunskap och sociala färdigheter.
- [ ] Skilj inlärda färdigheter från befintliga grundegenskaper `styrka`, `list`, `anseende`.
- [ ] Fastställ nivåer, erfarenhet, svårighetsgrad, tidsåtgång och skydd mot XP-farm.
- [ ] Första verkliga färdigheten tränas genom en faktisk aktivitet.
- [ ] Utöka till jobb, lärare, uppdrag och händelser; högre nivåer kräver större investering.
- [ ] Ingen klasslåsning: spelaren kan byta livsväg, men tiden gör det svårt att bemästra allt.
**Gate:** aktiv färdighetsförändring efter tidskostnad, korrekt karaktärskoppling och säker omladdning.
**OBS:** Nuvarande `Jordbruk +2` är enbart skrivskyddad förhandsvisning, inte implementerad bonus.

### Fas E – Berättelse, relationer och öppna livsvägar
- [ ] **IMP-024:** Ragnhilds mysterium blir ett frivilligt introduktionsuppdrag, inte hela huvudberättelsen. Hjälpa, undersöka själv och avstå ska vara meningsfulla vägar.
- [ ] **IMP-025:** bakgrund får verkliga men balanserade konsekvenser för kontakter, startmöjligheter och berättelser, utan påhittade familje-NPC:er.
- [ ] **IMP-023:** kompakt dagshistorik med viktiga händelser tydligt markerade.
- [ ] Fördjupa relationer, handel, försörjning, följeslagare och egendom när beroendena finns.
**Gate:** minst en spelbar alternativ väg utan att acceptera huvuduppdraget; följder består.

### Fas F – Fördjupning, historiskt underlag och presentation
- [ ] **KB-04.2:** kartkunskap – okänd, känd genom rykte/karta, själv utforskad. Kartköp får aldrig vara obligatoriskt.
- [ ] **KB-04.3:** färdsätt till fots, häst och vagn; väg, årstid, väder, kostnad, risk och resehändelser.
- [ ] **KB-05:** levande samhällen, ekonomi, gårdar, rekryterbara följeslagare, familjer, dynastier och långsiktiga livsvägar.
- [ ] Senare: borgar, politik, arméer, laglöshet och möjliga högre titlar med historisk granskning.
- [ ] **IMP-006–013:** större kart- och karaktärs-UI-redesign i separat krav- och testfas; karta ska fungera som spelgränssnitt, inte bara illustration.
- [ ] Historisk källgranskning av geografi, vägar, titlar, markrätt och samhällsskikt.
- [ ] Eventuell framtida hybrid med spelbara 2D-miljöer.

## Första stora spelbara milstolpen
En karaktär ska kunna:
1. Befinna sig i Skara.
2. Möta en person eller välja en aktivitet.
3. Utföra en handling som förbrukar speltid.
4. Se ett bestående resultat i historik, relation eller resurs.
5. Resa till en andra plats.
6. Ladda om och fortsätta utan förlorad eller sammanblandad karaktärsdata.

Milstolpen är **inte** uppnådd. Den byggs genom små paket från fas A–D.

## Historiska delpaket och öppna punkter – bevarad översikt
### KB-02 och KB-03
- Schematisk karta och kalender är prototyper; koordinater, färdvägar och historisk källgranskning återstår.
- Berättelseprototypen omfattar första scen, tre val, Ragnhild, förgreningar, ledtrådar och dagbok.
- KB-03.6.1: berättelseflöde, tydligare konsekvenser och relation −1 återstår.
- KB-03.6.2: aktiv scen, dagbok och mobilnavigation har testade delpaket; full regression återstår.
- KB-03.6.3: Hem/dagshistorik och synkroniserad kalender har testade delpaket; vissa äldre separata testpunkter återstår.
- KB-03.6.4: riktiga dagshändelser återstår, ska inte automatiskt driva huvuduppdraget.
### IMP-025
- Flerkaraktär, bakgrundsformulär och förhandsvisning är delvis implementerade och testade.
- Uppväxtvärdena bonde→jordbruk 2, hantverkare→hantverk 2, skrivare→skriftkunskap 2, friboren→umgängesvana 2 är preliminära och ännu inte aktiva färdigheter.
- Familj, förflutet, ambition och biografi får inte automatiskt skapa fiktiva NPC:er eller ge obalanserade bonusar.
- Kontakter, resurser, berättelsekoppling och aktiv utveckling återstår.
- Äldre checklistor om `characterId`, migration, säkerhetskontroller och backup måste granskas mot faktisk kod innan de markeras klara.
### KB-DOC-01
- [x] Huvuddokumenten TESTS, DAILY_LOG, ROADMAP och ARBETSMETOD konsoliderade.
- [x] Äldre tillägg granskade/arkiverade enligt dokumentationslogg.
- [x] Princip: uppdatera huvuddokument, skapa inte lösa tillägg för varje test.
### Tidigare delpaket
- 3H.10–3H.11: flera karaktärer, byte och UI-städning; se TESTS och DAILY_LOG.
- 3H.11.6 noterades som ”nästa” i en äldre stoppunkt, men är inte längre aktuell prioritet.
- J-A–J-H: sparning, bakgrund och säkerhetskontroller; J-I fixade bokstavlig radbrytning; J-J verifierade 7/7 grundregressioner.
- J-K: förhandsvisning; J-L: sammanhållen presentation och Safari-cachefix.
- Historiska detaljer och exakta PASS/FAIL finns i `docs/TESTS.md`, `docs/DAILY_LOG.md`, `docs/IMPROVEMENT_BACKLOG.md` samt äldre checkpoints. Ursprunglig roadmap finns kvar i Git-historiken.

## Regler för ordning och godkännande
- Faserna är beroendeordning, **inte** krav på att färdigställa en hel fas innan nästa kan prototypas.
- Bygg en liten komplett spelkedja åt gången.
- Läs aktuell kod före varje ändring; skydda alla localStorage-data och befintliga karaktärer.
- Varje kodpaket: ZIP med fullständiga ersättningsfiler → commit → GitHub PASS/FAIL → användartest i vanlig Safari PASS/FAIL → dokumentation.
- Dokumentationspaket behöver GitHub-kontroll men inte nytt Safari-test.
- Registrera öppna fel i `docs/IMPROVEMENT_BACKLOG.md`. Kritiska datarisker prioriteras först.

## Nästa exakta steg
**KB-PLAN-01:** GitHub-verifiera denna roadmap efter commit.
**Därefter Fas A1:** läsbaserad inventering av sparnycklar och karaktärskoppling, utan spelkodändring.

---

## Aktuell checkpoint – 2026-10-20 · A2 avslutat, B1 nästa
- [x] **A1:** läsbaserad inventering av sparnycklar och karaktärskoppling genomförd.
- [x] **A2.1–A2.6:** backup-specifikation, full export, SHA-256, validering, backupcenter och create-only-återställning färdigbyggda och testade inom dokumenterad omfattning.
- [x] **A2.6:** GitHub PASS; 10/10 isolerade Safari-tester PASS. Riktig backup kontrollerad: fem befintliga sparplatser, noll saknade; ingen import gjordes.
- [ ] **Kvarstående A2-begränsning:** faktisk återställning av en saknad karaktär i verklig Safari-lagring är inte testad.
- [ ] **A3:** generell versionering/migration och full felmatris är fortfarande öppna; inte automatiskt godkända genom A2.
- [ ] **B1 (nästa aktiva paket):** bestående karaktärsposition, skillnad mellan kartval och resa, första väg och tidskostnad, karaktärsisolering och omladdning.
- **Nuvarande vägledning:** `docs/KB_A2_AVSLUT_OCH_B_START_2026-10-20.md` och `docs/KB_B1_POSITION_RESOR_PLAN.md`.
- Äldre formuleringar ovan om att A1 är nästa steg är historiska och ersätts av denna checkpoint.
