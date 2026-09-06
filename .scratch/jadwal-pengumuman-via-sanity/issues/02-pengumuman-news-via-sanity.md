# 02 — Pengumuman (news) via Sanity

**What to build:** Pengurus bisa menambah/mengubah/menghapus pengumuman (tag, judul, tanggal, link, deskripsi) lewat Sanity Studio, dan pengumuman itu tampil di panel Agenda Beranda setelah rebuild otomatis.

**Blocked by:** None — bisa dikerjakan paralel dengan tiket 01, infrastruktur build-time fetch + webhook sudah ada dari Fase 1.

**Status:** done — sudah terimplementasi & tergabung di main (lihat riwayat git); label ready-for-agent sebelumnya usang

- [x] Schema `news` didefinisikan di Sanity Studio: `tag` (string), `title`, `date` (tipe date Sanity), `link` (url, opsional), `description` (text, opsional).
- [x] Fungsi murni `resolveNews(newsDocs)` ditambahkan ke `resolveSanityContent.js`: memformat `date` jadi string tanggal Indonesia (format sama seperti data lama, mis. "8 Agustus 2026"), meneruskan `tag`/`title`/`link`/`description` apa adanya, menangani `link`/`description` kosong dengan wajar.
- [x] Ditest dengan fixture GROQ-shaped, mengikuti pola `resolveArticles`/`resolveGallery` di `resolveSanityContent.test.js`.
- [x] `fetch-sanity-content.mjs` diperluas fetch `news`, memanggil `resolveNews`, menambah key `news` ke `sanityContent.json`.
- [x] `App.jsx` menggabungkan `news: sanityContent.news` ke `rawData` sebelum `deriveSiteData` dipanggil, persis pola `gallery` yang sudah ada.
- [x] Skrip migrasi satu-kali (`--dry-run` dulu, lalu `--write`) membaca 1 entri `news` di `sourceData.js` ("Pendataan Data Salik Surau Bateh"), upload sebagai dokumen `news` ke dataset `production`.
- [x] Diverifikasi di dev server: panel Agenda Beranda menampilkan pengumuman identik seperti sebelum migrasi (tag, judul, tanggal, link, deskripsi).
- [x] Diverifikasi end-to-end di produksi: publish di Studio memicu webhook → `repository_dispatch` → rebuild otomatis, log build mengonfirmasi pengumuman ditarik segar dari dataset produksi.
- [x] `npm test`/`npm run build` lulus penuh.
