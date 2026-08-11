import React from 'react';
import { PrayerTimeRow } from './PrayerTimeRow.jsx';
import { Icon } from '../core/Icon.jsx';

export function PrayerTimeTable({ date = 'Senin, 10 Agustus 2026', hijri = '', location = 'Kota Padang',
  times = [], activeName, nextName, variant = 'solid', style }) {
  const glass = variant === 'glass';
  const shell = glass
    ? { background: 'rgba(253,251,246,.14)', border: '1px solid rgba(253,251,246,.24)', backdropFilter: 'var(--blur-glass)', WebkitBackdropFilter: 'var(--blur-glass)', boxShadow: '0 26px 60px rgba(16,18,21,.34)' }
    : { background: 'var(--surface-card)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-sm)' };
  const headBg = glass ? 'rgba(253,251,246,.10)' : 'var(--sand-200)';
  const headBorder = glass ? '1px solid rgba(253,251,246,.18)' : '1px solid var(--border-hairline)';
  const c = {
    date: glass ? 'var(--sand-100)' : 'var(--text-strong)',
    hijri: glass ? 'var(--gold-400)' : 'var(--maroon-700)',
    meta: glass ? 'rgba(253,251,246,.74)' : 'var(--text-muted)',
    label: glass ? 'rgba(253,251,246,.58)' : 'var(--text-faint)',
  };
  return (
    <section style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', fontFamily: 'var(--font-sans)', ...shell, ...style }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)',
        padding: 'var(--space-5) var(--space-6)', background: headBg, borderBottom: headBorder }}>
        <div>
          <div style={{ font: 'var(--text-label)', color: c.date }}>{date}</div>
          <div style={{ fontSize: 'var(--fs-body-sm)', color: c.hijri }}>{hijri}</div>
        </div>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-body-sm)', color: c.meta }}>
          <Icon name="map-pin" size={15} />{location}
        </span>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 'var(--space-4)', padding: '10px var(--space-5) 2px' }}>
        <span style={{ fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: c.label }}>Shalat</span>
        <span style={{ fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: c.label }}>Adzan</span>
        <span style={{ fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: c.label, width: 62, textAlign: 'right' }}>Iqamah</span>
      </div>
      <div style={{ padding: '0 var(--space-3) var(--space-4)' }}>
        {times.map(t => <PrayerTimeRow key={t.name} variant={variant} {...t} state={t.name === activeName ? 'active' : t.name === nextName ? 'next' : 'default'} />)}
      </div>
    </section>
  );
}
