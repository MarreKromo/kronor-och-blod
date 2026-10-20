// KB-03.7.4 / IMP-025 J-G — obsolete name+class-only slot creation disabled.
// No storage access; existing slot restoration/switching remains unchanged.
(function () {
  'use strict';
  function createSlot() {
    throw new Error('Ny karaktär kräver fullständig livsbakgrund. Det äldre skapandet är spärrat.');
  }
  window.KB_SLOT_CREATOR = Object.freeze({ createSlot });
})();
