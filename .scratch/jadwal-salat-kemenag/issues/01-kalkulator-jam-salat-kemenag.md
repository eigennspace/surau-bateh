# 01 — Kalkulator jam salat metode Kemenag

**What to build:** Sebuah fungsi murni yang menghitung enam waktu salat (Subuh, Syuruq, Dzuhur, Ashar, Maghrib, Isya) untuk satu koordinat + satu tanggal, mengikuti metode resmi Kementerian Agama RI (sudut fajar −20°, isya −18°, mazhab Syafi'i untuk Ashar, ihtiyat resmi Kemenag). Parameter-parameter metode ini dibakukan di dalam fungsi — bukan sesuatu yang dikonfigurasi dari luar, karena itu bagian dari definisi "metode Kemenag" itu sendiri. Fungsi ini belum terhubung ke situs sama sekali di ticket ini; deliverable-nya adalah modul yang benar dan teruji, siap dipakai ticket berikutnya.

**Blocked by:** None — bisa mulai langsung.

**Status:** ready-for-agent

- [ ] Fungsi murni menerima `{ latitude, longitude, date }` dan mengembalikan enam waktu salat (Subuh, Syuruq, Dzuhur, Ashar, Maghrib, Isya) menggunakan algoritma posisi matahari standar (NOAA/Meeus) dengan parameter sudut/ihtiyat resmi Kemenag.
- [ ] Tidak ada efek samping, tidak ada I/O — fungsi murni, hanya bergantung pada argumen yang diberikan.
- [ ] Tes: untuk kombinasi koordinat/tanggal yang valid, urutan waktu selalu Subuh < Syuruq < Dzuhur < Ashar < Maghrib < Isya.
- [ ] Tes: minimal satu titik referensi nyata untuk koordinat Surau Bateh Lori (−0.8317255, 100.4060905, Kota Padang, WIB) pada tanggal tertentu, dibandingkan terhadap angka jadwal Kemenag resmi yang sudah dikonfirmasi (dicari/diverifikasi oleh pengerja ticket, bukan dikarang), dengan toleransi kecil (mis. ±1 menit).
- [ ] Tes: kasus tepi pergantian tahun (31 Des → 1 Jan) tidak error.
