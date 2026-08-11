# Situs Surau Bateh Lori

Situs publik surau: beranda, jadwal salat, agenda kajian, infak, profil, dan kontak. Kontennya berubah dari waktu ke waktu (jadwal, agenda, donasi); tampilannya tidak — desainnya sudah difinalkan di `New Surau Bateh Lori Design System/`.

## Language

**Sumber Data**:
Satu berkas (gaya `data.js`) yang menjadi satu-satunya sumber konten yang bisa berubah — jadwal salat, agenda, program, pengumuman, roadmap, donasi, kontak. Diedit langsung sebagai teks oleh pengurus/pengelola situs. Bukan database (SQL/Firebase/dll), bukan panel admin/CMS, bukan API — tidak ada lapisan lain di antara berkas ini dan tampilan. Perubahan berlaku setelah situs di-build/deploy ulang, bukan langsung ke pengunjung yang sedang membuka tab.
_Avoid_: Database, CMS, backend

**Situs Produksi**:
Folder terpisah dari `New Surau Bateh Lori Design System/` di dalam repo yang sama, yang benar-benar tayang untuk pengunjung (build Vite + React, static export, di-deploy ke GitHub Pages). Bisa di-build secara independen — tidak butuh folder design system hadir saat build/deploy. Komponen, token, dan aset design system yang dipakai situs disalin (vendor) ke `site/src/design-system/` lewat `npm run sync-ds`, bukan diimpor langsung dari folder design system (lihat ADR 0003-site-vendors-design-system-snapshot, yang menggantikan ADR 0002). Selisih visual bisa muncul di antara dua kali sync — pemelihara menjalankan `sync-ds` secara sengaja untuk menarik pembaruan desain. Selain jeda sync itu, satu-satunya hal lain yang boleh berbeda antar situs dan design system adalah isi Sumber Data.
_Avoid_: Prototype (istilah ini khusus untuk berkas di `ui_kits/website/`, bukan situs produksi)

**Kampanye Donasi**:
Blok konteks opsional di halaman Infak (judul + deskripsi singkat, mis. "Renovasi Atap Surau") yang dinyalakan/dimatikan lewat satu toggle di Sumber Data. Mati = halaman Infak hanya menampilkan QRIS + info rekening tanpa bingkai apa pun. Menggantikan bilah kemajuan collected/target/deadline lama, yang tidak dipakai lagi di manapun (baik di halaman Infak maupun kartu Agenda).
_Avoid_: DonationProgress (nama komponen lama, bukan istilah domain), progress bar donasi

**Data Jadwal Salat Ter-generate**:
Dataset jam adzan (`{date, subuh, syuruq, dzuhur, ashar, maghrib, isya}` per tanggal, ±1 tahun ke depan) dihasilkan `site/scripts/generate-prayer-times.mjs` saat `npm run build`/`npm run dev`, dari koordinat di Sumber Data + metode Kemenag (`site/src/lib/prayerTimeCalculator.js`). Bukan bagian Sumber Data — tidak diedit tangan, tidak dikomit (di-gitignore), dibangkitkan ulang tiap build. `deriveSiteData` menggabungkannya dengan `iqamahOffsets` (yang tetap di Sumber Data) untuk membentuk `times`/`week` siap-render. Lihat ADR `0004-prayer-times-computed-not-hand-typed`.
_Avoid_: memperlakukan jam adzan sebagai bagian Sumber Data (sudah tidak lagi sejak ADR 0004)
