# Situs Produksi — Surau Bateh Lori

![React](https://img.shields.io/badge/React-19.2-149ECA?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-B73BFE?logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)
![adhan](https://img.shields.io/badge/adhan.js-4.4-0E5F53)
![oxlint](https://img.shields.io/badge/lint-oxlint-EFD81D)
![Node](https://img.shields.io/badge/Node-20-339933?logo=node.js&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-222?logo=githubpages&logoColor=white)

Repo ini punya dua bagian: [`site/`](site/) — situs publik surau, dibangun
dengan Vite + React sebagai static export dan di-deploy ke GitHub Pages —
dan `New Surau Bateh Lori Design System/`, sumber desain yang di-vendor
ke situs. `site/` independen: bisa di-build tanpa folder design system
hadir di sebelahnya. Komponen visual, token CSS, dan aset yang dipakai
disalin (vendor) ke `site/src/design-system/` lewat `npm run sync-ds`
(dijalankan dari dalam `site/`; lihat `site/scripts/sync-design-system.mjs`
dan ADR [0003](docs/adr/0003-site-vendors-design-system-snapshot.md)) —
bukan diimpor langsung. Jalankan `npm run sync-ds` saat desain sumber
berubah dan situs perlu ditarik ke versi terbaru.

## Tech stack

| Layer | Teknologi | Keterangan |
| --- | --- | --- |
| UI | [React 19](https://react.dev) | Function components + hooks, tanpa router terpisah (navigasi diatur manual di `site/src/App.jsx`). |
| Build tool | [Vite 8](https://vite.dev) (`@vitejs/plugin-react`) | Dev server + static export (`vite build`) ke `site/dist/`. |
| Bahasa | JavaScript (JSX), tanpa TypeScript runtime | `@types/react`/`@types/react-dom` dipasang untuk IDE type-checking saja. |
| Jadwal salat | [adhan.js](https://github.com/batoulapps/adhan-js) | Menghitung jam adzan dari koordinat + metode Kemenag, dibangkitkan saat build lewat `site/scripts/generate-prayer-times.mjs` (lihat ADR [0004](docs/adr/0004-prayer-times-computed-not-hand-typed.md)). |
| Testing | [Vitest 4](https://vitest.dev) | Unit test untuk logika murni (`deriveSiteData`, kalkulator jadwal salat). |
| Linting | [oxlint](https://oxc.rs/docs/guide/usage/linter.html) | Linter Rust-based, cepat, konfigurasi di `site/.oxlintrc.json`. |
| Styling | CSS murni (design tokens) | Tidak ada framework CSS (Tailwind/CSS-in-JS) — lihat bagian [Design System](#design-system) di bawah. |
| Hosting/CI | GitHub Actions → GitHub Pages | `.github/workflows/deploy.yml`: `npm ci` → `npm test` → `npm run build` → publish `site/dist`. Domain custom diatur lewat Settings, bukan file `CNAME` (ADR [0005](docs/adr/0005-github-pages-dengan-domain-custom-diatur-lewat-settings.md)). |
| Data | File statis (`site/src/data/sourceData.js`) | Tidak ada database/CMS/API — lihat ADR [0001](docs/adr/0001-static-site-hand-edited-data-file.md). |

Tidak ada backend, database, atau panel admin — situs murni statis, dibangun ulang tiap kali ada perubahan konten atau desain.

## Design system

Desain situs bersumber dari **New Surau Bateh Lori Design System** (folder
terpisah di root repo, di luar `site/`) dan *tidak* diimpor langsung —
disalin sebagai snapshot ke `site/src/design-system/` lewat `npm run sync-ds`
(ADR [0003](docs/adr/0003-site-vendors-design-system-snapshot.md)).
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
| Domain (surau) | `ArabicVerse`, `EventItem`, `PhotoTile`, `PrayerTimeTable`, `StatBlock`, `Timeline` |

⚠️ **Jangan edit `site/src/design-system/` dengan tangan** — folder ini adalah
snapshot hasil sync, perubahan akan tertimpa saat `npm run sync-ds`
dijalankan lagi. Perubahan desain dilakukan di
`New Surau Bateh Lori Design System/` lalu ditarik ke sini lewat sync.

## Mengubah konten situs

Satu-satunya sumber konten yang bisa berubah (jadwal salat, agenda, program,
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
npm test         # unit test untuk deriveSiteData & kalkulator jadwal salat
npm run lint     # oxlint
npm run build    # static export ke dist/
npm run sync-ds  # tarik ulang komponen/token/aset dari New Surau Bateh Lori Design System/
```

## Struktur

- `site/src/data/sourceData.js` — Sumber Data (`SB_DATA`).
- `site/src/lib/deriveSiteData.js` — satu-satunya fungsi murni yang
  menerjemahkan Sumber Data mentah menjadi data siap-render (status salat
  aktif/berikutnya, Khatib Jumat turunan, bentuk donasi final). Diuji di
  `site/src/lib/deriveSiteData.test.js`.
- `site/src/lib/prayerTimeCalculator.js` — kalkulator jam adzan (adhan.js +
  metode Kemenag), dipakai `site/scripts/generate-prayer-times.mjs` saat build.
- `site/src/generated/prayerTimes.json` — dataset jam adzan ter-generate (±1
  tahun ke depan), di-gitignore, dibangkitkan ulang tiap `dev`/`build`.
- `site/src/design-system/` — snapshot komponen, token, dan aset design
  system, disalin lewat `npm run sync-ds`. Jangan diedit tangan — perubahan
  akan tertimpa saat sync berikutnya.
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
