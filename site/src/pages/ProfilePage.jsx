import React from 'react';
import { Badge, Card, PhotoTile, SectionHeading, StatBlock, Timeline, useBreakpoint } from '../ds.js';
import pembangunanSurau from '../design-system/assets/photos/pembangunan-surau.jpg';
import gotongRoyongBelakang from '../design-system/assets/photos/gotong-royong-belakang.jpg';
import pengurusSurau from '../design-system/assets/photos/pengurus-surau.jpg';

const pad = m => (m ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)');

export default function ProfilePage({ site }) {
  const mobile = useBreakpoint();
  return (
    <div>
      <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr 1fr', gap: mobile ? 'var(--space-8)' : 'var(--space-16)', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', alignItems: 'flex-start' }}>
            <Badge tone="brand" icon="map-pin">Lori Lubuk Minturun, Kota Padang</Badge>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-extrabold)', lineHeight: 'var(--lh-snug)', fontSize: mobile ? 'var(--fs-h2)' : 'var(--fs-h1)', color: 'var(--text-strong)', textWrap: 'balance' }}>Dibangun bersama, dari halaman yang masih tanah</h1>
            <p style={{ margin: 0, font: 'var(--text-body-default)', color: 'var(--text-muted)', maxWidth: 480, textWrap: 'pretty' }}>
              Surau Bateh Lori berdiri di lereng bukit di tepi nagari. Surau ini dikerjakan bertahap oleh jamaah sendiri — dari tiang beton dan tumpukan batu bata sampai ruang shalat berkarpet yang dipakai hari ini.
            </p>
            <p style={{ margin: 0, font: 'var(--text-body-default)', color: 'var(--text-muted)', maxWidth: 480, textWrap: 'pretty' }}>
              Setiap pekan halaman dan lerengnya dibersihkan bergiliran. Pekerjaan itu tidak pernah selesai, dan justru dari situ surau ini hidup.
            </p>
          </div>
          <PhotoTile src={pembangunanSurau} alt="Masa pembangunan surau" ratio="4 / 5" position="center 45%"
            meta="Masa Pembangunan" icon="hammer" caption="Memasang dinding bata di sisi surambi bawah." />
        </div>
      </section>
      <section style={{ background: 'var(--surface-dark)', padding: pad(mobile) }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr 1fr', gap: mobile ? 'var(--space-8)' : 'var(--space-12)', alignItems: 'center' }}>
          <PhotoTile src={gotongRoyongBelakang} alt="Membersihkan sisi belakang surau" ratio="4 / 3" position="center 55%"
            meta="Gotong Royong" icon="users" caption="Merapikan area surau" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <h2 style={{ margin: 0, font: 'var(--text-h2)', color: 'var(--sand-100)', textWrap: 'balance' }}>Dikelola pengurus, dikerjakan jamaah</h2>
            <p style={{ margin: 0, font: 'var(--text-body-default)', color: 'var(--slate-300)', maxWidth: 460, textWrap: 'pretty' }}>
              Pengurus surau mengatur jadwal kajian & tawajjuh pekanan, dan laporan kas bulanan. Kegiatan hariannya dijalankan bergiliran oleh jamaah sekitar.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'var(--space-4)' }}>
              {site.stats.slice(0, 2).map(s => (
                <StatBlock key={s.label} tone="dark" icon={s.icon} value={s.value} label={s.label} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
        <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto' }}>
          <SectionHeading overline="Silsilah" title="Ilmu Tauhid" />
          <Card style={{ marginTop: 'var(--space-8)', padding: mobile ? 'var(--space-5)' : 'var(--space-8)' }}>
            <Timeline variant="silsilah" items={site.ilmuTauhid} />
          </Card>
        </div>
      </section>
      <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
        <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto' }}>
          <SectionHeading overline="Silsilah" title="Ilmu Fiqh" />
          <Card style={{ marginTop: 'var(--space-8)', padding: mobile ? 'var(--space-5)' : 'var(--space-8)' }}>
            <Timeline variant="silsilah" items={site.ilmuFiqh} />
          </Card>
        </div>
      </section>
      <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
        <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto' }}>
          <SectionHeading overline="Silsilah" title="Ilmu Tasawuf" />
          <Card style={{ marginTop: 'var(--space-8)', padding: mobile ? 'var(--space-5)' : 'var(--space-8)' }}>
            <Timeline variant="silsilah" items={site.ilmuTasawuf} />
          </Card>
        </div>
      </section>
      <section style={{ padding: pad(mobile), background: 'var(--sand-200)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <SectionHeading align="center" overline="Pengurus" title="Musyawarah pengurus dan tuanku" />
          <PhotoTile src={pengurusSurau} alt="Pengurus surau berfoto bersama" ratio={mobile ? '4 / 3' : '16 / 7'} position="center 45%"
            style={{ marginTop: 'var(--space-8)' }} caption="Selepas musyawarah pengurus di ruang utama." />
        </div>
      </section>
    </div>
  );
}
