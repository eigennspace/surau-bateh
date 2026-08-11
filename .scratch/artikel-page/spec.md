# Halaman Artikel — Blog Markdown untuk Situs Surau

Status: done

## Problem Statement

Pengurus surau mendapat masukan dari audiens/jamaah bahwa situs perlu wadah untuk tulisan yang lebih panjang dari sekadar pengumuman singkat (`SB_DATA.news`) — sesuatu seperti artikel/tulisan yang punya judul, penulis, tanggal, dan isi yang bisa disertai gambar. Saat ini tidak ada halaman atau section apa pun di situs untuk jenis konten ini, dan tidak ada komponen "artikel" di design system yang sudah difinalkan.

Situs ini statis (Vite + React, di-deploy ke GitHub Pages) dan sengaja tanpa CMS/database/API ([ADR 0001](../../docs/adr/0001-static-site-hand-edited-data-file.md)) — jadi solusinya harus tetap sejalan dengan pola "konten diedit tangan sebagai teks" yang sudah dipakai `sourceData.js`, bukan menambah backend.

## Solution

Menambahkan fitur Artikel bergaya blog sederhana:

- Satu section baru **"Artikel Terbaru"** di halaman Beranda (3 artikel terbaru + tombol "Lihat semua artikel"), ditempatkan setelah section Agenda/Kajian dan sebelum Gallery.
- Satu halaman penuh baru **"Artikel"**, ditambahkan ke `NAV` (dan hanya diakses lewat menu hamburger di mobile, tidak masuk `BottomBar`), berisi daftar seluruh artikel dengan tombol "Muat lebih banyak".
- Satu halaman detail per artikel dengan URL sendiri (`/artikel/<slug>`), menampilkan judul, penulis, tanggal, dan isi (bisa menyertakan gambar).

Tiap artikel adalah satu file Markdown terpisah di repo (analog `sourceData.js` — teks yang diedit tangan langsung oleh pengurus, tanpa CMS), diparse jadi data siap-render lewat satu fungsi murni baru, mengikuti pola `deriveSiteData`/`prayerTimeCalculator` yang sudah ada di `site/src/lib/`.

## User Stories

1. Sebagai pengunjung situs di Beranda, saya ingin melihat section "Artikel Terbaru" berisi 3 artikel paling baru (judul, penulis, tanggal, ringkasan, gambar sampul jika ada), sehingga saya tahu situs punya tulisan baru tanpa harus buka halaman terpisah.
2. Sebagai pengunjung situs di section "Artikel Terbaru", saya ingin mengklik tombol "Lihat semua artikel", sehingga saya diarahkan ke halaman Artikel penuh.
3. Sebagai pengunjung situs, saya ingin mengklik satu kartu artikel (di Beranda maupun di halaman listing), sehingga saya dibawa ke halaman detail artikel itu dengan URL sendiri yang bisa saya bookmark/bagikan.
4. Sebagai pengunjung situs desktop, saya ingin melihat menu "Artikel" di navigasi utama (`NAV`), sehingga saya bisa langsung menuju halaman listing artikel dari mana pun di situs.
5. Sebagai pengunjung situs mobile, saya ingin membuka menu hamburger dan melihat tautan "Artikel" di daftar menu, sehingga saya tetap bisa mengaksesnya walau tidak ada ikon khusus di `BottomBar`.
6. Sebagai pengunjung situs di halaman listing Artikel, saya ingin melihat seluruh artikel terurut dari yang terbaru, dengan tombol "Muat lebih banyak" yang menampilkan 6 artikel tambahan tiap kali diklik, sehingga halaman tidak memuat semua artikel sekaligus kalau jumlahnya sudah banyak.
7. Sebagai pengunjung situs yang membuka halaman detail artikel, saya ingin melihat judul, nama penulis, tanggal, dan isi artikel lengkap (termasuk gambar yang disisipkan penulis di badan tulisan, jika ada), sehingga saya bisa membaca tulisan itu secara utuh.
8. Sebagai pengunjung situs yang membuka artikel tanpa gambar sama sekali di badannya, saya ingin artikel tetap tampil rapi tanpa ruang kosong janggal untuk gambar yang tidak ada.
9. Sebagai pengunjung situs yang membuka Beranda sebelum ada artikel yang diterbitkan sama sekali, saya ingin melihat pesan "Artikel akan segera tayang" alih-alih section kosong atau rusak.
10. Sebagai pengunjung situs yang membuka halaman Artikel langsung (lewat URL/menu) sebelum ada artikel yang diterbitkan, saya ingin melihat pesan yang sama, "Artikel akan segera tayang".
11. Sebagai pengunjung situs yang membuka URL artikel yang slug-nya tidak ada (typo/artikel dihapus), saya ingin mendapat penanganan yang wajar (tidak halaman putih kosong tanpa penjelasan) — bukan fokus utama fitur ini, tapi harus tidak pecah.
12. Sebagai pengunjung situs yang membagikan tautan artikel lewat WhatsApp, saya paham (bukan bug) bahwa preview link yang muncul masih generic (judul & gambar situs, bukan spesifik artikel) — situs ini client-side render tanpa server-side rendering; perbaikan pratinjau share ditangani terpisah di luar fitur ini.
13. Sebagai pengurus surau yang ingin menerbitkan artikel baru, saya ingin cukup menambah satu file Markdown baru berisi frontmatter (`title`, `author`, `date`, `excerpt`, `cover` opsional) dan badan tulisan (boleh disisipi gambar), lalu commit + deploy ulang situs — tanpa perlu login, panel admin, atau database.
14. Sebagai pengurus surau, saya ingin URL artikel otomatis terbentuk dari nama file Markdown-nya (bukan field terpisah yang harus saya isi manual), sehingga saya tidak perlu memikirkan slug secara eksplisit.
15. Sebagai pengurus surau, saya ingin mengontrol kapan artikel tayang cukup lewat kapan saya commit filenya ke branch utama (tidak ada field "draft"/"published" terpisah yang bisa lupa saya set), konsisten dengan cara kerja Sumber Data (`sourceData.js`) yang sudah ada.
16. Sebagai pengurus surau, saya ingin nama penulis diisi sebagai teks bebas di frontmatter (tidak harus merujuk ke daftar `contact.pengurus` yang sudah ada), karena penulis artikel belum tentu selalu pengurus resmi.
17. Sebagai maintainer situs yang membaca `sourceData.js`/`SB_DATA`, saya ingin memastikan tidak ada perubahan skema di berkas itu untuk fitur ini — artikel adalah sumber data terpisah (file Markdown), bukan bagian `SB_DATA`.
18. Sebagai maintainer situs, saya ingin frontmatter Markdown artikel punya bentuk field yang jelas dan konsisten (`title`, `author`, `date`, `excerpt`, `cover?`), sehingga kalau nanti dibangun dashboard/login dengan penyimpanan database, field-field ini bisa dipetakan langsung tanpa perlu merancang ulang model datanya dari nol.
19. Sebagai developer yang menambah artikel baru lewat Markdown, saya ingin ada satu titik (fungsi murni) yang mem-parsing seluruh file Markdown menjadi array artikel siap-render (terurut tanggal terbaru dulu), sehingga logika parsing/sorting/slug tidak tersebar di beberapa komponen halaman.
20. Sebagai pengunjung situs, saya ingin section Artikel di Beranda dan halaman Artikel mengikuti gaya visual (warna, tipografi, spacing, kartu) yang sama dengan bagian situs lain, sehingga terasa menyatu, bukan seperti ditempel dari desain lain.
21. Sebagai pengunjung situs yang membuka halaman lain (Jadwal Shalat, Kajian, Infak, Profil, Kontak), saya ingin perilaku dan tampilan halaman-halaman itu tidak berubah sama sekali akibat penambahan fitur Artikel ini.

## Implementation Decisions

- **Sumber konten**: folder baru berisi satu file Markdown per artikel (mis. `site/src/data/articles/*.md`), dimuat saat build lewat `import.meta.glob` milik Vite (raw string import) — bukan fetch runtime, bukan API.
- **Frontmatter**: `title` (string), `author` (string bebas), `date` (string tanggal), `excerpt` (string ringkasan manual, bukan potongan otomatis dari body), `cover` (path gambar, opsional). Badan file = Markdown biasa, boleh menyisipkan gambar lewat sintaks gambar Markdown standar; video/embed lain di luar cakupan.
- **Parsing frontmatter**: tambahkan dependency parser frontmatter (mis. `gray-matter`) ke `site/package.json`, karena belum ada di dependency saat ini.
- **Rendering Markdown ke HTML**: tambahkan dependency renderer Markdown ringan (mis. `marked` atau `react-markdown`) untuk mengubah badan artikel jadi markup tampil.
- **Fungsi murni baru `deriveArticles`** (di `site/src/lib/`, mengikuti pola `deriveSiteData`/`prayerTimeCalculator`): menerima hasil glob mentah (peta nama-file → raw content), mengembalikan array artikel terurut tanggal-terbaru-dulu, tiap entri berbentuk `{ slug, title, author, date, excerpt, cover, bodyHtml }`. Fungsi ini murni — tidak membaca filesystem sendiri, tidak ada efek samping — supaya bisa dites dengan fixture string tanpa file sungguhan.
- **Slug**: diturunkan otomatis dari nama file Markdown (mis. `2026-08-12-santunan-yatim.md` → slug `santunan-yatim`), bukan field frontmatter terpisah.
- **Status tayang**: tidak ada field draft/published — semua file yang ada di folder artikel saat build dianggap tayang. Kontrol ada di git (commit ke `main` = tayang setelah deploy berikutnya).
- **Kategori/tag**: tidak ada pada iterasi ini — listing flat, terurut kronologis.
- **Routing** (`site/src/App.jsx`): perluas mekanisme `PAGE_SLUGS`/routing yang ada untuk menangani dua path baru: `/artikel` (halaman listing) dan `/artikel/<slug>` (halaman detail, `<slug>` dinamis, dicocokkan ke hasil `deriveArticles`). Mekanisme `404.html`/`index.html` (pola *spa-github-pages*) yang sudah ada bersifat generik dan sudah menangani deep-link/refresh untuk path dinamis ini tanpa perubahan tambahan.
- **Navigasi**: `NAV` (desktop) bertambah satu item "Artikel" (jadi 7 item). `BottomBar` (mobile, 5 ikon) tidak berubah — "Artikel" hanya muncul di daftar menu hamburger (`MobileHeader`). Footer tidak wajib diubah untuk iterasi ini kecuali ingin menambah tautan "Artikel" di salah satu kolom yang sudah ada.
- **Komponen baru** (di `site/src/components/` dan/atau `site/src/pages/`, gaya visual mengikuti token design system yang sudah ada — tidak ada referensi visual eksternal):
  - `ArticlesSection` — section Beranda, menampilkan 3 artikel terbaru + tombol "Lihat semua artikel"; menampilkan pesan empty state "Artikel akan segera tayang" kalau `deriveArticles` mengembalikan array kosong.
  - `ArtikelPage` — halaman listing, menampilkan artikel dalam batch 6 dengan tombol "Muat lebih banyak" yang menambah 6 lagi tiap klik; pesan empty state yang sama seperti di atas kalau kosong.
  - `ArticleDetailPage` — halaman detail satu artikel (judul, penulis, tanggal, `bodyHtml`); menangani slug yang tidak ditemukan dengan wajar (tidak crash/halaman kosong tanpa penjelasan) — level penanganan minimal, bukan halaman 404 kustom yang didesain khusus.
- **Kartu artikel**: menampilkan judul, penulis, tanggal, ringkasan (`excerpt`), gambar sampul (`cover`) kalau ada — tanpa gambar tetap tampil rapi kalau `cover` kosong.
- **Tidak ada perubahan skema** pada `SB_DATA`/`sourceData.js`/`deriveSiteData.js` — artikel adalah sumber data yang sepenuhnya terpisah.
- **Pratinjau share media sosial**: di luar cakupan — link artikel tetap pakai OG tag generic situs (lihat Out of Scope).

## Testing Decisions

- Test menguji perilaku tampak (apa yang dirender/dihasilkan), bukan detail implementasi — mengikuti pola test yang sudah ada di repo (`site/src/data/sourceData.test.js` menguji invarian data, `site/src/pages/SchedulePage.test.jsx` menguji hasil render lewat `renderToStaticMarkup`).
- **`deriveArticles` (unit, prioritas utama)**: diuji dengan fixture berupa peta nama-file → raw markdown string (tidak menyentuh filesystem sungguhan) mengikuti pola fixture di `deriveSiteData.test.js`. Kasus yang perlu dicakup: parsing frontmatter lengkap; artikel tanpa `cover`; slug diturunkan benar dari nama file (termasuk file dengan prefix tanggal); urutan hasil terbaru-dulu berdasarkan `date`; badan Markdown (termasuk gambar) berhasil diubah jadi `bodyHtml`.
- **Rendering halaman (`renderToStaticMarkup`, mengikuti pola `SchedulePage.test.jsx`)**:
  - `ArticlesSection`: dengan fixture 5 artikel, memastikan hanya 3 terbaru yang muncul, tombol "Lihat semua artikel" ada; dengan array kosong, memastikan muncul "Artikel akan segera tayang" dan tidak me-render kartu apa pun.
  - `ArtikelPage`: dengan fixture >6 artikel, memastikan batch awal 6 tampil dan sisanya tidak, sampai perilaku "Muat lebih banyak" dipicu (bisa diuji lewat interaksi kalau ada harness event, atau minimal memverifikasi state/props batch — sesuaikan dengan kapabilitas harness test yang tersedia saat implementasi); dengan array kosong, pesan empty state yang sama muncul.
  - `ArticleDetailPage`: dengan fixture satu artikel, judul/penulis/tanggal/isi (termasuk gambar dalam body) muncul di markup; dengan slug yang tidak cocok, halaman tidak crash.
- **Regresi halaman lain**: tidak perlu test baru untuk Jadwal Shalat/Kajian/Infak/Profil/Kontak — cukup pastikan test suite yang sudah ada (`SchedulePage.test.jsx`, `deriveSiteData.test.js`, `sourceData.test.js`, `prayerTimeCalculator.test.js`) tetap lulus tanpa modifikasi setelah perubahan `App.jsx`/`NAV`/routing.

## Out of Scope

- Dashboard/login untuk mengelola artikel — milestone terpisah, disebut di sini hanya sebagai konteks kenapa bentuk frontmatter dipilih seperti ini.
- Kategori/tag dan filter artikel.
- Dukungan video/embed non-gambar di badan artikel.
- Field draft/published terpisah — kontrol tayang cukup lewat git.
- Pratinjau share media sosial spesifik per artikel (og:title/og:image dinamis) — butuh solusi pre-rendering/SSR, dirumuskan terpisah.
- Halaman 404 kustom yang didesain khusus untuk slug artikel yang tidak ditemukan (cukup penanganan wajar, tidak crash).
- Perubahan pada `New Surau Bateh Lori Design System/` sumber (folder terpisah, bukan bagian situs produksi) — komponen baru dibangun langsung di `site/`, mengikuti token yang sudah divendor, bukan menambah komponen baru ke design system lalu di-sync.
- Perubahan skema `SB_DATA`/`sourceData.js`.
- Pagination bergaya nomor halaman (yang dipakai adalah "Muat lebih banyak").
- Fitur pencarian artikel.

## Further Notes

- Ada array `news` (pengumuman) yang sudah ada di `SB_DATA` — sengaja dibiarkan terpisah dari fitur Artikel ini (pengumuman singkat vs tulisan panjang), tidak digabung atau dimigrasikan.
- Penambahan menu "Artikel" membuat `NAV` desktop menjadi 7 item; pengguna menyebut kemungkinan fitur "setup list menu configuration" di masa depan untuk mengelola navigasi secara lebih fleksibel — di luar cakupan spec ini, dicatat sebagai konteks untuk keputusan navigasi saat ini.
- Dependency baru yang perlu ditambahkan ke `site/package.json`: parser frontmatter (mis. `gray-matter`) dan renderer Markdown (mis. `marked`/`react-markdown`) — pemilihan library spesifik diserahkan ke implementer, mengutamakan yang ringan dan kompatibel dengan build Vite static export.
