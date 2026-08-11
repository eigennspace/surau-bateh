import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Dialog({ open = true, title, description, children, footer, onClose, width = 460, inline = false, closeOnBackdropClick = false }) {
  if (!open) return null;
  return (
    <div onClick={(!inline && closeOnBackdropClick && onClose) ? onClose : undefined}
      style={{ position: inline ? 'relative' : 'fixed', inset: 0, display: 'grid', placeItems: 'center', zIndex: 50,
      background: inline ? 'transparent' : 'rgba(34,38,44,.48)', backdropFilter: inline ? 'none' : 'var(--blur-glass)', padding: 'var(--space-6)' }}>
      <div role="dialog" aria-modal="true" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: width, background: 'var(--surface-card)',
        borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-default)',
        padding: 'var(--space-8)', fontFamily: 'var(--font-sans)', position: 'relative' }}>
        {onClose ? <button onClick={onClose} aria-label="Tutup" style={{ position: 'absolute', top: 18, right: 18, border: 'none',
          background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)', padding: 4, lineHeight: 0 }}>
          <Icon name="x" size={18} /></button> : null}
        {title ? <h3 style={{ margin: '0 0 8px', font: 'var(--text-h3)', color: 'var(--text-strong)' }}>{title}</h3> : null}
        {description ? <p style={{ margin: '0 0 var(--space-5)', font: 'var(--text-body-default)', color: 'var(--text-muted)' }}>{description}</p> : null}
        {children}
        {footer ? <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>{footer}</div> : null}
      </div>
    </div>
  );
}
