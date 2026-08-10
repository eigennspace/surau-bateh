import React from 'react';
import { Badge, Button, Icon, PrayerTimeTable, useBreakpoint } from '../ds.js';
import fotoSurau from '../../../New Surau Bateh Lori Design System/assets/foto-surau.jpg';

export default function Hero({ site, onNavigate }) {
  const mobile = useBreakpoint();
  return (
    <section style={{ position: 'relative', padding: mobile ? '48px var(--space-5) var(--space-12)' : '96px var(--space-8) var(--gutter-section)', overflow: 'hidden',
      backgroundImage: `linear-gradient(100deg,rgba(34,38,44,.86) 0%,rgba(34,38,44,.68) 42%,rgba(34,38,44,.44) 72%,rgba(34,38,44,.52) 100%), url(${fotoSurau})`,
      backgroundSize: 'cover', backgroundPosition: 'center 58%' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1.05fr .95fr', gap: mobile ? 'var(--space-8)' : 'var(--space-16)', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', alignItems: 'flex-start' }}>
          <Badge tone="brand" icon="map-pin" style={{ background: 'rgba(253,251,246,.92)', color: 'var(--maroon-700)' }}>Lori Lubuk Minturun, Kota Padang</Badge>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-extrabold)', lineHeight: 'var(--lh-tight)', fontSize: mobile ? 'var(--fs-h1)' : 'var(--fs-display-1)', letterSpacing: 'var(--ls-display)', color: 'var(--sand-100)', textWrap: 'balance', textShadow: '0 2px 20px rgba(34,38,44,.35)' }}>
            Surau Bateh Lori,<br />rumah ibadah <span style={{ color: 'var(--gold-500)' }}>warga nagari</span>
          </h1>
          <p style={{ margin: 0, font: 'var(--text-body-default)', fontSize: 'var(--fs-body-lg)', color: 'rgba(253,251,246,.86)', maxWidth: 460, textWrap: 'pretty' }}>
            Salat lima waktu, kajian pekanan, dan latihan silat tradisi bagi jamaah. Semua kegiatan terbuka untuk warga sekitar surau.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', width: mobile ? '100%' : 'auto' }}>
            <Button tone="primary" size="lg" icon="hand-coins" fullWidth={mobile} onClick={() => onNavigate('Infak')}>Salurkan Infak</Button>
            <Button tone="accent" size="lg" icon="calendar-days" fullWidth={mobile} onClick={() => onNavigate('Kajian')}>Lihat Agenda</Button>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap', paddingTop: 'var(--space-4)', color: 'rgba(253,251,246,.72)', fontSize: 'var(--fs-body-sm)' }}>
            <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Icon name="users" size={15} />180 jamaah rutin</span>
            <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Icon name="mic" size={15} />Kajian dua kali sepekan</span>
            <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Icon name="users" size={15} />Gotong royong tiap pekan</span>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <PrayerTimeTable variant="glass" style={{ position: 'relative', zIndex: 1 }}
            times={site.times} activeName={site.activePrayerName} nextName={site.nextPrayerName} />
        </div>
      </div>
    </section>
  );
}
