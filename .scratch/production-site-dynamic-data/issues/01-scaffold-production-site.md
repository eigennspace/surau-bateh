# 01 — Situs produksi tayang di GitHub Pages dengan navigasi penuh, konten dari Sumber Data

**What to build:** Situs produksi baru — folder terpisah di repo yang sama dengan `New Surau Bateh Lori Design System/` — yang bisa dinavigasi penuh (Beranda, Profil, Jadwal Salat, Kajian, Infak, Kontak) dan identik visual dengan design system, karena mengimpor komponen (`components/`) dan token (`tokens/*.css`) design system langsung, bukan menulis ulang. Dibangun dengan Vite + React sebagai static export dan ter-deploy ke GitHub Pages. Konten yang sudah punya bentuk di `data.js` sekarang (`times`, `events`, `programs`, `news`, `roadmap`, `contact`) dibaca dari satu Sumber Data (berkas ES module tunggal, mengikuti bentuk `window.SB_DATA`) lewat fungsi transformasi tunggal `deriveSiteData(rawData, now)` — untuk field-field ini `deriveSiteData` cukup meneruskannya apa adanya (belum ada derivasi baru di tiket ini).

Donasi, statistik, galeri, dan kartu Khatib Jumat belum dipindah di tiket ini — boleh meniru perilaku prototipe saat ini apa adanya (termasuk `DonationProgress` collected/target/deadline yang masih tampil untuk sementara). Tiket 02–05 akan menggantikan bagian-bagian itu.

Repo ini belum jadi git repo — inisialisasi git repo sebagai bagian dari tiket ini.

**Blocked by:** Tidak ada — bisa mulai langsung

**Status:** ready-for-human (deploy step pending push + Pages activation)

- [x] Repo di-init sebagai git repo
- [x] Proyek Vite + React baru dibuat di folder terpisah dari `New Surau Bateh Lori Design System/`, dalam repo yang sama
- [x] Semua komponen visual yang dipakai situs produksi diimpor langsung dari `New Surau Bateh Lori Design System/components/` dan `tokens/*.css` — tidak ada berkas komponen yang disalin atau ditulis ulang
- [x] Navigasi penuh berfungsi antar 6 halaman (Beranda, Profil, Jadwal Salat, Kajian, Infak, Kontak), termasuk perilaku responsif (nav bawah/menu ponsel) seperti di `index.html`/`mobile.html`
- [x] Perbandingan visual terhadap `New Surau Bateh Lori Design System/ui_kits/website/index.html` dan `mobile.html` tidak menunjukkan perbedaan pada bagian yang belum diubah tiket ini
- [x] Satu berkas Sumber Data (ES module) berisi `times`, `events`, `programs`, `news`, `roadmap`, `contact`, dibaca lewat `deriveSiteData(rawData, now)`
- [x] Unit test untuk `deriveSiteData` memverifikasi field-field ini diteruskan tanpa mutasi
- [x] Build situs (`vite build` atau setara) berhasil menghasilkan static export
- [ ] Situs ter-deploy dan bisa diakses di GitHub Pages — workflow `.github/workflows/deploy.yml` sudah dibuat (build + test + `actions/deploy-pages`); menunggu repo di-push ke GitHub dan Pages diaktifkan (Settings → Pages → Source: GitHub Actions) sebelum ini bisa dicentang
