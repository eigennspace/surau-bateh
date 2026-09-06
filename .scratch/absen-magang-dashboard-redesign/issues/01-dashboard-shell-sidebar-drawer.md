# 01 — Dashboard shell: sidebar, mobile drawer, active-page highlight, logout

**What to build:** Replace the current flat `<nav className="dashboard-nav">` in `dashboard/layout.jsx` with a new admin-panel shell used by all `/dashboard/*` pages. On desktop, a permanent sidebar shows the five nav links (Beranda, Pendaftaran, Jendela Absen, Kehadiran Ditinjau, Laporan) with the current page highlighted, plus a footer showing the logged-in Pengurus's username and a Keluar button. On mobile, the sidebar becomes a slide-out drawer with identical content (links, highlight, username, Keluar), opened via a hamburger button in a minimal top bar that otherwise shows only the current page's title; the drawer closes automatically after picking a link or tapping outside it. All five existing dashboard pages keep rendering exactly as they do today *inside* this new shell — no page content changes in this ticket.

**Blocked by:** None — can start immediately

**Status:** done

- [x] Desktop: sidebar is always visible (no collapse-to-icon toggle), shows all five links, and the link matching the current route is visually highlighted.
- [x] Desktop: sidebar footer shows the current Pengurus's username and a Keluar button that calls the existing `logoutPengurus` action and ends the session exactly as before.
- [x] Mobile (≈375px wide): top bar shows only a hamburger button and the current page's title — no nav links, no username/logout duplicated here.
- [x] Mobile: tapping the hamburger opens a drawer containing the same five links + active highlight + username + Keluar button as the desktop sidebar.
- [x] Mobile: the drawer closes automatically when a link is tapped (navigating to that page) or when the area outside the drawer is tapped.
- [x] Each of the five dashboard pages (Beranda, Pendaftaran, Jendela Absen, Kehadiran Ditinjau, Laporan) is reachable and renders its existing content unchanged inside the new shell, on both desktop and mobile widths.
- [x] `next build` succeeds with no errors introduced by this change.
- [x] No changes to `lib/absen/*`, database schema, session/auth logic, or any `actions.js`.

## Comments

Diimplementasikan dan diverifikasi manual lewat browser (login sebagai Pengurus, desktop + viewport ≈375px, semua lima halaman). `next build` produksi dijalankan (oleh sub-agent review) dan sukses tanpa error di seluruh route dashboard + gerbang. Seluruh suite `vitest run` (49 test, `lib/absen/*`) tetap hijau, mengonfirmasi tidak ada regresi domain. Catatan proses: `next build` sempat dijalankan di working tree yang sama dengan sesi `next dev` lain yang sedang berjalan (berbagi `.next/`), yang membuat proses dev tersebut sempat error 500 karena manifest production menimpa manifest dev — sudah diperbaiki dengan menghapus `.next/` dan me-restart proses `next dev` itu ke kondisi semula (terverifikasi normal kembali).
