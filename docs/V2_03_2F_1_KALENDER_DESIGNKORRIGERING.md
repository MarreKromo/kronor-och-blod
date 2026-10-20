# V2-03.2F.1 – Kalenderns placering och betydelse

## Omfattning
- Flyttar kalenderpanelen överst i berättelsevyn, före scenillustrationen.
- Datum, årstid och dagnummer visas tydligare.
- Primär knapp heter **Fortsätt dagen**.
- Kalenderpanelen visas endast på fliken **Berättelse**, inte på Dagbok, Platser eller Karaktär.
- Behåller samma `KB_V2_CALENDAR`-motor, lagringsnycklar, bekräftelse och karaktärsägarskap.
- Inga gamla sparningar ändras, raderas eller migreras.
- Berättelseval förbrukar fortfarande inte tid automatiskt; framtida paket hanterar det.

## Safari-test
1. Kalenderkortet visas ovanför berättelsens bild.
2. Dagbok, Platser och Karaktär visar inte kalenderkortet.
3. Återgång till Berättelse visar kortet igen.
4. Fortsätt dagen begär bekräftelse och ökar datumet med en dag.
5. Datum kvarstår efter omladdning och hålls åtskilt vid karaktärsbyte.
6. Berättelse, dagbok och karaktärsbyte fungerar som tidigare.
