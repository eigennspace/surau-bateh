import React from 'react';
export function Tabs({ items = [], value, onChange, style }) {
  const [internal, setInternal] = React.useState(items[0] && (items[0].value ?? items[0]));
  const active = value !== undefined ? value : internal;
  const pick = v => { if (value === undefined) setInternal(v); onChange && onChange(v); };
  return (
    <div role="tablist" style={{ display: 'inline-flex', gap: 4, padding: 4, background: 'var(--sand-300)',
      borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-sans)', ...style }}>
      {items.map(it => { const v = it.value ?? it, on = active === v;
        return <button key={v} role="tab" aria-selected={on} onClick={() => pick(v)}
          style={{ border: 'none', cursor: 'pointer', padding: '8px 18px', borderRadius: 'var(--radius-pill)',
            font: 'var(--text-label)', transition: 'var(--transition-control)',
            background: on ? 'var(--white)' : 'transparent', color: on ? 'var(--text-brand)' : 'var(--text-muted)',
            boxShadow: on ? 'var(--shadow-xs)' : 'none' }}>{it.label ?? it}</button>; })}
    </div>
  );
}
