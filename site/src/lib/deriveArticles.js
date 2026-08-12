// deriveArticles — sejak ADR 0006, artikel dikelola lewat Sanity (dokumen
// `article`, body Portable Text), bukan lagi file Markdown di
// `src/data/articles/` (folder itu, parser frontmatter tangan yang dulu ada
// di sini, dan skrip migrasi satu-kali yang memakainya sudah dihapus di
// tiket cutover -- lihat
// `.scratch/cms-migration-sanity/issues/06-cutover-hapus-pipeline-lama.md`).
// `deriveArticles` menerima array artikel yang sudah difetch+diresolve
// build-time oleh `scripts/fetch-sanity-content.mjs` (lihat
// `src/data/articles.js`) dan hanya melakukan pengurutan -- fungsi murni,
// tidak melakukan fetch sendiri, sehingga tetap bisa dites dengan fixture
// objek tanpa Sanity sungguhan (lihat `articlesTestFixtures.js`).

import { MONTH_NAMES_ID } from './monthNamesId.js';

const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})/;

/**
 * Label tanggal Masehi Indonesia (mis. "12 Agustus 2026") untuk tampilan
 * kartu/detail artikel. Tanggal yang tidak bisa diparsing dikembalikan apa
 * adanya alih-alih dilempar error -- artikel tetap tampil, hanya label
 * tanggalnya kurang rapi.
 *
 * `date` berbentuk string tanggal polos (`YYYY-MM-DD`, tanpa jam/zona
 * waktu, field `date` Sanity) diparsing lewat regex, bukan
 * `new Date(dateStr)` -- `new Date` menafsirkan string semacam itu sebagai
 * UTC tengah malam, yang bisa mundur satu hari saat ditampilkan di zona
 * waktu di belakang UTC.
 */
export function formatArticleDate(dateStr) {
  const isoMatch = ISO_DATE_RE.exec(dateStr || '');
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    const monthName = MONTH_NAMES_ID[Number(month) - 1];
    if (monthName) return `${Number(day)} ${monthName} ${year}`;
  }
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${d.getDate()} ${MONTH_NAMES_ID[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * @param {Array<{slug: string, title: string, author: string, date: string,
 *   excerpt: string, cover?: string, body: Array<object>}>} articles Artikel
 *   yang sudah difetch dari Sanity dan diresolve build-time (asset gambar
 *   sudah jadi URL plain, `body` tetap array blok Portable Text untuk
 *   dirender `@portabletext/react`) -- lihat
 *   `scripts/fetch-sanity-content.mjs`/`src/data/articles.js`. Fungsi ini
 *   tidak fetch/resolve apa pun sendiri, hanya mengurutkan.
 * @returns {Array<{slug: string, title: string, author: string, date: string,
 *   excerpt: string, cover?: string, body: Array<object>}>} Terurut tanggal
 *   terbaru dulu.
 */
export function deriveArticles(articles = []) {
  const sorted = [...articles];
  sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  return sorted;
}
