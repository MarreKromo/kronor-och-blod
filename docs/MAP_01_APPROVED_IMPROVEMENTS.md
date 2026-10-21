# KRONOR & BLOD — MAP-01: Godkända kartförbättringar
**Beslut:** Godkänt av projektägaren 2026-10-21.
**Status:** Bindande planeringsbeslut, ej implementerad mekanik.

## Dokumentkopplingar
- [MASTERPLAN_V2.md](MASTERPLAN_V2.md): övergripande spelvision och funktionsregister.
- [ROADMAP.md](ROADMAP.md): prioritering och genomförandeordning för MAP-01.
- [WORLD_ARCHITECTURE.md](WORLD_ARCHITECTURE.md): bindande geografisk och politisk arkitektur.
- [MAP_DESIGN_01.md](MAP_DESIGN_01.md): godkänd visuell riktning 70 % historisk realism, 30 % mörk fantasy.
- [ARBETSMETOD.md](ARBETSMETOD.md): ZIP, commit, GitHub PASS/FAIL, Safari PASS/FAIL.
- [SYSTEMS.md](SYSTEMS.md): faktisk implementation, inte framtida önskemål.
- [DEVLOG.md](DEVLOG.md): verifierad utvecklingshistorik.

Detta dokument fördjupar MAP-01. Det ersätter inte något av ovanstående dokument.
Vid konflikt gäller masterplan och redan godkända arkitekturprinciper; ändringar kräver separat beslut.

## Åtta godkända förbättringar
1. **Förgrenat vägnät och verklig geografi:** korsningar, vägsträckor och bosättningar modelleras separat. Vägar kan fortsätta över regiongränser. Synlig väg innebär inte automatiskt tillåten resa.
2. **Terräng med framtida spelegenskaper:** terräng kan bära information om skog, berg, vatten, jordbruk, resurser och framtida risker utan att ny mekanik aktiveras.
3. **Kartkunskap och upptäckter:** förbered kända/okända platser och vägar samt framtida karaktärsbundna upptäckter; ingen fog-of-war eller ny sparning ännu.
4. **Separata territorier och politiska lager:** region, territorium, rike, bosättning och egendom har separata identiteter. Ett rike kan sträcka sig över regioner, flera riken kan dela region och härskarbyte ändrar inte geografiska ID:n.
5. **Flera resvägar och risker:** alternativa färdvägar, säkerhet och färdsätt förbereds, men inga restider, risker eller resebehörigheter ändras nu.
6. **Smart detaljnivå vid zoomning:** en geografisk värld med skalberoende kartdetaljer, etiketter och markörer; iPhone-prestanda prioriteras.
7. **Mobilanpassad kartvy och platsruta:** panorering, tvåfingerszoom, återgång till spelarposition, stora tryckytor och kompakt utfällbar platsruta. Inspektion och resa hålls åtskilda.
8. **Skilj geografiska avstånd från restid:** kartans längder och terräng är geografiska data; den befintliga resemodellen styr fortsatt tillåtna resor och tidskostnad.

## Befintlig kod – inventering
- `src/v2-travel.js`: nuvarande Dornmarkplatser `keldra`, `dorneth`, `varnhold`. Keldra–Dorneth är öppen; Varnhold spärrad.
- `src/v2-travel-ui.js`: platslista, platsinspektion och resor.
- `src/v2-navigation.js`: karaktärsbunden navigation.
- `src/places.js` och `src/world.js`: äldre Västergötlandsdata med VG-ID:n, får inte blandas med Dornmark.

## MAP-01 genomförande
**MAP-01.2A:** skrivskyddat geografiskt datakontrakt med stabila ortreferenser, regioner, koordinater, vägkorsningar, vägsträckor, terräng och framtida politiska lager. Isolerade tester.
**Därefter:** sammanhängande mobilimplementation av zoom/panorering, skalberoende detalj, ortval, platsruta och befintlig reseintegration. Dela upp endast om konkret risk kräver det enligt arbetsmetod v3.0.

## Skyddsregler och acceptans
- Ingen ändring av sparningar, kalender, ekonomi, NPC-system, ort-ID:n, resebehörighet eller restid utan separat uttryckligt godkännande.
- Kartklick ändrar inte faktisk position och förbrukar inte tid.
- Inga nya permanenta karaktärsfält utan ägarskap, versionering, backup/restore och tester.
- Konceptbilders extra namn, exakta ortplaceringar och restider är inte spelkanon.
- Vägnätet ska kunna förgrenas och passera regiongränser.
- Datamodellen ska tåla flera riken i samma region, ett rike i flera regioner och kontrollbyte utan ändrade geografiska ID:n.
- Keldra–Dorneth förblir tillgänglig och Varnhold spärrad.
- Safari på iPhone verifieras när spelbar implementation levererats.
- GitHub PASS/FAIL efter commit. Dokumentationspaket kräver inte Safari-test.
