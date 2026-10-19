# Daglig utvecklingslogg – SVERIGE: Kronor & Blod
Uppdaterad: 2026-10-19

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
- docs/IMPROVEMENT_BACKLOG.md med 22 förbättringspunkter verifierad på GitHub.
- KB-DOC-01 påbörjad: inventering av 34 poster i docs (33 dokument + .gitkeep).
- Fyra huvuddokument ska slås ihop utan att äldre filer raderas innan verifiering.

## Aktuellt läge
Aktivt paket: KB-DOC-01, steg 1 – sammanslagning av fyra huvuddokument.
Nästa exakta steg: ladda upp färdiga TESTS.md, DAILY_LOG.md, ROADMAP.md och ARBETSMETOD.md; verifiera GitHub.
Kända problem: samma information utspridd i tilläggsfiler; gamla statusrader i huvuddokument; risk för blandade testkaraktärer med samma namn/bakgrund.

### Mall för nästa arbetspass
Datum:
Aktivt paket:
Senaste fungerande commit/branch:
Vad ändrades:
Tester PASS/FAIL:
Kända problem:
Nästa exakta steg:
