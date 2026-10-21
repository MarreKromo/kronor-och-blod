# KRONOR & BLOD — ROADMAP v3.2
Uppdaterad 2026-10-21. Aktiv värld: Dornmark. `MASTERPLAN_V2.md` (masterplan v3.0) är överordnad. Planerat, implementerat och testat hålls åtskilda.

## Verifierad utveckling
- V2-03.2L: NPC-samtal, GitHub PASS och Safari PASS enligt användaren.
- V2-03.3B: jordbruk, +10 XP och +1 dag, GitHub/Safari PASS enligt användaren.
- V2-03.5: position, resor och platsbundet arbete, GitHub/Safari PASS enligt användaren.
- V2-03.6: lön, spannmål och köp, GitHub PASS; full ekonomiregression återstår.
- V2-03.6L: begripligare språk, koppar aktivt, silver/guld framtida, GitHub PASS och begränsad Safari PASS.
- V2-03.7: resa och Fortsätt dagen utan extra bekräftelse, GitHub PASS, Safari PASS 5/5.
- V2-03.8: förbättrad mobilvy för platser/arbete/handel, GitHub PASS, Safari PASS för visade funktioner.
- V2-03.9: platskontroll för jordbruk använder faktisk reseposition, GitHub PASS, Safari PASS för visade funktioner och omladdningssparning; separat karaktärsbytesregression ej bekräftad.
- **V2-04 KOMPLETT, första NPC-grunden:** Mara och Toren i Keldra, Edda i Dorneth, deterministiska dagliga rutiner och behov, ett sparat möte och förtroende per NPC och spelarkaraktär. GitHub PASS. Safari PASS inom verifierad omfattning: möten, minnen, omladdning och Eddas platsbundenhet; dagsvariation stöds av visad dag 29 men ingen full kalendercykelregression har gjorts.

## Nästa större sammanhängande spelpaket — V2-04, fördjupning
Mål: återkommande NPC-möten och relationer som får konsekvenser utan att spelet blir en lång stapel av paneler. Paketet ska omfatta en säker utökning av NPC-minnen (befintliga `.npc-life-v1` måste kunna läsas oförändrade), regler för tidsintervall och upprepade samtal, konsekvensfulla men balanserade handlingar, förbättrad mobilpresentation samt relevanta regressionstester. Ingen ändring av pengar, XP, spannmål eller befintliga kalender- och resenycklar utan separat genomtänkt transaktionsdesign. Innan implementation: granska existerande NPC- och berättelsevyer och specificera hur nya möten skiljer sig från tidigare Edda/Mara-berättelsebeslut.

## Bevarade framtida faser
| Fas | Omfattning |
|---|---|
| V2-04 | Levande NPC:er, relationer, minnen, rutiner, hushåll |
| V2-05 | Produktion, råvaror, marknader, löner, skulder, skatt, handel, egendom |
| V2-06 | Följeslagare, lärlingar och resesällskap |
| V2-07 | Familj, barn, åldrande, arv och generationer |
| V2-08 | Grupper, kompanier, rövarband och legosoldater |
| V2-09 | Politik, titlar, vasaller, adelshus och diplomati |
| V2-10 | Borgar, arméer, krig, förvaltning och rikesbildning |
| Löpande | Karta, berättelse, porträtt, mobil-UI, backup och regression |

## Resursvisionen från Sverige-idén
Masterplanen bevarar råvaror, produktion, förädling, lager, priser, transporter, ägande och försörjningskedjor. **Exakt jämförelse mot hela äldre resurskonceptet återstår före V2-05**; råvarukatalog och produktionsformler är inte beslutade. Ingen funktion stryks utan uttryckligt godkännande.

## Bindande arbetssätt
`ARBETSMETOD.md` v3.0: sammanhängande ZIP med fullständiga filer, normalt en commit, GitHub PASS/FAIL och separat Safari PASS/FAIL, skyddade sparningar och dokumentation samlat vid kapitelavslut.
