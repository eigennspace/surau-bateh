import React from 'react';
import { Card, Icon } from '../ds.js';
import { formatArticleDate } from '../lib/deriveArticles.js';

/**
 * Kartu artikel dipakai bersama oleh `ArticlesSection` (Beranda) dan
 * `ArtikelPage` (listing) -- judul, penulis, tanggal, ringkasan, cover kalau
 * ada. Tanpa `cover`, kartu tetap tampil rapi (blok gambar tidak dirender,
 * tidak ada whitespace kosong janggal).
 */
export default function ArticleCard({ article, onClick }) {
  return (
    <Card
      interactive
      padding={0}
      style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', cursor: 'pointer' }}
    >
      <a
        href="#"
        onClick={e => { e.preventDefault(); onClick(); }}
        style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        {article.cover ? (
          <img
            src={article.cover}
            alt=""
            style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', display: 'block' }}
          />
        ) : null}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', padding: 'var(--space-5)' }}>
          <h3 style={{ margin: 0, font: 'var(--text-h4)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)', textWrap: 'balance' }}>
            {article.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--fs-caption)', color: 'var(--text-faint)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Icon name="user" size={14} />{article.author}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Icon name="calendar" size={14} />{formatArticleDate(article.date)}
            </span>
          </div>
          <p style={{ margin: 0, marginTop: 4, fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', lineHeight: 'var(--lh-relaxed)' }}>
            {article.excerpt}
          </p>
        </div>
      </a>
    </Card>
  );
}
