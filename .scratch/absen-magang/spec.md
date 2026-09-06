Status: done

# Absen Magang

## Problem Statement

Surau Bateh Lori menerima mahasiswi/intern magang (PKL), tapi tidak punya cara sistematis mencatat kehadiran mereka. Pengurus surau tidak bisa membuktikan siapa hadir kapan, dan Peserta magang tidak punya bukti resmi kehadiran untuk dilaporkan ke kampus/instansi asal mereka — padahal itu biasanya syarat kelulusan program magang/PKL.

## Solution

Bangun **Absen Magang**, aplikasi terpisah dari Situs Publik surau (lihat [ADR 0015](../../docs/adr/0015-absen-magang-penyimpanan-data-terpisah-dari-sanity.md) dan [absen/CONTEXT.md](../../absen/CONTEXT.md) untuk domain model lengkap). Peserta mendaftar sendiri, menerima PIN begitu Pengurus menyetujui Pendaftaran-nya, lalu mencatat Kehadiran sendiri tiap hari (check-in/check-out + catatan aktivitas) dibatasi oleh Jendela Absen (lokasi + jam kerja). Kehadiran di luar Jendela Absen tetap tersimpan tapi ditandai Ditinjau untuk diputuskan Pengurus. Pengurus bisa men-generate Laporan PDF siap cetak untuk rentang tanggal bebas, dengan kolom kosong untuk tanda tangan basah.

## User Stories

1. As a calon Peserta, I want mendaftar sendiri dengan mengisi nama, asal kampus/instansi, jurusan/prodi, NIM, nomor WhatsApp, dan Periode Magang (tanggal mulai–selesai), so that Pengurus punya data lengkap untuk memutuskan apakah saya benar Peserta resmi.
2. As a calon Peserta, I want Pendaftaran saya berstatus "menunggu" sampai diputuskan, so that saya tahu saya belum bisa mencatat Kehadiran.
3. As Pengurus, I want melihat daftar Pendaftaran yang menunggu persetujuan, so that saya bisa memverifikasi siapa saja yang benar magang di surau sebelum mereka bisa absen.
4. As Pengurus, I want menyetujui atau menolak sebuah Pendaftaran, so that hanya Peserta resmi yang bisa mencatat Kehadiran.
5. As sistem, when sebuah Pendaftaran disetujui, I want meng-generate PIN unik otomatis untuk Peserta itu, so that Peserta punya cara mengidentifikasi diri tanpa perlu akun/kata sandi.
6. As Peserta, I want memakai PIN saya untuk check-in saat tiba, so that waktu kedatangan saya tercatat sebagai bagian dari Kehadiran hari itu.
7. As Peserta, I want memakai PIN saya untuk check-out saat pulang, so that waktu kepulangan saya tercatat dan durasi kehadiran saya bisa dihitung.
8. As Peserta, I want mengisi catatan singkat aktivitas yang saya kerjakan hari itu saat check-out, so that Laporan nanti punya konteks, bukan cuma jam.
9. As sistem, when Peserta check-in/check-out di luar radius lokasi surau atau di luar jam kerja Jendela Absen, I want tetap menyimpan Kehadiran itu dengan status Ditinjau (bukan menolaknya), so that kesalahan GPS atau keterlambatan kecil tidak memblokir Peserta yang sebenarnya hadir sah.
10. As Pengurus, I want melihat daftar Kehadiran berstatus Ditinjau, so that saya bisa memutuskan mana yang sah.
11. As Pengurus, I want menyetujui, menolak, atau mengoreksi jam sebuah Kehadiran berstatus Ditinjau, so that rekap akhir tetap akurat meski ada kendala teknis di lapangan.
12. As Pengurus, I want login dengan akun personal (username/password), so that hanya saya yang bisa mengelola Pendaftaran, meninjau Kehadiran, dan men-generate Laporan.
13. As Pengurus, I want memilih rentang tanggal bebas kapan pun saya generate Laporan, so that saya bisa membuat laporan bulanan, per Periode Magang penuh, atau rentang khusus sesuai kebutuhan kampus tertentu.
14. As Pengurus, I want Laporan berbentuk PDF siap cetak berisi tabel tanggal, jam masuk, jam pulang, dan catatan aktivitas per Peserta, so that saya bisa langsung mencetaknya.
15. As Pengurus, I want PDF menyediakan kolom kosong untuk tanda tangan basah (bukan tanda tangan digital), so that prosesnya sesuai kebiasaan administrasi kampus yang menerima tanda tangan fisik.
16. As Peserta, I want data Kehadiran saya tersimpan permanen selama dan setelah Periode Magang saya, so that saya atau surau bisa merujuknya lagi kalau kampus meminta salinan laporan di kemudian hari.
17. As Pengurus, I do NOT want menerima notifikasi otomatis (WhatsApp/email) untuk Pendaftaran baru atau Kehadiran Ditinjau di versi ini, so that saya cukup membuka dashboard sendiri kapan saya sempat, tanpa perlu integrasi tambahan yang belum tentu sepadan.
18. As pengelola sistem, I want Jendela Absen (radius lokasi dan jam kerja) berlaku sama untuk semua Peserta lewat satu pengaturan (bukan per-peserta), so that pengaturannya tetap sederhana untuk skala satu lokasi ini.
19. As pengelola sistem, I want aplikasi ini berjalan terpisah dari Situs Publik (deploy sendiri, rencana subdomain suraubateh) dan memakai token desain visual dari `New Surau Bateh Lori Design System/`, so that tampilannya konsisten dengan identitas surau tanpa mengubah arsitektur statis Situs Publik yang sudah difinalkan.
20. As pengelola sistem, I want data Kehadiran disimpan di database sendiri, terpisah dari Sanity, so that data operasional harian tidak tercampur dengan konten editorial Situs Publik (lihat ADR 0015).
21. As Peserta, I want PIN saya tetap sama sepanjang Periode Magang saya, so that saya tidak perlu diberi kode baru tiap hari.

## Implementation Decisions

- **Posisi arsitektur**: Absen Magang adalah aplikasi terpisah dari `site/` — bounded context sendiri (lihat `CONTEXT-MAP.md`, `absen/CONTEXT.md`, ADR 0015). Repo/deploy terpisah, rencana subdomain suraubateh (nama subdomain final belum ditentukan, tidak menghalangi implementasi).
- **Stack**: Next.js, database Postgres terkelola. Ini default yang sudah dikonfirmasi user selama grilling, bukan hasil eksplorasi paksa alternatif lain.
- **Seam pengetesan (disepakati dengan user)**: satu modul domain/service (mis. `lib/absen`) memuat seluruh operasi domain sebagai fungsi yang bisa dipanggil langsung: `ajukanPendaftaran`, `setujuiPendaftaran`, `tolakPendaftaran`, `catatKehadiran` (check-in dan check-out), `setujuiKehadiranDitinjau`, `tolakKehadiranDitinjau`, `koreksiJamKehadiran`, `generateLaporan`. Route handler Next.js hanya memanggil modul ini — tidak ada logika domain di route handler maupun di komponen UI.
- **Entitas utama**:
  - **Peserta**: nama, asal kampus/instansi, jurusan/prodi, NIM, nomor WhatsApp, Periode Magang (tanggal mulai, tanggal selesai), PIN (diisi setelah disetujui), status Pendaftaran.
  - **Kehadiran**: relasi ke Peserta, tanggal, jam masuk, jam pulang (nullable sampai check-out terjadi), catatan aktivitas, status (`normal` | `ditinjau`), dan bila `ditinjau`: keputusan Pengurus (`disetujui` | `ditolak` | jam dikoreksi) beserta jam hasil koreksi bila ada.
  - **Pengurus**: akun personal (username, password ter-hash).
- **State Pendaftaran**: `menunggu` → `disetujui` (memicu generate PIN) | `ditolak`. Peserta dengan Pendaftaran belum `disetujui` tidak bisa memakai `catatKehadiran`.
- **State Kehadiran**: dievaluasi terhadap Jendela Absen saat `catatKehadiran` dipanggil — dalam batas → `normal`; di luar radius lokasi dan/atau di luar jam kerja → `ditinjau`. Status `ditinjau` diselesaikan lewat `setujuiKehadiranDitinjau` (jadi `normal`), `tolakKehadiranDitinjau`, atau `koreksiJamKehadiran` (mengubah jam lalu jadi `normal`).
- **Jendela Absen**: satu pengaturan tunggal untuk seluruh Peserta — satu titik koordinat + radius (meter), dan satu jendela jam kerja (jam mulai–selesai). Bukan per-peserta, bukan per-hari.
- **Laporan**: fungsi `generateLaporan(pesertaId, tanggalMulai, tanggalSelesai)` menghasilkan PDF berisi tabel (tanggal, jam masuk, jam pulang, catatan aktivitas) untuk satu Peserta pada rentang tanggal bebas yang dipilih Pengurus setiap kali dipanggil (bukan periode tetap tersimpan). PDF menyertakan kolom kosong nama+jabatan untuk tanda tangan tulis tangan — tidak ada mekanisme tanda tangan digital/e-signature.
- **Autentikasi**: Peserta diidentifikasi lewat PIN (bukan akun berpassword). Pengurus memakai akun personal berpassword.
- **Retensi data**: permanen — tidak ada mekanisme hapus/arsip otomatis di versi ini.
- **Notifikasi**: tidak ada integrasi WhatsApp/email di versi ini; Pengurus memantau lewat dashboard.
- **Desain visual**: reuse token CSS murni dari `New Surau Bateh Lori Design System/tokens/` (warna, tipografi, radius, dsb). Tidak reuse komponen React yang sudah divendor di `site/src/design-system/` — itu terikat ke stack Vite/React situs lama, sedangkan Absen Magang adalah proyek Next.js yang berbeda.

## Testing Decisions

- Uji seluruh alur lewat fungsi-fungsi modul `lib/absen` secara langsung (bukan lewat HTTP request ke route Next.js, bukan lewat UI) — sesuai seam yang sudah disepakati bersama user.
- Tiap fungsi diuji terhadap database test sungguhan (bukan mock koneksi database), mengikuti pola pengujian yang sudah ada di repo ini: `site/src/lib/*.test.js` menguji fungsi lib langsung dengan input/output nyata, bukan menguji detail implementasi internal (lihat `site/src/lib/resolveSanityContent.test.js` dan `site/src/lib/deriveSiteData.test.js` sebagai prior art pola ini, meski keduanya menguji transformasi data Sanity, bukan operasi database tulis).
- Fokus pengujian pada perilaku yang teramati dari luar modul: hasil state Pendaftaran/Kehadiran setelah pemanggilan fungsi, isi PDF yang di-generate (bukan detail rendering PDF internal), bukan struktur SQL atau query internal.
- Skenario penting yang wajib punya test: Pendaftaran disetujui → PIN ter-generate dan Peserta bisa `catatKehadiran`; check-in/out di dalam Jendela Absen → status `normal`; di luar radius atau di luar jam → status `ditinjau`; ketiga jalur penyelesaian `ditinjau` (setuju/tolak/koreksi jam); `generateLaporan` menghasilkan data yang sesuai untuk rentang tanggal yang diberikan, termasuk kasus rentang tanpa Kehadiran sama sekali.

## Out of Scope

- Multi-lokasi/multi-cabang surau — sistem ini untuk satu lokasi (Surau Bateh Lori) saja.
- Notifikasi otomatis (WhatsApp/email) ke Pengurus.
- Tanda tangan digital/e-signature pada Laporan.
- Kebijakan hapus/arsip data setelah Periode Magang selesai — retensi permanen.
- Jendela Absen per-peserta atau per-hari (shift berbeda-beda) — hanya satu pengaturan global.
- Reuse/integrasi dengan dataset Sanity Situs Publik — penyimpanan data sepenuhnya terpisah (ADR 0015).
- Penentuan nama/DNS subdomain final dan setup infrastruktur deploy — di luar spec ini, murni detail operasional saat rilis.

## Further Notes

- Belum diputuskan secara eksplisit selama grilling: apakah Peserta yang Periode Magang-nya sudah lewat tanggal selesai otomatis tidak bisa lagi `catatKehadiran`. Ini tampak seperti konsekuensi wajar dari konsep Periode Magang, tapi karena belum dikonfirmasi user secara langsung, sebaiknya diklarifikasi ulang sebelum diimplementasikan sebagai hard constraint — atau diimplementasikan sebagai peringatan lunak (soft warning) yang tidak memblokir, konsisten dengan filosofi "tetap simpan, tandai untuk ditinjau" yang dipakai di Jendela Absen.
- Radius geofence (meter) dan jam kerja (jam mulai–selesai) yang konkret belum ditentukan angkanya — ini nilai konfigurasi yang wajar diserahkan ke implementasi/percakapan lanjutan dengan Pengurus, bukan bagian dari domain model.
- Nama aplikasi ("Absen Magang") dipakai konsisten dengan istilah yang sudah tercatat di `absen/CONTEXT.md`; hindari penamaan lain di kode/UI yang bertentangan dengan glosarium itu.
