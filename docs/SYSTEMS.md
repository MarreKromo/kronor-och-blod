# KRONOR & BLOD — SYSTEMS
Teknisk nulägesbeskrivning 2026-10-21. Beskriver implementation, inte hela masterplanen.

## Befintlig V2-grund
- Karaktärsbunden berättelse, dagbok, kalender och äldre separat Edda-händelse.
- Jordbruk i Keldra: +1 dag, +10 jordbruks-XP, +3 koppar och +1 spannmål, med journal och pending-återhämtning.
- Resa Keldra–Dorneth tar en dag; faktisk plats från `.travel-v1`. Varnhold ännu stängd.
- `.economy-v1`: `{version:1,ownerId,coins,grain,paidDays,pending}`. Dorneth-köp 2 koppar per spannmål. Silver/guld är visning, inte fungerande valuta.
- V2-03.7–.9: resor/dagbyte utan bekräftelser, mobilvy och korrekt platsbundenhet.

## V2-04/R/S — NPC-relationer
- `src/v2-npc-life.js`: Mara/Toren i Keldra, Edda i Dorneth. Deterministiska rutiner och behov, inte full NPC-autonomi.
- `.npc-life-v1` sparar första mötet per karaktär. `.npc-relations-v1` sparar senare möten per karaktär, max 500 per NPC, högst ett per dag.
- Hjälp ger +2 förtroende, lyssna +1; råd kan väljas från +5, ger ingen belöning. Förtroende härleds ur möteshistoriken.
- `src/v2-npc-life-ui.js` visar samtal, förtroende, vardag och historik. Äldre berättelse-Edda är ett separat system.

## V2-05A–D — lokal försörjningskedja
- `src/v2-local-economy.js` bygger ett separat karaktärsbundet lokalt lager-/flödestillstånd kopplat till kalender och marknad.
- Keldra producerar spannmål; Dorneth får leveranser och marknadsköp påverkar tillgängligt lager. Produktion sker även utan spelarens gårdsarbete (V2-05D).
- Spelarens ägodelar och traktens lager är skilda begrepp. Ekonomins befintliga `.economy-v1`-kontrakt ska förbli kompatibelt.
- NPC:ernas försörjningsrepliker ger författad kontext om tillgång och handel; detta är inte självständiga hushåll med full resursförbrukning.
- Marknadsknappen speglar tillgängligt lager och slutsålt tillstånd.

## V2-05E — försörjningspresentation
- `src/v2-local-economy-ui.js` visar separata lagerkort för Keldra och Dorneth, statusförklaring och hopfällbar redovisning av produktion, leveranser, köp och arbetsdagar.
- UI:t läser befintligt försörjningstillstånd; presentationen i sig är inte en ny ekonomisk transaktion.

## V2-05F — individuella platsvyer
- `src/v2-travel-ui.js` visar en ortsöversikt och en vald orts egen detaljvy med relevanta lokala aktiviteter.
- Att undersöka en ort ändrar inte spelarens faktiska position eller dag. Reseknappen använder befintligt `KB_V2_TRAVEL.travel()`.
- Keldra visar jordbruksaktivitet; Dorneth visar kvarnmarknad; Varnhold är ännu inte öppen som resmål.
- Detta är **inte** en geografisk världskarta och inte ett färdigt generellt ortsdatakontrakt.

## Planerat, ej byggt
- Huvudfliken Översikt, återställning av senast aktiv flik per karaktär, geografisk världskarta, regionala kartor, kartkunskap och utbyggd datadriven ortskatalog.
- Fysiska bostäder/egendomar är ett separat framtida system och ska inte förväxlas med Översikt.

## Begränsningar och säkerhet
- Full ekonomiregression, avbrotts-/pending-felvägar, karaktärsbyte under alla transaktioner, korrupta journaler, långtidssimulering och backup/export/import återstår att verifiera samlat.
- `pending` är återhämtningsdesign i localStorage, inte en atomär databastransaktion.
- Den äldre ihållande berättelsepanelen kan finnas kvar. Den får inte städas bort på ett sätt som raderar sparade beslut.
