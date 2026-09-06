# 02 — Pendaftaran Peserta sampai disetujui + PIN ter-generate

**What to build:** Calon Peserta mengisi form Pendaftaran publik (nama, asal kampus/instansi, jurusan/prodi, NIM, nomor WhatsApp, Periode Magang — tanggal mulai dan selesai). Pendaftaran tersimpan berstatus `menunggu`. Pengurus (setelah login, lihat ticket 01) melihat antrean Pendaftaran yang menunggu di dashboard, dan bisa menyetujui atau menolak masing-masing. Menyetujui memicu sistem meng-generate PIN unik untuk Peserta itu secara otomatis, ditampilkan ke Pengurus di layar (untuk diteruskan manual ke Peserta — tidak ada notifikasi otomatis, lihat spec). Peserta yang Pendaftaran-nya belum disetujui belum bisa memakai fitur Kehadiran (diperiksa lengkap di ticket 03).

**Blocked by:** 01 — butuh app shell, skema DB dasar, dan login Pengurus

- [ ] Ada form publik (tanpa perlu login) untuk mengisi Pendaftaran dengan seluruh field yang disebut di atas
- [ ] Pendaftaran yang disubmit tersimpan dengan status `menunggu`
- [ ] Dashboard Pengurus menampilkan daftar Pendaftaran berstatus `menunggu`
- [ ] Pengurus bisa menyetujui sebuah Pendaftaran → statusnya berubah jadi `disetujui`, dan PIN unik ter-generate otomatis serta ditampilkan ke Pengurus
- [ ] Pengurus bisa menolak sebuah Pendaftaran → statusnya berubah jadi `ditolak`, tidak ada PIN yang dibuat
- [ ] Dua Peserta yang disetujui pada waktu berdekatan mendapat PIN yang berbeda (unik)
