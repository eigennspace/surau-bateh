import React from 'react';
import ProgramSection from '../components/ProgramSection.jsx';

export default function KhitananPage({ site }) {
  const events = site.events.filter(e => e.category === 'Khitanan');
  return (
    <ProgramSection
      overline="Kegiatan & Aksi Sosial"
      title={site.khitanan?.title || 'Khitanan'}
      narrative={site.khitanan?.narrative}
      events={events}
      person={site.contact?.khitanan}
      whatsappMessage="Assalamu'alaikum, saya ingin bertanya soal program Khitanan di Surau Bateh Lori"
    />
  );
}
