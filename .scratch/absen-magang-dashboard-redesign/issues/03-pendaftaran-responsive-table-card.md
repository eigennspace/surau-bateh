# 03 — Pendaftaran: responsive table/card view + empty state

**What to build:** Build a shared, reusable table↔card responsive pattern (table on desktop, one card per row on narrow screens) and apply it to the Pendaftaran page. On mobile, each calon Peserta renders as a card showing all fields (nama, asal kampus, jurusan, NIM, WhatsApp, Periode PL) with full-width Setujui/Tolak buttons; the inline PIN reveal after approving stays in the same card. On desktop, the existing table layout is kept (now restyled). Also restyle the empty state ("Tidak ada Pendaftaran yang menunggu saat ini.") using `Card`/`Icon` instead of a plain `<p>`.

**Blocked by:** 01 (needs the new shell/page-title plumbing in place)

**Status:** done

- [x] At desktop widths, Pendaftaran renders as a table (restyled, same columns/data as today).
- [x] At mobile widths (≈375px), Pendaftaran renders as one card per calon Peserta, showing all the same fields, with no horizontal scrolling needed.
- [x] Setujui/Tolak buttons work identically in both modes — same `setujuiPendaftaranAction`/`tolakPendaftaranAction` calls, same resulting state.
- [x] After approving, the generated PIN is shown inline in that Peserta's card/row in both table and card mode, exactly as today.
- [x] Empty state (no Pendaftaran menunggu) is restyled with `Card`/`Icon`, not a plain paragraph.
- [x] The table↔card pattern is built as a reusable piece (component/wrapper), not one-off markup only usable by this page — ticket 04 will reuse it.
- [x] No changes to `lib/absen/*`, database schema, or `actions.js` — this is presentation only.
- [x] `next build` succeeds with no errors.

## Comments

Diimplementasikan dan diverifikasi manual lewat browser (login sebagai Pengurus, desktop + viewport ≈375px, semua lima halaman). `next build` produksi dijalankan (oleh sub-agent review) dan sukses tanpa error di seluruh route dashboard + gerbang. Seluruh suite `vitest run` (49 test, `lib/absen/*`) tetap hijau, mengonfirmasi tidak ada regresi domain. Catatan proses: `next build` sempat dijalankan di working tree yang sama dengan sesi `next dev` lain yang sedang berjalan (berbagi `.next/`), yang membuat proses dev tersebut sempat error 500 karena manifest production menimpa manifest dev — sudah diperbaiki dengan menghapus `.next/` dan me-restart proses `next dev` itu ke kondisi semula (terverifikasi normal kembali).
