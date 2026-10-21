# KRONOR & BLOD — DAILY LOG / STOPP & START
Aktuell checkpoint 2026-10-21. Fantasyversionen Dornmark. Äldre Sverige-logg är historiskt arkiv i Git-historiken för denna fil.

## STOPP — V2-03.7 godkänd; KB-DOC-06 väntar på commit
**Repo:** `MarreKromo/kronor-och-blod` · branch `main` · spel `https://marrekromo.github.io/kronor-och-blod/`.

### Senast avslutat
- V2-03.5: position, resa och platsbundet arbete, GitHub PASS, användarrapporterad Safari PASS.
- V2-03.6: jordbruk i Keldra (+1 dag, +10 XP, +3 koppar, +1 spannmål) och köp i Dorneth (−2 koppar, +1 spannmål), GitHub PASS. Full separat ekonomiregression återstår.
- V2-03.6L: tydligare svenska, koppar aktivt, silver/guld framtida och ännu inaktiva. GitHub PASS; Safari PASS inom användarens visade omfattning.
- **V2-03.7: GitHub PASS; Safari PASS 5/5 enligt användaren.** Resa och ”Fortsätt dagen” sker utan bekräftelse, +1 dag vardera. Omladdning, ekonomi, XP, berättelse, dagbok och karaktärsbyte godkända inom avgränsade testfall. Bekräftelser för arbete och köp är kvar.

### Arbetsmetod — får inte glömmas
- `docs/ARBETSMETOD.md` **v3.0** gäller framför äldre instruktioner.
- **Större, logiskt sammanhängande ZIP-paket** som standard, inte rutinmässiga mikropaket.
- Assistenten granskar aktuell GitHub-kod och docs före varje paket, levererar fullständiga repo-relativa filer i verifierad ZIP. Användaren arbetar endast på iPhone och gör normalt **en commit per paket**.
- Assistenten läser GitHub efter commit och rapporterar **GitHub PASS/FAIL**. Användaren testar spelkod i Safari och rapporterar **Safari PASS/FAIL**. Dokumentationspaket kräver inte Safari-test.
- Dokumentation uppdateras **samlat vid avslutat funktionskapitel eller viktigt beslut**; inte efter varje liten ändring.
- Ingen tyst reset, migration, förlust av karaktärer eller ändring av orelaterade spelmekaniker. Spelkänsla och mobilflöde ingår i acceptans.

### Dokumentens ansvar
- `MASTERPLAN_V2.md`: enda aktuella spelvisionen (Masterplan v3.0).
- `ROADMAP.md`: prioriteringar och beroenden.
- `SYSTEMS.md`: faktiskt implementerade system och begränsningar.
- `DEVLOG.md`: verifierad leveranshistorik och beslut.
- `TESTS.md`: GitHub/Safari-teststatus och öppna kontroller.
- `DAILY_LOG.md`: senaste STOPP/START och exakt återstartpunkt.
- `ARBETSMETOD.md`: bindande processregler.

### Nästa exakta START
1. Användaren packar upp **KB-DOC-06 komplett** med fem docs-filer, ersätter motsvarande filer i `docs/`, gör en commit och svarar ”Klar”.
2. Assistenten verifierar **alla fem** filer i GitHub och rapporterar PASS/FAIL. Inget Safari-test krävs, eftersom ingen spelkod ändras.
3. Läs därefter aktuell Masterplan, Roadmap, Systems, Devlog, Arbetsmetod och relevant spelkod. Föreslå nästa **större sammanhängande spelpaket** med avgränsad säkerhets- och ekonomiregression; inga nya mekaniker utan godkänt scope.

## Historiskt arkiv — SVERIGE: Kronor & Blod
Den tidigare `docs/DAILY_LOG.md` innehöll utförlig utvecklingshistorik från 19–20 oktober 2026: `KB-01`–`KB-03`, `IMP-023`–`IMP-025`, `J-H`–`J-L`, `A2` och äldre STOPP-punkter. Allt detta är bevarat i **Git-historiken för filen**, inte aktiv instruktion för fantasyversionen. Äldre resultat och datum får inte användas som bevis för nya V2-funktioner. För att läsa originalet: öppna filens History i GitHub och välj commit före KB-DOC-06.
