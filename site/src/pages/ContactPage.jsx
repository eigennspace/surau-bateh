import React from 'react';
import { Card, Icon, SectionHeading, Button, useBreakpoint } from '../ds.js';
import { openWhatsApp } from '../lib/whatsapp.js';

const pad = m => (m ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)');

export default function ContactPage({ site }) {
  const c = site.contact;
  const mobile = useBreakpoint();
  return (
    <section style={{ padding: pad(mobile), background: 'var(--sand-200)', minHeight: 560 }}>
      <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto' }}>
        <SectionHeading align="center" overline="Kontak" title="Menghubungi pengurus surau"
          description="Untuk pertanyaan jadwal kajian, khatib Jumat, atau penyaluran infak." />
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-8)' }}>
          {c.pengurus.map(p => (
            <Card key={p.name} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <span style={{ width: 42, height: 42, display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-md)', background: 'var(--surface-brand-soft)', color: 'var(--maroon-700)' }}>
                <Icon name="user" size={20} />
              </span>
              <div>
                <div style={{ font: 'var(--text-h4)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{p.name}</div>
                <div style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>{p.role}</div>
              </div>
              <a href={'tel:' + p.phone} style={{ display: 'flex', alignItems: 'center', gap: 8, font: 'var(--text-label)', fontSize: 'var(--fs-body)', textDecoration: 'none', fontVariantNumeric: 'tabular-nums' }}>
                <Icon name="phone" size={16} />{p.phone}
              </a>
              <Button tone="secondary" size="sm" icon="message-circle" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}
                onClick={() => openWhatsApp(p.phone, `Assalamu'alaikum, saya ingin menghubungi ${p.name} terkait Surau Bateh`)}>Kirim WhatsApp</Button>
            </Card>
          ))}
          <Card tone="sand" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <span style={{ width: 42, height: 42, display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-md)', background: 'var(--white)', color: 'var(--maroon-700)' }}>
              <Icon name="map-pin" size={20} />
            </span>
            <div>
              <div style={{ font: 'var(--text-h4)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>Lokasi surau</div>
              <div style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>Lori Lubuk Minturun, Kota Padang, Sumatera Barat</div>
            </div>
            <a href={c.maps} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, font: 'var(--text-label)', fontSize: 'var(--fs-body)', textDecoration: 'none', marginTop: 'auto' }}>
              <Icon name="map" size={16} />Buka di Google Maps
            </a>
          </Card>
        </div>
        <Card tone="calm" style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Icon name="clock" size={18} style={{ color: 'var(--teal-800)', marginTop: 2 }} />
          <p style={{ margin: 0, fontSize: 'var(--fs-body-sm)', color: 'var(--text-body)' }}>
            Pengurus paling mudah ditemui di surau selepas Maghrib. Jalan menuju surau menanjak — kabari lebih dahulu bila datang bersama rombongan.
          </p>
        </Card>
      </div>
    </section>
  );
}
