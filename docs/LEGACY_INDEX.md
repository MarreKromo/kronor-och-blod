# LEGACY INDEX — äldre Sverige-prototyp
**Status:** arkivreferens. Den nya visionen finns i `docs/MASTERPLAN_V2.md`; aktuellt arbete i `docs/ROADMAP.md`.

## Vad som är historiskt, inte aktuella krav
- GDD v1.0 och äldre Sverige-/Västergötland-vision.
- `docs/KB_PLAN_01_ROADMAP_GENOMGANG.md`, `docs/KB_A2_AVSLUT_OCH_B_START_2026-10-20.md` och `docs/KB_B1_POSITION_RESOR_PLAN.md`.
- Historiska stycken i `docs/ROADMAP.md`, `docs/ARBETSMETOD.md`, `docs/DAILY_LOG.md` och `docs/TESTS.md`.
- Gamla platsdata och kartan i `src/` är fortfarande körbar **prototypkod**, inte den nya officiella spelvärlden.

## Företrädesordning
1. `docs/MASTERPLAN_V2.md`: spelvision och designprinciper.
2. Översta avsnittet **Aktuell styrning v2.0** i `docs/ROADMAP.md`: aktiv prioritering.
3. Översta avsnittet **Övergångsregler v2.0** i `docs/ARBETSMETOD.md`: arbetsprocess.
4. `docs/TESTS.md`: faktiskt verifierade tester, aldrig framtida löften.
5. Övriga äldre dokument: historik och tekniska referenser, inte konkurrerande masterplaner.

## Bevarande
Ta inte bort, flytta eller skriv om historiska filer som del av detta paket. Git-historik och tidigare testresultat ska finnas kvar. Ingen äldre karaktär eller sparning får konverteras utan en separat säkerhetsplan.

## Status på pausat arbete
- B1.1: isolerad skrivskyddad positionsförhandsvisning, Safari 8/8 PASS enligt tidigare användartest.
- B1.2: isolerad skrivskyddad positionsmodell, Safari 12/12 PASS enligt tidigare användartest.
- B1.3: pausad vid byte av spelvärld. Eventuella förberedda ZIP-filer är **inte** godkänd produktionsintegration.
