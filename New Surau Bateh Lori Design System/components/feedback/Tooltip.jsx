import React from 'react';
export function Tooltip({ label, children, placement = 'top', style }) {
  const [show, setShow] = React.useState(false);
  const pos = placement === 'bottom' ? { top: 'calc(100% + 8px)' } : { bottom: 'calc(100% + 8px)' };
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <span role="tooltip" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', ...pos,
        opacity: show ? 1 : 0, pointerEvents: 'none', transition: 'opacity var(--dur-fast) var(--ease-standard)',
        background: 'var(--surface-dark)', color: 'var(--text-on-dark)', padding: '6px 10px', borderRadius: 'var(--radius-sm)',
        fontSize: 'var(--fs-caption)', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap', boxShadow: 'var(--shadow-md)', ...style }}>{label}</span>
    </span>
  );
}
