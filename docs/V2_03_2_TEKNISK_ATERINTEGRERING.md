# V2-03.2 – Teknisk återintegrering av spelmotor

Status: Inventering genomförd mot GitHub main 2026-10-20. Detta dokument är en plan, inte en genomförd kodintegration.

## Beslut
- Behåll nya berättelseupplevelsen i Keldra och fantasyvärldens namn.
- Återanvänd fungerande system och säkerhetsprinciper från Sverige-prototypen, inte dess gamla världsinnehåll.
- Undvik parallella konkurrerande karaktärs-, kalender- och sparmotorer.
- Ändra inte gamla localStorage-nycklar eller befintliga sparningar automatiskt.
- Arkivbranch: `archive/sverige-prototyp-2026-10-20`.

## Verifierad GitHub-inventering
- `index.html` laddar nu `src/v2.css` och `src/v2.js`; gamla system laddas inte av den nya startsidan.
- `src/life-background-model.js`: ren modell med fyra bakgrundsdimensioner, validering och parse; inga lagringsbiverkningar.
- `src/character.js`: karaktärsmodell, säkert ID och backupskydd; kräver `VG-SKARA-001`, och den gamla skaparfunktionen är uttryckligen avstängd.
- `src/character-slots.js`: sparplatser med identitetskontroll, lagringsnycklar och validering; stark koppling till gammalt schema.
- `src/calendar.js`: dagräkning och ägar-/sparskydd; knutet till karaktär.
- `src/story.js`, `src/encounter.js`, `src/investigation.js`: berättelsespår med ägar- och sparskydd; gammalt Sverige-innehåll och HTML-kopplingar.
- `src/journal.js`: läsande dagbok; kräver äldre berättelseelement.
- `src/navigation.js`, `src/character-profile.js`: kräver äldre HTML-struktur.
- `src/v2.js`: fristående första Keldra-berättelse med egen lokal lagringsnyckel, ej karaktärsbunden.

## Risker
1. Två separata sparmodeller ger förväxling och risk för dataförlust.
2. Direkt återaktivering av gamla script fungerar inte när nödvändiga HTML-element saknas.
3. Karaktärsbyte kräver att berättelse, kalender och dagbok följer aktivt karaktärs-ID.
4. Gamla berättelseplatser och personer får inte oavsiktligt visas i fantasyvärlden.
5. Lokal lagring måste skyddas vid fel och uppgradering; inga tysta nollställningar.

## Integrationsordning och acceptans
### A. Kontrakt och datagräns
- Fastställ en enda kanonisk v2-karaktärsmodell, inklusive ID, livsbakgrund och startplats Keldra.
- Definiera separata v2-nycklar och explicit migrationsbeslut; inga automatiska överföringar av gamla testkaraktärer.
- Beskriv hur berättelse, kalender, dagbok och sparplatser knyts till aktiv karaktär.
- Acceptans: datakontrakt granskat innan kodändringar.

### B. Karaktär och sparplatser
- Återanvänd validering och säkerhetsprinciper från befintliga moduler.
- Skapa/visa/ladda karaktär i nya gränssnittet utan att röra gamla nycklar.
- Acceptans: omladdning bevarar data; karaktärsbyte blandar inte data; felaktiga sparningar återställs inte tyst.

### C. Kalender, berättelse och dagbok
- Knyt tid och Keldra-val till aktiv karaktär.
- Återanvänd berättelse- och dagboksprinciper, men skriv ny fantasyberättelse.
- Acceptans: konsekvenser och dagbok följer rätt karaktär efter omladdning och byte.

### D. NPC, relationer, resurser och konsekvenser
- Bygg vidare ovanpå samma v2-kontrakt.
- Acceptans: synliga konsekvenser, persistens och ingen dubbelmotor.

## Nästa paket
V2-03.2B: datakontrakt och säker integrationsadapter som kan införas utan att störa befintlig Keldra-berättelse. Kodpaket levereras först när kontraktet är tydligt.

## Testdisciplin
Dokumentationspaket: verifiera GitHub-fil efter commit; inget Safari-test krävs. Kodpaket: verifiera GitHub och därefter PASS/FAIL i Safari.
