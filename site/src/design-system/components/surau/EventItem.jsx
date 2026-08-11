import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Badge } from '../core/Badge.jsx';

export function EventItem({ day, month, title, speaker, time, place, category, isToday, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'center', padding: 'var(--space-4)', cursor: onClick ? 'pointer' : 'default',
        background: 'var(--surface-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-xs)', transform: hover ? 'translateY(-2px)' : 'none',
        transition: 'var(--transition-control)', fontFamily: 'var(--font-sans)', ...style }}>
      <div style={{ width: 62, height: 66, flex: '0 0 auto', display: 'grid', placeItems: 'center', gap: 0,
        background: 'var(--surface-brand-soft)', border: '1px solid var(--maroon-100)', borderRadius: 'var(--radius-md)' }}>
        <span style={{ font: 'var(--text-h3)', color: 'var(--maroon-700)', lineHeight: 1 }}>{day}</span>
        <span style={{ fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: 'var(--maroon-600)' }}>{month}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {(category || isToday) ? (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {category ? <Badge tone="accent" style={{ alignSelf: 'flex-start', fontSize: 'var(--fs-overline)' }}>{category}</Badge> : null}
            {isToday ? <Badge tone="active" style={{ alignSelf: 'flex-start', fontSize: 'var(--fs-overline)' }}>Hari Ini</Badge> : null}
          </div>
        ) : null}
        <h4 style={{ margin: 0, font: 'var(--text-h4)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{title}</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>
          {speaker ? <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="mic" size={14} />{speaker}</span> : null}
          {time ? <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="clock" size={14} />{time}</span> : null}
          {place ? <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="map-pin" size={14} />{place}</span> : null}
        </div>
      </div>
      {onClick ? <Icon name="chevron-right" size={18} style={{ color: 'var(--text-faint)' }} /> : null}
    </article>
  );
}
