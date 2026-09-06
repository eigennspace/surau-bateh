# 04 — Cutover: hapus `programs`/`stats`/teks Hero lama dari `sourceData.js`/`Hero.jsx`

**What to build:** Setelah Statistik, Program Beranda, dan Hero Beranda terverifikasi jalan penuh dari Sanity di produksi, key/teks lamanya dihapus sepenuhnya dari kode — tidak ada fallback mati atau dua sumber kebenaran yang tumpang tindih, konsisten dengan disiplin "satu sumber kebenaran" yang didokumentasikan di `CONTEXT.md` dan pola cutover fase-fase sebelumnya (`.scratch/halaman-program-kontak-salik-via-sanity/issues/05-cutover-hapus-program-kontak-salik-lama.md`).

**Blocked by:** 02 (Program Beranda via Sanity), 03 (Hero Beranda via Sanity) — keduanya (beserta 01 secara transitif) harus sudah live dan terverifikasi di produksi sebelum jalur lamanya dihapus.

**Status:** ready-for-agent

- [ ] Field `programs` dan `stats` dihapus dari `SB_DATA` di `sourceData.js`.
- [ ] Import `foto-surau.jpg` di `Hero.jsx` dihapus (bila belum dihapus di tiket 03); file asetnya boleh tetap ada di `design-system/assets/` (masih dipakai sebagai referensi desain), tidak wajib dihapus dari repo.
- [ ] Skrip migrasi satu-kali `scripts/migrate-beranda-to-sanity.mjs` (dipakai tiket 01/02/03) dihapus — sudah dipakai & dibuktikan, tidak bisa lagi jalan begitu field sumbernya dihapus dari `sourceData.js`.
- [ ] Test yang mereferensikan `SB_DATA.programs`/`.stats` langsung dari `sourceData.js` (bukan dari `deriveSiteData`/`resolveSanityContent`) diperiksa dan diperbarui bila perlu — perilaku yang ditest (rendering Hero/`ProgramsSection`/`StatsSection`) tidak berubah.
- [ ] `CONTEXT.md` diperbarui: entri "Sumber Data" mencatat Hero/`programs`/`stats` Beranda sudah pindah ke Sanity (field lama dihapus); entri "Dataset Sanity" menambah tipe dokumen `beranda` ke daftar tipe dokumen yang disebutkan.
- [ ] `npm test`/`npm run build` lulus penuh tanpa modifikasi ekspektasi yang melemahkan cakupan.
