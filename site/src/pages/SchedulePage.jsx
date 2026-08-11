import React from 'react';
import { Badge, Card, Icon, PrayerTimeTable, SectionHeading, Switch, Tabs, useBreakpoint } from '../ds.js';

const SHORT_DAY_NAMES = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

// Label hari untuk tabel "Pekan ini", dihitung dari tanggal asli (`YYYY-MM-DD`
// hasil `deriveSiteData`) -- bukan teks hardcode.
function dayLabel(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return `${SHORT_DAY_NAMES[date.getDay()]} ${date.getDate()}`;
}

export default function SchedulePage({ site }) {
  const mobile = useBreakpoint();
  const [range, setRange] = React.useState('Hari ini');

  return (
    <section style={{ padding: mobile ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)', background: 'var(--sand-100)', minHeight: 600 }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          <SectionHeading overline="Waktu Shalat" title="Jadwal shalat Kota Padang" description="Dihitung otomatis mengikuti metode Kementerian Agama RI (sudut fajar −20°, isya −18°, mazhab Syafi'i untuk Ashar, dengan ihtiyat" />
          <Tabs items={['Hari ini', 'Pekan ini']} value={range} onChange={setRange} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr .72fr', gap: mobile ? 'var(--space-5)' : 'var(--space-8)', marginTop: 'var(--space-8)', alignItems: 'start' }}>
          {range === 'Hari ini' ? (
            <PrayerTimeTable times={site.times} activeName={site.activePrayerName} nextName={site.nextPrayerName} />
          ) : (
            // Tabel "Pekan ini": 7 hari nyata ke depan dengan jam yang benar-benar
            // dihitung per tanggal (site.week), bukan lagi trik interpolasi offset.
            <Card style={{ padding: 0, overflow: mobile ? 'auto' : 'hidden' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)' }}>
                <thead>
                  <tr style={{ background: 'var(--sand-200)' }}>
                    {['Hari', ...site.times.map(t => t.name)].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '12px 14px', fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 'var(--fw-semibold)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {site.week.map((day, i) => (
                    <tr key={day.date} style={{ background: i === 0 ? 'var(--status-next-soft)' : 'transparent', borderTop: '1px solid var(--border-default)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)' }}>{dayLabel(day.date)}</td>
                      {day.times.map(t => (
                        <td key={t.name} style={{ padding: '12px 14px', fontVariantNumeric: 'tabular-nums', color: 'var(--text-body)' }}>
                          {t.adzan}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <Card tone="calm">
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Icon name="volume-2" size={18} style={{ color: 'var(--teal-800)' }} />
                <span style={{ font: 'var(--text-label)', color: 'var(--teal-800)' }}>Waktu shalat berikutnya: {site.nextPrayerName}</span>
              </div>
            </Card>
            {/* <Card>
              <span style={{ font: 'var(--text-label)', color: 'var(--text-strong)' }}>Pengaturan pengingat</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                <Switch label="Pengingat adzan" defaultChecked />
                <Switch label="Pengingat kajian" />
                <Switch label="Pengingat Jumat pagi" defaultChecked />
              </div>
            </Card> */}
            {site.khatibJumat ? (
              <Card tone="sand">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ font: 'var(--text-label)', color: 'var(--text-strong)' }}>Khatib Jumat</span>
                  <Badge tone="brand">{site.khatibJumat.day} {site.khatibJumat.month}</Badge>
                </div>
                <p style={{ margin: '8px 0 0', fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>
                  {site.khatibJumat.speaker} — “{site.khatibJumat.title.replace(/^Khutbah Jumat: /, '')}”. Khutbah dimulai {site.khatibJumat.time}.
                </p>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
