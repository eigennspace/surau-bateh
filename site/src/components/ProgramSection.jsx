import React from 'react';
import { Card, EventItem, SectionHeading, useBreakpoint } from '../ds.js';
import ContactCard from './ContactCard.jsx';

const pad = m => (m ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)');

/**
 * Blok halaman program "Kegiatan & Aksi Sosial" (Khitanan/Dauroh) —
 * narasi + jadwal terfilter kategori + kartu kontak person. Dipakai
 * langsung oleh `KhitananPage`/`DaurohPage`, mengikuti pola tampilan
 * `AgendaSection` (dua kolom desktop, ditumpuk di mobile) tapi tanpa
 * filter hari/pengumuman yang khusus dipakai halaman Kajian.
 */
export default function ProgramSection({ overline, title, narrative, events, person, whatsappMessage }) {
  const mobile = useBreakpoint();
  return (
    <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid',
        gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1.4fr .8fr', gap: mobile ? 'var(--space-8)' : 'var(--space-12)', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          <SectionHeading overline={overline} title={title} description={narrative} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <span style={{ font: 'var(--text-label)', fontSize: 'var(--fs-body)', color: 'var(--text-strong)' }}>Jadwal</span>
            {events.length > 0
              ? events.map(e => <EventItem key={`${e.day}-${e.title}`} {...e} />)
              : <p style={{ color: 'var(--text-muted)', font: 'var(--text-body-default)' }}>Kegiatan akan segera hadir</p>}
          </div>
        </div>
        <aside>
          <Card tone="dark">
            <ContactCard person={person} tone="dark" heading={`Berminat ikut ${title}?`} message={whatsappMessage} />
          </Card>
        </aside>
      </div>
    </section>
  );
}
