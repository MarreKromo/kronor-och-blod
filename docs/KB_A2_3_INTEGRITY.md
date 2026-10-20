# KB-A2.3 – Kontrollsumma, isolerat paket
Datum: 2026-10-20

## Nya filer
- `src/full-backup-integrity.js`
- `tests/full-backup-integrity-isolated.html`

Ingen befintlig fil ersätts. Modulen kopplas **inte** till `index.html` och använder inte `localStorage`.

## Funktion
`await KB_FULL_BACKUP_INTEGRITY.seal(unsignedBackup)` beräknar SHA-256 över en kanonisk JSON-representation av backupens innehåll (sorterade objektnycklar) **utan** manifestets checksummefält. Resultatet får `checksumAlgorithm: 'SHA-256'` och en 64 tecken lång hexsträng.

`await KB_FULL_BACKUP_INTEGRITY.verify(sealedBackup)` returnerar `{ok,reason}` och kontrollerar format, versionsnummer, metadata, postantal och checksumma. SHA-256 används för att upptäcka oavsiktliga förändringar; det är **inte** ett äkthetsbevis eller skydd mot en angripare som räknar om summan.

## Avgränsning
- En korrekt SHA-256 garanterar inte att inre karaktärsdata är giltiga. A2.2 granskar struktur och ägare vid byggande; en separat **importvalidator** måste göra om dessa kontroller innan någon framtida import.
- Denna modul tar emot redan skapade objekt; ingen filhantering eller import finns.
- Kräver säker webbläsarkontext med Web Crypto, som GitHub Pages HTTPS.
- Nuvarande test verifierar integritet med påhittade data och läser inte användarens riktiga sparningar.

## Safari-test
Öppna `https://marrekromo.github.io/kronor-och-blod/tests/full-backup-integrity-isolated.html`.
Förväntat: **7 PASS, 0 FAIL**.
Verifiera GitHub först och rapportera därefter Safari PASS/FAIL.

## Fortsättning
Efter godkänt test: lägg till separat, skrivskyddad importförhandsvisning och schema-/ägarkontroll. Dokumentera samlat vid kapitel A2:s slut enligt överenskommen rutin.
