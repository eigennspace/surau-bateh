// youtubeUrl — aturan "link YouTube video yang sah" dipakai di dua tempat:
// validasi field ini (Studio, dikoreksi saat pengurus mengetik) dan
// `resolveVideo` di `site/src/lib/resolveSanityContent.js` (jaring pengaman
// saat build). Studio (`studio/`) dan situs (`site/`) adalah paket npm
// terpisah tanpa modul bersama, jadi logika ini DIDUPLIKASI SECARA SADAR --
// bukan kelalaian. Kalau salah satu sisi diubah, cek pasangannya.
// Lihat ADR 0012 (men-supersede ADR 0011/Drive, kembali ke keputusan ADR
// 0010) dan
// `.scratch/video-profil-surau/issues/03-rambu-validasi-studio-dan-peringatan-build.md`.

const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/

/**
 * @returns ID video (11 karakter) bila `url` adalah link video YouTube yang
 *   sah (`watch?v=`, `youtu.be/`, atau `/embed/`), atau `null` bila bukan --
 *   termasuk link Shorts (`/shorts/<id>`), yang sengaja ditolak karena
 *   orientasi 9:16-nya merusak bingkai 16:9 seksi ini.
 */
export function extractYoutubeVideoId(url: string | undefined | null): string | null {
  if (!url) return null
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return null
  }

  const host = parsed.hostname.replace(/^www\.|^m\./, '')

  if (host === 'youtu.be') {
    const id = parsed.pathname.split('/').filter(Boolean)[0]
    return id && YOUTUBE_ID_RE.test(id) ? id : null
  }

  if (host === 'youtube.com') {
    if (parsed.pathname === '/watch') {
      const id = parsed.searchParams.get('v')
      return id && YOUTUBE_ID_RE.test(id) ? id : null
    }
    if (parsed.pathname.startsWith('/embed/')) {
      const id = parsed.pathname.split('/')[2]
      return id && YOUTUBE_ID_RE.test(id) ? id : null
    }
    // /shorts/<id> -- ditolak berbasis bentuk, bukan keterbatasan teknis.
    return null
  }

  return null
}
