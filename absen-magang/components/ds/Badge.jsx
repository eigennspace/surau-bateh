import React from 'react';
import { Icon } from './Icon.jsx';

const TONE = {
  neutral: { background: 'var(--status-info-soft)', color: 'var(--slate-700)' },
  brand: { background: 'var(--surface-brand-soft)', color: 'var(--maroon-700)' },
  accent: { background: 'var(--status-next-soft)', color: 'var(--gold-800)' },
  active: { background: 'var(--status-active-soft)', color: 'var(--teal-800)' },
  solid: { background: 'var(--surface-brand)', color: 'var(--text-on-brand)' },
};
export function Badge({ children, tone = 'neutral', icon, style }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 'var(--radius-pill)',
      font: 'var(--text-label)', letterSpacing: '0.01em', whiteSpace: 'nowrap', ...TONE[tone], ...style }}>
      {icon ? <Icon name={icon} size={14} /> : null}{children}
    </span>
  );
}
