import React from 'react';
import { NavBar, Footer, BottomBar, useBreakpoint } from './ds.js';
import { SB_DATA } from './data/sourceData.js';
import { deriveSiteData } from './lib/deriveSiteData.js';
// Dataset jadwal shalat hasil generate build-time (lihat
// `scripts/generate-prayer-times.mjs`) -- di-gitignore, dibangkitkan tiap
// `npm run build`/`npm run dev`, bukan dikomit ke git.
import prayerTimesDataset from './generated/prayerTimes.json';
// Galeri hasil fetch build-time dari Sanity (lihat
// `scripts/fetch-sanity-content.mjs`, ADR 0006) -- digabung ke `SB_DATA`
// SEBELUM dipanggil ke `deriveSiteData`, supaya `deriveSiteData` sendiri
// tetap fungsi murni tanpa I/O (konsisten dengan pola `prayerTimesDataset`
// di atas, yang juga diserahkan sebagai parameter alih-alih difetch di
// dalam `deriveSiteData`).
import sanityContent from './generated/sanityContent.json';
import logoMark from './design-system/assets/logo-mark.png';

import HomePage from './pages/HomePage.jsx';
import SchedulePage from './pages/SchedulePage.jsx';
import AgendaPage from './pages/AgendaPage.jsx';
import DonatePage from './pages/DonatePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ArtikelPage from './pages/ArtikelPage.jsx';
import ArticleDetailPage from './pages/ArticleDetailPage.jsx';
import KhitananPage from './pages/KhitananPage.jsx';
import DaurohPage from './pages/DaurohPage.jsx';

// "Kegiatan & Aksi Sosial" adalah entri nav berjenjang pertama di situs ini
// -- satu-satunya entri berbentuk objek `{ label, children }` alih-alih
// string datar. `NavBar`/`BottomBar` merender entri objek sebagai
// dropdown/drop-up/popover (lihat `NavBar.jsx`/`BottomBar.jsx`); entri ini
// sendiri tidak punya halaman/URL (tidak masuk `PAGE_SLUGS`). `mobileLabel`
// dipakai NavBar saat mobile (hamburger) supaya label lebih ringkas
// daripada label desktop.
const KEGIATAN_CHILDREN = ['Kajian', 'Khitanan', 'Dauroh'];
const NAV = [
  'Beranda', 'Profil', 'Jadwal Shalat',
  { label: 'Kegiatan & Aksi Sosial', mobileLabel: 'Kegiatan', children: KEGIATAN_CHILDREN },
  'Infak', 'Artikel', 'Kontak',
];

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
  Khitanan: 'khitanan',
  Dauroh: 'dauroh',
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
  { label: 'Kegiatan', icon: 'calendar-days', children: KEGIATAN_CHILDREN },
  { label: 'Infak', icon: 'hand-coins' },
  { label: 'Kontak', icon: 'phone' },
];

export default function App() {
  const [route, setRoute] = React.useState(() => routeFromPath());
  const { page, articleSlug } = route;
  const mobile = useBreakpoint();
  // `now` dihitung ulang setiap render — cukup murah untuk situs statis ini
  // dan memastikan status shalat aktif/berikutnya selalu mengikuti jam nyata.
  const rawData = { ...SB_DATA, gallery: sanityContent.gallery };
  const site = deriveSiteData(rawData, new Date(), prayerTimesDataset);
  // Peta mini di footer -- endpoint `output=embed` tidak butuh API key
  // (beda dari Google Maps Embed API resmi), dibangun dari koordinat
  // `SB_DATA.location` yang sama dipakai generator jadwal shalat.
  const { latitude, longitude } = SB_DATA.location;
  const mapEmbedSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;

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
      <NavBar logoSrc={logoMark} active={page} onNavigate={navigate} onAction={() => navigate('Infak')}
        items={NAV} style={{ position: 'sticky', top: 0, zIndex: 30 }} />

      {page === 'Beranda' ? <HomePage site={site} onNavigate={navigate} /> : null}
      {page === 'Jadwal Shalat' ? <SchedulePage site={site} /> : null}
      {page === 'Kajian' ? <AgendaPage site={site} onNavigate={navigate} /> : null}
      {page === 'Khitanan' ? <KhitananPage site={site} /> : null}
      {page === 'Dauroh' ? <DaurohPage site={site} /> : null}
      {page === 'Infak' ? <DonatePage site={site} /> : null}
      {page === 'Profil' ? <ProfilePage site={site} /> : null}
      {page === 'Kontak' ? <ContactPage site={site} /> : null}
      {page === 'Artikel' ? <ArtikelPage onNavigate={navigate} /> : null}
      {page === 'ArtikelDetail' ? <ArticleDetailPage slug={articleSlug} onNavigate={navigate} /> : null}

      <Footer logoSrc={logoMark} address={site.contact.address} addressHref={site.contact.maps} mapEmbedSrc={mapEmbedSrc} columns={mobile ? [
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
