import React from 'react';
import ProgramSection from '../components/ProgramSection.jsx';

// Menerima ejaan 'Dauroh' (ejaan final, lihat sourceData.js) maupun 'Daurah'
// (ejaan lama yang mungkin masih diketik pengurus saat menambah event baru)
// supaya event tidak diam-diam hilang dari halaman ini gara-gara typo ejaan.
const DAUROH_CATEGORIES = ['Dauroh', 'Daurah'];

export default function DaurohPage({ site }) {
  const events = site.events.filter(e => DAUROH_CATEGORIES.includes(e.category));
  return (
    <ProgramSection
      overline="Kegiatan & Aksi Sosial"
      title={site.dauroh?.title || 'Dauroh'}
      narrative={site.dauroh?.narrative}
      events={events}
      person={site.contact?.dauroh}
      whatsappMessage="Assalamu'alaikum, saya ingin bertanya soal program Dauroh di Surau Bateh Lori"
    />
  );
}
