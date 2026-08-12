import React from 'react';
import { Button } from '../core/Button.jsx';
import { Icon } from '../core/Icon.jsx';
import { useBreakpoint } from '../core/useBreakpoint.js';

// Entri nav mendukung dua bentuk: string (link datar, seperti sebelumnya)
// atau objek `{ label, children, mobileLabel? }` untuk entri berjenjang
// (dropdown desktop saat hover / drop-up mobile saat tap) -- lihat `NAV` di
// `App.jsx`. Entri objek murni trigger, tidak punya halaman/URL sendiri.
const isParent = it => typeof it === 'object' && it !== null && Array.isArray(it.children);
const labelOf = it => (typeof it === 'string' ? it : it.label);

export function NavBar({ logoSrc = '../../assets/logo-mark.png', brand = 'Surau Bateh Lori', tagline = 'Kota Padang',
  items = ['Beranda', 'Profil', 'Jadwal Shalat', 'Kajian', 'Berita', 'Kontak'], active = 'Beranda', onNavigate, action = 'Salurkan Infak', onAction, style }) {
  const mobile = useBreakpoint();
  const [open, setOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(null);
  const [openMobileSub, setOpenMobileSub] = React.useState(null);
  React.useEffect(() => { if (!mobile) setOpen(false); }, [mobile]);
  const go = it => { setOpen(false); setOpenDropdown(null); setOpenMobileSub(null); onNavigate && onNavigate(it); };

  return (
    <header style={{ display: 'flex', alignItems: 'center', gap: mobile ? 'var(--space-4)' : 'var(--space-8)',
      padding: mobile ? '12px var(--space-5)' : '14px var(--space-8)', flexWrap: 'wrap',
      background: 'rgba(253,251,246,.88)', backdropFilter: 'var(--blur-glass)', borderBottom: '1px solid var(--border-hairline)',
      fontFamily: 'var(--font-sans)', ...style }}>
      <a href="#" onClick={e => { e.preventDefault(); go('Beranda'); }} aria-label="Ke beranda"
        style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', cursor: 'pointer' }}>
        <img src={logoSrc} alt="" style={{ height: mobile ? 32 : 38, width: 'auto' }} />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ fontWeight: 'var(--fw-extrabold)', fontSize: 'var(--fs-body)', color: 'var(--maroon-700)', letterSpacing: '-0.01em' }}>{brand}</span>
          <span style={{ fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{tagline}</span>
        </div>
      </a>
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
            {items.map(it => {
              if (isParent(it)) {
                const activeParent = it.children.includes(active);
                return (
                  <div key={it.label} style={{ position: 'relative' }}
                    onMouseEnter={() => setOpenDropdown(it.label)}
                    onMouseLeave={() => setOpenDropdown(null)}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'default',
                      font: 'var(--text-label)', color: activeParent ? 'var(--maroon-700)' : 'var(--text-body)',
                      paddingBottom: 2, borderBottom: '2px solid ' + (activeParent ? 'var(--gold-500)' : 'transparent'), transition: 'var(--transition-control)' }}>
                      {it.label}<Icon name="chevron-down" size={14} />
                    </span>
                    {openDropdown === it.label ? (
                      <div style={{ position: 'absolute', top: '100%', left: 0, paddingTop: 8, zIndex: 40, minWidth: 180 }}>
                        <div style={{ background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)',
                          boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>
                          {it.children.map(child => (
                            <a key={child} href="#" onClick={e => { e.preventDefault(); go(child); }}
                              style={{ display: 'block', padding: '10px 14px', textDecoration: 'none', font: 'var(--text-label)',
                                color: child === active ? 'var(--maroon-700)' : 'var(--text-body)',
                                background: child === active ? 'var(--surface-brand-soft)' : 'transparent' }}>{child}</a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              }
              return (
                <a key={it} href="#" onClick={e => { e.preventDefault(); go(it); }}
                  style={{ textDecoration: 'none', font: 'var(--text-label)', color: it === active ? 'var(--maroon-700)' : 'var(--text-body)',
                    paddingBottom: 2, borderBottom: '2px solid ' + (it === active ? 'var(--gold-500)' : 'transparent'), transition: 'var(--transition-control)' }}>{it}</a>
              );
            })}
          </nav>
          <Button tone="primary" size="sm" icon="hand-coins" onClick={onAction}>{action}</Button>
        </>
      )}
      {mobile && open ? (
        <nav style={{ flexBasis: '100%', display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 'var(--space-4)' }}>
          {items.map(it => {
            if (isParent(it)) {
              const label = it.mobileLabel || it.label;
              const activeParent = it.children.includes(active);
              const subOpen = openMobileSub === it.label;
              return (
                <div key={it.label}>
                  <a href="#" aria-expanded={subOpen} onClick={e => { e.preventDefault(); setOpenMobileSub(subOpen ? null : it.label); }}
                    style={{ textDecoration: 'none', font: 'var(--text-label)', fontSize: 'var(--fs-body-lg)', minHeight: 48,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 var(--space-4)',
                      borderRadius: 'var(--radius-md)', color: activeParent ? 'var(--maroon-700)' : 'var(--text-body)',
                      background: activeParent ? 'var(--surface-brand-soft)' : 'transparent' }}>
                    {label}<Icon name={subOpen ? 'chevron-up' : 'chevron-down'} size={16} style={{ color: 'var(--text-faint)' }} />
                  </a>
                  {subOpen ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '2px 0 6px var(--space-4)' }}>
                      {it.children.map(child => (
                        <a key={child} href="#" onClick={e => { e.preventDefault(); go(child); }}
                          style={{ textDecoration: 'none', font: 'var(--text-label)', fontSize: 'var(--fs-body)', minHeight: 44,
                            display: 'flex', alignItems: 'center', padding: '0 var(--space-4)',
                            borderRadius: 'var(--radius-md)', color: child === active ? 'var(--maroon-700)' : 'var(--text-body)',
                            background: child === active ? 'var(--surface-brand-soft)' : 'transparent' }}>{child}</a>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }
            return (
              <a key={it} href="#" onClick={e => { e.preventDefault(); go(it); }}
                style={{ textDecoration: 'none', font: 'var(--text-label)', fontSize: 'var(--fs-body-lg)', minHeight: 48,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 var(--space-4)',
                  borderRadius: 'var(--radius-md)', color: it === active ? 'var(--maroon-700)' : 'var(--text-body)',
                  background: it === active ? 'var(--surface-brand-soft)' : 'transparent' }}>
                {it}<Icon name="chevron-right" size={16} style={{ color: 'var(--text-faint)' }} />
              </a>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
