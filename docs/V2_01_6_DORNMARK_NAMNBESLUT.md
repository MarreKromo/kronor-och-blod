# KRONOR & BLOD — V2-01.6 Dornmark: godkänt namnbeslut
Datum: 2026-10-20
Status: GODKÄNT NAMNBESLUT. Övrig geografi, historik och implementation är fortfarande designförslag.

## 1. Beslut
Projektägaren har uttryckligen valt alternativ B från `V2_01_5_NAMNSYSTEM_OCH_IDENTITET.md`: en blandad gränslandskultur med en egen, sammanhängande namntradition.

| Funktion | Godkänt namn | Tidigare arbetsnamn | Beslutets omfattning |
| --- | --- | --- | --- |
| Startregion | **Dornmark** | Gränsdalen | Namnet är fastställt |
| Jordbruksby | **Keldra** | Björkdal | Namnet är fastställt |
| Handelsort vid bro och kvarn | **Dorneth** | Vadköping | Namnet är fastställt |
| Länsherrens borg/säte | **Varnhold** | Gränsborgen | Namnet är fastställt |

Dessa fyra namn ersätter de tidigare arbetsnamnen i **framtida design och nya texter**. Tidigare dokument bevaras som historik; deras ortnamn ska tolkas enligt tabellen. Inga äldre spelplats-ID:n eller sparade värden ändras.

## 2. Sammanhängande geografi och vardagsliv
Dornmark är tills vidare den föreslagna gränsregionen i utkanten av Valdren. Den har odlingsmark, skog, flod, väg och ett politiskt känsligt läge. Valdrens namn och själva gränsdragningen är fortfarande arbetsförslag.

- **Keldra**: hushåll, åkrar, spannmålsförråd, utsäde och lokala skulder. Spelarens första vardagskonflikter kan börja här.
- **Dorneth**: marknad, bro, kvarn, transporter, kredit och utbyte av spannmål, mjöl, salt och verktyg.
- **Varnhold**: länsherresäte, fogde, vägtull, skydd, skattekrav och lokala maktbeslut.

Kedjan är oförändrad: Keldra producerar spannmål → Dorneth mal och handlar → Varnhold uppbär skatt och påverkar säkerhet och vägar. Varje aktör kan handla utan spelaren. Platsnamnen är nu beslutade, men bosättningarnas storlek, position och ägarförhållanden är ännu inte kanon.

## 3. Berättelsen först
Spelaren börjar som en människa i Dornmark, inte som härskare. Ett tidigt scenario kan vara att familjen i Keldra behöver utsäde, kvarnen i Dorneth kräver betalning och fogden från Varnhold väntar på skatt. Det är ett **scenförslag**, inte en tvingande huvudberättelse.

Spelarens huvudgränssnitt visar den egna situationen, möten, dialoger, relationer, val och konsekvenser. Kartan används för orientering och resor, med snett uppifrån-perspektiv. Politik, ekonomi och dynastier simuleras i bakgrunden och blir mer direkt spelbara när karaktärens roll motiverar det. Princip: **ett berättelsedrivet RPG på ytan, en levande strategivärld under ytan**.

## 4. Namntradition och kontinuitet
Dornmark präglas av blandade gränslandstraditioner. Namn ska vara läsbara, uttalbara och historiskt trovärdiga, inte direkt svenska eller slumpmässigt fantasifulla. Lokala, äldre och främmande namn kan finnas, men får inte ersätta dessa godkända namn utan nytt beslut. En framtida erövring kan ge en plats nytt officiellt namn utan att dess stabila identitet förändras.

Tidigare karaktärsnamn och husnamn (t.ex. Ingrid Björk, Edda Varn och hus Venn) är **inte automatiskt godkända** genom detta ortnamnsbeslut. De ska granskas mot namntraditionen separat.

## 5. Karta och bildmaterial
Framtida konceptbilder bör visa Dornmark, Keldra, Dorneth och Varnhold. Tidigare illustrationer med äldre eller påhittade etiketter är referenser, inte kartkanon. En statisk konceptbild får inte vara enda spelkartan: terräng, platser, vägar, gränser och spelstatus ska hållas separata. Kartans skala, exakta lägen, riksgränser och slutliga koordinater återstår.

## 6. Dokumenthierarki och migrationsskydd
- `MASTERPLAN_V2.md` är fortsatt **enda officiella spelvision**.
- `V2_01_VARLDSBIBEL.md`, `V2_01_2_BERATTELSE.md` och `V2_01_3_BLODSLINJER_OCH_MAKT.md` beskriver samma föreslagna platser med äldre arbetsnamn. Denna beslutsnotering är **namnnyckeln** tills en samordnad revidering av befintliga dokument görs.
- `V2_01_5_NAMNSYSTEM_OCH_IDENTITET.md` innehåller alternativen A/B/C; **B är nu vald**. Alternativ A/C är arkiverade förslag, inte parallella kanonnamn.
- Ingen spelkod, `localStorage`, backup, kalender, karaktärsdata eller gamla Sverige-plats-ID:n ändras. Inga namnbyten via blind sök-och-ersätt.
- **V2-02 migrationsdesign** krävs innan dessa namn implementeras i spelvärlden. Gamla sparningar för Testbonde, JH2-Test, Mk, Sven och Erik ska bevaras.

## 7. Nästa öppna beslut
1. Granska personnamn och adelshus för Dornmarks blandkultur.
2. Fastställ lokala vägar, flod och relativa lägen, därefter interaktiv kartdesign.
3. Avgör Valdrens härskares öde och arvsregler innan tronföljdskrisen blir kanon.
4. Gör säker teknisk inventering i V2-02 innan någon ny spelkod eller data kopplas in.

## 8. Acceptans
Detta paket är en dokumentationsändring. Efter användarens GitHub-commit ska denna fil verifieras i repot. Safari-test krävs inte för dokument. GitHub PASS är inte samma sak som att namn eller karta är implementerade i spelet.
