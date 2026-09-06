# 05 — Cutover: hapus narasi/galeri/kontak/salik lama dari `sourceData.js`

**What to build:** Setelah keenam Halaman Program, `/kontak`, dan `/profil-salik` terverifikasi jalan penuh dari Sanity di produksi, key-key lamanya dihapus sepenuhnya dari kode — tidak ada fallback mati atau dua sumber kebenaran yang tumpang tindih, konsisten dengan disiplin "satu sumber kebenaran" yang didokumentasikan di `CONTEXT.md` dan pola cutover fase-fase sebelumnya (`.scratch/jadwal-pengumuman-via-sanity/issues/03-cutover-hapus-events-news-lama.md`).

**Blocked by:** 02 (Narasi + galeri + kontak Halaman Program via Sanity), 03 (Kontak umum via Sanity), 04 (Profil Salik via Sanity) — ketiganya harus sudah live dan terverifikasi di produksi sebelum jalur lamanya dihapus.

**Status:** ready-for-agent

- [ ] Field `khitanan`, `dauroh`, `tawajjuh`, `konseling`, `baktiSosial`, `silaturahmi`, `contact`, `salik` dihapus dari `SB_DATA` di `sourceData.js`.
- [ ] Import foto lokal yang cuma dipakai field-field di atas (di `design-system/assets/photos/...`) dihapus bila tidak ada pemakaian lain.
- [ ] Skrip-skrip migrasi satu-kali yang dipakai tiket 02/03/04 dihapus — sudah dipakai & dibuktikan, tidak bisa lagi jalan begitu field sumbernya dihapus dari `sourceData.js`.
- [ ] Test yang mereferensikan field-field di atas langsung dari `sourceData.js` (bukan dari `deriveSiteData`/`resolveSanityContent`) diperiksa dan diperbarui bila perlu — perilaku yang ditest (rendering Halaman Program, `/kontak`, `/profil-salik`) tidak berubah.
- [ ] `CONTEXT.md` diperbarui: entri "Sumber Data" mencatat narrative+galeri Halaman Program, kontak, dan `salik` sudah pindah ke Sanity (field lama dihapus); entri "Dataset Sanity" menambah delapan tipe dokumen baru ke daftar tipe dokumen yang disebutkan.
- [ ] `npm test`/`npm run build` lulus penuh tanpa modifikasi ekspektasi yang melemahkan cakupan.
