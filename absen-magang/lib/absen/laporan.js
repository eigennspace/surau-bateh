// Laporan: PDF siap cetak untuk rentang tanggal bebas -- dipilih ulang
// tiap kali dipanggil, bukan periode tetap tersimpan (lihat spec.md).

import { ambilPeserta } from './pendaftaran.js';
import { pesertaFromRow, kehadiranFromRow } from './mappers.js';
import { renderLaporanPdf } from './pdf.js';

// Data mentah laporan (dipisah dari rendering PDF supaya bisa diuji tanpa
// membongkar isi PDF -- lihat renderLaporanPdf di ./pdf.js).
export async function ambilDataLaporan(db, { pesertaId, tanggalMulai, tanggalSelesai }) {
  const peserta = await ambilPeserta(db, pesertaId);
  // Kehadiran `ditolak` sengaja dikecualikan -- tidak dihitung sebagai
  // kehadiran sah (lihat ticket 04). `ditinjau` yang belum diputuskan
  // Pengurus tetap ikut apa adanya (lihat ticket 05: Laporan tidak perlu
  // menunggu peninjauan selesai).
  const { rows } = await db.query(
    `SELECT * FROM kehadiran
     WHERE peserta_id = $1 AND tanggal >= $2 AND tanggal <= $3 AND status != 'ditolak'
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

export async function generateLaporan(db, { pesertaId, tanggalMulai, tanggalSelesai }) {
  const data = await ambilDataLaporan(db, { pesertaId, tanggalMulai, tanggalSelesai });
  return renderLaporanPdf(data);
}
