# KB-A2.2 – Isolerad exportbyggare
Datum: 2026-10-20

## Leverans
- `src/full-backup-builder.js` – **ny**, ej inkopplad i `index.html`.
- `tests/full-backup-builder-isolated.html` – isolerad testsida med minneslagring.
- Den vanliga appen ändras inte. Inga befintliga filer ersätts.

## Beteende
`KB_FULL_BACKUP_BUILDER.build(storage, createdAt?)` läser tillåtna aktiva nycklar, alla slotposter och äldre pre-migration-backup; kontrollerar ID och ägarkopplingar; blockerar okända nycklar, korrupta slots och öppna journaler. Den skriver inte till lagring och skapar ingen nedladdning. Aktivt tillstånd och slots bevaras separat. Eventuell ny okänd nyckel stoppar export i stället för att tappas bort.

## Avsiktliga begränsningar
- `manifest.checksumAlgorithm` och `manifest.checksum` är `null` tills ett separat steg implementerar verifierad SHA-256 med kanoniskt format.
- Detta är inte ännu en komplett användarbackup eller importfunktion. Ingen produktionsknapp.
- Källkodsgranskning och syntaktisk test räcker inte som Safari PASS. Öppna `tests/full-backup-builder-isolated.html` via GitHub Pages efter commit och rapportera varje PASS/FAIL.
- Kräver en riktig `Storage`-liknande instans; använd endast testlagring i isolerade tester.

## Acceptans
1. Två slots och en aktiv karaktär -> PASS.
2. Bytesjournal -> säkert stopp.
3. Okänd nyckel -> säkert stopp.
4. Korrupt slot -> säkert stopp.
5. Felaktig aktiv identitet -> säkert stopp.
6. Endast läsning -> PASS.

## Nästa steg
Verifiera GitHub-filer, testa i Safari, därefter fortsätta med checksumma och fullständig exportvalidering. Ändra aldrig befintliga karaktärer under dessa tester.
