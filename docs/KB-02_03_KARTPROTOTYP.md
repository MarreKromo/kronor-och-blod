# KB-02.3 – Första klickbara kartprototypen

**Status:** PROTOTYP – väntar på test i iPhone/Safari.

## Leverans
- `index.html`: responsivt kartgränssnitt, fungerar utan externa bibliotek.
- `assets/map_art/vastragotaland_sketch.svg`: egenproducerad, **schematisk** kartgrafik.
- `src/places.js`: fem platser med stabila ID:n från KB-02.1 och separata skärmpositioner.

## Historisk reservation
Illustrationen är inte en rekonstruktion av Västergötland år 1250. Vänern, Göta älv och landskapsformer är stiliserade. Platsmarkörernas skärmkoordinater är manuellt uppskattade för prototypen och får inte användas som geografiska koordinater. Inga medeltida vägsträckningar eller gränser fastställs. Kartan använder **inte** originalbilden O37.

## Test på iPhone
1. Lägg filerna i repositoryts rot enligt strukturen.
2. Aktivera GitHub Pages för branch `main`, katalog `/ (root)` under Settings → Pages, om det inte redan är gjort.
3. Öppna Pages-adressen i Safari (publicering kan ta några minuter).
4. Tryck på var och en av fem markörer. Kontrollera att namn, ID och beskrivning ändras.
5. Testa både stående och liggande skärmläge.
6. Notera PASS/FAIL i `docs/TESTS.md` och datum i `docs/DAILY_LOG.md` efter test.

## Acceptanskriterier
- [ ] Kartan visas på iPhone Safari.
- [ ] Fem markörer kan tryckas.
- [ ] Platsinformation uppdateras korrekt.
- [ ] Plats-ID:n stämmer med KB-02.1.
- [ ] Kartbild och platsdata är separata filer.
- [ ] Inga felaktiga historiska exakthetsanspråk visas.
