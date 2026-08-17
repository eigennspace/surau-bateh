// navigation — model navigasi situs sebagai data murni: grup, daftar entri
// tiap permukaan (navbar desktop, burger mobile, bottom bar), peta halaman
// <-> slug, dan penerjemahan path <-> halaman. Dipisah dari `App.jsx` supaya
// strukturnya bisa diuji tanpa DOM, dan supaya ketiga permukaan navigasi
// tidak bisa menyimpang satu sama lain — semuanya dibangun dari `GROUPS`.

// Halaman Program dikelompokkan ke tiga grup navigasi. Grup dirender sebagai
// dropdown (desktop) / drop-up (burger) / popover (bottom bar) oleh `NavBar`
// dan `BottomBar`. Grup sendiri tidak punya halaman atau URL — karena itu
// tidak muncul di `PAGE_SLUGS`.
export const GROUPS = {
  Kegiatan: ['Jadwal Kegiatan', 'Tawajjuh & Kajian Rutin Ihsan', 'Konseling Psikoterapi Tasawuf'],
  Dakwah: ['Dauroh'],
  Sosial: ['Khitanan', 'Bakti Sosial', 'Silaturahmi & Kerjasama Lembaga'],
};

// Grup "Profil" berperilaku sama persis dengan ketiga grup di atas (dropdown
// navbar / drop-up burger), tapi SENGAJA tidak jadi anggota `GROUPS` -- lihat
// ADR 0008. Dua alasannya: (1) `GROUPS` berarti "grup Halaman Program", dan
// Profil Surau/Profil Salik bukan program (lihat istilah "Halaman Profil" di
// CONTEXT.md); (2) `GROUPS` adalah jaminan bahwa navbar dan bottom bar tidak
// menyimpang, sementara Profil memang hadir di navbar saja -- bottom bar
// tetap lima tab. Jadi kalau Anda menghitung empat dropdown di navbar tapi
// `GROUPS` cuma berisi tiga: itu disengaja, bukan yang terlupa didaftarkan.
export const PROFIL = {
  Profil: ['Profil Surau', 'Profil Salik'],
};

// Gabungan semua grup navigasi apa pun jenisnya. Dipakai oleh aturan yang
// berlaku untuk SETIAP grup tanpa kecuali (tiap anak punya slug sendiri, grup
// sendiri tidak punya slug, tidak ada halaman yang muncul dua kali).
export const ALL_GROUPS = { ...GROUPS, ...PROFIL };

// Satu daftar untuk navbar desktop dan burger mobile. Tidak ada lagi tombol
// CTA "Salurkan Infak" di navbar (dicabut atas permintaan pengurus, di kedua
// tampilan), jadi entri teks "Infak" di sini adalah SATU-SATUNYA jalur menuju
// halaman Infak — bottom bar mobile pun tidak punya tab Infak. Jangan
// dihapus; ada test yang menahannya.
// "Jadwal Kegiatan" tidak punya entri sendiri di sini — ia sudah jadi anak
// pertama grup Kegiatan, dan entri terpisah berarti dua jalur ke halaman yang
// sama bersebelahan.
export const NAV = [
  'Beranda',
  { label: 'Profil', children: PROFIL.Profil },
  { label: 'Kegiatan', children: GROUPS.Kegiatan },
  { label: 'Dakwah', children: GROUPS.Dakwah },
  { label: 'Sosial', children: GROUPS.Sosial },
  'Infak', 'Artikel', 'Kontak',
];

// Bottom bar mobile: lima tab, tiga di antaranya grup ber-popover. Infak
// tidak punya tab di sini — jalurnya adalah entri teks di burger menu.
export const BB_ITEMS = [
  { label: 'Beranda', icon: 'house' },
  { label: 'Kegiatan', icon: 'calendar-days', children: GROUPS.Kegiatan },
  { label: 'Dakwah', icon: 'megaphone', children: GROUPS.Dakwah },
  { label: 'Sosial', icon: 'heart-handshake', children: GROUPS.Sosial },
  { label: 'Artikel', icon: 'newspaper' },
];

// Peta halaman <-> slug URL (path bersih, tanpa `#`) supaya navigasi antar
// "halaman" tercermin di address bar — tanpa ini, refresh selalu balik ke
// Beranda karena state halaman cuma hidup di memori React.
export const PAGE_SLUGS = {
  Beranda: '',
  'Profil Surau': 'profil-surau',
  'Profil Salik': 'profil-salik',
  'Jadwal Kegiatan': 'jadwal-kegiatan',
  'Tawajjuh & Kajian Rutin Ihsan': 'tawajjuh',
  'Konseling Psikoterapi Tasawuf': 'konseling',
  Dauroh: 'dauroh',
  Khitanan: 'khitanan',
  'Bakti Sosial': 'bakti-sosial',
  'Silaturahmi & Kerjasama Lembaga': 'silaturahmi',
  Infak: 'infak',
  Artikel: 'artikel',
  Kontak: 'kontak',
};

const SLUG_PAGES = Object.fromEntries(
  Object.entries(PAGE_SLUGS).filter(([, slug]) => slug).map(([page, slug]) => [slug, page]),
);

// Slug lama yang tetap dilayani supaya tautan yang sudah tersebar (grup
// WhatsApp jamaah, bookmark) tidak mati. Berbeda dari `SLUG_PAGES`: pengunjung
// sampai di halaman yang benar, lalu URL-nya ditulis ulang ke slug kanonik —
// situs ini static export di GitHub Pages, jadi tidak ada redirect sisi server.
export const LEGACY_SLUGS = {
  kajian: 'Jadwal Kegiatan',
  // `/profil` dulu satu halaman tunggal; isinya kini jadi "Profil Surau",
  // bertetangga dengan "Profil Salik" di bawah grup Profil.
  profil: 'Profil Surau',
};

/**
 * Path lengkap sebuah halaman, dibangun di atas `basePath` (dari `base` Vite).
 * `ArtikelDetail` bukan bagian `PAGE_SLUGS` (satu-ke-satu halaman<->slug) —
 * path-nya dinamis (`/artikel/<slug artikel>`), jadi ditangani terpisah.
 */
export function pathForPage(page, articleSlug, basePath = '') {
  if (page === 'ArtikelDetail') return `${basePath}/artikel/${articleSlug || ''}`;
  const slug = PAGE_SLUGS[page] ?? '';
  return slug ? `${basePath}/${slug}` : `${basePath}/`;
}

/**
 * Menerjemahkan path browser jadi `{ page, articleSlug, canonicalize }`.
 * `canonicalize: true` menandakan pengunjung masuk lewat slug lama dan URL-nya
 * perlu ditulis ulang ke slug kanonik. Path tak dikenal jatuh ke Beranda.
 */
export function routeFromPath(pathname, basePath = '') {
  const rel = pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname;
  const trimmed = rel.replace(/^\/+|\/+$/g, '');
  const segments = trimmed ? trimmed.split('/') : [];
  if (segments[0] === 'artikel') {
    if (segments.length >= 2 && segments[1]) return { page: 'ArtikelDetail', articleSlug: segments[1] };
    return { page: 'Artikel', articleSlug: undefined };
  }
  const legacy = LEGACY_SLUGS[trimmed];
  if (legacy) return { page: legacy, articleSlug: undefined, canonicalize: true };
  return { page: SLUG_PAGES[trimmed] || 'Beranda', articleSlug: undefined };
}
