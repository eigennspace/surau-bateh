import { describe, it, expect } from 'vitest';
import { SB_DATA } from './sourceData.js';

// Regresi: halaman `/khitanan` dan `/dauroh` (lihat KhitananPage.jsx /
// DaurohPage.jsx) mengandalkan `SB_DATA.contact.khitanan` /
// `SB_DATA.contact.dauroh` untuk kartu kontak person. Tes ini mengunci
// invarian itu supaya perubahan Sumber Data di masa depan tidak diam-diam
// merusak kedua halaman itu. (Regresi kategori event "Dauroh"/bukan
// "Daurah" dan keunikan key `${day}-${title}` pindah ke
// `resolveEvents — regresi jadwal kegiatan produksi` di
// `src/lib/resolveSanityContent.test.js` sejak `events` dipindah ke Sanity,
// lihat .scratch/jadwal-pengumuman-via-sanity/issues/03-cutover-hapus-events-news-lama.md.)
describe('SB_DATA — kontak Khitanan/Dauroh', () => {
  it('punya kontak person Khitanan dan Dauroh dengan nomor telepon terisi', () => {
    expect(SB_DATA.contact.khitanan?.name).toBeTruthy();
    expect(SB_DATA.contact.khitanan?.phone).toBeTruthy();
    expect(SB_DATA.contact.dauroh?.name).toBeTruthy();
    expect(SB_DATA.contact.dauroh?.phone).toBeTruthy();
  });
});
