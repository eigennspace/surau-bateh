import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * Modal video full-size, independen dari `Dialog` -- meniru pola
 * `PhotoLightbox.jsx` (backdrop blur, klik backdrop untuk tutup, kartu
 * `surface-card`/`radius-xl`/`shadow-lg`) tapi TANPA padding di sekeliling
 * media: video mengisi kartu penuh (edge-to-edge), sedangkan foto di
 * `PhotoLightbox` memang diberi padding karena ada caption/meta di
 * bawahnya. Dipakai `VideoEmbed.jsx` supaya kontrol bawaan pemutar Google
 * Drive (scrubber/timeline yang selalu tampil menutupi bagian atas video --
 * bagian dalam iframe lintas-origin yang tidak bisa kita restyle) mendapat
 * ruang jauh lebih besar daripada kotak 16:9 kecil di dalam halaman,
 * sehingga overlay itu terasa jauh lebih kecil secara proporsional. Ini
 * TIDAK menghilangkan overlay-nya (itu bagian dari desain pemutar Drive,
 * di luar kendali kita) -- pengunjung yang ingin videonya benar-benar bersih
 * dari overlay tetap perlu menekan ikon fullscreen bawaan Drive di pojok
 * kanan-atas video.
 *
 * Tombol tutup sengaja di pojok KIRI-atas (bukan kanan seperti
 * `PhotoLightbox`) supaya tidak bertumpuk dengan ikon "buka di tab
 * baru"/fullscreen bawaan Drive yang selalu ada di pojok kanan-atas iframe.
 */
export function VideoLightbox({ embedUrl, title, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, display: 'grid', placeItems: 'center', zIndex: 60,
        background: 'rgba(34,38,44,.48)', backdropFilter: 'var(--blur-glass)', padding: 'var(--space-4)' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', width: 'min(96vw, 1100px)', aspectRatio: '16 / 9', background: 'var(--surface-dark)',
          borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-default)', overflow: 'hidden' }}
      >
        <button onClick={onClose} aria-label="Tutup video" style={{ position: 'absolute', top: 12, left: 12, zIndex: 1,
          display: 'grid', placeItems: 'center', width: 36, height: 36, borderRadius: 'var(--radius-pill)', border: 'none',
          background: 'rgba(15, 23, 42, 0.55)', color: 'var(--sand-100)', cursor: 'pointer' }}>
          <Icon name="x" size={18} />
        </button>
        <iframe
          src={embedUrl}
          title={title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
