import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect, vi } from 'vitest';
import ArticleDetailPage from './ArticleDetailPage.jsx';

vi.mock('../data/articles.js', () => ({
  ARTICLES: [
    {
      slug: 'santunan-yatim',
      title: 'Santunan Yatim',
      author: 'Pengurus Surau',
      date: '2026-08-01',
      excerpt: 'Ringkasan santunan.',
      cover: '/articles/cover.jpg',
      bodyHtml: '<p>Paragraf isi.</p><img src="/articles/foto.jpg" alt="Foto kegiatan">',
    },
  ],
}));

describe('ArticleDetailPage — artikel ditemukan', () => {
  it('menampilkan judul, penulis, tanggal, dan isi (termasuk gambar di badan)', () => {
    const html = renderToStaticMarkup(<ArticleDetailPage slug="santunan-yatim" onNavigate={() => {}} />);
    expect(html).toContain('Santunan Yatim');
    expect(html).toContain('Pengurus Surau');
    expect(html).toContain('1 Agustus 2026');
    expect(html).toContain('Paragraf isi.');
    expect(html).toContain('src="/articles/foto.jpg"');
  });
});

describe('ArticleDetailPage — slug tidak ditemukan', () => {
  it('tidak crash, menampilkan pesan wajar alih-alih halaman kosong', () => {
    const html = renderToStaticMarkup(<ArticleDetailPage slug="tidak-ada" onNavigate={() => {}} />);
    expect(html).toContain('tidak ditemukan');
  });
});
