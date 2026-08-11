// articlesTestFixtures — pembuat fixture artikel bersama, dipakai beberapa
// berkas test komponen/halaman (`ArticlesSection.test.jsx`, `ArtikelPage.*
// .test.jsx`) yang masing-masing perlu `vi.mock('../data/articles.js', ...)`
// dengan set artikel berbeda -- di-mock lewat modul terpisah (bukan satu
// berkas test dengan beberapa `describe`) karena `vi.mock` di-hoist ke atas
// modul, jadi satu berkas test tidak bisa membawa dua fixture `ARTICLES`
// berbeda untuk komponen yang sama.
export function makeArticleFixtures(count, { startDay = 20 } = {}) {
  return Array.from({ length: count }, (_, i) => ({
    slug: `artikel-${i + 1}`,
    title: `Artikel ${i + 1}`,
    author: 'Penulis',
    date: `2026-08-${String(startDay - i).padStart(2, '0')}`,
    excerpt: 'Ringkasan.',
    cover: undefined,
    bodyHtml: '<p>Isi</p>',
  }));
}
