const { PrayerTimeTable, SectionHeading, Tabs, Card, Badge, Switch, Icon } = window.SurauBatehLoriDesignSystem_c76578;

function SchedulePage() {
  const mobile = window.useKitBreakpoint();
  const [range, setRange] = React.useState('Hari ini');
  const d = window.SB_DATA;
  const week = ['Sen 10', 'Sel 11', 'Rab 12', 'Kam 13', 'Jum 14', 'Sab 15', 'Ahd 16'];
  return (
    <section style={{ padding: mobile ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)', background: 'var(--sand-100)', minHeight: 600 }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          <SectionHeading overline="Waktu Salat" title="Jadwal salat Kota Padang" description="Dihitung untuk koordinat Lori Lubuk Minturun, disesuaikan dengan pengumuman iqamah pengurus surau." />
          <Tabs items={['Hari ini', 'Pekan ini']} value={range} onChange={setRange} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr .72fr', gap: mobile ? 'var(--space-5)' : 'var(--space-8)', marginTop: 'var(--space-8)', alignItems: 'start' }}>
          {range === 'Hari ini' ? (
            <PrayerTimeTable times={d.times} activeName="Ashar" nextName="Maghrib" />
          ) : (
            <Card style={{ padding: 0, overflow: mobile ? 'auto' : 'hidden' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body-sm)' }}>
                <thead>
                  <tr style={{ background: 'var(--sand-200)' }}>
                    {['Hari', ...d.times.map(t => t.name)].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '12px 14px', fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 'var(--fw-semibold)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {week.map((day, i) => (
                    <tr key={day} style={{ background: i === 0 ? 'var(--status-next-soft)' : 'transparent', borderTop: '1px solid var(--border-default)' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 'var(--fw-semibold)', color: 'var(--text-strong)' }}>{day}</td>
                      {d.times.map(t => (
                        <td key={t.name} style={{ padding: '12px 14px', fontVariantNumeric: 'tabular-nums', color: 'var(--text-body)' }}>
                          {t.adzan.replace(/^(\d+):(\d+)$/, (m, h, mm) => String(Number(h)).padStart(2, '0') + ':' + String((Number(mm) + i) % 60).padStart(2, '0'))}
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
                <span style={{ font: 'var(--text-label)', color: 'var(--teal-800)' }}>Iqamah Ashar dalam 12 menit</span>
              </div>
              <p style={{ margin: '10px 0 0', fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>Layar TV surau menampilkan hitung mundur yang sama.</p>
            </Card>
            <Card>
              <span style={{ font: 'var(--text-label)', color: 'var(--text-strong)' }}>Pengaturan pengingat</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                <Switch label="Pengingat adzan" defaultChecked />
                <Switch label="Pengingat kajian" />
                <Switch label="Pengingat Jumat pagi" defaultChecked />
              </div>
            </Card>
            <Card tone="sand">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ font: 'var(--text-label)', color: 'var(--text-strong)' }}>Khatib Jumat</span>
                <Badge tone="brand">14 Ags</Badge>
              </div>
              <p style={{ margin: '8px 0 0', fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>Ust. H. Marwan Dt. Rajo — “Amanah dalam Bekerja”. Khutbah dimulai 12.10 WIB.</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { SchedulePage });
