const { Card, SectionHeading, Input, Select, RadioGroup, Checkbox, Button, Badge, Dialog, Toast, DonationProgress, Icon } = window.SurauBatehLoriDesignSystem_c76578;

function DonatePage() {
  const mobile = window.useKitBreakpoint();
  const [nominal, setNominal] = React.useState('Rp 100.000');
  const [confirm, setConfirm] = React.useState(false);
  const [done, setDone] = React.useState(false);
  return (
    <section style={{ padding: mobile ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)', background: 'var(--sand-200)', minHeight: 600 }}>
      <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto' }}>
        <SectionHeading align="center" overline="Infak & Sedekah" title="Salurkan infak untuk surau"
          description="Dana dikelola pengurus dan dilaporkan setiap bulan pada papan pengumuman dan halaman berita." />
        <Card style={{ marginTop: 'var(--space-8)', padding: mobile ? 'var(--space-5)' : 'var(--space-8)' }}>
          <DonationProgress title="Renovasi Atap Surau" collected={38500000} target={75000000} deadline="hingga 30 Sep" />
          <div style={{ height: 1, background: 'var(--border-default)', margin: 'var(--space-8) 0' }} />
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr 1fr', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <Input label="Nama jamaah" placeholder="Nama lengkap atau 'Hamba Allah'" icon="user" />
              <Input label="Nomor WhatsApp" placeholder="08xx" icon="phone" hint="Untuk pengiriman tanda terima." />
              <Select label="Peruntukan" options={['Renovasi atap surau', 'Operasional harian', 'Kajian & khatib', 'Santunan anak yatim']} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <RadioGroup label="Nominal infak" value={nominal} onChange={setNominal}
                options={['Rp 50.000', 'Rp 100.000', 'Rp 250.000', 'Nominal lain']} />
              <Checkbox label="Sembunyikan nama saya" description="Tercatat sebagai Hamba Allah pada laporan." />
              <Button tone="primary" size="lg" fullWidth icon="hand-coins" onClick={() => setConfirm(true)}>Lanjutkan</Button>
            </div>
          </div>
        </Card>
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
          <Badge tone="neutral" icon="landmark">BSI 7011 2233 44 a.n. Surau Bateh Lori</Badge>
          <Badge tone="neutral" icon="qr-code">QRIS tersedia di papan pengumuman</Badge>
        </div>
      </div>
      <Dialog open={confirm} title="Konfirmasi infak" description={nominal + ' untuk renovasi atap surau.'}
        onClose={() => setConfirm(false)}
        footer={<>
          <Button tone="ghost" onClick={() => setConfirm(false)}>Batal</Button>
          <Button tone="primary" onClick={() => { setConfirm(false); setDone(true); setTimeout(() => setDone(false), 4000); }}>Kirim</Button>
        </>} />
      {done ? <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 60 }}>
        <Toast tone="success" title="Infak tercatat" message="Jazakumullah khairan, tanda terima dikirim via WhatsApp." onClose={() => setDone(false)} />
      </div> : null}
    </section>
  );
}
Object.assign(window, { DonatePage });
