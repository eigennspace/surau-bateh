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
import ArtikelPage from './pages/ArtikelPage.jsx';
import ArticleDetailPage from './pages/ArticleDetailPage.jsx';

const NAV = ['Beranda', 'Profil', 'Jadwal Shalat', 'Kajian', 'Infak', 'Artikel', 'Kontak'];

// Peta halaman <-> slug URL (path bersih, tanpa `#`) supaya navigasi antar
// "halaman" tercermin di address bar -- tanpa ini, refresh selalu balik ke
// Beranda karena state halaman cuma hidup di memori React. Path dibangun di
// atas `base` Vite (`/`) -- situs disajikan di root domain kustom
// (suraubateh.web.id), bukan subpath GitHub Pages bawaan. Di GitHub Pages,
// `public/404.html` + skrip pemulihan di `index.html` menangani
// refresh/deep-link langsung ke path ini (lihat catatan di kedua file itu).
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');
const PAGE_SLUGS = {
  Beranda: '',
  Profil: 'profil',
  'Jadwal Shalat': 'jadwal-shalat',
  Kajian: 'kajian',
  Infak: 'infak',
  Artikel: 'artikel',
  Kontak: 'kontak',
};
const SLUG_PAGES = Object.fromEntries(
  Object.entries(PAGE_SLUGS).filter(([, slug]) => slug).map(([page, slug]) => [slug, page])
);

// `ArtikelDetail` bukan bagian `PAGE_SLUGS` (satu-ke-satu halaman<->slug) --
// path-nya dinamis (`/artikel/<slug artikel>`), jadi ditangani terpisah di
// `pathForPage`/`routeFromPath` alih-alih lewat peta tetap.
function pathForPage(page, articleSlug) {
  if (page === 'ArtikelDetail') return `${BASE_PATH}/artikel/${articleSlug || ''}`;
  const slug = PAGE_SLUGS[page] ?? '';
  return slug ? `${BASE_PATH}/${slug}` : `${BASE_PATH}/`;
}

function routeFromPath() {
  const path = window.location.pathname;
  const rel = path.startsWith(BASE_PATH) ? path.slice(BASE_PATH.length) : path;
  const trimmed = rel.replace(/^\/+|\/+$/g, '');
  const segments = trimmed ? trimmed.split('/') : [];
  if (segments[0] === 'artikel') {
    if (segments.length >= 2 && segments[1]) return { page: 'ArtikelDetail', articleSlug: segments[1] };
    return { page: 'Artikel', articleSlug: undefined };
  }
  return { page: SLUG_PAGES[trimmed] || 'Beranda', articleSlug: undefined };
}
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
  const [route, setRoute] = React.useState(() => routeFromPath());
  const { page, articleSlug } = route;
  const mobile = useBreakpoint();
  // `now` dihitung ulang setiap render — cukup murah untuk situs statis ini
  // dan memastikan status shalat aktif/berikutnya selalu mengikuti jam nyata.
  const site = deriveSiteData(SB_DATA, new Date(), prayerTimesDataset);
  const bundleHasMobileNav = !!BottomBar;

  // Navigasi lewat sini supaya URL (path bersih) selalu sinkron dengan
  // halaman yang tampil -- ini yang bikin refresh/back/forward/bookmark
  // tetap di halaman yang benar, bukan balik ke Beranda. `slug` kedua hanya
  // dipakai untuk `navigate('ArtikelDetail', slug)`.
  const navigate = React.useCallback((next, slug) => {
    const path = pathForPage(next, slug);
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    setRoute({ page: next, articleSlug: slug });
  }, []);

  // Sinkronkan state dengan path saat back/forward browser.
  React.useEffect(() => {
    const onPopState = () => setRoute(routeFromPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Scroll ke atas tiap kali halaman (atau artikel) berganti -- tanpa ini,
  // konten cuma di-swap di tempat (bukan reload beneran) sehingga posisi
  // scroll lama ikut terbawa ke halaman baru.
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, articleSlug]);

  return (
    <div style={{ paddingBottom: mobile ? 64 : 0 }}>
      {(mobile && !bundleHasMobileNav)
        ? <MobileHeader active={page} onNavigate={navigate} onAction={() => navigate('Infak')} />
        : <NavBar logoSrc={logoMark} active={page} onNavigate={navigate} onAction={() => navigate('Infak')}
            items={NAV} style={{ position: 'sticky', top: 0, zIndex: 30 }} />}

      {page === 'Beranda' ? <HomePage site={site} onNavigate={navigate} /> : null}
      {page === 'Jadwal Shalat' ? <SchedulePage site={site} /> : null}
      {page === 'Kajian' ? <AgendaPage site={site} onNavigate={navigate} /> : null}
      {page === 'Infak' ? <DonatePage site={site} /> : null}
      {page === 'Profil' ? <ProfilePage site={site} /> : null}
      {page === 'Kontak' ? <ContactPage site={site} /> : null}
      {page === 'Artikel' ? <ArtikelPage onNavigate={navigate} /> : null}
      {page === 'ArtikelDetail' ? <ArticleDetailPage slug={articleSlug} onNavigate={navigate} /> : null}

      <Footer logoSrc={logoMark} columns={mobile ? [
        { title: 'Tautan', links: ['Jadwal Shalat', 'Kajian Rutin', 'Infak & Sedekah', 'Profil', 'Kontak'] },
      ] : [
        { title: 'Layanan', links: ['Jadwal Shalat', 'Kajian Rutin', 'Silat Tradisi', 'Santunan'] },
        { title: 'Surau', links: ['Profil', 'Pengurus', 'Laporan Kas', 'Kontak'] },
        { title: 'Jamaah', links: ['Daftar Kajian', 'Infak & Sedekah', 'Pengumuman'] },
      ]} />
      <BottomBar items={BB_ITEMS} active={page} onNavigate={navigate} />
    </div>
  );
}
