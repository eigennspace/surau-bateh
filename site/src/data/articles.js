// articles — satu-satunya titik yang menyentuh `import.meta.glob` untuk
// folder artikel Markdown (analog `sourceData.js` untuk `SB_DATA`, tapi
// artikel adalah sumber data yang sepenuhnya terpisah, tanpa perubahan
// skema di `sourceData.js`). Tiap file di `./articles/*.md` yang ada saat
// build dianggap tayang -- tidak ada field draft/published, kontrol tayang
// cukup lewat commit ke `main` (lihat `.scratch/artikel-page/spec.md`).
//
// `deriveArticles` sendiri murni (lihat `../lib/deriveArticles.js`); berkas
// ini hanya menyediakan input glob mentah yang hanya bisa didapat lewat API
// Vite (raw string import, eager -- artikel tidak banyak, lazy-load per
// artikel tidak sepadan kompleksitasnya untuk situs sekecil ini).
import { deriveArticles } from '../lib/deriveArticles.js';

const rawArticleFiles = import.meta.glob('./articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const ARTICLES = deriveArticles(rawArticleFiles);
