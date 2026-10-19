# KB-03.6.1 – Kvalitet och förbättringar
Datum: 2026-10-19
Status: BESLUTAT – ännu inte implementerat eller Safari-testat

## Bakgrund
Efter KB-03.6 beslutades att förbättra redan fungerande funktioner innan nästa berättelsekapitel utvecklas. Målet är ett sammanhängande, välgjort historiskt RPG, inte bara fler funktioner.

KB-03.6 har användarbekräftat PASS inom testad omfattning: två olika berättelsevägar (relation 0 och +1), bestående val/ledtrådar efter omladdning samt fungerande karta och kalender. Detta är inte ett fullständigt test av alla sex val.

## Fast arbetsregel
**Varje större funktion ska följas av en förbättrings- och testomgång innan vi bygger vidare.**

Förbättringar ska dokumenteras, genomföras i små avgränsade paket och verifieras enligt befintlig arbetsmetod:
1. Plan och beslut dokumenteras.
2. Befintliga GitHub-filer granskas före kodändring.
3. Kompletta färdiga filer levereras i en verifierad ZIP – ingen manuell kodredigering.
4. Användaren laddar upp och committar via iPhone/GitHub.
5. Assistenten verifierar uppladdade filer i GitHub.
6. Användaren testar i Safari och ger PASS/FAIL.
7. Testresultat och daglig logg dokumenteras före nästa steg.

## Prioriteringar för KB-03.6.1
### P1 – Rätta inaktuella berättelsetexter
Ragnhilds tidigare scen säger fortfarande att fortsättningen kommer i nästa paket, trots att kapitel II redan är aktivt. Rätta detta utan att ändra sparade beslut.

### P2 – Förbättra berättelseflödet
Kapitel I och II ska upplevas som en sammanhängande berättelse i stället för två isolerade informationsrutor. Börja med små ändringar i presentation och övergång, inte en fullständig UI-ombyggnad.

### P3 – Tydligare konsekvenser
Gör det lättare att förstå vilka direkta effekter ett beslut har (t.ex. ledtrådar, relation, upplåsta möjligheter) utan att avslöja alla framtida följder. Undvik att framställa kosmetiska textvariationer som stora spelmekaniska konsekvenser.

### P4 – Testa relation −1
Testa den tredje berättelsevägen och säkerställ att spelaren kan fortsätta trots Ragnhilds misstro. Kontrollera sparning efter omladdning och regression för karta/kalender. Testa gärna fler av de sex undersökningsvalen.

### P5 – Förbereda riktiga sparfiler
Nuvarande prototyp identifierar berättelsesparningar genom namn och bakgrund, ibland också tidigare val. Olika testkaraktärer med samma uppgifter kan därför ärva tidigare händelser. Planera stabilt unikt karaktärs-ID och migrering av befintliga testdata innan implementation. Gör detta som ett eget, särskilt testat paket för att minimera risk för förlorade framsteg.

## Designmål
- Berättelsen ska kännas levande och kontinuerlig.
- NPC:n Ragnhild ska reagera begripligt på spelarens val.
- Spelaren ska kunna se upptäckta ledtrådar, med möjlighet till en framtida journal.
- Spelarens beslut ska få verkliga, bestående följder, inte enbart alternativ text.
- Historisk trovärdighet ska bevaras; fiktiva intriger ska inte presenteras som dokumenterad historia.
- Ingen omfattande ombyggnad av gränssnittet i första förbättringspaketet.

## Avgränsning och ordning
1. Avsluta och verifiera KB-03.6-dokumentationen i GitHub om den ännu inte är uppladdad.
2. Genomför P1–P3 som ett eller flera små förbättringspaket med Safari-test.
3. Genomför P4 med särskilt test av relation −1.
4. Planera och genomför P5 separat, med tydlig strategi för äldre sparningar.
5. Först därefter planeras nästa större berättelsekapitel.

## Godkännandekrav
- Inaktuella texter borttagna.
- Kapitelövergång och direkta konsekvenser begripligare.
- Ingen oavsiktlig förändring av befintliga sparade val.
- Relation −1 verifierad eller uttryckligen kvar som ej testad.
- Karta, kalender, karaktärsprofil och tidigare berättelse fungerar.
- GitHub-verifiering och Safari PASS/FAIL dokumenterade.

## Dokumentstatus
Detta är ett besluts- och planeringsdokument. Inga av förbättringarna ovan får anges som genomförda förrän kodändringar, GitHub-kontroll och användartest faktiskt har skett.
