# 02 — Beranda: live stat cards

**What to build:** Replace the current one-paragraph Beranda ("Pilih menu di atas...") with three stat cards giving Pengurus an at-a-glance summary: "Pendaftaran menunggu" (count from `daftarPendaftaranMenunggu`), "Kehadiran perlu ditinjau" (count from `daftarKehadiranDitinjauDenganPeserta`), and "Peserta aktif" (count of `daftarPeserta` filtered in the page to `status_pendaftaran === 'disetujui'` — no new database query). Each card links to its related page ("Pendaftaran menunggu" and "Peserta aktif" → `/dashboard/pendaftaran`, "Kehadiran perlu ditinjau" → `/dashboard/kehadiran`).

**Blocked by:** 01 (needs the new shell in place — page title comes from it, and the cards render inside the shell's content area)

**Status:** done

- [x] Beranda shows three stat cards with correct live counts matching what's actually on the Pendaftaran, Kehadiran Ditinjau, and Peserta-aktif data at that moment.
- [x] Each stat card is a link/clickable element that navigates to the correct related dashboard page.
- [x] No new database queries or `lib/absen` functions added — all three counts derive from existing functions.
- [x] Renders correctly and remains readable/tappable at mobile widths (≈375px).
- [x] `next build` succeeds with no errors.

## Comments

Diimplementasikan dan diverifikasi manual lewat browser (login sebagai Pengurus, desktop + viewport ≈375px, semua lima halaman). `next build` produksi dijalankan (oleh sub-agent review) dan sukses tanpa error di seluruh route dashboard + gerbang. Seluruh suite `vitest run` (49 test, `lib/absen/*`) tetap hijau, mengonfirmasi tidak ada regresi domain. Catatan proses: `next build` sempat dijalankan di working tree yang sama dengan sesi `next dev` lain yang sedang berjalan (berbagi `.next/`), yang membuat proses dev tersebut sempat error 500 karena manifest production menimpa manifest dev — sudah diperbaiki dengan menghapus `.next/` dan me-restart proses `next dev` itu ke kondisi semula (terverifikasi normal kembali).
