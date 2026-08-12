import React from 'react';
import { Card, EventItem, PhotoTile, SectionHeading, useBreakpoint } from '../ds.js';
import ContactCard from './ContactCard.jsx';

const pad = m => (m ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)');

/**
 * Blok Halaman Program — narasi + jadwal terfilter kategori + kartu kontak
 * person. Dipakai oleh keenam Halaman Program, mengikuti pola tampilan
 * `AgendaSection` (dua kolom desktop, ditumpuk di mobile) tapi tanpa filter
 * hari/pengumuman yang khusus dipakai halaman Jadwal Kegiatan.
 *
 * `overline` adalah nama grup navigasi induk halaman itu (Kegiatan / Dakwah /
 * Sosial), sehingga pengunjung tahu ia berada di cabang mana.
 *
 * `contactHeading` (opsional) — judul kartu kontak. Default "Mari booking
 * <judul> nya" cocok untuk program yang memang dipesan (Khitanan, Dauroh),
 * tapi janggal untuk yang tidak (konsultasi, majelis rutin, kerjasama) —
 * halaman itu mengirim kalimatnya sendiri.
 *
 * `gallery` (opsional) — array `{ src, alt, caption?, meta? }` dokumentasi
 * kegiatan yang dibaca dari Sumber Data, ditampilkan sebagai grid foto kotak
 * di bawah jadwal. Tidak dirender kalau kosong, jadi halaman yang belum punya
 * foto tidak berubah tampilannya. Rasio sengaja dipaku 1:1 di sini dan tidak
 * diekspos ke Sumber Data — grid halaman program selalu kotak seragam, beda
 * dari galeri Beranda.
 */
export default function ProgramSection({ overline, title, narrative, events, person, whatsappMessage, contactHeading, gallery }) {
  const mobile = useBreakpoint();
  return (
    <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid',
        gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1.4fr .8fr', gap: mobile ? 'var(--space-8)' : 'var(--space-12)', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          <SectionHeading overline={overline} title={title} description={narrative} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <span style={{ font: 'var(--text-label)', fontSize: 'var(--fs-body)', color: 'var(--text-strong)' }}>Jadwal</span>
            {events.length > 0
              ? events.map(e => <EventItem key={`${e.day}-${e.title}`} {...e} />)
              : <p style={{ color: 'var(--text-muted)', font: 'var(--text-body-default)' }}>Kegiatan akan segera hadir</p>}
          </div>
          {gallery && gallery.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <span style={{ font: 'var(--text-label)', fontSize: 'var(--fs-body)', color: 'var(--text-strong)' }}>Dokumentasi</span>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: 'var(--space-3)' }}>
                {gallery.map((g, i) => (
                  <PhotoTile key={g.src || i} src={g.src} alt={g.alt || ''} caption={g.caption} meta={g.meta} ratio="1 / 1" />
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <aside>
          <Card tone="dark">
            <ContactCard person={person} tone="dark" heading={contactHeading || `Mari booking ${title} nya`} message={whatsappMessage} />
          </Card>
        </aside>
      </div>
    </section>
  );
}
