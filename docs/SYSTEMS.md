# KRONOR & BLOD – SYSTEMS
**Status:** V2-03.3B kodpaket för GitHub/Safari-test; ej verifierat på användarens GitHub ännu.

## Befintlig V2-grund
- `src/v2-data-contract.js`: V2 UUID och karaktärsbundna nycklar.
- `src/life-background-model.js`: skrivskyddad bakgrundsmodell med uppväxt, familj, förflutet, ambition och biografi. Bakgrund ger ännu inga aktiva bonusar.
- `src/v2-character.js`: tre karaktärsplatser. Berättelse, kalender, Mara/Edda och dagbok använder befintliga moduler.
- V2-03.2L: GitHub PASS och användarrapporterad Safari PASS.

## V2-03.3A – beslutat designkontrakt
- Inlärda färdigheter är skilda från framtida grundegenskaper; ingen låst klass.
- Föreslagen katalog: jordbruk, hantverk, handel, skriftkunskap, förhandling, ledarskap, läkekonst, överlevnad/jakt, ridning, svärd, yxa, spjut, sköld och båge.
- XP kräver verklig aktivitet med tidskostnad. Ingen XP från dialog eller sidöppning. Bakgrundens startbonusar är ännu inte beslutade.
- Äldre Sverige-prototypens Jordbruk +2 är ingen aktiv V2-bonus.

## V2-03.3B – första vertikala färdighetskedjan (EJ SAFARI-TESTAD)
- Nya `src/v2-skills.js`, `src/v2-skills-ui.js`, `src/v2-skills.css`; `index.html` laddar dem med cacheversion `2033b`.
- Karaktärsfliken visar jordbruk, nivå, erfarenhet och knappen **Arbeta en dag på åkern**.
- Arbete förbrukar en hel dag via `KB_V2_CALENDAR.advanceDay()` och ger 10 XP; nivå = `1 + floor(XP / 50)`. Detta är prototypbalans, inte slutlig nivåkurva.
- Lagring: `kronor-och-blod.fantasy.v2.character.<uuid>.skills-v1`, format `{version:1,ownerId,entries:[{kind:'farm',day}],pending:null|{kind:'farm',day}}`.
- `pending` skrivs och verifieras före kalenderförflyttning. Återhämtning kan fortsätta kalendersteget eller slutföra XP-bokföringen vid nästa läsning. XP härleds från avslutade, unika arbetsdagar; ett pågående steg ger inte XP.
- Första arbetsdagen registreras med kalenderns `elapsedDays` före förflyttning. Max ett registrerat jordbruksarbete per dag, och varje aktivitet flyttar dagen framåt.
- Ingen lön, inventarium, bakgrundsbonus, tränare, misslyckande eller fullständig XP-katalog i denna första vertikala kedja.
- Befintliga karaktärsposter, berättelse, Mara/Edda, kalenderformat och gamla Sverige-sparningar skrivs inte om av installationen.
- **Känd begränsning:** om lagringen misslyckas efter att ett `pending` har skrivits måste nästa läsning kunna slutföra det. Under ett sådant fel kan annan kalenderaktivitet behöva stoppas tills journalen återhämtats. Safari-test och felinjektion återstår.

## Acceptans – kräver användartest
1. På Karaktär: jordbruk nivå 1, 0/50 XP före arbete (på en ny testkaraktär).
2. Ett arbete: kalendern +1 dag, 10 XP; fem arbeten: nivå 2.
3. Omladdning och byte A→B→A: varje karaktär behåller sin egen erfarenhet.
4. Dubbeltryck, nekad bekräftelse och omladdning ger ingen gratis XP.
5. Berättelse, Mara/Edda och dagbok fungerar fortsatt.
6. GitHub PASS och Safari PASS redovisas separat; skadad data får inte raderas automatiskt.

## Fortsatta system
Masterplan v3.0 och Roadmap v3.0 bevarar ekonomi, handel, egendom, resor, följeslagare, grupper, familjer, dynastier, politik och krig.
