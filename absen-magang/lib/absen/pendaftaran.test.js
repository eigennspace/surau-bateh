import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createTestDb } from './testDb.js';
import {
  ajukanPendaftaran,
  daftarPendaftaranMenunggu,
  setujuiPendaftaran,
  tolakPendaftaran,
  catatKehadiran,
  AbsenError,
} from './index.js';

let db;

beforeEach(async () => {
  db = await createTestDb();
});

afterEach(async () => {
  await db.close();
});

function dataPeserta(overrides = {}) {
  return {
    nama: 'Aisyah',
    asalKampus: 'Universitas Contoh',
    jurusan: 'Teknik Informatika',
    nim: '12345678',
    noWhatsapp: '081234567890',
    periodeMulai: '2026-01-01',
    periodeSelesai: '2026-06-30',
    ...overrides,
  };
}

describe('ajukanPendaftaran', () => {
  it('tersimpan dengan status menunggu', async () => {
    const peserta = await ajukanPendaftaran(db, dataPeserta());
    expect(peserta.statusPendaftaran).toBe('menunggu');
    expect(peserta.pin).toBeNull();
  });

  it('muncul di daftarPendaftaranMenunggu', async () => {
    await ajukanPendaftaran(db, dataPeserta());
    const daftar = await daftarPendaftaranMenunggu(db);
    expect(daftar).toHaveLength(1);
    expect(daftar[0].nama).toBe('Aisyah');
  });
});

describe('setujuiPendaftaran', () => {
  it('mengubah status jadi disetujui dan generate PIN', async () => {
    const peserta = await ajukanPendaftaran(db, dataPeserta());
    const disetujui = await setujuiPendaftaran(db, peserta.id);

    expect(disetujui.statusPendaftaran).toBe('disetujui');
    expect(disetujui.pin).toMatch(/^\d{6}$/);
  });

  it('Peserta disetujui langsung bisa catatKehadiran dengan PIN-nya', async () => {
    const peserta = await ajukanPendaftaran(db, dataPeserta());
    const disetujui = await setujuiPendaftaran(db, peserta.id);

    const kehadiran = await catatKehadiran(db, {
      pin: disetujui.pin,
      tipe: 'checkin',
      waktu: new Date('2026-02-01T08:00:00'),
    });
    expect(kehadiran.pesertaId).toBe(peserta.id);
  });

  it('dua Peserta yang disetujui berdekatan mendapat PIN berbeda', async () => {
    const p1 = await ajukanPendaftaran(db, dataPeserta({ nim: '111' }));
    const p2 = await ajukanPendaftaran(db, dataPeserta({ nim: '222' }));

    const [d1, d2] = await Promise.all([
      setujuiPendaftaran(db, p1.id),
      setujuiPendaftaran(db, p2.id),
    ]);

    expect(d1.pin).not.toBe(d2.pin);
  });

  it('generate ulang PIN bila tabrakan UNIQUE terjadi saat commit (race condition)', async () => {
    // Membungkus db supaya UPDATE pertama gagal dengan error UNIQUE
    // violation Postgres (kode 23505), meniru dua approval berdekatan yang
    // lolos pemeriksaan generatePinUnik dengan PIN sama sebelum salah satu
    // commit -- setujuiPendaftaran harus generate ulang, bukan gagal total.
    let updateDipanggil = 0;
    const dbDenganTabrakanSekali = {
      query: (sql, params) => {
        if (sql.startsWith('UPDATE peserta SET status_pendaftaran')) {
          updateDipanggil += 1;
          if (updateDipanggil === 1) {
            const error = new Error('duplicate key value violates unique constraint "peserta_pin_key"');
            error.code = '23505';
            error.constraint = 'peserta_pin_key';
            throw error;
          }
        }
        return db.query(sql, params);
      },
    };

    const peserta = await ajukanPendaftaran(db, dataPeserta());
    const disetujui = await setujuiPendaftaran(dbDenganTabrakanSekali, peserta.id);

    expect(updateDipanggil).toBe(2);
    expect(disetujui.statusPendaftaran).toBe('disetujui');
    expect(disetujui.pin).toMatch(/^\d{6}$/);
  });

  it('Peserta yang belum disetujui tidak bisa catatKehadiran', async () => {
    const peserta = await ajukanPendaftaran(db, dataPeserta());
    await expect(
      catatKehadiran(db, { pin: '000000', tipe: 'checkin', waktu: new Date() }),
    ).rejects.toThrow(AbsenError);
    expect(peserta.pin).toBeNull();
  });
});

describe('tolakPendaftaran', () => {
  it('mengubah status jadi ditolak, tidak ada PIN', async () => {
    const peserta = await ajukanPendaftaran(db, dataPeserta());
    const ditolak = await tolakPendaftaran(db, peserta.id);

    expect(ditolak.statusPendaftaran).toBe('ditolak');
    expect(ditolak.pin).toBeNull();
  });

  it('Peserta yang ditolak tidak bisa catatKehadiran walau tahu PIN lama', async () => {
    const peserta = await ajukanPendaftaran(db, dataPeserta());
    await tolakPendaftaran(db, peserta.id);

    await expect(
      catatKehadiran(db, { pin: 'apapun', tipe: 'checkin', waktu: new Date() }),
    ).rejects.toThrow(AbsenError);
  });
});
