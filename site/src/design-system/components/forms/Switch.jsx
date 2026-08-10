import React from 'react';
export function Switch({ label, checked, defaultChecked, onChange, disabled = false, style }) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : internal;
  const toggle = () => { if (disabled) return; if (checked === undefined) setInternal(!on); onChange && onChange(!on); };
  return (
    <label onClick={toggle} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1, fontFamily: 'var(--font-sans)', ...style }}>
      <span style={{ width: 44, height: 26, borderRadius: 'var(--radius-pill)', padding: 3, display: 'flex',
        justifyContent: on ? 'flex-end' : 'flex-start', transition: 'var(--transition-control)',
        background: on ? 'var(--status-active)' : 'var(--slate-300)' }}>
        <span style={{ width: 20, height: 20, borderRadius: 'var(--radius-pill)', background: 'var(--white)', boxShadow: 'var(--shadow-xs)' }} />
      </span>
      {label ? <span style={{ font: 'var(--text-body-default)', color: 'var(--text-strong)' }}>{label}</span> : null}
    </label>
  );
}
