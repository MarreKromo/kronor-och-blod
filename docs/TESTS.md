# KRONOR & BLOD — TESTS
Uppdaterad 2026-10-21. Endast verifierade resultat.

## Aktiva resultat
| Paket | GitHub | Safari | Omfattning |
|---|---|---|---|
| V2-03.2L | PASS | PASS enligt användaren | NPC-samtal |
| V2-03.3B | PASS | PASS enligt användaren | Jordbruk, XP, tid |
| V2-03.5 | PASS | PASS enligt användaren | Resa |
| V2-03.6 | PASS | Delvis | Ekonomi; full regression öppen |
| V2-03.6L | PASS | Begränsat PASS | Språk och mynt |
| V2-03.7 | PASS | PASS 5/5 | Dagbyte och resa |
| V2-03.8 | PASS | PASS i visad omfattning | Mobilvy |
| V2-03.9 | PASS | PASS i visad omfattning | Jordbruk på aktuell plats |
| V2-04 | PASS | PASS i rapporterad omfattning | Första NPC-minnen |
| **V2-04R** | **PASS** | **PASS 6/6, användarrapport** | Upprepade möten, dagspärr, relationer, omladdning, Edda, ekonomi |
| **V2-04S** | **PASS** | **PASS, användarrapport + fyra bilder** | Förtroendestyrt råd, varierade repliker, hopfällbar vardag, historik |

## V2-04R evidens
- Samtliga fem filer lästes efter commit direkt från GitHub. Kodkontroll av separata journaler och upprepade möten.
- Lokalt Node-test PASS för äldre sparningar, dagspärr, karaktärsbyte, platskontroll och korrupt lagring.
- Användaren rapporterade Safari PASS 6/6. Bilder visade Edda +3/2 möten till +5/3 möten och varierande dagsrutiner.

## V2-04S evidens
- Fem filer kontrollerades direkt från GitHub; cacheversioner `2043` verifierade.
- Två lokala Node-testsviter PASS: äldre sparningar, rådtröskel +5, dagspärr, varierande dialog, ägarseparation, plats och korrupt journal.
- Fyra Safari-skärmbilder visar Mara +6/3 möten, Edda +7/4–5 möten, upplåsta frågor och hopfällbara sektioner. Användaren bekräftade 'Allt funkar'.
- Skärmbilder ensamma bevisar inte alla ekonomiska felvägar; användarens funktionsrapport gäller den testade spelupplevelsen.

## Öppna tester
1. Full V2-03.6 ekonomiregression: saldo, dubbelbelöning, avbrott, pending, ägarseparation, korrupt lagring.
2. NPC långtidstest med full 3-dagars cykel och maxgräns för journalen.
3. Full regression av äldre Edda-berättelsemöte och nya NPC-vardagsmöten tillsammans.
4. Backup/export/import för V2 och återställning vid skadade data.
5. V2-05: världslager, NPC-behov, resursbalans och idempotens; **inte testade ännu**.
