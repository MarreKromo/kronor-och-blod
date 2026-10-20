# J-L1–J-L3 · UX och cachefix – verifierad checkpoint

Datum: 2026-10-20
Projekt: SVERIGE: Kronor & Blod
Repository: MarreKromo/kronor-och-blod
Branch: main

## J-L1 – Inventering
- Befintlig karaktärsflik och livsbakgrundspaneler granskades.
- Ingen kodändring.

## J-L2 – Samlad livsbakgrundspanel
- Förhandsvisning av möjlig startfärdighet flyttades in i befintlig livsbakgrundspanel.
- GitHub PASS och Safari PASS med användarens skärmbild.
- Förslaget Jordbruk +2 är fortfarande **inte** en aktiv spelbonus.

## J-L3 – Sammanfattning och hopfällbart formulär
- Ny skrivskyddad ruta: ”Min berättelse”.
- Redigeringsformulär under ”Visa formulär och sparningskontroller”.
- GitHub PASS för uppdaterad `src/life-background-skills-preview.js`.
- **Safari FAIL initialt:** gammal J-L2-vy visades trots uppdaterad JavaScript-fil.
- **Orsak bedömd:** `index.html` refererade fortsatt `?v=jk2-1`; Safari kunde använda cachad fil.
- **Cachefix:** versionsreferens ändrad till `?v=jl3-2` i `index.html`.
- **GitHub PASS efter commit:** ny referens verifierad, gammal referens saknas; `index.html` 7 433 tecken.
- **Safari PASS (skärmbild):** ”Min berättelse” visas, verifierad sparad livsbakgrund för Testbonde, ”Möjlig startfärdighet” visar Jordbruk +2 och formuläret ligger under utfällbar rubrik.

## Omfattning och begränsningar
- Ingen avsiktlig ändring av sparnycklar, sparmotor eller aktiva färdighetsvärden.
- Skärmbilden bekräftar visningen, **inte** ett nytt fullständigt test av formulärets sparflöde.
- Ingen full regression av berättelse, kalender, byte mellan alla karaktärer eller alla uppväxter i J-L3.
- Tidigare J-J regression 7/7 är separat dokumenterad i `docs/TESTS.md`.

## Produktbeslut
- Behåll nuvarande fungerande gränssnitt under grundsystemens utveckling.
- Planera en större visuell omarbetning av **karaktärsgränssnitt och karta** i en senare designfas.
- Funktion, dataskydd och stabilitet prioriteras nu; inga stora designändringar i nästa paket.

## Nästa exakta steg
1. Committa denna checkpoint via ZIP, kontrollera innehållet på GitHub (PASS/FAIL).
2. Samordna senare checkpointen med `docs/TESTS.md`, `docs/DAILY_LOG.md` och relevant förbättringsbacklog utan att skriva över historiken.
3. Välj nästa lilla, avgränsade spelpaket efter dokumentationsverifiering.

Arbetsregel: komplett ZIP-fil, commit på iPhone, separat GitHub PASS/FAIL, därefter Safari PASS/FAIL vid kodändringar.
