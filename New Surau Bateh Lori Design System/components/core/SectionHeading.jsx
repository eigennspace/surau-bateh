import React from 'react';
export function SectionHeading({ overline, title, description, align = 'left', arabic, style }) {
  return (
    <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', textAlign: align,
      alignItems: align === 'center' ? 'center' : 'flex-start', maxWidth: align === 'center' ? 640 : 'none',
      margin: align === 'center' ? '0 auto' : 0, fontFamily: 'var(--font-sans)', ...style }}>
      {overline ? <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase',
        color: 'var(--text-brand)', fontSize: 'var(--fs-overline)' }}>{overline}</span> : null}
      {arabic ? <span style={{ fontFamily: 'var(--font-arabic)', fontSize: 'var(--fs-arabic)', color: 'var(--gold-700)', lineHeight: 'var(--lh-arabic)' }}>{arabic}</span> : null}
      <h2 style={{ margin: 0, font: 'var(--text-h2)', letterSpacing: 'var(--ls-heading)', color: 'var(--text-strong)', textWrap: 'balance' }}>{title}</h2>
      {description ? <p style={{ margin: 0, font: 'var(--text-body-default)', color: 'var(--text-muted)', maxWidth: 560, textWrap: 'pretty' }}>{description}</p> : null}
    </header>
  );
}
