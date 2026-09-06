# 04 — Peninjauan Kehadiran berstatus Ditinjau oleh Pengurus

Status: done

**What to build:** Pengurus melihat daftar Kehadiran berstatus `ditinjau` (hasil ticket 03) di dashboard, dan bisa memutuskan tiap satu: menyetujuinya apa adanya (status berubah jadi `normal`), menolaknya (Kehadiran ditandai ditolak, tidak dihitung sebagai kehadiran sah), atau mengoreksi jam masuk/pulangnya secara manual lalu menyetujuinya (status jadi `normal` dengan jam hasil koreksi).

**Blocked by:** 03 — butuh Kehadiran berstatus `ditinjau` untuk ditinjau

- [x] Dashboard Pengurus menampilkan daftar Kehadiran berstatus `ditinjau`
- [x] Pengurus bisa menyetujui sebuah Kehadiran `ditinjau` tanpa perubahan → status jadi `normal`, jam tidak berubah
- [x] Pengurus bisa menolak sebuah Kehadiran `ditinjau` → ditandai ditolak, tidak akan muncul sebagai kehadiran sah di Laporan (lihat ticket 05)
- [x] Pengurus bisa mengoreksi jam masuk dan/atau jam pulang sebuah Kehadiran `ditinjau` lalu menyimpannya → status jadi `normal` dengan jam yang sudah dikoreksi
- [x] Ketiga jalur keputusan di atas diuji sungguhan, masing-masing menghasilkan state akhir yang benar

## Comments

Diimplementasikan (`app/dashboard/kehadiran`, `lib/absen/kehadiran.js`). Item ketiga checklist ("tidak akan muncul sebagai kehadiran sah di Laporan") sempat tidak terpenuhi -- `ambilDataLaporan` tidak memfilter status sama sekali sampai ditemukan saat verifikasi checklist ini dan diperbaiki (query sekarang `AND status != 'ditolak'`, dibuktikan test baru). Diuji lib/absen/kehadiran.test.js (ketiga jalur: setuju/tolak/koreksi) dan lib/absen/laporan.test.js (pengecualian dari Laporan). Lihat commit `250a626`, `26771b3`.
