import React from 'react';
export function Tag({ children, selected = false, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ font: 'var(--text-label)', padding: '7px 14px', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
        transition: 'var(--transition-control)', fontFamily: 'var(--font-sans)',
        background: selected ? 'var(--surface-brand)' : hover ? 'var(--sand-300)' : 'var(--white)',
        color: selected ? 'var(--text-on-brand)' : 'var(--text-body)',
        border: '1px solid ' + (selected ? 'var(--maroon-700)' : 'var(--border-default)'), ...style }}>
      {children}
    </button>
  );
}
