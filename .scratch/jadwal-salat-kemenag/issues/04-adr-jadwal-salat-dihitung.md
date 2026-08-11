# 04 — ADR: jadwal salat dihitung, bukan lagi hand-typed

**What to build:** Sebuah Architecture Decision Record baru yang mendokumentasikan bahwa jam adzan tidak lagi bagian dari Sumber Data yang diedit tangan — dihitung saat build dari lokasi + metode Kemenag lewat kalkulator murni + skrip generate (ticket 01–03). Hanya lokasi (`location`) dan offset iqamah (`iqamahOffsets`) yang tetap hand-typed. ADR ini mempersempit — bukan membatalkan — `0001-static-site-hand-edited-data-file`.

**Blocked by:** 03 — Tab "Pekan ini" pakai data 7 hari nyata (ditulis setelah implementasi selesai, supaya ADR mencerminkan apa yang benar-benar dibangun, bukan rencana).

**Status:** done

- [ ] Berkas ADR baru dibuat di `docs/adr/` (nomor indikatif `0004`, sesuaikan dengan urutan ADR terbaru saat ticket ini dikerjakan), mengikuti gaya/panjang ADR yang sudah ada di repo (mis. `0001`, `0003`).
- [ ] ADR menjelaskan: apa yang berubah (jam adzan dihitung, bukan hand-typed), kenapa (jam salat bergeser tiap hari, tidak realistis diketik manual), dan apa yang tetap hand-typed (koordinat lokasi, offset iqamah).
- [ ] ADR menaut silang ke `0001-static-site-hand-edited-data-file.md`, menjelaskan bahwa ADR baru ini mempersempit batasnya, bukan menggantikannya sepenuhnya.
- [ ] `CONTEXT.md` (root repo) ditinjau — bila istilah domain baru (mis. "Data Jadwal Salat Ter-generate") dianggap perlu untuk kejelasan kontributor berikutnya, ditambahkan mengikuti format entri glossary yang sudah ada; kalau tidak dianggap perlu, dilewati dengan sengaja (bukan lupa).
