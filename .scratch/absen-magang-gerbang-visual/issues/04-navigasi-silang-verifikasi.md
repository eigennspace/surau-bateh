# 04 — Navigasi silang + verifikasi lintas halaman

**What to build:** Pasang link navigasi silang kecil (bukan tombol besar) di panel kanan tiap halaman gerbang sesuai matriks: `/login` → link ke `/absen` ("Peserta magang? Check-in/out di sini") dan ke `/daftar` ("Belum terdaftar? Daftar di sini"); `/daftar` → link ke `/absen` saja ("Sudah Peserta? Check-in/out di sini"); `/absen` → link ke `/login` saja ("Pengurus? Masuk di sini"). Tidak ada link `/daftar`→`/login` maupun `/absen`→`/daftar`. Setelah dipasang, lakukan verifikasi manual menyeluruh lintas ketiga halaman sekaligus (lihat acceptance criteria) sebagai penutup pekerjaan redesign gerbang. Lihat spec lengkap di [spec.md](../spec.md).

**Blocked by:** 01, 02, 03 — ketiga halaman tujuan harus sudah memakai shell final sebelum link dipasang dan diverifikasi bersama

**Status:** done

- [x] `/login` punya link ke `/absen` dan ke `/daftar`, dengan label sesuai spec
- [x] `/daftar` punya link ke `/absen` saja (tidak ada link ke `/login`)
- [x] `/absen` punya link ke `/login` saja (tidak ada link ke `/daftar`)
- [x] Ketiga halaman diverifikasi ulang di viewport sempit (≈375px) dan lebar (desktop) — tidak ada elemen terpotong atau scroll horizontal
- [x] `prefers-reduced-motion: reduce` diverifikasi mematikan Ken Burns dan fade-in di ketiga halaman
- [x] `/dashboard/*` diverifikasi tidak berubah tampilannya sama sekali dibanding sebelum seluruh pekerjaan redesign ini
- [x] `next build` produksi sukses tanpa error
