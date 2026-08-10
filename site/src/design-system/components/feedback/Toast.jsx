import React from 'react';
import { Icon } from '../core/Icon.jsx';
const TONE = {
  success: { icon: 'circle-check', color: 'var(--teal-800)', background: 'var(--teal-100)', border: 'var(--teal-200)' },
  info: { icon: 'info', color: 'var(--slate-800)', background: 'var(--slate-100)', border: 'var(--border-default)' },
  warning: { icon: 'triangle-alert', color: 'var(--gold-800)', background: 'var(--gold-100)', border: 'var(--gold-200)' },
  danger: { icon: 'circle-alert', color: 'var(--maroon-800)', background: 'var(--maroon-50)', border: 'var(--maroon-100)' },
};
export function Toast({ tone = 'info', title, message, onClose, style }) {
  const t = TONE[tone] || TONE.info;
  return (
    <div role="status" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 16px', minWidth: 280,
      background: t.background, border: '1px solid ' + t.border, borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)',
      fontFamily: 'var(--font-sans)', ...style }}>
      <Icon name={t.icon} size={18} style={{ color: t.color, marginTop: 1 }} />
      <div style={{ flex: 1 }}>
        <div style={{ font: 'var(--text-label)', color: t.color }}>{title}</div>
        {message ? <div style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', marginTop: 2 }}>{message}</div> : null}
      </div>
      {onClose ? <button onClick={onClose} aria-label="Tutup" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-faint)', lineHeight: 0 }}><Icon name="x" size={15} /></button> : null}
    </div>
  );
}
