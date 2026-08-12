import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Badge } from '../core/Badge.jsx';
import { Dialog } from '../feedback/Dialog.jsx';

function EventDetail({ day, month, title, speaker, time, place, category, isToday, backgroundImage }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {backgroundImage ? (
        <img src={backgroundImage} alt={title} style={{ display: 'block', width: '100%', aspectRatio: '16 / 9',
          objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
      ) : null}
      {(category || isToday) ? (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {category ? <Badge tone="accent" style={{ alignSelf: 'flex-start', fontSize: 'var(--fs-overline)' }}>{category}</Badge> : null}
          {isToday ? <Badge tone="active" style={{ alignSelf: 'flex-start', fontSize: 'var(--fs-overline)' }}>Hari Ini</Badge> : null}
        </div>
      ) : null}
      <h3 style={{ margin: 0, font: 'var(--text-h3)', color: 'var(--text-strong)' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--fs-body)', color: 'var(--text-muted)' }}>
        {(day || month) ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="calendar" size={16} />{[day, month].filter(Boolean).join(' · ')}</span> : null}
        {speaker ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="mic" size={16} />{speaker}</span> : null}
        {time ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="clock" size={16} />{time}</span> : null}
        {place ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="map-pin" size={16} />{place}</span> : null}
      </div>
    </div>
  );
}

export function EventItem({ day, month, title, speaker, time, place, category, isToday, backgroundImage, style }) {
  const [hover, setHover] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const textColor = backgroundImage ? 'var(--white)' : 'var(--text-strong)';
  const mutedColor = backgroundImage ? 'rgba(255,255,255,.85)' : 'var(--text-muted)';
  const chevronColor = backgroundImage ? 'rgba(255,255,255,.85)' : 'var(--text-faint)';
  return (
    <>
      <article onClick={() => setOpen(true)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'center', padding: 'var(--space-4)', cursor: 'pointer',
          background: backgroundImage
            ? `linear-gradient(rgba(20,20,20,.7), rgba(20,20,20,.7)), url(${backgroundImage})`
            : 'var(--surface-card)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)',
          boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-xs)', transform: hover ? 'translateY(-2px)' : 'none',
          transition: 'var(--transition-control)', fontFamily: 'var(--font-sans)', ...style }}>
        <div style={{ width: 62, height: 66, flex: '0 0 auto', display: 'grid', placeItems: 'center', gap: 0,
          background: 'var(--surface-brand-soft)', border: '1px solid var(--maroon-100)', borderRadius: 'var(--radius-md)' }}>
          <span style={{ font: 'var(--text-h3)', color: 'var(--maroon-700)', lineHeight: 1 }}>{day}</span>
          <span style={{ fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: 'var(--maroon-600)', textAlign: 'center' }}>{month}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {(category || isToday) ? (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {category ? <Badge tone="accent" style={{ alignSelf: 'flex-start', fontSize: 'var(--fs-overline)' }}>{category}</Badge> : null}
              {isToday ? <Badge tone="active" style={{ alignSelf: 'flex-start', fontSize: 'var(--fs-overline)' }}>Hari Ini</Badge> : null}
            </div>
          ) : null}
          <h4 style={{ margin: 0, font: 'var(--text-h4)', fontWeight: 'var(--fw-bold)', color: textColor }}>{title}</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', fontSize: 'var(--fs-body-sm)', color: mutedColor }}>
            {speaker ? <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="mic" size={14} />{speaker}</span> : null}
            {time ? <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="clock" size={14} />{time}</span> : null}
            {place ? <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Icon name="map-pin" size={14} />{place}</span> : null}
          </div>
        </div>
        <Icon name="chevron-right" size={18} style={{ color: chevronColor }} />
      </article>
      <Dialog open={open} onClose={() => setOpen(false)} closeOnBackdropClick>
        <EventDetail day={day} month={month} title={title} speaker={speaker} time={time} place={place}
          category={category} isToday={isToday} backgroundImage={backgroundImage} />
      </Dialog>
    </>
  );
}
