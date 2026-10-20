# KRONOR & BLOD — V2-01.4 Visuell riktning
Datum: 2026-10-20
Status: DESIGNFÖRSLAG / art direction, ej fastställd kanon och inga färdiga spelassets.
Underordnat `MASTERPLAN_V2.md`; kompletterar V2-01 världsbibel, V2-01.2 berättelse och V2-01.3 blodslinjer. Ingen ny parallell masterplan.

## 1. Visuellt löfte
Mörk, jordnära, trovärdig medeltidsfantasy. Världen är bebodd och sliten: lera, rökt trä, kall sten, vaxljus, väderbitna ansikten, verkliga arbetsredskap. Inte högfantasy med lysande magi, överdimensionerade rustningar eller ett allmänt glansigt mobilspelsutseende.

Tre ord: **levande, historietyngd, mänsklig**. Konst ska förklara platsens funktion, klasskillnader, ekonomiska resurser och politiska tillhörighet.

## 2. Bildspråk och palett
- Bas: dämpad jord, järngrått, sot, mörkt trä, kalksten och pergament.
- Accenter: djup vinröd för makt/blod, blekt guld för privilegium, kall blågrå för avstånd och vinter.
- Läsbarhet prioriteras framför mörker: tydlig kontrast och stor text på iPhone.
- Material ska kännas taktila; symboler ska gå att urskilja även utan färg.
- Undvik modern neon, plastliknande 3D, generiska guldglänsande fantasygränssnitt och dekorativa detaljer som skymmer information.

## 3. Karta: två nivåer
**Världskarta:** illustrativ politisk karta med kust, berg, floder, skogar och vägar. Geografin är överordnad gränserna. Gränser kan ändras under spelets gång; lås därför inte riksgränser i en enda bakgrundsbild. Terrängbas och politiskt lager hålls separata.

**Regionkarta:** läsbara bosättningar, broar, kvarnar, borgar, vägar, fält, skog och transportleder. En by ska se ut som jordbruk, en hamn som handel och en gruvort som bergsbruk.

Första kartan får vara ett KONCEPT. Inga slutliga koordinater, huvudstäder eller permanenta ID:n beslutas genom en illustration.

## 4. Riken: regional variation, inte slutgiltig heraldik
Utgå från arbetsnamnen i världsbibeln. Följande är visuella motiv, inte låsta färger eller vapensköldar:
- Valdren: slätter, stenborgar, spannmålsfält, slitna kungliga banér.
- Nordmark: mörka barrskogar, järnbruk, träfästen och bergspass.
- Seldor: vindpinade hamnar, saltbodar, fartyg och väderbitet kuststen.
- Avarin: floddalar, kvarnar, broar, odlingar och välbyggda gårdar.
- Kharven: högländer, koppar, gränsborgar, boskap och dammiga vägar.
- Merovia: flodmynningar, magasin, marknader, tullhus och köpmannasigill.

Inga vapensköldar fastställs innan husnamn, släktskap och politiska band godkänts.

## 5. Porträtt och människor
Halvrealistiska, måleriska porträtt med trovärdig anatomi och kläder. Ålder, arbete, sjukdom, väder och samhällsklass ska synas. En bonde ska inte se ut som en hovperson med enklare färger. Håll ljussättning och bildutsnitt enhetliga så att en karaktär kan visas i profil, relationsträd och berättelsescen.

Porträtt av Elira Vael, Odrik Vael, Ingrid Björk och andra är preliminära tills deras roller och utseenden godkänts. Ingen genererad bild är automatisk kanon.

## 6. Bosättningar och town management
Miljöbilden ska förmedla produktion: åkrar och förråd i Björkdal, kvarn och bro i Vadköping, vägtull och försvar i Gränsborgen. När byggnader tillkommer ska samma plats kunna förändras visuellt. Produktions- och lagerdata är speltillstånd; bilden är representation, inte datakälla.

Första UI-princip: tydlig vy för mat, råvaror, befolkning, arbetskraft, ordning och skatt. Prioritera användbarhet på mobil framför stora dekorativa paneler.

## 7. Heraldik
Vapensköldar byggs av separata regler: sköldform, fält, symbol och begränsad färgpalett. Varje hus får en egen igenkännbar symbol. Samma symbol används i karta, diplomati, porträtt och släktträd. Heraldiken ska kunna bytas vid dynastisk förändring utan att kartans grundbild måste målas om.

## 8. Första begränsade konceptomgången
Föreslagen ordning, först efter godkännande av detta dokument:
1. En **stilbild**: Björkdal i regn, människor och jordbruk, utan UI.
2. En **porträttstudie**: två samhällsklasser i samma konststil.
3. En **kartstudie**: Gränsdalens flod, by, köping och borg, tydligt märkt som koncept.
4. En **heraldisk studie**: symbolsystem, inte officiella husvapen.

Bedöm varje studie efter ton, trovärdighet, läsbarhet på iPhone, igenkänning och möjlighet att återanvända stilen. Godkänd stil ≠ godkända ortnamn, gränser eller karaktärsfakta.

## 9. Assetstruktur — plan, inte implementering
När riktiga spelassets tas fram: `assets/world/`, `assets/regions/`, `assets/portraits/`, `assets/heraldry/`, `assets/ui/`. Filnamn ska använda stabila framtida ID:n snarare än visningsnamn. Optimera filstorlek, bildformat och laddning för iPhone. Bilder och data separeras. Ingen mapp behöver skapas i detta dokumentationssteg.

## 10. Beslut och gränser
Beslutat sedan tidigare: egen värld, mörk lågfantasy, levande samhällen, ekonomi och generationsberättelse. Här föreslaget: jordnära målerisk stil, kartlager, porträttprinciper och fyra små konceptstudier. Fortfarande öppet: slutlig kontinentgeografi, namn, husvapen, färger, specifika karaktärsutseenden, kalender och UI-design.

## 11. Acceptans och säkerhet
V2-01.4 är endast ett nytt underdokument. Ingen kod, `localStorage`, backup, kalender, gammalt plats-ID eller karaktärsdata ändras. Gamla Sverige-prototypen bevaras. Dokumentet granskas i GitHub efter commit; Safari-test krävs inte. V2-02 säker migrationsdesign måste ske innan fantasyvärlden kopplas in i spelet.
