import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { useBreakpoint } from '../core/useBreakpoint.js';

const DEFAULTS = [
  { label: 'Beranda', icon: 'house' },
  { label: 'Jadwal Shalat', icon: 'clock', short: 'Jadwal' },
  { label: 'Kajian', icon: 'calendar-days' },
  { label: 'Infak', icon: 'hand-coins' },
  { label: 'Kontak', icon: 'phone' },
];

export function BottomBar({ items = DEFAULTS, active = 'Beranda', onNavigate, style }) {
  const mobile = useBreakpoint();
  if (!mobile) return null;
  return (
    <nav style={{ position: 'fixed', inset: 'auto 0 0 0', zIndex: 40, display: 'grid',
      gridTemplateColumns: 'repeat(' + items.length + ',1fr)',
      background: 'rgba(253,251,246,.94)', backdropFilter: 'var(--blur-glass)',
      borderTop: '1px solid var(--border-hairline)', paddingBottom: 'env(safe-area-inset-bottom)',
      fontFamily: 'var(--font-sans)', ...style }}>
      {items.map(it => {
        const on = it.label === active;
        return (
          <button key={it.label} type="button" onClick={() => onNavigate && onNavigate(it.label)}
            style={{ minHeight: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
              border: 'none', background: 'transparent', cursor: 'pointer', padding: '6px 2px',
              color: on ? 'var(--maroon-700)' : 'var(--text-muted)', transition: 'var(--transition-control)' }}>
            <Icon name={it.icon} size={20} />
            <span style={{ fontSize: 'var(--fs-overline)', fontWeight: on ? 'var(--fw-bold)' : 'var(--fw-medium)' }}>{it.short || it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
