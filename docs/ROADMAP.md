# KRONOR & BLOD — ROADMAP v3.7
Uppdaterad 2026-10-22. Aktiv värld: Dornmark. Masterplanen är överordnad; ARBETSMETOD v4.0 gäller.

## Verifierade spelbara grunder
- V2-03: karaktärer, berättelse, kalender, jordbruks-XP, resor och grundekonomi. Full regression ej avslutad.
- V2-04/R/S: NPC-rutiner, möten, relationer, dialog och råd. GitHub/Safari PASS i tidigare rapporterad omfattning.
- V2-05A–F: produktion, lokala lager, leveranser, marknad, autonom bakgrundsproduktion, försörjningsvy och individuella ortsvyer. Prototypkedjan avslutad, full ekonomivision återstår.
- NAV-01–04: navigation och mobilvyer; huvudfliken Översikt är inte spelarens bostad. Karaktärsbunden aktiv flik är ett designkrav.

## MAP-01 — status efter MAP-01.6B
- MAP-01.2A–01.3: geografisk kartmodell, interaktiv karta och orter Keldra, Dorneth, Varnhold.
- MAP-01.4 (tidigare kartutbyggnad): större utforskbar Dornmarkkarta, Bergstrakten, Södra dalen, skog och framtida jakt-/gruvzoner. **Detta är INTE samma sak som det ännu planerade `MAP-01.4 – World Locations & Travel Encounters`.** Bevara den senare som separat produkt-/funktionsarbetsström; ID-kollision måste lösas före kodpaket, utan att något glöms.
- MAP-01.5–01.6: sammanhängande kartterräng och kvalitetsarbete.
- MAP-01.6B: förbättrad visuell berg-/skog-/flodrendering; JS och CSS i GitHub samt `index.html` cacheversion `map016bv1` verifierade. Safari-bilder visar kartan och Berg-vyn. Användaren säger att allt verkar fungera, men full interaktions-/sparregression är ej utförd. Visuell kvalitet ej godkänd för kommersiell nivå.

## Nästa aktiva paket: MAP-01.7 – World Map Redesign (VISUELLT)
- Gör kartan större och mer uppslukande på iPhone; minska onödiga marginaler utan att försämra tillgänglighet.
- Ersätt geometriska triangeltoppar med sammanhängande naturtrogen bergsrelief, skogskanter med organiska övergångar och mer varierad mark.
- Förbättra geografisk logik: floder ska följa dalar, inte se ut att korsa bergstoppar.
- Bevara orter, vägval, inspektion utan tidskostnad, zoom/panorering, kalender, NPC, ekonomi och samtliga sparningar.
- Inga nya jakt-, gruv- eller resehändelsemekaniker i detta grafikpaket.
- Före kod: läs WORLD_ARCHITECTURE, MAP_01_APPROVED_IMPROVEMENTS och verklig kartkod. Bedöm mobilskärmbilder mot kommersiell kvalitetsgrind.

## Bevarad framtida arbetsström: World Locations & Travel Encounters
**Status: PLANERAD, EJ IMPLEMENTERAD.** Tidigare omnämnd som `MAP-01.4 – World Locations & Travel Encounters`, men MAP-01.4 används redan för kartans geografiska utbyggnad. Välj ett ledigt nytt leverans-ID före implementation och behåll ursprungsnamnet som alias.
- Fler upptäckbara platser och världspunkter, mindre bosättningar, jaktmarker, gruvor, intressanta vägskäl och regioner.
- Resemöten/händelser med val, risker, möjligheter och konsekvenser; aktiv kontra simulerad resa är separat designfråga.
- Kartkunskap, upptäckter, alternativa rutter, färdsätt, terräng och framtida politiska lager enligt redan godkända kartprinciper.
- Skilj utforskning/inspektion från faktisk resa. Definiera tidskostnad, ägarskap, save-format, testgrindar och hur spelaren kan undvika repetitiva händelser före implementation.

## Värld och system som inte får tappas bort
- WORLD-02: regional variation i klimat, kultur, ekonomi, historia och resurser. Regioner är inte riken; geografi, territoriell kontroll, titlar och ägande är separata lager.
- Karta och datamodell måste kunna stödja flera riken i en region, ett rike i flera regioner och härskarbyte utan ändrade geografiska ID:n.
- V2-05 kvar: dynamiska priser, förädling, fler jobb/löner, skuld, skatt, transporter, egendom och hushållsekonomi.
- V2-06 följeslagare/lärlingar/resesällskap; V2-07 familj, barn, åldrande, arv; V2-08 grupper/kompanier; V2-09 politik/titlar/diplomati; V2-10 borgar/arméer/krig/rikesbildning.
- Backup/export/import, sparsäkerhet, långtidssimulering och full regression är öppna.

## Styrregler
`MASTERPLAN_V2.md` = vision och funktionsregister; `ROADMAP.md` = ordning; `SYSTEMS.md` = faktisk kod; `DEVLOG.md` = historik; `TESTS.md` = evidens; `DAILY_LOG.md` = checkpoint. BEVARAS: alla tidigare godkända kärnsystem. ÄNDRAS: kartans nästa kvalitetsgrind och tydlig resehändelsebacklogg. UTGÅR: ingenting. Helhetsdokumentation enligt KB-DOC-02 vid kapitelavslut/chattbyte.
