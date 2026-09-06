'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './ds/Sidebar.jsx';
import { Icon } from './ds/Icon.jsx';

// Lima menu dashboard -- `href`/`label` dipakai nav (sidebar + drawer),
// `title` dipakai top bar mobile, dipetakan langsung dari <h1> tiap halaman
// (lihat spec.md, Implementation Decisions: "Judul halaman untuk top bar").
const NAV_LINKS = [
  { href: '/dashboard', label: 'Beranda', title: 'Dashboard Pengurus', icon: 'layout-dashboard' },
  { href: '/dashboard/pendaftaran', label: 'Pendaftaran', title: 'Pendaftaran Menunggu', icon: 'user-plus' },
  { href: '/dashboard/jendela-absen', label: 'Jendela Absen', title: 'Jendela Absen', icon: 'map-pin' },
  { href: '/dashboard/kehadiran', label: 'Kehadiran Ditinjau', title: 'Kehadiran Ditinjau', icon: 'clipboard-check' },
  { href: '/dashboard/laporan', label: 'Laporan', title: 'Generate Laporan', icon: 'file-text' },
];

// Shell admin-panel `/dashboard/*` -- berbeda dari GerbangShell bermerek
// dipakai gerbang (/login, /daftar, /absen). Sidebar tetap di desktop,
// berubah jadi drawer slide-out di mobile dibuka lewat hamburger pada top
// bar ringkas (lihat spec.md, Implementation Decisions & User Stories 5-9).
export function DashboardShell({ username, logoutAction, children }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const halamanAktif = NAV_LINKS.find(link => link.href === pathname);
  const judul = halamanAktif?.title ?? 'Dashboard Pengurus';

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-shell__sidebar" aria-label="Navigasi dashboard">
        <Sidebar links={NAV_LINKS} pathname={pathname} username={username} logoutAction={logoutAction} />
      </aside>

      <div className="dashboard-shell__main">
        <header className="dashboard-shell__topbar">
          <button
            type="button"
            className="dashboard-shell__hamburger"
            aria-label="Buka navigasi"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <Icon name="menu" size={22} />
          </button>
          <h1 className="dashboard-shell__topbar-title">{judul}</h1>
        </header>

        <div className="dashboard-shell__content">{children}</div>
      </div>

      {drawerOpen && (
        <>
          <button
            type="button"
            className="dashboard-shell__overlay"
            aria-label="Tutup navigasi"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="dashboard-shell__drawer" aria-label="Navigasi dashboard (mobile)">
            <Sidebar
              links={NAV_LINKS}
              pathname={pathname}
              username={username}
              logoutAction={logoutAction}
              onNavigate={() => setDrawerOpen(false)}
            />
          </aside>
        </>
      )}
    </div>
  );
}
