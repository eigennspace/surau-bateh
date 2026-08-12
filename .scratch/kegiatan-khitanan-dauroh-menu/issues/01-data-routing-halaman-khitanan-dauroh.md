# 01 — Data, routing, dan halaman Khitanan & Dauroh (fondasi)

**What to build:** `/khitanan` dan `/dauroh` bisa diakses langsung lewat URL (belum ada link dari menu manapun di situs — itu ticket 02/03/04). Masing-masing halaman menampilkan: narasi penjelasan program, kartu kontak person dengan tombol WhatsApp langsung, dan blok jadwal yang menampilkan event dari Sumber Data yang berkategori sesuai — atau pesan "Kegiatan akan segera hadir" kalau belum ada event kategori itu. Deep-link/refresh langsung ke kedua URL berfungsi (tidak jatuh ke Beranda), dan navigasi back/forward browser tetap sinkron.

**Blocked by:** None — bisa mulai sekarang

- [ ] `sourceData.js` (Sumber Data) punya entri kontak baru: Khitanan → Angku Bosa, `081374720759`; Dauroh → Muhammad Galang, `082171136418` — bentuk field mengikuti pola `contact.pengurus[]` yang sudah ada (`{ name, role, phone }`).
- [ ] `sourceData.js` punya field narasi teks untuk Khitanan dan Dauroh (judul + paragraf penjelasan program), diisi draft berdasarkan konteks kajian yang sudah ada di situs — bukan hardcode di komponen halaman.
- [ ] Kategori event `'Daurah'` yang sudah ada di `SB_DATA.events` (entri "Daurah Aswaja", 13 Agustus 2026) diselaraskan ejaannya jadi `'Dauroh'` (atau filter menerima kedua ejaan) — halaman `/dauroh` baru harus benar-benar menampilkan event ini.
- [ ] Routing (`App.jsx`): `PAGE_SLUGS`/`SLUG_PAGES`/`pathForPage`/`routeFromPath` diperluas dengan slug flat satu-level baru: `Khitanan → 'khitanan'`, `Dauroh → 'dauroh'`. Slug `Kajian → 'kajian'` tidak berubah.
- [ ] Halaman baru `KhitananPage` dan `DaurohPage` dirender saat `page === 'Khitanan'`/`'Dauroh'`, masing-masing menampilkan narasi, kartu kontak (reuse `ContactCard`/`openWhatsApp`), dan blok jadwal terfilter kategori `Khitanan`/`Dauroh` dari `site.events` (mengikuti pola tampilan `AgendaSection`/`EventItem`).
- [ ] Blok jadwal menampilkan pesan **"Kegiatan akan segera hadir"** ketika tidak ada event dengan kategori yang sesuai.
- [ ] Membuka `/khitanan` atau `/dauroh` langsung lewat URL (refresh/deep-link) menampilkan halaman yang benar, bukan Beranda.
- [ ] Halaman `/kajian` yang sudah ada tidak berubah konten/layout-nya.
- [ ] Test page-render (`renderToStaticMarkup` + fixture `deriveSiteData`, pola `SchedulePage.test.jsx`) untuk `KhitananPage`/`DaurohPage`: narasi muncul, kontak+nomor benar muncul, event kategori yang sesuai muncul, event kategori lain (mis. `Kajian`) tidak ikut bocor, fixture kosong → pesan "Kegiatan akan segera hadir" muncul.
- [ ] Test data-invariant (pola `sourceData.test.js`): kontak Khitanan/Dauroh ada & nomor telepon terisi; kategori event `Khitanan`/`Dauroh` konsisten penulisannya di `SB_DATA.events`.
- [ ] Test suite yang sudah ada (`SchedulePage.test.jsx`, `deriveSiteData.test.js`, `sourceData.test.js`, dll) tetap lulus tanpa modifikasi.
