// KB-A2.3 FIX1 – isolated SHA-256 seal and read-only verification.
// No localStorage, no import, no download. Requires secure context (GitHub Pages).
(function () {
  'use strict';
  const fail = message => { throw Error(message); };
  function plain(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value) ||
        Object.getPrototypeOf(value) !== Object.prototype) fail('Objektformatet är ogiltigt.');
    return value;
  }
  function canonical(value) {
    if (value === null) return 'null';
    if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
    if (typeof value === 'number' && Number.isFinite(value)) return JSON.stringify(value);
    if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
    plain(value);
    return '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}';
  }
  function validate(p, sealed) {
    plain(p);
    if (p.format !== 'kronor-och-blod-full-backup' || p.version !== 2 ||
        typeof p.createdAt !== 'string' || !Number.isFinite(Date.parse(p.createdAt)) ||
        !(p.activeCharacterId === null || (typeof p.activeCharacterId === 'string' &&
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(p.activeCharacterId))))
      fail('Felaktigt backupformat.');
    for (const field of ['activeEntries', 'slots', 'otherEntries']) {
      plain(p[field]);
      if (Object.values(p[field]).some(v => typeof v !== 'string')) fail('Ogiltig sparpost: ' + field);
    }
    const activeCount = Object.keys(p.activeEntries).length;
    if ((p.activeCharacterId === null) !== (activeCount === 0)) fail('Aktiv identitet saknas.');
    plain(p.manifest);
    if (p.manifest.slotCount !== Object.keys(p.slots).length ||
        p.manifest.keyCount !== activeCount + Object.keys(p.slots).length + Object.keys(p.otherEntries).length)
      fail('Antal sparposter stämmer inte.');
    if (sealed) {
      if (p.manifest.checksumAlgorithm !== 'SHA-256' ||
          typeof p.manifest.checksum !== 'string' ||
          !/^[a-f0-9]{64}$/.test(p.manifest.checksum)) fail('Kontrollsumma saknas.');
    } else if (p.manifest.checksum !== null || p.manifest.checksumAlgorithm !== null) {
      fail('Säkerhetskopian är redan förseglad.');
    }
  }
  function withoutChecksum(p) {
    return {
      format:p.format, version:p.version, createdAt:p.createdAt,
      activeCharacterId:p.activeCharacterId, activeEntries:p.activeEntries,
      slots:p.slots, otherEntries:p.otherEntries,
      manifest:{slotCount:p.manifest.slotCount,keyCount:p.manifest.keyCount}
    };
  }
  async function hash(p) {
    if (!globalThis.crypto || !globalThis.crypto.subtle || typeof TextEncoder !== 'function')
      fail('SHA-256 stöds inte i denna webbläsarkontext.');
    const data = new TextEncoder().encode(canonical(withoutChecksum(p)));
    const digest = await globalThis.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
  }
  async function seal(unsigned) {
    validate(unsigned, false);
    const checksum = await hash(unsigned);
    return {
      ...unsigned,
      manifest:{...unsigned.manifest,checksumAlgorithm:'SHA-256',checksum}
    };
  }
  async function verify(sealed) {
    try {
      validate(sealed, true);
      const expected = await hash(sealed);
      if (expected !== sealed.manifest.checksum) return Object.freeze({ok:false,reason:'Kontrollsumman stämmer inte.'});
      return Object.freeze({ok:true,reason:'SHA-256 verifierad.'});
    } catch (error) {
      return Object.freeze({ok:false,reason:error.message});
    }
  }
  window.KB_FULL_BACKUP_INTEGRITY = Object.freeze({seal,verify});
})();
