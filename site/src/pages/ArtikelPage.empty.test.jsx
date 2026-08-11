import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect, vi } from 'vitest';
import ArtikelPage from './ArtikelPage.jsx';

vi.mock('../data/articles.js', () => ({ ARTICLES: [] }));

describe('ArtikelPage — kosong', () => {
  it('menampilkan "Artikel akan segera tayang" saat tidak ada artikel', () => {
    const html = renderToStaticMarkup(<ArtikelPage onNavigate={() => {}} />);
    expect(html).toContain('Artikel akan segera tayang');
  });
});
