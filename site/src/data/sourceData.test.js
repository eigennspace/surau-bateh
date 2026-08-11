import { describe, it, expect } from 'vitest';
import { SB_DATA } from './sourceData.js';

// Regresi: AgendaSection.jsx me-render `SB_DATA.events` dengan React key
// `${day}-${title}` (lihat AgendaSection.jsx). Sebelumnya key hanya
// `title`, dan karena beberapa event berbagi title yang sama ("Kajian &
// Tawajjuh" muncul 4x/pekan), key itu tabrakan — React salah mencocokkan
// node lama/baru saat filter kategori berpindah bolak-balik, meninggalkan
// artikel event "hantu" (kelihatan seperti duplikasi data). `day` unik per
// event pada jadwal pekanan ini, jadi `${day}-${title}` unik selama setiap
// title muncul paling banyak sekali per hari. Tes ini mengunci invarian
// itu supaya entri event baru yang ditambah pengurus surau tidak diam-diam
// merusak key lagi.
describe('SB_DATA.events React key uniqueness', () => {
  it('produces a unique `${day}-${title}` key for every event', () => {
    const keys = SB_DATA.events.map(e => `${e.day}-${e.title}`);
    const uniqueKeys = new Set(keys);
    expect(uniqueKeys.size).toBe(keys.length);
  });
});
