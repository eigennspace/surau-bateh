import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Input({ label, placeholder, value, defaultValue, onChange, icon, hint, error, type = 'text', disabled = false, id, style }) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || 'in-' + (label || placeholder || 'field').replace(/\s+/g, '-').toLowerCase();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-sans)', ...style }}>
      {label ? <label htmlFor={inputId} style={{ font: 'var(--text-label)', color: 'var(--text-strong)' }}>{label}</label> : null}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 44, padding: '0 14px',
        background: disabled ? 'var(--slate-100)' : 'var(--white)', borderRadius: 'var(--radius-md)',
        border: '1px solid ' + (error ? 'var(--status-danger)' : focus ? 'var(--maroon-700)' : 'var(--border-default)'),
        boxShadow: focus ? '0 0 0 3px rgba(220,201,69,.35)' : 'var(--shadow-xs)', transition: 'var(--transition-control)' }}>
        {icon ? <Icon name={icon} size={16} style={{ color: 'var(--text-faint)' }} /> : null}
        <input id={inputId} type={type} placeholder={placeholder} value={value} defaultValue={defaultValue} disabled={disabled}
          onChange={onChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', font: 'var(--text-body-default)', color: 'var(--text-strong)', minWidth: 0 }} />
      </div>
      {(hint || error) ? <span style={{ fontSize: 'var(--fs-caption)', color: error ? 'var(--status-danger)' : 'var(--text-muted)' }}>{error || hint}</span> : null}
    </div>
  );
}
