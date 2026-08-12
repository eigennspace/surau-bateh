import React from 'react';
import { Icon, Button } from '../ds.js';
import { openWhatsApp } from '../lib/whatsapp.js';

/**
 * Card kontak person siap-render, dipakai sidebar Agenda (`contact.pengurus[0]`
 * lewat prop `contact`) dan halaman Khitanan/Dauroh (person spesifik lewat
 * prop `person`, mem-bypass `contact.pengurus`). Menampilkan nama + tombol
 * WhatsApp langsung; `message`/`heading` bisa disesuaikan per pemanggil.
 */
export default function ContactCard({ contact, person: personProp, tone = 'dark',
  heading = 'Ada pertanyaan soal jadwal?', message = "Assalamu'alaikum, saya ingin bertanya soal jadwal kajian di Surau Bateh Lori" }) {
  const person = personProp || contact?.pengurus?.[0];
  if (!person) return null;
  const dark = tone === 'dark';
  const strong = dark ? 'var(--sand-100)' : 'var(--text-strong)';
  const muted = dark ? 'rgba(253,251,246,.72)' : 'var(--text-muted)';

  const handleWhatsApp = () => {
    openWhatsApp(person.phone, message);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <span style={{ fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: muted }}>
        Kontak
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ font: 'var(--text-h4)', fontWeight: 'var(--fw-bold)', color: strong }}>
          {heading}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <span style={{ width: 34, height: 34, flex: '0 0 auto', display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-md)',
            background: dark ? 'rgba(253,251,246,.08)' : 'var(--surface-brand-soft)', color: dark ? 'var(--sand-100)' : 'var(--maroon-700)' }}>
            <Icon name="user" size={16} />
          </span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ font: 'var(--text-label)', fontSize: 'var(--fs-body)', color: strong }}>{person.name}</span>
            <span style={{ fontSize: 'var(--fs-body-sm)', color: muted }}>{person.role}</span>
            {person.phone ? (
              <a href={'tel:' + person.phone} style={{ fontSize: 'var(--fs-body-sm)', color: muted, textDecoration: 'none', fontVariantNumeric: 'tabular-nums' }}>
                {person.phone}
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <Button tone="accent" size="sm" fullWidth icon="message-circle" onClick={handleWhatsApp}>
        Hubungi via WhatsApp
      </Button>
    </div>
  );
}
