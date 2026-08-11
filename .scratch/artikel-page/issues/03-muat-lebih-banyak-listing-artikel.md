# 03 — "Muat lebih banyak" di halaman listing Artikel

**What to build:** Halaman `/artikel` (dari tiket 01, yang sebelumnya menampilkan seluruh artikel sekaligus) diubah supaya awalnya hanya menampilkan 6 artikel terbaru. Tombol "Muat lebih banyak" di bawah daftar menambah 6 artikel berikutnya tiap kali diklik, sampai semua artikel tersedia sudah tampil — setelah itu tombol hilang/nonaktif. Perilaku empty state ("Artikel akan segera tayang") dan urutan terbaru-dulu dari tiket 01 tidak berubah.

**Blocked by:** 01 — Fondasi artikel: parsing Markdown, halaman listing, halaman detail, navigasi

**Status:** done

- [x] Kunjungan pertama ke `/artikel` menampilkan maksimal 6 artikel (kalau tersedia ≥6)
- [x] Tombol "Muat lebih banyak" tampil kalau masih ada artikel yang belum ditampilkan
- [x] Tiap klik "Muat lebih banyak" menambah hingga 6 artikel berikutnya ke daftar yang sudah tampil (tidak mereset yang sudah ada)
- [x] Tombol "Muat lebih banyak" hilang atau nonaktif setelah semua artikel yang tersedia sudah tampil
- [x] Kalau artikel yang tersedia ≤6 sejak awal, tombol "Muat lebih banyak" tidak muncul sama sekali
- [x] Empty state "Artikel akan segera tayang" (tiket 01) tetap berfungsi seperti sebelumnya saat tidak ada artikel
- [x] Urutan artikel tetap terbaru dulu di setiap batch
- [x] Render/interaksi test: fixture >6 artikel memverifikasi batch awal 6 tampil dan sisanya tidak sampai "Muat lebih banyak" dipicu; fixture ≤6 artikel memverifikasi tombol tidak muncul
