# Situs Produksi — Surau Bateh Lori

Situs publik surau, dibangun dengan Vite + React sebagai static export dan
di-deploy ke GitHub Pages. Tampilannya wajib identik 100% dengan
`New Surau Bateh Lori Design System/` — komponen visual dan token CSS
diimpor langsung dari sana (lihat `src/ds.js`), bukan disalin.

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
```

## Struktur

- `src/data/sourceData.js` — Sumber Data (`SB_DATA`).
- `src/lib/deriveSiteData.js` — satu-satunya fungsi murni yang menerjemahkan
  Sumber Data mentah menjadi data siap-render (status salat aktif/berikutnya,
  Khatib Jumat turunan, bentuk donasi final). Diuji di
  `src/lib/deriveSiteData.test.js`.
- `src/ds.js` — titik impor tunggal untuk komponen & hook design system.
- `src/pages/*` — enam halaman situs (Beranda dirakit dari `src/components/*`).
- `src/App.jsx` — navigasi & bilah bawah/menu ponsel.
