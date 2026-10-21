# KRONOR & BLOD — ARBETSMETOD v4.0
**Beslutad 2026-10-22. Denna version är bindande och ersätter motstridiga äldre rutiner.**

## OBLIGATORISKT: HELHETSDOKUMENTATION (KB-DOC-02)
Assistenten ska **själv föreslå och genomföra ett fullständigt dokumentationstillfälle** vid avslutat större funktionskapitel, efter flera sammanhängande leveranser, vid betydande produkt-/arkitekturbeslut och **innan byte till ny chatt när en längre utvecklingsperiod ska avslutas**. Projektägaren ska inte behöva påminna om detta. Vid osäkerhet ska assistenten föreslå ett sådant tillfälle, inte ersätta det med en ensam handoff-fil.

Ett helhetstillfälle är **ett sammanhängande ZIP-paket med kompletta ersättningsfiler i `docs/`**, inte ett ensamt nytt tilläggsdokument. Kontrollera och uppdatera samtliga relevanta befintliga filer:
1. `MASTERPLAN_V2.md`: bevara alla beslutade kärnsystem och framtida idéer; lägg endast till nya beslut och ändra inte vision utan godkännande.
2. `ROADMAP.md`: faktiskt läge, prioritering, beroenden och framtida arbets-ID:n; tidigare planerade delar får inte försvinna.
3. `SYSTEMS.md`: enbart tekniskt implementerat, konkreta filer, datakontrakt och kända begränsningar.
4. `DEVLOG.md`: leveranshistorik, versions-ID, GitHub- respektive Safari-status, öppna brister.
5. `TESTS.md`: verifierade tester och ej genomförd regression, med ärlig PASS/FAIL/ej testat.
6. `DAILY_LOG.md`: STOPP, senaste fungerande tillstånd, START, exakt nästa uppgift, viktiga risker och läsanvisning för nästa chatt.
7. `ARBETSMETOD.md`: ändra när själva processen förtydligas, som i detta paket.

**Genomförande:** Läs aktuell kod, alla relevanta docs och tidigare beslut i GitHub. Jämför plan mot implementation. Kontrollera att äldre godkända system finns kvar. Leverera kompletta ersättningsfiler med repo-relativa sökvägar i EN ZIP. Användaren installerar på iPhone och gör EN commit; assistenten verifierar alla ersatta filer från GitHub. Inget Safari-test för enbart docs. Märk dokumentationspaketet som lokalt förberett tills GitHub har kontrollerats. Lägg aldrig ett nytt ensamt handoff-dokument i stället för helhetsuppdateringen.

## Standardflöde för kodpaket — iPhone först
1. Läs aktuell kod och styrdokument från GitHub. Beskriv spelarflöde och berörda system.
2. Bygg ett logiskt sammanhängande, spelbart ZIP med kompletta filer och repo-relativa sökvägar. Bevara orelaterad kod och sparningar.
3. Uppdatera alltid JS/CSS-referensernas versionsparametrar i `index.html` för Safari-cache **i samma paket**. Kontrollera detta före leverans.
4. Användaren laddar upp och committar via iPhone. Assistenten läser filerna från GitHub och ger GitHub PASS/FAIL.
5. Användaren testar i Safari. Redovisa separat Safari PASS/FAIL och eventuella ej testade regressioner.
6. Vid kapitelavslut eller chattbyte: initiera KB-DOC-02 automatiskt.

## Skyddsregler
- Ingen tyst reset, migration eller radering av karaktärsdata; eventuella demodataändringar kräver förvarning och uttryckligt godkännande.
- Sparade data ska ha ägarskap, versionering, validering och återhämtningsplan; vid tid + XP + inventarium krävs skydd mot dubbelbelöning.
- Karta: inspektion får inte förbruka tid eller flytta karaktären; resor använder befintlig resemodell tills annat godkänts.
- Spelkänsla och iPhone-UX ingår i acceptans, inte bara teknisk funktion. Undvik staplade paneler och onödig scrollning.
- Prioritera större sammanhängande paket, inte mikropaket utan konkret risk. En ZIP, en commit och samlat test som standard.
- Skillnaden mellan BESLUTAT, PLANERAT, IMPLEMENTERAT och VERIFIERAT måste synas i dokumenten.
- `WORLD_ARCHITECTURE.md` och `MAP_01_APPROVED_IMPROVEMENTS.md` är bindande för kartarkitektur. V2-06 förblir reserverat för följeslagare.

## Tidigare rutiner och spårbarhet
Denna v4 konsoliderar ARBETSMETOD v3.0 (2026-10-21), v2.0 (2026-10-20) och KB-DOC-01 (2026-10-19). Äldre ordalydelse kan återfinnas i Git-historiken. Inga tidigare produktbeslut stryks genom att arbetsmetoden konsolideras. Ändringar av produktvision hör hemma i masterplanen och kräver separat godkännande.
