# 02 — Daftar pakai Shell

**What to build:** Pindahkan `/daftar` ke shell split-screen yang sama dari ticket 01. Seluruh field Pendaftaran (nama, asal kampus/instansi, jurusan/prodi, NIM, nomor WhatsApp, Periode Magang mulai/selesai) dipetakan ke komponen `Input`/`Card` yang divendor. State sukses ("Pendaftaran terkirim... menunggu persetujuan Pengurus") tetap ditampilkan di dalam shell yang sama (bukan halaman polos terpisah gaya lama). `actions.js` dan logika `submitPendaftaran` tidak berubah. Lihat spec lengkap di [spec.md](../spec.md).

**Blocked by:** 01 — butuh shell dan komponen `ds/` yang sudah divendor

**Status:** done

- [x] `/daftar` menampilkan shell split-screen yang sama gayanya dengan `/login` (panel kiri identik/konsisten)
- [x] Form Pendaftaran (semua field: nama, asal kampus/instansi, jurusan/prodi, NIM, no WhatsApp, Periode Magang mulai & selesai) memakai komponen `Input` yang divendor, di panel kanan
- [x] Submit Pendaftaran valid tetap tersimpan ke database seperti sebelumnya; validasi/error yang sudah ada tetap berfungsi
- [x] Setelah submit sukses, layar konfirmasi "menunggu persetujuan" tampil di dalam shell yang sama (bukan gaya polos berbeda)
- [x] Di viewport sempit (≈375px), `/daftar` runtuh jadi satu kolom penuh tanpa elemen terpotong
- [x] `next build` produksi sukses tanpa error
