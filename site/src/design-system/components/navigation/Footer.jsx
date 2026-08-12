import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { useBreakpoint } from '../core/useBreakpoint.js';

export function Footer({ logoSrc = '../../assets/logo-mark.png', address = 'Jl. Lori Lubuk Minturun, Lubuk Minturun, Kec. Koto Tangah, Kota Padang, Sumatera Barat 25586', addressHref = 'https://maps.app.goo.gl/bVQSzRjYxisicxUq6?g_st=ic', mapEmbedSrc = 'https://maps.google.com/maps?q=-0.8317255,100.4060905&z=16&output=embed', columns = [], socials = ['instagram', 'facebook', 'youtube'], style }) {
  const mobile = useBreakpoint();
  return (
    <footer style={{ background: 'var(--surface-dark)', color: 'var(--text-on-dark)', padding: mobile ? 'var(--space-10) var(--space-5) var(--space-6)' : 'var(--space-16) var(--space-8) var(--space-8)', fontFamily: 'var(--font-sans)', ...style }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.4fr repeat(' + Math.max(columns.length, 1) + ', 1fr)', gap: mobile ? 'var(--space-8)' : 'var(--space-10)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <span style={{ alignSelf: 'flex-start', display: 'grid', placeItems: 'center', padding: '12px 16px', background: 'var(--sand-100)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            <img src={logoSrc} alt="" style={{ height: 54, width: 'auto', display: 'block' }} />
          </span>
          <a href={addressHref} target="_blank" rel="noreferrer" style={{ margin: 0, display: 'block', fontSize: 'var(--fs-body-sm)', lineHeight: 'var(--lh-relaxed)', color: 'var(--slate-300)', maxWidth: 280, textDecoration: 'none' }}>{address}</a>
          <a href={addressHref} target="_blank" rel="noreferrer" aria-label="Buka lokasi Surau Bateh Lori di Google Maps" style={{ display: 'block', width: '100%', maxWidth: 280, height: 300, borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            <iframe
              src={mapEmbedSrc}
              title="Peta lokasi Surau Bateh Lori"
              style={{ border: 0, display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </a>
          <div style={{ display: 'flex', gap: 10 }}>
            {socials.map(s => <span key={s} style={{ width: 34, height: 34, display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,.08)', color: 'var(--gold-400)' }}><Icon name={s} size={16} /></span>)}
          </div>
        </div>
        {columns.map(col => (
          <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: 'var(--gold-500)' }}>{col.title}</span>
            {col.links.map(l => <a key={l} style={{ color: 'var(--slate-300)', textDecoration: 'none', fontSize: 'var(--fs-body-sm)' }}>{l}</a>)}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 'var(--container-max)', margin: 'var(--space-10) auto 0', paddingTop: 'var(--space-5)', borderTop: '1px solid rgba(255,255,255,.10)', fontSize: 'var(--fs-caption)', color: 'var(--slate-400)' }}>
        © {new Date().getFullYear()} Surau Bateh Lori, Kota Padang. Dikelola oleh pengurus surau.
      </div>
    </footer>
  );
}
