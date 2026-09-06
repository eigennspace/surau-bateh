# 04 — Kehadiran Ditinjau: responsive table/card view + empty state

**What to build:** Apply the table↔card responsive pattern built in ticket 03 to the Kehadiran Ditinjau page. On mobile, each Kehadiran renders as a card showing Peserta name, tanggal, jam masuk/pulang, lokasi info for both check-in and check-out (including the "lokasi tidak terkirim" case), and Setujui/Tolak/Koreksi jam actions. Koreksi jam still swaps the display into datetime inputs and saves via the existing action. On desktop, the existing table layout is kept (restyled). Also restyle the empty state ("Tidak ada Kehadiran berstatus ditinjau saat ini.") to match ticket 03's pattern.

**Blocked by:** 01, 03 (reuses the table↔card component/pattern built there)

**Status:** done

- [x] At desktop widths, Kehadiran Ditinjau renders as a table (restyled, same columns/data as today).
- [x] At mobile widths (≈375px), Kehadiran Ditinjau renders as one card per Kehadiran, showing name/tanggal/jam masuk/jam pulang/lokasi info, with no horizontal scrolling needed.
- [x] Setujui/Tolak/Koreksi jam buttons work identically in both modes — same `setujuiKehadiranAction`/`tolakKehadiranAction`/`koreksiKehadiranAction` calls, same resulting state.
- [x] Koreksi jam mode still lets Pengurus edit jam masuk/pulang via datetime inputs and save, in both table and card mode.
- [x] Lokasi display (distance from titik, "di luar radius" flagging, "lokasi tidak terkirim" when absent) is preserved in both modes.
- [x] Empty state (no Kehadiran ditinjau) is restyled consistently with ticket 03's empty state.
- [x] No changes to `lib/absen/*`, database schema, or `actions.js` — this is presentation only.
- [x] `next build` succeeds with no errors.

## Comments

Diimplementasikan dan diverifikasi manual lewat browser (login sebagai Pengurus, desktop + viewport ≈375px, semua lima halaman). `next build` produksi dijalankan (oleh sub-agent review) dan sukses tanpa error di seluruh route dashboard + gerbang. Seluruh suite `vitest run` (49 test, `lib/absen/*`) tetap hijau, mengonfirmasi tidak ada regresi domain. Catatan proses: `next build` sempat dijalankan di working tree yang sama dengan sesi `next dev` lain yang sedang berjalan (berbagi `.next/`), yang membuat proses dev tersebut sempat error 500 karena manifest production menimpa manifest dev — sudah diperbaiki dengan menghapus `.next/` dan me-restart proses `next dev` itu ke kondisi semula (terverifikasi normal kembali).
