# 06 — Cutover: hapus pipeline lama

**What to build:** Setelah artikel dan galeri terverifikasi jalan penuh dari Sanity di produksi, jalur lama untuk dua tipe konten ini dihapus sepenuhnya dari kode — tidak ada fallback mati atau dua sumber kebenaran yang tumpang tindih, konsisten dengan disiplin "satu sumber kebenaran" yang didokumentasikan di `CONTEXT.md`.

**Blocked by:** 04, 05 (keduanya harus sudah live dan terverifikasi di produksi sebelum jalur lamanya dihapus).

**Status:** ready-for-agent

- [ ] Parser frontmatter Markdown tangan (`parseFrontmatter`, `slugFromFilename` bila tidak lagi dipakai) dan folder `site/public/articles/*.md` dihapus dari repo.
- [ ] Field `gallery` di `sourceData.js` (array entri lama + import gambar lokal terkait yang sudah tidak dipakai halaman lain) dihapus.
- [ ] `deriveArticles.js`/`deriveSiteData.js` dan test terkait dibersihkan dari kode/fixture yang merujuk jalur lama (mis. fixture Markdown mentah di `deriveArticles.test.js` bila masih ada sisa dari sebelum tiket 04).
- [ ] Dependency `marked` dihapus dari `package.json` bila tidak lagi dipakai di tempat lain setelah `@portabletext/react` menggantikannya sepenuhnya untuk rendering artikel.
- [ ] `npm test` lulus penuh tanpa modifikasi ekspektasi yang melemahkan cakupan (bukan sekadar menghapus test yang gagal).
- [ ] `CONTEXT.md`/ADR (tiket 02) diperiksa ulang — dipastikan tidak ada lagi referensi ke jalur lama (mis. "Markdown artikel di `site/public/articles/`") yang sekarang jadi tidak akurat.
