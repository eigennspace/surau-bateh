import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { PhotoLightbox } from '../feedback/PhotoLightbox.jsx';

export function PhotoTile({ src, alt = '', caption, meta, icon, ratio = '4 / 3', position = 'center', tone = 'scrim', style }) {
  const [hover, setHover] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <figure onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        onClick={() => setOpen(true)}
        style={{ margin: 0, position: 'relative', aspectRatio: ratio, borderRadius: 'var(--radius-lg)', overflow: 'hidden',
          boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)', transition: 'var(--transition-control)', cursor: 'pointer', ...style }}>
        <img src={src} alt={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: position, transform: hover ? 'scale(1.03)' : 'none', transition: 'transform var(--dur-slow) var(--ease-standard)' }} />
        {caption || meta ? (
          <figcaption style={{ position: 'absolute', inset: 'auto 0 0 0', padding: '38px var(--space-5) var(--space-5)',
            background: tone === 'scrim' ? 'var(--overlay-scrim)' : 'none', color: 'var(--sand-100)', fontFamily: 'var(--font-sans)' }}>
            {meta ? <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-overline)',
              letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: 5 }}>
              {icon ? <Icon name={icon} size={13} /> : null}{meta}</span> : null}
            {caption ? <span style={{ display: 'block', font: 'var(--text-label)', fontSize: 'var(--fs-body)', textWrap: 'pretty' }}>{caption}</span> : null}
          </figcaption>
        ) : null}
      </figure>
      {open ? <PhotoLightbox src={src} alt={alt} caption={caption} meta={meta} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
