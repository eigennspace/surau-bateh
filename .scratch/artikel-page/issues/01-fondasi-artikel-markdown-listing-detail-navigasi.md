# 01 — Fondasi artikel: parsing Markdown, halaman listing, halaman detail, navigasi

**What to build:** Fungsi murni `deriveArticles` (mengikuti pola `deriveSiteData`/`prayerTimeCalculator` di `site/src/lib/`) yang menerima hasil `import.meta.glob` (raw string per file Markdown) dan mengembalikan array artikel siap-render — `{ slug, title, author, date, excerpt, cover, bodyHtml }` — terurut tanggal terbaru dulu. Slug diturunkan otomatis dari nama file (bukan field frontmatter). Tambahkan dependency parser frontmatter (mis. `gray-matter`) dan renderer Markdown (mis. `marked`/`react-markdown`) ke `site/package.json`.

Tambahkan folder sumber artikel (satu file Markdown per artikel, frontmatter `title`/`author`/`date`/`excerpt`/`cover?`) berisi 2–3 artikel contoh (seed content) supaya fitur bisa didemokan end-to-end.

Perluas routing di `App.jsx` untuk dua path baru: `/artikel` (halaman listing — untuk tiket ini, tampilkan **seluruh** artikel tanpa pagination; "Muat lebih banyak" menyusul di tiket 03) dan `/artikel/<slug>` (halaman detail: judul, penulis, tanggal, isi lengkap termasuk gambar dalam body; slug yang tidak ditemukan ditangani dengan wajar, tidak crash). Tambahkan `"Artikel"` ke konstanta `NAV` — karena `NavBar` (desktop) dan `MobileHeader` (hamburger mobile) sama-sama membaca array `NAV` yang sama, ini otomatis memunculkan menu di kedua tempat tanpa kerja tambahan. `BottomBar` (5 ikon mobile) tidak diubah.

Halaman listing dan section Beranda (tiket 02) sama-sama butuh empty state "Artikel akan segera tayang" saat array artikel kosong — untuk tiket ini, terapkan di halaman listing.

Tidak ada perubahan skema pada `SB_DATA`/`sourceData.js`/`deriveSiteData.js` — artikel adalah sumber data yang sepenuhnya terpisah.

**Blocked by:** Tidak ada — bisa mulai langsung

**Status:** done

- [x] `deriveArticles` murni: tidak membaca filesystem sendiri, tidak ada efek samping, keluaran hanya bergantung pada input glob yang diterima
- [x] Dependency renderer Markdown (`marked`) ditambahkan ke `site/package.json`. Frontmatter **tidak** memakai `gray-matter` seperti disarankan — dependency-nya (`js-yaml`) menarik modul inti Node `buffer` yang gagal di-resolve saat dibundel Vite untuk browser (`ReferenceError: Buffer is not defined` runtime). Diganti parser frontmatter tulisan-tangan (`parseFrontmatter` di `deriveArticles.js`, cukup untuk bentuk flat `key: value` yang dipakai fitur ini) — lihat komentar di kode.
- [x] 2–3 artikel contoh (file Markdown dengan frontmatter lengkap) tersedia sebagai seed content
- [x] `/artikel` menampilkan seluruh artikel terurut terbaru dulu (judul, penulis, tanggal, ringkasan, cover kalau ada)
- [x] `/artikel` menampilkan "Artikel akan segera tayang" saat tidak ada artikel sama sekali, tanpa kartu apa pun
- [x] Klik satu kartu artikel membuka `/artikel/<slug>` menampilkan judul, penulis, tanggal, dan isi lengkap (termasuk gambar yang disisipkan di body, kalau ada)
- [x] Artikel tanpa gambar di body tetap tampil rapi tanpa ruang kosong janggal
- [x] URL `/artikel/<slug>` yang slug-nya tidak cocok dengan artikel manapun ditangani dengan wajar (tidak halaman putih kosong tanpa penjelasan)
- [x] Menu "Artikel" muncul di navigasi desktop (`NAV`) dan menu hamburger mobile, mengarah ke `/artikel`
- [x] `BottomBar` mobile tidak berubah (Artikel tidak jadi ikon baru di situ)
- [x] Refresh langsung di `/artikel` maupun `/artikel/<slug>` (deep link) tetap menampilkan halaman yang benar (mekanisme `404.html`/`index.html` yang sudah ada menangani ini tanpa perubahan tambahan) — diverifikasi manual di browser
- [x] Tidak ada perubahan skema pada `SB_DATA`/`sourceData.js`
- [x] Unit test `deriveArticles`: parsing frontmatter lengkap; artikel tanpa `cover`; slug diturunkan benar dari nama file; urutan hasil terbaru-dulu; badan Markdown (termasuk gambar) berhasil diubah jadi `bodyHtml`
- [x] Render test (`renderToStaticMarkup`, pola `SchedulePage.test.jsx`) untuk halaman listing (kosong → empty state; terisi → daftar) dan halaman detail (judul/penulis/tanggal/isi muncul; slug tidak ditemukan → tidak crash)
- [x] Test suite yang sudah ada (`SchedulePage.test.jsx`, `deriveSiteData.test.js`, `sourceData.test.js`, `prayerTimeCalculator.test.js`) tetap lulus tanpa modifikasi
