import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect, vi } from 'vitest';
import ArtikelPage from './ArtikelPage.jsx';

// `makeArticleFixtures` diimpor dinamis di dalam factory -- lihat catatan di
// `ArticlesSection.test.jsx` soal kenapa import statis tidak bisa dipakai di
// sini (hoisting `vi.mock`).
vi.mock('../data/articles.js', async () => {
  const { makeArticleFixtures } = await import('../lib/articlesTestFixtures.js');
  return { ARTICLES: makeArticleFixtures(4, { startDay: 10 }) };
});

describe('ArtikelPage — artikel tersedia lebih sedikit dari batch size (6)', () => {
  it('semua artikel tampil sejak awal, tombol "Muat lebih banyak" tidak muncul', () => {
    const html = renderToStaticMarkup(<ArtikelPage onNavigate={() => {}} />);
    for (let i = 1; i <= 4; i++) expect(html).toContain(`Artikel ${i}`);
    expect(html).not.toContain('Muat lebih banyak');
  });
});
