# KRONOR & BLOD — TESTS
Uppdaterad 2026-10-22. PASS, FAIL och ej testat skiljs strikt.

## Tidigare verifieringar
- V2-03.2L NPC-samtal; V2-03.3B jordbruk/XP/tid; V2-03.5 resa; V2-03.6/L delvis ekonomi och språk/mynt.
- V2-03.7 resa/dagbyte PASS 5/5; V2-03.8–.9 mobilvy/platsbundet arbete PASS i visad omfattning.
- V2-04/R/S NPC-möten, relationer, dagspärr, dialog och råd; tidigare GitHub/Safari PASS i rapporterad omfattning.
- V2-05A–D produktion, lager, leveranser, marknad och autonom produktion; tidigare PASS i rapporterad omfattning.
- V2-05E UI lagerkort/försörjning; V2-05F separata ortsvyer, resa och inspektion; tidigare begränsade PASS.

## MAP-01 — verifierad status
- MAP-01.5–01.6: GitHub-kontroller i tidigare steg; Safari-bilder visar brister.
- MAP-01.6B: GitHub PASS inklusive cachefix; begränsat Safari PASS för visad funktion, ej slutgodkänd grafik.
- MAP-01.7–01.13C: tidigare kartpaket och Safari-bilder; inte bevis för full regression.
- **MAP-01.13D: Safari FAIL** — broar felplacerade, blå ovaler, dåliga vägar och platt borg.
- **MAP-01.13E: GitHub PASS** — fyra filer kontrollerade i repo efter commit.
- **MAP-01.13E: Safari FAIL** — tre skärmbilder visar överlappande hus/lager, försämrad borg och saknad kringbebyggelse, bro-/vägproblem. Ingen visuell acceptans.
- **MAP-01.13F: EJ IMPLEMENTERAT, EJ TESTAT.**

## Acceptanskriterier för MAP-01.13F
1. Äldre hus och dekorationslager får inte lysa igenom eller täckas av fel terräng.
2. Varnholds murar, torn, borggård, huvudbyggnad och omgivande hus ska vara tydliga både utzoomat och inzoomat.
3. Broar ligger över verkliga flodsträckningar; inga blå ovaler eller lösa plankor.
4. Vägbredd, broanslutning och korsningar är konsekventa och naturliga.
5. Dorneths kvarn, marknadsbebyggelse och Keldras åkrar/hus bevaras.
6. Zoom, panorering, Berg, Här är du, ortval och omladdning fungerar.
7. Inspektion kostar ingen tid, resa och sparningar är oförändrade.
8. GitHub PASS och Safari PASS krävs separat; skärmbilder före/efter på iPhone.

## Öppna regressioner — INTE PASS
- Karaktärsbyte, save/restore, pan/zoom/pinch, små skärmar, tillåten/spärrad resa.
- Ekonomi: dubbelbelöning, pending-återhämtning, ägarseparation, korrupt lagring.
- Långtidstest: produktion, leveranser, marknad, kalender och NPC-journaler.
- Backup/export/import, samspel med äldre Edda-scen.
- Framtida resehändelser: datamodell, risker, tid, val och anti-repetition; ej implementerat.

## Dokumentationspaket
KB-DOC-02 uppdaterar enbart `docs/`. Kontrollera ersättningsfiler efter commit. **Inget Safari-test för dokument.**
