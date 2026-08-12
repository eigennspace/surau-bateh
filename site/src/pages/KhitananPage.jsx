import React from 'react';
import ProgramSection from '../components/ProgramSection.jsx';
import dokumentasiKhitanan1 from '../design-system/assets/photos/dokumentasi-khitanan-1.jpeg';
import dokumentasiKhitanan2 from '../design-system/assets/photos/dokumentasi-khitanan-2.jpeg';
import dokumentasiKhitanan3 from '../design-system/assets/photos/dokumentasi-khitanan-3.jpeg';

// Foto dokumentasi ditempel langsung di sini sebagai jalan cepat. Halaman ini
// akan dipindah ke Sanity nanti bersama halaman lain, jadi galeri ini bersifat
// sementara — lihat CLAUDE.md soal rencana migrasi CMS.
const GALLERY = [
  { src: dokumentasiKhitanan1, alt: 'Dokumentasi kegiatan khitanan' },
  { src: dokumentasiKhitanan2, alt: 'Dokumentasi kegiatan khitanan' },
  { src: dokumentasiKhitanan3, alt: 'Dokumentasi kegiatan khitanan' },
];

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
      gallery={GALLERY}
    />
  );
}
