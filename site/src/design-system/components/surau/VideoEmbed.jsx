import React from 'react';
import { Icon } from '../core/Icon.jsx';

/**
 * VideoEmbed — klik-untuk-muat: awalnya merender thumbnail + tombol play,
 * iframe video (Google Drive, lihat ADR 0011) baru disisipkan ke DOM
 * setelah tombol ditekan -- pengunjung yang tidak mengklik tidak pernah
 * mengunduh player videonya. Kontraknya sengaja BODOH -- `embedUrl`/`thumbnailUrl` sudah
 * jadi dan diterima sebagai prop, tidak ada parsing URL apa pun di sini
 * (parsing terjadi saat build, lihat `resolveVideo` di
 * `resolveSanityContent.js`). Ini bukan pola baru: `Footer.jsx` sudah
 * merender `<iframe>` peta yang URL-nya dibangun di luar komponen.
 *
 * Aksesibilitas seluruhnya diturunkan dari `title`: `alt` thumbnail, `title`
 * iframe, dan `aria-label` tombol play -- tidak ada field a11y terpisah.
 */
export function VideoEmbed({ embedUrl, thumbnailUrl, title, style }) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--surface-dark)', boxShadow: 'var(--shadow-sm)', ...style }}>
      {loaded ? (
        <iframe
          src={embedUrl}
          title={title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={`Putar video: ${title}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', padding: 0, border: 0, cursor: 'pointer', background: 'none' }}
        >
          <img src={thumbnailUrl} alt={title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <span aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(15, 23, 42, 0.25)' }}>
            <span style={{ display: 'grid', placeItems: 'center', width: 72, height: 72, borderRadius: 'var(--radius-pill)', background: 'var(--gold-500)', boxShadow: 'var(--shadow-md)' }}>
              <Icon name="play" size={28} />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
