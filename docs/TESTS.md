# Testlogg – SVERIGE: Kronor & Blod
Uppdaterad: 2026-10-19
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

## Kvarstående tvärgående risker
- Ingen stabil unik karaktärsidentitet: namn/bakgrund kan återanvända äldre berättelsedata.
- Endast lokal webbläsarlagring, inte separata riktiga sparfiler.
- Historisk faktakontroll, mobil liggande läge och blockerad lagring är inte färdigtestade.
- Gammal Ragnhild-text hänvisar fortfarande till nästa paket.
