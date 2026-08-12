import React from 'react';
import ProgramSection from '../components/ProgramSection.jsx';

export default function BaktiSosialPage({ site }) {
  const events = site.events.filter(e => e.category === 'Bakti Sosial');
  return (
    <ProgramSection
      overline="Sosial"
      title={site.baktiSosial?.title || 'Bakti Sosial'}
      narrative={site.baktiSosial?.narrative}
      events={events}
      person={site.contact?.baktiSosial}
      whatsappMessage="Assalamu'alaikum, saya ingin bertanya soal program Bakti Sosial di Surau Bateh Lori"
      contactHeading="Ingin ikut serta atau menyalurkan bantuan?"
      gallery={site.baktiSosial?.gallery}
    />
  );
}
