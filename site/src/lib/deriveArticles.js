// deriveArticles — sejak ADR 0006, artikel dikelola lewat Sanity (dokumen
// `article`, body Portable Text), bukan lagi file Markdown di
// `src/data/articles/`. `deriveArticles` menerima array artikel yang sudah
// difetch+diresolve build-time oleh `scripts/fetch-sanity-content.mjs`
// (lihat `src/data/articles.js`) dan hanya melakukan pengurutan -- fungsi
// murni, tidak melakukan fetch sendiri, sehingga tetap bisa dites dengan
// fixture objek tanpa Sanity sungguhan (lihat `articlesTestFixtures.js`).
//
// `parseFrontmatter`/`slugFromFilename` di bawah adalah sisa parser Markdown
// jalur lama -- sengaja BELUM dihapus (lihat tiket 04), tapi sudah tidak
// dipanggil dari jalur baca aktif manapun. Dihapus di tiket cutover
// (`.scratch/cms-migration-sanity/issues/06-cutover-hapus-pipeline-lama.md`)
// begitu Sanity terverifikasi jalan penuh di produksi.

import { MONTH_NAMES_ID } from './monthNamesId.js';

const DATE_PREFIX_RE = /^\d{4}-\d{2}-\d{2}-/;

/**
 * Menurunkan slug dari nama file Markdown -- bukan field frontmatter
 * terpisah. Prefix tanggal opsional di nama file (mis.
 * `2026-08-12-santunan-yatim.md`) dibuang dari slug, hanya dipakai sebagai
 * konvensi penamaan/pengurutan file di folder.
 */
export function slugFromFilename(filename) {
  const base = filename.split('/').pop().replace(/\.md$/, '');
  return base.replace(DATE_PREFIX_RE, '');
}

const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})/;

/**
 * Label tanggal Masehi Indonesia (mis. "12 Agustus 2026") untuk tampilan
 * kartu/detail artikel. Tanggal yang tidak bisa diparsing dikembalikan apa
 * adanya alih-alih dilempar error -- artikel tetap tampil, hanya label
 * tanggalnya kurang rapi.
 *
 * `date` frontmatter berbentuk string tanggal polos (`YYYY-MM-DD`, tanpa
 * jam/zona waktu) diparsing lewat regex, bukan `new Date(dateStr)` --
 * `new Date` menafsirkan string semacam itu sebagai UTC tengah malam,
 * yang bisa mundur satu hari saat ditampilkan di zona waktu di belakang UTC.
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

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

/**
 * Parser frontmatter minimal, ditulis tangan -- bukan `gray-matter`/
 * `js-yaml`. Frontmatter artikel di sini hanya pasangan `key: value` flat
 * (`title`/`author`/`date`/`excerpt`/`cover`), tidak ada nesting/list, jadi
 * parser sekecil ini cukup. `gray-matter` awalnya dicoba (sesuai contoh di
 * spec) tapi dependency-nya (`js-yaml`) menarik modul inti Node `buffer`
 * yang gagal di-resolve saat dibundel Vite untuk browser (`ReferenceError:
 * Buffer is not defined` saat runtime) -- parser sendiri menghindari itu
 * sekaligus menjaga bundle tetap ringan.
 */
export function parseFrontmatter(raw) {
  const match = FRONTMATTER_RE.exec(raw);
  if (!match) return { data: {}, content: raw };
  const [, block, content] = match;
  const data = {};
  for (const line of block.split(/\r?\n/)) {
    const sep = line.indexOf(':');
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    let value = line.slice(sep + 1).trim();
    const quoted = (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"));
    if (quoted) value = value.slice(1, -1);
    if (key) data[key] = value;
  }
  return { data, content };
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
