// Modul domain Absen Magang. Seluruh operasi domain hidup di sini sebagai
// fungsi yang menerima `db` (objek dengan .query(sql, params) -> {rows};
// Pool `pg` di produksi, instance PGlite di test) sebagai argumen pertama --
// route handler Next.js hanya memanggil fungsi-fungsi ini, tidak ada logika
// domain di route handler maupun komponen UI (lihat spec.md, Implementation
// Decisions). Istilah domain: lihat absen/CONTEXT.md di root repo.

import { randomUUID } from 'node:crypto';
import { generatePinUnik } from './pin.js';
import { evaluasiJendela } from './jendelaAbsen.js';
import { pesertaFromRow, kehadiranFromRow, jendelaAbsenFromRow } from './mappers.js';
import { AbsenError, notFound, invalid } from './errors.js';
import { renderLaporanPdf } from './pdf.js';

export { AbsenError };

// ---- Pendaftaran ----------------------------------------------------

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

async function ambilPeserta(db, pesertaId) {
  const { rows } = await db.query('SELECT * FROM peserta WHERE id = $1', [pesertaId]);
  if (rows.length === 0) throw notFound('Peserta tidak ditemukan');
  return rows[0];
}

export async function setujuiPendaftaran(db, pesertaId) {
  const peserta = await ambilPeserta(db, pesertaId);
  if (peserta.status_pendaftaran !== 'menunggu') {
    throw invalid('Pendaftaran ini sudah diputuskan sebelumnya');
  }

  const pin = await generatePinUnik(db);
  const { rows } = await db.query(
    `UPDATE peserta SET status_pendaftaran = 'disetujui', pin = $2 WHERE id = $1 RETURNING *`,
    [pesertaId, pin],
  );
  return pesertaFromRow(rows[0]);
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

// ---- Jendela Absen ----------------------------------------------------

export async function getJendelaAbsen(db) {
  const { rows } = await db.query('SELECT * FROM jendela_absen WHERE id = $1', ['default']);
  return jendelaAbsenFromRow(rows[0]);
}

export async function setJendelaAbsen(db, { latitude, longitude, radiusMeter, jamMulai, jamSelesai }) {
  const { rows } = await db.query(
    `INSERT INTO jendela_absen (id, latitude, longitude, radius_meter, jam_mulai, jam_selesai)
     VALUES ('default', $1, $2, $3, $4, $5)
     ON CONFLICT (id) DO UPDATE SET
       latitude = EXCLUDED.latitude,
       longitude = EXCLUDED.longitude,
       radius_meter = EXCLUDED.radius_meter,
       jam_mulai = EXCLUDED.jam_mulai,
       jam_selesai = EXCLUDED.jam_selesai
     RETURNING *`,
    [latitude, longitude, radiusMeter, jamMulai, jamSelesai],
  );
  return jendelaAbsenFromRow(rows[0]);
}

// ---- Kehadiran ----------------------------------------------------

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

// ---- Laporan ----------------------------------------------------

// Data mentah laporan (dipisah dari rendering PDF supaya bisa diuji tanpa
// membongkar isi PDF -- lihat generateLaporanPdf di ./pdf.js).
export async function ambilDataLaporan(db, { pesertaId, tanggalMulai, tanggalSelesai }) {
  const peserta = await ambilPeserta(db, pesertaId);
  const { rows } = await db.query(
    `SELECT * FROM kehadiran
     WHERE peserta_id = $1 AND tanggal >= $2 AND tanggal <= $3
     ORDER BY tanggal ASC`,
    [pesertaId, tanggalMulai, tanggalSelesai],
  );
  return {
    peserta: pesertaFromRow(peserta),
    kehadiran: rows.map(kehadiranFromRow),
    tanggalMulai,
    tanggalSelesai,
  };
}

// PDF siap cetak untuk rentang tanggal bebas -- dipilih ulang tiap kali
// dipanggil, bukan periode tetap tersimpan (lihat spec.md).
export async function generateLaporan(db, { pesertaId, tanggalMulai, tanggalSelesai }) {
  const data = await ambilDataLaporan(db, { pesertaId, tanggalMulai, tanggalSelesai });
  return renderLaporanPdf(data);
}
