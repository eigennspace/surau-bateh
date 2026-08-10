# 05 — Statistik & galeri foto dipindah ke Sumber Data

**What to build:** Sumber Data mendapat field `stats` (angka manual seperti jamaah rutin Subuh, kajian per bulan, dan deskripsi gotong royong) dan `gallery` (array foto dengan path, alt, caption, meta, dan properti tampilan seperti `ratio`/`position` yang sudah dipakai `PhotoTile`). `StatsSection` dan `GallerySection` dirender dari field-field ini lewat `deriveSiteData`, menggantikan nilai yang sekarang hardcode di JSX.

**Blocked by:** 01 — Situs produksi tayang di GitHub Pages dengan navigasi penuh, konten dari Sumber Data

**Status:** done

- [x] Sumber Data punya field `stats` (manual, bukan dihitung otomatis)
- [x] Sumber Data punya field `gallery` (array foto dengan path, alt, caption, meta, ratio/position)
- [x] `StatsSection` merender dari `stats` lewat `deriveSiteData`
- [x] `GallerySection` merender dari `gallery` lewat `deriveSiteData`
- [x] Tidak ada lagi angka statistik atau daftar foto galeri hardcode di kode situs produksi
- [x] Unit test: `stats` dan `gallery` diteruskan `deriveSiteData` tanpa mutasi
