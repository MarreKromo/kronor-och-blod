# Testlogg – SVERIGE: Kronor & Blod
Uppdaterad: 2026-10-20
Status anges per paket och endast inom faktiskt verifierad omfattning. Historiska detaljer finns kvar i äldre källdokument tills arkivering är godkänd.

## KB-01 – Projektstruktur
- PASS GitHub: repo, README, roadmap, daglig logg, GDD v1.0, referenskarta och commits.
- EJ SEPARAT TESTAT: nedladdning av GDD på iPhone.

## KB-02.1 – Historiska platser
- PASS GitHub: dokument och fem stabila plats-ID:n.
- ÅTERSTÅR: fördjupad källgranskning.

## KB-02.2 – Geografisk grund
- PASS GitHub: dokument och separerade kart-/platsdatalager.
- ÅTERSTÅR: verifierade koordinater och historiska färdvägar.

## KB-02.3 – Klickbar kartprototyp
- PASS GitHub: index.html, src/places.js, SVG-karta, dokument.
- PASS Safari enligt användaren: GitHub Pages öppnas och kartan fungerar.
- EJ SEPARAT TESTAT: varje markörs ID/beskrivning och liggande skärmläge.

## KB-02.4.1 – Platsregister och ekonomi
- PASS GitHub: src/world.js, fem platser med befolkning/resurser/makt/ekonomisk roll och dokument.
- Ingen ekonomisk simulering ingår.

## KB-02.4.2 – Kartpanel och ekonomi
- PASS GitHub: index.html visar platsdata och resursstaplar.
- Övergripande Safari-PASS användarrapporterat.
- EJ SEPARAT TESTAT: alla fem orters värden, liggande skärmläge.

## KB-02.5 – Tid och årstider
- PASS GitHub: kalender och dokument.
- PASS Safari enligt användaren: dagknappen flyttar datum 1→2 januari 1250.
- EJ SEPARAT TESTAT: säsongsskifte, samtliga markörer efter ändring, liggande skärmläge.

## KB-02.6 – Lokal kalendersparning
- PASS GitHub: localStorage-nyckel `kronor-och-blod.calendar.v1`.
- PASS Safari enligt användaren: datum kvar efter omladdning i samma flik.
- EJ SEPARAT TESTAT: stängd flik, månad/årsskifte, blockerad lagring, privat läge.

## KB-03.1 – Karaktärsmodell
- PASS GitHub: src/character.js, fyra bakgrunder, namnvalidering, egenskaper, Skara och lokal sparning.
- EJ SEPARAT TESTAT: felaktiga namn/sparvärden och blockerad lagring.

## KB-03.2 – Karaktärsskapare
- PASS GitHub: src/character-ui.js och korrekt skriptordning.
- PASS Safari enligt användaren: skapa, visa och ladda om karaktär.
- EJ SEPARAT TESTAT: samtliga bakgrunder, ogiltiga namn, privat läge.

## KB-03.3 – Karaktärsprofil
- PASS GitHub: src/character-profile.js, korrekt skriptordning och cacheversion v=0336.
- PASS Safari (skärmbild): endast profil visas, namn/kön/ålder/bakgrund/plats/egenskaper syns, karta syns och resetknapp visas.
- Senare användarbekräftelse: återställningsknapp fungerade.
- EJ SEPARAT TESTAT: alla bakgrunder, liggande skärmläge och felhantering.

## KB-03.4 – Första berättelsescenen
- PASS GitHub: src/story.js, src/app.js och index-aktivering.
- PASS Safari enligt användaren: berättelseval, sparning, profil, kalender och fem kartplatser.
- Tillfälligt kart-/kalenderproblem försvann utan kodändring; orsak okänd.
- EJ TESTAT: alla tre berättelsegrenar, privat läge, blockerad lagring, samma namn/bakgrund.

## KB-03.5 – Ragnhild
- PASS GitHub: src/encounter.js, plan och index-aktivering.
- PASS Safari (skärmbild/användarbekräftelse): »Spår i gränden«, »En försiktig allians«, relation 0, kvarstående val efter omladdning samt fungerande karta/kalender.
- Inte ett fullständigt test av alla svar.

## KB-03.6 – Mannen som försvann
- PASS GitHub: src/investigation.js, implementationsdokument och index med v=0361 i rätt ordning.
- PASS Safari (två skärmbilder): relation 0 ger »Ett löfte i mörkret« och ledtråd; relation +1 ger »Brevets avsändare« och ledtrådar.
- PASS enligt användaren: val/ledtrådar kvarstår efter omladdning, karta och kalender fungerar.
- EJ TESTAT: relation −1 och samtliga sex undersökningsval.

## KB-03.6.2 – Scen, dagbok och mobilnavigation
- Steg 1 GitHub PASS, Safari-skärmbilder visar att endast aktiv scen visas. Fullständig regression ej genomförd.
- Steg 2 GitHub PASS och Safari-skärmbilder: dagbok med berättelseval, relation +1 och ledtrådar.
- Steg 3 GitHub PASS, användaren bekräftade att mobilnavigationen såg bättre ut. Inte alla vyer regressionstestade separat.

## KB-03.6.3 – Hem och gemensam kalender
- Steg 1 GitHub PASS: index.html, navigation.js och home.js; användaren rapporterade att Hem fungerade i Safari.
- Steg 2 GitHub PASS: index.html, calendar.js och home.js; båda kalenderknapparna utlöser samma `kb:day-advanced`-händelse enligt kodgranskning.
- Safari-skärmbilder: datum 22 januari 1250, dag 22; dagshistorik och fem flikar synliga. **Visuell PASS**, men bilderna bevisar inte separat att båda knapparna loggar korrekt eller att loggen består efter omladdning.
- ÅTERSTÅR: separat PASS/FAIL för båda knapparna, omladdning och kontroll att befintlig karaktär/berättelse finns kvar.
- UX-förbättring IMP-023 dokumenterad och GitHub-verifierad; **inte implementerad**.

## Tvärgående risker vid tidigare teststopp (historisk status; se 2026-10-20 nedan)
- Ingen stabil unik karaktärsidentitet: namn/bakgrund kan återanvända äldre berättelsedata.
- Endast lokal webbläsarlagring, inte separata riktiga sparfiler.
- Historisk faktakontroll, mobil liggande läge och blockerad lagring är inte färdigtestade.
- Gammal Ragnhild-text hänvisar fortfarande till nästa paket.

---

## 2026-10-20 – IMP-025 3H.10–3H.11

| Paket | GitHub | Safari | Anmärkning |
| --- | --- | --- | --- |
| 3H.10.3–3H.10.6 | PASS inom testad omfattning | PASS enligt användaren | Sven skapad, byte tillbaka till Mk fungerade. |
| 3H.11.1 | PASS | Testpanelen kvar på bild | Korrigerad i 3H.11.2. |
| 3H.11.2 | PASS | PASS, bilder | Återläsningskontroll flyttad till avancerade verktyg. |
| 3H.11.3 | PASS | PASS, bilder och användarsvar | Hopfällbar bytespanel; Välj Erik öppnar den. |
| 3H.11.4 | PASS | PASS, bild och användarsvar | Nya kort; Välj Erik öppnar byteskontroll. |
| 3H.11.5 | PASS | PASS, bild | Ny profil, emblem, egenskaper, prototypetikett dold. |

**Öppna tester:** 3H.11.6 ej påbörjad. Full regression av berättelse, kalender, fler bakgrunder och sparningar återstår. Se `docs/DAILY_LOG.md`.
