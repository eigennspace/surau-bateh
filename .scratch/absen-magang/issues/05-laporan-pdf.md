# 05 — Generate Laporan PDF untuk rentang tanggal bebas

Status: done

**What to build:** Pengurus memilih satu Peserta dan sebuah rentang tanggal bebas (bukan periode tetap tersimpan — dipilih ulang tiap kali generate), lalu sistem menghasilkan Laporan berupa PDF siap cetak: tabel berisi tanggal, jam masuk, jam pulang, dan catatan aktivitas untuk tiap Kehadiran Peserta itu dalam rentang tersebut, ditutup dengan kolom kosong untuk tanda tangan tulis tangan (bukan tanda tangan digital).

**Blocked by:** 03 — butuh data Kehadiran nyata untuk direkap. Sengaja tidak menunggu ticket 04: Laporan boleh menampilkan Kehadiran yang masih berstatus `ditinjau` apa adanya (belum diputuskan Pengurus).

- [x] Pengurus bisa memilih satu Peserta dan rentang tanggal (mulai–selesai) lalu men-generate Laporan
- [x] PDF yang dihasilkan berisi tabel tanggal, jam masuk, jam pulang, dan catatan aktivitas untuk tiap Kehadiran Peserta itu dalam rentang yang dipilih
- [x] PDF menyertakan kolom kosong (nama + jabatan penandatangan) untuk tanda tangan tulis tangan — tidak ada mekanisme tanda tangan digital
- [x] Rentang tanggal yang tidak memiliki Kehadiran sama sekali menghasilkan PDF yang tetap valid (tabel kosong/keterangan tidak ada data), bukan error
- [x] Menggenerate Laporan yang sama dua kali dengan rentang tanggal berbeda menghasilkan isi tabel yang sesuai masing-masing rentang

## Comments

Diimplementasikan (`app/dashboard/laporan`, `app/api/laporan`, `lib/absen/laporan.js`, `lib/absen/pdf.js` lewat `pdfkit`). Sempat ada dua bug produksi yang tidak ketahuan test (PGlite berbeda perilaku dari Postgres asli): (1) `next build` gagal ENOENT karena file `.afm` font pdfkit tidak ikut ter-bundle webpack -- diperbaiki dengan `serverExternalPackages`; (2) query Laporan tidak mengecualikan Kehadiran `ditolak` -- diperbaiki setelah verifikasi checklist ticket 04. Diuji lib/absen/laporan.test.js dan diverifikasi manual: `next build` + `next start` produksi sungguhan menghasilkan `%PDF-1.3` valid lewat Postgres nyata. Lihat commit `250a626`, `4d83b20`, `26771b3`.
