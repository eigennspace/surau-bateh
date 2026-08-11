# 03 — Tab "Pekan ini" pakai data 7 hari nyata

**What to build:** Tab "Pekan ini" di halaman Jadwal Salat berhenti memakai trik interpolasi offset dari jadwal hari ini, dan mulai menampilkan 7 hari bergulir ke depan dengan jam yang benar-benar dihitung per tanggal dari dataset yang sudah dibangun di ticket 02.

**Blocked by:** 02 — Jadwal "Hari ini" dihitung otomatis, ujung ke ujung.

**Status:** done

- [ ] `deriveSiteData` membentuk `week`: array 7 entri berturut-turut mulai hari ini, tiap entri berisi tanggal asli + jam per salat (adzan dari dataset hasil generate, iqamah dari `iqamahOffsets` Sumber Data — offset sama tiap hari karena itu kebijakan tetap, bukan hasil hitung tanggal).
- [ ] `SchedulePage.jsx`: array `WEEK` hardcode dan seluruh logika interpolasi offset di tabel "Pekan ini" dihapus, diganti render dari `site.week`.
- [ ] Label hari di tabel "Pekan ini" dihitung dari tanggal asli (nama hari singkat + tanggal, format konsisten dengan gaya sekarang mis. "Sen 10"), bukan teks hardcode.
- [ ] Tes `deriveSiteData` diperluas: `week` berisi 7 tanggal berurutan mulai hari ini, tiap entri punya offset iqamah yang diterapkan benar; dataset hasil generate dipakai sebagai fixture langsung (tidak dihitung ulang oleh kalkulator ticket 01).
- [ ] Verifikasi manual di browser: buka halaman Jadwal Salat, pindah ke tab "Pekan ini", pastikan 7 baris menampilkan tanggal berbeda dan jam yang masuk akal berbeda tiap harinya (bukan hasil offset seragam seperti sebelumnya).
