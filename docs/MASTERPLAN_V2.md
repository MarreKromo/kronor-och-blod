# KRONOR & BLOD — MASTERPLAN v3.0
**Status:** Samlad produktvision och prioriteringar, helhetsinventering 2026-10-21. Detta är målbild, inte påstående om färdig implementation.

## Kärnvision
**Ett berättelsedrivet RPG på ytan – en levande politisk och ekonomisk värld under ytan.**

Ett generationsbaserat, mörkt och huvudsakligen realistiskt fantasy-RPG där spelaren börjar som en vanlig invånare i Dornmark och kan forma ett liv genom arbete, träning, vänskap, konflikter, resor, familj, politik och arv. Spelaren är inte utvald. Världen agerar även utan spelaren. Makt är en möjlig väg, aldrig ett obligatoriskt mål.

## Fastlagd inriktning
- Egen fantasyvärld med lågmäld magi/tvetydiga sägner; inga klasslåsta livsvägar.
- Första regionen Dornmark; öppningsmiljöerna Keldra, Dorneth och Varnhold. Öppningsberättelse: **Regn över Keldra**.
- Spelaren upplever världen genom aktuell scen, dialoger och handlingar. Dagboken samlar det som redan hänt. Kartan stödjer resor, inte en obligatorisk strategivy.
- NPC:er har identitet, relationer, behov, rutiner och minnen; konsekvenser ska kunna ändra framtida möten och resurser.
- Tid är en knapp resurs. Arbete, träning, resor, väntan och relationer konkurrerar om karaktärens livstid.
- Familj, barn, död, arv, dynastier och politiska förändringar är långsiktiga kärnmål, ännu inte byggda.

## Kärnsystem som INTE får prioriteras bort
### 1. Livsbakgrund och identitet
Varje karaktär har uppväxt, familjesituation, förflutet, ambition och en frivillig biografi. Bakgrunden ska kännas i världen: vilka känner dig, vem litar på dig, vilka skulder eller löften finns, vilka arbeten och samtal öppnas? Bakgrunden ska ge trovärdiga startförutsättningar men inte låsa en klass eller automatiskt skapa obekräftade familje-NPC:er.

**Nuvarande V2-grund:** `src/life-background-model.js` validerar uppväxt (`farm`, `craft`, `letters`, `freeborn`), familjesituation (`together`, `distant`, `alone`), förflutet (`ordinary`, `debt`, `promise`, `conflict`), ambition (`farmstead`, `trade`, `travel`, `influence`) och biografi. V2-karaktärsmodellen bär bakgrunden. **Aktiva spelkonsekvenser av bakgrunden är ännu inte implementerade.** En rikare skapandeupplevelse och fler välbalanserade alternativ kräver egen design- och testfas.

### 2. Färdigheter och utveckling
Färdigheter ska utvecklas genom handlingar och tid, inte genom en fast startklass. Planerad grundkatalog: **jordbruk, hantverk, handel, skriftkunskap/kunskap, social förmåga, överlevnad, ridning och strid**. Katalogen är designutgångspunkt, inte slutlig balans.

Systemet behöver erfarenhet, nivåer, svårighetsgrad, lärare/övning, tidskostnad och skydd mot repetitiv XP-farm. En bakgrund kan ge rimlig startvana eller tillgång till träning, men ska inte ge en övermäktig bonus. Äldre Sverige-prototypens `Jordbruk +2` var **en förhandsvisning, inte en aktiv bonus**. Den får inte beskrivas som fungerande V2-färdighet.

**Prioritet:** definiera färdighetskontrakt och kopplingen bakgrund → startförutsättningar → handling → erfarenhet → konsekvens **innan** större mängder uppdrag, jobb och NPC-innehåll produceras. Första aktiva färdigheten byggs som en liten, säker spelkedja.

### 3. Liv, arbete och resurser
Platsbundna aktiviteter, jobb, pengar, mat, skuld, egendom och resor ska ha tidskostnad och följder. Bygg en sammanhängande vertikal kedja före bred simulering.

### 4. Relationer och världens minne
Spelarval ska påverka NPC-relationer och framtida scener. Händelsens tid, spelarens upptäckt och beslutets tid hålls isär. Avslutade möten går till dagbok; aktuella möten visas i berättelsen.

### 5. Familj, politik och generationer
Familjer, barn, efterträdare, adelshus, titlar, riken och krig byggs ovanpå stabil identitet, tid, plats, ekonomi och NPC-modell.

## Design kontra funktion
**Mekanik först:** bakgrundsval, färdighetsregler, konsekvenser och dataskydd ska definieras och testas innan fullständig visuell omdesign. **Design därefter och parallellt i avgränsade paket:** karaktärsskapandet ska bli rikare och mer berättande, färdighetsvyn begriplig och scenen mobilvänlig. Designfasen får inte användas som ursäkt att skjuta upp själva färdighetsmotorn.

## Faktisk prototypstatus (2026-10-21)
- V2-03.2B–F.1: karaktärer, slots, separat berättelse, kalender och kalenderdesign testade.
- V2-03.2G–I: tidsstyrda händelser, sparade val och mötet med Edda; testade delkedjor.
- V2-03.2J: gemensam berättelsepresentation testad.
- V2-03.2K: aktuell scen kontra avslutade möten i dagbok; GitHub PASS och användarrapporterad Safari PASS inklusive karaktärsbyte/omladdning.
- **Inte klart:** aktiv XP/färdighetsmotor, bakgrundens spelkonsekvenser, full NPC-simulering, faktiska resor, ekonomi, relationstal, familjer och dynastier.

## Säkerhet och kontinuitet
- V2 använder separata `kronor-och-blod.fantasy.v2.*`-nycklar. Ingen tyst migration eller radering av localStorage.
- Äldre Sverige-prototyp är arkiverad som tekniskt arv; äldre testkaraktärer behöver inte bli spelbara i V2 (se `V2_02_2_ERSATTNINGSPLAN.md`). Behåll återställningsbar Git-historik.
- Ändra inte befintliga V2-sparformat för dokumentationsändringar. Kodpaket: ZIP → commit → GitHub PASS/FAIL → Safari PASS/FAIL.
- Officiell prioritering finns i `ROADMAP.md`; implementerade kontrakt i `SYSTEMS.md`; testhistorik i `DEVLOG.md`. Äldre dokument är referens/arkiv, inte parallella aktiva planer.


## 5. Helhetsvision: system som inte får tappas bort
**Regel:** Detta är en bevarandelista över mål och tidigare dokumenterade idéer, INTE ett påstående om implementering. En funktion får inte strykas tyst när roadmapen förenklas. Alla system ska stödja den öppna livsvägen, inte bli obligatoriska.

### A. Karaktär, färdigheter och vardagsliv
- Fritt karaktärsskapande: identitet, ursprung, uppväxt, familjesituation, förflutet, ambition och frivillig biografi. Fler balanserade alternativ utreds; ingen påtvingad familjehemlighet eller låst klass.
- Grundegenskaper och inlärda färdigheter är olika system. Färdighetsfamiljer från äldre plan: jordbruk, hantverk, handel, skrift/kunskap, social förmåga/förhandling, ledarskap, överlevnad/jakt, läkekonst, ridning, svärd, yxa, spjut, sköld och båge. Katalog, nivåskala och balans är öppna designbeslut.
- Träning, arbete, lärlingstid, lärare, erfarenhet, svårighetsgrad, vila, ålder, skador, tidskostnad och anti-exploit. Utveckling ska påverka faktiska handlingar och möjligheter.
- Vardag: mat, sömn, arbete, försörjning, socialt liv, personliga mål, rykte och val att avstå från uppdrag.

### B. Ekonomi, ägande och verksamheter
- Valuta, inventarium, föremål, utrustning, produktion, råvaror, förädling, lager, priser, marknader, handel, kredit, skuld, kontrakt, löner, skatter, tullar och transportkostnader.
- Försörjningsvägar som bonde, hantverkare, jägare, köpman, tjänare, soldat och andra öppna yrken. Verksamheter som gård, verkstad, handelshus, karavan, kvarn eller större egendom är långsiktiga möjliga vägar, inte redan byggda funktioner.
- Ägande, arrende, byggnader, investeringar, arbetskraft, underhåll och risk. Brist på mat, missväxt, handelshinder och krig ska kunna påverka både NPC:er och spelaren.
- Ekonomi ska vara ett sammanhängande flöde mellan människor, hushåll, platser och politiska aktörer; inte enbart en pengasiffra.

### C. NPC:er, relationer, följeslagare och egna grupper
- NPC:er är individer med egna mål, resurser, ålder, färdigheter, relationer, minnen, lojalitet och möjlighet att säga nej, flytta eller dö. Vänskap, rivalitet, kärlek, rykte, tillit och skuld är skilda relationer.
- Rekryterbara följeslagare, väpnare/lärlingar och resesällskap. De ska kunna utvecklas, ha egna behov och lämna spelaren. Detta är ett **tidigare dokumenterat framtidsbeslut** (DECISIONS D-015), inte en ny idé eller färdig kod.
- Egna grupper: följe, handelskaravan, rövarband, legosoldatgrupp, hushåll och senare armé. **Att kunna organisera och leda grupper** bevaras som tydligt mål; detaljer om gruppstorlek, order, hierarki och taktik måste designas och godkännas.
- Rekrytering, löner, utrustning, mat, moral, lojalitet, ledarskap, befäl, gruppresor och konsekvenser. Större organisationer ska bygga på samma person-, ekonomi- och tidsmodell som mindre följen.

### D. Resor, platser och levande samhällen
- Egen världskarta, regionala kartor, stabila plats-ID:n, terräng och separata politiska gränslager. Faktisk position skiljs från markerad plats.
- Resor till fots, till häst, med vagn eller följe; tidsåtgång, vägar, väder, årstider, risk, möten, kostnader och kunskap om platser. Fog of war/kartkunskap är tidigare planerat.
- Byar, marknadsorter, städer, borgar, gårdar, hamnar och hushåll med befolkning, produktion, resurser, handel, ordning och lokal makt. Invånare agerar även utan spelaren.

### E. Familjer, arv, dynastier och makt
- Familj, partnerskap, kärlek, giftermål, barn, släktband, hushåll, åldrande, sjukdom, död, arv och möjlighet att fortsätta som efterträdare.
- Hus och dynastier med släktträd, historia, anspråk, relationer, egendom och eventuell heraldik. Skilj ägande, titel, ämbete, legitimitet och faktisk politisk kontroll.
- Adel, vasaller, eder, riddarskap, skatter, diplomati, tronföljd, allianser, uppror, gränsförändringar, rikesbildning och krig. Ingen garanterad kungaväg.
- Rekrytering och försörjning av soldater, borgar och arméer; löpande kostnader och verkliga risker. Krig och politik växer ur resurser och människor, inte separata frikopplade knappar.

### F. Berättelser, uppdrag och information
- Lokala händelser, yrkesliv, frivilliga uppdrag, större berättelsekedjor och världshändelser samspelar. Spelaren kan avstå utan att världen fryser.
- Författade scener med villkor, alternativ, kostnad, följd och reservvägar när NPC eller världstillstånd ändras.
- Rykten, lögner, hemligheter, verkliga fakta och spelarens kunskap hålls åtskilda. Dagbok, historik och släktkrönika visar vad karaktären faktiskt vet.
- Ingen odödlig questgivare, ingen obligatorisk huvudquest och inga garanterade resultat.

### G. Presentation, tillgänglighet och teknik
- Mobilförst: berättelse/dialog i centrum; karta, person, dagbok, inventarium och senare grupp/egendom/politik som kontextuella vyer.
- Jordnära, mörk och läsbar lågfantasystil; bättre bakgrund, porträtt, karaktärsskapande, kartgrafik, miljöer, heraldik och UI. Design är ett eget arbete, men mekanikerna får inte vänta på grafiken.
- Bestående, versionsmärkta och karaktärsbundna data; säker backup/export/import innan omfattande simulering; ingen tyst reset. GitHub- och Safari-test separat.

## 6. Beslutade principer, föreslagna detaljer och öppen omfattning
**Belagt i tidigare dokument:** DECISIONS D-013–D-017 om resor, öppna livsvägar, självständiga följeslagare, grupper, gårdar, borgar, arméer och resurskostnader; KB_PLAN_01 om färdigheter och aktivitet; IMP-025 om livsbakgrund; V2_01_3 om hushåll, arv, skuld, relationer och makt; V2_01_2 om världshändelser; V2_01_4 om grafisk riktning. Detta bevaras som produktmål när Sverige-kontexten ersätts av Dornmark.

**Utvecklingsförslag att godkänna separat:** exakt antal färdigheter och nivåer, hur grupporder fungerar, taktik/stridssystem, marknadsekvationer, detaljgrad i NPC-simulering, barn-/arvsregler, omfattning av kartan och grafiska assets. Ingen specifik mekanik påstås beslutad enbart för att den nämns som exempel här.

**Konflikt i äldre dokument:** gamla MASTERPLAN v2.0 krävde bevarande/migration av Sverige-testkaraktärer; V2_02_2_ERSATTNINGSPLAN ändrade detta uttryckligen. Nuvarande riktning är separat fantasy-v2 med bevarad Git-historik, inte spelbar migration av äldre testkaraktärer. **Inga gamla localStorage-nycklar raderas automatiskt.**

## 7. Styrregel för framtida ändringar
- Masterplanen är **funktionsregister och produktlöfte**; roadmapen anger ordning och beroenden; SYSTEMS anger verkligt tekniskt läge; DEVLOG anger verifierade testresultat.
- Varje framtida planändring ska redovisa: BEVARAS / ÄNDRAS / UTGÅR och skälet. **UTGÅR kräver uttryckligt godkännande från projektägaren.**
- Att ett system saknas i aktuell sprint betyder aldrig att det är bortvalt. Skilj alltid BESLUTAT MÅL, DESIGNFÖRSLAG, IMPLEMENTERAT och TESTAT.
- Denna v3 är en spårbar sammanställning av granskade huvuddokument och centrala äldre designfiler; inte en påstådd rad-för-rad-granskning av varje arkivfil eller varje kodmodul.

## Beslut 2026-10-21: begripligt språk och mynt i Dornmark
- **Språkregel:** En spelare från ungefär 12 års ålder ska förstå menyer, priser, uppdrag och konsekvenser utan att slå upp historiska ord. Berättelsen ska vara stämningsfull, men tydlig. NPC:er får ha olika röster; undvik ogenomskinligt ålderdomligt språk och modernt slang.
- Vardagliga varor och gränssnitt använder begripliga namn: **spannmål** i stället för **sädeskärve**, **Dina pengar** i stället för **Börs**, **Din väska** i stället för **Inventarium**. Historiska titlar som fogde förklaras första gången: exempelvis en person som samlar in skatt åt härskaren.
- **Beslutad långsiktig valuta:** koppar, silver och guld. Silver ska spela en viktig roll och guld vara sällsynt. Den exakta växelkursen och historiskt inspirerad värdebalans beslutas separat före införande av silver- och guldtransaktioner. Ingen automatisk 100:1-konvertering antas.
- **Aktuell teknisk gräns:** V2-03.6 lagrar enbart kopparmynt i `economy-v1.coins`. Gränssnittet får visa `0 guld · 0 silver · X kopparmynt` som tydlig förhandsvisning, men inga silver- eller guldmynt kan ännu tjänas eller spenderas. Befintliga kopparvärden får inte räknas om eller migreras tyst.
- Ägande, handel, skatter, skulder, resor, följeslagare och politik använder samma framtida ekonomiska grund; ingen tidigare beslutad funktion tas bort.
