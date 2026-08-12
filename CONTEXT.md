# Situs Surau Bateh Lori

Situs publik surau: beranda, agenda kegiatan, halaman-halaman program, infak, profil, dan kontak. Kontennya berubah dari waktu ke waktu (agenda, program, donasi); tampilannya tidak — desainnya sudah difinalkan di `New Surau Bateh Lori Design System/`.

## Language

**Sumber Data**:
Satu berkas (gaya `data.js`) yang menjadi sumber konten yang bisa berubah dan masih diedit langsung sebagai teks oleh pengurus/pengelola situs — lokasi, tiga pohon silsilah keilmuan, info rekening donasi, dan (untuk saat ini) agenda/program/pengumuman/kontak/statistik, termasuk galeri foto tiap Halaman Program. Perubahan berlaku setelah situs di-build/deploy ulang, bukan langsung ke pengunjung yang sedang membuka tab. **Galeri foto dan artikel dikecualikan** dari Sumber Data sejak ADR [0006](docs/adr/0006-galeri-artikel-pindah-ke-sanity.md) — dua tipe konten itu (dan menyusul: agenda/news/programs/contact/donation campaign/stats di fase berikutnya) dikelola pengurus lewat **Sanity Studio**, ditarik ke situs saat build (build-time fetch, bukan runtime), lihat istilah "Dataset Sanity" di bawah.
_Avoid_: memperlakukan galeri/artikel sebagai bagian Sumber Data (sudah tidak lagi sejak ADR 0006); Database/backend/panel-admin custom untuk konten yang tetap di sini (silsilah, lokasi, info rekening, dst — keputusan "avoid CMS" ADR 0001 tetap berlaku untuk konten ini)

**Situs Produksi**:
Folder terpisah dari `New Surau Bateh Lori Design System/` di dalam repo yang sama, yang benar-benar tayang untuk pengunjung (build Vite + React, static export, di-deploy ke GitHub Pages). Bisa di-build secara independen — tidak butuh folder design system hadir saat build/deploy. Komponen, token, dan aset design system yang dipakai situs disalin (vendor) ke `site/src/design-system/` lewat `npm run sync-ds`, bukan diimpor langsung dari folder design system (lihat ADR 0003-site-vendors-design-system-snapshot, yang menggantikan ADR 0002). Selisih visual bisa muncul di antara dua kali sync — pemelihara menjalankan `sync-ds` secara sengaja untuk menarik pembaruan desain. Selain jeda sync itu, satu-satunya hal lain yang boleh berbeda antar situs dan design system adalah isi Sumber Data.
_Avoid_: Prototype (istilah ini khusus untuk berkas di `ui_kits/website/`, bukan situs produksi)

**Kampanye Donasi**:
Blok konteks opsional di halaman Infak (judul + deskripsi singkat, mis. "Renovasi Atap Surau") yang dinyalakan/dimatikan lewat satu toggle di Sumber Data. Mati = halaman Infak hanya menampilkan QRIS + info rekening tanpa bingkai apa pun. Menggantikan bilah kemajuan collected/target/deadline lama, yang tidak dipakai lagi di manapun (baik di halaman Infak maupun kartu Agenda).
_Avoid_: DonationProgress (nama komponen lama, bukan istilah domain), progress bar donasi

**Halaman Program**:
Halaman yang memperkenalkan satu program surau: narasi penjelasan, jadwal kegiatan yang tersaring dari `events` Sumber Data berdasarkan `category`, kartu kontak person program itu dengan tombol WhatsApp langsung, dan galeri dokumentasi opsional. Semuanya dirender oleh satu komponen bersama (`ProgramSection`) sehingga keenamnya konsisten. Halaman Program dikelompokkan ke tiga grup navigasi — **Kegiatan** (Tawajjuh & Kajian Rutin Ihsan, Konseling Psikoterapi Tasawuf), **Dakwah** (Dauroh), **Sosial** (Khitanan, Bakti Sosial, Silaturahmi & Kerjasama Lembaga) — dan nama grup itu tampil sebagai overline di halamannya. Grup hanyalah pengelompokan navigasi: grup sendiri tidak punya halaman atau URL.
_Avoid_: "Kegiatan & Aksi Sosial" (nama grup tunggal yang lama, sudah digantikan tiga grup); menyamakan Halaman Program dengan Jadwal Kegiatan

**Jadwal Kegiatan**:
Halaman agenda tunggal berisi seluruh `events` surau dengan filter hari dan blok pengumuman — pandangan menyeluruh "apa yang terjadi di surau", lawan dari Halaman Program yang memandang satu program saja. Dulu bernama "Kajian"; diganti karena bertabrakan dengan Halaman Program "Tawajjuh & Kajian Rutin Ihsan". Slug lamanya (`/kajian`) tetap hidup dan menulis ulang URL ke slug baru supaya tautan yang sudah tersebar tidak mati.
_Avoid_: Kajian, halaman Agenda (nama lama; `AgendaPage`/`AgendaSection` adalah nama komponen, bukan istilah domain)

**Dataset Sanity**:
Dataset tunggal (`production`) di project Sanity ("Surau Bateh", ID `w5hrk5sv`) yang menyimpan dokumen `article` dan `galleryItem` — konten yang dikecualikan dari Sumber Data sejak ADR [0006](docs/adr/0006-galeri-artikel-pindah-ke-sanity.md). Pengurus mengedit dan mem-publish lewat **Sanity Studio** (aplikasi terpisah di `studio/`, di-deploy ke `*.sanity.studio` lewat `sanity deploy`, tidak digabung ke build/deploy `site/`). Publish di Studio memicu webhook → GitHub Actions `repository_dispatch` → rebuild + deploy otomatis; situs publik tetap static export, fetch ke dataset ini hanya terjadi saat build (bukan di browser pengunjung), jadi Sanity down tidak membuat situs down. Tidak ada dataset staging/preview terpisah, dan tidak ada draft/approval workflow sebelum publish — role Editor punya publish rights langsung.
_Avoid_: fetch Sanity dari browser/runtime pengunjung; menganggap Studio bagian dari deploy pipeline `site/` (`deploy.yml`)
