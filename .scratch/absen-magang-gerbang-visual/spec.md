Status: ready-for-agent

# Tampilan Gerbang Absen PL — Lebih Hidup dan Responsive

## Problem Statement

Halaman gerbang Absen PL (`/`, `/login`, `/daftar`, `/absen`) saat ini murni fungsional: container tengah, satu kartu putih, label+input polos, tanpa identitas visual surau yang terasa. Tidak ada perlakuan khusus untuk layar kecil di luar container yang menyempit — tidak ada split-layout yang runtuh rapi ke satu kolom, navigasi dashboard yang cuma flex-wrap, dsb. Peserta PL membuka `/absen` dari HP tiap hari, calon Peserta membuka `/daftar` sekali dari HP, dan Pengurus membuka `/login` dari desktop maupun HP — ketiganya pantas terasa seperti bagian dari identitas Surau Bateh Lori (dipakai di Situs Publik), bukan form generik tanpa merek.

## Solution

Bangun satu "shell" visual split-screen yang dipakai bersama oleh `/login`, `/daftar`, dan `/absen`: panel kiri bermerek (foto `foto-surau.jpg` + overlay gradien gelap sesuai pedoman `brand-imagery.html`, logo, nama surau, satu baris subjudul, sedikit gerak pan/zoom lambat pada foto) dan panel kanan putih berisi form pakai komponen React asli design system (`Button`, `Card`, `Input`, `Badge`, `Icon` — divendor ke `absen-magang/components/ds/`, lihat [ADR 0016](../../docs/adr/0016-absen-magang-vendor-komponen-design-system.md)). Di layar sempit, shell runtuh jadi satu kolom (panel kiri jadi header ringkas). Halaman `/` dihapus sebagai layar pilih peran tersendiri dan redirect ke `/login`; navigasi silang secukupnya ditambahkan sebagai link kecil di tiap panel kanan. Perubahan ini murni pada tiga rute gerbang — `/dashboard/*`, `actions.js` tiap rute, dan seluruh logika domain (`lib/absen/*`) tidak disentuh.

## User Stories

1. As Pengurus, I want tiba di `/login` saat membuka domain root (`/`) tanpa path spesifik, so that saya tidak perlu mengingat path `/login` untuk masuk ke dashboard.
2. As Pengurus, I want melihat panel bermerek (foto surau, logo, nama surau) di samping form login saya di layar lebar, so that saya merasa masuk ke sistem resmi Surau Bateh Lori, bukan form generik.
3. As Pengurus, I want login tetap berfungsi identik seperti sebelumnya (username, password, tombol Masuk, pesan error saat kredensial salah) meski tampilannya berubah, so that alur kerja saya tidak terganggu oleh redesign.
4. As Pengurus yang sedang di `/login`, I want ada link kecil untuk berpindah ke halaman check-in/check-out Peserta (`/absen`) dan ke halaman pendaftaran (`/daftar`), so that saya bisa cepat memandu Peserta yang salah buka halaman tanpa mengetik URL manual.
5. As calon Peserta, I want membuka `/daftar` dan melihat form Pendaftaran (nama, asal kampus/instansi, jurusan/prodi, NIM, nomor WhatsApp, Periode PL) di panel kanan dengan tampilan konsisten dengan identitas surau, so that saya percaya ini kanal resmi pendaftaran PL.
6. As calon Peserta yang sudah mengirim Pendaftaran, I want melihat konfirmasi "menunggu persetujuan Pengurus" dengan tampilan yang sama bermereknya (bukan halaman polos berbeda gaya), so that pengalaman saya konsisten dari awal sampai akhir alur pendaftaran.
7. As calon Peserta yang ternyata sudah Peserta terdaftar (sudah punya PIN), I want ada link kecil dari `/daftar` ke `/absen`, so that saya tidak perlu mendaftar ulang kalau salah buka halaman.
8. As Peserta, I want membuka `/absen` dari HP dan melihat form PIN + catatan aktivitas dalam satu kolom penuh yang mudah disentuh, so that saya bisa check-in/check-out cepat berdiri di lokasi surau.
9. As Peserta, I want modal izin lokasi (`LokasiModal`) tetap berfungsi identik seperti sebelumnya (status memeriksa/granted/denied/unsupported/prompt, tombol Aktifkan Lokasi/Coba lagi/Lanjutkan tanpa lokasi) meski shell di sekelilingnya berubah, so that alur pemberian izin lokasi saya tidak berubah.
10. As Peserta yang beberapa kali salah alamat, I want ada link kecil dari `/absen` ke `/login`, so that Pengurus bisa saya arahkan ke sana kalau ternyata saya keliru buka halaman Peserta padahal saya Pengurus.
11. As pengguna di layar HP (lebar sempit), I want shell split-screen di semua tiga halaman (`/login`, `/daftar`, `/absen`) runtuh rapi jadi satu kolom, so that saya tidak perlu scroll horizontal atau melihat elemen terpotong.
12. As pengguna, I want foto latar panel kiri bergerak pan/zoom pelan (tidak diam, tidak juga terlalu ramai), so that halaman terasa hidup tanpa mengganggu saya yang membukanya berkali-kali sehari (khususnya `/absen`).
13. As pengguna dengan preferensi `prefers-reduced-motion`, I want gerak pan/zoom pada foto dan animasi fade-in dinonaktifkan, so that saya tidak terganggu gerakan yang tidak saya inginkan.
14. As pengguna, I want tombol dan kartu (dari komponen `Button`/`Card` yang divendor) punya transisi hover/press halus bawaan, so that antarmuka terasa responsif terhadap interaksi saya.
15. As Pengurus yang membuka `/dashboard/*` setelah login dari shell baru, I want tampilan dashboard tidak berubah sama sekali (kelas CSS lama `.card`, `button`, `.status-badge`, nav dashboard tetap seperti semula), so that pekerjaan sehari-hari saya di dashboard (Pendaftaran, Jendela Absen, Kehadiran, Laporan) tidak terganggu oleh redesign yang belum menyentuh area itu.
16. As pengelola sistem, I want komponen design system yang dipakai (`Button`, `Card`, `Input`, `Badge`, `Icon`) disalin (vendor) ke dalam proyek `absen-magang`, bukan diimpor lintas folder repo, so that `absen-magang` tetap bisa di-build/deploy independen dari folder `New Surau Bateh Lori Design System/` (lihat ADR 0016).
17. As pengelola sistem, I want `next build` produksi tetap sukses setelah perubahan ini, so that redesign tidak memperkenalkan regresi build.
18. As pengelola sistem, I do NOT want ada perubahan pada `lib/absen/*`, skema database, atau `actions.js` di ketiga rute gerbang, so that seluruh perilaku domain (Pendaftaran, PIN, Kehadiran, Jendela Absen) persis sama seperti sebelum redesign — ini murni perubahan tampilan.
19. As pengelola sistem, I want rute `/`, `/login`, `/daftar`, `/absen` semua tetap dapat diakses langsung lewat URL masing-masing (bukan digabung jadi satu rute dengan query param/tab), so that link yang sudah dibagikan (mis. link `/daftar` yang dikirim Pengurus ke calon Peserta) tetap berfungsi tanpa perubahan.

## Implementation Decisions

- **Shell bersama**: satu komponen shell (mis. `GerbangShell` atau nama serupa) dipakai oleh halaman `/login`, `/daftar`, `/absen` — menerima konten form sebagai children/props, merender panel kiri bermerek (identik di ketiga halaman kecuali mungkin subjudul kecil) + panel kanan (konten spesifik tiap halaman). Ketiga rute Next.js tetap terpisah; `actions.js` tiap rute tidak berubah.
- **Panel kiri (bermerek)**:
  - Latar: `assets/foto-surau.jpg` dari design system + overlay gradien gelap sesuai pedoman `guidelines/brand-imagery.html` (scrim slate `#22262C` 86%→22%, arah 100°, teks selalu di sisi gelap).
  - Konten: logo/emblem surau, nama "Surau Bateh Lori", satu baris subjudul kecil ("Pencatatan Kehadiran PL" atau serupa) — bukan headline besar bergaya marketing/hero situs publik.
  - Gerak: pan/zoom lambat (Ken Burns) pada foto latar, kontinu/lembut, dinonaktifkan total di bawah `prefers-reduced-motion: reduce`.
  - Di layar sempit, panel kiri runtuh jadi header ringkas (tinggi lebih kecil, tetap tampilkan logo minimal) di atas panel kanan yang menjadi satu kolom penuh.
- **Panel kanan**: konten spesifik tiap halaman, dibangun dari komponen yang divendor:
  - `/login`: form username + password (komponen `Input`), tombol Masuk (`Button`), pesan error dari `state.pesan` yang sudah ada dipertahankan.
  - `/daftar`: seluruh field Pendaftaran yang sudah ada (nama, asal kampus/instansi, jurusan/prodi, NIM, nomor WhatsApp, Periode PL mulai/selesai) dipetakan ke komponen `Input`/`Card`, termasuk state sukses ("menunggu persetujuan") tetap dalam shell yang sama.
  - `/absen`: field PIN, catatan aktivitas, badge status lokasi (`Badge`), tombol Check-in/Check-out (`Button`); `LokasiModal` (overlay izin lokasi) tetap komponen custom terpisah yang sudah ada — tidak diganti ke `Dialog` dari design system.
- **Navigasi silang** (link kecil, bukan tombol besar, ditaruh di panel kanan tiap halaman):
  - `/login` → link ke `/absen` ("Peserta PL? Check-in/out di sini") dan ke `/daftar` ("Belum terdaftar? Daftar di sini").
  - `/daftar` → link ke `/absen` ("Sudah Peserta? Check-in/out di sini"). Tidak ada link ke `/login` dari `/daftar`.
  - `/absen` → link ke `/login` ("Pengurus? Masuk di sini"). Tidak ada link ke `/daftar` dari `/absen`.
- **Rute `/`**: `app/page.jsx` diganti jadi redirect (server-side, mis. `redirect('/login')` dari `next/navigation`) — bukan halaman pilih-peran lagi.
- **Vendoring komponen** (lihat ADR 0016): salin `Button.jsx`, `Card.jsx`, `Input.jsx`, `Badge.jsx`, `Icon.jsx` dari `New Surau Bateh Lori Design System/components/core/` dan `components/forms/` ke `absen-magang/components/ds/`, sebagai file statis yang diedit di tempat baru (bukan symlink, bukan skrip sync otomatis). Berkas authoring (`*.prompt.md`, `*.d.ts`, `*.card.html`) tidak ikut divendor.
- **CSS existing tidak disentuh**: `absen-magang/styles/globals.css` — kelas `.container`, `.card`, `button`/`.secondary`/`.danger`, `.error`/`.success`, `table`/`th`/`td`, `nav.dashboard-nav`, `.status-badge`, `.modal-overlay`/`.modal-card` — semuanya tetap ada apa adanya untuk dipakai `/dashboard/*` dan `LokasiModal`; kelas baru untuk shell gerbang ditambahkan terpisah (mis. file baru `styles/gerbang.css` atau blok baru di `globals.css`, bukan modifikasi kelas yang sudah ada).
- **Motion**: transisi hover/press pada `Button`/`Card` memakai token motion yang sudah bawaan komponen tersebut (`--transition-control`, `--press-scale`, dst dari `tokens/motion.css`). Fade-in halaman saat dimuat dan Ken Burns foto keduanya wajib menghormati `prefers-reduced-motion: reduce` (dimatikan total, bukan dipercepat).
- **Breakpoint**: mengikuti pola yang sudah dipakai di `ui_kits/website/Hero.jsx` (deteksi lebar viewport untuk keputusan grid 1 kolom vs 2 kolom) — bisa pakai pendekatan serupa `useBreakpoint`/media query CSS langsung, keduanya sah selama hasil akhirnya konsisten di ketiga halaman.

## Testing Decisions

- Tidak ada automated test baru — repo ini tidak punya pola pengujian untuk halaman/komponen React (pola testing yang ada, `lib/absen/*.test.js` lewat PGlite, khusus logika domain yang sama sekali tidak berubah di spec ini). Precedent: ticket `01-scaffold-dan-login-pengurus.md` memverifikasi UI (login, redirect, error) secara manual lewat browser, bukan automated test.
- Verifikasi: manual lewat browser untuk tiap acceptance criteria di bawah, ditambah `next build` produksi sukses tanpa error.
- Skenario manual yang wajib dicek: `/` redirect ke `/login`; login sukses/gagal tetap berfungsi seperti semula; submit Pendaftaran di `/daftar` tetap tersimpan dan menampilkan status sukses; check-in/check-out di `/absen` (termasuk keempat status `LokasiModal`) tetap berfungsi seperti semula; ketiga halaman runtuh ke satu kolom di lebar viewport sempit (≈375px) tanpa elemen terpotong/scroll horizontal; `prefers-reduced-motion: reduce` mematikan Ken Burns dan fade-in; navigasi silang antar tiga halaman sesuai matriks di atas; `/dashboard/*` tidak berubah tampilannya sama sekali dibanding sebelum perubahan.

## Out of Scope

- `/dashboard/*` (Beranda, Pendaftaran, Jendela Absen, Kehadiran Ditinjau, Laporan) — tetap memakai kelas CSS lama, tidak disentuh sesi ini.
- Mengganti `LokasiModal` custom dengan komponen `Dialog` dari design system.
- Skrip sync otomatis untuk komponen yang divendor (beda dengan `site/scripts/sync-design-system.mjs` yang sudah dihapus di ADR 0009) — penyesuaian dilakukan manual kalau sumber desain berubah.
- Menggabungkan `/login`/`/daftar`/`/absen` jadi satu rute/URL dengan tab client-side.
- Perubahan apa pun pada `lib/absen/*`, skema database, sesi/auth Pengurus, atau logika Jendela Absen/Kehadiran/PIN.
- Penentuan topologi deploy `absen-magang` (subdomain, hosting) — di luar spec ini.

## Further Notes

- Logo yang dipakai di panel kiri: pedoman `brand-logo.html` menyebut emblem (`logo-mark.png`) untuk kepala situs/favicon, lockup (`logo-lockup.png`) untuk dokumen/spanduk/slide — panel kiri gerbang ini adalah kasus baru yang belum eksplisit disebutkan pedoman tsb (lebih dekat ke "kepala situs" dari sisi peran, tapi tampil di atas foto seperti pola Hero). Pilihan default yang wajar: pakai `logo-mark.png` (emblem) mengikuti aturan "kepala situs", tapi tim implementasi bisa sesuaikan kalau secara visual lockup lebih terbaca di atas foto — ini keputusan kecil yang tidak perlu diklarifikasi ulang ke user sebelum implementasi.
- ADR 0016 (`docs/adr/0016-absen-magang-vendor-komponen-design-system.md`) mendokumentasikan keputusan vendoring di atas — dibuat bersamaan dengan spec ini.
- Warna/token yang dipakai seluruhnya dari token yang sudah ada di `absen-magang/styles/tokens/` (hasil salinan `New Surau Bateh Lori Design System/tokens/`) — tidak ada token/warna baru yang perlu ditambahkan.
