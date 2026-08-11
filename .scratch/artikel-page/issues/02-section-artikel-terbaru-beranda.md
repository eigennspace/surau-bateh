# 02 — Section "Artikel Terbaru" di Beranda

**What to build:** Komponen `ArticlesSection` baru, ditempatkan di `HomePage.jsx` setelah section Agenda/Kajian dan sebelum Gallery. Menampilkan 3 artikel terbaru (dari hasil `deriveArticles` yang sudah ada dari tiket 01) — judul, penulis, tanggal, ringkasan (`excerpt`), cover kalau ada — plus tombol "Lihat semua artikel" yang menavigasi ke `/artikel`. Kalau belum ada artikel sama sekali, tampilkan pesan "Artikel akan segera tayang" (pesan sama seperti di halaman listing), tanpa kartu apa pun. Gaya visual mengikuti token design system yang sudah dipakai section-section lain di Beranda.

**Blocked by:** 01 — Fondasi artikel: parsing Markdown, halaman listing, halaman detail, navigasi

**Status:** done

- [x] `ArticlesSection` muncul di Beranda setelah Agenda/Kajian, sebelum Gallery
- [x] Menampilkan tepat 3 artikel terbaru (kalau tersedia ≥3) dengan judul, penulis, tanggal, ringkasan, cover kalau ada
- [x] Kalau artikel yang tersedia <3, tampilkan sejumlah yang ada tanpa kartu kosong/placeholder
- [x] Tombol "Lihat semua artikel" menavigasi pengunjung ke `/artikel`
- [x] Klik satu kartu artikel di section ini membuka halaman detail artikel yang benar
- [x] Saat tidak ada artikel sama sekali, section menampilkan "Artikel akan segera tayang" alih-alih kartu/section kosong
- [x] Gaya visual (warna, tipografi, spacing, kartu) konsisten dengan section Beranda lain, memakai token design system yang sudah ada
- [x] Halaman lain (Jadwal Shalat, Kajian, Infak, Profil, Kontak) tidak terpengaruh
- [x] Render test (`renderToStaticMarkup`) untuk `ArticlesSection`: fixture 5 artikel → hanya 3 terbaru tampil + tombol "Lihat semua artikel" ada; fixture array kosong → "Artikel akan segera tayang" tampil, tidak ada kartu
