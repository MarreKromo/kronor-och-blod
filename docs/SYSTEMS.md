# KRONOR & BLOD – SYSTEMS
**Status:** V2-03.3A designkontrakt, 2026-10-21. Inga nya spelmekaniker implementerade av detta dokument.

## Verifierad befintlig V2-grund
- `src/v2-data-contract.js`: V2-karaktär med UUID, bakgrund, Keldra som startplats och karaktärsbundna nycklar.
- `src/life-background-model.js`: skrivskyddad bakgrundsmodell v1 med `upbringing`, `familySituation`, `past`, `ambition`, `biography` (max 500 tecken).
- `src/v2-character.js`: tre karaktärsplatser; `src/v2-story-binding.js` och `src/v2.js`: berättelse och dagbok.
- `src/v2-calendar.js`: karaktärsbunden kalender med `getState()` och `advanceDay()`; `advanceDay()` förbrukar **en hel dag** och verifierar sparningen.
- `src/v2-events.js` och `src/v2-npc.js`: karaktärsbundna beslut; `src/v2-events-ui.js` och `src/v2-npc-ui.js`: frågesteg innan beslut.
- `src/v2-focus.js`: pågående händelse i berättelsen och avgjorda händelser i dagboken.
- V2-03.2L: GitHub PASS och användarrapporterad Safari PASS för Mara/Edda, dagbok, omladdning och karaktärsbyte.

## V2-03.3A – färdigheter och bakgrund: DESIGNKONTRAKT
**Princip:** bakgrund → rimliga startförutsättningar → tidskrävande handling → erfarenhet → verifierbar konsekvens. Grundegenskaper skiljs från inlärda färdigheter. Inga klasser eller livsvägar låses.

### Färdighetskatalog – föreslagen, ännu inte slutligt fastställd
- Försörjning: jordbruk, hantverk, handel.
- Kunskap och samspel: skriftkunskap, förhandling/social förmåga, ledarskap, läkekonst.
- Vildmark och färd: överlevnad/jakt, ridning.
- Strid: svärd, yxa, spjut, sköld, båge. Gemensamma kategorier kan visas i UI, men separata färdigheter ska kunna stödjas senare.
- Grundegenskaper som styrka, list och anseende från Sverige-prototypen är **historiska referenser**, inte bevis för implementerade V2-egenskaper.

### Bakgrund – exakt nuvarande schema
- Uppväxt: `farm`, `craft`, `letters`, `freeborn`.
- Familjesituation: `together`, `distant`, `alone`.
- Förflutet: `ordinary`, `debt`, `promise`, `conflict`.
- Ambition: `farmstead`, `trade`, `travel`, `influence`.
- `biography`: frivillig text, högst 500 tecken; inga automatiska spelregler härleds ur fritext.
- **Förslag:** uppväxt ger begränsad startvana eller introduktion till lärare/arbete. Familj, förflutet och ambition påverkar framtida kontakter, skyldigheter och dialogvillkor först när motsvarande NPC- och ekonomisystem finns. Vanlig uppväxt är fullvärdig; inga fabricerade familje-NPC:er eller obligatoriska hemligheter.
- Exakta startbonusar och balansvärden är **inte beslutade**. Äldre `Jordbruk +2` var en skrivskyddad förhandsvisning.

### XP, nivåer och tidskostnad – regler som måste låsas före kod
1. XP tilldelas bara efter en verifierad, relevant aktivitet; inte när en knapp öppnas eller en dialog visas.
2. Aktiviteten måste ha ett unikt genomförande-ID, ägare, tid, plats/krav, utfall och eventuell XP-effekt. Samma genomförande får inte belönas två gånger.
3. Tidskostnaden ska gå genom den befintliga V2-kalendern. Första prototypen får använda **en hel dag per aktivitet**; timbaserade aktiviteter kräver ett separat kalenderbeslut.
4. Övning, arbete och lärare kan ge olika utveckling. Svårighetsgrad, misslyckande, utmattning, ålder och avtagande progression ska balanseras innan bred användning.
5. Ingen XP utan tidskostnad, ingen XP-farm genom omladdning eller upprepade klick. Inga gratis resurser eller oförklarade resultat.
6. Föreslagna XP-trösklar och nivåskala ska testas med exempelkaraktärer innan de blir produktionsregler. Inga siffror fastställs av V2-03.3A.

### Persistens och transaktionsgräns för V2-03.3B
- Ny färdighetspost ska vara separat, versionsmärkt och ägarbunden till verifierat V2-UUID. Befintlig karaktärspost, bakgrund och gamla Sverige-nycklar ändras inte automatiskt.
- Före implementation: definiera schema, nyckel, validering, läsning av saknad/korrupt data, ägarbyte och kompatibilitet med tre slots.
- **Kritiskt:** `advanceDay()` skriver kalendern separat. Att sedan skriva XP i en andra operation är inte atomärt. Ingen riktig aktivitetsknapp får levereras förrän vi har designat och testat en återhämtningsbar transaktion eller ett säkert journal-/idempotensflöde. Vid fel får inte tid eller XP dubbleras.
- Full V2-backup/export saknas fortfarande. Skydda befintliga sparningar och avgränsa första testet till en ny testkaraktär.

### Första vertikala aktivitet – förslag
En dags arbete med jordbruk i Keldra: krav och tillgänglighet kontrolleras, spelaren bekräftar, exakt en dag förbrukas, ett unikt genomförande lagras och **jordbruk** kan få erfarenhet. Dagboken visar vad som hände. Ingen lön eller inventariebelöning innan ekonomimodellen finns. Det är ett framtida acceptansscenario, inte implementerad funktion.

### Acceptanstest för V2-03.3B – EJ UTFÖRDA
- Ny karaktär och befintlig karaktär har separata färdighetsvärden.
- Genomförd aktivitet förbrukar tid exakt en gång och ger högst en XP-effekt.
- Dubbeltryck, omladdning, byte A → B → A och återöppnad sida skapar inte dubbletter.
- Avbruten/ogiltig aktivitet ändrar ingenting.
- Ogiltig ägare, okänd version och trasig JSON ger säkert stopp utan reset.
- Simulerat lagringsfel mellan tid och XP kan återhämtas utan dubbelbelöning eller osynlig tidsförlust.
- Dagbok, Mara/Edda och tidigare karaktärsdata fungerar efteråt.
- GitHub PASS och separat användarrapporterad Safari PASS krävs.

## Fortsatta kärnsystem
Ekonomi, handel, egendom, resor, följeslagare, egna grupper, familjer, dynastier, politik och krig kvarstår i Masterplan v3.0 och Roadmap v3.0. Detta paket tar inte bort eller omprioriterar dem.
