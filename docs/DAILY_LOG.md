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

## Aktuellt läge
Aktivt paket: IMP-025 – dokumentera karaktärsskaparens design och samordna med IMP-024.
Nästa exakta steg: ersätt de tre befintliga dokumenten med IMP-025-paketet och GitHub-verifiera; därefter specificera valens konkreta startvärden och säker sparmigrering innan kodändringar.
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
