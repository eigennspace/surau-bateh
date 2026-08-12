# 02 — ADR + update CONTEXT.md

**What to build:** `CONTEXT.md` diperbarui supaya istilah domain "Sumber Data" tidak lagi menyesatkan pembaca — saat ini secara eksplisit menyatakan _Avoid: Database, CMS, backend_, padahal keputusan itu baru saja dibalik untuk sebagian konten (galeri + artikel). Sebuah ADR baru ditulis yang mendokumentasikan keputusan migrasi ke Sanity, alasannya, dan batasannya (bukan semua konten pindah — lihat spec untuk daftar yang tetap di kode).

**Blocked by:** None — murni dokumentasi, tidak butuh project Sanity nyata untuk ditulis. Bisa dikerjakan paralel dengan tiket 01.

**Status:** done

- [x] ADR baru dibuat di `docs/adr/` (nomor urut lanjutan dari yang sudah ada, mis. `0005-...`), menjelaskan: konteks (pengurus makin sering minta update konten, bottleneck maintainer), keputusan (Sanity untuk galeri+artikel, build-time fetch, sisanya tetap di kode), dan konsekuensi (Studio terpisah, webhook rebuild, dataset tunggal `production`, dst — ringkas dari `spec.md`). → `docs/adr/0006-galeri-artikel-pindah-ke-sanity.md`.
- [x] ADR ini secara eksplisit menyatakan dirinya men-supersede bagian _Avoid: Database, CMS, backend_ di entri "Sumber Data" `CONTEXT.md` — bukan menggantikan seluruh istilah "Sumber Data", karena sebagian konten (silsilah, lokasi, dst) tetap memakainya persis seperti sekarang.
- [x] Entri "Sumber Data" di `CONTEXT.md` diperbarui: `_Avoid_` diubah supaya tidak lagi melarang CMS secara blanket — dijelaskan bahwa sebagian konten (galeri, artikel, dan menyusul: agenda/news/programs/contact/donation campaign/stats) kini dikelola lewat Sanity, sementara sisanya (lokasi, offset iqamah, silsilah, info rekening) tetap di berkas ini, dengan pointer ke ADR baru.
- [x] Istilah domain baru ditambahkan ke `CONTEXT.md` bila diperlukan (mis. "Sanity Studio", "Dataset Sanity") mengikuti format istilah yang sudah ada (definisi + `_Avoid_` bila relevan). → ditambahkan "Dataset Sanity".
- [x] Tidak ada perubahan pada istilah domain yang tidak terkait migrasi ini (mis. "Kampanye Donasi", "Data Jadwal Salat Ter-generate" tetap seperti sekarang, kecuali disebutkan di atas).

## Comments

- Diimplementasikan sebagai ADR `0006` (bukan `0005` — `0005-github-pages-dengan-domain-custom-diatur-lewat-settings.md` sudah ada duluan).
