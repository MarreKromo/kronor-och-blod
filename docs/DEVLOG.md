# KRONOR & BLOD – DEVLOG

## Verifierad historik
- V2-03.2B–K: karaktärer, kalender, berättelse, Mara/Edda och dagbok; tidigare GitHub/Safari PASS inom testad omfattning.
- V2-03.2L: NPC-samtal, GitHub PASS och användarrapporterad Safari PASS.
- KB-DOC-04: Masterplan v3.0 och Roadmap v3.0, GitHub PASS.
- V2-03.3A: färdighetskontrakt, GitHub PASS.
- KB-DOC-05: Arbetsmetod v3.0, GitHub PASS; sammanhängande paket är standard.
- V2-03.3B: jordbruk och färdigheter, GitHub PASS och användarrapporterad Safari PASS.
- **V2-03.5: avslutat.** Resor, position och platsbaserat arbete; GitHub PASS och användarrapporterad Safari PASS. Tidigare skärmbild med gammal platsvy följdes av korrekt laddad resepanel.

## Fast designbeslut
Karaktären har färdigheterna, platsen erbjuder möjligheterna, ägandet ger nya möjligheter. Resor, yrken, handel, gårdar, följeslagare, familj, dynastier, politik och arméer bevaras i Masterplan v3.0. Äldre resplan `KB_B1_POSITION_RESOR_PLAN.md` förblir referens.

## V2-03.6 – sammanhängande ekonomi- och försörjningspaket
- Nya `src/v2-economy.js`, `src/v2-economy.css`; ändrade `src/v2-travel-ui.js`, `index.html`, `docs/SYSTEMS.md`, `docs/DEVLOG.md`.
- Första riktiga lönearbete: jordbruk i Keldra ger tid + XP + 3 kopparmynt + 1 sädeskärve; första marknadsköp i Dorneth kostar 2 kopparmynt. Separat karaktärsbunden ekonomijournal med pending och verifierad engångsbokföring.
- Äldre arbetsdagar betalas inte retroaktivt; gamla sparningar skrivs inte om av installationen.
- **Status: ZIP för användarens commit. GitHub PASS och Safari PASS återstår.**

## V2-03.6L – Språkförbättring och myntvision
- Efter användarens skärmbild från Dorneth beslutades begriplig svenska för yngre och vuxna spelare. Spannmål ersätter sädeskärve **i UI**, och pengar/väska ersätter börs/inventarium.
- Koppar, silver och guld beslutade som framtida valutor; ännu bara koppar aktivt i ekonomi-v1. Växelkurs inte beslutad. Befintliga sparningar lämnas oförändrade.
- Detta paket: 6 kompletta filer. **Status: väntar på GitHub-commit och Safari-test; inte PASS ännu.** V2-03.6:s fullständiga ekonomitest är fortfarande inte uttryckligen slutgodkänt.
