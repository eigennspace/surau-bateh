import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Badge } from '../core/Badge.jsx';
import { useBreakpoint } from '../core/useBreakpoint.js';

const ICONS = { Subuh: 'sunrise', Syuruq: 'sun', Dzuhur: 'sun', Ashar: 'cloud-sun', Maghrib: 'sunset', Isya: 'moon-star' };

export function PrayerTimeRow({ name, adzan, iqamah, state = 'default', variant = 'solid', style }) {
  const mobile = useBreakpoint();
  const active = state === 'active', next = state === 'next', glass = variant === 'glass';
  const bg = active ? 'var(--status-active)' : next ? (glass ? 'rgba(220,201,69,.20)' : 'var(--status-next-soft)') : 'transparent';
  const bd = active ? 'var(--teal-700)' : next ? (glass ? 'rgba(231,216,119,.42)' : 'var(--gold-200)') : 'transparent';
  const fg = active ? 'var(--white)' : glass ? 'var(--sand-100)' : 'var(--text-strong)';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', alignItems: 'center', gap: 'var(--space-4)',
      padding: '14px var(--space-5)', borderRadius: 'var(--radius-md)', transition: 'var(--transition-control)',
      background: bg, color: fg, border: '1px solid ' + bd, fontFamily: 'var(--font-sans)', ...style }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10, font: 'var(--text-label)', fontSize: 'var(--fs-body)' }}>
        <Icon name={ICONS[name] || 'clock'} size={18} style={{ color: active ? 'var(--gold-400)' : glass ? 'rgba(253,251,246,.62)' : 'var(--text-faint)' }} />
        {name}
        {active ? 
        <Badge tone="solid" style={{ background: 'rgba(255,255,255,.16)', color: 'var(--white)', fontSize: 'var(--fs-overline)' }}>
          {mobile ?
          <Icon name={'circle-play'} size={18} style={{ color: active ? 'var(--gold-400)' : glass ? 'rgba(253,251,246,.62)' : 'var(--text-faint)' }} />
          : 'Berlangsung'
          }
        </Badge> : null}
        {next ? 
        <Badge tone="accent" style={glass ? { background: 'rgba(231,216,119,.26)', color: 'var(--gold-200)', fontSize: 'var(--fs-overline)' } : { fontSize: 'var(--fs-overline)' }}> 
          {mobile ?
            <Icon name={'calendar-clock'} size={18} style={{ color: active ? 'var(--gold-400)' : glass ? 'rgba(253,251,246,.62)' : 'var(--text-faint)' }} />
            :
            'Berikutnya'
          }
        </Badge> : null}
      </span>
      <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-body-lg)' }}>{adzan}</span>
      {iqamah ? <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: 'var(--fs-body-sm)', width: 62, textAlign: 'right',
        color: active ? 'rgba(255,255,255,.75)' : glass ? 'rgba(253,251,246,.68)' : 'var(--text-muted)' }}>{iqamah}</span> : <span style={{ width: 62 }} />}
    </div>
  );
}