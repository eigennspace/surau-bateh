# 03 — Cutover: hapus `events`/`news` lama dari `sourceData.js`

**What to build:** Setelah `events` dan `news` terverifikasi jalan penuh dari Sanity di produksi, field lamanya dihapus sepenuhnya dari kode — tidak ada fallback mati atau dua sumber kebenaran yang tumpang tindih, konsisten dengan disiplin "satu sumber kebenaran" yang didokumentasikan di `CONTEXT.md` dan pola cutover Fase 1 (`.scratch/cms-migration-sanity/issues/06-cutover-hapus-pipeline-lama.md`).

**Blocked by:** 01 (Jadwal Kegiatan via Sanity), 02 (Pengumuman via Sanity) — keduanya harus sudah live dan terverifikasi di produksi sebelum jalur lamanya dihapus.

**Status:** done — sudah terimplementasi & tergabung di main (lihat riwayat git); label ready-for-agent sebelumnya usang

- [x] Field `events` (8 entri) dan `news` (1 entri) dihapus dari `sourceData.js`.
- [x] Skrip migrasi satu-kali (`migrate-events-news-to-sanity.mjs` atau namanya yang dipakai di tiket 01/02) dihapus — sudah dipakai & dibuktikan, tidak bisa lagi jalan begitu field sumbernya dihapus dari `sourceData.js`.
- [x] Test yang mereferensikan `events`/`news` langsung dari `sourceData.js` (bukan dari `deriveSiteData`/`resolveSanityContent`) diperiksa dan diperbarui bila perlu — perilaku yang ditest (rendering Jadwal Kegiatan, filter Halaman Program, panel Agenda) tidak berubah.
- [x] `CONTEXT.md`/ADR 0013 diperiksa ulang — tidak ada referensi yang jadi tidak akurat soal `events`/`news` masih hand-edited.
- [x] `npm test`/`npm run build` lulus penuh tanpa modifikasi ekspektasi yang melemahkan cakupan.
