# 03 — Jendela Absen + Kehadiran (check-in/check-out) dengan klasifikasi normal/Ditinjau

Status: done

**What to build:** Pengurus mengatur Jendela Absen lewat satu pengaturan global: titik koordinat + radius lokasi surau, dan jam kerja (jam mulai–selesai) — berlaku sama untuk semua Peserta (lihat `absen/CONTEXT.md` untuk definisi istilah). Peserta yang Pendaftaran-nya sudah `disetujui` (ticket 02) memakai PIN-nya untuk check-in saat tiba (menangkap jam dan lokasi) dan check-out saat pulang (menangkap jam pulang, plus mengisi catatan singkat aktivitas hari itu). Satu Kehadiran adalah satu record harian per Peserta. Kehadiran yang check-in/check-out-nya berada dalam radius lokasi dan jam kerja Jendela Absen tersimpan berstatus `normal`; yang di luar salah satu atau kedua batas itu **tetap tersimpan**, tidak ditolak, tapi berstatus `ditinjau`.

**Blocked by:** 02 — butuh Peserta dengan Pendaftaran `disetujui` dan PIN untuk diuji end-to-end

- [x] Pengurus bisa mengatur/mengubah Jendela Absen (koordinat+radius lokasi, jam mulai–selesai jam kerja) lewat dashboard
- [x] Peserta dengan PIN valid dan Pendaftaran `disetujui` bisa check-in (tercatat jam masuk)
- [x] Peserta yang sama bisa check-out di hari yang sama (tercatat jam pulang + catatan aktivitas) untuk melengkapi Kehadiran hari itu
- [x] Check-in/check-out dengan PIN yang tidak valid, atau milik Peserta yang belum `disetujui`, ditolak
- [x] Check-in/check-out yang berada dalam radius lokasi DAN dalam jam kerja Jendela Absen menghasilkan Kehadiran berstatus `normal`
- [x] Check-in/check-out yang berada di luar radius lokasi ATAU di luar jam kerja tetap tersimpan sebagai Kehadiran, dengan status `ditinjau` — bukan ditolak/gagal
- [x] Kedua jalur (dalam batas dan di luar batas) diuji sungguhan, bukan cuma salah satu

## Comments

Diimplementasikan (`app/dashboard/jendela-absen`, `app/absen`, `lib/absen/kehadiran.js`, `lib/absen/jendelaAbsen.js`). Ditambah dua hal di luar checklist awal atas permintaan user: (1) lokasi check-in/check-out kini juga disimpan (bukan cuma dievaluasi lalu dibuang), ditampilkan ke Pengurus di dashboard Kehadiran Ditinjau dengan jarak dari titik Jendela Absen; (2) form Jendela Absen bisa diisi lewat GPS browser atau tempel link Google Maps, bukan cuma ketik manual. Peserta di `/absen` juga dapat modal yang menuntun aktivasi izin lokasi. Diuji lib/absen/kehadiran.test.js (jalur normal & ditinjau untuk radius maupun jam kerja, keduanya diuji sungguhan) dan diverifikasi manual lewat browser + Postgres nyata. Lihat commit `250a626`, `d6eabfd`, `51b67cb`, `3c8eb9f`.
