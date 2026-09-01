import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { VideoLightbox } from '../feedback/VideoLightbox.jsx';

/**
 * VideoEmbed — klik-untuk-muat: merender thumbnail + tombol play; iframe
 * video (YouTube, lihat ADR 0010/0012) baru dimuat setelah tombol ditekan,
 * di dalam `VideoLightbox` (modal), bukan disisipkan di tempat -- pengunjung
 * yang tidak mengklik tidak pernah mengunduh player videonya sama sekali.
 * Kontraknya sengaja BODOH -- `embedUrl`/`thumbnailUrl` sudah jadi dan
 * diterima sebagai prop, tidak ada parsing URL apa pun di sini (parsing
 * terjadi saat build, lihat `resolveVideo` di `resolveSanityContent.js`).
 * Ini bukan pola baru: `Footer.jsx` sudah merender `<iframe>` peta yang
 * URL-nya dibangun di luar komponen.
 *
 * Modal dipertahankan dari percobaan singkat host Google Drive (ADR 0011):
 * awalnya dibangun karena kontrol bawaan pemutar Drive menutupi video di
 * kotak kecil, tapi videonya sendiri sekarang lebih nyaman ditonton dalam
 * kanvas besar+terfokus terlepas dari host-nya, jadi tetap dipakai untuk
 * YouTube. Lihat `VideoLightbox.jsx` untuk detail.
 *
 * Aksesibilitas seluruhnya diturunkan dari `title`: `alt` thumbnail, `title`
 * iframe, dan `aria-label` tombol play -- tidak ada field a11y terpisah.
 */
export function VideoEmbed({ embedUrl, thumbnailUrl, title, style }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* `minWidth: 0` -- perlu saat komponen ini duduk sebagai kolom grid
        (lihat `ProfilSurauPage.jsx`): tanpa itu grid item lebar-otomatis
        bisa menolak menciut di bawah lebar intrinsik kontennya di layar
        sempit. */}
      <div style={{ position: 'relative', width: '100%', minWidth: 0, aspectRatio: '16 / 9', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--surface-dark)', boxShadow: 'var(--shadow-sm)', ...style }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Putar video: ${title}`}
          // appearance/font/margin di-reset eksplisit -- beberapa browser
          // mobile (khususnya Safari iOS) menambahkan styling bawaan
          // (padding, radius, warna teks) pada elemen <button> yang tidak
          // ikut ditimpa hanya dengan `background`/`border`.
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', margin: 0, padding: 0, border: 0, borderRadius: 'inherit', cursor: 'pointer', background: 'none', font: 'inherit', WebkitAppearance: 'none', appearance: 'none', touchAction: 'manipulation' }}
        >
          <img src={thumbnailUrl} alt={title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <span aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(15, 23, 42, 0.25)' }}>
            <span style={{ display: 'grid', placeItems: 'center', width: 72, height: 72, borderRadius: 'var(--radius-pill)', background: 'var(--gold-500)', boxShadow: 'var(--shadow-md)' }}>
              <Icon name="play" size={28} />
            </span>
          </span>
        </button>
      </div>
      {open ? <VideoLightbox embedUrl={embedUrl} title={title} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
