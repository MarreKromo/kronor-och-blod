# KRONOR & BLOD — DAILY LOG / STOPP & START
Checkpoint 2026-10-21. Repo: `MarreKromo/kronor-och-blod` · `main`.
Spel: https://marrekromo.github.io/kronor-och-blod/

## STOPP — V2-04 NPC-kapitlet avslutat; samlad dokumentation
- V2-04 första NPC-grund: GitHub PASS, Safari PASS inom rapporterad omfattning.
- **V2-04R:** GitHub PASS; användaren rapporterade Safari PASS 6/6. Upprepade möten och separata journaler.
- **V2-04S:** GitHub PASS; användaren skrev 'Allt funkar' och skickade fyra Safari-bilder. Varierad dialog, råd vid +5 och kompaktare mobilvy.
- Gamla `.npc-life-v1`-minnen behålls. Nya `.npc-relations-v1`-möten är karaktärsbundna. Ingen migration eller reset.
- Äldre 'Ett bud väntar på svar' kvarstår i berättelsen; känd UI-skuld, inte ett nytt Safari-FAIL.
- Full ekonomiregression och backup/import kvarstår öppna.

## Bindande arbetsmetod
`docs/ARBETSMETOD.md` v3.0: läs faktisk GitHub-kod och relevanta dokument; leverera sammanhängande ZIP med repo-relativa filer; en commit; GitHub PASS/FAIL och Safari PASS/FAIL var för sig; ingen tyst migration; samlad dokumentation vid kapitelavslut.

## START — nästa session
1. Installera detta dokumentationspaket: fem `docs/`-filer, en commit, svara 'Klar'. Ingen spelkod och inget Safari-test.
2. Assistenten läser de fem dokumenten från GitHub och rapporterar GitHub PASS/FAIL.
3. Läs masterplanens resurs-/ekonomidel och äldre resursplaner innan V2-05. Redovisa vad som BEVARAS/ÄNDRAS; inget UTGÅR utan godkännande.
4. Läs aktuell `src/v2-economy.js`, `src/v2-skills.js`, `src/v2-travel.js`, `src/v2-npc-life.js`, UI och tester. Designa en säker karaktärs-/plats-/dagbunden resurskedja med definierade felvägar och återhämtning.
5. Leverera **ett större sammanhängande spelpaket V2-05**: NPC-behov ↔ lokala resurser ↔ arbete/marknad. Bevara `.economy-v1`, `.npc-life-v1` och `.npc-relations-v1` utan tyst migration.
6. Efter commit: verifiera GitHub och sedan Safari. Dokumentera nästa kapitel samlat när det godkänts.

## Ansvar
`MASTERPLAN_V2.md`: vision/funktionsregister. `ROADMAP.md`: prioritet. `SYSTEMS.md`: faktisk kod. `DEVLOG.md`: verifierad historik. `TESTS.md`: evidens. `DAILY_LOG.md`: checkpoint. `ARBETSMETOD.md`: bindande arbetsprocess.
