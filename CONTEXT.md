# Situs Surau Bateh Lori

Situs publik surau: beranda, jadwal salat, agenda kajian, infak, profil, dan kontak. Kontennya berubah dari waktu ke waktu (jadwal, agenda, donasi); tampilannya tidak — desainnya sudah difinalkan di `New Surau Bateh Lori Design System/`.

## Language

**Sumber Data**:
Satu berkas (gaya `data.js`) yang menjadi satu-satunya sumber konten yang bisa berubah — jadwal salat, agenda, program, pengumuman, roadmap, donasi, kontak. Diedit langsung sebagai teks oleh pengurus/pengelola situs. Bukan database (SQL/Firebase/dll), bukan panel admin/CMS, bukan API — tidak ada lapisan lain di antara berkas ini dan tampilan. Perubahan berlaku setelah situs di-build/deploy ulang, bukan langsung ke pengunjung yang sedang membuka tab.
_Avoid_: Database, CMS, backend

**Situs Produksi**:
Folder terpisah dari `New Surau Bateh Lori Design System/` di dalam repo yang sama, yang benar-benar tayang untuk pengunjung (build Vite + React, static export, di-deploy ke GitHub Pages). Wajib identik 100% secara visual dengan desain di design system — komponennya diimpor langsung dari `New Surau Bateh Lori Design System/components/`, bukan ditulis ulang. Satu-satunya hal yang boleh berbeda antar keduanya adalah isi Sumber Data.
_Avoid_: Prototype (istilah ini khusus untuk berkas di `ui_kits/website/`, bukan situs produksi)

**Kampanye Donasi**:
Blok konteks opsional di halaman Infak (judul + deskripsi singkat, mis. "Renovasi Atap Surau") yang dinyalakan/dimatikan lewat satu toggle di Sumber Data. Mati = halaman Infak hanya menampilkan QRIS + info rekening tanpa bingkai apa pun. Menggantikan bilah kemajuan collected/target/deadline lama, yang tidak dipakai lagi di manapun (baik di halaman Infak maupun kartu Agenda).
_Avoid_: DonationProgress (nama komponen lama, bukan istilah domain), progress bar donasi
