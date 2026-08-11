import React from 'react';
import { Button, SectionHeading, useBreakpoint } from '../ds.js';
import { ARTICLES } from '../data/articles.js';
import ArticleCard from './ArticleCard.jsx';

const pad = m => (m ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)');

/**
 * Section "Artikel Terbaru" di Beranda -- 3 artikel terbaru (dari
 * `deriveArticles`, lewat `../data/articles.js`) + tombol "Lihat semua
 * artikel". Kalau belum ada artikel sama sekali, tampilkan "Artikel akan
 * segera tayang" tanpa kartu apa pun.
 */
export default function ArticlesSection({ onNavigate }) {
  const mobile = useBreakpoint();
  const latest = ARTICLES.slice(0, 3);

  return (
    <section style={{ padding: pad(mobile), background: 'var(--sand-200)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading overline="Tulisan" title="Artikel Terbaru" description="Cerita dan kabar terbaru seputar Surau Bateh Lori." />

        {latest.length === 0 ? (
          <p style={{ marginTop: 'var(--space-8)', textAlign: 'center', color: 'var(--text-faint)', font: 'var(--text-body-default)' }}>
            Artikel akan segera tayang.
          </p>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : 'repeat(3,1fr)', gap: 'var(--space-5)', marginTop: 'var(--space-8)' }}>
              {latest.map(a => (
                <ArticleCard key={a.slug} article={a} onClick={() => onNavigate('ArtikelDetail', a.slug)} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-8)' }}>
              <Button tone="secondary" icon="arrow-right" iconPosition="right" onClick={() => onNavigate('Artikel')}>
                Lihat semua artikel
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
