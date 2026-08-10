import React from 'react';
import { PhotoTile, SectionHeading, useBreakpoint } from '../ds.js';

const pad = m => (m ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)');

export default function GallerySection({ site }) {
  const mobile = useBreakpoint();
  return (
    <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading overline="Dokumentasi" title="Suasana surau" description="Foto-foto kegiatan yang direkam pengurus surau." />
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,minmax(0,1fr))' : 'repeat(4,1fr)', gridAutoRows: 'auto', gap: 'var(--space-3)', marginTop: 'var(--space-8)' }}>
          {site.gallery.map(photo => (
            <PhotoTile key={photo.src} src={photo.src} alt={photo.alt} ratio={photo.ratio} position={photo.position}
              meta={photo.meta} caption={photo.caption} style={photo.span ? { gridColumn: `span ${photo.span}` } : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}
