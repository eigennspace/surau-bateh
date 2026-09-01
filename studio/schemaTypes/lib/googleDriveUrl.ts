// googleDriveUrl — aturan "link Google Drive yang bisa di-embed" dipakai di
// dua tempat: validasi field ini (Studio, dikoreksi saat pengurus mengetik)
// dan `resolveVideo` di `site/src/lib/resolveSanityContent.js` (jaring
// pengaman saat build). Studio (`studio/`) dan situs (`site/`) adalah paket
// npm terpisah tanpa modul bersama, jadi logika ini DIDUPLIKASI SECARA
// SADAR -- bukan kelalaian. Kalau salah satu sisi diubah, cek pasangannya.
// Lihat ADR 0011 (men-supersede ADR 0010, yang semula menolak Drive) dan
// `.scratch/video-profil-surau/issues/03-rambu-validasi-studio-dan-peringatan-build.md`.

const DRIVE_ID_RE = /^[A-Za-z0-9_-]+$/

/**
 * @returns ID berkas Drive bila `url` bentuk `/file/d/<id>/...` atau
 *   `open?id=<id>` (dua bentuk yang dihasilkan tombol Share Google Drive),
 *   atau `null` bila bukan -- termasuk link folder, yang tidak menunjuk
 *   satu berkas video untuk di-embed.
 */
export function extractGoogleDriveFileId(url: string | undefined | null): string | null {
  if (!url) return null
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return null
  }

  const host = parsed.hostname.replace(/^www\./, '')
  if (host !== 'drive.google.com') return null

  const fileMatch = parsed.pathname.match(/^\/file\/d\/([^/]+)/)
  if (fileMatch) {
    const id = fileMatch[1]
    return DRIVE_ID_RE.test(id) ? id : null
  }

  if (parsed.pathname === '/open') {
    const id = parsed.searchParams.get('id')
    return id && DRIVE_ID_RE.test(id) ? id : null
  }

  // /drive/folders/<id> dan bentuk lain -- ditolak berbasis bentuk.
  return null
}
