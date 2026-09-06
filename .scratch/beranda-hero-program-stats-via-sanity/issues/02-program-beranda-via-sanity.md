# 02 — Program Beranda (kartu ringkas) via Sanity

**What to build:** Pengurus bisa menambah, mengubah, menghapus, atau mengurutkan ulang kartu Program Beranda (ikon, judul, deskripsi, jadwal singkat) lewat Sanity Studio, dan perubahan itu tampil di `ProgramsSection` Beranda setelah rebuild otomatis — menggantikan `SB_DATA.programs` yang hand-edited sekarang (termasuk mengaktifkan kembali program yang sekarang nonaktif/dikomentari di kode, tanpa menyentuh kode).

**Blocked by:** 01 (Statistik Beranda via Sanity) — butuh fondasi schema `beranda`, `resolveBeranda`, dan helper icon terkurasi yang dibuat di sana untuk diperluas. Bisa paralel dengan tiket 03.

**Status:** done — sudah terimplementasi & tergabung di main (lihat riwayat git); label ready-for-agent sebelumnya usang

- [x] Field `programs` (array of object) ditambahkan ke schema `beranda`: `icon` (string, required, curated `options.list` yang sama dengan tiket 01), `title` (string, required), `desc` (string, required), `meta` (string, required) — array boleh kosong, urutan array = urutan tampil (drag-reorder bawaan Studio).
- [x] `resolveBeranda(urlFor, doc)` diperluas mengembalikan juga `programs: [...]` (selain `stats` dari tiket 01) — `programs` selalu array (fallback `[]`).
- [x] Test baru ditambahkan ke `resolveSanityContent.test.js` untuk bagian `programs`: array kosong/`undefined` tidak error, field diteruskan apa adanya.
- [x] `fetch-sanity-content.mjs`: query dokumen `beranda` diperluas menyertakan `programs` (`*[_type == "beranda"][0]{stats, programs}`).
- [x] `App.jsx` menggabungkan `programs: sanityContent.beranda?.programs` ke `rawData`; `deriveSiteData.js` meneruskan `programs: rawData.programs` apa adanya (tidak berubah dari sekarang).
- [x] `ProgramsSection.jsx` tidak berubah struktur — tetap mengonsumsi `site.programs` (`icon`/`title`/`desc`/`meta`) apa adanya.
- [x] Skrip migrasi satu-kali (dari tiket 01, `scripts/migrate-beranda-to-sanity.mjs`) diperluas membaca `SB_DATA.programs` dan menulis field `programs` ke dokumen `_id: 'beranda'` yang sama.
- [x] Diverifikasi di dev server: `ProgramsSection` di Beranda tampil identik seperti sebelum migrasi.
- [x] Diverifikasi end-to-end di produksi: publish di Studio memicu webhook → rebuild otomatis, log build mengonfirmasi konten ditarik segar dari dataset produksi.
- [x] `npm test`/`npm run build` lulus penuh.
