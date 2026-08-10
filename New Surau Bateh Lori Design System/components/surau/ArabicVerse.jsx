import React from 'react';
export function ArabicVerse({ arabic, translation, source, align = 'center', tone = 'sand', style }) {
  const TONE = { sand: { background: 'var(--sand-200)', color: 'var(--text-body)' },
    dark: { background: 'var(--surface-dark)', color: 'var(--slate-300)' },
    brand: { background: 'var(--surface-brand)', color: 'rgba(255,255,255,.82)' } };
  const t = TONE[tone] || TONE.sand;
  return (
    <blockquote style={{ margin: 0, padding: 'var(--space-10) var(--space-8)', borderRadius: 'var(--radius-lg)',
      textAlign: align, fontFamily: 'var(--font-sans)', ...t, ...style }}>
      <p dir="rtl" lang="ar" style={{ margin: 0, fontFamily: 'var(--font-arabic)', fontSize: 'var(--fs-arabic-lg)',
        lineHeight: 'var(--lh-arabic)', color: tone === 'sand' ? 'var(--maroon-700)' : 'var(--gold-400)' }}>{arabic}</p>
      {translation ? <p style={{ margin: 'var(--space-4) auto 0', maxWidth: 620, font: 'var(--text-body-default)', fontStyle: 'italic', textWrap: 'pretty' }}>{translation}</p> : null}
      {source ? <cite style={{ display: 'block', marginTop: 'var(--space-3)', fontStyle: 'normal', font: 'var(--text-label)',
        letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', fontSize: 'var(--fs-overline)',
        color: tone === 'sand' ? 'var(--text-faint)' : 'var(--gold-500)' }}>{source}</cite> : null}
    </blockquote>
  );
}
