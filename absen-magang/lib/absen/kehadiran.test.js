import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createTestDb } from './testDb.js';
import {
  ajukanPendaftaran,
  setujuiPendaftaran,
  setJendelaAbsen,
  catatKehadiran,
  daftarKehadiranDitinjau,
  setujuiKehadiranDitinjau,
  tolakKehadiranDitinjau,
  koreksiJamKehadiran,
  AbsenError,
} from './index.js';

let db;
let peserta;

const LOKASI_SURAU = { latitude: -0.9, longitude: 100.4 };

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
  await setJendelaAbsen(db, {
    latitude: LOKASI_SURAU.latitude,
    longitude: LOKASI_SURAU.longitude,
    radiusMeter: 200,
    jamMulai: '07:00',
    jamSelesai: '16:00',
  });
});

afterEach(async () => {
  await db.close();
});

describe('catatKehadiran dengan PIN tidak valid', () => {
  it('ditolak', async () => {
    await expect(
      catatKehadiran(db, { pin: 'salah', tipe: 'checkin', waktu: new Date('2026-02-01T08:00:00'), ...LOKASI_SURAU }),
    ).rejects.toThrow(AbsenError);
  });
});

describe('check-in/check-out dalam Jendela Absen', () => {
  it('menghasilkan Kehadiran berstatus normal', async () => {
    const masuk = await catatKehadiran(db, {
      pin: peserta.pin,
      tipe: 'checkin',
      waktu: new Date('2026-02-01T08:00:00'),
      ...LOKASI_SURAU,
    });
    expect(masuk.status).toBe('normal');

    const pulang = await catatKehadiran(db, {
      pin: peserta.pin,
      tipe: 'checkout',
      waktu: new Date('2026-02-01T15:00:00'),
      catatanAktivitas: 'Membantu kebersihan aula',
      ...LOKASI_SURAU,
    });
    expect(pulang.status).toBe('normal');
    expect(pulang.catatanAktivitas).toBe('Membantu kebersihan aula');
    expect(pulang.jamPulang).not.toBeNull();
  });
});

describe('check-in di luar radius lokasi', () => {
  it('tetap tersimpan berstatus ditinjau, bukan ditolak', async () => {
    const jauh = { latitude: LOKASI_SURAU.latitude + 1, longitude: LOKASI_SURAU.longitude + 1 };
    const kehadiran = await catatKehadiran(db, {
      pin: peserta.pin,
      tipe: 'checkin',
      waktu: new Date('2026-02-01T08:00:00'),
      ...jauh,
    });
    expect(kehadiran.status).toBe('ditinjau');
  });
});

describe('check-in di luar jam kerja', () => {
  it('tetap tersimpan berstatus ditinjau, bukan ditolak', async () => {
    const kehadiran = await catatKehadiran(db, {
      pin: peserta.pin,
      tipe: 'checkin',
      waktu: new Date('2026-02-01T20:00:00'),
      ...LOKASI_SURAU,
    });
    expect(kehadiran.status).toBe('ditinjau');
  });
});

describe('daftarKehadiranDitinjau', () => {
  it('menampilkan Kehadiran ditinjau', async () => {
    await catatKehadiran(db, {
      pin: peserta.pin,
      tipe: 'checkin',
      waktu: new Date('2026-02-01T20:00:00'),
      ...LOKASI_SURAU,
    });

    const daftar = await daftarKehadiranDitinjau(db);
    expect(daftar).toHaveLength(1);
    expect(daftar[0].status).toBe('ditinjau');
  });
});

describe('penyelesaian Kehadiran ditinjau', () => {
  async function buatKehadiranDitinjau() {
    return catatKehadiran(db, {
      pin: peserta.pin,
      tipe: 'checkin',
      waktu: new Date('2026-02-01T20:00:00'),
      ...LOKASI_SURAU,
    });
  }

  it('disetujui apa adanya -> status normal, jam tidak berubah', async () => {
    const ditinjau = await buatKehadiranDitinjau();
    const hasil = await setujuiKehadiranDitinjau(db, ditinjau.id);

    expect(hasil.status).toBe('normal');
    expect(new Date(hasil.jamMasuk).toISOString()).toBe(new Date(ditinjau.jamMasuk).toISOString());
  });

  it('ditolak -> ditandai ditolak', async () => {
    const ditinjau = await buatKehadiranDitinjau();
    const hasil = await tolakKehadiranDitinjau(db, ditinjau.id);

    expect(hasil.status).toBe('ditolak');
  });

  it('dikoreksi jamnya -> status normal dengan jam hasil koreksi', async () => {
    const ditinjau = await buatKehadiranDitinjau();
    const jamKoreksi = new Date('2026-02-01T08:05:00');
    const hasil = await koreksiJamKehadiran(db, ditinjau.id, { jamMasuk: jamKoreksi });

    expect(hasil.status).toBe('normal');
    expect(new Date(hasil.jamMasuk).toISOString()).toBe(jamKoreksi.toISOString());
  });
});
