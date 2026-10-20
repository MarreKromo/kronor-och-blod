# KB-A1.2 – Resterande kod och sparflöden
Datum: 2026-10-20
Status: KÄLLKODSGRANSKNING GENOMFÖRD för `src/*.js` och `index.html`; inga spelkodändringar, inga körda Safari-/felinjektionstester.

## Omfattning
Utifrån aktuellt GitHub-träd granskades resterande JavaScript-filer i `src/` och `index.html` efter direkt `localStorage`, `sessionStorage`, `getItem`, `setItem`, `removeItem` och lagringsinjektion. A1.1 täckte de centrala domänerna; A1.2 täcker UI, säkerhetsgrindar, preflight, återställning, skapande och presentation. Detta är en källkodsinventering; inte en formell säkerhetsrevision av alla exekveringsvägar eller isolerade testfiler.

## Kompletterande lagringsflöden
| Fil | Resultat |
| --- | --- |
| `src/character-ui.js` | Har en egen lista `SAVE_KEYS` för export av aktivt tillstånd. Behöver jämföras med slots och alla framtida domäner. |
| `src/switch-recovery.js` | Återstartsåterställning för `switch.journal.v1`, med egen lista över sex domäner. |
| `src/slot-switch-preflight.js` | Förkontroll med egen lista `ACTIVE_KEYS` över samma sex domäner. |
| `src/slot-restore-preflight.js` | Läser `slot.v1.<characterId>` och kontrollerar mål innan återställning. |
| `src/slot-inspector.js` | Läser `slot.v1.<characterId>`. |
| `src/character-cards-ui.js` | Läser separata slots för karaktärskort. |
| `src/life-background-recovery.js` | Läser och återställer `life-background.write-journal.v1`; kontrollerar att bytesjournal inte samtidigt finns. |
| `src/life-background-identity-guard.js` | Läser karaktär, identitet och båda journalerna för att avgöra om aktiv identitet är säker. |
| `src/life-background-confirm.js` | Tar injicerat `storage`, kontrollerar karaktär/ägare och journaler; direkta `localStorage`-anrop saknas avsiktligt. |
| `src/new-character-writer.js` | Tar injicerat `storage`; skriver enbart ny `slot.v1.<characterId>` och verifierar resultat. |
| `src/new-character-jh1-ui.js` | Läser målslot för kollisionskontroll och skickar `localStorage` till skaparen. |
| `src/life-background-first-save-ui.js`, `src/life-background-confirm-ui.js` | Skickar `localStorage` till en säkerhetsgrind; ingen direkt egen skrivning identifierad i sökta anrop. |
| `src/life-background-skills-preview.js` | Läser `life-background.v1` och `life-background.owner.v1`; förhandsvisning, ingen aktiv färdighetslagring. |
| `src/scene-view.js`, `src/journal.js` | Läser sparade data för visning. |
| `src/character.js` | Initierar äldre `backup.pre-migration.v1` endast när den saknas; detta är inte fullständig användarexport. |

## Nyckelmatris – nuvarande kända domäner
Aktiva data och ägarkopplingar:
- `kronor-och-blod.character.v1`
- `kronor-och-blod.character.identity.v1`
- `kronor-och-blod.story.v1` och `.story.owner.v1`
- `kronor-och-blod.encounter.v1` och `.encounter.owner.v1`
- `kronor-och-blod.investigation.v1` och `.investigation.owner.v1`
- `kronor-och-blod.calendar.v1` och `.calendar.owner.v1`
- `kronor-och-blod.daylog.v1` och `.daylog.owner.v1`
- `kronor-och-blod.life-background.v1` och `.life-background.owner.v1`

Övriga:
- `kronor-och-blod.slot.v1.<characterId>` – separata karaktärssnapshots.
- `kronor-och-blod.switch.journal.v1` – transaktionsjournal för byte.
- `kronor-och-blod.life-background.write-journal.v1` – transaktionsjournal för bakgrund.
- `kronor-och-blod.backup.pre-migration.v1` – äldre, begränsad backup.

Inga nya lagringsdomäner för faktisk position, aktiviteter eller färdighets-XP har identifierats i denna granskning.

## Prioriterade risker och beroenden
**HÖG – Nya sparnycklar kan missas i flera parallella listor.**
`character-slots.js`, `character-switch.js`, `switch-recovery.js`, `slot-switch-preflight.js` och `character-ui.js` innehåller var sin domän-/nyckeldefinition. Nya aktiva nycklar måste hanteras konsekvent i alla relevanta läs-, snapshot-, bytes-, återställnings- och exportvägar. Det är en förändringsrisk, inte ett bekräftat dataförlustfel.

**HÖG – Backupens fullständighet måste fastställas.**
Pre-migration-backup i `character.js` avser begränsade äldre aktiva nycklar. Export i `character-ui.js` har separat lista. Vi har inte verifierat att en användare kan exportera, importera och återställa samtliga karaktärer, slots och journaler säkert.

**MEDEL – Samtidiga transaktioner och felhantering.**
Bytes- och bakgrundsjournaler har spärrar och återställningslogik. Vi har inte simulerat nekad/full lagring, avbrutet byte, korrupt slot eller uppstart med journal kvar.

**MEDEL – Äldre sparformat och identitetskoppling.**
Kod har ägarverifiering och preflight, men faktisk kompatibilitet med alla gamla sparningar kräver tester innan migration.

**LÅG/OBS – Skrivskyddade vyer.**
Flera UI-moduler läser slots eller bakgrund för presentation. De ska fortsatt vara skrivskyddade och aldrig tyst ”reparera” lagring.

## Föreslaget A2-upplägg
1. Separat kravspecifikation för **export av alla slots och aktivt tillstånd**; inventera exakt vad nuvarande exportfunktion gör.
2. Definiera versionsmärkt backupformat, metadata, kontroll av ID/ägare, storlek och integritet.
3. Definiera **säker import utan automatisk överskrivning**, inklusive förhandsvisning, konflikter och rollback.
4. Gör först isolerade tester med fejkad lagring; därefter små kodpaket och Safari-tester.
5. Rör inte verkliga sparningar eller användarens Testbonde innan export- och återställningsflödet är testat.

## Verifieringsgränser
- GitHub-källkod: granskad.
- Alla `src/*.js` och `index.html`: genomgångna med lagringsrelaterade sökmönster.
- Indirekta anrop via hjälpfunktioner: identifierade för centrala skrivvägar, inte fullständigt exekveringsgranskade.
- `tests/*.html`, gamla filer i `docs/` och alla historiska kodversioner: inte fullständigt granskade.
- Safari-/felinjektionstest: EJ UTFÖRT.
- Spelkodändring: INGEN.
- GitHub-verifiering av detta dokument: INVÄNTAR COMMIT.

## Beslut inför nästa steg
**A1 kodinventering kan avslutas inom angiven omfattning efter dokumentverifiering.** Därefter börjar **A2.1 – kravspecifikation för komplett backup/export och säker återställning**. Ingen ny persistent speldomän införs dessförinnan.
