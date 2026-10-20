# V2-03.2D – Karaktärsbunden berättelse

- Använder befintligt `KB_V2_DATA_CONTRACT` och verifierar aktiv karaktär innan läsning/skrivning.
- Berättelsen sparas under `character.<id>.story` med `ownerId`, version, scen och historik.
- Äldre nyckeln `kronor-och-blod.fantasy.v2.first-scene.v1` lämnas orörd. Ingen automatisk migrering.
- Berättelsen kan inte spelas utan en verifierad karaktär; ett meddelande visas i stället.
- Ogiltig befintlig berättelsesparning får inte skrivas över.
- Ändrar inte karaktärsskapande, bakgrundsmodell, kalender eller sparplatser.
- Nästa steg: separat karaktärsbyte och sedan kalenderkoppling, med tester av dataisolering.

## Safari-acceptans
1. Befintlig karaktär syns under Karaktär.
2. Berättelseval fungerar och syns i Dagbok.
3. Omladdning bevarar valen.
4. Platser och Karaktär fungerar.
5. Ingen automatisk överföring av tidigare prototypval utlovas.
