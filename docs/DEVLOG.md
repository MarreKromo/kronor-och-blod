# KRONOR & BLOD — DEVLOG
Uppdaterad 2026-10-21. Dornmark. Testomfattning anges separat från kodexistens.

## Tidigare leveranser
| Version | GitHub | Safari | Omfattning |
|---|---|---|---|
| V2-03.2L | PASS | PASS enligt användaren | NPC-samtal |
| V2-03.3B | PASS | PASS enligt användaren | Jordbruk, XP, tid |
| V2-03.5 | PASS | PASS enligt användaren | Position och resa |
| V2-03.6 | PASS | Delvis | Ekonomi; full regression öppen |
| V2-03.6L | PASS | Begränsat PASS | Svenska ord och mynt |
| V2-03.7 | PASS | PASS 5/5 | Resa/dagbyte utan bekräftelser |
| V2-03.8 | PASS | PASS i visad omfattning | Mobilvy |
| V2-03.9 | PASS | PASS i visad omfattning | Arbetsplats/omladdning |
| V2-04 | PASS | PASS i rapporterad omfattning | NPC-grund |
| V2-04R | PASS | PASS 6/6 enligt användaren | Återkommande möten och relationer |
| V2-04S | PASS | PASS enligt användaren och skärmbilder | Dialog och råd vid +5 |

## V2-04 avslut (tidigare dokumenterat)
V2-04R/S: separata relationsjournaler, dagspärr, varierande repliker, +5-upplåsta råd, mobilanpassning. Användarens bilder visade Mara +6 och Edda +7. Ingen full NPC-autonomi eller ekonomiregression påstås.

## V2-05 — kapitelavslut 2026-10-21
| Del | GitHub | Safari | Leverans och evidens |
|---|---|---|---|
| V2-05A–C | PASS enligt tidigare paketkontroller | PASS i tidigare rapporterad omfattning | Lokal produktion, leveranser, marknadsköp och lagerkoppling |
| V2-05D | PASS | PASS enligt tidigare rapport | Bakgrundsproduktion utan spelararbete; omladdning/full regression ej särskilt bevisad |
| V2-05E | PASS | PASS för UI, fyra bilder | Lagerkort Keldra/Dorneth, hopfällbar produktionsredovisning; mekaniken inte omtestad |
| V2-05F | PASS, tre filer lästa från GitHub | PASS enligt användaren + skärmbilder | Individuella ortsvyer, tillbaka till översikt, inspektion utan resa, resa en dag; full ekonomiregression ej omtestad |

V2-05E Safari-bilder visade Keldra 36 och Dorneth 31 säckar samt produktion/leveranser i expanderad redovisning. V2-05F-bilder visade platsöversikt och egna vyer för Keldra och Dorneth, befintliga 25 koppar och 20 spannmål samt ortslager; användaren bekräftade att tillbaka-navigering och resa fungerar.

**Avslutsbeslut:** V2-05:s första spelbara prototypkedja är färdig i verifierad omfattning, inte hela ekonomisystemet. Återstående system finns kvar i masterplan/roadmap.

## Arkitekturbeslut inför nästa arbete
- Översikt som framtida huvudflik, skild från fysisk bostad.
- Senast aktiv huvudflik ska sparas per karaktär och återställas efter omladdning.
- Geografisk världskarta och datadrivna individuella ortsvyer utvecklas efter stabil navigation. Kartvisning och faktisk resa hålls isär.
- V2-06 förblir reserverat för följeslagare; inga kapitel omnumreras.

## Nästa
Verifiera detta dokumentationspaket i GitHub (ingen Safari-test för docs). Planera nästa större spelbara paket enligt roadmap och ARBETSMETOD. Full ekonomiregression och backup/export/import kvarstår öppna.
