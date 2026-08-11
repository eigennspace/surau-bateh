import React from 'react';
import { Button, SectionHeading, useBreakpoint } from '../ds.js';
import { ARTICLES } from '../data/articles.js';
import { ARTICLES_BATCH_SIZE, nextVisibleCount, hasMoreArticles } from '../lib/articlesPaging.js';
import ArticleCard from '../components/ArticleCard.jsx';

const pad = m => (m ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)');

/**
 * Halaman listing Artikel -- awalnya menampilkan `ARTICLES_BATCH_SIZE` (6)
 * artikel terbaru; "Muat lebih banyak" menambah 6 lagi tiap klik sampai
 * semua tampil, lalu tombolnya hilang. Urutan (terbaru dulu) sudah
 * ditentukan oleh `deriveArticles`, halaman ini hanya membatasi jumlah yang
 * dirender.
 */
export default function ArtikelPage({ onNavigate }) {
  const mobile = useBreakpoint();
  const [visibleCount, setVisibleCount] = React.useState(ARTICLES_BATCH_SIZE);
  const visible = ARTICLES.slice(0, visibleCount);

  return (
    <section style={{ padding: pad(mobile), background: 'var(--sand-100)', minHeight: '60vh' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading overline="Tulisan" title="Artikel" description="Seluruh artikel dan cerita dari Surau Bateh Lori, terbaru dulu." />

        {ARTICLES.length === 0 ? (
          <p style={{ marginTop: 'var(--space-8)', textAlign: 'center', color: 'var(--text-faint)', font: 'var(--text-body-default)' }}>
            Artikel akan segera tayang.
          </p>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : 'repeat(3,1fr)', gap: 'var(--space-5)', marginTop: 'var(--space-8)' }}>
              {visible.map(a => (
                <ArticleCard key={a.slug} article={a} onClick={() => onNavigate('ArtikelDetail', a.slug)} />
              ))}
            </div>
            {hasMoreArticles(visibleCount, ARTICLES.length) ? (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-8)' }}>
                <Button tone="secondary" onClick={() => setVisibleCount(c => nextVisibleCount(c, ARTICLES.length))}>
                  Muat lebih banyak
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
