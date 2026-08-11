import React from 'react';
import { Button, Icon, useBreakpoint } from '../ds.js';
import { ARTICLES } from '../data/articles.js';
import { formatArticleDate } from '../lib/deriveArticles.js';

const pad = m => (m ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)');

/**
 * Halaman detail satu artikel (`/artikel/<slug>`). Slug yang tidak
 * ditemukan (typo/artikel dihapus) ditangani dengan wajar -- pesan yang
 * jelas + tautan kembali, bukan halaman kosong tanpa penjelasan dan bukan
 * halaman 404 kustom yang didesain khusus (di luar cakupan).
 */
export default function ArticleDetailPage({ slug, onNavigate }) {
  const mobile = useBreakpoint();
  const article = ARTICLES.find(a => a.slug === slug);

  if (!article) {
    return (
      <section style={{ padding: pad(mobile), minHeight: '60vh' }}>
        <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ font: 'var(--text-body-default)', color: 'var(--text-muted)' }}>
            Artikel yang Anda cari tidak ditemukan.
          </p>
          <Button tone="secondary" icon="arrow-left" style={{ marginTop: 'var(--space-5)' }} onClick={() => onNavigate('Artikel')}>
            Kembali ke Artikel
          </Button>
        </div>
      </section>
    );
  }

  return (
    <article style={{ padding: pad(mobile) }}>
      <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto' }}>
        <a href="#" onClick={e => { e.preventDefault(); onNavigate('Artikel'); }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none',
            color: 'var(--text-brand)', font: 'var(--text-label)', fontSize: 'var(--fs-body-sm)' }}>
          <Icon name="arrow-left" size={16} />Kembali ke Artikel
        </a>

        <h1 style={{ margin: 'var(--space-5) 0 0', font: 'var(--text-h1)', fontSize: mobile ? 'var(--fs-h2)' : 'var(--fs-h1)',
          color: 'var(--text-strong)', textWrap: 'balance' }}>
          {article.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-3)',
          fontSize: 'var(--fs-body-sm)', color: 'var(--text-faint)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon name="user" size={15} />{article.author}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Icon name="calendar" size={15} />{formatArticleDate(article.date)}
          </span>
        </div>

        {article.cover ? (
          <img src={article.cover} alt="" style={{ width: '100%', borderRadius: 'var(--radius-lg)',
            marginTop: 'var(--space-6)', objectFit: 'cover', maxHeight: 420 }} />
        ) : null}

        <div
          className="article-body"
          style={{ marginTop: 'var(--space-6)', font: 'var(--text-body-default)', color: 'var(--text-body)', lineHeight: 'var(--lh-relaxed)' }}
          dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
        />
      </div>
    </article>
  );
}
