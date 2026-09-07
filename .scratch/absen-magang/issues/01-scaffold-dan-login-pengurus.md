# 01 — Scaffold aplikasi + login Pengurus

Status: done

**What to build:** Aplikasi Absen PL berjalan sebagai proyek Next.js terpisah dari `site/`, terhubung ke database Postgres sendiri (lihat [ADR 0015](../../../docs/adr/0015-absen-magang-penyimpanan-data-terpisah-dari-sanity.md)), memakai token desain visual dari `New Surau Bateh Lori Design System/tokens/` (warna, tipografi, radius — bukan komponen React yang divendor di `site/src/design-system/`, itu terikat stack lama). Pengurus bisa login dengan akun personal (username + password) ke sebuah dashboard kosong. Ini fondasi bersama (skema DB dasar, koneksi DB, auth, layout) yang dipakai semua ticket berikutnya — lihat glosarium di [absen/CONTEXT.md](../../../absen/CONTEXT.md) untuk istilah domain (Pengurus, dst).

**Blocked by:** None — bisa mulai langsung

- [x] Proyek Next.js baru ada dan bisa dijalankan, terhubung ke database Postgres
- [x] Halaman/komponen dasar memakai token warna, tipografi, dan radius dari design system surau (bukan default framework)
- [x] Ada entitas Pengurus di database (username, password ter-hash)
- [x] Pengurus bisa login dengan username+password yang valid dan masuk ke dashboard
- [x] Login dengan kredensial salah ditolak dengan pesan error, tidak masuk dashboard
- [x] Tanpa login, mengakses dashboard mengarahkan ke halaman login (bukan menampilkan dashboard)

## Comments

Diimplementasikan di `absen-magang/` (lihat `absen-magang/README.md` untuk cara jalan). Login pakai session cookie ber-signature JWT (`jose`), password ter-hash `bcryptjs`, proteksi route lewat `middleware.js`. Diverifikasi manual lewat browser (login sukses -> dashboard, kredensial salah -> pesan error, akses tanpa sesi -> redirect `/login`) dan `next build` produksi. Lihat commit `250a626`, `fa20428`.
