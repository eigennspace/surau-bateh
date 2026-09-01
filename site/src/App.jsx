import React from 'react';
import { NavBar, Footer, BottomBar, useBreakpoint } from './ds.js';
import { SB_DATA } from './data/sourceData.js';
import { deriveSiteData } from './lib/deriveSiteData.js';
import { NAV, BB_ITEMS, pathForPage, routeFromPath } from './lib/navigation.js';
// Galeri hasil fetch build-time dari Sanity (lihat
// `scripts/fetch-sanity-content.mjs`, ADR 0006) -- digabung ke `SB_DATA`
// SEBELUM dipanggil ke `deriveSiteData`, supaya `deriveSiteData` sendiri
// tetap fungsi murni tanpa I/O.
import sanityContent from './generated/sanityContent.json';
import logoMark from './design-system/assets/logo-mark.png';

import HomePage from './pages/HomePage.jsx';
import AgendaPage from './pages/AgendaPage.jsx';
import DonatePage from './pages/DonatePage.jsx';
import ProfilSurauPage from './pages/ProfilSurauPage.jsx';
import ProfilSalikPage from './pages/ProfilSalikPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ArtikelPage from './pages/ArtikelPage.jsx';
import ArticleDetailPage from './pages/ArticleDetailPage.jsx';
import KhitananPage from './pages/KhitananPage.jsx';
import DaurohPage from './pages/DaurohPage.jsx';
import TawajjuhPage from './pages/TawajjuhPage.jsx';
import KonselingPage from './pages/KonselingPage.jsx';
import BaktiSosialPage from './pages/BaktiSosialPage.jsx';
import SilaturahmiPage from './pages/SilaturahmiPage.jsx';

// Model navigasi (grup, daftar tiap permukaan, peta slug, penerjemah path)
// hidup di `lib/navigation.js` sebagai data murni supaya bisa diuji tanpa DOM.
// Path dibangun di atas `base` Vite (`/`) -- situs disajikan di root domain
// kustom (suraubateh.web.id), bukan subpath GitHub Pages bawaan. Di GitHub
// Pages, `public/404.html` + skrip pemulihan di `index.html` menangani
// refresh/deep-link langsung ke path ini (lihat catatan di kedua file itu).
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');
const pathFor = (page, articleSlug) => pathForPage(page, articleSlug, BASE_PATH);
const currentRoute = () => routeFromPath(window.location.pathname, BASE_PATH);

export default function App() {
  const [route, setRoute] = React.useState(currentRoute);
  const { page, articleSlug } = route;
  const mobile = useBreakpoint();
  // `now` dihitung ulang setiap render — cukup murah untuk situs statis ini
  // dan memastikan penanda "kegiatan hari ini" mengikuti tanggal nyata.
  // Seksi video Profil Surau (hasil `resolveVideo`, lihat ADR 0011) DIGABUNG
  // ke cabang `profilSurau` yang sudah ada di sini -- persis seperti galeri
  // di atas -- supaya `ProfilSurauPage` tetap membaca satu objek tanpa perlu
  // tahu bagian mana yang dari Sumber Data dan bagian mana dari Sanity.
  // `sanityContent.video` bisa `null` (belum di-publish/URL tidak sah), dan
  // itu diteruskan apa adanya.
  const rawData = {
    ...SB_DATA,
    gallery: sanityContent.gallery,
    profilSurau: { ...SB_DATA.profilSurau, video: sanityContent.video },
  };
  const site = deriveSiteData(rawData, new Date());
  // Peta mini di footer -- endpoint `output=embed` tidak butuh API key
  // (beda dari Google Maps Embed API resmi), dibangun dari koordinat
  // `SB_DATA.location`.
  const { latitude, longitude } = SB_DATA.location;
  const mapEmbedSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;

  // Navigasi lewat sini supaya URL (path bersih) selalu sinkron dengan
  // halaman yang tampil -- ini yang bikin refresh/back/forward/bookmark
  // tetap di halaman yang benar, bukan balik ke Beranda. `slug` kedua hanya
  // dipakai untuk `navigate('ArtikelDetail', slug)`.
  const navigate = React.useCallback((next, slug) => {
    const path = pathFor(next, slug);
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    setRoute({ page: next, articleSlug: slug });
  }, []);

  // Sinkronkan state dengan path saat back/forward browser.
  React.useEffect(() => {
    const onPopState = () => setRoute(currentRoute());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Pengunjung yang masuk lewat slug lama (mis. `/kajian`) sudah berada di
  // halaman yang benar; di sini URL-nya ditulis ulang ke slug kanonik.
  // `replaceState`, bukan `pushState` -- slug lama tidak layak jadi entri
  // riwayat sendiri, kalau tidak tombol back akan memantul balik ke sana.
  React.useEffect(() => {
    if (!route.canonicalize) return;
    window.history.replaceState(null, '', pathFor(route.page));
    setRoute(prev => ({ ...prev, canonicalize: false }));
  }, [route.canonicalize, route.page]);

  // Scroll ke atas tiap kali halaman (atau artikel) berganti -- tanpa ini,
  // konten cuma di-swap di tempat (bukan reload beneran) sehingga posisi
  // scroll lama ikut terbawa ke halaman baru.
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, articleSlug]);

  return (
    <div style={{ paddingBottom: mobile ? 64 : 0 }}>
      <NavBar logoSrc={logoMark} active={page} onNavigate={navigate}
        items={NAV} style={{ position: 'sticky', top: 0, zIndex: 30 }} />

      {page === 'Beranda' ? <HomePage site={site} onNavigate={navigate} /> : null}
      {page === 'Jadwal Kegiatan' ? <AgendaPage site={site} onNavigate={navigate} /> : null}
      {page === 'Tawajjuh & Kajian Rutin Ihsan' ? <TawajjuhPage site={site} /> : null}
      {page === 'Konseling Psikoterapi Tasawuf' ? <KonselingPage site={site} /> : null}
      {page === 'Khitanan' ? <KhitananPage site={site} /> : null}
      {page === 'Dauroh' ? <DaurohPage site={site} /> : null}
      {page === 'Bakti Sosial' ? <BaktiSosialPage site={site} /> : null}
      {page === 'Silaturahmi & Kerjasama Lembaga' ? <SilaturahmiPage site={site} /> : null}
      {page === 'Infak' ? <DonatePage site={site} /> : null}
      {page === 'Profil Surau' ? <ProfilSurauPage site={site} /> : null}
      {page === 'Profil Salik' ? <ProfilSalikPage site={site} /> : null}
      {page === 'Kontak' ? <ContactPage site={site} /> : null}
      {page === 'Artikel' ? <ArtikelPage onNavigate={navigate} /> : null}
      {page === 'ArtikelDetail' ? <ArticleDetailPage slug={articleSlug} onNavigate={navigate} /> : null}

      <Footer logoSrc={logoMark} address={site.contact.address} addressHref={site.contact.maps} mapEmbedSrc={mapEmbedSrc} columns={mobile ? [
        { title: 'Tautan', links: ['Jadwal Kegiatan', 'Kajian Rutin', 'Infak & Sedekah', 'Profil', 'Kontak'] },
      ] : [
        { title: 'Layanan', links: ['Jadwal Kegiatan', 'Kajian Rutin', 'Silat Tradisi', 'Santunan'] },
        { title: 'Surau', links: ['Profil', 'Pengurus', 'Laporan Kas', 'Kontak'] },
        { title: 'Jamaah', links: ['Daftar Kajian', 'Infak & Sedekah', 'Pengumuman'] },
      ]} />
      <BottomBar items={BB_ITEMS} active={page} onNavigate={navigate} />
    </div>
  );
}
