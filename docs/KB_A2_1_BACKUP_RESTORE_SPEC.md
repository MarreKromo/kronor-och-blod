# KB-A2.1 – Kravspecifikation: komplett export och säker återställning
Datum: 2026-10-20
Status: DESIGNFÖRSLAG – ingen spelkod ändrad, ingen verklig backup skapad.
Beroenden: `docs/KB_A1_1_SPARSYSTEM_INVENTERING.md`, `docs/KB_A1_2_SPARSYSTEM_RESTGRANSKNING.md`.

## Varför vi gör detta
Nuvarande `src/character-ui.js` har en exportknapp som bygger JSON med `format: kronor-och-blod-backup`, `version: 1`, `characterId` och ett begränsat `SAVE_KEYS`-urval. Den tar inte med alla `slot.v1.<characterId>`, livsbakgrundens nycklar eller transaktionsjournalerna. UI-texten anger uttryckligen att import saknas. Detta är en begränsad **aktiv-karaktärsexport**, inte en komplett flerslot-backup.

`src/character.js` skapar separat `backup.pre-migration.v1`, även den begränsad till äldre aktiva domäner. Den ska inte förväxlas med framtida användarbackup.

## Produktmål
En spelare på iPhone ska kunna:
1. Skapa en enda JSON-fil med samtliga befintliga karaktärsplatser och den aktiva karaktärens senaste tillstånd.
2. Spara filen i iOS Filer och kontrollera att den finns där.
3. Välja filen för **skrivskyddad förhandsgranskning** av namn, antal karaktärer, datum och varningar.
4. Välja en säker återställningsmetod efter konfliktkontroll, utan tyst överskrivning.
5. Verifiera att rätt karaktär, kalender, dagbok, berättelse och livsbakgrund finns efter omladdning.

## Krav på export (A2.2 och senare)
- Export får aldrig ändra, rensa eller ”reparera” localStorage.
- Exporten ska omfatta samtliga `kronor-och-blod.slot.v1.<UUID>` som finns i lagringen, inklusive felaktiga/okända poster **utan att kasta bort dem tyst**. Om data är korrupta: visa tydlig varning och stoppa en backup som annars skulle se fullständig ut.
- Den aktiva karaktärens *aktuella rådata* måste inkluderas separat. Den aktiva slotens senast sparade snapshot kan vara äldre än aktivt tillstånd; export får inte anta att de är identiska.
- Inkludera aktiva domäner och ägarkopplingar: `character`, `character.identity`, `story`, `encounter`, `investigation`, `calendar`, `daylog`, `life-background`.
- Hantera journaler `switch.journal.v1` och `life-background.write-journal.v1` **konservativt**: om oavslutad transaktion finns, blockera normal export och hänvisa till verifierad återställningsväg. Kopiera inte en pågående transaktion som en ”frisk” backup.
- Bevara befintliga råsträngar exakt, inklusive äldre format och okända framtida `kronor-och-blod.*`-nycklar; okända nycklar kräver klassificering innan de inkluderas i en återställningsbar backup.
- Ingen lokal lagring ska behöva skrivas för att skapa filen.
- Export ska märkas med schemaformat, schemaversion, skapad tid, appversion (om tillgänglig), antal poster, aktivt ID och integritetskontroll.
- Bekräfta endast ”export begärd” vid klick; **påstå aldrig att filen sparats i Filer** innan användaren själv bekräftat.

## Föreslaget format v2 (inte slutligt)
```json
{
  "format": "kronor-och-blod-full-backup",
  "version": 2,
  "createdAt": "ISO-8601",
  "activeCharacterId": "UUID",
  "activeEntries": {"kronor-och-blod.character.v1": "<raw JSON string>"},
  "slots": {"kronor-och-blod.slot.v1.<UUID>": "<raw slot JSON string>"},
  "otherEntries": {},
  "manifest": {"slotCount": 0, "keyCount": 0, "checksumAlgorithm": "SHA-256", "checksum": "<hex>"}
}
```
OBS: `slots` och `activeEntries` ska innehålla **alla** aktuella tillåtna nycklar. `otherEntries` ska specificeras i A2.2. Kontrollsumman måste beräknas över en entydigt definierad kanonisk representation som inte inkluderar kontrollsumman själv. Filformatet är ännu inte implementerat.

## Krav på import och återställning (A2.3 och senare)
- Läs fil och kontrollera maxstorlek, JSON, format, version, nyckeltyper, kontrollsumma och antal poster **utan att skriva**.
- Validera varje slot mot ID, `character.identity`, karaktärens rådata, livsbakgrund och alla tillämpliga ägarposter.
- Visa en begriplig jämförelse: *finns redan*, *ny*, *konflikt*, *ogiltig*.
- Första versionen: endast **import av nya, lediga slots** rekommenderas. Vid befintligt ID: stoppa eller hoppa över med uttryckligt val, aldrig automatisk överskrivning.
- Återställning av aktivt tillstånd och befintliga slots kräver en senare, separat transaktionsdesign med journal, förkontroll, rollback och felinjektionstester.
- Ingen ”ersätt allt”-knapp i första versionen.
- Vid nekad/full lagring: inga halvt importerade resultat får presenteras som lyckade. En flerslot-import måste antingen vara atomär genom verifierad journal/rollback eller tydligt begränsad till en slot per bekräftad operation.
- Förhindra ID-kollisioner, dubbla ID:n, felaktiga ägarpar, okända farliga nycklar och scriptinjektion genom importerade namn.
- Import får inte radera data som redan finns. Aktiva karaktären byts inte automatiskt.
- Vid osäkerhet: avbryt och bevara allt oförändrat.

## Särskilda tekniska iakttagelser
- `src/character-slots.js` och `src/character-switch.js` använder samma sex domäner i olika listor. `src/switch-recovery.js`, `src/slot-switch-preflight.js` och `src/slot-restore-preflight.js` har också egna listor.
- `src/new-character-writer.js` har en användbar create-only-princip: skriv bara om målnyckeln är tom, verifiera och försök rulla tillbaka vid fel. Detta är inspiration, inte färdig importmotor.
- `src/slot-restore-preflight.js` kontrollerar slotformat och ägarkopplingar; det räcker inte ensamt som komplett backupvalidator.
- `src/character.js` har `reset()` som raderar aktiv karaktär och identitet. Backup-UI får aldrig anropa detta.
- `src/character-ui.js` innehåller en äldre kommentar om låst karaktärsbyte. Design och UI-text ska ses över när vi bygger ny export, eftersom karaktärsbyte nu finns i andra moduler.

## Säkerhets- och acceptanskriterier
**Export:**
- En aktiv karaktär, flera slots, aktivt tillstånd nyare än slot, samt äldre/korrupt slot.
- Inga localStorage-skrivningar, inga borttappade kända nycklar.
- Journal kvar => säkert stopp.
- iPhone Safari: filen kan sparas i Filer och öppnas igen.

**Importförhandsvisning:**
- Rätt fil, fel format, trasig JSON, ändrad kontrollsumma, dubbel ID, fel ägare, överstor fil.
- Inget lagras före uttryckligt godkännande.

**Säker ny-slot-import:**
- Nytt ID => lyckad och verifierad slot, aktiv karaktär oförändrad.
- Befintligt ID => ingen överskrivning.
- Full/nekad lagring => ingen oavsiktlig dataförlust.
- Omladdning och byte fram/tillbaka => rätt bakgrund, kalender, berättelse och dagbok.

## Genomförande i små paket
- **A2.1 (nu):** lås kravspecifikationen, ingen spelkod.
- **A2.2:** ren, isolerad inventering/exportbyggare + tester med minneslagring; ingen produktionsknapp ännu.
- **A2.3:** separat skrivskyddad filförhandsvisning och validator.
- **A2.4:** exportknapp i appen, iPhone Safari-test.
- **A2.5:** create-only import av en ny slot, med verifiering, journal/rollback och isolerade feltester.
- **A2.6:** begränsad iPhone-test av import och återläsning; eventuell senare ersättning av befintliga slots kräver ny design.

## Förbjudna genvägar
- Inte lägga till position, XP eller nya permanenta data innan exporten har definierad täckning.
- Inte kopiera enbart aktiv slot och kalla det ”alla karaktärer”.
- Inte lita på ett lyckat `Blob`-klick som bevis att iOS Filer innehåller filen.
- Inte importera till aktivt tillstånd eller skriva över Testbonde.
- Inte automatiskt migrera äldre sparningar under export.

## Teststatus
GitHub-källor granskade. Designfil skapad lokalt. Ingen spelkodändring, ingen Safari-test och ingen användarbackup skapad. GitHub-verifiering inväntar uppladdning.
