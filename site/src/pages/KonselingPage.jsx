import React from 'react';
import ProgramSection from '../components/ProgramSection.jsx';

// Konseling dilayani berdasarkan perjanjian, bukan jadwal tetap, jadi tidak
// ada event berkategori ini di Sumber Data. `ProgramSection` menampilkan
// "Kegiatan akan segera hadir" di blok jadwal — sama seperti Halaman Program
// lain yang jadwalnya belum diisi.
export default function KonselingPage({ site }) {
  const events = site.events.filter(e => e.category === 'Konseling');
  return (
    <ProgramSection
      overline="Kegiatan"
      title={site.konseling?.title || 'Konseling Psikoterapi Tasawuf'}
      narrative={site.konseling?.narrative}
      events={events}
      person={site.contact?.konseling}
      whatsappMessage="Assalamu'alaikum, saya ingin bertanya soal Konseling Psikoterapi Tasawuf di Surau Bateh Lori"
      contactHeading="Jadwalkan sesi konsultasi Anda"
      gallery={site.konseling?.gallery}
    />
  );
}
