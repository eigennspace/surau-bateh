// Modul domain Absen Magang. Seluruh operasi domain hidup sebagai fungsi
// yang menerima `db` (objek dengan .query(sql, params) -> {rows}; Pool `pg`
// di produksi, instance PGlite di test) sebagai argumen pertama -- route
// handler Next.js hanya memanggil fungsi-fungsi ini, tidak ada logika
// domain di route handler maupun komponen UI (lihat spec.md, Implementation
// Decisions). Istilah domain: lihat absen/CONTEXT.md di root repo.
//
// Ini adalah barrel: implementasi tiap konsep hidup di file terpisah
// (pendaftaran.js, jendelaAbsen.js, kehadiran.js, laporan.js) supaya satu
// file tidak berubah untuk beberapa alasan yang tidak berhubungan --
// import langsung dari file konsepnya juga sah, index.js hanya kemudahan.

export { AbsenError } from './errors.js';
export { ajukanPendaftaran, daftarPendaftaranMenunggu, daftarPeserta, setujuiPendaftaran, tolakPendaftaran } from './pendaftaran.js';
export { getJendelaAbsen, setJendelaAbsen } from './jendelaAbsen.js';
export {
  catatKehadiran,
  daftarKehadiranDitinjau,
  daftarKehadiranDitinjauDenganPeserta,
  setujuiKehadiranDitinjau,
  tolakKehadiranDitinjau,
  koreksiJamKehadiran,
} from './kehadiran.js';
export { ambilDataLaporan, generateLaporan } from './laporan.js';
