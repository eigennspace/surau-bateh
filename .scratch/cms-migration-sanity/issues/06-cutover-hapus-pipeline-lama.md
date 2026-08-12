# 06 — Cutover: hapus pipeline lama

**What to build:** Setelah artikel dan galeri terverifikasi jalan penuh dari Sanity di produksi, jalur lama untuk dua tipe konten ini dihapus sepenuhnya dari kode — tidak ada fallback mati atau dua sumber kebenaran yang tumpang tindih, konsisten dengan disiplin "satu sumber kebenaran" yang didokumentasikan di `CONTEXT.md`.

**Blocked by:** 04, 05 (keduanya harus sudah live dan terverifikasi di produksi sebelum jalur lamanya dihapus).

**Status:** done

- [x] Parser frontmatter Markdown tangan (`parseFrontmatter`, `slugFromFilename`) dihapus dari `deriveArticles.js` — tidak dipakai lagi di manapun. Folder artikel Markdown lama (`site/src/data/articles/*.md` — lihat catatan di tiket 04 soal path spec vs path sungguhan) dan gambar artikel lama (`site/public/articles/*.jpg`) dihapus dari repo.
- [x] Field `gallery` di `sourceData.js` (13 entri lama) dihapus, beserta 13 import gambar lokal yang jadi tidak dipakai lagi di berkas itu (`pengurusSurau` dkk — dicek dulu tidak dipakai halaman lain di `sourceData.js`; `pengurusSurau` sendiri masih dipakai `ProfilePage.jsx` lewat import terpisahnya sendiri, jadi file gambarnya tidak dihapus, hanya import di `sourceData.js` yang dihapus). File gambar vendored di `src/design-system/assets/` sendiri **tidak dihapus** — itu snapshot yang disinkronkan `npm run sync-ds` (ADR 0003), di luar cakupan tiket ini untuk diedit manual.
- [x] `deriveArticles.js` dibersihkan dari parser Markdown; `deriveSiteData.js` sendiri tidak pernah menyentuh jalur lama (sudah murni sejak tiket 05). Test terkait (`deriveArticles.test.js`) dibersihkan dari test `parseFrontmatter`/`slugFromFilename`.
- [x] Skrip migrasi satu-kali (`migrate-articles-to-sanity.mjs`, `migrate-gallery-to-sanity.mjs`) dan konverter pendukungnya (`markdownToPortableText.js` + test) dihapus — sudah dipakai & dibuktikan (lihat tiket 04/05), dan `migrate-articles-to-sanity.mjs` tidak bisa lagi jalan begitu folder artikel Markdown & `parseFrontmatter` dihapus di atas.
- [x] Dependency `marked` dihapus dari `package.json` (`npm uninstall marked`) — tidak dipakai di tempat lain setelah `@portabletext/react` menggantikannya sepenuhnya.
- [x] `npm test` lulus penuh (59 test — turun dari 66 karena 3 file test parser Markdown/konverter migrasi ikut terhapus bersama kode yang ditestnya, bukan dihapus karena gagal) tanpa modifikasi ekspektasi yang melemahkan cakupan. `npm run build` sukses, bundle situs mengecil (13 gambar galeri lama tidak lagi ikut ter-bundle dobel).
- [x] `CONTEXT.md`/ADR 0006 diperiksa ulang — tidak ada referensi ke jalur lama (`public/articles`, parser Markdown tangan, `marked`) yang jadi tidak akurat.

## Comments

- Ditemukan saat cutover: `sourceData.js` mengimpor 13 gambar HANYA untuk `gallery` (bukan dipakai halaman lain), jadi semuanya aman dihapus bersama field itu — kecuali `pengurusSurau`, yang punya import terpisah di `ProfilePage.jsx` dan tetap dipakai di sana.
