# KB-03.3 – Karaktärsprofil och designbeslut
Datum: 2026-10-19

## Levererat
- `src/character-profile.js`: profil med namn, bakgrund, plats, man/18 år och tre egenskaper.
- Befintlig `src/character.js` och lokal sparnyckel används utan ändring.
- Vid skapad karaktär döljs den äldre karaktärsrutan; annars visas karaktärsskaparen.
- Profilen visar knappen 'Skapa ny karaktär'. Knappens funktion är ännu inte separat testad.
- `index.html` laddar `src/character-profile.js?v=0336` för att undvika äldre cacheversioner.

## Designbeslut för prototyp 0.1
1. Endast manlig spelkaraktär i första spelbara versionen.
2. Startålder 18 år; åldrande planeras men är inte implementerat.
3. Startplats Skara, spelstart år 1250.
4. Bakgrunder: bonde, hantverkare, skrivarkunnig och friboren.
5. Kvinnliga NPC:er ska kunna ha historiskt trovärdiga roller, egendom och inflytande.
6. Möjlighet att spela som kvinna planeras senare, med genomarbetade sociala och juridiska förutsättningar; inte som enbart porträttbyte.
7. Spelbara karaktärer i prototypfasen är testdata och får återställas när det behövs. När riktiga sparfiler införs ska migrations- och dataskyddsregler skärpas.

## Teststatus
- PASS: GitHub innehåller profilskriptet och den versionsmärkta skriptlänken.
- PASS: Safari-skärmbild visar enbart den nya profilen, karaktärsdata och kartan.
- PASS: Befintlig testkaraktär visas fortfarande.
- EJ TESTAT: Klick på 'Skapa ny karaktär' och flödet efter bekräftelse.
- EJ TESTAT: Alla bakgrunder, felhantering, liggande skärmläge och lagring under begränsade förhållanden.
- Notering: Tidigare dubbla vyer kvarstod trots uppdaterad fil; separat versionsparameter på JS-resursen löste det i observerat Safari-test.

## Nästa steg
Verifiera knappen 'Skapa ny karaktär' i Safari. Därefter besluta om KB-03.4, kort spelintroduktion/livshistoria. Inga stora ombyggnader utan eget testpaket.
