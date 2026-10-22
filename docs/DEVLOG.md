# KRONOR & BLOD — DEVLOG
Uppdaterad 2026-10-22. Kodexistens, GitHub-kontroll och Safari-resultat redovisas separat.

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
| V2-05A–D | PASS enligt tidigare kontroller | PASS i tidigare omfattning | Produktion, leveranser, marknad, bakgrundsproduktion |
| V2-05E | PASS | PASS för UI | Lagerkort och hopfällbar försörjningsvy |
| V2-05F | PASS | PASS i visad omfattning | Separata ortsvyer |
| NAV-01–04 | Tidigare levererat | Tidigare visuell granskning | Mobilnavigation |

## MAP-01 historik
| Version | GitHub | Safari | Bedömning |
|---|---|---|---|
| MAP-01.3–01.4 | Tidigare levererat | Bilder i tidigare chattar | Dornmarkkarta, större terräng, Berg |
| MAP-01.5–01.6 | Tidigare filkontroll PASS | Visuella brister | Kartterräng och berg |
| MAP-01.6B | PASS inklusive cachefix | Begränsat PASS | Bättre terräng, ej slutgodkänd |
| MAP-01.7–01.13C | Tidigare paket levererade | Bilder visar utveckling | Ortgrafik, huvudborg, åkrar, vägar, broar; flera brister |
| MAP-01.13D | Tidigare GitHub PASS | **FAIL** | Felaktiga broar, blå ovaler, platt borg, vägproblem |
| MAP-01.13E | **PASS** för `index.html`, JS, CSS och testfil | **FAIL** 2026-10-22, tre bilder | Gamla hus syns igenom, borgmurar och kringhus försämrade/försvunna, väg- och broproblem kvar |

## Beslut efter Safari FAIL 13E
- **STOPP.** Ingen ny kartfunktion före visuell återställning.
- Nästa kodpaket: `MAP-01.13F – Visual Recovery & Layer Cleanup`, ännu ej implementerat.
- Orsaksanalys och jämförelse med tidigare fungerande kartfiler krävs före ny ZIP. Undvik nya grafiska överlägg som maskerar problem.
- Varnhold ska återfå sin huvudborg och omgivande bebyggelse; Dorneth och Keldra ska bevara sin ortidentitet.
- Bergsby, gruva och naturresurser är fortfarande planerade, ej byggda.
- `MAP-01.4 – World Locations & Travel Encounters` bevaras som separat planerat kapitel med ID-konflikt att lösa.

## KB-DOC-02 — STOPP 2026-10-22
Helhetsdokumentation för nattstopp. Endast `docs/` ändras. Lokal ZIP-kontroll är inte GitHub PASS; kontroll sker efter commit. Inget Safari-test krävs för dokumentationspaket.
