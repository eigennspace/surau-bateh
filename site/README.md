# Situs Produksi — Surau Bateh Lori

Situs publik surau, dibangun dengan Vite + React sebagai static export dan
di-deploy ke GitHub Pages. Situs ini independen: bisa di-build tanpa folder
`New Surau Bateh Lori Design System/` hadir di sebelahnya. Komponen visual,
token CSS, dan aset yang dipakai disalin (vendor) ke `src/design-system/`
lewat `npm run sync-ds` (lihat `scripts/sync-design-system.mjs` dan
ADR [0003](../docs/adr/0003-site-vendors-design-system-snapshot.md)) —
bukan diimpor langsung. Jalankan `npm run sync-ds` saat desain sumber
berubah dan situs perlu ditarik ke versi terbaru.

## Mengubah konten situs

Satu-satunya sumber konten yang bisa berubah (jadwal salat, agenda, program,
pengumuman, roadmap, donasi, statistik, galeri, kontak) adalah
**Sumber Data**: [`src/data/sourceData.js`](src/data/sourceData.js).

1. Edit nilai di `src/data/sourceData.js` sebagai teks biasa.
2. Jalankan `npm run build` di folder ini untuk memastikan tidak ada galat.
3. Deploy ulang (push ke `main` — GitHub Actions men-build dan
   mem-publish otomatis ke GitHub Pages lewat `.github/workflows/deploy.yml`).

Tidak ada panel admin, database, atau API — perubahan konten baru terlihat
pengunjung setelah build + deploy ulang.

## Pengembangan lokal

```bash
npm install
npm run dev      # server pengembangan
npm test         # unit test untuk deriveSiteData
npm run build    # static export ke dist/
npm run sync-ds  # tarik ulang komponen/token/aset dari New Surau Bateh Lori Design System/
```

## Struktur

- `src/data/sourceData.js` — Sumber Data (`SB_DATA`).
- `src/lib/deriveSiteData.js` — satu-satunya fungsi murni yang menerjemahkan
  Sumber Data mentah menjadi data siap-render (status salat aktif/berikutnya,
  Khatib Jumat turunan, bentuk donasi final). Diuji di
  `src/lib/deriveSiteData.test.js`.
- `src/design-system/` — snapshot komponen, token, dan aset design system,
  disalin lewat `npm run sync-ds`. Jangan diedit tangan — perubahan akan
  tertimpa saat sync berikutnya.
- `src/ds.js` — titik impor tunggal untuk komponen & hook design system.
- `src/pages/*` — enam halaman situs (Beranda dirakit dari `src/components/*`).
- `src/App.jsx` — navigasi & bilah bawah/menu ponsel.
