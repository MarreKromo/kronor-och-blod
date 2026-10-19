# Arbetsmetod – SVERIGE: Kronor & Blod

Beslutad: 2026-10-19

## Grundprincip: iPhone först
Projektägaren utvecklar via iPhone, Safari och GitHubs webbgränssnitt. Arbetsflödet ska därför inte kräva dator, terminal eller manuell redigering av långa kodfiler.

## Standardflöde för varje litet utvecklingspaket
1. Assistenten granskar aktuella filer i GitHub innan ändringar förbereds.
2. Assistenten levererar en nedladdningsbar ZIP med kompletta, färdiga filer och tydlig sökväg för varje fil. Befintliga filer ändras minimalt och övrig fungerande kod bevaras.
3. Användaren packar upp ZIP på iPhone och laddar upp/ersätter angivna filer via GitHub. En fil eller ett litet steg i taget när riskerna motiverar det.
4. Användaren committar och svarar "Klar".
5. Assistenten kontrollerar filernas innehåll och placering direkt på GitHub och rapporterar PASS/FAIL. Assistenten ska inte påstå sig ha committat eller laddat upp filer om det inte faktiskt skett.
6. Användaren testar den publicerade GitHub Pages-versionen i Safari och rapporterar PASS/FAIL. GitHub-kontroll och Safari-test är olika verifieringar.
7. Efter godkänt test uppdateras docs/TESTS.md och docs/DAILY_LOG.md, inklusive återstående tester och nästa exakta steg.

## Regler
- Inga instruktioner som kräver att användaren söker bland hundratals rader i index.html när en färdig ersättningsfil är möjlig.
- Inga onödiga omskrivningar eller samtidiga stora förändringar.
- Befintliga lokala sparfiler ska behållas; eventuell migration ska planeras och testas.
- Varje ZIP ska verkligen skapas och kontrolleras innan en nedladdningslänk ges.
- Dokumentera designbeslut, testresultat, begränsningar och exakt nästa steg.
- Undvik att förklara ett steg som PASS innan relevanta tester är genomförda.

## Teknisk plan
På kort sikt ersätts hela index.html via färdig fil när ändring behövs. På längre sikt delas den stora filen upp i mindre moduler, exempelvis src/app.js, src/map-ui.js och assets/styles.css. Uppdelningen görs i ett separat, litet och testbart paket; inte samtidigt med orelaterade funktioner.

## Aktuell situation
KB-03.3: src/character-profile.js finns på GitHub. Nästa steg är en färdig uppdaterad index.html som laddar profilen efter src/character-ui.js, följt av GitHub-verifiering och Safari-test. Dokumentation av designbeslut om spelbar manlig huvudkaraktär och framtida kvinnliga spelkaraktärer görs i KB-03.3-paketets dokumentationssteg.
