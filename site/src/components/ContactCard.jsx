import React from 'react';
import { Icon, Button } from '../ds.js';
import { openWhatsApp } from '../lib/whatsapp.js';

/**
 * Card kontak pengurus siap-render untuk sidebar Agenda — menggantikan
 * `DonationCard` di sana. Menampilkan pengurus utama (`contact.pengurus[0]`)
 * dan tombol WhatsApp langsung untuk pertanyaan seputar jadwal.
 */
export default function ContactCard({ contact, tone = 'dark' }) {
  const person = contact?.pengurus?.[0];
  if (!person) return null;
  const dark = tone === 'dark';
  const strong = dark ? 'var(--sand-100)' : 'var(--text-strong)';
  const muted = dark ? 'rgba(253,251,246,.72)' : 'var(--text-muted)';

  const handleWhatsApp = () => {
    openWhatsApp(person.phone, "Assalamu'alaikum, saya ingin bertanya soal jadwal kajian di Surau Bateh Lori");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <span style={{ fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: muted }}>
        Kontak
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ font: 'var(--text-h4)', fontWeight: 'var(--fw-bold)', color: strong }}>
          Ada pertanyaan soal jadwal?
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <span style={{ width: 34, height: 34, flex: '0 0 auto', display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-md)',
            background: dark ? 'rgba(253,251,246,.08)' : 'var(--surface-brand-soft)', color: dark ? 'var(--sand-100)' : 'var(--maroon-700)' }}>
            <Icon name="user" size={16} />
          </span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ font: 'var(--text-label)', fontSize: 'var(--fs-body)', color: strong }}>{person.name}</span>
            <span style={{ fontSize: 'var(--fs-body-sm)', color: muted }}>{person.role}</span>
          </div>
        </div>
      </div>
      <Button tone="accent" size="sm" fullWidth icon="message-circle" onClick={handleWhatsApp}>
        Hubungi via WhatsApp
      </Button>
    </div>
  );
}
