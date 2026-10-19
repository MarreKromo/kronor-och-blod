# Tillägg till docs/ARBETSMETOD.md
Klistra in detta avsnitt i befintlig arbetsmetod vid senare sammanslagning. Ersätt inte hela ARBETSMETOD.md med denna tilläggsfil.

## Prototypdata och cache – beslut 2026-10-19
- Testkaraktärer och testdata får återställas under prototypfasen. Informera innan avsiktlig återställning.
- Bevara fungerande kod och övriga spelsystem även när testdata är utbytbar.
- Inför framtida riktiga sparfiler ska migrering, säkerhetskopiering och versionshantering planeras.
- Vid ändring av JavaScript-fil: versionsmärk dess `<script src>` i `index.html` när Safari kan ha en gammal cachad kopia. Ändring av enbart sidans `?v=` räcker inte alltid.
- Skicka färdiga, verifierade ZIP-paket. Vid uppladdning av fil med samma namn: kontrollera filens innehåll på GitHub, inte bara filnamnet.
- Separera GitHub-PASS från Safari-PASS.
