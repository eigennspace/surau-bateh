// Operasi domain seputar Kehadiran (self check-in/check-out Peserta lewat
// PIN, dan peninjauan Pengurus atas Kehadiran `ditinjau`). `db` adalah
// objek dengan .query(sql, params) -> {rows}: Pool `pg` di produksi,
// instance PGlite di test. Lihat absen/CONTEXT.md di root repo.

import { randomUUID } from 'node:crypto';
import { getJendelaAbsen, evaluasiJendela } from './jendelaAbsen.js';
import { kehadiranFromRow } from './mappers.js';
import { notFound, invalid } from './errors.js';

function tanggalDari(waktu) {
  // Tanggal kalender (YYYY-MM-DD) dari waktu check-in/check-out, memakai
  // waktu lokal server -- satu Kehadiran per Peserta per hari kalender.
  const y = waktu.getFullYear();
  const m = String(waktu.getMonth() + 1).padStart(2, '0');
  const d = String(waktu.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

async function pesertaAktifDariPin(db, pin) {
  const { rows } = await db.query('SELECT * FROM peserta WHERE pin = $1', [pin]);
  const peserta = rows[0];
  if (!peserta || peserta.status_pendaftaran !== 'disetujui') {
    throw invalid('PIN tidak valid atau Peserta belum disetujui');
  }
  return peserta;
}

// Mencatat check-in atau check-out. `tipe` adalah 'checkin' | 'checkout'.
// Kehadiran di luar radius lokasi dan/atau jam kerja Jendela Absen tetap
// tersimpan (tidak ditolak), hanya ditandai status `ditinjau`.
export async function catatKehadiran(db, { pin, tipe, waktu = new Date(), latitude, longitude, catatanAktivitas }) {
  if (tipe !== 'checkin' && tipe !== 'checkout') {
    throw invalid('tipe harus checkin atau checkout');
  }

  const peserta = await pesertaAktifDariPin(db, pin);
  const jendelaAbsen = await getJendelaAbsen(db);
  const { sesuaiJendela } = evaluasiJendela({ latitude, longitude, waktu }, jendelaAbsen);
  const tanggal = tanggalDari(waktu);

  const { rows: existingRows } = await db.query(
    'SELECT * FROM kehadiran WHERE peserta_id = $1 AND tanggal = $2',
    [peserta.id, tanggal],
  );
  const existing = existingRows[0];

  if (tipe === 'checkin') {
    if (existing) {
      throw invalid('Sudah check-in hari ini');
    }
    const id = randomUUID();
    const status = sesuaiJendela ? 'normal' : 'ditinjau';
    const { rows } = await db.query(
      `INSERT INTO kehadiran (id, peserta_id, tanggal, jam_masuk, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [id, peserta.id, tanggal, waktu, status],
    );
    return kehadiranFromRow(rows[0]);
  }

  // checkout
  if (!existing || !existing.jam_masuk) {
    throw invalid('Belum check-in hari ini');
  }
  if (existing.jam_pulang) {
    throw invalid('Sudah check-out hari ini');
  }
  // Sekali ditinjau (dari check-in yang di luar jendela), status tetap
  // ditinjau -- keputusan check-out yang baik tidak menghapus penyimpangan
  // check-in. Sebaliknya, check-out di luar jendela menandai ditinjau
  // meski check-in tadi normal.
  const status = existing.status === 'ditinjau' || !sesuaiJendela ? 'ditinjau' : 'normal';
  const { rows } = await db.query(
    `UPDATE kehadiran SET jam_pulang = $2, catatan_aktivitas = $3, status = $4, updated_at = now()
     WHERE id = $1
     RETURNING *`,
    [existing.id, waktu, catatanAktivitas ?? null, status],
  );
  return kehadiranFromRow(rows[0]);
}

export async function daftarKehadiranDitinjau(db) {
  const { rows } = await db.query(
    `SELECT * FROM kehadiran WHERE status = 'ditinjau' ORDER BY tanggal ASC`,
  );
  return rows.map(kehadiranFromRow);
}

// Sama seperti daftarKehadiranDitinjau, ditambah nama Peserta -- dipakai
// tampilan dashboard supaya Pengurus tahu Kehadiran itu milik siapa.
export async function daftarKehadiranDitinjauDenganPeserta(db) {
  const { rows } = await db.query(
    `SELECT kehadiran.*, peserta.nama AS peserta_nama
     FROM kehadiran
     JOIN peserta ON peserta.id = kehadiran.peserta_id
     WHERE kehadiran.status = 'ditinjau'
     ORDER BY kehadiran.tanggal ASC`,
  );
  return rows.map(row => ({ ...kehadiranFromRow(row), pesertaNama: row.peserta_nama }));
}

async function ambilKehadiran(db, kehadiranId) {
  const { rows } = await db.query('SELECT * FROM kehadiran WHERE id = $1', [kehadiranId]);
  if (rows.length === 0) throw notFound('Kehadiran tidak ditemukan');
  return rows[0];
}

export async function setujuiKehadiranDitinjau(db, kehadiranId) {
  const kehadiran = await ambilKehadiran(db, kehadiranId);
  if (kehadiran.status !== 'ditinjau') {
    throw invalid('Kehadiran ini tidak berstatus ditinjau');
  }
  const { rows } = await db.query(
    `UPDATE kehadiran SET status = 'normal', updated_at = now() WHERE id = $1 RETURNING *`,
    [kehadiranId],
  );
  return kehadiranFromRow(rows[0]);
}

export async function tolakKehadiranDitinjau(db, kehadiranId) {
  const kehadiran = await ambilKehadiran(db, kehadiranId);
  if (kehadiran.status !== 'ditinjau') {
    throw invalid('Kehadiran ini tidak berstatus ditinjau');
  }
  const { rows } = await db.query(
    `UPDATE kehadiran SET status = 'ditolak', updated_at = now() WHERE id = $1 RETURNING *`,
    [kehadiranId],
  );
  return kehadiranFromRow(rows[0]);
}

export async function koreksiJamKehadiran(db, kehadiranId, { jamMasuk, jamPulang }) {
  const kehadiran = await ambilKehadiran(db, kehadiranId);
  if (kehadiran.status !== 'ditinjau') {
    throw invalid('Kehadiran ini tidak berstatus ditinjau');
  }
  const { rows } = await db.query(
    `UPDATE kehadiran
     SET jam_masuk = COALESCE($2, jam_masuk),
         jam_pulang = COALESCE($3, jam_pulang),
         status = 'normal',
         updated_at = now()
     WHERE id = $1
     RETURNING *`,
    [kehadiranId, jamMasuk ?? null, jamPulang ?? null],
  );
  return kehadiranFromRow(rows[0]);
}
