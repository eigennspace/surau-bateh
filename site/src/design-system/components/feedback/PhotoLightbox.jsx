import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { useLockBodyScroll } from '../core/useLockBodyScroll.js';

/**
 * Modal foto full-size, independen dari `Dialog` (lihat spec di
 * `.scratch/photo-lightbox/spec.md`). Meniru gaya visual `Dialog` (backdrop
 * blur, surface card, radius, shadow, tombol close) tapi punya perilakunya
 * sendiri (klik backdrop untuk tutup) supaya modal konfirmasi donasi yang
 * memakai `Dialog` tidak ikut berubah.
 */
export function PhotoLightbox({ src, alt = '', caption, meta, onClose }) {
  // Lihat komentar di `useLockBodyScroll.js` -- mencegah modal ter-render
  // di posisi yang salah di iOS Safari kalau halaman di baliknya masih
  // bisa di-scroll saat modal baru terbuka.
  useLockBodyScroll();
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, display: 'grid', placeItems: 'center', zIndex: 60,
        background: 'rgba(34,38,44,.48)', backdropFilter: 'var(--blur-glass)', padding: 'var(--space-6)' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh', background: 'var(--surface-card)',
          borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-default)',
          padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
      >
        <button onClick={onClose} aria-label="Tutup" style={{ position: 'absolute', top: 14, right: 14, border: 'none',
          background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)', padding: 4, lineHeight: 0, zIndex: 1 }}>
          <Icon name="x" size={18} />
        </button>
        <img src={src} alt={alt} style={{ display: 'block', maxWidth: '100%', maxHeight: 'calc(85vh - var(--space-6) * 2)',
          width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: 'var(--radius-md)' }} />
        {caption || meta ? (
          <div style={{ fontFamily: 'var(--font-sans)' }}>
            {meta ? <span style={{ display: 'block', fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)',
              textTransform: 'uppercase', color: 'var(--gold-600)', marginBottom: 5 }}>{meta}</span> : null}
            {caption ? <span style={{ display: 'block', font: 'var(--text-body-default)', color: 'var(--text-strong)', textWrap: 'pretty' }}>{caption}</span> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
