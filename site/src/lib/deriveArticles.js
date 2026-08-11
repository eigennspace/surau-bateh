// deriveArticles — mem-parsing hasil `import.meta.glob` (peta nama-file →
// raw string Markdown) menjadi array artikel siap-render, mengikuti pola
// `deriveSiteData`/`prayerTimeCalculator`: fungsi murni, tidak membaca
// filesystem sendiri, tidak ada efek samping, sehingga bisa dites dengan
// fixture string tanpa file sungguhan. Artikel adalah sumber data yang
// sepenuhnya terpisah dari `SB_DATA`/`sourceData.js` -- tidak ada perubahan
// skema di berkas itu untuk fitur ini.

import { marked } from 'marked';
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
 * @param {Record<string, string>} rawFiles Peta nama-file (path glob) →
 *   konten Markdown mentah (frontmatter + badan), hasil `import.meta.glob`
 *   dengan `{ query: '?raw', import: 'default', eager: true }`.
 * @returns {Array<{slug: string, title: string, author: string, date: string,
 *   excerpt: string, cover?: string, bodyHtml: string}>} Terurut tanggal
 *   terbaru dulu.
 */
export function deriveArticles(rawFiles = {}) {
  const articles = Object.entries(rawFiles).map(([filename, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    return {
      slug: slugFromFilename(filename),
      title: data.title,
      author: data.author,
      date: data.date,
      excerpt: data.excerpt,
      cover: data.cover || undefined,
      bodyHtml: marked.parse(content.trim(), { async: false }),
    };
  });
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  return articles;
}
