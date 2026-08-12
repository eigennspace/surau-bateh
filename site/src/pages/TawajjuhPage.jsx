import React from 'react';
import ProgramSection from '../components/ProgramSection.jsx';

// Kajian rutin sudah tercatat di Sumber Data jauh sebelum halaman ini ada,
// dengan tiga kategori yang berkembang seiring waktu: 'Tawajjuh' (majelis
// tawajjuh murni), 'Kajian & Tawajjuh' (keduanya dalam satu majelis), dan
// 'Kajian'. Ketiganya ditarik ke sini alih-alih memaksa pengurus memilah
// ulang event lama ke satu kategori baru.
const TAWAJJUH_CATEGORIES = ['Tawajjuh', 'Kajian & Tawajjuh', 'Kajian'];

export default function TawajjuhPage({ site }) {
  const events = site.events.filter(e => TAWAJJUH_CATEGORIES.includes(e.category));
  return (
    <ProgramSection
      overline="Kegiatan"
      title={site.tawajjuh?.title || 'Tawajjuh & Kajian Rutin Ihsan'}
      narrative={site.tawajjuh?.narrative}
      events={events}
      person={site.contact?.tawajjuh}
      whatsappMessage="Assalamu'alaikum, saya ingin bertanya soal Tawajjuh & Kajian Rutin Ihsan di Surau Bateh Lori"
      contactHeading="Ada pertanyaan soal majelis?"
      gallery={site.tawajjuh?.gallery}
    />
  );
}
