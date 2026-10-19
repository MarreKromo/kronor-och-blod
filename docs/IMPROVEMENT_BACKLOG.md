# SVERIGE: Kronor & Blod – Improvement Backlog
Version: 1.4
Datum: 2026-10-20
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

## D. Hem och dagshistorik
| ID | Prioritet | Status | Förbättring | Godkännandekriterium |
| --- | --- | --- | --- | --- |
| IMP-023 | P1 | PLANERAD | **Kompakt dagshistorik på Hem**: vanliga dagar visas som kort datumrad/sammanfattning; viktiga händelser får större kort med berättelse, spelarval och konsekvenser; äldre händelser kan öppnas för detaljer | Historiken är överskådlig på iPhone även efter många dagar; viktiga händelser framträder; befintliga anteckningar bevaras; inga dubbletter efter omladdning |

**Bakgrund 2026-10-20:** Safari-skärmbilder från KB-03.6.3 visar att många vanliga dagar upprepar samma text och gör Hem onödigt långt. Förbättringen är ännu inte implementerad.

## E. Introduktion och huvudberättelse
| ID | Prioritet | Status | Förbättring | Godkännandekriterium |
| --- | --- | --- | --- | --- |
| IMP-024 | P1 | PLANERAD | **Omarbeta Ragnhilds introduktionsuppdrag och huvudberättelsens grund**: dagens scener är en teknisk prototyp; mysteriet ska bli ett stort frivilligt introduktionsuppdrag som leder in i den verkliga huvudberättelsen. Utveckla stark öppning, Ragnhilds bakgrund och egna motiv, den försvunne mannens betydelse, insatser, flera vägar och konsekvenser. Spelaren ska kunna tacka nej och ägna sig åt andra livsvägar. | Godkänd berättelsestruktur med begriplig drivkraft, trovärdiga NPC-motiv, minst tre meningsfulla vägar inklusive att avstå, bestående konsekvenser och en tydlig men icke-tvingande brygga till huvudberättelsen. Befintliga testkaraktärer och sparningar skyddas före kodändring. |

**Beslut 2026-10-20:** Prioritera IMP-024 före KB-03.6.4 dagshändelser. Skilj huvudberättelse, sidouppdrag och vardagshändelser; dagshändelser får inte automatiskt flytta fram huvuduppdraget. Historisk trovärdighet och Ragnhilds roll ska granskas innan dialog skrivs om. IMP-024 är ännu inte implementerad.

## F. Utökat karaktärsskapande – IMP-025
| ID | Prioritet | Status | Förbättring | Godkännandekriterium |
| --- | --- | --- | --- | --- |
| IMP-025 | P1 | PLANERAD | **Skapa egen bakgrund:** identitet, uppväxt, familjesituation, tidigare livshändelse, ambition och frivillig biografitext. Strukturerade val påverkar startkunskaper, resurser, kontakter och berättelseöppningar utan att låsa framtida livsväg. En vanlig trygg uppväxt ska vara ett fullvärdigt alternativ. | Designspecifikation godkänd; alla fyra befintliga bakgrunder kan mappas; val sparas och laddas utan dataförlust; tydlig förhandsvisning; Ragnhild kan introduceras utan påtvingad familjehemlighet; äldre sparningar migreras eller hanteras säkert. |

**Designprincip:** Du skapar ditt förflutna. Dina handlingar skapar din framtid. Familjemedlemmar ska inte utlovas som levande NPC:er innan NPC-systemet finns. Fri biografitext är rollspelsinformation, inte en automatisk källa till spelregler. Startfördelar ska balanseras och historiska förhållanden år 1250 faktagranskas.

**Första genomförandepaketet:** kravspecifikation och datamodell, därefter sparning och formulär i små steg. Före ändring av befintliga karaktärsdata: unikt karaktärs-ID, backup/migrationsstrategi och regressionstest. IMP-024 och IMP-025 designas tillsammans; ingen av dem är ännu implementerad.

## IMP-025 – Steg 2: konkret balans- och sparspecifikation (DESIGN, EJ IMPLEMENTERAD)

### Startvärden och val
- **Behåll befintliga egenskaper** `styrka`, `list`, `anseende` och deras nuvarande värden tills separat balanseringsbeslut. Nuvarande `src/character.js` använder bakgrunderna `bonde`, `hantverkare`, `skrivare`, `friboren`; nya namn får inte bryta dessa nycklar.
- **Föreslagna nya färdigheter, skilda från grundegenskaperna:** bonde → `jordbruk: 2`; hantverkare → `hantverk: 2`; skrivare → `skriftkunskap: 2`; friboren → `umgangesvana: 2`. Alla andra nya färdigheter startar på 0. Siffrorna är prototypvärden, inte historiska fakta eller implementerad kod. Inga kombinationer ska ge större total grundbonus utan avsiktlig balansering.
- **Uppväxtens första kontakter:** bonde → gårdsfolk; hantverkare → lokal hantverkare; skrivare → skrivare i Skara; friboren → släktkontakt. Kontakterna är planerade möjligheter, inte existerande NPC:er. Namn och faktiska NPC-poster skapas först när NPC-systemet stöder det.
- **Familj:** `tillsammans`, `distanserad`, `ensam`. Påverkar planerade relationer, stöd och skyldigheter, inte grundegenskaper. Inga föräldrar eller syskon ska påstås leva i världen innan de har persistenta NPC-identiteter. Familjemedlemmars antal och namn utformas i senare delpaket.
- **Förflutet:** `vanlig`, `skuld`, `lofte`, `konflikt`. Vanlig uppväxt är likvärdig och får inte straffas eller gömmas bakom ett hemligt arv. Valen skapar framtida berättelsekrokar först när dessa är implementerade; ingen obligatorisk familjehemlighet.
- **Ambition:** `gard`, `handel`, `resa`, `inflytande`. Styr tidiga förslag och frivilliga mål, aldrig tillgången till livsvägar eller permanenta klasser.
- **Fri biografi:** frivillig text endast för rollspel och profil; inte exekverbara spelregler. Begränsa längd och visa som ren text (inte HTML).

### Säker datamodell och migrering – måste beslutas före kodändring
1. Inventera alla lokala nycklar för karaktär, berättelse, möte, undersökning, kalender och dagshistorik samt hur de kopplas till namn/bakgrund. Dokumentera vilka som i dag är globala.
2. Introducera stabilt unikt `characterId` och `schemaVersion` utan att kasta bort äldre data. **Skriv inte om `character.v1` i första steget**; skapa verifierad säker kopia och återställningsväg innan migration.
3. För en äldre karaktär: härled endast det som är säkert från `background`; markera familj/förflutet/ambition som `ejValt` tills spelaren aktivt väljer dem. Hitta inte på familje-NPC:er eller livshändelser.
4. Säkerställ att nya karaktärer får separata berättelse- och dagdata; nya och gamla karaktärer får inte ärva varandras uppdrag genom namnlikhet eller återanvända globala nycklar.
5. Testmatris på iPhone/Safari: gammal karaktär, ny karaktär, byte av bakgrundsval före skapande, omladdning, ny karaktär med samma namn, reset, gammal berättelse med Ragnhild, daglogg, offline och felaktig lokal data. **Inget PASS före faktisk verifiering.**

### IMP-024-beroende
Ragnhilds introduktion ska erbjuda minst tre vägar (hjälpa, undersöka själv, avstå). Bakgrunden kan påverka information, reaktioner och alternativa ingångar, men ingen vald familjesituation får krävas för att berättelsen ska fungera. Händelser i världen fortsätter utan att spelaren tvingas delta. Dialog och uppdragskonsekvenser skrivs efter att bakgrundsmodellen godkänts.

**Avgränsning för första kodpaketet:** endast stabil identifiering, säker migration och en liten verifierbar datamodelländring; därefter separat formulär/UI-paket. Inga levande familjer, färdigskrivna uppdrag eller nya NPC-system utlovas i första kodpaketet.

## Utvecklingsordning
1. Avsluta och GitHub-verifiera dokumentation för KB-03.6 och detta backlog-dokument.
2. Designa IMP-025 (bakgrundsval) tillsammans med IMP-024 (introduktion), före nya dagshändelser. Därefter små implementationer och regressionstester enligt KB-03.6.1.
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
