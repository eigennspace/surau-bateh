# 03 — Scaffold build-time fetch + webhook auto-rebuild

**What to build:** Infrastruktur bersama yang akan dipakai oleh artikel (tiket 04) dan galeri (tiket 05): kemampuan `site/` untuk menarik data dari Sanity saat build, dan mekanisme supaya publish di Studio otomatis memicu rebuild+deploy situs — dibuktikan dengan satu dokumen contoh (bukan schema artikel/galeri asli, yang menyusul di tiket berikutnya).

**Blocked by:** 01 (butuh Project ID, dataset, dan token nyata dari Sanity + GitHub secrets sudah terpasang).

**Status:** done

- [x] `@sanity/client` (+ `@sanity/image-url`, `@portabletext/react`) terpasang sebagai dependency `site/`.
- [x] Skrip fetch build-time dibuat (`scripts/fetch-sanity-content.mjs`), mengikuti pola `scripts/generate-prayer-times.mjs` — jalan sebelum `vite build` (`predev`/`build` di `package.json` diperluas), membaca `SANITY_PROJECT_ID`/`SANITY_DATASET`/`SANITY_API_TOKEN` dari environment variable (parser `.env` kecil ditulis tangan, skrip jalan lewat `node` biasa bukan Vite).
- [x] `.env.example` didokumentasikan untuk tiga env var itu; `.env` sungguhan di-gitignore (`site/.gitignore`).
- [x] Fetch dicoba jalan lokal terhadap dataset `production` yang benar-benar ada — berhasil saat dataset masih kosong (0 dokumen, build tidak error) dan setelah tiket 04/05 mengisi dataset (3 artikel + 13 galeri, diverifikasi render di browser lewat preview, gambar termuat dari `cdn.sanity.io`).
- [x] `deploy.yml` diperluas menerima trigger `repository_dispatch` (`event_type: sanity-publish`) selain `push`/`workflow_dispatch` — job yang sama persis (test → build → deploy) tetap jalan, plus secrets `SANITY_PROJECT_ID`/`SANITY_DATASET`/`SANITY_API_TOKEN` diteruskan ke step Build.
- [x] Sanity Studio di-deploy ke `https://surau-bateh.sanity.studio/` (`sanity deploy`, `studioHost: surau-bateh` + `appId` dicatat di `sanity.cli.ts`).
- [x] **Webhook Sanity → GitHub dikonfigurasi oleh maintainer** (`github-rebuild-deploy`, `https://api.github.com/repos/eigennspace/surau-bateh/dispatches`, dataset `production`, status Enabled — dikonfirmasi lewat screenshot dashboard Sanity).
- [x] **Dibuktikan end-to-end di produksi**: PR #5 (branch ini) di-merge ke `main` oleh maintainer → GitHub Actions run push sukses (`31566850949`) → maintainer publish dokumen di Studio → webhook terpicu → GitHub Actions run baru dengan trigger `repository_dispatch`/`sanity-publish` muncul (`31566936516`, ✓ build 22s, ✓ deploy 10s) → log build mengonfirmasi `fetch-sanity-content: 3 artikel, 13 foto galeri ditulis ke src/generated/sanityContent.json` — data ditarik segar dari dataset produksi saat rebuild otomatis. https://github.com/eigennspace/surau-bateh/actions/runs/31566936516

## Comments

- Schema asli (`article`/`galleryItem`, lihat tiket 04/05) dipakai langsung sebagai "dokumen uji" pembuktian end-to-end (bukan tipe dummy terpisah) — datanya sudah nyata (hasil migrasi), jadi tidak perlu dihapus lagi setelah dibuktikan.
- Migrasi konten (tiket 04/05) sudah dijalankan `--write` ke dataset produksi dan diverifikasi render di situs (dev server) — lihat komentar di tiket 04/05.
- Catatan penting yang sempat menunda pembuktian ini: trigger `repository_dispatch` di `deploy.yml` hanya dibaca GitHub dari berkas workflow di branch **default** (`main`) — walau webhook sudah aktif, publish di Studio tidak akan memicu run apa pun sebelum PR yang menambah trigger ini di-merge ke `main`. Setelah PR #5 merge, webhook langsung terbukti jalan pada percobaan pertama.
