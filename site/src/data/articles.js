// articles — sejak ADR 0006, artikel bukan lagi Markdown lokal
// (`import.meta.glob('./articles/*.md')`), melainkan hasil fetch build-time
// dari dataset Sanity (`scripts/fetch-sanity-content.mjs`, jalan sebelum
// `vite build`/`vite dev` -- lihat `predev`/`build` di `package.json`).
// Hasil fetch ditulis ke `src/generated/sanityContent.json` (di-gitignore,
// data turunan, bukan sumber kebenaran -- mengikuti pola
// `generated/sanityContent.json`), diimpor statis di sini persis seperti
// `App.jsx` mengimpor dataset jadwal shalat.
//
// `deriveArticles` sendiri tetap murni (lihat `../lib/deriveArticles.js`);
// berkas ini hanya menyediakan input hasil fetch yang sudah diresolve.
import { deriveArticles } from '../lib/deriveArticles.js';
import sanityContent from '../generated/sanityContent.json';

export const ARTICLES = deriveArticles(sanityContent.articles);
