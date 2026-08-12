# 03 — Scaffold build-time fetch + webhook auto-rebuild

**What to build:** Infrastruktur bersama yang akan dipakai oleh artikel (tiket 04) dan galeri (tiket 05): kemampuan `site/` untuk menarik data dari Sanity saat build, dan mekanisme supaya publish di Studio otomatis memicu rebuild+deploy situs — dibuktikan dengan satu dokumen contoh (bukan schema artikel/galeri asli, yang menyusul di tiket berikutnya).

**Blocked by:** 01 (butuh Project ID, dataset, dan token nyata dari Sanity + GitHub secrets sudah terpasang).

**Status:** ready-for-human (sisa satu langkah manual — lihat di bawah)

- [x] `@sanity/client` (+ `@sanity/image-url`, `@portabletext/react`) terpasang sebagai dependency `site/`.
- [x] Skrip fetch build-time dibuat (`scripts/fetch-sanity-content.mjs`), mengikuti pola `scripts/generate-prayer-times.mjs` — jalan sebelum `vite build` (`predev`/`build` di `package.json` diperluas), membaca `SANITY_PROJECT_ID`/`SANITY_DATASET`/`SANITY_API_TOKEN` dari environment variable (parser `.env` kecil ditulis tangan, skrip jalan lewat `node` biasa bukan Vite).
- [x] `.env.example` didokumentasikan untuk tiga env var itu; `.env` sungguhan di-gitignore (`site/.gitignore`).
- [x] Fetch dicoba jalan lokal terhadap dataset `production` yang benar-benar ada — berhasil saat dataset masih kosong (0 dokumen, build tidak error) dan setelah tiket 04/05 mengisi dataset (3 artikel + 13 galeri, diverifikasi render di browser lewat preview, gambar termuat dari `cdn.sanity.io`).
- [x] `deploy.yml` diperluas menerima trigger `repository_dispatch` (`event_type: sanity-publish`) selain `push`/`workflow_dispatch` — job yang sama persis (test → build → deploy) tetap jalan, plus secrets `SANITY_PROJECT_ID`/`SANITY_DATASET`/`SANITY_API_TOKEN` diteruskan ke step Build.
- [x] Sanity Studio di-deploy ke `https://surau-bateh.sanity.studio/` (`sanity deploy`, `studioHost: surau-bateh` + `appId` dicatat di `sanity.cli.ts`).
- [ ] **Manual, butuh maintainer** — konfigurasi webhook Sanity (manage.sanity.io → project → API → Webhooks) tidak bisa diselesaikan agent: webhook butuh personal access token GitHub (dari tiket 01) ditempel di field dashboard Sanity, dan memasukkan token/credential ke form pihak ketiga adalah tindakan yang harus dilakukan pengguna sendiri, bukan agent. Langkah-langkah untuk maintainer:
  1. Buka https://www.sanity.io/manage/project/w5hrk5sv/api/webhooks → **Create webhook**.
  2. **Name**: `github-rebuild-deploy`. **URL**: `https://api.github.com/repos/eigennspace/surau-bateh/dispatches`. **Dataset**: `production`. **Trigger on**: Create, Update, Delete. **Filter** (GROQ, opsional tapi disarankan supaya webhook hanya bereaksi ke tipe yang relevan): `_type in ["article", "galleryItem"]`.
  3. **HTTP method**: `POST`. **HTTP Headers**: `Authorization: Bearer <personal access token GitHub scope repo dari tiket 01>`, `Accept: application/vnd.github+json`, `Content-Type: application/json`.
  4. **Payload**: aktifkan "Custom payload" dan isi persis `{"event_type": "sanity-publish"}` (nilai `event_type` ini harus cocok dengan `types: [sanity-publish]` di `.github/workflows/deploy.yml`).
  5. Save, lalu uji: edit salah satu artikel/galeri hasil migrasi di Studio → Publish → cek tab **Attempts** di halaman webhook (harus 200) → cek run baru muncul di https://github.com/eigennspace/surau-bateh/actions.
- [ ] Setelah webhook terbukti jalan, centang baris ini dan ubah Status jadi `done`.

## Comments

- Schema asli (`article`/`galleryItem`, lihat tiket 04/05) dipakai langsung sebagai "dokumen uji" pembuktian end-to-end (bukan tipe dummy terpisah) — datanya sudah nyata (hasil migrasi), jadi tidak perlu dihapus lagi setelah dibuktikan.
- Migrasi konten (tiket 04/05) sudah dijalankan `--write` ke dataset produksi dan diverifikasi render di situs (dev server) — lihat komentar di tiket 04/05.
