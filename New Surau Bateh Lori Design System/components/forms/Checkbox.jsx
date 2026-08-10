import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Checkbox({ label, description, checked, defaultChecked, onChange, disabled = false, style }) {
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : internal;
  const toggle = () => { if (disabled) return; if (checked === undefined) setInternal(!on); onChange && onChange(!on); };
  return (
    <label onClick={toggle} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1, fontFamily: 'var(--font-sans)', ...style }}>
      <span style={{ width: 20, height: 20, flex: '0 0 auto', marginTop: 1, display: 'grid', placeItems: 'center',
        borderRadius: 'var(--radius-xs)', transition: 'var(--transition-control)',
        background: on ? 'var(--surface-brand)' : 'var(--white)',
        border: '1px solid ' + (on ? 'var(--maroon-700)' : 'var(--border-strong)') }}>
        {on ? <Icon name="check" size={13} style={{ color: 'var(--white)' }} /> : null}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ font: 'var(--text-body-default)', color: 'var(--text-strong)', lineHeight: 'var(--lh-normal)' }}>{label}</span>
        {description ? <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>{description}</span> : null}
      </span>
    </label>
  );
}
