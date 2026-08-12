// markdownToPortableText — konverter Markdown -> Portable Text minimal,
// ditulis tangan (bukan `remark`/`@portabletext/block-tools` + `jsdom`),
// dipakai satu kali oleh `scripts/migrate-articles-to-sanity.mjs` (lihat
// ADR 0006, .scratch/cms-migration-sanity/issues/04-artikel-via-sanity.md).
// Menangani subset Markdown yang benar-benar dipakai dua artikel existing
// (`site/src/data/articles/*.md`): paragraf, **bold**, _italic_/*italic*,
// [teks](url), dan `![alt](src)` gambar berdiri sendiri sebagai blok
// terpisah. Fungsi murni -- tidak membaca file/upload apa pun; blok gambar
// dikembalikan sebagai placeholder `{ _type: 'image', src, alt }` (belum
// jadi referensi asset Sanity), diselesaikan oleh skrip migrasi (lapisan
// I/O) yang meng-upload file lalu mengganti `src` dengan `asset` reference.

let keyCounter = 0;
function nextKey() {
  keyCounter += 1;
  return `k${keyCounter}${Math.random().toString(36).slice(2, 8)}`;
}

const IMAGE_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/;
// Urutan penting: link dulu (`[text](url)`), baru bold/italic, supaya teks
// di dalam `[...]` tidak salah tertangkap regex bold/italic duluan.
const INLINE_RE = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(__([^_]+)__)|(\*([^*]+)\*)|(_([^_]+)_)/g;

/**
 * Memecah satu baris teks jadi array span Portable Text (`{text, marks}`) +
 * `markDefs` (untuk anotasi `link`, yang butuh `_key` markDef terpisah dari
 * mark literal seperti `strong`/`em`).
 */
function parseInline(text) {
  const spans = [];
  const markDefs = [];
  let lastIndex = 0;
  let match;
  INLINE_RE.lastIndex = 0;
  while ((match = INLINE_RE.exec(text))) {
    if (match.index > lastIndex) {
      spans.push({ _type: 'span', _key: nextKey(), text: text.slice(lastIndex, match.index), marks: [] });
    }
    if (match[1]) {
      // [text](url)
      const markDefKey = nextKey();
      markDefs.push({ _type: 'link', _key: markDefKey, href: match[3] });
      spans.push({ _type: 'span', _key: nextKey(), text: match[2], marks: [markDefKey] });
    } else if (match[4] || match[6]) {
      // **bold** or __bold__
      spans.push({ _type: 'span', _key: nextKey(), text: match[5] || match[7], marks: ['strong'] });
    } else if (match[8] || match[10]) {
      // *italic* or _italic_
      spans.push({ _type: 'span', _key: nextKey(), text: match[9] || match[11], marks: ['em'] });
    }
    lastIndex = INLINE_RE.lastIndex;
  }
  if (lastIndex < text.length) {
    spans.push({ _type: 'span', _key: nextKey(), text: text.slice(lastIndex), marks: [] });
  }
  if (spans.length === 0) {
    spans.push({ _type: 'span', _key: nextKey(), text: '', marks: [] });
  }
  return { spans, markDefs };
}

/**
 * @param {string} markdown Badan artikel (tanpa frontmatter).
 * @returns {Array<object>} Blok Portable Text -- blok `block` teks biasa,
 *   atau placeholder `{_type:'image', _key, src, alt}` untuk baris gambar
 *   berdiri sendiri (`![alt](src)`).
 */
export function markdownToPortableText(markdown) {
  const paragraphs = (markdown || '')
    .split(/\r?\n\s*\r?\n/)
    .map(p => p.trim())
    .filter(Boolean);

  return paragraphs.map(paragraph => {
    const imageMatch = IMAGE_RE.exec(paragraph);
    if (imageMatch) {
      return { _type: 'image', _key: nextKey(), src: imageMatch[2], alt: imageMatch[1] || '' };
    }
    const { spans, markDefs } = parseInline(paragraph.replace(/\s*\r?\n\s*/g, ' '));
    return { _type: 'block', _key: nextKey(), style: 'normal', markDefs, children: spans };
  });
}
