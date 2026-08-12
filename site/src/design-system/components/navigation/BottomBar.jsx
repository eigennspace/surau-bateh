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
  // Item dengan `children` (mis. "Kegiatan") tidak langsung `onNavigate` --
  // tap membuka popover kecil di atas tombol tab berisi pilihan anaknya.
  // Hanya satu popover terbuka pada satu waktu; tap di luar popover
  // menutupnya tanpa berpindah halaman (listener `pointerdown` di
  // `document`, dilepas begitu popover tertutup).
  const [openPopover, setOpenPopover] = React.useState(null);
  const navRef = React.useRef(null);

  React.useEffect(() => {
    if (!openPopover) return;
    const onPointerDown = e => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenPopover(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [openPopover]);

  if (!mobile) return null;

  const handleTap = it => {
    if (Array.isArray(it.children)) {
      setOpenPopover(prev => (prev === it.label ? null : it.label));
      return;
    }
    setOpenPopover(null);
    onNavigate && onNavigate(it.page || it.label);
  };

  return (
    <nav ref={navRef} style={{ position: 'fixed', inset: 'auto 0 0 0', zIndex: 40, display: 'grid',
      gridTemplateColumns: 'repeat(' + items.length + ',1fr)',
      background: 'rgba(253,251,246,.94)', backdropFilter: 'var(--blur-glass)',
      borderTop: '1px solid var(--border-hairline)', paddingBottom: 'env(safe-area-inset-bottom)',
      fontFamily: 'var(--font-sans)', ...style }}>
      {items.map(it => {
        const hasChildren = Array.isArray(it.children);
        const on = hasChildren ? it.children.includes(active) : (it.page || it.label) === active;
        const popoverOpen = openPopover === it.label;
        return (
          <div key={it.label} style={{ position: 'relative' }}>
            <button type="button" aria-expanded={hasChildren ? popoverOpen : undefined} onClick={() => handleTap(it)}
              style={{ width: '100%', minHeight: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
                border: 'none', background: 'transparent', cursor: 'pointer', padding: '6px 2px',
                color: on ? 'var(--maroon-700)' : 'var(--text-muted)', transition: 'var(--transition-control)' }}>
              <Icon name={it.icon} size={20} />
              <span style={{ fontSize: 'var(--fs-overline)', fontWeight: on ? 'var(--fw-bold)' : 'var(--fw-medium)' }}>{it.short || it.label}</span>
            </button>
            {hasChildren && popoverOpen ? (
              <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', paddingBottom: 8, zIndex: 41 }}>
                <div style={{ background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)', overflow: 'hidden', minWidth: 150 }}>
                  {it.children.map(child => (
                    <button key={child} type="button" onClick={() => { setOpenPopover(null); onNavigate && onNavigate(child); }}
                      style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', border: 'none', cursor: 'pointer',
                        font: 'var(--text-label)', fontSize: 'var(--fs-body)',
                        color: child === active ? 'var(--maroon-700)' : 'var(--text-body)',
                        background: child === active ? 'var(--surface-brand-soft)' : 'transparent' }}>{child}</button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
