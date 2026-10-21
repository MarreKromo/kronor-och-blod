# KRONOR & BLOD — ROADMAP v3.3
Uppdaterad 2026-10-21. Aktiv värld: Dornmark. `MASTERPLAN_V2.md` är överordnad. `ARBETSMETOD.md` v3.0 gäller.

## Verifierade milstolpar
- V2-03.2L–V2-03.9: karaktärer, berättelse, NPC-händelse, kalender, jordbruks-XP, resa, platsbundenhet, koppar och spannmål; se DEVLOG/TESTS för exakt testomfattning.
- V2-04 första NPC-grunden: Mara/Toren i Keldra, Edda i Dorneth, rutiner, behov och första minnet. GitHub PASS; Safari PASS i rapporterad omfattning.
- **V2-04R: GitHub PASS; Safari PASS 6/6 enligt användaren.** Upprepade möten, förtroende, möteshistorik, dagspärr och karaktärsseparata journaler.
- **V2-04S: GitHub PASS; Safari PASS enligt användaren och skärmbilder.** Varierade repliker, förtroendestyrt informationsval vid +5, kompaktare mobilvy. Ingen ekonomisk belöning.
- **V2-04 NPC-kapitlet avslutat inom denna prototypomfattning.** Autonom ekonomi/hushåll ingår ännu inte.

## Nästa större sammanhängande paket — V2-05
Mål: den första spelbara, verifierbara kedjan mellan NPC-behov, tillgång på varor, arbete/produktion och lokal handel. Planera kontrakt och felvägar före kod.
- Granska äldre resursplaner mot masterplanens bevarandelista. Inget tidigare beslutat system får tyst tas bort.
- Utgå från befintlig `.economy-v1` (koppar, spannmål, arbetslön) och karaktärsägd kalender/position. Inga tysta migrationer.
- Skilj världens resurser från spelarens ägodelar. Definiera ägare, plats, dag, lager, efterfrågan och återhämtning vid avbrutna transaktioner.
- Bygg en sammanhängande, begränsad kedja som går att spela och testa på iPhone. Undvik isolerade plus/minus-siffror utan världseffekt.
- Skydda idempotens, ekonomi/XP/tid och karaktärsbyte. Testa omladdning, avbruten operation och otillräckliga resurser.
- Fortsatt prioritet: begriplig svenska och korta mobilvyer. Städa den äldre ihållande berättelsepanelen i ett separat motiverat UI-kapitel, utan att ändra dess sparade beslut.

## Bevarade framtida system
V2-05: produktion, råvaror, förädling, lager, priser, marknader, löner, skulder, skatt, transporter, ägande.
V2-06: följeslagare, lärlingar, resesällskap.
V2-07: familj, barn, åldrande, arv och generationer.
V2-08: grupper, kompanier, rövarband, legosoldater.
V2-09: politik, titlar, vasaller, adelshus och diplomati.
V2-10: borgar, arméer, krig, förvaltning och rikesbildning.
Löpande: kartor, berättelse, porträtt, tillgänglighet, backup/export/import, säkerhets- och regressionstester.

## Arbetsregel
En logiskt sammanhängande ZIP, normalt en commit, separat GitHub PASS/FAIL och Safari PASS/FAIL. Dokumentation samlat vid kapitelavslut. `MASTERPLAN_V2.md` är funktionsregister; ingen funktion utgår utan uttryckligt godkännande.
