# V2-03.2H – Händelser och konsekvenser, första paketet

## Källor och principer
Granskat V2 `v2-events.js`, `v2-events-ui.js`, `v2-calendar.js`, `v2-story-binding.js`, `v2.js` och äldre `encounter.js` / `investigation.js`. Anpassar deras grenval och identitetskontroller utan att ladda gammalt innehåll.

## Funktion
- Keldras utsädeshändelse inträffar i modellen dag 3, blir tillgänglig från dag 3 och kan upptäckas senare.
- Visar separat **händelsedag** och **nuvarande dag**. När ett svar väljs sparas **besluts-/upptäcktsdag**.
- Två svar per berättelsegren med bestående textkonsekvens och flagga i separat, karaktärsbunden nyckel.
- Sparar endast efter uttryckligt val; ingen automatisk migration eller nollställning.
- Tidigare händelser i V2-03.2G har ingen historisk upptäcktsstämpel. Sådan kan inte rekonstrueras säkert; datum sparas först när ett nytt beslut görs.
- Ändrar inte berättelsens befintliga sparning, kalender, karaktär, dagbok eller gamla nycklar.
- Beslutets flagga är lagrad och synlig, men ännu inte integrerad med NPC-relationer, resurser eller nya händelsekedjor.
- Ändring av berättelsegren efter sparat beslut skyddas och kräver separat framtida designbeslut. Nollställ inte berättelsen under testet.

## Safari-test
1. Befintlig karaktär på dag 6 ser händelsedag 3 och nuvarande dag 6.
2. Två val syns; välj ett och kontrollera att konsekvensen visas.
3. Ladda om: samma beslut och dag för beslutet finns kvar, utan nya val.
4. Fortsätt dagen: händelsen och beslutet finns kvar, men dagens datum ökar.
5. Byt karaktär: beslutet blandas inte ihop med den andra karaktären.
6. Dagbok, Platser, Karaktär döljer händelsen; kalender och berättelse fungerar.

## Säkerhetsgräns
Ny nyckel: `kronor-och-blod.fantasy.v2.character.<uuid>.event.keldra-seed-v1`. Ägarkontroll och validering; ingen radering eller tyst återställning. Detta är första vertikala skivan, inte komplett autonom värld.
