# 04 — Peninjauan Kehadiran berstatus Ditinjau oleh Pengurus

**What to build:** Pengurus melihat daftar Kehadiran berstatus `ditinjau` (hasil ticket 03) di dashboard, dan bisa memutuskan tiap satu: menyetujuinya apa adanya (status berubah jadi `normal`), menolaknya (Kehadiran ditandai ditolak, tidak dihitung sebagai kehadiran sah), atau mengoreksi jam masuk/pulangnya secara manual lalu menyetujuinya (status jadi `normal` dengan jam hasil koreksi).

**Blocked by:** 03 — butuh Kehadiran berstatus `ditinjau` untuk ditinjau

- [ ] Dashboard Pengurus menampilkan daftar Kehadiran berstatus `ditinjau`
- [ ] Pengurus bisa menyetujui sebuah Kehadiran `ditinjau` tanpa perubahan → status jadi `normal`, jam tidak berubah
- [ ] Pengurus bisa menolak sebuah Kehadiran `ditinjau` → ditandai ditolak, tidak akan muncul sebagai kehadiran sah di Laporan (lihat ticket 05)
- [ ] Pengurus bisa mengoreksi jam masuk dan/atau jam pulang sebuah Kehadiran `ditinjau` lalu menyimpannya → status jadi `normal` dengan jam yang sudah dikoreksi
- [ ] Ketiga jalur keputusan di atas diuji sungguhan, masing-masing menghasilkan state akhir yang benar
