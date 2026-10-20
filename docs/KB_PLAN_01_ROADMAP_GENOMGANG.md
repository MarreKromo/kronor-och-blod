# KB-PLAN-01 – Strategisk roadmapgenomgång v1.0
SVERIGE: Kronor & Blod | 2026-10-20
Status: FÖRSLAG FÖR GODKÄNNANDE – ingen spelkod ändrad

## 1. Syfte
Bygga ett öppet, historiskt inspirerat RPG där spelaren formar ett liv i Västergötland år 1250. Prioritera spelbara kedjor framför isolerade skärmar, siffror eller tekniska moduler.

## 2. Verifierat nuläge och gränser
- KB-01: repository, dokument och GitHub Pages finns.
- KB-02: schematisk klickbar karta, fem platser, kalender och lokal kalendersparning finns. Inte en riktig rese- eller världssimulering.
- KB-03: karaktärer, flera slots, livsbakgrund, berättelsescener, relation och dagbok finns i testad prototypomfattning.
- J-J: 7/7 användarrapporterade grundregressionstester PASS inom dokumenterad omfattning.
- J-L3: sammanhållen livsbakgrundsvy och skrivskyddad färdighetsförhandsvisning. Safari FAIL på grund av äldre cacheversion följdes av cachefix och Safari PASS. Dokumenterat i TESTS och DAILY_LOG.
- Ingen aktiv färdighetsbonus, generell aktivitetsmotor, riktiga resor, levande NPC-system eller säker export/backup för spelaren är färdig.
- Tidigare roadmap innehåller inaktuella 'nästa steg'. Bevara historiken, men använd aktuell checkpoint vid ny planering.

## 3. Produktprinciper
1. Spelarens handlingar, inte en fast klass, avgör livsvägen.
2. Tid är en begränsad resurs; arbete, träning, resa, vila och uppdrag konkurrerar om dagarna.
3. Specialisering växer fram naturligt. Inga hårda klasslåsningar, men det ska vara svårt att bemästra allt.
4. Händelser och NPC:er har bestående, begripliga konsekvenser.
5. Alla system måste kunna knytas till samma karaktärsidentitet och säker lagring.
6. Historisk trovärdighet faktagranskas; prototypvärden är inte historiska fakta.
7. Bygg en liten komplett spelkedja först, skala därefter.
8. Större visuell redesign av karta och karaktärsgränssnitt sker i separat framtida fas.

## 4. Rekommenderad ordning och beroenden

### Fas A – Dataskydd och sammanhängande grund
A1. Inventera nuvarande sparnycklar, ägarskap, slots och risk för global delad data.
A2. Specificera säker export/backup och återställning innan nya bestående världstillstånd införs.
A3. Inför nya dataformat endast med versionering, karaktärskoppling och separata regressionstester.
Gate: befintliga karaktärer, bakgrunder, berättelse, kalender och byte fungerar efter omladdning; ingen oavsiktlig datamigration.

### Fas B – Spelbar värld: position och resa (KB-04.1)
B1. Definiera spelarposition skild från vald kartmarkör.
B2. Definiera en liten förbindelse mellan två platser, resevillkor och tidskostnad.
B3. Lägg till en enda säker resa med bestående position och dagshistorik.
Gate: en befintlig testkaraktär kan resa, tiden avancerar korrekt och läget finns kvar efter omladdning.

### Fas C – En levande aktivitet och en NPC
C1. Designa generell aktivitet: plats, krav, tidskostnad, resultat, händelse-ID och karaktärsägarskap.
C2. Inför en avgränsad NPC med identitet, relation och ett frivilligt möte.
C3. Koppla en enkel aktivitet till tid och dagbok; ingen omfattande slumpmotor ännu.
Gate: spelaren kan genomföra en aktivitet och se bestående, karaktärsspecifik konsekvens utan dubletter.

### Fas D – Arbete, erfarenhet och färdigheter
D1. Specificera färdighetskatalog, nivåskalor, erfarenhet, svårighetsgrad och balansering.
D2. Skilj grundegenskaper (styrka, list, anseende) från inlärda färdigheter.
D3. En första riktig färdighet kan övas genom EN aktivitet med tydlig tidskostnad.
D4. Därefter jobb, lärare, händelser och flera färdigheter; senare avtagande utveckling och specialisering.
Gate: ingen XP-farm genom upprepade knapptryck, inga gratis dagar, ingen läcka mellan karaktärer; sparning/omladdning PASS.

### Fas E – Berättelse, relationer och öppen livsväg
E1. IMP-024: omarbeta Ragnhild till frivillig introduktion; kunna avstå utan att spelet låses.
E2. Koppla berättelseval till plats, relationer, tid och karaktärens bakgrund när grundsystemen är säkra.
E3. Utöka med handel, arbete, försörjning, följeslagare, egendom och långsiktiga mål.
Gate: minst en alternativ väg utan huvuduppdraget och konsekvenser som bevaras.

### Fas F – Fördjupning och presentation
F1. Fog of war, fler färdsätt och varierade resehändelser.
F2. Fler NPC:er, ekonomi, familjer och dynastier.
F3. Kart- och UI-redesign med historiskt underlag, navigering och mobilprestanda.
F4. Större politiska system, borgar och arméer först när beroenden fungerar.

## 5. Första spelbara livscykeln (vertikal prototyp)
1. Spelaren befinner sig i Skara.
2. En tillgänglig aktivitet eller NPC erbjuder ett begripligt val.
3. Spelaren utför en handling med kostnad i speltid.
4. Ett resultat påverkar dagbok, relation, resurs eller senare en färdighet.
5. Spelaren kan resa till en andra plats.
6. Allt finns kvar efter omladdning och hör till rätt karaktär.
Detta är en målbild, inte något som redan är implementerat.

## 6. Färdighetsvision – beslutad riktning, detaljer öppna
- Områden att utreda: strid (svärd, yxa, spjut, sköld, båge), överlevnad/jakt, ridning, jordbruk, hantverk, handel, läkekonst, skrift, förhandling, ledarskap.
- Erfarenhet från handlingar, arbete, träning, lärare och händelser.
- Svårare nivåer tar längre tid; möjlighet att byta livsväg kvarstår.
- Frågor före implementation: skala, XP-formel, tidsmodell, vila, misslyckande, ålderseffekt, historiska tillträdesvillkor, anti-exploit.
- `Jordbruk +2` i nuvarande UI är en skrivskyddad förhandsvisning, inte aktiv effekt.

## 7. Uppdateringsbehov i befintlig roadmap
- Markera historiska 'nästa paket'-noteringar som inaktuella utan att radera dem.
- För in J-K/J-L verifierad status i ny aktuell statussektion.
- Knyt IMP-025:s återstående startfärdigheter till Fas D; övriga bakgrunds- och berättelsekonsekvenser till Fas E.
- Behåll IMP-023 kompakt dagshistorik och IMP-024 berättelsearbete synliga; omprioritering är ett förslag, inte avskrivning.
- Lägg till beroendegater för säker lagring, resor och aktivitet innan stora expansionssystem.
- Registrera senare visuell redesign av både karta och karaktärsvy.
- Stäm av Fas A–F med användaren före att den permanenta roadmapen ändras.

## 8. Föreslaget nästa arbetsmoment
KB-PLAN-01 steg 1: godkänn eller justera denna föreslagna utvecklingsordning.
KB-PLAN-01 steg 2: uppdatera `docs/ROADMAP.md` och relevant backlog via kompletta ZIP-ersättningsfiler efter godkännande.
Därefter Fas A1: läsbaserad sparinventering utan spelkodändring.

## 9. Arbetsmetod
- Läs alltid aktuella GitHub-filer före ersättningspaket.
- Ett litet ZIP-paket i taget, komplett fil vid ersättning.
- Användaren committar via iPhone.
- Assistenten verifierar GitHub PASS/FAIL.
- Vid spelkodändring testar användaren vanlig Safari PASS/FAIL.
- Dokumentera verkliga resultat, inte antagna PASS.
- Skydda localStorage och befintliga testkaraktärer.
