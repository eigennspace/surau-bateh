# 02 — Pendaftaran Peserta sampai disetujui + PIN ter-generate

Status: done

**What to build:** Calon Peserta mengisi form Pendaftaran publik (nama, asal kampus/instansi, jurusan/prodi, NIM, nomor WhatsApp, Periode Magang — tanggal mulai dan selesai). Pendaftaran tersimpan berstatus `menunggu`. Pengurus (setelah login, lihat ticket 01) melihat antrean Pendaftaran yang menunggu di dashboard, dan bisa menyetujui atau menolak masing-masing. Menyetujui memicu sistem meng-generate PIN unik untuk Peserta itu secara otomatis, ditampilkan ke Pengurus di layar (untuk diteruskan manual ke Peserta — tidak ada notifikasi otomatis, lihat spec). Peserta yang Pendaftaran-nya belum disetujui belum bisa memakai fitur Kehadiran (diperiksa lengkap di ticket 03).

**Blocked by:** 01 — butuh app shell, skema DB dasar, dan login Pengurus

- [x] Ada form publik (tanpa perlu login) untuk mengisi Pendaftaran dengan seluruh field yang disebut di atas
- [x] Pendaftaran yang disubmit tersimpan dengan status `menunggu`
- [x] Dashboard Pengurus menampilkan daftar Pendaftaran berstatus `menunggu`
- [x] Pengurus bisa menyetujui sebuah Pendaftaran → statusnya berubah jadi `disetujui`, dan PIN unik ter-generate otomatis serta ditampilkan ke Pengurus
- [x] Pengurus bisa menolak sebuah Pendaftaran → statusnya berubah jadi `ditolak`, tidak ada PIN yang dibuat
- [x] Dua Peserta yang disetujui pada waktu berdekatan mendapat PIN yang berbeda (unik)

## Comments

Diimplementasikan (`app/daftar`, `app/dashboard/pendaftaran`, `lib/absen/pendaftaran.js`). `setujuiPendaftaran` generate ulang PIN kalau UNIQUE constraint kena tabrakan (race condition dua approval berdekatan) alih-alih gagal total -- ditemukan & diperbaiki saat code review, dibuktikan lewat test yang mensimulasikan tabrakan tersebut. Diverifikasi manual lewat browser dan test lib/absen/pendaftaran.test.js. Lihat commit `250a626`, `fa20428`.
