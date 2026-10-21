# KRONOR & BLOD — DEVLOG
Uppdaterad 2026-10-21. Dornmark. Historisk Sverige-utveckling finns i Git-historiken.

## Verifierade leveranser
| Version | GitHub | Safari | Omfattning |
|---|---|---|---|
| V2-03.2L | PASS | PASS enligt användaren | NPC-samtal |
| V2-03.3B | PASS | PASS enligt användaren | Jordbruk, XP, tid |
| V2-03.5 | PASS | PASS enligt användaren | Position och resa |
| V2-03.6 | PASS | Delvis | Arbete, lön, spannmål, köp |
| V2-03.6L | PASS | Begränsat PASS | Svenska ord, myntvisning |
| V2-03.7 | PASS | PASS 5/5 | Resa och dagbyte utan bekräftelser |
| V2-03.8 | PASS | PASS i visad omfattning | Mobilvy platser/arbete/handel |
| V2-03.9 | PASS | PASS i visad omfattning | Rätt arbetsplats, sparning efter omladdning |
| **V2-04 KOMPLETT** | **PASS** | **PASS i visad och rapporterad omfattning** | Mara, Toren, Edda, platsbundenhet, NPC-minne och omladdning |

## V2-04 — avslutad första NPC-grund
Fyra GitHub-filer verifierades: `index.html`, `src/v2-npc-life.js`, `src/v2-npc-life-ui.js`, `src/v2-npc-life.css`. Användarens Safari-bilder visade Mara och Toren i Keldra, sparade möten dag 26 (+2/+1), Edda i Dorneth och hennes sparade möte från dag 27 synligt dag 29 (+2). Användaren bekräftade att minnen kvarstod efter omladdning och att Edda visas efter resa. Befintliga pengar/spannmål syntes oförändrade i en separat bild. Ingen fullständig regression av samtliga möjliga sparfel eller karaktärsbyte är utförd.

## Produktbeslut och öppna frågor
- NPC:er ska minnas tidigare händelser medan vardagsrutiner fortsätter med tiden. Första versionen ger bara ett möte per NPC; nästa större paket ska möjliggöra återkommande, konsekvensfulla möten.
- Undvik ytterligare staplade paneler i Berättelsefliken; iPhone-upplevelsen är ett acceptanskriterium.
- V2-04 avser NPC:er, relationer och hushåll; V2-05 avser resurser, produktion och ekonomi. Ingen äldre resursvision tas bort. Full jämförelse med Sverige-dokumenten återstår.
- `ARBETSMETOD.md` v3.0 är bindande: större sammanhängande paket, normalt en commit, GitHub PASS och Safari PASS separat. Dokumentation uppdateras samlat vid kapitelavslut.

## Nästa
Fördjupa V2-04 med upprepade NPC-möten, relationseffekter, datakompatibilitet och förbättrad mobilpresentation. Planera säkra sparregler och regression före kodpaket. Full ekonomiregression och backup/import är fortfarande öppna.
