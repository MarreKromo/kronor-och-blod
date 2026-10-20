# SVERIGE: Kronor & Blod — IMP-025 · 3H.12.2
## Säker plan för karaktärens bakgrund

**Status:** DESIGN / GRANSKNING — ingen implementation, inga sparningar ändrade.
**Föregående:** 3H.12.1 kodinventering.
**Nästa:** 3H.12.3 skrivskyddad modell/prototyp och tester, innan några nya sparnycklar införs.

## 1. Utgångsläge, verifierat i koden

- `src/character.js` lagrar den aktiva karaktären i `kronor-och-blod.character.v1` och binder ett separat ID i `kronor-och-blod.character.identity.v1` till exakt råtext (`characterRaw`).
- `src/slot-creator.js` skapar nya, inaktiva sparplatser med ett nytt ID och enbart en ny `kronor-och-blod.slot.v1.<id>`-nyckel.
- `src/character-slots.js` samlar en uttrycklig lista av aktiva sparnycklar när en aktiv karaktär sparas till en slot.
- `src/slot-restore-preflight.js` tillåter bara uppräknade nycklar och underkänner okända fält i slotens `entries`.
- `src/slot-switch-preflight.js` granskar nuvarande aktiva data och målsparplats före byte.
- `src/character-switch.js` flyttar endast en fast uppsättning nycklar, skriver återställningsjournal och verifierar/återställer vid fel.
- Nuvarande berättelse, möten, undersökning, kalender och dagbok har separata spar-/ägarposter. Dessa ska inte ändras av bakgrundsarbetet.

## 2. Beslut: separat, karaktärsägd bakgrundspost

**Föreslagen ny datanyckel:** `kronor-och-blod.life-background.v1`.
**Föreslagen ägarnyckel:** `kronor-och-blod.life-background.owner.v1`.

Bakgrunden lagras som en separat post i stället för att skriva om `character.v1`. Det bevarar byte-för-byte-kopplingen mellan befintlig karaktär och dess identitet. Båda nya nycklarna måste behandlas som ett par och inkluderas i slots, förkontroller, bytesmotor och återställningsjournal innan någon kod får skriva dem.

### Föreslagen struktur (schemaförslag, inte produktionsdata)

```json
{
  "version": 1,
  "upbringing": "farm",
  "familySituation": "known_family",
  "past": "quiet_childhood",
  "ambition": "independence",
  "biography": ""
}
```

Ägarposten ska innehålla `version: 1`, rätt `characterId` och **exakt** bakgrunds-JSON i fältet `backgroundRaw`, enligt principen som används för kalender och dagbok. Ingen familjemedlem eller NPC skapas ännu. `biography` är frivillig fritext med längdgräns och säker textvisning.

Värdena ovan är **exempel**, inte slutligt beslut om tillåtna alternativ eller historisk balans. Befintligt `character.background` (bonde/hantverkare/skrivare/friboren) är fortsatt startbakgrund och ska inte blandas ihop med den nya livshistoriken.

## 3. Kompatibilitet och migration

1. **Äldre karaktärer:** frånvaro av båda nya nycklarna är giltigt och betyder *bakgrund ännu inte vald*. Ingen automatisk ifyllnad vid sidstart eller karaktärsbyte.
2. **Nya karaktärer:** skapas först som idag. Utökad bakgrund får tillkomma först när alla säkerhetskontroller är uppdaterade och testade.
3. **Parregel:** om endast data eller endast ägarpost finns ska läsning/byte stoppas säkert; skriv inte över okända uppgifter.
4. **Ägarkontroll:** ID måste överensstämma med aktiv karaktär respektive slotens `characterId`; `backgroundRaw` måste vara byte-exakt lika med data.
5. **Versionsregel:** endast känd `version: 1` accepteras. Framtida format kräver separat migrationsplan.
6. **Ingen tyst uppgradering:** Mk, Erik och Sven lämnas oförändrade tills användaren aktivt väljer att lägga till bakgrund.

## 4. Implementation i säkra, små delpaket

**3H.12.3 — Skrivskyddad modell:** definiera schema och validering utan `localStorage.setItem`, ändringar i index eller aktivt sparflöde. Testa giltiga/ogiltiga fält och textgränser.

**3H.12.4 — Förkontroller:** uppdatera `slot-restore-preflight` och `slot-switch-preflight` så att både frånvaro och ett korrekt data-/ägarpar accepteras, men ensamma, okända eller skadade poster avvisas. Testa utan skrivningar.

**3H.12.5 — Transaktionssäkerhet:** utöka `character-slots` och `character-switch` med exakt de två nya nycklarna; säkerställ att journalens före-/efterbild, `apply`, `equals` och `restore` omfattar dem. Regressionstest av gamla slots och avbrutna byten.

**3H.12.6 — Kontrollerad sparning:** först nu införs explicit spara-funktion för aktiv karaktär med ägarverifiering, felhantering och återställning. Separat testkaraktär först, inte Mk.

**3H.12.7 — UI:** bygg ett stegvis formulär med förhandsvisning och möjlighet att avbryta utan skrivning. Efter godkänt test kan bakgrunden visas i profilen.

**Senare:** färdigheter, konsekvenser i berättelser och familj som riktiga NPC:er kräver separata beslut och system.

## 5. Obligatoriska acceptanstester

- [ ] Befintliga Mk/Erik/Sven kan läsas och bytas utan nya bakgrundsposter.
- [ ] Ny testkaraktär kan få bakgrund; annan karaktär ser inte dess data.
- [ ] Byte A → B → A bevarar bakgrunden och befintlig berättelse, kalender och dagbok.
- [ ] Saknad ägarpost, fel ägar-ID, skadad JSON eller okänd version ger säkert FAIL utan skrivning.
- [ ] Simulerat skrivfel mitt i byte återställer både gamla och nya nycklar via journal.
- [ ] Inga automatiska ändringar sker vid omladdning eller vid öppning av karaktärsfliken.
- [ ] Vanliga Safari på iPhone testas efter GitHub-verifiering; separata webbläsarlagringar blandas inte ihop.
- [ ] Ingen verklig karaktärsdata ändras före uttryckligt godkännande.

## 6. STOPP / PASS-kriterium för detta steg

**3H.12.2 DESIGN PASS** när planen är granskad och arkiverad. Detta är **inte** implementation PASS eller Safari PASS. Ingen befintlig fil behöver ersättas för att spara detta dokument; lägg till filen i `docs/`.

**Nästa arbetspunkt:** 3H.12.3 — skrivskyddad bakgrundsmodell, ett litet ZIP-paket, därefter GitHub-kontroll och tester.
