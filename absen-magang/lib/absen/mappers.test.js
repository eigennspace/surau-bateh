import { describe, it, expect } from 'vitest';
import { pesertaFromRow, kehadiranFromRow } from './mappers.js';

// PGlite (dipakai lib/absen/*.test.js lain) mengembalikan kolom DATE
// sebagai string, tapi `pg` sungguhan mengembalikannya sebagai objek Date
// (tengah malam waktu lokal) -- lihat bug: "Objects are not valid as a
// React child (found: [object Date])" saat periodeMulai/tanggal dirender
// langsung di dashboard. Test ini mensimulasikan baris dari `pg` asli.
describe('pesertaFromRow', () => {
  it('mengubah kolom DATE berupa objek Date jadi string YYYY-MM-DD', () => {
    const peserta = pesertaFromRow({
      id: 'p1',
      nama: 'Aisyah',
      asal_kampus: 'Universitas Contoh',
      jurusan: 'TI',
      nim: '123',
      no_whatsapp: '0812',
      periode_mulai: new Date(2026, 0, 1), // 1 Jan 2026 waktu lokal
      periode_selesai: new Date(2026, 5, 30), // 30 Jun 2026 waktu lokal
      status_pendaftaran: 'menunggu',
      pin: null,
    });

    expect(peserta.periodeMulai).toBe('2026-01-01');
    expect(peserta.periodeSelesai).toBe('2026-06-30');
  });

  it('meneruskan string DATE apa adanya (perilaku PGlite di test lain)', () => {
    const peserta = pesertaFromRow({
      id: 'p1',
      nama: 'Aisyah',
      asal_kampus: 'x',
      jurusan: 'x',
      nim: '1',
      no_whatsapp: '1',
      periode_mulai: '2026-01-01',
      periode_selesai: '2026-06-30',
      status_pendaftaran: 'menunggu',
      pin: null,
    });

    expect(peserta.periodeMulai).toBe('2026-01-01');
    expect(peserta.periodeSelesai).toBe('2026-06-30');
  });
});

describe('kehadiranFromRow', () => {
  it('mengubah kolom tanggal berupa objek Date jadi string YYYY-MM-DD', () => {
    const kehadiran = kehadiranFromRow({
      id: 'k1',
      peserta_id: 'p1',
      tanggal: new Date(2026, 1, 5), // 5 Feb 2026 waktu lokal
      jam_masuk: new Date('2026-02-05T08:00:00'),
      jam_pulang: null,
      catatan_aktivitas: null,
      status: 'normal',
    });

    expect(kehadiran.tanggal).toBe('2026-02-05');
    // jamMasuk (TIMESTAMPTZ, punya komponen jam) sengaja tidak dinormalkan
    // di sini -- lapisan UI yang memformatnya (lihat KehadiranRow.jsx).
    expect(kehadiran.jamMasuk).toBeInstanceOf(Date);
  });
});
