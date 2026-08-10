import React from 'react';
import { Icon } from '../core/Icon.jsx';
export function StatBlock({ icon, value, label, tone = 'sand', style }) {
  const TONE = { sand: { background: 'var(--sand-200)', color: 'var(--maroon-700)' },
    dark: { background: 'rgba(255,255,255,.06)', color: 'var(--gold-400)' },
    plain: { background: 'transparent', color: 'var(--maroon-700)' } };
  const t = TONE[tone] || TONE.sand;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 'var(--space-5)', borderRadius: 'var(--radius-md)',
      background: t.background, fontFamily: 'var(--font-sans)', ...style }}>
      {icon ? <Icon name={icon} size={20} style={{ color: t.color }} /> : null}
      <span style={{ font: 'var(--text-h2)', color: tone === 'dark' ? 'var(--white)' : 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      <span style={{ fontSize: 'var(--fs-body-sm)', color: tone === 'dark' ? 'var(--slate-300)' : 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}
