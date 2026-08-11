# Situs statis tanpa backend/CMS; konten dari satu berkas data yang diedit tangan

**Dipersempit oleh [0004](0004-prayer-times-computed-not-hand-typed.md)** untuk jam adzan (kini dihitung, bukan hand-typed) — sisa cakupan ADR ini tidak berubah.

Situs produksi tidak butuh multi-editor, riwayat perubahan, atau kontrol akses — pengurus surau cukup mengedit satu berkas (gaya `data.js`, mengikuti `SB_DATA` yang sudah ada di prototipe) yang menjadi satu-satunya sumber konten dinamis (jadwal salat, agenda, donasi, dll). Kami memutuskan untuk **tidak** memakai database, CMS, atau API — situs di-build sebagai Vite + React static export dan di-deploy ke GitHub Pages. Konsekuensinya: perubahan konten butuh build + deploy ulang, bukan langsung tayang; tidak ada panel admin. Ini trade-off yang disengaja demi kesederhanaan operasional, mengikuti cara kerja `data.js` di design system yang sudah familiar bagi pengelola situs.
