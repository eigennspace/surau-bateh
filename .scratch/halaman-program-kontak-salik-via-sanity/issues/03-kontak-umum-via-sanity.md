# 03 — Kontak umum (`/kontak`) via Sanity

**What to build:** Pengurus bisa mengubah alamat, link Google Maps, dan daftar pengurus umum lewat Sanity Studio, dan perubahan itu tampil di halaman `/kontak` setelah rebuild otomatis — menggantikan `SB_DATA.contact.address`/`.maps`/`.pengurus` yang hand-edited sekarang. Ini terpisah dari kontak person per-program (tiket 02): `pengurus` di sini adalah daftar pengurus umum surau yang tampil di halaman `/kontak` sendiri.

**Blocked by:** 01 (Generalisasi mekanisme singleton Studio) — bisa paralel dengan tiket 02/04.

**Status:** done — sudah terimplementasi & tergabung di main (lihat riwayat git); label ready-for-agent sebelumnya usang

- [x] Schema type `contact` didefinisikan di `studio/schemaTypes/`: `address` (string/text, required), `mapsUrl` (url, required), `pengurus` (array objek `{name, role, phone}`, minimal 1 item) — didaftarkan sebagai singleton `_id: 'contact'` lewat mekanisme singleton dari tiket 01.
- [x] Fungsi murni `resolveContact(doc)` ditambahkan ke `resolveSanityContent.js`: mengembalikan `{address, maps, pengurus}` — nama field output (`maps`, bukan `mapsUrl`) mengikuti nama yang sudah dipakai `ContactPage.jsx` sekarang.
- [x] Ditest dengan fixture GROQ-shaped (pola yang sama dengan fungsi resolve lain di modul ini): `pengurus` dikembalikan sebagai array (termasuk kasus 1 item), `address`/`maps` diteruskan benar.
- [x] `fetch-sanity-content.mjs` diperluas fetch dokumen `contact` (`*[_type == "contact"][0]{...}`), memanggil `resolveContact`, menambah key `contact` ke `sanityContent.json`.
- [x] `App.jsx` menggabungkan `contact: sanityContent.contact` ke `rawData` sebelum `deriveSiteData` dipanggil — `ContactPage.jsx` tidak diubah.
- [x] Skrip migrasi satu-kali (`--dry-run` dulu, lalu `--write`) membaca `SB_DATA.contact.address`/`.maps`/`.pengurus` dan upload sebagai satu dokumen `_id: 'contact'` ke dataset `production`.
- [x] Diverifikasi di dev server: halaman `/kontak` tampil identik seperti sebelum migrasi (alamat, link maps, kartu-kartu pengurus).
- [x] Diverifikasi end-to-end di produksi: publish di Studio memicu webhook → rebuild otomatis, log build mengonfirmasi konten ditarik segar dari dataset produksi.
- [x] `npm test`/`npm run build` lulus penuh.
