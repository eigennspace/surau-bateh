// Operasi domain seputar Pendaftaran dan Peserta (lihat absen/CONTEXT.md
// di root repo untuk istilah). `db` adalah objek dengan .query(sql, params)
// -> {rows}: Pool `pg` di produksi, instance PGlite di test.

import { randomUUID } from 'node:crypto';
import { generatePinUnik } from './pin.js';
import { pesertaFromRow } from './mappers.js';
import { notFound, invalid } from './errors.js';

export async function ajukanPendaftaran(db, data) {
  const id = randomUUID();
  const { rows } = await db.query(
    `INSERT INTO peserta
       (id, nama, asal_kampus, jurusan, nim, no_whatsapp, periode_mulai, periode_selesai, status_pendaftaran)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'menunggu')
     RETURNING *`,
    [
      id,
      data.nama,
      data.asalKampus,
      data.jurusan,
      data.nim,
      data.noWhatsapp,
      data.periodeMulai,
      data.periodeSelesai,
    ],
  );
  return pesertaFromRow(rows[0]);
}

export async function daftarPendaftaranMenunggu(db) {
  const { rows } = await db.query(
    `SELECT * FROM peserta WHERE status_pendaftaran = 'menunggu' ORDER BY created_at ASC`,
  );
  return rows.map(pesertaFromRow);
}

export async function daftarPeserta(db) {
  const { rows } = await db.query(`SELECT * FROM peserta ORDER BY nama ASC`);
  return rows.map(pesertaFromRow);
}

// Dipakai juga oleh lib/absen/laporan.js untuk mengambil identitas Peserta
// pemilik Laporan.
export async function ambilPeserta(db, pesertaId) {
  const { rows } = await db.query('SELECT * FROM peserta WHERE id = $1', [pesertaId]);
  if (rows.length === 0) throw notFound('Peserta tidak ditemukan');
  return rows[0];
}

export async function setujuiPendaftaran(db, pesertaId) {
  const peserta = await ambilPeserta(db, pesertaId);
  if (peserta.status_pendaftaran !== 'menunggu') {
    throw invalid('Pendaftaran ini sudah diputuskan sebelumnya');
  }

  // generatePinUnik hanya memeriksa keunikan pada saat itu; dua approval
  // berdekatan bisa lolos pemeriksaan dengan PIN yang sama sebelum salah
  // satu commit (race condition, lihat spec.md: "Dua Peserta yang disetujui
  // pada waktu berdekatan mendapat PIN yang berbeda"). Constraint UNIQUE di
  // kolom pin jadi penjaga terakhir -- kalau kena, generate ulang dan coba
  // lagi alih-alih gagal total.
  for (let percobaan = 0; percobaan < 5; percobaan += 1) {
    const pin = await generatePinUnik(db);
    try {
      const { rows } = await db.query(
        `UPDATE peserta SET status_pendaftaran = 'disetujui', pin = $2 WHERE id = $1 RETURNING *`,
        [pesertaId, pin],
      );
      return pesertaFromRow(rows[0]);
    } catch (error) {
      const isPinConflict = error?.code === '23505' && String(error?.constraint ?? error?.message ?? '').includes('pin');
      if (!isPinConflict || percobaan === 4) throw error;
    }
  }
}

export async function tolakPendaftaran(db, pesertaId) {
  const peserta = await ambilPeserta(db, pesertaId);
  if (peserta.status_pendaftaran !== 'menunggu') {
    throw invalid('Pendaftaran ini sudah diputuskan sebelumnya');
  }

  const { rows } = await db.query(
    `UPDATE peserta SET status_pendaftaran = 'ditolak' WHERE id = $1 RETURNING *`,
    [pesertaId],
  );
  return pesertaFromRow(rows[0]);
}
