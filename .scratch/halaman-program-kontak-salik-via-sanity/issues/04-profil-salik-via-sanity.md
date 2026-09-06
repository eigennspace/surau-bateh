# 04 — Profil Salik via Sanity

**What to build:** Pengurus bisa mengubah narasi, daftar karakter (bullets), paragraf penutup, dan galeri halaman `/profil-salik` lewat Sanity Studio, dan perubahan itu tampil setelah rebuild otomatis — menggantikan `SB_DATA.salik` yang hand-edited sekarang.

**Blocked by:** 01 (Generalisasi mekanisme singleton Studio) — bisa paralel dengan tiket 02/03.

**Status:** done — sudah terimplementasi & tergabung di main (lihat riwayat git); label ready-for-agent sebelumnya usang

- [x] Schema type `salik` didefinisikan di `studio/schemaTypes/`: `title` (string, required), `narrative` (text, required, format sama dengan narasi Halaman Program), `bullets` (array of string, required, minimal 1 item, tiap item boleh pakai markup `**bold**`), `closing` (text, required), `gallery` (array objek inline, bentuk identik gallery Halaman Program — `{image, alt, caption, meta}`, opsional) — didaftarkan sebagai singleton `_id: 'salik'` lewat mekanisme singleton dari tiket 01.
- [x] Fungsi murni `resolveSalik(doc)` ditambahkan ke `resolveSanityContent.js`: mengembalikan `{title, narrative, bullets, closing, gallery}` dalam bentuk yang sudah dikonsumsi `ProfilSalikPage.jsx`/`ProgramSection.jsx` sekarang.
- [x] Ditest dengan fixture GROQ-shaped (pola yang sama dengan fungsi resolve lain di modul ini): `bullets` dikembalikan sebagai array string, `closing` diteruskan apa adanya, galeri kosong tidak error, markup `**bold**` di `bullets`/`closing`/`narrative` diteruskan mentah (tidak diparse di layer resolve).
- [x] `fetch-sanity-content.mjs` diperluas fetch dokumen `salik` (`*[_type == "salik"][0]{...}`), memanggil `resolveSalik`, menambah key `salik` ke `sanityContent.json`.
- [x] `App.jsx` menggabungkan `salik: sanityContent.salik` ke `rawData` sebelum `deriveSiteData` dipanggil — `ProfilSalikPage.jsx` tidak diubah.
- [x] Skrip migrasi satu-kali (`--dry-run` dulu, lalu `--write`) membaca `SB_DATA.salik` (termasuk mengunggah foto flyer lokal sebagai asset Sanity) dan upload sebagai satu dokumen `_id: 'salik'` ke dataset `production`.
- [x] Diverifikasi di dev server: halaman `/profil-salik` tampil identik seperti sebelum migrasi (narasi, delapan bullet karakter, penutup, galeri).
- [x] Diverifikasi end-to-end di produksi: publish di Studio memicu webhook → rebuild otomatis, log build mengonfirmasi konten ditarik segar dari dataset produksi.
- [x] `npm test`/`npm run build` lulus penuh.
