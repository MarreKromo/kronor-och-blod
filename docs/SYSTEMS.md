# KRONOR & BLOD — SYSTEMS
**Status:** teknisk nulägesöversikt, uppdaterad 2026-10-21. Skilj implementerat från planerat.

## Implementerad V2-arkitektur
- `index.html` laddar V2-modulerna.
- `src/v2-data-contract.js`: V2-karaktär med UUID, startplats Keldra, bakgrundsfält och separata nycklar.
- `src/v2-character.js`: upp till tre karaktärsplatser, byte av aktiv karaktär.
- `src/v2-story-binding.js`: scen och valhistorik per karaktär.
- `src/v2.js`: Regn över Keldra, berättelse, dagbok och platser.
- `src/v2-calendar.js` och `src/v2-calendar-ui.js`: separat kalender per karaktär, start 1 januari 1250, Fortsätt dagen.
- `src/v2-events.js` och `src/v2-npc.js`: Maras tidsstyrda händelse och Eddas möte med karaktärsbundna beslut.
- `src/v2-narrative.css`: sammanhållen berättelsepresentation.
- `src/v2-focus.js` och `src/v2-focus.css`: läsande presentationslager. Pågående möten i Berättelse; avgjorda möten i Dagbok. V2-03.2K GitHub PASS och användarrapporterad Safari PASS.

## Livsbakgrund – befintlig grund, ännu ej fullt spelaktiv
- `src/life-background-model.js` är en ren modell för validering och etiketter; den skriver inte till lagring.
- Fält: `upbringing`, `familySituation`, `past`, `ambition`, `biography`; modellversion 1.
- Uppväxt: `farm`, `craft`, `letters`, `freeborn`; familj: `together`, `distant`, `alone`; förflutet: `ordinary`, `debt`, `promise`, `conflict`; ambition: `farmstead`, `trade`, `travel`, `influence`.
- V2-karaktären innehåller bakgrund. Det finns ännu ingen generell mekanik som gör bakgrunden till kontakter, startresurser, relationer eller färdighetsbonusar.
- Utökat skapande/UI planeras separat; inga tysta ändringar av befintliga karaktärsposter.

## Färdigheter – planerat, INTE aktivt
- Grundkatalog att besluta: jordbruk, hantverk, handel, kunskap/skrift, social förmåga, överlevnad, ridning och strid.
- Designbehov: nivå/XP, svårighetsgrad, tidskostnad, träning/lärare, rimliga startförutsättningar, skydd mot XP-farm, versionsmärkt ägarbunden lagring.
- Äldre `Jordbruk +2` från Sverige-prototypen var en skrivskyddad förhandsvisning. Det är inte en aktiv V2-bonus.
- Första riktiga färdighetsmomentet måste påverka en faktisk aktivitet och klara GitHub/Safari-regression innan det kallas implementerat.

## Händelser och NPC-konsekvenser
- Maras händelse är tillgänglig från modelldag 3; upptäckt och beslut kan ske senare. Beslutet har egen beslutsdag och konsekvensflagga.
- Edda-mötet kräver relevant tidigare Mara-beslut och tid; dialogval leder exempelvis till `edda_konflikt`.
- Händelserna är ännu inte en full NPC-ekonomi, relationsmodell eller autonom simulering.
- Avgjorda möten kan visas i Dagbok genom V2-03.2K utan nya sparnycklar.

## Sparsäkerhet
- V2-prefix: `kronor-och-blod.fantasy.v2.`; karaktärs-ID används för berättelse, kalender och händelseposter.
- Äldre Sverige-nycklar migreras eller raderas inte automatiskt. Äldre testkaraktärer behöver inte vara spelbara i V2.
- Korrupta/främmande poster ska ge säkert stopp, inte tyst nollställning.
- Safari localStorage är lokal för enheten/webbläsaren; ingen fullständig V2-backup eller molnsynk är verifierad.

## Princip för kommande implementation
En karaktärs bakgrund ger förutsättningar, handlingar förbrukar tid och kan öka färdigheter, och både NPC:er och berättelse reagerar på resultat. Definiera kontrakt och tester före nya skrivningar. Ingen parallell motor eller automatisk ändring av befintliga sparningar.


## KB-DOC-04 — nulägesgräns för framtida system
Masterplan v3.0 och Roadmap v3.0 bevarar färdigheter, bakgrund, ekonomi, handel, egendom, följeslagare, egna grupper, familjer, dynastier, politik och krig som **produktmål**. Ingen av dessa stora motorer blir implementerad av dokumentuppdateringen. Äldre `src/life-background-model.js` är en valideringsmodell, inte bevis för aktiv bakgrundsbonus i V2. Ingen spelkod eller lagring ändras i KB-DOC-04.
