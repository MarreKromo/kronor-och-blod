# Arbetsmetod – SVERIGE: Kronor & Blod

Beslutad: 2026-10-19

## Grundprincip: iPhone först
Projektägaren utvecklar via iPhone, Safari och GitHubs webbgränssnitt. Arbetsflödet ska därför inte kräva dator, terminal eller manuell redigering av långa kodfiler.

## Standardflöde för varje litet utvecklingspaket
1. Assistenten granskar aktuella filer i GitHub innan ändringar förbereds.
2. Assistenten levererar en nedladdningsbar ZIP med kompletta, färdiga filer och tydlig sökväg för varje fil. Befintliga filer ändras minimalt och övrig fungerande kod bevaras.
3. Användaren packar upp ZIP på iPhone och laddar upp/ersätter angivna filer via GitHub. En fil eller ett litet steg i taget när riskerna motiverar det.
4. Användaren committar och svarar "Klar".
5. Assistenten kontrollerar filernas innehåll och placering direkt på GitHub och rapporterar PASS/FAIL. Assistenten ska inte påstå sig ha committat eller laddat upp filer om det inte faktiskt skett.
6. Användaren testar den publicerade GitHub Pages-versionen i Safari och rapporterar PASS/FAIL. GitHub-kontroll och Safari-test är olika verifieringar.
7. Efter godkänt test uppdateras docs/TESTS.md och docs/DAILY_LOG.md, inklusive återstående tester och nästa exakta steg.

## Regler
- Inga instruktioner som kräver att användaren söker bland hundratals rader i index.html när en färdig ersättningsfil är möjlig.
- Inga onödiga omskrivningar eller samtidiga stora förändringar.
- Befintliga lokala sparfiler ska behållas; eventuell migration ska planeras och testas.
- Varje ZIP ska verkligen skapas och kontrolleras innan en nedladdningslänk ges.
- Dokumentera designbeslut, testresultat, begränsningar och exakt nästa steg.
- Undvik att förklara ett steg som PASS innan relevanta tester är genomförda.

## Teknisk plan
På kort sikt ersätts hela index.html via färdig fil när ändring behövs. På längre sikt delas den stora filen upp i mindre moduler, exempelvis src/app.js, src/map-ui.js och assets/styles.css. Uppdelningen görs i ett separat, litet och testbart paket; inte samtidigt med orelaterade funktioner.

## Prototypdata och cache – beslut 2026-10-19
- Testkaraktärer och testdata får återställas under prototypfasen. Informera innan avsiktlig återställning.
- Bevara fungerande kod och övriga spelsystem även när testdata är utbytbar.
- Inför framtida riktiga sparfiler ska migrering, säkerhetskopiering och versionshantering planeras.
- Vid ändring av JavaScript-fil: versionsmärk dess `<script src>` i `index.html` när Safari kan ha en gammal cachad kopia. Ändring av enbart sidans `?v=` räcker inte alltid.
- Skicka färdiga, verifierade ZIP-paket. Vid uppladdning av fil med samma namn: kontrollera filens innehåll på GitHub, inte bara filnamnet.
- Separera GitHub-PASS från Safari-PASS.

## Dokumentationsregel – KB-DOC-01
- Använd i första hand befintliga huvuddokument: GDD, ROADMAP.md, IMPROVEMENT_BACKLOG.md, TESTS.md, DAILY_LOG.md, ARBETSMETOD.md och DECISIONS.md.
- Skapa inte separata `*_TILLAGG.md` för varje delpaket när informationen kan läggas direkt i rätt huvuddokument.
- Bevara äldre paketdokument tills innehållet granskats och arkiverats säkert.
- Varje större funktion följs av en förbättrings- och testomgång.
- GitHub-PASS och Safari-PASS är skilda verifieringar; ange alltid ej testade delar.
- Uppdatera inte GDD eller äldre historiska beslut utan uttryckligt beslut.

## Spelarupplevelse först – permanent designregel, 2026-10-19
Bakgrund: KB-03.4–03.6 fungerade tekniskt men staplade karaktär, äldre scener, möte, undersökning och karta i en lång mobilwebbsida. Detta ska fångas före implementation, inte efter flera paket.

Inför varje ny spel- eller gränssnittsfunktion ska vi:
1. **Börja med spelaren:** beskriv vad spelaren ser, gör och känner i den faktiska mobilvyn. Gör en enkel skiss eller ett konkret användarflöde innan kod skrivs.
2. **Granska helheten:** kontrollera hur funktionen samspelar med befintliga vyer, navigation, berättelse, karta, karaktär och sparning. Undvik att bara stapla ännu ett avsnitt.
3. **Tänka framåt:** bedöm hur lösningen fungerar när antalet scener, val, NPC:er och sparade händelser ökar. Välj ett hållbart mönster framför en snabb tillfällig lösning.
4. **Prioritera kvalitet:** färdigställ en tydlig, begriplig och testad spelupplevelse före nästa stora funktion.
5. **Ifrågasätta aktivt:** assistenten ska lyfta användbarhetsproblem och föreslå bättre alternativ även om koden redan fungerar.

### Obligatorisk kontroll före kodpaket
- Vilken vy är aktiv och hur hittar spelaren till den?
- Vad visas efter ett val? Döljs eller arkiveras tidigare innehåll?
- Kan spelaren nå historik och beslut utan att hela historien ligger kvar på skärmen?
- Fungerar upplevelsen på iPhone utan onödig scrollning?
- Bevaras befintliga val, relationer och lokala sparningar?
- Vilka tester krävs för att både funktion **och spelkänsla** ska få PASS?

### Tillämpning i KB-03.6.2
- En aktiv berättelsescen visas åt gången; gamla scener staplas inte.
- Tidigare händelser, beslut, ledtrådar och relationer ska kunna återbesökas i en dagbok.
- Karta, berättelse, karaktär och dagbok får tydliga separata vyer.
- Implementera stegvis med bevarade sparnycklar, verifiering på GitHub och Safari-test efter varje paket.
- Stor visuell omarbetning av kartan hanteras separat och glöms inte bort.

## Prototypkaraktärer kontra framtida spelarsparningar – förtydligat beslut 2026-10-20
- **Mk, Erik och Sven är demokaraktärer**, inte skarpa användarkonton eller sparningar som måste skyddas till varje pris. Det är acceptabelt att återskapa dem om en genomtänkt teknisk förbättring kräver det.
- **Framtida spelare är prioriteringen:** arkitektur, karaktärsidentitet, ägarskap, versionshantering, validering, återställning och migration ska utformas så att riktiga användares sparningar skyddas när spelet senare tas i bruk.
- **Undvik prototyplåsning:** behåll inte en sämre datamodell enbart för att bevara de tre demokaraktärerna. En kontrollerad brytande förändring i prototypen är tillåten när den ger en mer hållbar lösning.
- **Ingen tyst radering:** assistenten måste i förväg tydligt ange om ett paket kan radera, nollställa eller göra testkaraktärer inkompatibla. Användaren ska uttryckligen godkänna en avsiktlig nollställning innan den genomförs.
- **Risk ska avgränsas:** skilj på utbytbar demodata, fungerande spelkod, gemensamma speldata och framtida skarpa sparningar. Att demodata får gå förlorad betyder inte att sparsystemet får vara osäkert.
- **Migration efter behov:** under prototypfasen kan testdata nollställas i stället för att bygga dyra engångsmigrationer, men beslutet dokumenteras och verifieras. Innan riktiga spelare tillkommer krävs en definierad och testad policy för kompatibilitet, säkerhetskopiering och återställning.
- **Gäller IMP-025 3H.12.3 och framåt:** utforma den nya bakgrundsmodellen framtidssäkert; inga speciallösningar enbart för Mk/Erik/Sven. Varje risk för befintlig demodata meddelas före installation.
- **Arbetsflödet kvarstår:** små ZIP-paket, komplett ersättningsfil med historiken bevarad, commit, GitHub PASS och separat Safari PASS.

---

## Reviderat arbetsflöde – 2026-10-20 (ersätter äldre mikropaketsregler)
- **Sammanhållna leveranser:** normalt 3–6 närbesläktade funktioner per ZIP och en commit/testomgång per paket. Vid risk eller kritiska fel får ett mindre paket användas.
- **iPhone först:** kompletta ersättningsfiler med korrekta repo-relativa sökvägar i ZIP. Ingen manuell långredigering på telefonen.
- **Två verifieringsnivåer:** efter commit kontrollerar assistenten faktisk GitHub-kod (GitHub PASS/FAIL). Användaren testar separat i vanlig Safari (Safari PASS/FAIL). Isolerade minnestester får inte beskrivas som skarp återställning.
- **Kapitelvis huvuddokumentation:** uppdatera `ROADMAP.md`, `TESTS.md`, `DAILY_LOG.md` och vid behov `ARBETSMETOD.md` samlat när ett helt kapitel avslutas, inte efter varje mikrosteg. Tidigare historik bevaras ordagrant.
- **Dataskydd:** inventera aktuella localStorage-nycklar och karaktärsägarskap innan kodändring; aldrig tyst radera, migrera eller skriva över sparplatser. Informera och invänta uttryckligt godkännande om nollställning någonsin behövs.
- **Safari-cache:** ändrade JS-filer får nya skriptversionsparametrar i HTML. Kontrollera även att GitHub Pages hunnit publiceras.
- **Spelarupplevelse:** planera först spelarens mobilflöde och kontrollera samspelet mellan karta, tid, position, berättelse och historik.
- Äldre formuleringar ovan om att alltid göra ”små ZIP-paket” och uppdatera dokument efter varje delsteg är historiska; denna regel gäller framåt.
