# Absen Magang

Pencatatan kehadiran mahasiswi/intern yang menjalani magang/PKL di Surau Bateh Lori — aplikasi terpisah dari Situs Publik, dengan penyimpanan data operasional sendiri (bukan Sanity). Skala: satu lokasi, puluhan Peserta per periode.

## Language

**Peserta**:
Mahasiswi atau intern yang menjalani magang/PKL di surau dan mencatat kehadirannya lewat aplikasi ini. Satu Peserta terikat pada satu Periode Magang.
_Avoid_: Mahasiswi, Intern, Anak Magang (istilah sehari-hari, bukan istilah baku sistem)

**Pendaftaran**:
Permintaan awal seorang calon Peserta untuk terdaftar — berisi nama, asal kampus/instansi, jurusan/prodi, NIM, nomor WhatsApp, dan Periode Magang. Berstatus menunggu sampai disetujui atau ditolak Pengurus; PIN baru diberikan setelah disetujui.
_Avoid_: Registrasi, Sign up

**Periode Magang**:
Rentang tanggal mulai–selesai magang seorang Peserta, diisi saat Pendaftaran. Menentukan jangka waktu Peserta itu berhak mencatat Kehadiran.
_Avoid_: Periode Absen (itu istilah untuk rentang laporan — lihat Laporan — bukan keanggotaan Peserta)

**PIN**:
Kode unik yang digenerate otomatis oleh sistem begitu Pendaftaran seorang Peserta disetujui Pengurus. Dipakai Peserta untuk mengidentifikasi dirinya saat mencatat Kehadiran, menggantikan akun/kata sandi.
_Avoid_: Password, Kode Akses

**Kehadiran**:
Satu record harian milik seorang Peserta: waktu check-in, waktu check-out, dan catatan singkat aktivitas yang dikerjakan hari itu. Dicatat sendiri oleh Peserta (self check-in), bukan oleh Pengurus.
_Avoid_: Absensi, Absen (dipakai sebagai nama produk/aplikasi, bukan istilah untuk satu record)

**Jendela Absen**:
Syarat lokasi (radius sekitar surau) dan jam kerja yang menentukan apakah sebuah Kehadiran dianggap normal. Kehadiran yang disubmit di luar Jendela Absen tetap tersimpan, tidak ditolak — hanya diberi status Ditinjau.
_Avoid_: Geofence (istilah teknis lokasi saja, tidak mencakup batas jam)

**Ditinjau**:
Status sebuah Kehadiran yang disubmit di luar Jendela Absen, menunggu keputusan Pengurus: disetujui, ditolak, atau jamnya dikoreksi manual.
_Avoid_: Flagged, Pending (Pending dikhususkan untuk status Pendaftaran — dua konsep beda meski sama-sama "menunggu")

**Pengurus**:
Satu akun personal yang berwenang menyetujui/menolak Pendaftaran, meninjau Kehadiran berstatus Ditinjau, dan men-generate Laporan. Istilah domain yang dipakai tetap Pengurus, konsisten dengan istilah pengurus surau di Situs Publik.
_Avoid_: Admin, Approver

**Laporan**:
Dokumen PDF siap cetak berisi rekap Kehadiran seorang Peserta untuk rentang tanggal yang dipilih bebas oleh Pengurus saat generate — bukan periode tetap (bulanan/dsb). Menyediakan kolom kosong untuk tanda tangan basah, bukan tanda tangan digital.
_Avoid_: Rekap (Rekap bisa berarti tampilan ringkas di dashboard; Laporan khusus untuk dokumen PDF yang di-generate)
