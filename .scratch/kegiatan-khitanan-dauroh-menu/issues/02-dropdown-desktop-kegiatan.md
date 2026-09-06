# 02 — Dropdown desktop "Kegiatan & Aksi Sosial"

**What to build:** Di navbar desktop (`NavBar.jsx`), item nav "Kajian" digantikan "Kegiatan & Aksi Sosial". Hover pada item ini membuka dropdown berisi 3 pilihan: Kajian, Khitanan, Dauroh. Klik salah satu menavigasi ke halaman yang sesuai dan menutup dropdown. Parent tidak punya URL/halaman sendiri — murni trigger dropdown.

**Blocked by:** 01 — butuh route `/khitanan` dan `/dauroh` sudah ada untuk dituju dropdown.

**Status:** done — sudah terimplementasi & tergabung di main (lihat riwayat git, mis. `8da1230 Restrukturisasi navigasi jadi grup Kegiatan/Dakwah/Sosial`)

- [x] `NAV` (`App.jsx`) berubah dari daftar string datar jadi mendukung entri berjenjang: entri "Kajian" digantikan entri parent `"Kegiatan & Aksi Sosial"` dengan anak `['Kajian', 'Khitanan', 'Dauroh']`. Entri nav lain (Beranda, Profil, Jadwal Shalat, Infak, Artikel, Kontak) tetap datar, tidak berubah.
- [x] `NavBar.jsx` (desktop, non-mobile) merender "Kegiatan & Aksi Sosial" sebagai item dengan dropdown, bukan link langsung.
- [x] Hover pada "Kegiatan & Aksi Sosial" membuka dropdown menampilkan 3 pilihan: Kajian, Khitanan, Dauroh.
- [x] Klik salah satu pilihan dropdown menavigasi ke halaman yang sesuai (`/kajian`, `/khitanan`, `/dauroh`) dan menutup dropdown.
- [x] Memindah kursor menjauh dari area menu (tanpa klik) menutup dropdown dengan sendirinya.
- [x] Saat halaman aktif adalah Kajian, Khitanan, atau Dauroh, item "Kegiatan & Aksi Sosial" di navbar tetap ter-highlight/aktif — konsisten dengan perilaku highlight item nav lain yang sudah ada.
- [x] "Kegiatan & Aksi Sosial" sendiri tidak bisa diklik untuk berpindah ke halaman/URL apa pun — murni label trigger dropdown.
- [x] Halaman lain (Beranda, Profil, Jadwal Shalat, Infak, Artikel, Kontak) dan navigasinya tidak berubah perilakunya.
