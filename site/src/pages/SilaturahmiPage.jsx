import React from 'react';
import ProgramSection from '../components/ProgramSection.jsx';

export default function SilaturahmiPage({ site }) {
  const events = site.events.filter(e => e.category === 'Silaturahmi');
  return (
    <ProgramSection
      overline="Sosial"
      title={site.silaturahmi?.title || 'Silaturahmi & Kerjasama Lembaga'}
      narrative={site.silaturahmi?.narrative}
      events={events}
      person={site.contact?.silaturahmi}
      whatsappMessage="Assalamu'alaikum, saya ingin menjajaki kerjasama dengan Surau Bateh Lori"
      contactHeading="Ingin menjalin kerjasama dengan Surau Bateh?"
      gallery={site.silaturahmi?.gallery}
    />
  );
}
