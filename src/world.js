// KB-02.4.1 – Prototypvärden, inte historiska befolkningsuppgifter.
// Stabilt place_id länkar till src/places.js. Kartkoordinater lagras inte här.
window.KB_WORLD = {
  version: 1,
  currency: 'silver',
  resourceNames: {food:'Livsmedel',wood:'Trä',iron:'Järn',cloth:'Tyg'},
  settlements: [
    {place_id:'VG-SKARA-001',population:420,resources:{food:65,wood:25,iron:12,cloth:38},power:'Biskopens inflytande',economy:'Marknad och hantverk'},
    {place_id:'VG-LODOSE-002',population:360,resources:{food:45,wood:35,iron:24,cloth:55},power:'Köpmän och kunglig kontroll',economy:'Handel och sjöfart'},
    {place_id:'VG-VARNHEM-003',population:95,resources:{food:75,wood:40,iron:8,cloth:15},power:'Klostergemenskap',economy:'Jordbruk och donationer'},
    {place_id:'VG-GUDHEM-004',population:80,resources:{food:70,wood:30,iron:7,cloth:20},power:'Klostergemenskap',economy:'Jordbruk och donationer'},
    {place_id:'VG-HUSABY-005',population:110,resources:{food:68,wood:45,iron:10,cloth:12},power:'Lokala jordägare och kyrkan',economy:'Jordbruk och lokalt utbyte'}
  ]
};
