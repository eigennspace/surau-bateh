# 01 — Statistik Beranda via Sanity

**What to build:** Pengurus bisa menambah, mengubah, menghapus, atau mengurutkan ulang item Statistik Beranda (ikon, nilai, label, dan penanda "tampil di Hero") lewat Sanity Studio, dan perubahan itu tampil di `StatsSection` setelah rebuild otomatis — menggantikan `SB_DATA.stats` yang hand-edited sekarang. Tiket ini juga meletakkan fondasi yang diperluas tiket 02/03: dokumen singleton `beranda` (didaftarkan lewat mekanisme singleton generik yang sudah ada di `sanity.config.ts`), fungsi resolve `resolveBeranda`, dan wiring `fetch-sanity-content.mjs`/`App.jsx` ke singleton itu.

**Blocked by:** None — bisa mulai langsung.

**Status:** done — sudah terimplementasi & tergabung di main (lihat riwayat git); label ready-for-agent sebelumnya usang

- [x] Schema type `beranda` didefinisikan di `studio/schemaTypes/`, didaftarkan sebagai singleton (`_id: 'beranda'`) lewat entri baru di daftar singleton generik `sanity.config.ts` — tidak perlu menyentuh ulang struktur/filter singleton, cukup tambah satu entri.
- [x] Helper daftar icon terkurasi dibuat (dipakai ulang oleh field `icon` di tiket ini maupun tiket 02/03) — `options.list` tertutup, bukan teks bebas, seed awal dari icon yang sudah dipakai kode sekarang (`mic`, `swords`, `users`, `calendar-days`, `heart-handshake`, `map-pin`).
- [x] Field `stats` (array of object) ditambahkan ke schema `beranda`: `icon` (string, required, curated `options.list`), `value` (string, required — tetap teks bebas, bukan number, karena ada nilai seperti "Tiap pekan"), `label` (string, required), `showInHero` (boolean, `initialValue: false`) — array boleh kosong.
- [x] Fungsi murni `resolveBeranda(urlFor, doc)` ditambahkan ke `resolveSanityContent.js`: untuk tiket ini cukup mengembalikan `{stats: [...]}` (field `hero`/`programs` menyusul di tiket 02/03, tapi fungsi sudah dibentuk untuk gampang diperluas — bukan ditulis ulang tiap tiket); `stats` selalu array (fallback `[]`), `null` bila dokumen belum pernah di-publish.
- [x] Ditest dengan fixture GROQ-shaped (pola `resolveProgram`/`resolveContact`/`resolveSalik` di `resolveSanityContent.test.js`): array kosong/`undefined` tidak error, `showInHero` diteruskan apa adanya (`true`/`false`/`undefined` → `false`), dokumen `null`/`undefined` → `null`.
- [x] `fetch-sanity-content.mjs` diperluas fetch dokumen `beranda` (`*[_type == "beranda"][0]{stats}`, pola `[0]` sama seperti singleton lain), memanggil `resolveBeranda`, menambah key `beranda` ke `sanityContent.json`, plus warning bila dokumen belum pernah di-publish (pola warning singleton lain yang sudah ada).
- [x] `App.jsx` menggabungkan `stats: sanityContent.beranda?.stats` ke `rawData` sebelum `deriveSiteData` dipanggil; `deriveSiteData.js` meneruskan `stats: rawData.stats` apa adanya (tidak berubah dari sekarang).
- [x] `StatsSection.jsx` tidak berubah struktur — tetap mengonsumsi `site.stats` (`icon`/`value`/`label`) apa adanya; field `showInHero` diabaikan komponen ini.
- [x] Skrip migrasi satu-kali (`scripts/migrate-beranda-to-sanity.mjs`, `--dry-run` dulu lalu `--write`, pola skrip migrasi fase-fase sebelumnya) membaca `SB_DATA.stats` dan upload sebagai (bagian dari) satu dokumen `_id: 'beranda'` ke dataset `production` — item berlabel "Jamaah rutin" ditandai `showInHero: true`.
- [x] Diverifikasi di dev server: `StatsSection` di Beranda tampil identik seperti sebelum migrasi.
- [x] Diverifikasi end-to-end di produksi: publish di Studio memicu webhook → rebuild otomatis, log build mengonfirmasi konten ditarik segar dari dataset produksi.
- [x] `npm test`/`npm run build` lulus penuh.
