# Migrasi Konten ke CMS (Sanity) — Fase 1: Galeri & Artikel

Status: done — semua tiket (01-06) selesai, dibuktikan end-to-end di produksi (lihat tiket 03).

## Problem Statement

Satu-satunya cara mengubah konten situs (`site/`) hari ini adalah mengedit `sourceData.js`/berkas Markdown artikel secara langsung sebagai teks, lalu build + deploy ulang lewat GitHub Actions (lihat `CONTEXT.md`, istilah "Sumber Data"). Pola ini didesain sengaja tanpa database/CMS/backend — dan itu bekerja baik untuk konten yang jarang berubah.

Tapi pengurus surau sekarang cukup sering minta update foto, artikel, dan jadwal-jadwal, dan setiap permintaan itu berarti maintainer situs (bukan pengurus sendiri) harus mengedit kode, menjalankan test, dan mendorong perubahan lewat git — sebuah bottleneck yang tidak skalabel untuk konten yang makin sering berubah. Pengurus tidak punya cara mandiri untuk memperbarui foto/artikel/jadwal tanpa melibatkan maintainer.

`CONTEXT.md` saat ini secara eksplisit mendokumentasikan "Sumber Data" dengan _Avoid: Database, CMS, backend_ sebagai keputusan arsitektur yang sudah ditetapkan (kemungkinan ada ADR di baliknya) — spec ini secara sadar membalik keputusan itu untuk sebagian konten, dan perlu diikuti pembaruan dokumentasi domain.

## Solution

Mengadopsi **Sanity** sebagai headless CMS untuk sebagian konten situs, dengan arsitektur **build-time fetch**: situs tetap 100% static export ke GitHub Pages (tidak ada dependency runtime ke Sanity untuk pengunjung), tapi konten ditarik dari dataset Sanity saat `vite build`, dan publish oleh pengurus di Sanity Studio memicu webhook → GitHub Actions (`repository_dispatch`) yang menjalankan rebuild + deploy otomatis.

Rollout dilakukan **bertahap per feature branch**, bukan big-bang. **Fase 1** (cakupan spec ini) memindahkan dua tipe konten yang paling sering diminta pengurus: **galeri foto** dan **artikel**. Tipe konten lain (`events`/agenda, `news`, `programs`, `contact`, `donation.campaign`, `stats`) menyusul di fase-fase berikutnya sebagai spec terpisah — lihat Further Notes.

**Yang TIDAK pindah ke CMS (tetap di `sourceData.js`/`location.js`, semua fase)**: `location`, `iqamahOffsets`, tiga pohon silsilah (`ilmuTauhid`/`ilmuFiqh`/`ilmuTasawuf`), `donation.qris`/`bank` — konten ini jarang berubah dan/atau berstruktur rekursif dalam yang tidak cocok jadi dokumen CMS generik; risiko salah-edit oleh pengurus non-teknis dianggap lebih besar daripada manfaat kemudahan editnya.

Keputusan lintas-fase yang berlaku untuk seluruh migrasi (bukan cuma fase 1):

- **Platform**: Sanity — free tier hosted, image CDN/pipeline bawaan, Studio yang ramah untuk editor non-teknis. Dipilih di atas Decap CMS (UX/image handling lebih kasar) dan Payload (butuh server yang harus dioperasikan sendiri).
- **Dataset**: satu dataset `production`, tanpa staging — proyek kecil, satu maintainer, sync overhead staging tidak sepadan.
- **Studio**: di-deploy terpisah ke `*.sanity.studio` lewat `sanity deploy`, tidak digabung ke build/deploy situs publik.
- **Akses**: semua pengurus aktif mendapat role **Editor** (create/edit/publish konten) sejak awal — publish langsung tanpa gerbang approval. Role **Administrator** (schema, project settings, token) hanya dipegang maintainer situs.
- **Field yang dikunci vs bebas**: field yang gagalnya visual/mem-breaking-kan layout (mis. `icon` di `programs`/`stats`, `ratio`/`position`/`span` di `gallery`) dikurasi lewat daftar pilihan tetap atau dilepas dari kendali pengurus; field editorial murni (judul, deskripsi, foto, tanggal, caption) bebas diedit tanpa batasan.
- **Cutover per tipe konten**: begitu satu tipe konten terverifikasi jalan end-to-end (Studio → webhook → rebuild → live), field lama untuk tipe itu di `sourceData.js` langsung **dihapus** — tidak dibiarkan sebagai fallback mati.
- **Dokumentasi domain**: ADR baru ditulis menggantikan keputusan "avoid CMS" yang ada di `CONTEXT.md`, plus istilah domain terkait diperbarui.

## User Stories

1. Sebagai pengurus surau, saya ingin login ke Sanity Studio dan mengunggah foto baru ke galeri (dengan crop/hotspot sendiri), sehingga foto tampil di situs tanpa saya perlu minta bantuan maintainer atau menyentuh kode.
2. Sebagai pengurus surau, saya ingin menulis artikel baru di Sanity Studio memakai editor rich-text (bold/link/gambar inline, tanpa syntax Markdown), sehingga saya bisa publish tulisan tanpa belajar sintaks apa pun.
3. Sebagai pengurus surau, saya ingin menekan tombol "Publish" di Studio dan melihat perubahan saya (foto/artikel) tayang di situs publik dalam beberapa menit, tanpa perlu menghubungi siapa pun untuk deploy manual.
4. Sebagai pengurus surau yang mengedit galeri, saya ingin field seperti rasio/posisi/lebar-kolom foto TIDAK bisa saya rusak secara tidak sengaja (baik karena field itu berupa pilihan tetap, atau memang bukan sesuatu yang saya kendalikan), sehingga saya bisa fokus mengunggah foto dan menulis caption tanpa takut merusak tata letak halaman.
5. Sebagai pengunjung situs, saya ingin galeri dan halaman artikel tetap tampil sama cepatnya seperti sekarang (situs tetap static export), meski kontennya sekarang berasal dari Sanity.
6. Sebagai pengunjung situs, saya ingin situs tetap bisa diakses secara normal meski Sanity sedang down, karena situs yang saya lihat adalah hasil build statis, bukan hasil fetch langsung ke Sanity.
7. Sebagai maintainer situs, saya ingin membaca `CONTEXT.md` yang sudah diperbarui (plus ADR baru) dan memahami *kenapa* keputusan "avoid CMS" dibalik untuk galeri dan artikel, sehingga dokumentasi domain tidak menyesatkan pembaca berikutnya.
8. Sebagai maintainer situs, saya ingin dua artikel Markdown yang sudah ada (`site/public/articles/*.md`) otomatis termigrasi ke Sanity sebagai dokumen Portable Text lewat skrip satu-kali, sehingga saya tidak perlu menyalin ulang kontennya secara manual.
9. Sebagai maintainer situs, saya ingin entri `gallery` yang sudah ada di `sourceData.js` (termasuk asetnya) termigrasi ke Sanity sebagai dokumen dengan gambar ter-upload ke asset pipeline Sanity, sehingga galeri lama tidak hilang saat cutover.
10. Sebagai maintainer situs, begitu galeri dan artikel terverifikasi jalan dari Sanity, saya ingin field `gallery` di `sourceData.js` dan pipeline Markdown-artikel lama (parser frontmatter tangan, folder `site/public/articles/`) dihapus dari kode, sehingga tidak ada dua sumber kebenaran yang tumpang tindih untuk tipe konten yang sama.

## Implementation Decisions

- **Sanity project & dataset**: dibuat lewat `sanity init` (dataset `production`, template bersih). Project ID/dataset name adalah nilai publik (boleh masuk kode/env non-secret); token disimpan sebagai secret, tidak pernah dikomit.
- **Studio**: aplikasi terpisah (kemungkinan folder `studio/` di root repo, sejajar dengan `site/`), di-deploy independen lewat `sanity deploy` ke `*.sanity.studio` — tidak masuk pipeline build `site/` maupun workflow `deploy.yml` yang ada.
- **Schema fase 1**:
  - `article` — Portable Text untuk body (ganti Markdown), field `title`/`author`/`date`/`excerpt`/`slug`/`cover` (gambar via asset pipeline Sanity, bukan import lokal). `slug` sebaiknya jadi field bertipe slug Sanity (auto-generate dari title, bisa diedit), menggantikan derivasi dari nama file yang dipakai `deriveArticles.js` sekarang.
  - `galleryItem` — `image` (asset Sanity, dengan hotspot), `alt`, `caption`, `meta`. Field layout (`ratio`/`position`/`span`) dikurasi: jadi dropdown preset tetap ATAU dihapus dari schema dan dihitung/didefaultkan di frontend — keputusan detail final diserahkan ke implementer fase ini, mengikuti prinsip "field berisiko dikunci" di atas.
- **Rendering frontend**:
  - `deriveArticles.js` diganti alurnya: bukan lagi parsing `import.meta.glob` Markdown + `marked`, melainkan fetch GROQ dari Sanity (build-time, lewat `@sanity/client`) + render `bodyPortableText` lewat `@portabletext/react`. Fungsi murni (`slugFromFilename`, `parseFrontmatter`, `formatArticleDate`) yang sudah ada dan masih relevan (mis. `formatArticleDate`) dipertahankan; yang jadi tidak relevan (parser frontmatter tangan) dihapus bersamaan dengan cutover, bukan dibiarkan sebagai dead code.
  - `deriveSiteData.js`: `gallery` diambil dari hasil fetch Sanity, bukan lagi `rawData.gallery` dari `SB_DATA` — perlu keputusan implementer soal di titik mana fetch Sanity terjadi relatif terhadap fungsi murni `deriveSiteData` yang ada sekarang (mis. hasil fetch digabung ke `rawData` sebelum dipanggil, supaya `deriveSiteData` sendiri tetap fungsi murni tanpa I/O — konsisten dengan komentar di puncak berkas itu).
- **Build-time fetch mechanics**: fetch Sanity terjadi di tahap build (mengikuti pola `scripts/generate-prayer-times.mjs` yang sudah ada — skrip Node terpisah yang jalan sebelum `vite build`, atau diintegrasikan ke plugin Vite). Butuh `SANITY_API_TOKEN` (role viewer/read-only cukup untuk build), `SANITY_PROJECT_ID`, `SANITY_DATASET` sebagai environment variable saat build lokal (`.env`, di-gitignore) maupun di CI.
- **Webhook → rebuild otomatis**: Sanity project dikonfigurasi dengan webhook yang terpicu saat dokumen `article`/`galleryItem` di-publish, memanggil GitHub API untuk trigger `repository_dispatch` pada `deploy.yml` (perlu menambah event type baru atau memakai `workflow_dispatch` via API) — atau `deploy.yml` diperluas menerima trigger `repository_dispatch` selain `push`/`workflow_dispatch` yang sudah ada. Token GitHub (personal access token scope `repo`) disimpan di sisi konfigurasi webhook Sanity (bukan di repo).
- **GitHub Actions secrets baru** (ditambahkan manual oleh maintainer di Settings repo, bukan lewat kode): `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN`.
- **Migrasi konten existing**: skrip satu-kali (dijalankan manual oleh maintainer, tidak masuk `npm run build`) yang:
  - Membaca `site/public/articles/*.md`, parsing lewat `deriveArticles.js`/`parseFrontmatter` yang ada sekarang (sebelum dihapus), konversi body Markdown → Portable Text, upload ke dataset `production` sebagai dokumen `article`.
  - Membaca `SB_DATA.gallery` di `sourceData.js`, upload tiap gambar lokal (`site/src/design-system/assets/...`) ke asset pipeline Sanity, buat dokumen `galleryItem` per entri.
- **CORS**: origin situs produksi (domain GitHub Pages) dan `http://localhost:*` (dev) ditambahkan ke project Sanity (`sanity cors add`) supaya build lokal dan (bila suatu saat dibutuhkan) client-side read bisa jalan.

## Testing Decisions

- Fungsi murni yang menggantikan alur lama (transformasi hasil fetch Sanity → bentuk siap-render, termasuk render Portable Text ke HTML/JSX) tetap ditest dengan fixture string/objek, mengikuti pola `deriveArticles.test.js`/`deriveSiteData.test.js` yang sudah ada — bukan memanggil Sanity sungguhan di test.
- Build script yang benar-benar melakukan fetch ke Sanity (I/O) tidak ditest lewat unit test (sama seperti `generate-prayer-times.mjs` yang juga tidak ditest langsung) — verifikasi dilakukan lewat build sungguhan di CI (`npm run build` sudah menjalankan test lebih dulu di `deploy.yml`, urutan ini dipertahankan).
- Test halaman existing (`ArtikelPage.test.jsx`, `ArtikelPage.smallset.test.jsx`, `ArtikelPage.empty.test.jsx`, `ArticleDetailPage.test.jsx`) diperbarui memakai fixture Portable Text alih-alih fixture Markdown mentah (lihat `articlesTestFixtures.js`) — perilaku yang ditest (rendering artikel, empty state, paging) tidak berubah, hanya bentuk fixture input yang menyesuaikan skema baru.
- Skrip migrasi satu-kali tidak wajib ditest otomatis (dijalankan sekali, dibuang setelah dipakai) — tapi implementer sebaiknya jalankan dengan `--dry-run`/mode preview dulu (kalau memungkinkan lewat `@sanity/client`) sebelum benar-benar menulis ke dataset produksi.

## Out of Scope

- Migrasi tipe konten selain galeri & artikel (`events`, `news`, `programs`, `contact`, `donation.campaign`, `stats`) — fase terpisah, spec sendiri, lihat Further Notes.
- Runtime fetch dari browser ke Sanity — arsitektur yang dipilih adalah build-time fetch; kalau nanti butuh preview instan tanpa rebuild, itu perubahan arsitektur terpisah yang perlu digrill ulang.
- Dataset staging/preview terpisah dari `production`.
- Draft/approval workflow sebelum publish — pengurus punya publish rights langsung sejak fase 1.
- Perubahan pada `New Surau Bateh Lori Design System/` sumber — konsisten dengan ADR 0003, situs produksi tidak mengimpor langsung dari folder design system.
- Embedded Sanity Studio di dalam `site/` (mis. route `/studio`) — Studio di-deploy terpisah, lihat Implementation Decisions.

## Further Notes

- **Roadmap fase berikutnya** (masing-masing jadi spec terpisah, tidak dicakup detail di sini): fase 2 diusulkan memindahkan `events`/agenda — sekaligus memperbaiki hack modeling yang ada sekarang (field `day`/`month` di-overload untuk merepresentasikan baik event mingguan berulang maupun event sekali-jalan bertanggal, mis. entri "Daurah Aswaja" yang menaruh string tanggal `13/08/26` ke field bernama `month`). Skema Sanity untuk fase itu perlu memisahkan `RecurringEvent` (hari-dalam-minggu + waktu-hari) dan `OneOffEvent` (tanggal sungguhan) sebagai dua tipe dokumen berbeda, supaya Studio menampilkan field yang sesuai jenis event yang sedang ditambah pengurus. Fase-fase sesudahnya (`news`, `programs`, `contact`, `donation.campaign`, `stats`) menyusul dengan pola field-kurasi yang sama (lihat "Field yang dikunci vs bebas" di atas, khususnya `icon` di `programs`/`stats`).
- **Prasyarat manual (bukan bagian kerja agent)**: sebelum spec ini bisa mulai diimplementasikan, maintainer perlu (1) mendaftar akun Sanity + membuat organization, (2) menjalankan/mengonfirmasi `sanity init` project baru, (3) mengundang email pengurus ke project dengan role Editor, (4) menambahkan tiga GitHub Actions secrets di atas. Status spec ini `ready-for-human` sampai prasyarat #1–#2 selesai (project ID perlu ada sebelum kode apa pun bisa nulis skema/fetch sungguhan) — setelah itu, sisa pekerjaan (schema, script migrasi, rendering, test) bisa diserahkan ke agent sebagai `ready-for-agent`.
- Keputusan detail schema `galleryItem` untuk field `ratio`/`position`/`span` (dropdown preset vs dihapus sepenuhnya dari kendali pengurus) sengaja tidak difinalkan di spec ini — diserahkan ke implementer fase ini untuk diputuskan sesuai kebutuhan grid layout yang ada, konsisten dengan prinsip "kurasi field berisiko" yang sudah disepakati.
- Sesi grilling yang menghasilkan spec ini juga menyepakati bahwa `CONTEXT.md` perlu ADR baru menggantikan keputusan "avoid CMS" — penulisan ADR itu sebaiknya dilakukan sebagai bagian pertama implementasi fase 1 (sebelum kode berubah), bukan setelahnya, supaya dokumentasi domain tidak pernah dalam keadaan menyesatkan selama proses migrasi berjalan.
