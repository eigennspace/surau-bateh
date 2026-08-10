import React from 'react';
import { Button } from '../core/Button.jsx';
import { Icon } from '../core/Icon.jsx';
import { useBreakpoint } from '../core/useBreakpoint.js';

export function NavBar({ logoSrc = '../../assets/logo-mark.png', brand = 'Surau Bateh Lori', tagline = 'Kota Padang',
  items = ['Beranda', 'Profil', 'Jadwal Shalat', 'Kajian', 'Berita', 'Kontak'], active = 'Beranda', onNavigate, action = 'Salurkan Infak', onAction, style }) {
  const mobile = useBreakpoint();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => { if (!mobile) setOpen(false); }, [mobile]);
  const go = it => { setOpen(false); onNavigate && onNavigate(it); };
  return (
    <header style={{ display: 'flex', alignItems: 'center', gap: mobile ? 'var(--space-4)' : 'var(--space-8)',
      padding: mobile ? '12px var(--space-5)' : '14px var(--space-8)', flexWrap: 'wrap',
      background: 'rgba(253,251,246,.88)', backdropFilter: 'var(--blur-glass)', borderBottom: '1px solid var(--border-hairline)',
      fontFamily: 'var(--font-sans)', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src={logoSrc} alt="" style={{ height: mobile ? 32 : 38, width: 'auto' }} />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ fontWeight: 'var(--fw-extrabold)', fontSize: 'var(--fs-body)', color: 'var(--maroon-700)', letterSpacing: '-0.01em' }}>{brand}</span>
          <span style={{ fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{tagline}</span>
        </div>
      </div>
      {mobile ? (
        <button type="button" aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}
          style={{ marginLeft: 'auto', width: 44, height: 44, display: 'grid', placeItems: 'center', cursor: 'pointer',
            background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-pill)',
            color: 'var(--maroon-700)', boxShadow: 'var(--shadow-xs)' }}>
          <Icon name={open ? 'x' : 'menu'} size={20} />
        </button>
      ) : (
        <>
          <nav style={{ display: 'flex', gap: 'var(--space-6)', marginLeft: 'auto' }}>
            {items.map(it => (
              <a key={it} href="#" onClick={e => { e.preventDefault(); go(it); }}
                style={{ textDecoration: 'none', font: 'var(--text-label)', color: it === active ? 'var(--maroon-700)' : 'var(--text-body)',
                  paddingBottom: 2, borderBottom: '2px solid ' + (it === active ? 'var(--gold-500)' : 'transparent'), transition: 'var(--transition-control)' }}>{it}</a>
            ))}
          </nav>
          <Button tone="primary" size="sm" icon="hand-coins" onClick={onAction}>{action}</Button>
        </>
      )}
      {mobile && open ? (
        <nav style={{ flexBasis: '100%', display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 'var(--space-4)' }}>
          {items.map(it => (
            <a key={it} href="#" onClick={e => { e.preventDefault(); go(it); }}
              style={{ textDecoration: 'none', font: 'var(--text-label)', fontSize: 'var(--fs-body-lg)', minHeight: 48,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 var(--space-4)',
                borderRadius: 'var(--radius-md)', color: it === active ? 'var(--maroon-700)' : 'var(--text-body)',
                background: it === active ? 'var(--surface-brand-soft)' : 'transparent' }}>
              {it}<Icon name="chevron-right" size={16} style={{ color: 'var(--text-faint)' }} />
            </a>
          ))}
          <Button tone="primary" size="lg" fullWidth icon="hand-coins" style={{ marginTop: 'var(--space-3)' }}
            onClick={() => { setOpen(false); onAction && onAction(); }}>{action}</Button>
        </nav>
      ) : null}
    </header>
  );
}
