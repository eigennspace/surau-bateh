import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect, vi } from 'vitest';
import ArticlesSection from './ArticlesSection.jsx';

// `ArticlesSection` mengimpor `ARTICLES` langsung dari `../data/articles.js`
// (glob Vite, di luar cakupan lingkungan test) -- di-mock di sini supaya
// komponen bisa dites dengan fixture terkontrol, mengikuti pola
// fixture-terkontrol yang dipakai `deriveSiteData.test.js`. `makeArticleFixtures`
// diimpor secara dinamis di dalam factory (bukan `import` statis di atas)
// karena `vi.mock` di-hoist ke atas modul -- import statis akan gagal
// diakses sebelum inisialisasi (lihat `vi.hoisted` di dokumentasi Vitest).
vi.mock('../data/articles.js', async () => {
  const { makeArticleFixtures } = await import('../lib/articlesTestFixtures.js');
  return { ARTICLES: makeArticleFixtures(5, { startDay: 10 }) };
});

describe('ArticlesSection', () => {
  it('menampilkan 3 artikel terbaru dan tombol "Lihat semua artikel"', () => {
    const html = renderToStaticMarkup(<ArticlesSection onNavigate={() => {}} />);
    expect(html).toContain('Artikel 1');
    expect(html).toContain('Artikel 2');
    expect(html).toContain('Artikel 3');
    expect(html).not.toContain('Artikel 4');
    expect(html).not.toContain('Artikel 5');
    expect(html).toContain('Lihat semua artikel');
  });
});
