# KRONOR & BLOD — DAILY LOG / STOPP & START
Checkpoint 2026-10-21. Dornmark. Äldre Sverige-logg finns i filens Git-historik.

## STOPP — V2-04 första NPC-grunden testad; dokumentationspaket för commit
**Repo:** `MarreKromo/kronor-och-blod` · `main` · `https://marrekromo.github.io/kronor-och-blod/`.

### Senast avslutat
- V2-03.7: GitHub PASS, Safari PASS 5/5, resa och dagbyte utan bekräftelse.
- V2-03.8: förbättrad mobilvy, GitHub PASS, Safari PASS i visad omfattning.
- V2-03.9: aktuell reseposition styr jordbruksarbete, GitHub PASS; Safari PASS i visad omfattning och bekräftad omladdningssparning.
- **V2-04 KOMPLETT:** tre platsbundna NPC:er, deterministiska rutiner och behov, ett första möte och karaktärsbundet minne/förtroende. GitHub PASS. Safari PASS inom visad och användarrapporterad omfattning, inklusive omladdning och Edda i Dorneth. Dag 29 visade Edda ett minne från dag 27. Full karaktärsbytes- och felvägsregression återstår.

### Arbetsmetod — bindande
- `docs/ARBETSMETOD.md` **v3.0** gäller framför äldre instruktioner. Större logiskt sammanhängande ZIP-paket som standard; små paket bara vid motiverad teknisk risk.
- Före paket: läs faktisk GitHub-kod och docs. Leverera verifierad ZIP med fullständiga repo-relativa filer, iPhone-vänlig installation, normalt en commit.
- Efter commit: assistenten verifierar GitHub och anger PASS/FAIL. Användaren testar Safari och rapporterar PASS/FAIL. Dokumentationspaket behöver inte Safari-test.
- Inga tysta återställningar, migrationer eller förändringar av orelaterade system. Spelkänsla, mobilscrollning och säker sparning ingår i kvaliteten.
- Dokumentera samlat vid kapitelavslut; inte mikropaket för varje liten ändring.

### Dokumentansvar
- `MASTERPLAN_V2.md`: enda aktuella produktvisionen (masterplan v3.0).
- `ROADMAP.md`: prioriteringar och framtida beroenden.
- `SYSTEMS.md`: faktiskt implementerat och begränsningar.
- `DEVLOG.md`: verifierade leveranser och beslut.
- `TESTS.md`: GitHub-/Safari-status och öppna tester.
- `DAILY_LOG.md`: STOPP/START.
- `ARBETSMETOD.md`: bindande arbetsflöde.

### Nästa exakta START
1. Ladda upp **KB-DOC-V204** med fem dokumentfiler i `docs/`, en commit, svara ”Klar”. Ingen spelkod ändras och inget Safari-test krävs.
2. Assistenten hämtar alla fem filer från GitHub och rapporterar GitHub PASS/FAIL.
3. Läs därefter senaste NPC-kod, kalender, resor, befintliga berättelsemöten, relevanta dokument och sparkontrakt. Utforma **ett större sammanhängande V2-04-paket** för återkommande möten, relationseffekter och bättre mobilflöde.
4. Säkerställ kompatibilitet med befintliga `.npc-life-v1`-minnen utan tyst migration eller reset. Separata GitHub- och Safari-tester. Full ekonomiregression förblir öppen.

## Historiskt arkiv
Tidigare Sverige-utveckling (`KB-01`–`KB-03`, `IMP-023`–`IMP-025`, `J-H`–`J-L`, `A2`) finns i Git-historiken och är inte automatiskt godkända Dornmark-tester.
