import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect, vi } from 'vitest';
import ArtikelPage from './ArtikelPage.jsx';

// `makeArticleFixtures` diimpor dinamis di dalam factory -- lihat catatan di
// `ArticlesSection.test.jsx` soal kenapa import statis tidak bisa dipakai di
// sini (hoisting `vi.mock`).
vi.mock('../data/articles.js', async () => {
  const { makeArticleFixtures } = await import('../lib/articlesTestFixtures.js');
  return { ARTICLES: makeArticleFixtures(8) };
});

describe('ArtikelPage', () => {
  it('kunjungan pertama menampilkan batch awal 6 artikel, sisanya belum, tombol "Muat lebih banyak" tampil', () => {
    const html = renderToStaticMarkup(<ArtikelPage onNavigate={() => {}} />);
    for (let i = 1; i <= 6; i++) expect(html).toContain(`Artikel ${i}`);
    expect(html).not.toContain('Artikel 7');
    expect(html).not.toContain('Artikel 8');
    expect(html).toContain('Muat lebih banyak');
  });
});
