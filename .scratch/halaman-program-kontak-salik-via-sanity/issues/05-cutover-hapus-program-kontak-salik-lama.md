# 05 — Cutover: hapus narasi/galeri/kontak/salik lama dari `sourceData.js`

**What to build:** Setelah keenam Halaman Program, `/kontak`, dan `/profil-salik` terverifikasi jalan penuh dari Sanity di produksi, key-key lamanya dihapus sepenuhnya dari kode — tidak ada fallback mati atau dua sumber kebenaran yang tumpang tindih, konsisten dengan disiplin "satu sumber kebenaran" yang didokumentasikan di `CONTEXT.md` dan pola cutover fase-fase sebelumnya (`.scratch/jadwal-pengumuman-via-sanity/issues/03-cutover-hapus-events-news-lama.md`).

**Blocked by:** 02 (Narasi + galeri + kontak Halaman Program via Sanity), 03 (Kontak umum via Sanity), 04 (Profil Salik via Sanity) — ketiganya harus sudah live dan terverifikasi di produksi sebelum jalur lamanya dihapus.

**Status:** done — sudah terimplementasi & tergabung di main (lihat riwayat git); label ready-for-agent sebelumnya usang

- [x] Field `khitanan`, `dauroh`, `tawajjuh`, `konseling`, `baktiSosial`, `silaturahmi`, `contact`, `salik` dihapus dari `SB_DATA` di `sourceData.js`.
- [x] Import foto lokal yang cuma dipakai field-field di atas (di `design-system/assets/photos/...`) dihapus bila tidak ada pemakaian lain.
- [x] Skrip-skrip migrasi satu-kali yang dipakai tiket 02/03/04 dihapus — sudah dipakai & dibuktikan, tidak bisa lagi jalan begitu field sumbernya dihapus dari `sourceData.js`.
- [x] Test yang mereferensikan field-field di atas langsung dari `sourceData.js` (bukan dari `deriveSiteData`/`resolveSanityContent`) diperiksa dan diperbarui bila perlu — perilaku yang ditest (rendering Halaman Program, `/kontak`, `/profil-salik`) tidak berubah.
- [x] `CONTEXT.md` diperbarui: entri "Sumber Data" mencatat narrative+galeri Halaman Program, kontak, dan `salik` sudah pindah ke Sanity (field lama dihapus); entri "Dataset Sanity" menambah delapan tipe dokumen baru ke daftar tipe dokumen yang disebutkan.
- [x] `npm test`/`npm run build` lulus penuh tanpa modifikasi ekspektasi yang melemahkan cakupan.
