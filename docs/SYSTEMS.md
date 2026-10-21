# KRONOR & BLOD — SYSTEMS
Teknisk nulägesbeskrivning 2026-10-21. Dornmark. Detta är faktiskt implementerade system, inte hela produktvisionen.

## Befintliga system
- Karaktärsseparerad berättelse, dagbok och NPC-samtal från V2-03.2-serien.
- Jordbruk i Keldra: +1 dag, +10 jordbruks-XP, +3 koppar och +1 spannmål. Karaktärsägd aktivitetsjournal och pending-skydd; 50 XP för första nivån.
- Position i `.travel-v1` är skild från oföränderlig startplats `character.placeId`. Keldra–Dorneth tar en dag. Varnhold är ännu inte resbar.
- Ekonomi i `kronor-och-blod.fantasy.v2.character.<uuid>.economy-v1` med `{version:1,ownerId,coins,grain,paidDays,pending}`. Köp av ett spannmål i Dorneth kostar två koppar. Ingen retroaktiv lön för äldre arbete.
- `pending` för arbete/ekonomi ger återhämtningsmekanism, inte atomär databastransaktion. Ogiltiga sparningar får inte tyst ersättas.
- UI visar koppar, silver och guld; endast koppar fungerar. Ingen beslutad växelkurs. `grain` förblir lagringsfältet för spannmål.
- V2-03.7 tog bort bekräftelser för resa och Fortsätt dagen; arbete och köp har fortfarande sina tidigare bekräftelser.
- V2-03.8 förbättrade mobilflödet för plats, arbete och handel.
- V2-03.9 korrigerade jordbrukets platskontroll till `KB_V2_TRAVEL.getState().placeId`.

## V2-04 KOMPLETT — första NPC-vardagsmodellen
- `src/v2-npc-life.js` deklarerar tre NPC:er: Mara (`keldra`), Toren (`keldra`) och Edda (`dorneth`). Varje person har tre förutbestämda rutiner och tre behov som väljs deterministiskt utifrån dagnummer.
- `getState()` jämför kalenderns och resans karaktärs-ID och använder faktisk position för vilka NPC:er som är tillgängliga.
- Varje spelarkaraktär får separat `.npc-life-v1` med `{version:1,ownerId,memories:{npcId:{choice,day}}}`. Endast ett första möte per NPC kan sparas. Valet `help` ger visat förtroende +2, `listen` +1. Det är ett härlett visningsvärde, inte ett separat ackumulerande relationskonto.
- `decide()` validerar ägare, schema, val, plats, dag och förväntat råvärde före verifierad skrivning. Inga befintliga ekonomi-, kalender-, berättelse- eller reseformat ändras.
- `src/v2-npc-life-ui.js` visar ett kompakt personval i Berättelsefliken; `src/v2-npc-life.css` stylar det för mobil.
- Det nya Edda-vardagsmötet är **separat från** tidigare berättelsemötet med Edda i `src/v2-npc.js`; dessa två sparningar och konsekvenser är inte sammankopplade.

## Kända begränsningar
- Rutiner och behov är schemalagda textvarianter, inte autonom NPC-simulering. NPC:er förbrukar ännu inte varor eller driver produktion.
- Möten kan inte upprepas; relationstal kan inte växa över tid och påverkar ännu inte nya handlingar.
- Berättelsefliken har fortfarande flera sektioner och mycket scrollning. Kommande fördjupning ska integrera möten bättre, inte stapla fler paneler.
- Full ekonomiregression, ägarseparation vid karaktärsbyte för senaste NPC-tillägget, felaktiga lagringsdata, full kalendercykel och V2-backup/import är inte formellt testade.
- Egendom, dynamiska priser, skuld, familjer, följen, politik och fulla hushåll är framtida funktioner.
