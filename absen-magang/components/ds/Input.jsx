import React from 'react';
import { Icon } from './Icon.jsx';

// Divendor dari `New Surau Bateh Lori Design System/components/forms/Input.jsx`
// (lihat ADR 0016) dan diperluas di tempat: `name`/`required`/`autoFocus`/
// `maxLength`/`inputMode`/`min`/`max` diteruskan ke elemen asli supaya form
// gerbang Absen Magang (yang membaca field lewat FormData berbasis `name`,
// bukan controlled value) tetap berfungsi tanpa mengubah `actions.js`.
// `as="textarea"` ditambahkan untuk field catatan aktivitas multi-baris di
// halaman /absen.
export function Input({
  label, placeholder, value, defaultValue, onChange, icon, hint, error,
  type = 'text', disabled = false, id, name, required, autoFocus, maxLength,
  inputMode, min, max, rows, as = 'input', style,
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || 'in-' + (label || placeholder || name || 'field').replace(/\s+/g, '-').toLowerCase();
  const Field = as === 'textarea' ? 'textarea' : 'input';
  const fieldProps = {
    id: inputId,
    name,
    placeholder,
    value,
    defaultValue,
    disabled,
    required,
    autoFocus,
    onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1, border: 'none', outline: 'none', background: 'transparent',
      font: 'var(--text-body-default)', color: 'var(--text-strong)', minWidth: 0,
      resize: as === 'textarea' ? 'vertical' : undefined,
    },
  };
  if (as === 'textarea') {
    fieldProps.rows = rows || 3;
  } else {
    fieldProps.type = type;
    fieldProps.maxLength = maxLength;
    fieldProps.inputMode = inputMode;
    fieldProps.min = min;
    fieldProps.max = max;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-sans)', ...style }}>
      {label ? <label htmlFor={inputId} style={{ font: 'var(--text-label)', color: 'var(--text-strong)' }}>{label}</label> : null}
      <div style={{ display: 'flex', alignItems: as === 'textarea' ? 'flex-start' : 'center', gap: 10,
        height: as === 'textarea' ? 'auto' : 44, padding: as === 'textarea' ? '10px 14px' : '0 14px',
        background: disabled ? 'var(--slate-100)' : 'var(--white)', borderRadius: 'var(--radius-md)',
        border: '1px solid ' + (error ? 'var(--status-danger)' : focus ? 'var(--maroon-700)' : 'var(--border-default)'),
        boxShadow: focus ? '0 0 0 3px rgba(220,201,69,.35)' : 'var(--shadow-xs)', transition: 'var(--transition-control)' }}>
        {icon ? <Icon name={icon} size={16} style={{ color: 'var(--text-faint)', marginTop: as === 'textarea' ? 2 : 0 }} /> : null}
        <Field {...fieldProps} />
      </div>
      {(hint || error) ? <span style={{ fontSize: 'var(--fs-caption)', color: error ? 'var(--status-danger)' : 'var(--text-muted)' }}>{error || hint}</span> : null}
    </div>
  );
}
