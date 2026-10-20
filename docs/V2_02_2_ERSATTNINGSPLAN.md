# KRONOR & BLOD — V2-02.2 Ersättningsplan för Sverige-prototypen
Datum: 2026-10-20
Status: BESLUTAD RIKTNING + TEKNISKT FÖRSLAG. Ingen kod ändrad.
Underordnad `docs/MASTERPLAN_V2.md`; detta dokument förtydligar ett NYTT uttryckligt projektägarbeslut och ska användas vid kommande samordnad revidering av masterplanens äldre skyddskrav.

## 1. Nytt beslut: fullständig ersättning
Projektägaren har beslutat att den historiska Sverige-prototypen ska **ersättas helt** av Kronor & Blods mörka fantasy-RPG på **samma repository och GitHub Pages-adress**. Gamla karaktärer (Testbonde, JH2-Test, Mk, Sven, Erik) är testdata och behöver **inte migreras, bevaras som spelbara eller stödjas av den nya versionen**. Den nya versionen ska inte ärva Skara, 1250, gamla plats-ID:n eller berättelsen om Ragnhild.

**Viktigt:** Beslutet upphäver endast behovet av *kompatibilitet med gamla testkaraktärer*. Det ger inte tillåtelse till omedelbar, okontrollerad radering av webbläsardata. Inget rensas automatiskt vid sidladdning; användaren får en tydlig varning när den nya versionen ersätter den gamla upplevelsen. Befintlig kod säkerhetskopieras via Git-historik och helst en märkt `legacy-sweden-final`-tagg eller separat arkiv innan kodbyte.

## 2. Produktmålet
**Ett berättelsedrivet RPG på ytan – en levande politisk och ekonomisk värld under ytan.**
- Spelaren börjar som vanlig person, med vardag, val, relationer och arbete.
- Öppningsmiljö: Dornmark, Keldra, Dorneth och Varnhold (**godkända namn**).
- NPC-namn, härskare, släktband, kartkoordinater och öppningsmanus är ännu förslag enligt V2-01.7–01.8.
- Kartan är rese-/orienteringsverktyg; ingen obligatorisk kungarikespanel.
- NPC:er agerar även när spelaren avstår eller reser bort.

## 3. Bekräftad nulägesinventering i GitHub
Följande har lästs direkt i repot 2026-10-20:

| Befintlig fil | Observerad funktion | Plan |
| --- | --- | --- |
| `index.html` | Sverige-karta, HTML, CSS, stor mängd scriptladdningar | **Ersätt** med ny mobilorienterad startsida; ta bort gamla scriptreferenser först när nya flödet fungerar |
| `src/places.js` | Historiska plats-ID:n, bl.a. `VG-SKARA-001` | **Ersätt datamodellen**; skapa nya fantasy-ID:n separat från visningsnamn |
| `src/app.js` | Markerare, platsinformation, kart-/kalenderpresentation | **Bygg om** för scen först, karta som separat vy |
| `src/calendar.js` | `Date.UTC(1250,0,1)`, ägarbunden kalender och `localStorage` | **Ny världsklocka**; återanvänd bara testade principer, inte kalenderns gamla datum/nycklar |
| `src/character.js` | Skara som startplats, `character.v1`, `character.identity.v1`, backup före migration | **Ny karaktärsmodell** och nya sparnycklar; gamla karaktärer migreras inte |
| `src/character-slots.js`, `src/character-switch.js`, `src/switch-recovery.js` | Slotbaserade sparningar, ägarkontroller, journal och återställning | **Återanvänd transaktionsidéer**, men förenkla gränssnitt och bygg ett enhetligt v2-saveformat |
| `src/story.js`, `src/encounter.js`, `src/investigation.js` | Hårdkodade gamla berättelsegrenar och ägarpar | **Ersätt innehåll** med händelse-/dialogmodell och Dornmarks scener |
| `src/home.js`, `src/journal.js` | Daglogg, hemvy och läsning av berättelse | **Bygg om** till personlig RPG-vy och dagbok utifrån spelarens kunskap |
| `src/life-background-save.js`, `src/new-character-writer.js` | Säker identitet, journaler och skrivkontroll | **Behåll designprinciperna**, ersätt äldre form- och savekopplingar |

Filerna är klassificerade efter **kodgranskning**, inte efter fullständig körning av nya spelet. Ingen fullständig repo-/lagringsinventering påstås här.

## 4. Arkitektur för ersättaren (föreslagen)
1. **Världsdata:** separata kataloger för orter, vägar, resurser, hushåll och NPC-definitioner. Stabila ID:n, oberoende av namn.
2. **Speltillstånd:** ett versionsmärkt, serialiserbart objekt med `worldId`, `saveVersion`, `worldTime`, `playerId`, `characters`, `locations`, `inventories`, `relationships`, `economy`, `events`, `knowledge` och `journal`.
3. **Spelmotor:** deterministisk uppdatering per tidssteg; NPC-handlingar, resor och resursförbrukning hanteras här – inte i DOM-kod.
4. **Berättelsemotor:** scener med förutsättningar, dialog, val, tidskostnad och konsekvenser. Kan hantera frånvarande/döda NPC:er och uteblivna scener.
5. **Gränssnitt:** mobil scen-/dialogvy först; karta, personprofil, dagbok och inventarie som sekundära vyer. Strategifunktioner visas bara vid relevanta roller.
6. **Lagring:** eget namnrymdsprefix, exempelvis `kronor-och-blod.v2.save.*` (förslag, **ej implementerat**). Schema-version, validering, kontroll mot korrupt data, export/import och möjlighet till säkert avbruten skrivning.

**Arkitekturprincip:** Berättelsen läser från simuleringen; simuleringen styr inte UI direkt. UI får aldrig ensam bestämma NPC-resurser eller objektiva världsfakta.

## 5. Prioriterad byggordning i små paket
| Paket | Leverans | Godkännandekriterium |
| --- | --- | --- |
| V2-02.3 | Säkerhetskopierings- och brytpunktbeslut | Repo-head och återställningsväg verifierade; ingen data raderad |
| V2-03.1 | Ny mobil startsida + tydlig v2-identitet | GitHub PASS, Safari PASS; gamla Sverige-UI:t visas inte |
| V2-03.2 | Ny spelare + separat v2-sparning | Skapa, ladda om, fortsätta utan att gamla nycklar skrivs över |
| V2-03.3 | Keldra + första berättelsescen | Text, val och synliga konsekvenser fungerar på iPhone |
| V2-03.4 | Världstid och NPC-aktiviteter | Tiden går, minst två NPC:er agerar självständigt |
| V2-03.5 | Dorneth, Varnhold, resor och karta | Resor kostar tid; plats och händelser hänger ihop |
| V2-03.6 | Enkel hushållsekonomi, skuld och dagbok | Resurser påverkar val; historik visar kända orsaker |
| V2-04+ | Relationer, familjer, yrken, makt, dynastier | Efter att vertikalt RPG-flöde och sparning är stabila |

Paketnummer är en **föreslagen utvecklingsordning**, inte löfte om färdig funktion. Varje kodpaket ska vara litet, gå att installera på iPhone, följas av commit och separata GitHub/Safari PASS/FAIL.

## 6. Konkreta säkerhetsregler vid övergången
- Behåll samma repo och Pages-URL; skapa ingen konkurrerande huvudapp.
- Innan `index.html` eller gamla `src/` ändras: identifiera en verifierad återställningspunkt (commit-SHA/tagg). Ingen `git reset --hard` eller historikomskrivning.
- Radera inte gamla `localStorage`-nycklar automatiskt. Den nya appen **ignorerar** dem och skriver bara till sin nya namnrymd.
- Äldre testkaraktärer är inte spelbara i v2. Ingen migration behövs. Om spelaren vill rensa gamla testdata kan det bli en separat, tydligt bekräftad funktion **senare**.
- Ingen blind sök/ersätt av platsnamn och ID:n; ersätt hela moduler kontrollerat.
- Backup/export av nya v2-sparningar ska fungera innan omfattande världssimulering byggs.
- Ingen personnamnskandidat blir kanon enbart för att den förekommer i en testscen.

## 7. Dokumentkonflikt och hantering
`docs/MASTERPLAN_V2.md` och äldre V2-02.1-plan kan fortfarande säga att fem testkaraktärer ska bevaras. **Det är nu ett historiskt krav som projektägaren uttryckligen ändrat.** Detta dokument dokumenterar beslutet utan att tyst redigera gamla dokument. Vid nästa samordnade masterplansuppdatering ändras skyddsformuleringen till: *behåll återställningsmöjlighet för äldre kod, men kräv inte migration eller spelbarhet för äldre testkaraktärer*. Alla övriga principer i masterplanen gäller fortsatt.

## 8. Ej utfört och nästa steg
Ingen kod, `localStorage`, testkaraktär, kalender, GitHub Pages-inställning eller befintlig fil har ändrats genom detta paket. Ingen Safari-körning av v2 har gjorts. Nästa steg efter GitHub-verifierad commit: V2-02.3, verifiera återställningspunkt och bestäm första isolerade kodpaketet.
