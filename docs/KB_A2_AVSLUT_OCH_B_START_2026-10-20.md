# KB-A2 – Kapitelavslut och övergång till fas B
Datum: 2026-10-20
Projekt: SVERIGE: Kronor & Blod

## Godkänd omfattning
- A2.1 kravspecifikation: GitHub PASS. Den tidiga stegnumreringen i specifikationen är historisk; faktiskt levererade moduler och testomfattning nedan gäller.
- A2.2 full-backup-builder: GitHub PASS; isolerade Safari-tester 6/6 PASS.
- A2.3 SHA-256-integritet: GitHub PASS; isolerade Safari-tester 7/7 PASS.
- A2.4 validator/förhandsvisning: GitHub PASS; isolerade Safari-tester 7/7 PASS.
- A2.5 backupcenter: GitHub PASS; integrationstester 7/7 PASS. Användaren laddade ned och valde sedan en riktig JSON-fil i Safari: checksumma PASS, fem karaktärer och fem sparplatser verifierade.
- A2.6 återställningsmodul och gränssnitt: fyra filer GitHub-verifierade; isolerade Safari-tester 10/10 PASS. Backupcentrets avsnitt 3 visades i Safari. Verklig fil gav fem 'finns redan', noll saknade och ingen import.

## Vad säkerhetskedjan gör
- Fullständig export av kända karaktärs-/ägarposter och samtliga kända slots, inklusive aktivt tillstånd; stoppar vid okända nycklar eller oavslutade transaktionsjournaler.
- Försegling med SHA-256, verifiering och skrivskyddad filförhandsvisning.
- Begränsad create-only-återställning för saknade slots efter verifiering, med konfliktskydd, kontroll efter skrivning och försök till rollback vid fel.
- Ingen automatisk ersättning av aktiv karaktär, befintlig slot eller hela lagringen.

## Bevis och begränsningar
- GitHub Pages gav tillfälligt 404 för A2.6-testet; en senare lyckad Pages-deployment följdes av Safari-skärmbild med 10/10 PASS.
- A2.6:s riktiga backupfil i Safari visade Testbonde, JH2-Test, Mk, Sven och Erik. Alla fem slots fanns redan. Därför genomfördes ingen verklig återställning på enheten.
- En faktisk ny-slot-import, omladdning och karaktärsbyte efter sådan import är ännu inte end-to-end-testad i riktig Safari-lagring. Nekad/full riktig lagring och krascher mitt i en skrivning är inte fullständigt verifierade i produktion.
- A2 är avslutat inom verifierad omfattning; detta är inte ett löfte om total datagaranti eller molnbackup.
- Backupfilen måste förvaras privat och sparas utanför webbläsarens lokala data.

## Officiell status och nästa steg
- A1: läsbaserad sparinventering genomförd.
- A2: kapitelavslut, GitHub/Safari PASS inom angiven omfattning.
- A3: kvarstår; datamodell, versionshantering och migrationsrisker ska granskas när nya persistenta data introduceras.
- Fas B är nästa spelutvecklingsprioritet. Innan bestående position skrivs måste alla nya nycklar ingå i backupbyggare, validator, slotbyte, återställning och tester. Inga okända `kronor-och-blod.*`-nycklar får införas utan gemensam inventering.

## Beslutad arbetsmetod
- Leverera större men sammanhållna ZIP-paket med ungefär 3–6 relaterade funktioner när det är säkert.
- En commit och samlade GitHub- och Safari-tester per paket; tydlig PASS/FAIL per nivå.
- Uppdatera huvuddokumenten `docs/TESTS.md`, `docs/DAILY_LOG.md`, `docs/ROADMAP.md` och vid behov `docs/ARBETSMETOD.md` vid **kapitelslut**, inte efter varje litet steg.
- Bevara äldre dokumenthistorik och alla befintliga sparningar. Ingen tyst migration eller radering.
- Användaren arbetar på iPhone; leverera kompletta filer i ZIP, inte manuell rad-för-rad-redigering.

## Checkpoint för nästa arbetspass
Senast verifierat: KB-A2.6 GitHub PASS, isolerade Safari-tester 10/10 PASS, riktig backupfil PASS, 0 saknade slots, ingen import.
Nästa: KB-B1 – spelposition och kartval som skilda begrepp; först inventering av befintlig kalender, karta, karaktärsmodell, slotnycklar och backupstöd, därefter ett sammanhållet säkert kodpaket.
