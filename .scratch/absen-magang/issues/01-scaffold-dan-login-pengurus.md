# 01 — Scaffold aplikasi + login Pengurus

**What to build:** Aplikasi Absen Magang berjalan sebagai proyek Next.js terpisah dari `site/`, terhubung ke database Postgres sendiri (lihat [ADR 0015](../../../docs/adr/0015-absen-magang-penyimpanan-data-terpisah-dari-sanity.md)), memakai token desain visual dari `New Surau Bateh Lori Design System/tokens/` (warna, tipografi, radius — bukan komponen React yang divendor di `site/src/design-system/`, itu terikat stack lama). Pengurus bisa login dengan akun personal (username + password) ke sebuah dashboard kosong. Ini fondasi bersama (skema DB dasar, koneksi DB, auth, layout) yang dipakai semua ticket berikutnya — lihat glosarium di [absen/CONTEXT.md](../../../absen/CONTEXT.md) untuk istilah domain (Pengurus, dst).

**Blocked by:** None — bisa mulai langsung

- [ ] Proyek Next.js baru ada dan bisa dijalankan, terhubung ke database Postgres
- [ ] Halaman/komponen dasar memakai token warna, tipografi, dan radius dari design system surau (bukan default framework)
- [ ] Ada entitas Pengurus di database (username, password ter-hash)
- [ ] Pengurus bisa login dengan username+password yang valid dan masuk ke dashboard
- [ ] Login dengan kredensial salah ditolak dengan pesan error, tidak masuk dashboard
- [ ] Tanpa login, mengakses dashboard mengarahkan ke halaman login (bukan menampilkan dashboard)
