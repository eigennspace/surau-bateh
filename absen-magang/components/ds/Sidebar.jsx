import Link from 'next/link';
import { Icon } from './Icon.jsx';
import { Button } from './Button.jsx';

// Isi navigasi bersama dipakai baik oleh sidebar desktop maupun drawer
// mobile di DashboardShell.jsx -- sumber data (links, highlight, username,
// tombol Keluar) sama, hanya wadah luar yang beda (lihat spec.md,
// Implementation Decisions: "Sidebar ... dipakai desktop sidebar dan mobile
// drawer, sumber data yang sama").
export function Sidebar({ links, pathname, username, logoutAction, onNavigate }) {
  return (
    <>
      <div className="dashboard-shell__brand">Surau Bateh Lori</div>
      <nav className="dashboard-shell__nav">
        {links.map(link => {
          const aktif = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`dashboard-nav-item${aktif ? ' dashboard-nav-item--active' : ''}`}
              aria-current={aktif ? 'page' : undefined}
            >
              <Icon name={link.icon} size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="dashboard-shell__footer">
        <div className="dashboard-shell__username">
          <Icon name="user-round" size={16} />
          {username}
        </div>
        <form action={logoutAction}>
          <Button type="submit" tone="secondary" size="sm" icon="log-out" fullWidth>
            Keluar
          </Button>
        </form>
      </div>
    </>
  );
}
