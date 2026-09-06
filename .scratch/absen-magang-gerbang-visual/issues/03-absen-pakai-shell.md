# 03 — Absen pakai Shell

**What to build:** Pindahkan `/absen` ke shell split-screen yang sama dari ticket 01. Field PIN dan catatan aktivitas memakai `Input` yang divendor; badge status lokasi ("Lokasi aktif" / "Lokasi belum aktif") memakai `Badge`; tombol Check-in/Check-out memakai `Button`. `LokasiModal` (overlay izin lokasi dengan status memeriksa/granted/denied/unsupported/prompt) **tetap komponen custom yang sudah ada**, tidak diganti ke `Dialog` dari design system — hanya disesuaikan supaya cocok secara visual di dalam shell baru. Tidak ada perubahan pada `lib/absen/*` atau route handler `checkin`/`checkout`. Lihat spec lengkap di [spec.md](../spec.md).

**Blocked by:** 01 — butuh shell dan komponen `ds/` yang sudah divendor

**Status:** done

- [x] `/absen` menampilkan shell split-screen yang sama gayanya dengan `/login`/`/daftar`
- [x] Field PIN dan catatan aktivitas memakai `Input`; badge status lokasi memakai `Badge`; tombol Check-in/Check-out memakai `Button`
- [x] `LokasiModal` tetap berfungsi identik untuk keempat status (memeriksa/granted/denied/unsupported/prompt) — tombol Aktifkan Lokasi/Coba lagi/Lanjutkan tanpa lokasi semua bekerja seperti sebelumnya
- [x] Check-in dan check-out (dengan dan tanpa lokasi, dalam dan luar Jendela Absen) tetap tersimpan dan menampilkan pesan sukses/status "ditinjau" seperti sebelumnya
- [x] Di viewport sempit (≈375px) — kasus pemakaian utama halaman ini — layout satu kolom penuh, mudah disentuh, tanpa elemen terpotong
- [x] `next build` produksi sukses tanpa error
