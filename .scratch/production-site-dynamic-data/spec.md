Status: done

# Situs Produksi dengan Konten Dinamis dari Sumber Data

## Problem Statement

Pengurus surau sudah menyetujui desain situs (`New Surau Bateh Lori Design System/ui_kits/website/index.html` dan `mobile.html`) apa adanya — tidak ada perubahan visual yang diinginkan. Tapi desain itu saat ini hanya prototipe tanpa build step, dan sebagian kontennya (donasi, statistik, galeri, kartu Khatib Jumat) di-hardcode langsung di JSX, sebagian bahkan terduplikasi di dua tempat sekaligus. Pengurus butuh cara mengubah konten situs (jadwal salat, agenda, donasi, dll.) tanpa menyentuh kode, dan tanpa mengoperasikan database atau panel admin sungguhan.

## Solution

Bangun situs produksi terpisah (folder baru di repo yang sama) yang identik 100% secara visual dengan design system — komponennya diimpor langsung dari `New Surau Bateh Lori Design System/components/`, bukan ditulis ulang. Seluruh konten yang bisa berubah dipindahkan ke satu **Sumber Data**: berkas JS tunggal (mengikuti bentuk `window.SB_DATA` yang sudah ada di `data.js`) yang diedit tangan oleh pengurus. Situs di-build dengan Vite + React sebagai static export dan di-deploy ke GitHub Pages. Item yang sekarang hardcode di luar `data.js` (donasi, statistik, galeri, kartu Khatib Jumat) dipindahkan masuk atau diturunkan otomatis dari Sumber Data, sehingga tidak ada lagi konten ganda atau konten yang cuma bisa diubah dengan menyunting JSX.

## User Stories

1. Sebagai pengurus surau, saya ingin mengubah jadwal salat hari ini lewat satu berkas data, sehingga saya tidak perlu menyentuh kode React.
2. Sebagai pengunjung situs, saya ingin melihat waktu salat yang sedang berlangsung dan berikutnya ditandai otomatis sesuai jam saya membuka situs, sehingga saya tidak perlu menghitung sendiri.
3. Sebagai pengunjung situs, saya ingin tabel "Pekan ini" tetap tampil seperti sekarang (perkiraan berbasis jadwal hari ini), sehingga saya tetap punya gambaran kasar tanpa pengurus harus mengisi data 7 hari yang sebenarnya belum tersedia.
4. Sebagai pengurus surau, saya ingin menambah, mengubah, atau menghapus agenda kajian lewat Sumber Data, sehingga jadwal kajian selalu mutakhir.
5. Sebagai pengunjung situs, saya ingin memfilter agenda berdasarkan kategori (Kajian Rutin, Tahsin, Silat, Jumat), sehingga saya bisa mencari kegiatan yang relevan.
6. Sebagai pengunjung situs, saya ingin melihat kartu "Khatib Jumat" pada halaman Jadwal Salat terisi otomatis dari agenda berkategori "Jumat" yang terdekat, sehingga pengurus tidak perlu mengisi info yang sama dua kali.
7. Sebagai pengurus surau, saya ingin mengubah daftar program rutin (silat, kajian, tahsin, santunan) lewat Sumber Data, sehingga daftar program selalu mencerminkan kegiatan yang benar-benar berjalan.
8. Sebagai pengurus surau, saya ingin mengubah daftar pengumuman/berita lewat Sumber Data, sehingga jamaah selalu melihat pengumuman terbaru di panel Agenda.
9. Sebagai pengurus surau, saya ingin mengubah tahapan roadmap pembangunan (judul, periode, status, deskripsi) lewat Sumber Data, sehingga halaman Profil selalu mencerminkan progres pembangunan yang sebenarnya.
10. Sebagai pengurus surau, saya ingin mengubah gambar QRIS dan info rekening bank (nama bank, nomor rekening, nama pemilik) lewat Sumber Data, sehingga saya bisa memperbarui info donasi tanpa mengubah kode.
11. Sebagai pengunjung situs, saya ingin gambar QRIS tampil proporsional (tidak terpotong/gepeng) di halaman Infak, sehingga saya bisa memindainya dengan mudah.
12. Sebagai pengurus surau, saya ingin menyalakan atau mematikan satu kampanye donasi bernama (judul + deskripsi singkat) lewat satu toggle di Sumber Data, sehingga saya bisa menonjolkan kebutuhan dana tertentu (mis. renovasi atap) saat dibutuhkan, dan mematikannya saat sudah tidak relevan.
13. Sebagai pengunjung situs, saya ingin tetap melihat QRIS dan info rekening di halaman Infak walau tidak ada kampanye yang sedang aktif, sehingga saya tetap bisa berinfak kapan pun.
14. Sebagai pengunjung situs, saya TIDAK ingin lagi melihat bilah kemajuan donasi (jumlah terkumpul/target/tenggat), baik di halaman Infak maupun kartu di panel Agenda, karena info itu digantikan sepenuhnya oleh QRIS + rekening (+ kampanye opsional).
15. Sebagai pengurus surau, saya ingin mengubah angka statistik (jamaah rutin Subuh, kajian per bulan, dst.) lewat Sumber Data sebagai field manual, sehingga saya bisa memperbarui angka itu berdasarkan pengamatan pengurus tanpa perlu sistem penghitungan otomatis.
16. Sebagai pengurus surau, saya ingin mengubah, menambah, atau menghapus foto galeri (path, keterangan, meta) lewat Sumber Data, sehingga dokumentasi kegiatan bisa diperbarui tanpa menyunting JSX.
17. Sebagai pengurus surau, saya ingin mengubah data kontak (tautan Maps, nama/peran/nomor pengurus) lewat Sumber Data, sehingga info kontak selalu akurat.
18. Sebagai maintainer situs, saya ingin situs produksi mengimpor komponen visual langsung dari `New Surau Bateh Lori Design System/components/` dan token dari `tokens/*.css`, sehingga tidak ada risiko tampilan situs produksi menyimpang dari desain yang sudah disetujui.
19. Sebagai maintainer situs, saya ingin seluruh logika penerjemahan Sumber Data mentah menjadi data siap-render (status salat aktif/berikutnya, Khatib Jumat turunan, bentuk donasi final) terkumpul di satu fungsi murni, sehingga logika itu bisa diuji terpisah dari komponen visual.
20. Sebagai maintainer situs, saya ingin situs di-build dengan Vite dan di-deploy sebagai static export ke GitHub Pages, sehingga tidak perlu server/backend untuk menjalankan situs ini.
21. Sebagai pengurus surau, saya ingin proses memperbarui konten situs terbatas pada: mengedit Sumber Data, lalu build + deploy ulang — tanpa panel admin, tanpa login terpisah, tanpa database.

## Implementation Decisions

- **Struktur repo**: Repo ini di-init sebagai git repo (saat ini belum ada). Satu repo, dua folder tingkat atas: `New Surau Bateh Lori Design System/` (tidak berubah, tetap rujukan visual) dan folder baru untuk situs produksi (nama folder ditentukan saat implementasi dimulai, mis. `site/`).
- **Stack**: Vite + React, static export. Tidak ada SSR, tidak ada API route, tidak ada backend.
- **Hosting**: GitHub Pages, untuk saat ini.
- **Reuse komponen**: Situs produksi meng-impor langsung berkas komponen di `New Surau Bateh Lori Design System/components/*.jsx` dan token CSS di `tokens/*.css` — bukan menyalin atau menulis ulang. Lihat ADR `0002-production-imports-design-system-components-directly`.
- **Sumber Data**: Satu berkas ES module (mengikuti bentuk `window.SB_DATA` yang sudah ada di `data.js`, disesuaikan jadi `export const SB_DATA = {...}` agar bisa di-import Vite) yang menjadi satu-satunya sumber konten dinamis. Lihat ADR `0001-static-site-hand-edited-data-file`. Bidang yang sudah ada dipertahankan bentuknya: `times`, `events`, `programs`, `news`, `roadmap`, `contact`.
- **Bidang baru di Sumber Data**:
  - `donation`: `{ qris: <path gambar>, bank: { name, account, holder }, campaign: { active: boolean, title, description } }`. Nilai awal `bank` diambil dari `informasi-rekening.md` (BSI, 7771 806 168, a.n. PONPES RIBATH AS SA ADY) — sumber kebenaran, menggantikan teks lama di `DonatePage.jsx` yang dibuang. `qris` menunjuk ke `assets/qris-surau-lori.jpg`.
  - `stats`: array/objek field manual menggantikan angka yang di-hardcode di `StatsSection` (mis. jumlah jamaah rutin Subuh, kajian per bulan, deskripsi gotong royong).
  - `gallery`: array foto (`src`, `alt`, `caption`, `meta`, dan properti tampilan yang sudah ada di `PhotoTile` seperti `ratio`/`position`) menggantikan daftar hardcode di `GallerySection`.
- **Bidang yang dihapus/tidak dipindah**: field `collected`/`target`/`deadline` untuk `DonationProgress` tidak lagi dipakai di manapun — komponen `DonationProgress` tidak lagi dirender oleh situs produksi.
- **Data yang TIDAK dipindah ke Sumber Data**: kartu "Khatib Jumat" tidak punya field sendiri — diturunkan dari `events` (entri berkategori "Jumat" terdekat) oleh fungsi transformasi.
- **Seam pengujian tunggal**: fungsi murni `deriveSiteData(rawData, now)` (nama indikatif) sebagai satu-satunya titik di mana logika baru hidup:
  - Meneruskan `times`, `events`, `programs`, `news`, `roadmap`, `contact`, `stats`, `gallery` apa adanya.
  - Menghitung `activePrayerName`/`nextPrayerName` dari `now` dibanding `times` hari ini.
  - Menurunkan `khatibJumat` dari `events` berkategori "Jumat".
  - Menggabungkan `donation` mentah jadi bentuk siap-render: bila `campaign.active` true, sertakan judul+deskripsi kampanye; bila false, hanya QRIS + rekening polos.
  - Komponen halaman tetap murni presentational — hanya menerima hasil `deriveSiteData` sebagai props, tidak menjalankan logika sendiri.
- **Tabel "Pekan ini"**: perilaku saat ini (perkiraan berbasis offset dari jadwal hari ini) dipertahankan apa adanya — bukan cakupan pekerjaan ini untuk diganti dengan data 7 hari yang sungguhan.

## Testing Decisions

- Uji hanya menyasar `deriveSiteData` (atau modul setara) sebagai unit murni: input berupa fixture Sumber Data + nilai `now` yang dikontrol, output diverifikasi terhadap bentuk view-model yang diharapkan — bukan detail internal implementasi.
- Kasus yang wajib diuji:
  - `activePrayerName`/`nextPrayerName` benar untuk `now` di berbagai titik sepanjang hari (sebelum Subuh, di antara dua waktu salat, setelah Isya).
  - `khatibJumat` memilih entri `events` berkategori "Jumat" yang tepat (termasuk kasus tidak ada entri berkategori "Jumat").
  - Bentuk `donation` berubah sesuai `campaign.active` (true → menyertakan judul/deskripsi; false → QRIS+rekening polos saja).
  - Field pass-through (`programs`, `news`, `roadmap`, `contact`, `stats`, `gallery`) diteruskan tanpa mutasi.
- Tidak ada tes komponen/rendering/browser untuk pekerjaan ini — tampilan sudah dibekukan sesuai desain yang disetujui (ADR `0002`), sehingga tidak ada perilaku render baru yang perlu diverifikasi.
- Tidak ada prior art pengujian di repo ini — ini akan menjadi test suite pertama, karena situs produksi belum ada sama sekali.

## Out of Scope

- Data jadwal salat 7 hari yang sungguhan untuk tab "Pekan ini" (tetap perkiraan seperti sekarang).
- Panel admin/CMS, autentikasi, atau antarmuka pengeditan konten selain menyunting Sumber Data langsung sebagai teks.
- Database, API, atau backend dalam bentuk apa pun.
- Pembaruan konten tanpa build+deploy ulang (mis. live update ke tab pengunjung yang sedang terbuka).
- Dukungan lebih dari satu kampanye donasi aktif sekaligus (hanya satu toggle, satu kampanye).
- Penghitungan otomatis untuk `stats` (tetap field manual).
- Perubahan visual/desain apa pun terhadap komponen di design system — situs produksi harus identik 100%.
- Hosting selain GitHub Pages (bisa dipertimbangkan lagi nanti, di luar cakupan spec ini).
- Fitur pengingat/notifikasi (switch di `SchedulePage` tetap UI murni tanpa pengkabelan backend).

## Further Notes

- Keputusan-keputusan di spec ini berasal dari sesi grilling sebelumnya; ringkasannya ada di riwayat percakapan dan di dua ADR: `docs/adr/0001-static-site-hand-edited-data-file.md` dan `docs/adr/0002-production-imports-design-system-components-directly.md`.
- Istilah domain terkait ada di `CONTEXT.md` (root repo): **Sumber Data**, **Situs Produksi**, **Kampanye Donasi**.
- Konten dari `New Surau Bateh Lori Design System/README.md` dan `readme.md` (batasan bahasa, nada, dan larangan konten karangan) tetap berlaku untuk data awal yang diisikan ke Sumber Data — jangan mengarang angka/nama yang belum dikonfirmasi pengurus.
- Nama folder situs produksi, nama file Sumber Data yang persis, dan nama fungsi transformasi (`deriveSiteData`) bersifat indikatif — keputusan final ada di tangan agen implementasi, selama bentuk dan tanggung jawabnya sesuai spec ini.
