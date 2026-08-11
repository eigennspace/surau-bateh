import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect, vi } from 'vitest';
import ArticlesSection from './ArticlesSection.jsx';

vi.mock('../data/articles.js', () => ({ ARTICLES: [] }));

describe('ArticlesSection — tanpa artikel', () => {
  it('menampilkan "Artikel akan segera tayang" dan tidak me-render kartu apa pun', () => {
    const html = renderToStaticMarkup(<ArticlesSection onNavigate={() => {}} />);
    expect(html).toContain('Artikel akan segera tayang');
    expect(html).not.toContain('Lihat semua artikel');
  });
});
