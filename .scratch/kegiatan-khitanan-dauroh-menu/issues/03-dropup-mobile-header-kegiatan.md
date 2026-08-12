# 03 — Drop-up menu hamburger mobile "Kegiatan"

**What to build:** Di menu hamburger mobile (`MobileHeader` di `App.jsx`), label "Kajian" pada daftar menu digantikan "Kegiatan". Men-tap "Kegiatan" membuka drop-up dengan struktur sub-menu yang sama seperti dropdown desktop (Kajian, Khitanan, Dauroh). Men-tap salah satu pilihan menavigasi ke halaman yang sesuai dan menutup seluruh panel menu (drop-up + panel hamburger).

**Blocked by:** 01 — butuh route `/khitanan` dan `/dauroh` sudah ada untuk dituju drop-up.

- [ ] Daftar menu di `MobileHeader` menampilkan "Kegiatan" (bukan lagi "Kajian" datar), menggunakan struktur `NAV` berjenjang dari ticket 02 (`"Kegiatan & Aksi Sosial"` dengan anak Kajian/Khitanan/Dauroh) — label mobile "Kegiatan" boleh berbeda teks dari label desktop "Kegiatan & Aksi Sosial" sesuai keputusan sebelumnya.
- [ ] Men-tap "Kegiatan" di daftar menu membuka drop-up berisi 3 pilihan: Kajian, Khitanan, Dauroh.
- [ ] Men-tap salah satu pilihan drop-up menavigasi ke halaman yang sesuai dan menutup seluruh panel menu (drop-up sekaligus panel hamburger), sama seperti perilaku tap item nav lain di menu ini.
- [ ] Item menu lain (Beranda, Profil, Jadwal Shalat, Infak, Artikel, Kontak) di panel hamburger tidak berubah perilakunya.
- [ ] Tombol CTA "Salurkan Infak" di bawah panel menu tetap berfungsi seperti sebelumnya.
