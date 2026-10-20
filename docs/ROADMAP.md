# KRONOR & BLOD — ROADMAP v3.0
**Status:** samordnad mål- och beroendeplan, 2026-10-21. Masterplan v3.0 är funktionsregistret. Äldre roadmap bevaras i Git-historiken och övriga äldre docs. **Planerat ≠ implementerat ≠ testat.**

## Bekräftat nuläge
- V2-03.2B–K: karaktärsseparering, kalender, berättelse, Mara/Edda-händelser och dagbok. V2-03.2K GitHub PASS och användarrapporterat Safari PASS inklusive byte och omladdning.
- Saknas som verklig färdig funktion: aktiv XP-/färdighetsmotor, rikare konsekvensbunden livsbakgrund, allmän aktivitets-/arbetsmotor, ekonomi, resor, generell NPC-autonomi, följeslagare, grupper, familje-/dynastisimulering, politisk simulering, krig och full backup/export för V2.

## Omedelbar ordning (små verifierbara paket)
1. **KB-DOC-04:** återställ hela visionen i de fyra styrdokumenten; dokumentpaket, GitHub PASS efter commit; ingen Safari-test behövs.
2. **V2-03.2L:** avgränsade interaktiva NPC-samtal på befintliga Mara/Edda-modeller; undvik parallell dialogmotor och sparrisker.
3. **V2-03.3A:** färdighetskatalog, grundegenskaper, bakgrundskontrakt, XP/nivåer, tidskostnad, balans och testmatris. Design före kod.
4. **V2-03.3B:** en aktivitet med verklig tidskostnad och en aktiv, karaktärsbunden färdighet; omladdning, karaktärsbyte och dubbelbelöningsskydd.
5. **V2-03.4:** rikare bakgrund och skapande, kontakter och balanserade konsekvenser; profil och UI-redesign i separata små steg.
6. **V2-03.5:** faktisk position och första resa, därefter platskunskap, färdsätt och resehändelser.
7. **V2-03.6:** arbete, försörjning, inventarium, första varorna, pengar och en begriplig lokal skuld-/handelskedja.

## Expansionsfaser – alla kvar i visionen
| Fas | Kärnleverans | Beroende / första test |
|---|---|---|
| V2-04 | Levande NPC:er, relationer, minnen, rutiner, hushåll | NPC gör något utan spelarens dialog; bestående följd |
| V2-05 | Produktion, marknader, löner, skulder, skatt, handel, verksamheter och egendom | Varor och pengar byter ägare korrekt, utan dubletter |
| V2-06 | Följeslagare, lärlingar, resesällskap och egna grupper | En rekryterad NPC behåller vilja, lojalitet och behov efter omladdning |
| V2-07 | Familj, giftermål, barn, åldrande, arv och generationer | Persistenta relationer och en säker succession i testscenario |
| V2-08 | Grupper växer: handelskompanier, rövarband, legosoldater, befäl, försörjning | Gruppens kostnader, medlemmar och beslut fungerar över tid |
| V2-09 | Politik, titlar, vasaller, adelshus, diplomati och dynamiska riken | Titel och faktisk kontroll hålls åtskilda |
| V2-10 | Borgar, härar, krig, förvaltning och rikesbildning | Logistik och ekonomi påverkar konflikter; inga gratis arméer |
| Löpande | Kartdesign, porträtt, ljud, UI, mobilprestanda, backup och regression | Inga estetiska ändringar får bryta speldata |

## Obligatorisk funktionsbevakning
- **Person:** ursprung, bakgrund, egenskaper, färdigheter, träning, hälsa, ålder, rykte, utrustning, yrken.
- **Vardag:** tid, vila, arbete, mat, resor, väder, aktiviteter, uppdrag, dagbok.
- **Samhälle:** NPC-autonomi, familjer, relationer, resurser, produktion, handel, priser, skuld, lön, skatt.
- **Ägande:** gårdar, verkstäder, handelsverksamhet, mark, byggnader, borgar och förvaltning.
- **Följen:** följeslagare, väpnare, grupper, handelskaravaner, rövarband, legosoldater, ledarskap, moral, försörjning.
- **Generationer:** giftermål, barn, död, arv, släktträd, hus, dynastier.
- **Makt:** titlar, adel, vasaller, allianser, politik, krig, arméer, förändrade riken.
- **Presentation:** spelbar karta, scener, dialoger, profil, inventarium, gruppvy, läsbar design och skyddad sparning.

## Kvalitetsgrindar
1. Varje funktion ska börja i spelupplevelsen på iPhone, inte i en extra panel.
2. Samma tids-/ekonomi-/NPC-modell ska återanvändas av arbete, följen och arméer.
3. Alla skrivningar har ägare, versionsregel, validering och återläsning. Export/backup prioriteras före storskalig världssimulering.
4. Varje ZIP: komplett fil, commit, GitHub PASS/FAIL, Safari PASS/FAIL när spelkod ändras.
5. Stora system får byggas i små vertikala spelkedjor; fasnummer är ordning, inte löfte om slutlig omfattning.
6. Ta inte bort tidigare mål utan uttryckligt godkännande; logga beslut och beroenden i dessa fyra huvuddokument.

## Spårbarhet
Grundat i `docs/DECISIONS.md` D-013–017, `docs/KB_PLAN_01_ROADMAP_GENOMGANG.md`, `docs/IMPROVEMENT_BACKLOG.md` IMP-014–025, `docs/V2_01_2_BERATTELSE.md`, `docs/V2_01_3_BLODSLINJER_OCH_MAKT.md`, `docs/V2_01_4_VISUELL_RIKTNING.md`, `docs/V2_02_2_ERSATTNINGSPLAN.md`, `docs/IMP025_3H12_2_BAKGRUNDSMODELL_PLAN.md` samt aktuell V2-masterplan/systemlogg. Historiska Sverige-specifika namn och datum följer inte med som fantasykanon.
