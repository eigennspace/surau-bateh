import React from 'react';
import ProgramSection from '../components/ProgramSection.jsx';

/**
 * Profil Salik — Halaman Profil, bukan Halaman Program (lihat CONTEXT.md).
 * Ia meminjam `ProgramSection` karena bentuk tampilannya memang sama, tapi
 * `events` sengaja TIDAK dikirim: halaman ini menjelaskan karakter seorang
 * Salik, bukan agenda. Agenda surau tinggal di Jadwal Kegiatan.
 */
export default function ProfilSalikPage({ site }) {
  return (
    <ProgramSection
      overline="Profil"
      title={site.salik?.title || 'Karakter Salik Surau Bateh'}
      narrative={site.salik?.narrative}
      bullets={site.salik?.bullets}
      closing={site.salik?.closing}
      person={site.contact?.salik}
      contactHeading="Ingin menempuh jalan ini?"
      whatsappMessage="Assalamu'alaikum, saya ingin bertanya soal kesalikan di Surau Bateh Lori"
      gallery={site.salik?.gallery}
    />
  );
}
