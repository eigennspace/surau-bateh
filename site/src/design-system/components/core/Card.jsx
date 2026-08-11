import React from 'react';

export function Card({ children, tone = 'default', padding = 'var(--gutter-card)', interactive = false, style }) {
  const [hover, setHover] = React.useState(false);
  const TONE = {
    default: { background: 'var(--surface-card)', border: '1px solid var(--border-default)' },
    sand: { background: 'var(--sand-200)', border: '1px solid var(--border-hairline)' },
    brand: { background: 'var(--surface-brand)', border: '1px solid var(--maroon-800)', color: 'var(--text-on-brand)' },
    dark: { background: 'var(--surface-dark)', border: '1px solid var(--slate-800)', color: 'var(--text-on-dark)' },
    calm: { background: 'var(--surface-calm)', border: '1px solid var(--teal-200)' },
  };
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ borderRadius: 'var(--radius-lg)', padding, fontFamily: 'var(--font-sans)', color: 'var(--text-body)',
        boxShadow: interactive && hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: interactive && hover ? 'translateY(-2px)' : 'none',
        transition: 'var(--transition-control)', overflow: 'auto', ...TONE[tone], ...style,
        overflow: 'auto',
        maxHeight: '500px', }}>
      {children}
    </div>
  );
}