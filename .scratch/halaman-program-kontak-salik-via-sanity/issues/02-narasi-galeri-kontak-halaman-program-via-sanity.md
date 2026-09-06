# 02 — Narasi + galeri + kontak person 6 Halaman Program via Sanity

**What to build:** Pengurus bisa mengubah narasi, galeri dokumentasi, dan kontak person (nama/peran/telepon) keenam Halaman Program (`khitanan`, `dauroh`, `tawajjuh`, `konseling`, `baktiSosial`, `silaturahmi`) lewat Sanity Studio, dan perubahan itu tampil di halaman masing-masing setelah rebuild otomatis — menggantikan `SB_DATA.khitanan`/`.dauroh`/dst. dan `SB_DATA.contact.khitanan`/`.dauroh`/dst. yang hand-edited sekarang. Kontak person digabung ke dalam dokumen programnya sendiri (bukan objek `contact` terpisah ber-key-per-program), sesuai ADR [0013](../../../docs/adr/0013-seluruh-konten-sumber-data-migrasi-ke-sanity.md).

**Blocked by:** 01 (Generalisasi mekanisme singleton Studio) — bisa paralel dengan tiket 03/04.

**Status:** done — sudah terimplementasi & tergabung di main (lihat riwayat git); label ready-for-agent sebelumnya usang

- [x] Helper field bersama `programFields.ts` dibuat di `studio/schemaTypes/lib/` (pola `eventFields.ts`): `title` (string, required), `narrative` (text, required), `person` (object `{name, role, phone}`, ketiganya required), `gallery` (array objek inline `{image (type image, hotspot: true, required), alt (string, required), caption (string, required), meta (string, opsional)}`, opsional/boleh kosong, TANPA field `ratio`).
- [x] Enam schema type didefinisikan (`khitanan.ts`, `dauroh.ts`, `tawajjuh.ts`, `konseling.ts`, `baktiSosial.ts`, `silaturahmi.ts`), masing-masing pakai `programFields.ts`, didaftarkan sebagai singleton (`_id` sama persis dengan nama type) lewat mekanisme singleton dari tiket 01.
- [x] Fungsi murni `resolveProgram(doc)` ditambahkan ke `resolveSanityContent.js`: mengembalikan `{title, narrative, gallery, person}` dalam bentuk yang sudah dikonsumsi `ProgramSection.jsx` sekarang (galeri di-resolve pakai logika hotspot→object-position yang sama dengan `resolveGallery`, `ratio` TIDAK ada di output — tetap hardcode `1 / 1` di komponen).
- [x] Ditest dengan fixture GROQ-shaped (pola `resolveArticles`/`resolveGallery`/`resolveEvents` di `resolveSanityContent.test.js`): galeri terisi maupun kosong tidak error, `person` diteruskan apa adanya, markup `**bold**`/`*italic*` di `narrative` diteruskan mentah (tidak diparse di layer resolve).
- [x] `fetch-sanity-content.mjs` diperluas fetch keenam dokumen (`*[_type == "khitanan"][0]{...}` dst., pola singleton `[0]` sama seperti query `profilSurau`), memanggil `resolveProgram` untuk tiap satu, menambah enam key ke `sanityContent.json`.
- [x] `App.jsx` menggabungkan `khitanan: sanityContent.khitanan` dst. (enam key) ke `rawData` sebelum `deriveSiteData` dipanggil, persis pola `gallery`/`profilSurau.video` yang sudah ada — `ProgramSection.jsx` dan keenam halaman page tidak diubah.
- [x] Skrip migrasi satu-kali (`--dry-run` dulu, lalu `--write`) membaca `SB_DATA.khitanan/.dauroh/.tawajjuh/.konseling/.baktiSosial/.silaturahmi` + kontak person yang sesuai dari `SB_DATA.contact.<program>` lama, mengunggah foto lokal sebagai asset Sanity (`client.assets.upload`, pola skrip migrasi galeri Fase 1), dan upload sebagai enam dokumen dengan `_id` tetap ke dataset `production`.
- [x] Diverifikasi di dev server: keenam Halaman Program tampil identik seperti sebelum migrasi (narasi, galeri termasuk yang kosong, kartu kontak person dengan tombol WhatsApp).
- [x] Diverifikasi end-to-end di produksi: publish di Studio memicu webhook → rebuild otomatis, log build mengonfirmasi konten ditarik segar dari dataset produksi.
- [x] `npm test`/`npm run build` lulus penuh.
