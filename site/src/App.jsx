import React from 'react';
import { NavBar, Footer, BottomBar, Icon, Button, useBreakpoint } from './ds.js';
import { SB_DATA } from './data/sourceData.js';
import { deriveSiteData } from './lib/deriveSiteData.js';
// Dataset jadwal shalat hasil generate build-time (lihat
// `scripts/generate-prayer-times.mjs`) -- di-gitignore, dibangkitkan tiap
// `npm run build`/`npm run dev`, bukan dikomit ke git.
import prayerTimesDataset from './generated/prayerTimes.json';
import logoMark from './design-system/assets/logo-mark.png';

import HomePage from './pages/HomePage.jsx';
import SchedulePage from './pages/SchedulePage.jsx';
import AgendaPage from './pages/AgendaPage.jsx';
import DonatePage from './pages/DonatePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ContactPage from './pages/ContactPage.jsx';

const NAV = ['Beranda', 'Profil', 'Jadwal Shalat', 'Kajian', 'Infak', 'Kontak'];
const BB_ITEMS = [
  { label: 'Beranda', icon: 'house' },
  { label: 'Jadwal Shalat', icon: 'clock', short: 'Jadwal' },
  { label: 'Kajian', icon: 'calendar-days' },
  { label: 'Infak', icon: 'hand-coins' },
  { label: 'Kontak', icon: 'phone' },
];

function MobileHeader({ active, onNavigate, onAction }) {
  const [open, setOpen] = React.useState(false);
  const go = it => { setOpen(false); onNavigate(it); };
  return (
    <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: '12px var(--space-5)', flexWrap: 'wrap',
      background: 'rgba(253,251,246,.88)', backdropFilter: 'var(--blur-glass)', borderBottom: '1px solid var(--border-hairline)',
      position: 'sticky', top: 0, zIndex: 30 }}>
      <img src={logoMark} alt="" style={{ height: 32 }} />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span style={{ fontWeight: 'var(--fw-extrabold)', fontSize: 'var(--fs-body)', color: 'var(--maroon-700)' }}>Surau Bateh Lori</span>
        <span style={{ fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Kota Padang</span>
      </div>
      <button type="button" aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}
        style={{ marginLeft: 'auto', width: 44, height: 44, display: 'grid', placeItems: 'center', cursor: 'pointer',
          background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-pill)', color: 'var(--maroon-700)' }}>
        <Icon name={open ? 'x' : 'menu'} size={20} />
      </button>
      {open ? (
        <nav style={{ flexBasis: '100%', display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 'var(--space-4)' }}>
          {NAV.map(it => (
            <a key={it} href="#" onClick={e => { e.preventDefault(); go(it); }}
              style={{ textDecoration: 'none', font: 'var(--text-label)', fontSize: 'var(--fs-body-lg)', minHeight: 48,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 var(--space-4)',
                borderRadius: 'var(--radius-md)', color: it === active ? 'var(--maroon-700)' : 'var(--text-body)',
                background: it === active ? 'var(--surface-brand-soft)' : 'transparent' }}>
              {it}<Icon name="chevron-right" size={16} style={{ color: 'var(--text-faint)' }} />
            </a>
          ))}
          <Button tone="primary" size="lg" fullWidth icon="hand-coins" style={{ marginTop: 'var(--space-3)' }}
            onClick={() => { setOpen(false); onAction(); }}>Salurkan Infak</Button>
        </nav>
      ) : null}
    </header>
  );
}

export default function App() {
  const [page, setPage] = React.useState('Beranda');
  const mobile = useBreakpoint();
  // `now` dihitung ulang setiap render — cukup murah untuk situs statis ini
  // dan memastikan status shalat aktif/berikutnya selalu mengikuti jam nyata.
  const site = deriveSiteData(SB_DATA, new Date(), prayerTimesDataset);
  const bundleHasMobileNav = !!BottomBar;

  return (
    <div style={{ paddingBottom: mobile ? 64 : 0 }}>
      {(mobile && !bundleHasMobileNav)
        ? <MobileHeader active={page} onNavigate={setPage} onAction={() => setPage('Infak')} />
        : <NavBar logoSrc={logoMark} active={page} onNavigate={setPage} onAction={() => setPage('Infak')}
            items={NAV} style={{ position: 'sticky', top: 0, zIndex: 30 }} />}

      {page === 'Beranda' ? <HomePage site={site} onNavigate={setPage} /> : null}
      {page === 'Jadwal Shalat' ? <SchedulePage site={site} /> : null}
      {page === 'Kajian' ? <AgendaPage site={site} onNavigate={setPage} /> : null}
      {page === 'Infak' ? <DonatePage site={site} /> : null}
      {page === 'Profil' ? <ProfilePage site={site} /> : null}
      {page === 'Kontak' ? <ContactPage site={site} /> : null}

      <Footer logoSrc={logoMark} columns={mobile ? [
        { title: 'Tautan', links: ['Jadwal Shalat', 'Kajian Rutin', 'Infak & Sedekah', 'Profil', 'Kontak'] },
      ] : [
        { title: 'Layanan', links: ['Jadwal Shalat', 'Kajian Rutin', 'Silat Tradisi', 'Santunan'] },
        { title: 'Surau', links: ['Profil', 'Pengurus', 'Laporan Kas', 'Kontak'] },
        { title: 'Jamaah', links: ['Daftar Kajian', 'Infak & Sedekah', 'Pengumuman'] },
      ]} />
      <BottomBar items={BB_ITEMS} active={page} onNavigate={setPage} />
    </div>
  );
}
