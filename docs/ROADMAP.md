# KRONOR & BLOD — ROADMAP v3.8
Uppdaterad 2026-10-22. Aktiv värld: Dornmark. `MASTERPLAN_V2.md` är överordnad. `ARBETSMETOD.md` v4.1 gäller.

## Tidigare spelbara grundkapitel — BEVARAS
- V2-03: karaktärer, berättelse, kalender, jordbruks-XP, resor och grundekonomi. Full regression ej utförd.
- V2-04/R/S: NPC-rutiner, möten, relationer, dialog och råd. Tidigare begränsade GitHub/Safari PASS.
- V2-05A–F: produktion, lokala lager, leveranser, marknad, autonom bakgrundsproduktion, försörjningsvy och ortsvyer. Full ekonomivision återstår.
- NAV-01–04: mobilnavigation och karaktärsbunden vy.

## MAP-01 — aktivt kvalitetsarbete
- MAP-01.2A–01.4: geografisk kartmodell, interaktiv karta, Keldra/Dorneth/Varnhold, utbyggd terräng och Berg-vy.
- MAP-01.5–01.7: kartgrafik, skog, berg, floder, mobilstorlek och terräng.
- MAP-01.8–01.13C: successiv ortillustration, Varnholds huvudborg, Dorneth, Keldras jordbruk, huvudväg, broar och vattendetaljer. Flera visuella problem kvarstår.
- MAP-01.13D: korrigering av vägar/broar/terräng. **Safari FAIL**: broar felplacerade, blå ovaler, platt borg och dåliga vägövergångar.
- MAP-01.13E: geometrisk ombyggnad. **GitHub PASS** för fyra filer; **Safari FAIL** enligt tre skärmbilder 2026-10-22: äldre hus syns under terräng, Varnholds murar och hus runtom försämrade/försvunna, vägarna fortfarande fel, Dorneths högra bro felplacerad. **Ej godkänd som kartbas.**

## Nästa paket: MAP-01.13F — Visual Recovery & Layer Cleanup
**PLANERAT, EJ PÅBÖRJAT.** Först läs aktuell kod, jämför tidigare fungerande versioner med 13D/13E, kartlägg ritordning och verkliga flod-/vägkorsningar.
1. Återställ fungerande borgmurar, torn, borggård, värdshus och hus kring Varnhold; behåll fungerande förbättringar.
2. Ta bort dubbla SVG-objekt och ogenomskinliga lager som täcker äldre bebyggelse. Lös problemet i ursprunglig renderer, inte genom nytt överlägg.
3. Rita broar vid faktiska vattenövergångar, utan artificiella vattenovaler.
4. Rätta huvudvägens bredd, vägkorsningar och anslutningar; bevara spelvärldens rutt-ID:n.
5. Kontrollera Keldras åkrar och skog, Dorneths kvarn och marknadsbebyggelse, översiktszoom och inzoomning.
6. Leverera EN ZIP med kompletta filer, tester och cacheversioner. GitHub PASS/FAIL följt av Safari PASS/FAIL. Visuell kvalitet måste godkännas innan ny kartfunktion.

## Efter återställd kartbas — planerat
- Naturligare bergsrelief, skog, terräng och vatten; bergsby, gruva och framtida resurser. **Bergsby/gruva är inte implementerade.**
- `MAP-01.4 – World Locations & Travel Encounters` är en **separat tidigare planerad mekanik**, ej samma som geografiska MAP-01.4. Behåll namnet som alias och ge ett ledigt nytt ID vid implementation. Upptäckbara världspunkter, vägval och resehändelser med risker/val/konsekvenser; ingen ny sparning eller tid förrän design och tester godkänts.
- WORLD-02: regional variation i geografi, klimat, resurser, samhällen och historia; region ≠ rike.
- V2-05 framtid: priser, förädling, jobb, skulder, skatter, transport, egendom.
- V2-06 följeslagare; V2-07 familj/arv; V2-08 grupper; V2-09 politik; V2-10 borgar/arméer/krig/rikesbildning.
- Backup/export/import, full regression, långtidsimulering och kommersiell kvalitet återstår.

## Styrning
`MASTERPLAN_V2.md` = vision; `ROADMAP.md` = prioritet; `SYSTEMS.md` = faktisk implementation; `DEVLOG.md` = historik; `TESTS.md` = evidens; `DAILY_LOG.md` = STOPP/START. KB-DOC-02 vid avslut.
