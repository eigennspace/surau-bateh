# Situs Produksi — Surau Bateh Lori

![React](https://img.shields.io/badge/React-19.2-149ECA?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-B73BFE?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)
![oxlint](https://img.shields.io/badge/lint-oxlint-EFD81D)
![Node](https://img.shields.io/badge/Node-20-339933?logo=node.js&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-222?logo=githubpages&logoColor=white)

Repo ini punya dua bagian: [`site/`](site/) — situs publik surau, dibangun
dengan Vite + React sebagai static export dan di-deploy ke GitHub Pages —
dan `New Surau Bateh Lori Design System/`, skill desain tempat brand,
guidelines, dan prototype tinggal. `site/` independen: bisa di-build tanpa
folder design system hadir di sebelahnya. Komponen visual, token CSS, dan
aset yang dipakai situs tinggal di `site/src/design-system/` dan diedit
langsung di sana (ADR [0003](docs/adr/0003-site-vendors-design-system-snapshot.md)
dan [0009](docs/adr/0009-hapus-skrip-sync-ds.md)) — bukan diimpor dari
folder design system, dan sejak ADR 0009 tidak ada lagi skrip sync yang
menyalin dari sana.

## Tech stack

| Layer | Teknologi | Keterangan |
| --- | --- | --- |
| UI | [React 19](https://react.dev) | Function components + hooks, tanpa router terpisah (navigasi diatur manual di `site/src/App.jsx`). |
| Build tool | [Vite 8](https://vite.dev) (`@vitejs/plugin-react`) | Dev server + static export (`vite build`) ke `site/dist/`. |
| Bahasa | JavaScript (JSX), tanpa TypeScript runtime | `@types/react`/`@types/react-dom` dipasang untuk IDE type-checking saja. |
| Testing | [Vitest 4](https://vitest.dev) | Unit test untuk logika murni (`deriveSiteData`, model navigasi) dan render SSR halaman. |
| Linting | [oxlint](https://oxc.rs/docs/guide/usage/linter.html) | Linter Rust-based, cepat, konfigurasi di `site/.oxlintrc.json`. |
| Styling | CSS murni (design tokens) | Tidak ada framework CSS (Tailwind/CSS-in-JS) — lihat bagian [Design System](#design-system) di bawah. |
| Hosting/CI | GitHub Actions → GitHub Pages | `.github/workflows/deploy.yml`: `npm ci` → `npm test` → `npm run build` → publish `site/dist`. Domain custom diatur lewat Settings, bukan file `CNAME` (ADR [0005](docs/adr/0005-github-pages-dengan-domain-custom-diatur-lewat-settings.md)). |
| Data | File statis (`site/src/data/sourceData.js`) | Tidak ada database/CMS/API — lihat ADR [0001](docs/adr/0001-static-site-hand-edited-data-file.md). |

Tidak ada backend, database, atau panel admin — situs murni statis, dibangun ulang tiap kali ada perubahan konten atau desain.

## Design system

Desain situs berasal dari **New Surau Bateh Lori Design System** (folder
terpisah di root repo, di luar `site/`) dan *tidak* diimpor langsung —
komponen, token, dan aset yang dipakai situs hidup di
`site/src/design-system/` (ADR [0003](docs/adr/0003-site-vendors-design-system-snapshot.md),
[0009](docs/adr/0009-hapus-skrip-sync-ds.md)).
Titik impor tunggal untuk komponen & hook ada di [`site/src/ds.js`](site/src/ds.js).

**Design tokens** (`site/src/design-system/tokens/`, di-`@import` lewat
[`site/src/design-system/styles.css`](site/src/design-system/styles.css)):

- `colors.css` — palet diambil dari lambang Surau Bateh Lori: maroon
  (brand/aksen utama), gold (aksen sekunder/status "berikutnya"), teal
  (status waktu salat aktif), slate (teks/netral), sand (latar hangat khas
  ruang ibadah), plus alias semantik (`--text-*`, `--surface-*`,
  `--border-*`, `--status-*`, `--time-*` per waktu salat).
- `typography.css`, `fonts.css` — skala tipografi & font-face.
- `spacing.css`, `radii.css`, `elevation.css`, `motion.css` — jarak,
  radius sudut, bayangan, dan durasi/easing animasi.

**Komponen** (`site/src/design-system/components/`, diekspor lewat `site/src/ds.js`):

| Kategori | Komponen |
| --- | --- |
| Core | `Badge`, `Button`, `Card`, `Icon`, `SectionHeading`, `Tag`, `useBreakpoint` |
| Feedback | `Dialog`, `PhotoLightbox`, `Toast`, `Tooltip` |
| Forms | `Checkbox`, `Input`, `RadioGroup`, `Select`, `Switch` |
| Navigation | `BottomBar`, `Footer`, `NavBar`, `Tabs` |
| Domain (surau) | `ArabicVerse`, `EventItem`, `PhotoTile`, `StatBlock`, `Timeline` |

`site/src/design-system/` **diedit langsung** — sejak ADR
[0009](docs/adr/0009-hapus-skrip-sync-ds.md) tidak ada lagi skrip sync yang
bisa menimpanya. Konsekuensinya perubahan di sini tidak mengalir balik ke
`New Surau Bateh Lori Design System/`: folder itu perlahan menua sebagai
potret desain, jadi periksa dulu sebelum memakainya sebagai contoh.

## Mengubah konten situs

Satu-satunya sumber konten yang bisa berubah (agenda, program, galeri program,
pengumuman, roadmap, donasi, statistik, galeri, kontak) adalah
**Sumber Data**: [`site/src/data/sourceData.js`](site/src/data/sourceData.js).

1. Edit nilai di `site/src/data/sourceData.js` sebagai teks biasa.
2. Jalankan `npm run build` di dalam `site/` untuk memastikan tidak ada galat.
3. Deploy ulang (push ke `main` — GitHub Actions men-build dan
   mem-publish otomatis ke GitHub Pages lewat `.github/workflows/deploy.yml`).

Tidak ada panel admin, database, atau API — perubahan konten baru terlihat
pengunjung setelah build + deploy ulang.

## Pengembangan lokal

```bash
cd site
npm install
npm run dev      # server pengembangan
npm test         # unit test untuk deriveSiteData, model navigasi & halaman
npm run lint     # oxlint
npm run build    # static export ke dist/
```

## Struktur

- `site/src/data/sourceData.js` — Sumber Data (`SB_DATA`).
- `site/src/lib/deriveSiteData.js` — satu-satunya fungsi murni yang
  menerjemahkan Sumber Data mentah menjadi data siap-render (penanda kegiatan
  hari ini, Khatib Jumat turunan, bentuk donasi final). Diuji di
  `site/src/lib/deriveSiteData.test.js`.
- `site/src/lib/navigation.js` — model navigasi sebagai data murni: grup
  Kegiatan/Dakwah/Sosial, daftar entri tiap permukaan (navbar, burger, bottom
  bar), peta halaman↔slug, dan slug lama yang masih dilayani. Diuji di
  `site/src/lib/navigation.test.js`.
- `site/src/design-system/` — komponen, token, dan aset design system yang
  dipakai situs. Sumbernya ada di sini dan diedit langsung (ADR 0009).
- `site/src/ds.js` — titik impor tunggal untuk komponen & hook design system.
- `site/src/pages/*` — enam halaman situs (Beranda dirakit dari
  `site/src/components/*`).
- `site/src/App.jsx` — navigasi & bilah bawah/menu ponsel.
- `docs/adr/` — Architecture Decision Records.

## Deploy

Push ke `main` (yang menyentuh path `site/**`) memicu
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
install → test → build → publish `site/dist` ke GitHub Pages. Domain custom
(`suraubateh.web.id`) disetel lewat GitHub Pages Settings, bukan file
`CNAME` di repo — lihat ADR
[0005](docs/adr/0005-github-pages-dengan-domain-custom-diatur-lewat-settings.md).
