# KB-A1.1 – Läsbaserad sparinventering, första del
Datum: 2026-10-20
Status: KODGRANSKNING DEL 1 – ej fullständig revision, ingen spelkod ändrad.

## Källa
Direkt läsning från `main` i `MarreKromo/kronor-och-blod`:
`src/character.js`, `src/character-slots.js`, `src/character-switch.js`,
`src/calendar.js`, `src/story.js`, `src/encounter.js`, `src/investigation.js`,
`src/home.js`, `src/journal.js`, `src/life-background-save.js`,
samt första delen av `src/life-background-model.js`.
Repo-trädet har fler JavaScript-filer som behöver kontrolleras i del 2.
Detta dokument beskriver observerad kod, inte utförda Safari-tester.

## Bekräftade aktiva sparnycklar
| Nyckel | Ansvar | Observation |
| --- | --- | --- |
| `kronor-och-blod.character.v1` | Aktiv karaktär | Används av character, slots, switch och bakgrundssparning. |
| `kronor-och-blod.character.identity.v1` | Aktivt ID | Verifieras mot karaktärens rådata i slots och bakgrundssparning. |
| `kronor-och-blod.story.v1` | Berättelse | Har separat `.story.owner.v1`. |
| `kronor-och-blod.encounter.v1` | Ragnhilds möte | Har separat `.encounter.owner.v1`. |
| `kronor-och-blod.investigation.v1` | Undersökning | Har separat `.investigation.owner.v1`. |
| `kronor-och-blod.calendar.v1` | Förflutna dagar | Har separat `.calendar.owner.v1`. |
| `kronor-och-blod.daylog.v1` | Dagshistorik | Har separat `.daylog.owner.v1`. |
| `kronor-och-blod.life-background.v1` | Livsbakgrund | Har separat `.life-background.owner.v1`. |

## Bekräftade spar- och återställningsnycklar
| Nyckel eller mönster | Observation |
| --- | --- |
| `kronor-och-blod.slot.v1.<characterId>` | Separat sparplats; `character-slots.js` skapar snapshot av aktiv data och ägarkopplingar. |
| `kronor-och-blod.switch.journal.v1` | Transaktionsjournal vid karaktärsbyte. |
| `kronor-och-blod.life-background.write-journal.v1` | Transaktionsjournal för livsbakgrund. |
| `kronor-och-blod.backup.pre-migration.v1` | Äldre backup skapad i `character.js` om aktiv karaktär finns och nyckeln saknas. Detta är **inte** bevis på full export/backup av alla slots. |

## Viktig teknisk struktur
- `character-slots.js` och `character-switch.js` har överensstämmande lista av aktiva domäner: `story`, `encounter`, `investigation`, `calendar`, `daylog`, `life-background`, plus karaktär och identitet.
- Karaktärsbyte använder aktiva nycklar och snapshots i separata slots. Nya framtida domäner behöver ingå i **båda** filernas hantering, med särskilda migrationstester.
- `character-switch.js` validerar tillåtna nycklar och har återställningsjournal.
- `life-background-save.js` skyddar aktiv karaktär/identitet och blockerar skrivning vid oavslutad bytesjournal.
- Kalender, berättelse, möte, undersökning och dagshistorik använder särskilda ägarkopplingar.
- `journal.js` läser sparade data och uppger i kodkommentar att den inte skriver till localStorage.

## Risker att undersöka, inte konstaterade buggar
1. Nya data för position, aktiviteter eller färdigheter riskerar att hamna utanför snapshot/byte om de får egna aktiva nycklar utan uppdatering av båda slotmodulerna.
2. Transaktionsjournaler och sparplatser måste ingå i en framtida säker export/återställningsdesign. Äldre pre-migration-backup täcker inte automatiskt detta.
3. Globalt delade värden, indirekta localStorage-anrop och dynamiska nycklar i övriga `src/` och testfiler återstår att inventera.
4. Fel vid full/nekad lagring, avbrutet byte, återställning och flera äldre sparformat kräver egna tester innan systemet kan kallas produktionssäkert.
5. Ägarkopplingar måste verifieras i både läs- och skrivvägar för varje nytt världssystem.

## Rekommenderad lösningsprincip
Behåll existerande ID, slots och transaktionsmodell. Innan ny domän införs: definiera nycklar, ägarformat, snapshot/byte, återställning, bakåtkompatibilitet och iPhone-testmatris. Överväg en gemensam registrering av spar-domäner först efter separat kodgranskning; refaktorera inte spontant.

## A1.2 – nästa avgränsade del
- Gå igenom resterande `src/*.js` och `index.html` för direkt/indirekt lagringsanvändning.
- Verifiera fullständiga läs-/skriv-/återställningsflöden för de redan identifierade nycklarna.
- Sammanställ slutlig nyckelmatris och riskprioritering.
- Ingen spelkod ändras förrän inventeringen är klar.

## Teststatus
- GitHub-källor lästa: JA, tio centrala filer samt modellhuvud.
- Fullständig nyckelinventering: EJ KLAR.
- Kodändring: NEJ.
- Safari-test: EJ AKTUELLT för dokumentationspaket.
- Dokumentets GitHub PASS/FAIL: INVÄNTAR UPPLADDNING OCH VERIFIERING.
