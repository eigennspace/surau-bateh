import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createTestDb } from './testDb.js';
import { ajukanPendaftaran, setujuiPendaftaran, catatKehadiran, ambilDataLaporan, generateLaporan } from './index.js';

let db;
let peserta;

beforeEach(async () => {
  db = await createTestDb();
  const pendaftaran = await ajukanPendaftaran(db, {
    nama: 'Aisyah',
    asalKampus: 'Universitas Contoh',
    jurusan: 'Teknik Informatika',
    nim: '12345678',
    noWhatsapp: '081234567890',
    periodeMulai: '2026-01-01',
    periodeSelesai: '2026-06-30',
  });
  peserta = await setujuiPendaftaran(db, pendaftaran.id);

  await catatKehadiran(db, { pin: peserta.pin, tipe: 'checkin', waktu: new Date('2026-02-01T08:00:00') });
  await catatKehadiran(db, { pin: peserta.pin, tipe: 'checkout', waktu: new Date('2026-02-01T15:00:00'), catatanAktivitas: 'Hari pertama' });
  await catatKehadiran(db, { pin: peserta.pin, tipe: 'checkin', waktu: new Date('2026-02-05T08:00:00') });
  await catatKehadiran(db, { pin: peserta.pin, tipe: 'checkin', waktu: new Date('2026-03-01T08:00:00') });
});

afterEach(async () => {
  await db.close();
});

describe('ambilDataLaporan', () => {
  it('hanya berisi Kehadiran dalam rentang tanggal yang diminta', async () => {
    const data = await ambilDataLaporan(db, {
      pesertaId: peserta.id,
      tanggalMulai: '2026-02-01',
      tanggalSelesai: '2026-02-28',
    });

    expect(data.kehadiran).toHaveLength(2);
    expect(data.peserta.nama).toBe('Aisyah');
  });

  it('rentang berbeda menghasilkan isi berbeda', async () => {
    const data = await ambilDataLaporan(db, {
      pesertaId: peserta.id,
      tanggalMulai: '2026-03-01',
      tanggalSelesai: '2026-03-31',
    });

    expect(data.kehadiran).toHaveLength(1);
  });

  it('rentang tanpa Kehadiran menghasilkan daftar kosong, bukan error', async () => {
    const data = await ambilDataLaporan(db, {
      pesertaId: peserta.id,
      tanggalMulai: '2026-05-01',
      tanggalSelesai: '2026-05-31',
    });

    expect(data.kehadiran).toHaveLength(0);
  });
});

describe('generateLaporan', () => {
  it('menghasilkan buffer PDF yang valid', async () => {
    const pdf = await generateLaporan(db, {
      pesertaId: peserta.id,
      tanggalMulai: '2026-02-01',
      tanggalSelesai: '2026-02-28',
    });

    expect(Buffer.isBuffer(pdf)).toBe(true);
    expect(pdf.subarray(0, 4).toString()).toBe('%PDF');
  });

  it('rentang tanpa Kehadiran tetap menghasilkan PDF valid', async () => {
    const pdf = await generateLaporan(db, {
      pesertaId: peserta.id,
      tanggalMulai: '2026-05-01',
      tanggalSelesai: '2026-05-31',
    });

    expect(Buffer.isBuffer(pdf)).toBe(true);
    expect(pdf.subarray(0, 4).toString()).toBe('%PDF');
  });
});
