# 04 — Popover bottom tab bar mobile "Kegiatan"

**What to build:** Di bottom tab bar mobile (`BottomBar.jsx`), tab "Kajian" digantikan "Kegiatan" (ikon `calendar-days` tetap sama). Men-tap tab ini tidak langsung berpindah halaman — melainkan membuka popover kecil melayang di atas tab, berisi 3 pilihan (Kajian, Khitanan, Dauroh). Memilih salah satu menavigasi ke halaman yang sesuai dan menutup popover; tap di luar popover menutupnya tanpa berpindah halaman.

**Blocked by:** 01 — butuh route `/khitanan` dan `/dauroh` sudah ada untuk dituju popover.

- [ ] `BB_ITEMS` (`App.jsx`) — entri `Kajian` diganti `Kegiatan`, ikon tetap `calendar-days`.
- [ ] `BottomBar.jsx` mendukung entri yang membuka popover (bukan langsung `onNavigate`) untuk item "Kegiatan".
- [ ] Men-tap tab "Kegiatan" membuka popover kecil di atas tombol tab, menampilkan 3 pilihan: Kajian, Khitanan, Dauroh.
- [ ] Men-tap salah satu pilihan popover menavigasi ke halaman yang sesuai dan menutup popover.
- [ ] Men-tap di luar area popover menutup popover tanpa berpindah halaman.
- [ ] Tab bottom bar lain (Beranda, Jadwal Shalat, Infak, Kontak) tidak berubah perilakunya — tetap navigasi langsung seperti sebelumnya.
- [ ] Saat halaman aktif adalah Kajian, Khitanan, atau Dauroh, tab "Kegiatan" tetap ter-highlight/aktif, konsisten dengan perilaku highlight tab lain yang sudah ada.
