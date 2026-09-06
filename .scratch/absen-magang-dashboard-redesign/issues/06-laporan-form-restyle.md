# 06 — Laporan: form restyle

**What to build:** Rebuild the Laporan form (pilih Peserta + rentang tanggal mulai/selesai, generate PDF) using the existing `Card`/`Input`/`Button` components so it's visually consistent with the rest of the redesigned dashboard, and comfortable to use on mobile. No fields, validation, or PDF-generation behavior change.

**Blocked by:** 01 (needs the new shell in place)

**Status:** done

- [x] Form fields (Peserta select, tanggal mulai, tanggal selesai) behave identically to today.
- [x] Submitting still opens the generated PDF in a new tab exactly as before.
- [x] Form is rebuilt with `Card`/`Input`/`Button`, visually consistent with other redesigned dashboard pages.
- [x] Comfortable to read and fill out at mobile widths (≈375px) — no cramped or cut-off fields.
- [x] `next build` succeeds with no errors.

## Comments

Diimplementasikan dan diverifikasi manual lewat browser (login sebagai Pengurus, desktop + viewport ≈375px, semua lima halaman). `next build` produksi dijalankan (oleh sub-agent review) dan sukses tanpa error di seluruh route dashboard + gerbang. Seluruh suite `vitest run` (49 test, `lib/absen/*`) tetap hijau, mengonfirmasi tidak ada regresi domain. Catatan proses: `next build` sempat dijalankan di working tree yang sama dengan sesi `next dev` lain yang sedang berjalan (berbagi `.next/`), yang membuat proses dev tersebut sempat error 500 karena manifest production menimpa manifest dev — sudah diperbaiki dengan menghapus `.next/` dan me-restart proses `next dev` itu ke kondisi semula (terverifikasi normal kembali).
