import { describe, it, expect } from 'vitest';
import { deriveArticles, slugFromFilename, formatArticleDate, parseFrontmatter } from './deriveArticles.js';

// Fixture: peta nama-file (path glob) -> raw markdown string, meniru bentuk
// hasil `import.meta.glob('./articles/*.md', { query: '?raw', eager: true,
// import: 'default' })` -- tidak menyentuh filesystem sungguhan.
function article({ title, author, date, excerpt, cover, body }) {
  const front = ['---', `title: ${title}`, `author: ${author}`, `date: ${date}`, `excerpt: ${excerpt}`];
  if (cover) front.push(`cover: ${cover}`);
  front.push('---', body ?? '');
  return front.join('\n');
}

describe('deriveArticles', () => {
  it('mem-parsing frontmatter lengkap (title/author/date/excerpt/cover)', () => {
    const files = {
      './articles/2026-08-01-santunan-yatim.md': article({
        title: 'Santunan Yatim', author: 'Pengurus', date: '2026-08-01',
        excerpt: 'Ringkasan santunan.', cover: '/articles/cover.jpg', body: 'Isi artikel.',
      }),
    };
    const [a] = deriveArticles(files);
    expect(a.title).toBe('Santunan Yatim');
    expect(a.author).toBe('Pengurus');
    expect(a.date).toBe('2026-08-01');
    expect(a.excerpt).toBe('Ringkasan santunan.');
    expect(a.cover).toBe('/articles/cover.jpg');
  });

  it('artikel tanpa cover: field cover tidak ada/undefined, artikel lain tetap terparsing', () => {
    const files = {
      './articles/2026-08-01-tanpa-cover.md': article({
        title: 'Tanpa Cover', author: 'Penulis', date: '2026-08-01',
        excerpt: 'Ringkasan.', body: 'Isi.',
      }),
    };
    const [a] = deriveArticles(files);
    expect(a.cover).toBeUndefined();
  });

  it('slug diturunkan dari nama file, termasuk file dengan prefix tanggal', () => {
    expect(slugFromFilename('./articles/2026-08-12-santunan-yatim.md')).toBe('santunan-yatim');
    expect(slugFromFilename('./articles/tanpa-prefix-tanggal.md')).toBe('tanpa-prefix-tanggal');
  });

  it('urutan hasil terbaru dulu berdasarkan tanggal', () => {
    const files = {
      './articles/2026-07-15-lama.md': article({ title: 'Lama', author: 'A', date: '2026-07-15', excerpt: 'x', body: 'y' }),
      './articles/2026-08-10-terbaru.md': article({ title: 'Terbaru', author: 'A', date: '2026-08-10', excerpt: 'x', body: 'y' }),
      './articles/2026-08-01-tengah.md': article({ title: 'Tengah', author: 'A', date: '2026-08-01', excerpt: 'x', body: 'y' }),
    };
    const result = deriveArticles(files);
    expect(result.map(a => a.slug)).toEqual(['terbaru', 'tengah', 'lama']);
  });

  it('badan Markdown (termasuk gambar) diubah jadi bodyHtml', () => {
    const files = {
      './articles/2026-08-01-dengan-gambar.md': article({
        title: 'Dengan Gambar', author: 'A', date: '2026-08-01', excerpt: 'x',
        body: 'Paragraf pembuka.\n\n![Alt teks](/articles/foto.jpg)\n\nParagraf penutup.',
      }),
    };
    const [a] = deriveArticles(files);
    expect(a.bodyHtml).toContain('<p>Paragraf pembuka.</p>');
    expect(a.bodyHtml).toContain('<img src="/articles/foto.jpg" alt="Alt teks">');
    expect(a.bodyHtml).toContain('<p>Paragraf penutup.</p>');
  });

  it('array kosong kalau tidak ada file sama sekali', () => {
    expect(deriveArticles({})).toEqual([]);
  });
});

describe('parseFrontmatter', () => {
  it('memisahkan blok frontmatter dari badan, termasuk value bertanda kutip', () => {
    const raw = ['---', 'title: "Judul: Dua Titik"', "author: 'Penulis'", '---', 'Badan tulisan.'].join('\n');
    const { data, content } = parseFrontmatter(raw);
    expect(data.title).toBe('Judul: Dua Titik');
    expect(data.author).toBe('Penulis');
    expect(content).toBe('Badan tulisan.');
  });

  it('tanpa blok frontmatter: content dikembalikan apa adanya, data kosong', () => {
    const { data, content } = parseFrontmatter('Cuma badan, tanpa frontmatter.');
    expect(data).toEqual({});
    expect(content).toBe('Cuma badan, tanpa frontmatter.');
  });
});

describe('formatArticleDate', () => {
  it('memformat tanggal ISO jadi label Indonesia', () => {
    expect(formatArticleDate('2026-08-12')).toBe('12 Agustus 2026');
  });

  it('tanggal yang tidak bisa diparsing dikembalikan apa adanya', () => {
    expect(formatArticleDate('bukan-tanggal')).toBe('bukan-tanggal');
  });
});
