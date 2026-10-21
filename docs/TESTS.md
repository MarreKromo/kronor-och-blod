# KRONOR & BLOD — TESTS
Uppdaterad 2026-10-21. **Aktiv testlogg för fantasyversionen Dornmark.** Historiska tester för ”SVERIGE: Kronor & Blod” är bevarade i Git-historiken för denna fil och ska inte tolkas som PASS för fantasyvärlden.

## Aktiva fantasytester
| Paket | GitHub | Safari | Verifierad omfattning |
|---|---|---|---|
| V2-03.2L | PASS | PASS enligt användaren | NPC-samtal |
| V2-03.3B | PASS | PASS enligt användaren | Jordbruksaktivitet, tidskostnad och XP |
| V2-03.5 | PASS | PASS enligt användaren | Position, resor, platsbundet arbete |
| V2-03.6 | PASS | Delvis | Försörjningskedja implementerad; full ekonomiregression ej formellt avslutad |
| V2-03.6L | PASS | PASS inom visad omfattning | Språk och visning av pengar/varor; ej full regression |
| **V2-03.7** | **PASS** | **PASS 5/5 enligt användaren** | Två bekräftelser borttagna utan regressionsfel i avgränsad kontroll |

### V2-03.7 — fem godkända Safari-kontroller
1. Dorneth → Keldra: ingen resebekräftelse, exakt +1 dag.
2. ”Fortsätt dagen”: ingen bekräftelse, exakt +1 dag.
3. Omladdning: datum och position kvar.
4. Pengar, spannmål och jordbruks-XP påverkas inte av resa eller vanlig dagframmatning.
5. Berättelse, dagbok och karaktärsbyte fungerar fortsatt.

**Källa för Safari-status:** användaren rapporterade uttryckligen ”V2-03.7 Safari PASS: Alla fem tester godkända.” GitHub-status grundas på separat filkontroll. Detta är inte en fullständig säkerhetsgranskning.

## Öppna tester
- V2-03.6: komplett ekonomi- och arbetsregression, inklusive otillräckligt saldo, avbrott, dubbelbelöningsskydd, ägarseparation och felaktig lagring.
- Bred regression av alla berättelsegrenar, NPC-val och olika bakgrunder.
- Backup/import och felhantering i den nya fantasyversionens sparformat.

## Historiskt arkiv — tidigare projekt
Föregående version av denna fil dokumenterade `KB-01`–`KB-03.6`, `IMP-025`, `J-H`–`J-L` och `A2.1`–`A2.6` för historiska Sverige-projektet. De detaljerade gamla testresultaten finns kvar i **Git-historiken för `docs/TESTS.md`**, inklusive begränsningar och ursprungliga PASS/FAIL. De är **inte** omklassificerade till Dornmark-tester. Historisk backup- och återställningsverifiering gäller inte automatiskt V2-sparningar.
