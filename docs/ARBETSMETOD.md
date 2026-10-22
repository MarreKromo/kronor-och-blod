# KRONOR & BLOD — ARBETSMETOD v4.1
**Uppdaterad 2026-10-22. Bindande process.**

## KB-DOC-02 — obligatoriskt helhetsdokumentationstillfälle
Assistenten ska **själv initiera** helhetsdokumentation vid större ändringar, avslutade kapitel, längre utvecklingspass och chattbyte. Användaren ska inte behöva påminna. Vid STOPP för natten genomförs dokumentation och checkpoint före nästa kodpaket.

Ett helhetstillfälle ska bestå av **en ZIP med kompletta ersättningsfiler**, inte bara en ensam handoff. Kontrollera alltid:
1. `MASTERPLAN_V2.md` — bevara produktvision och tidigare beslut; uppdatera vid nya produktbeslut.
2. `ROADMAP.md` — aktuell status, beroenden och kommande arbets-ID.
3. `SYSTEMS.md` — endast verifierbar implementation, filer och begränsningar.
4. `DEVLOG.md` — leveranshistorik och GitHub-/Safari-status.
5. `TESTS.md` — PASS, FAIL, ej testat och regression.
6. `DAILY_LOG.md` — STOPP/START, senaste läge, exakt nästa steg och läsanvisning.
7. `ARBETSMETOD.md` — ändra när processen behöver förtydligas.

**Granska samtliga sju.** Filer utan ändringsbehov ska behållas oförändrade, inte skrivas om i onödan. Uppdatera flera relevanta befintliga dokument i samma ZIP. Ingen separat ny stoppfil ersätter helheten.

## Kodleveranser — iPhone först
1. Läs aktuell kod och styrdokument från GitHub före implementation.
2. Identifiera ursprunglig SVG-geometri och ritordning före visuella ändringar. **Bygg inte ytterligare visuella överlägg för att dölja felaktiga överlägg.**
3. Gör en avgränsad sammanhängande ZIP med kompletta repo-relativa filer och lokala tester.
4. Uppdatera alla ändrade JS/CSS-cacheversioner i `index.html` i samma ZIP.
5. En commit via iPhone → GitHub PASS/FAIL efter kontroll av faktiska filer → Safari PASS/FAIL efter skärmbilder och interaktionstest.
6. **Kodtest PASS är inte visuell Safari PASS.** En visuellt försämrad leverans markeras FAIL och nästa steg ska vara återställning/orsaksanalys.
7. Vid avslut/chattbyte: kör KB-DOC-02 automatiskt.

## Skyddsregler
- Inga tysta ändringar i sparningar, kalender, NPC, ekonomi, resor, ort-ID:n eller positioner.
- Kartinspektion förbrukar inte tid. Keldra–Dorneth tillgänglig, Varnhold spärrad enligt befintlig resemodell.
- Separera BESLUTAT / PLANERAT / IMPLEMENTERAT / VERIFIERAT.
- Bevara tidigare fungerande detaljer vid grafiska korrigeringar. Jämför före/efter vid både standardzoom och inzoomning.
- `WORLD_ARCHITECTURE.md` och `MAP_01_APPROVED_IMPROVEMENTS.md` förblir bindande.
- V2-06 är reserverat för följeslagare.
- Ingen full regression får påstås utan utförda tester.

## Historik
v4.1 förtydligar v4.0 (KB-DOC-02) med STOPP-rutin och obligatorisk visuell återställningskontroll. Äldre arbetsmetod v3.0/v2.0 och KB-DOC-01 finns i Git-historiken.
