import React from 'react';
import { Card, Checkbox, Dialog, Input, RadioGroup, Button, SectionHeading, Select, Toast, useBreakpoint } from '../ds.js';
import DonationCard from '../components/DonationCard.jsx';

export default function DonatePage({ site }) {
  const mobile = useBreakpoint();
  const [nominal, setNominal] = React.useState('Rp 100.000');
  const [confirm, setConfirm] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const peruntukan = site.donation.campaign
    ? [site.donation.campaign.title, 'Operasional harian', 'Kajian & khatib', 'Santunan anak yatim']
    : ['Operasional harian', 'Kajian & khatib', 'Santunan anak yatim'];

  return (
    <section style={{ padding: mobile ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)', background: 'var(--sand-200)', minHeight: 600 }}>
      <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto' }}>
        <SectionHeading align="center" overline="Infak & Sedekah" title="Pengembangan Dakwah"
          description="Bagian dari perjuangan dakwah Surau Bateh, karena Pesantren Ribath As-Sa'ady adalah salah satu sikoci dari Surau Bateh" />
        <Card style={{ marginTop: 'var(--space-8)', padding: mobile ? 'var(--space-5)' : 'var(--space-8)' }}>
          <DonationCard donation={site.donation} tone="light" qrisSize={mobile ? 300 : 300} mobile={mobile} />
        </Card>
      </div>
      <Dialog open={confirm} title="Konfirmasi infak" description={nominal + (site.donation.campaign ? ' untuk ' + site.donation.campaign.title.toLowerCase() + '.' : '.')}
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
