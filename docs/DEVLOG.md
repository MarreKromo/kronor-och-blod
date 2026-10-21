# KRONOR & BLOD — DEVLOG
Uppdaterad 2026-10-22. Status skiljer kodexistens, GitHub och Safari.

## Tidigare V2-milstolpar
| Version | GitHub | Safari | Omfattning |
|---|---|---|---|
| V2-03.2L | PASS | PASS enligt användaren | NPC-samtal |
| V2-03.3B | PASS | PASS enligt användaren | Jordbruk, XP, tid |
| V2-03.5 | PASS | PASS enligt användaren | Position och resa |
| V2-03.6/L | PASS | Delvis | Ekonomi, svenska ord och mynt |
| V2-03.7 | PASS | PASS 5/5 | Resa/dagbyte utan bekräftelser |
| V2-03.8–.9 | PASS | PASS i visad omfattning | Mobilvy, arbetsplats, omladdning |
| V2-04/R/S | PASS | PASS i rapporterad omfattning | NPC-möten, förtroende, dialog, råd vid +5 |
| V2-05A–D | PASS enligt tidigare kontroller | PASS i tidigare rapporterad omfattning | Produktion, leveranser, marknad och bakgrundsproduktion |
| V2-05E | PASS | PASS för UI | Lagerkort och hopfällbar försörjningsvy |
| V2-05F | PASS | PASS i visad omfattning | Separata ortsvyer, inspektion och resa |
| NAV-01–04 | Tidigare levererat | Visuell Safari-granskning i rapporterad omfattning | Mobilnavigation |

## MAP-01 — kartkapitel och kvalitetsarbete
| Version | GitHub | Safari | Resultat |
|---|---|---|---|
| MAP-01.3–01.4 | Tidigare levererat | Bilder i tidigare chattar | Geografisk Dornmarkkarta, större terräng och Berg-knapp |
| MAP-01.5 | Filkontroll PASS tidigare | Visuellt ej slutgodkänd | Cartography Quality Pass; skarvar och bergproblem |
| MAP-01.6 | Filkontroll PASS tidigare | Bilder visade kvalitetsbrister | Unified Terrain Renderer |
| MAP-01.6B | **PASS**: JS, CSS, testfil och cachefix `index.html` lästa från GitHub | **Begränsat PASS**: användaren säger att allt verkar fungera; två skärmbilder visar normal vy och Berg-vy | Bättre berg/skogsdetaljer, men karta upplevs mindre, geometriska berg och skogar, brist på terrängvariation. Ingen full regression |

**Viktig cachelärdom:** MAP-01.6B:s första ZIP saknade uppdaterade JS/CSS-versioner i `index.html`; separat cachefix behövdes. Från och med ARBETSMETOD v4 ska cacheversionering alltid ingå i samma kodpaket.

## Produktbeslut och återstående arbete
- MAP-01.7 är nästa planerade **visuella** redesign; inga nya resmekaniker i detta paket.
- Den äldre idén `MAP-01.4 – World Locations & Travel Encounters` kvarstår som **planerat, inte byggt**. Nummerkonflikt med redan använd MAP-01.4 kartutbyggnad ska lösas före implementation.
- V2-06 förblir reserverat för följeslagare. Inga tidigare system stryks.
- Full regression, säker backup/export/import och långtidstester kvarstår.

## Dokumentationstillfälle KB-DOC-02, 2026-10-22
Helhetsuppdatering av befintliga dokument, inklusive bindande arbetsmetod v4.0. Detta paket ändrar endast `docs/`. **Lokal paketkontroll är inte GitHub PASS.** GitHub-kontroll görs efter användarens commit; inget Safari-test behövs för docs.
