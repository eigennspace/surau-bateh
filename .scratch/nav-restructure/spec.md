# Restrukturisasi navigasi — grup Kegiatan / Dakwah / Sosial

Status: ready-for-agent

## Problem Statement

Navigasi situs sekarang punya satu menu berjenjang, "Kegiatan & Aksi Sosial", beranak tiga (Kajian, Khitanan, Dauroh). Pengurus ingin kegiatan surau dipilah menjadi tiga kelompok yang mencerminkan jenis kegiatannya — **Kegiatan** (pembinaan rutin jamaah), **Dakwah** (syiar ke luar surau), dan **Sosial** (aksi sosial) — dan menambahkan empat halaman program baru: Tawajjuh & Kajian Rutin Ihsan, Konseling Psikoterapi Tasawuf, Bakti Sosial, serta Silaturahmi & Kerjasama Lembaga.

Bersamaan dengan itu, fitur Jadwal Shalat dipensiunkan. Entri navigasinya digantikan oleh halaman agenda yang sekarang bernama "Kajian", yang berganti nama jadi **Jadwal Kegiatan** — nama lamanya bertabrakan dengan halaman program baru "Tawajjuh & Kajian Rutin Ihsan" dan akan membingungkan pengurus maupun pembaca kode.

Ada juga utang kecil yang ikut dibereskan: foto dokumentasi halaman Khitanan saat ini di-`import` langsung di dalam `KhitananPage.jsx`, bukan di Sumber Data. Pengurus tidak bisa menambah foto tanpa menyentuh kode, dan bentuknya tidak siap untuk migrasi ke Sanity.

## Solution

### Struktur navigasi

Tiga grup berjenjang menggantikan satu grup lama, dipakai konsisten di **bottom bar**, **navbar desktop**, dan **burger mobile**.

| Grup | Anak |
|---|---|
| Kegiatan | Jadwal Kegiatan · Tawajjuh & Kajian Rutin Ihsan · Konseling Psikoterapi Tasawuf |
| Dakwah | Dauroh |
| Sosial | Khitanan · Bakti Sosial · Silaturahmi & Kerjasama Lembaga |

**Bottom bar** jadi 5 tab: Beranda (`house`) · Kegiatan (`calendar-days`) · Dakwah (`megaphone`) · Sosial (`heart-handshake`) · Artikel (`newspaper`). Ketiga grup memakai mekanik popover yang sudah ada di `BottomBar`. Popover dilebarkan agar nama anak yang panjang tampil utuh, bukan dipotong.

Infak keluar dari bottom bar. Tombol CTA "Salurkan Infak" **dihapus sepenuhnya dari navbar**, desktop maupun mobile, atas permintaan pengurus. Konsekuensi yang diterima sadar: satu-satunya jalur menuju halaman Infak sekarang adalah entri teks "Infak" di navbar — di desktop terlihat langsung, di mobile ada di dalam burger menu. Tidak ada lagi tombol donasi yang menonjol di mana pun. Karena entri teks itu jadi jalur tunggal, ada test yang menahannya agar tidak ikut terhapus.

**Navbar desktop dan burger mobile** memakai satu daftar 8 entri yang sama: Beranda · Profil · Kegiatan ▾ · Dakwah ▾ · Sosial ▾ · Infak · Artikel · Kontak. Tidak ada lagi tombol CTA di sampingnya.

"Jadwal Kegiatan" tidak punya entri navbar tersendiri — ia sudah jadi anak pertama grup Kegiatan, dan entri terpisah di sebelahnya berarti dua jalur ke halaman yang sama. Ada test yang menahan agar tidak ada halaman yang muncul sebagai entri navbar sekaligus anak grup.

### Halaman

Enam **Halaman Program** memakai `ProgramSection` (narasi + jadwal terfilter kategori + kartu kontak WhatsApp + galeri opsional). Overline tiap halaman = nama grup induknya, menggantikan overline lama "Kegiatan & Aksi Sosial" yang sudah tidak mewakili struktur baru.

| Halaman | Slug | Overline | Kategori event |
|---|---|---|---|
| Tawajjuh & Kajian Rutin Ihsan | `/tawajjuh` | Kegiatan | `Kajian & Tawajjuh`, `Kajian` |
| Konseling Psikoterapi Tasawuf | `/konseling` | Kegiatan | — (tidak ada) |
| Dauroh | `/dauroh` | Dakwah | `Dauroh`, `Daurah` |
| Khitanan | `/khitanan` | Sosial | `Khitanan` |
| Bakti Sosial | `/bakti-sosial` | Sosial | `Bakti Sosial` |
| Silaturahmi & Kerjasama Lembaga | `/silaturahmi` | Sosial | `Silaturahmi` |

Halaman agenda (`AgendaPage`) berganti nama jadi **Jadwal Kegiatan** dengan slug `/jadwal-kegiatan`. Isi dan perilakunya tidak berubah. Slug lama `/kajian` tetap hidup sebagai jalur masuk dan menulis ulang URL ke slug baru, supaya tautan yang sudah tersebar di grup WhatsApp jamaah tidak mati.

Narasi Konseling berhenti sebelum baris kontak yang ditulis pengurus ("Informasi dan Jadwal Konsultasi: ..."), diakhiri "...silahkan hubungi kontak person di bawah ini:" mengikuti pola Khitanan/Dauroh — nomornya sudah tampil sebagai `tel:` link dan tombol WhatsApp di kartu kontak, jadi menulisnya lagi di narasi berarti nomor yang sama muncul dua kali di satu layar.

Narasi Bakti Sosial dan Silaturahmi & Kerjasama Lembaga adalah draft yang ditandai jelas di Sumber Data untuk direview pengurus sebelum publish, sama seperti draft Khitanan/Dauroh sebelumnya.

### Kontak per-program

Empat entri baru di `contact` Sumber Data, sejajar `dauroh`/`khitanan` yang sudah ada. Nomor Ustadz Anshor sengaja ditulis ulang di tiga entri alih-alih mereferensikan `pengurus[0]` — Sumber Data diedit sebagai teks oleh pengurus, dan indireksi menambah konsep yang harus mereka pahami demi menghemat pengetikan satu nomor.

### Galeri program pindah ke Sumber Data

Foto dokumentasi Halaman Program pindah dari `import` di komponen halaman ke blok program masing-masing di Sumber Data (`khitanan: { title, narrative, gallery: [...] }`). Entri berbentuk `{ src, alt, caption?, meta? }` — nama field sengaja identik dengan dokumen `galleryItem` di Sanity supaya migrasi nanti tidak perlu lapisan penerjemah.

`ratio` tetap dipaku `1 / 1` di `ProgramSection`, tidak diekspos ke Sumber Data: grid Halaman Program adalah kotak seragam, berbeda dari grid masonry Beranda, dan memberi pengurus tombol rasio di sini hanya membuka jalan merusak tata letak. Prinsip yang sama sudah dipakai saat mengurasi field berisiko di schema Sanity.

Keenam blok program mendapat `gallery: []` eksplisit — Sumber Data adalah antarmuka pengurus, dan slot kosong yang terlihat jauh lebih mudah diisi daripada field yang harus mereka tahu boleh ditambahkan. Tiga foto Khitanan yang sudah ada pindah ke sini.

Di luar cakupan: schema Sanity untuk galeri program dan perubahan `fetch-sanity-content.mjs`. Galeri program tetap dibaca dari Sumber Data saat build. Migrasi ke Sanity jadi tiket terpisah.

### Penghapusan fitur Jadwal Shalat

Seluruh pipeline dibuang, bukan hanya halamannya — meninggalkan generator yang tetap berjalan tiap build tanpa ada yang memakai hasilnya adalah utang yang akan membingungkan pemelihara berikutnya. Lihat ADR [0007](../../docs/adr/0007-hapus-fitur-jadwal-shalat.md), yang men-supersede ADR 0004.

Yang dibuang: halaman + route + slug, entri nav, `scripts/generate-prayer-times.mjs` dan script npm-nya, `src/lib/prayerTimeCalculator.js`, fungsi `times`/`week`/prayer-aktif di `deriveSiteData`, `iqamahOffsets` di Sumber Data, blok `PrayerTimeTable` terkomentar di `Hero.jsx`, serta komponen `PrayerTimeTable`/`PrayerTimeRow` dari `site/src/design-system/` — **termasuk mencabutnya dari `COMPONENT_FILES` di `sync-design-system.mjs` dan dari barrel `ds.js`**; kalau tidak, `npm run sync-ds` berikutnya akan menghidupkannya kembali.

`location` tetap — dipakai peta di footer. Prototype di `New Surau Bateh Lori Design System/ui_kits/website/` tidak disentuh.

## User Stories

### Navigasi mobile

1. Sebagai pengunjung mobile, saya ingin melihat lima tab di bottom bar (Beranda, Kegiatan, Dakwah, Sosial, Artikel), sehingga saya bisa menjangkau bagian utama situs tanpa membuka burger menu.
2. Sebagai pengunjung mobile, saya ingin men-tap tab Kegiatan, Dakwah, atau Sosial, sehingga muncul popover di atas tab berisi halaman-halaman di grup itu — bukan langsung berpindah halaman.
3. Sebagai pengunjung mobile, saya ingin membaca nama halaman di popover secara utuh ("Tawajjuh & Kajian Rutin Ihsan", "Silaturahmi & Kerjasama Lembaga"), sehingga saya tidak salah menebak isi halaman dari nama yang terpotong.
4. Sebagai pengunjung mobile, saya ingin men-tap di luar popover, sehingga popover tertutup tanpa berpindah halaman.
5. Sebagai pengunjung mobile yang sedang membuka salah satu halaman di dalam sebuah grup, saya ingin tab grup itu terlihat aktif, sehingga saya tahu posisi saya di dalam struktur situs.
6. Sebagai pengunjung mobile, saya ingin membuka burger menu dan menemukan seluruh halaman situs termasuk Infak, sehingga tidak ada halaman yang tidak bisa saya capai.

### Navigasi desktop

8. Sebagai pengunjung desktop, saya ingin melihat tiga menu berjenjang (Kegiatan, Dakwah, Sosial) di navbar, sehingga struktur yang saya lihat sama dengan yang dilihat pengguna mobile.
9. Sebagai pengunjung desktop, saya ingin meng-hover salah satu grup, sehingga muncul dropdown berisi halaman-halaman di grup itu, dan tertutup sendiri saat kursor menjauh.
10. Sebagai pengunjung desktop, saya ingin menemukan Infak sebagai entri teks biasa di navbar, sejajar dengan halaman lain, tanpa tombol donasi yang menonjol.

### Halaman Program

11. Sebagai pengunjung yang membuka Tawajjuh & Kajian Rutin Ihsan, saya ingin membaca narasi programnya lalu melihat jadwal kajian dan tawajjuh rutin, sehingga saya tahu kapan bisa ikut.
12. Sebagai pengunjung yang membuka Konseling Psikoterapi Tasawuf, saya ingin membaca penjelasan layanan dan menemukan kontak Ust. Aldi Sanusi dengan tombol WhatsApp langsung, sehingga saya bisa menjadwalkan konsultasi tanpa mengetik ulang nomornya.
13. Sebagai pengunjung yang membuka Halaman Program yang belum punya jadwal (mis. Konseling), saya ingin melihat pesan "Kegiatan akan segera hadir" di area jadwal, alih-alih area kosong.
14. Sebagai pengunjung yang membuka Bakti Sosial atau Silaturahmi & Kerjasama Lembaga, saya ingin membaca narasi program dan menemukan kontak person yang bisa dihubungi.
15. Sebagai pengunjung yang membuka Halaman Program mana pun, saya ingin melihat label grup induknya di atas judul, sehingga saya tahu berada di cabang mana dari struktur situs.
16. Sebagai pengunjung yang membuka Khitanan, saya ingin tetap melihat tiga foto dokumentasi seperti sebelumnya, sehingga pemindahan galeri ke Sumber Data tidak terasa oleh pengunjung.

### Jadwal Kegiatan

17. Sebagai pengunjung, saya ingin menemukan "Jadwal Kegiatan" sebagai pilihan pertama di dalam menu Kegiatan, sehingga agenda adalah hal pertama yang saya lihat saat membuka grup itu.
18. Sebagai pengunjung yang membuka tautan lama `/kajian` dari grup WhatsApp atau bookmark, saya ingin sampai di halaman Jadwal Kegiatan dan melihat address bar berubah ke `/jadwal-kegiatan`, sehingga tautan lama tidak mati dan hanya ada satu URL kanonik.
19. Sebagai pengunjung, saya ingin isi dan perilaku halaman agenda (filter hari, daftar event, pengumuman, kartu kontak) tidak berubah sama sekali selain namanya.

### Deep link & riwayat browser

20. Sebagai pengunjung yang me-refresh atau membuka langsung URL halaman baru mana pun, saya ingin sampai di halaman yang benar, sama seperti deep-link yang sudah berfungsi untuk halaman lain.
21. Sebagai pengunjung yang menekan back/forward setelah berpindah antar halaman program, saya ingin URL dan halaman tetap sinkron.

### Pengurus surau

22. Sebagai pengurus, saya ingin menambah atau mengganti foto dokumentasi Halaman Program cukup dengan mengubah Sumber Data, tanpa menyentuh kode komponen halaman.
23. Sebagai pengurus, saya ingin melihat slot `gallery: []` yang sudah tersedia di setiap blok program, sehingga jelas di mana foto ditempelkan tanpa harus menebak field apa yang boleh ditambahkan.
24. Sebagai pengurus, saya ingin mengganti kontak person satu program tanpa ikut mengubah kontak program lain, meskipun beberapa program sekarang memakai nomor yang sama.
25. Sebagai pengurus, saya ingin menambah jadwal kegiatan untuk halaman program baru cukup dengan menambah entri di Sumber Data dengan kategori yang sesuai.
26. Sebagai pengurus yang membaca narasi Bakti Sosial dan Silaturahmi, saya ingin melihat penanda jelas bahwa teks itu masih draft, sehingga saya tahu bagian mana yang menunggu review saya.

### Penghapusan Jadwal Shalat

27. Sebagai pengunjung, saya ingin situs tetap berfungsi normal di seluruh halaman setelah fitur Jadwal Shalat dibuang, tanpa area kosong atau tautan mati yang tertinggal.
28. Sebagai maintainer, saya ingin tidak ada kode jadwal shalat yang tersisa sebagai kode mati — tidak ada generator yang berjalan tiap build tanpa pemakai, tidak ada komponen yang bisa hidup kembali lewat `npm run sync-ds`.
29. Sebagai maintainer, saya ingin membaca ADR yang menjelaskan kenapa situs surau justru tidak punya jadwal shalat, sehingga saya tidak menganggapnya fitur yang hilang karena kelalaian.

## Implementation Decisions

- **Bentuk `src` galeri**: `import` Vite di `sourceData.js` (pola `qrisImage`), bukan string path ke `public/`. Saat migrasi Sanity nanti, seluruh blok `gallery` akan diganti data hasil fetch — persis yang terjadi pada galeri Beranda di ADR 0006 — jadi cara `src` diproduksi hari ini bukan beban migrasi; yang penting bentuk arraynya. Sementara itu `import` memberi jaring pengaman: salah ketik nama file gagal saat build, bukan tampil sebagai foto rusak di produksi.
- **Redirect `/kajian`**: ditangani di `routeFromPath()` dengan `history.replaceState`, karena situs static export di GitHub Pages tidak punya redirect server.
- **Kategori event Tawajjuh**: memakai kategori yang sudah ada (`Kajian & Tawajjuh`, `Kajian`), bukan kategori baru, supaya pengurus tidak perlu memilah ulang event yang sudah tertulis. Konsekuensi yang diterima sadar: daftar jadwal di halaman Tawajjuh akan hampir identik dengan Jadwal Kegiatan — bedanya hanya Dauroh, filter hari, dan pengumuman.
- **Label popover tidak dipendekkan**: nama-nama program punya makna spesifik bagi jamaah; memotongnya berisiko salah tangkap. Popover yang dilebarkan lebih murah daripada nama yang ambigu.
