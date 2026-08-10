# 02 — Status salat aktif/berikutnya dihitung dari jam nyata

**What to build:** `deriveSiteData(rawData, now)` menghitung `activePrayerName` dan `nextPrayerName` dengan membandingkan `now` terhadap `times` hari ini di Sumber Data — bukan nilai tetap seperti sekarang. Kartu jadwal salat di Hero (Beranda) dan tabel di halaman Jadwal Salat menyorot waktu salat yang sedang berlangsung dan berikutnya sesuai jam pengunjung membuka situs, kapan pun itu. Tabel "Pekan ini" tetap seperti perilaku saat ini (perkiraan berbasis offset dari jadwal hari ini) — tidak berubah di tiket ini.

**Blocked by:** 01 — Situs produksi tayang di GitHub Pages dengan navigasi penuh, konten dari Sumber Data

**Status:** ready-for-agent

- [ ] `deriveSiteData` menghasilkan `activePrayerName`/`nextPrayerName` berdasarkan perbandingan `now` dengan `times`
- [ ] Hero card dan `PrayerTimeTable` di halaman Jadwal Salat memakai hasil ini, bukan nilai hardcode
- [ ] Unit test: `now` sebelum Subuh → hasil benar
- [ ] Unit test: `now` di antara dua waktu salat (mis. antara Ashar dan Maghrib) → hasil benar
- [ ] Unit test: `now` setelah Isya (menjelang tengah malam) → hasil benar
- [ ] Tidak ada perubahan pada perilaku tabel "Pekan ini"
