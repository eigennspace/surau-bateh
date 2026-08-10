import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Select({ label, options = [], value, onChange, hint, disabled = false, id, style }) {
  const [focus, setFocus] = React.useState(false);
  const selectId = id || 'sel-' + (label || 'field').replace(/\s+/g, '-').toLowerCase();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-sans)', ...style }}>
      {label ? <label htmlFor={selectId} style={{ font: 'var(--text-label)', color: 'var(--text-strong)' }}>{label}</label> : null}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <select id={selectId} value={value} onChange={onChange} disabled={disabled}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ width: '100%', height: 44, padding: '0 40px 0 14px', appearance: 'none', cursor: 'pointer',
            background: disabled ? 'var(--slate-100)' : 'var(--white)', borderRadius: 'var(--radius-md)',
            border: '1px solid ' + (focus ? 'var(--maroon-700)' : 'var(--border-default)'),
            boxShadow: focus ? '0 0 0 3px rgba(220,201,69,.35)' : 'var(--shadow-xs)',
            font: 'var(--text-body-default)', color: 'var(--text-strong)', transition: 'var(--transition-control)' }}>
          {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
        </select>
        <Icon name="chevron-down" size={16} style={{ position: 'absolute', right: 14, color: 'var(--text-muted)', pointerEvents: 'none' }} />
      </div>
      {hint ? <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-muted)' }}>{hint}</span> : null}
    </div>
  );
}
