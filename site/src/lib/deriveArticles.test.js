import { describe, it, expect } from 'vitest';
import { deriveArticles, formatArticleDate } from './deriveArticles.js';

// Fixture: bentuk artikel yang sudah difetch+diresolve dari Sanity build-time
// (lihat `scripts/fetch-sanity-content.mjs`) -- `body` adalah array blok
// Portable Text, bukan Markdown mentah. `deriveArticles` sendiri tidak
// fetch/parse apa pun, hanya mengurutkan (lihat `deriveArticles.js`).
function article({ title, author, date, excerpt, cover, slug, body }) {
  return {
    slug: slug ?? 'artikel',
    title,
    author,
    date,
    excerpt,
    cover,
    body: body ?? [{ _type: 'block', _key: 'b1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', text: 'Isi.', marks: [] }] }],
  };
}

describe('deriveArticles', () => {
  it('mempertahankan field artikel apa adanya (title/author/date/excerpt/cover/body)', () => {
    const [a] = deriveArticles([
      article({ slug: 'santunan-yatim', title: 'Santunan Yatim', author: 'Pengurus', date: '2026-08-01', excerpt: 'Ringkasan santunan.', cover: '/articles/cover.jpg' }),
    ]);
    expect(a.title).toBe('Santunan Yatim');
    expect(a.author).toBe('Pengurus');
    expect(a.date).toBe('2026-08-01');
    expect(a.excerpt).toBe('Ringkasan santunan.');
    expect(a.cover).toBe('/articles/cover.jpg');
  });

  it('artikel tanpa cover: field cover tidak ada/undefined', () => {
    const [a] = deriveArticles([
      article({ slug: 'tanpa-cover', title: 'Tanpa Cover', author: 'Penulis', date: '2026-08-01', excerpt: 'Ringkasan.' }),
    ]);
    expect(a.cover).toBeUndefined();
  });

  it('urutan hasil terbaru dulu berdasarkan tanggal', () => {
    const result = deriveArticles([
      article({ slug: 'lama', title: 'Lama', author: 'A', date: '2026-07-15', excerpt: 'x' }),
      article({ slug: 'terbaru', title: 'Terbaru', author: 'A', date: '2026-08-10', excerpt: 'x' }),
      article({ slug: 'tengah', title: 'Tengah', author: 'A', date: '2026-08-01', excerpt: 'x' }),
    ]);
    expect(result.map(a => a.slug)).toEqual(['terbaru', 'tengah', 'lama']);
  });

  it('body (blok Portable Text, termasuk gambar) diteruskan apa adanya', () => {
    const body = [
      { _type: 'block', _key: 'b1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', text: 'Paragraf pembuka.', marks: [] }] },
      { _type: 'image', _key: 'img1', alt: 'Alt teks', imageUrl: '/articles/foto.jpg' },
      { _type: 'block', _key: 'b2', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's2', text: 'Paragraf penutup.', marks: [] }] },
    ];
    const [a] = deriveArticles([article({ slug: 'dengan-gambar', title: 'Dengan Gambar', author: 'A', date: '2026-08-01', excerpt: 'x', body })]);
    expect(a.body).toEqual(body);
  });

  it('array kosong kalau tidak ada artikel sama sekali', () => {
    expect(deriveArticles([])).toEqual([]);
    expect(deriveArticles()).toEqual([]);
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
