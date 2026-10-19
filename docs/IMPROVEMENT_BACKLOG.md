# SVERIGE: Kronor & Blod – Improvement Backlog
Version: 1.0
Datum: 2026-10-19
Status: LEVANDE PLANERINGSDOKUMENT – inga punkter markeras som implementerade utan verifiering.

## Syfte
Detta är projektets permanenta förbättringslista. Här samlar vi fel, designbrister, kvalitetsförbättringar och framtida idéer så att de inte tappas bort när nya funktioner byggs.

**Grundregel:** Varje större funktion följs av en förbättrings- och testomgång innan nästa större funktion påbörjas. Allt görs i små, färdiga ZIP-paket anpassade för iPhone. GitHub verifieras efter commit, Safari-test sker med PASS/FAIL och resultatet dokumenteras.

## Prioritet och status
- **P0:** Blockerande fel, risk för förlorad data eller omöjligt att spela.
- **P1:** Viktigt för kvalitet eller grundläggande spelupplevelse; hanteras i närtid.
- **P2:** Stor förbättring som bör planeras innan implementation.
- **P3:** Framtida utveckling och finslipning.

Status: `IDÉ`, `PLANERAD`, `PÅGÅR`, `TESTAS`, `PASS`, `PARKERAD`.
`PASS` får endast sättas efter faktisk GitHub-verifiering och användarbekräftat Safari-test när det är relevant.

## A. Nästa förbättringspaket – KB-03.6.1
| ID | Prioritet | Status | Förbättring | Godkännandekriterium |
| --- | --- | --- | --- | --- |
| IMP-001 | P1 | PLANERAD | Ta bort inaktuell text hos Ragnhild om att fortsättning kommer i nästa paket | Texten stämmer med aktivt kapitel II |
| IMP-002 | P1 | PLANERAD | Få kapitel I och II att kännas som en sammanhängande berättelse | Begriplig övergång utan att tidigare val eller sparningar ändras |
| IMP-003 | P1 | PLANERAD | Visa direkta konsekvenser tydligare | Ledtrådar, relationer och upplåsta möjligheter framgår utan att framtida mysterier avslöjas |
| IMP-004 | P1 | PLANERAD | Testa Ragnhild relation −1 och fler undersökningsval | Spelaren kan fortsätta, spara och ladda om; karta/kalender fungerar |
| IMP-005 | P1 | PLANERAD | Planera stabilt karaktärs-ID och separata sparningar | Säker migrationsplan som inte förstör befintliga testdata |

## B. Stor visuell omarbetning – planeras separat
| ID | Prioritet | Status | Förbättring | Målbild |
| --- | --- | --- | --- | --- |
| IMP-006 | P2 | PLANERAD | **Bygg om kartan från grunden** | Tilltalande, läsbar, historiskt inspirerad karta över Västergötland med trovärdig geografi |
| IMP-007 | P2 | IDÉ | Karta som spelgränssnitt, inte bara illustration | Platser, vägar, resor och val ska kunna användas i spelmekaniken |
| IMP-008 | P2 | IDÉ | Förbättra markörer, ortnamn och kartnavigation på iPhone | Lätt att trycka, zooma/navigera och förstå var man befinner sig |
| IMP-009 | P2 | IDÉ | Sammanhängande visuell identitet | Medeltida känsla utan att försämra läsbarhet eller tillgänglighet |
| IMP-010 | P2 | IDÉ | Omarbeta layout och navigation | Tydligt spelgränssnitt med mindre känsla av separata prototyprutor |
| IMP-011 | P2 | IDÉ | Förbättra karaktärsprofil och porträtt | Mer personlig profil som visar identitet, bakgrund och utveckling |
| IMP-012 | P2 | IDÉ | Förbättra berättelsepresentationen | Tydlig dialog, val och läsrytm för mobilskärm |
| IMP-013 | P2 | IDÉ | Visuell översikt över ledtrådar/journal | Spelaren kan följa mysterier och tidigare beslut |

**Viktigt om kartan:** Den nuvarande kartan är uttryckligen schematisk och användaren bedömer den som mycket bristfällig visuellt. Kartan ska få en egen designgenomgång och en tydlig kravspecifikation före ombyggnad. En snygg bild räcker inte: geografi, interaktion och spelbarhet måste fungera tillsammans. Varken inspirationsbilder eller prototypkarta får framställas som historiskt exakta.

## C. Speldjup och framtida system
| ID | Prioritet | Status | Förbättring | Målbild |
| --- | --- | --- | --- | --- |
| IMP-014 | P2 | IDÉ | Djupare NPC-relationer | Personer har egna motiv, minnen och reaktioner |
| IMP-015 | P2 | IDÉ | Meningsfulla och bestående val | Flera vägar genom berättelser med verkliga följder |
| IMP-016 | P2 | IDÉ | Levande invånare och samhällen | Världen känns aktiv även mellan uppdrag |
| IMP-017 | P2 | IDÉ | Handel och ekonomi | Begripliga, spelbara system med historiskt rimliga ramar |
| IMP-018 | P2 | IDÉ | Uppdrag och konsekvenser över tid | Spelarens handlingar förändrar relationer och möjligheter |
| IMP-019 | P2 | IDÉ | Dynastier och familjer | Långsiktig karaktärs- och släktutveckling |
| IMP-020 | P3 | IDÉ | Animationer och ljud | Förstärk stämningen efter att grundsystem och design fungerar |
| IMP-021 | P2 | IDÉ | Historisk faktagranskning | Skilj belagda förhållanden från fiktiva berättelser |
| IMP-022 | P2 | IDÉ | Tillgänglighet och mobilprestanda | Läsbart, responsivt och stabilt i Safari på iPhone |

## Utvecklingsordning
1. Avsluta och GitHub-verifiera dokumentation för KB-03.6 och detta backlog-dokument.
2. Gör KB-03.6.1 med små förbättringar och regressionstester.
3. Separat arbete med stabila karaktärs-ID:n och sparningar.
4. Genomför en **egen kart- och UI-designgenomgång** innan större visuell implementation.
5. Bygg vidare på större spelmekanik, med förbättringsrunda efter varje större funktion.

Ordningen kan omprioriteras efter användartest. Kritiska P0-fel går alltid först.

## Så lägger vi till förbättringar
Varje ny punkt ska få ett unikt IMP-ID, en kort problembeskrivning, prioritet, status, föreslagen fas och ett mätbart test/godkännandekrav. Ändra inte en punkt till `PASS` enbart för att koden är skriven.

## Beslut från projektgenomgången
- Spelet ska inte bara fungera; det ska vara roligt, snyggt och genomarbetat.
- Stora designproblem får inte glömmas bort när fokus ligger på funktioner.
- Kartan är ett särskilt viktigt förbättringsområde.
- Vi samlar idéer nu men bygger om större delar först efter planering.
- Denna backlog ska underhållas löpande tillsammans med GDD, roadmap, testlogg och daily log.
