# KRONOR & BLOD — V2-01.8 Den första spelupplevelsen
Datum: 2026-10-20
Status: SPELBART MANUS PÅ PAPPER / DESIGNFÖRSLAG. Ingen kod eller kanon för personnamn, startbakgrund, händelseutfall eller tider.
Underordnat `MASTERPLAN_V2.md`, bygger på V2-01.6 (godkända ortnamn) och V2-01.7 (NPC- och konfliktförslag). Detta dokument är inte en ny masterplan.

## 1. Upplevelselöfte
Första skärmen är **en scen ur spelarens liv**, inte en politisk karta. Spelaren får se plats, tid, stämning, en konkret mänsklig konflikt och begripliga handlingar. Val kostar tid och kan ändra relationer, resurser och information. Att avstå är alltid möjligt. Världen lever vidare utan att vänta på ett uppdrag.

## 2. Ramar och namnstatus
Godkända namn: **Dornmark** (region), **Keldra** (by), **Dorneth** (handelsort), **Varnhold** (borg). **Mara Keld, Taren Keld, Edda Varn, Halven Tred, Siva Damar, Rovan Venn och Alva Venn är fortfarande namnkandidater**, inte fastställd kanon. Rollerna är designförslag från V2-01.7. Valdren är fortfarande arbetsnamn. Inga exakta avstånd, kalenderdatum eller slutliga spelvärden bestäms här.

## 3. Startvillkor: inga påtvingade familjeband
Exempelscenen utgår från en vuxen vanlig invånare i Keldra som känner till marknadsorten och kan söka arbete. Spelaren **är inte automatiskt Maras släkting, äger inte automatiskt mark och får ingen given titel**. Senare karaktärsbakgrunder kan öppna andra repliker eller startplatser. Scenen måste fungera även för en främling som tillfälligt vistas i byn.

## 4. Scen 01 — Regn över Keldra (författat exempel)
**Visning:** platsnamn Keldra; tidsläge morgon (exakt klockslag ej låst); målerisk miljöbild eller enkel stämningsyta; kort text; en talande NPC; fyra tydliga val. Ingen härskarpanel.

> Regnet har fallit i fyra dagar. Vattnet letar sig längs hjulspåren mellan husen. Vid en gårdsgrind står Mara med handen på en säck utsäde. En bärare från kvarnen väntar under en genomblöt huva.
>
> ”De vill ha säden före marknaden”, säger Mara. ”Tar de den nu har vi inget att så med.”
>
> Bäraren skakar på huvudet. ”Jag har bara fått order att hämta det som är skyldigt.”

**Spelarens möjliga val:**

| Val i gränssnittet | Krav | Omedelbar följd | Möjlig fortsättning (inte garanterad) |
| --- | --- | --- | --- |
| Hjälp Mara att skydda utsädet | Spelaren är på plats och kan avsätta tid | Arbetstid förbrukas; Mara noterar handlingen | Tillit kan öka; skulden finns kvar |
| Tala med bäraren och sök en överenskommelse | Bäraren är kvar och samtal är möjligt | Information om kvarnens krav; tid förbrukas | Möjlighet att möta Edda i Dorneth |
| Fråga efter fogdens skattebesked | Tillgänglig lokal källa eller väg till fogden | Ny ledtråd; tid förbrukas | Halven kan ge besked eller avvisa |
| Lämna gården och sköt ditt eget | Alltid tillgängligt | Ingen uppdragsbindning; tid går enligt vald aktivitet | Mara, bäraren och kvarnen agerar vidare |

**Viktiga gränser:** Inget val ger automatiskt pengar, tillit eller lyckligt slut. Att skydda utsädet betalar inte skulden. Om Mara saknas eller skulden redan reglerats måste scenen ersättas av ett relevant tillstånd eller utebli.

## 5. Scen 02 — Vid kvarnen i Dorneth (villkorad fortsättning)
**Förutsättningar:** spelaren har rest dit på ett tillåtet sätt, kvarnen är tillgänglig och Edda är fortfarande relevant aktör. Restid är verklig kostnad men fastställs först i resemodellen.

> Kvarnhjulet slår tungt mot vattnet. Innanför dörren ligger säckar märkta med olika hushålls tecken. Edda ser upp från sin räkning.
>
> ”Jag kan inte mala löften”, säger hon. ”Om en skuld skjuts upp måste någon annan bära risken.”

Möjliga handlingar: **förhandla om uppskov** (kräver trovärdigt motbud), **erbjuda arbete** (om kvarnen behöver folk), **betala med egna resurser** (endast om spelaren verkligen har dem), **gå därifrån**. Edda väger sin egen försörjning, inte bara spelarens vänlighet. Om hon inte är närvarande kan spelaren lämna meddelande eller återkomma; ingen teleportering av NPC.

## 6. Scen 03 — Ryktet vid vägen (oberoende händelse)
**Triggerförslag:** en resenär, exempelvis Rovan, anländer medan spelaren är inom hörhåll. Detta kan inträffa även om spelaren aldrig hjälpt Mara. Händelsen får inte kräva en viss scenordning.

> En ryttare stannar vid brunnen. Hans följeslagare håller en blodig duk mot sidan. Någon frågar varför de rider i sådan hast.
>
> ”Det sägs att kronan står utan härskare”, svarar ryttaren. ”Mer vet jag inte.”

Spelaren kan **fråga vem som sagt det**, **hjälpa den skadade**, **föra ryktet vidare med osäkerhetsmarkering**, eller **låta bli**. Faktum: en person framför ett påstående. Inte faktum: att härskaren verkligen är död. En köpman kan ändå ändra sina köpbeslut, vilket kan påverka priserna.

## 7. Om spelaren väljer en helt annan väg
Efter första scenen ska spelaren kunna söka vanligt arbete, undersöka byn, resa när resvillkoren är uppfyllda, eller följa andra lokala möjligheter. Den centrala skuldhistorien är **inte ett obligatoriskt huvuduppdrag**. En sammanfattning av vad som hänt kan nå spelaren genom samtal, rykten eller förändrade priser — aldrig genom allvetande information.

## 8. Kontrakt mellan manus och simulering
Varje val definierar: `sceneKey` (designidentifierare, ej spel-ID), visningsvillkor, aktör, plats, kunskapskrav, tidskostnad, eventuell resurskostnad, möjliga konsekvenser, historiktext och reservväg om NPC/tillstånd ändrats. Faktiskt tillstånd, rykte, tro och lögn lagras åtskilt i framtida datamodell. Effekter måste vara **idempotenta**: samma val får inte ge dubbel belöning efter omladdning. NPC-rutiner och ekonomi tickar enligt framtida världsklocka, inte enbart när spelaren klickar dialog.

**Exempel på orsakskedja:** Edda kräver skuld → Mara behöver välja mellan utsäde och betalning → spelaren kan ingripa eller avstå → lager, skuldvillkor och relationer kan förändras → nästa scen läser nytt tillstånd. Inga utfall är förutbestämda.

## 9. Mobilgränssnitt: första skärmen
Överst: plats och tid i kompakt rad. Därefter en tydlig scenbild/porträttyta, berättelsetext med god kontrast och 3–4 stora tryckbara val. Underordnade flikar: **Person**, **Dagbok**, **Karta**; senare tillgång till arbete/handel genom kontext. Karta visas vid behov i snett uppifrån-perspektiv och separata terräng-/plats-/gränslager. Inga skatte-, armé- eller kungarikekontroller för en vanlig invånare. Bilder är framtida assets, inte krav för dokumentationssteget.

## 10. Exempel på dagboksnotiser (endast det spelaren vet)
- ”Mara berättade att kvarnen kräver betalning före marknaden.”
- ”Jag erbjöd mig att arbeta vid kvarnen. Edda har ännu inte svarat.”
- ”En resenär påstod att härskaren kan vara borta. Uppgiften är obekräftad.”
- ”När jag återvände hade priset på mjöl stigit. Jag vet inte varför.”
Dagboken får inte avslöja NPC-hemligheter eller påstå orsakssamband som spelaren inte kan känna till.

## 11. Acceptans för framtida prototyp — INTE PASS
1. Start i berättelsevy, inte strategikarta; läsbar på iPhone.
2. Minst tre meningsfulla val, inklusive att avstå, utan obligatorisk quest.
3. Ett val förbrukar tid en gång; inga dubbeffekter efter omladdning.
4. Två NPC:er kan agera självständigt och skapa synliga förändringar.
5. Dialog och val ändras om NPC flyttat, skuld reglerats eller resurser saknas.
6. Ett rykte är inte automatiskt sant; dagboken visar bara tillgänglig kunskap.
7. Resa och position kräver säker framtida modell; inga falska teleporteringar.
8. Gamla Sverige-karaktärer och sparningar är orörda.

## 12. Öppna beslut och nästa beroende
Godkänn personnamn och hushåll; bestäm startbakgrundsvariation; skriv alternativa repliker; besluta tidsskala, restider, lokala kartlägen och resurssiffror. **Före all kod: V2-02 teknisk migrationsdesign och isolering av ny fantasydata.** Denna fil ändrar inga speldata, plats-ID:n, kalender, backup, localStorage eller gammal kod. Dokumentet granskas i GitHub efter commit; Safari-test krävs inte för enbart dokumentation.
