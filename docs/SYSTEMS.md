# KRONOR & BLOD – SYSTEMS
**Status:** V2-03.6 färdigpackat för GitHub/Safari-verifiering, ej verifierat på GitHub eller Safari ännu.

## Bevarad grund
- V2-03.2B–L: karaktärer, berättelse, kalender, Mara/Edda, dagbok och NPC-samtal.
- V2-03.3B: jordbruk, 10 XP/dag, nivågräns 50 XP, karaktärsägd aktivitetsjournal med pending.
- V2-03.5: separat faktisk position, Keldra ↔ Dorneth (en dag), Varnhold ännu stängd, arbete bara på rätt plats. GitHub PASS och användarrapporterad Safari PASS.
- `character.placeId` är **startplats**, inte faktisk position. Befintliga sparformat ändras inte.

## V2-03.6 – första försörjningskedjan
- `src/v2-economy.js` lägger till ny karaktärsbunden nyckel `kronor-och-blod.fantasy.v2.character.<uuid>.economy-v1`, format `{version:1,ownerId,coins,grain,paidDays,pending}`. Ingen migration/radering.
- Saknad ekonominyckel ger 0 kopparmynt och 0 sädeskärvar. **Äldre jordbruksdagar ger ingen retroaktiv lön**; först nya betalda arbetsdagar efter denna uppdatering ger pengar/varor.
- Dagsarbete i Keldra: 1 dag, 10 jordbruks-XP via befintlig färdighetsmotor, 3 kopparmynt och 1 sädeskärve. `pending` skrivs före färdighetsaktivitet, och lönen bokförs bara om exakt arbetsdag finns i den befintliga färdighetsjournalen och kalendern avancerat exakt en dag. Vid avbrott försöker nästa ekonomiläsning slutföra samma arbete. Inga extra XP eller retroaktiv utbetalning vid omladdning.
- Dorneth: köp 1 sädeskärve för 2 kopparmynt; köp sker i **en enda verifierad ekonomisparning**, med kontroll av saldo, ägare och plats. Ingen försäljning, skuld eller dynamiska priser ännu.
- `src/v2-travel-ui.js` visar börs/inventarium, arbetsgivare vid Keldras åkrar, dagsarbete och marknad i Dorneth. `src/v2-economy.css` gör ekonomiraden läsbar.
- Beloppen är **prototypbalans**. Arbetsgivaren är en generisk gård, inte en färdig autonom NPC eller ägd verksamhet.
- Riskgräns: ekonomijournal och färdighetsjournal är olika localStorage-nycklar; `pending` är en återhämtningsmekanism, inte atomär databastransaktion. Skadade data stoppas utan automatisk radering. Backup/export kvarstår.
- Gamla karaktärer, Mara/Edda, dagbok, resor, XP, kalender och Sverige-arkiv bevaras. Ägda gårdar, andra yrken, skulder, produktion, skatter, handel och autonoma arbetsgivare är fortfarande planerade.

## Safari-acceptans
1. Keldra: börs 0, sädeskärvar 0 på karaktär utan tidigare ekonominyckel; gammal XP kvar.
2. Ett betalt arbete: kalender +1, XP +10, mynt +3, sädeskärvar +1.
3. Avbryt bekräftelse: inget ändras. Omladdning: ingen dubbel lön.
4. Res till Dorneth: +1 dag, ingen jordbruksknapp. Köp sädeskärve: mynt -2, sädeskärvar +1, ingen hel dagskostnad.
5. Otillräckliga mynt: köp stoppas. Återresa till Keldra: arbete åter tillgängligt.
6. Karaktär A→B→A: saldo/inventarium och XP separerade. Berättelse och Dagbok fungerar.
7. Skadad/avbruten sparning får inte tyst skrivas över. GitHub och Safari redovisas separat.

## V2-03.6L – Språk och framtida mynt (kodpaket, Safari-test återstår)
- `v2-travel-ui.js`: vardaglig svensk text för pengar, varor, arbete, resor och köp. `spannmål` är **enbart visningsnamn** för det befintliga lagringsfältet `grain`; antal, pris, arbete och ekonomi ändras inte.
- Pengar visas som `0 guld · 0 silver · N kopparmynt`. Silver och guld är **inte ännu aktiva valutor** och kan inte tjänas, växlas eller spenderas. Ingen växelkurs fastställd.
- `v2-economy.css`: radbrytning och tydligare text. `index.html` har cache-version `2036l`. Ingen ändring i `v2-economy.js`, sparformat, arbets- eller resemodeller.
- Kontrollera i Safari: befintligt saldo/varor identiskt före/efter, text och köp begripliga, resa/arbete/karaktärsbyte/omladdning oförändrade.
