# KRONOR & BLOD — DEVLOG
Uppdaterad 2026-10-21. Dornmark.

## Verifierade leveranser
| Version | GitHub | Safari | Omfattning |
|---|---|---|---|
| V2-03.2L | PASS | PASS enligt användaren | NPC-samtal |
| V2-03.3B | PASS | PASS enligt användaren | Jordbruk, XP, tid |
| V2-03.5 | PASS | PASS enligt användaren | Position och resa |
| V2-03.6 | PASS | Delvis | Ekonomi; full regression öppen |
| V2-03.6L | PASS | Begränsat PASS | Svenska ord, myntvisning |
| V2-03.7 | PASS | PASS 5/5 | Resa och dagbyte utan bekräftelser |
| V2-03.8 | PASS | PASS i visad omfattning | Mobilvy platser/arbete/handel |
| V2-03.9 | PASS | PASS i visad omfattning | Rätt arbetsplats, omladdning |
| V2-04 | PASS | PASS i rapporterad omfattning | Tre NPC:er, rutiner, första minnet |
| **V2-04R** | **PASS** | **PASS 6/6 enligt användaren** | Upprepade möten, förtroende, historik, dagspärr, separata journaler |
| **V2-04S** | **PASS** | **PASS enligt användaren, skärmbilder granskade** | Varierade repliker, +5-upplåst råd, kompakt mobilvy |

## V2-04 NPC-kapitlet — avslut
- V2-04R: GitHub-verifiering av `index.html`, tre `src/v2-npc-life*`-filer och testfil. Användaren rapporterade Safari PASS 6/6. Äldre minnen bevaras och upprepade möten sparas separat.
- V2-04S: samma fyra körfiler samt nytt testskript GitHub-verifierade. Lokala Node-tester PASS för äldre sparningar, dagspärr, förtroendetröskel, repliker, ägarseparation, platskontroll och korrupt lagring.
- Användarens Safari-bilder visade Mara +6 efter 3 möten och upplåst skördefråga; Edda +7 efter 4–5 möten, upplåst handelsfråga och svar om leveranser. Hopfällbara sektioner och sparad historik syntes. Användaren skrev 'Allt funkar'.
- Godkänt inom prototypens verifierade omfattning. Detta är **inte** bevis för full NPC-autonomi eller full ekonomiregression.

## Nästa
V2-05: inventera äldre resursvision mot masterplan, utforma ägande/lagring/tid/transaktionsskydd och leverera en spelbar NPC–resurs–marknadskedja i ett sammanhängande paket. Gamla sparnycklar bevaras. Fortsatt separat GitHub- och Safari-verifiering.
