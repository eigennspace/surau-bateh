// resolveSanityContent — transformasi murni dari dokumen mentah hasil GROQ
// (`article`/`galleryItem`, lengkap dengan referensi asset Sanity) menjadi
// bentuk siap-tulis ke `src/generated/sanityContent.json`, dipakai
// `scripts/fetch-sanity-content.mjs`. Diekstrak dari skrip itu supaya
// mengikuti pola "skrip I/O tipis di atas modul murni yang sudah diuji
// terpisah" yang sudah dipakai `markdownToPortableText.js` di repo ini --
// fungsi di sini tidak melakukan HTTP call/upload apa pun sendiri,
// `urlFor` (builder URL asset) diserahkan sebagai parameter oleh
// pemanggil (lapisan I/O yang sudah dikonfigurasi dengan project/dataset).

/**
 * Hotspot Sanity (`{x, y}`, 0..1 relatif terhadap gambar) -> nilai CSS
 * `object-position` ("x% y%"). Menggantikan field `position` bebas-teks
 * yang dulu di-hand-type di `sourceData.js` -- pengurus sekarang mengatur
 * titik fokus dengan menyeret di Studio, bukan mengetik nilai CSS (lihat
 * `studio/schemaTypes/galleryItem.ts`).
 */
export function objectPositionFromHotspot(hotspot) {
  if (!hotspot) return undefined;
  const x = Math.round(hotspot.x * 100);
  const y = Math.round(hotspot.y * 100);
  return `${x}% ${y}%`;
}

/**
 * @param {Function} urlFor `(source) => ImageUrlBuilder` (dari
 *   `@sanity/image-url`, sudah terikat ke client project/dataset yang
 *   benar -- disuntik, bukan dibuat di sini, supaya fungsi ini tetap murni
 *   dan bisa dites dengan `urlFor` palsu).
 * @param {{asset?: object, hotspot?: {x:number,y:number}}} image
 * @returns {{url: string, position?: string} | null} `null` bila `image`
 *   tidak punya asset (field kosong/belum diisi pengurus).
 */
export function resolveImage(urlFor, image, { width } = {}) {
  if (!image?.asset) return null;
  let img = urlFor(image).auto('format');
  if (width) img = img.width(width);
  return {
    url: img.url(),
    position: objectPositionFromHotspot(image.hotspot),
  };
}

/**
 * Mengganti tiap blok `image` di body Portable Text dengan `imageUrl`
 * terresolve -- situs publik tidak punya dependency runtime ke Sanity
 * (ADR 0006), jadi komponen `PortableText` di browser hanya butuh URL
 * plain, bukan referensi asset yang perlu di-resolve lagi.
 */
export function resolveBody(urlFor, body) {
  return (body || []).map(block => {
    if (block._type !== 'image') return block;
    const resolved = resolveImage(urlFor, block, { width: 1200 });
    return { ...block, imageUrl: resolved?.url ?? null };
  });
}

/**
 * @param {Array<object>} articleDocs Dokumen `article` mentah hasil GROQ
 *   (`title`, `slug`, `author`, `date`, `excerpt`, `cover`, `body`).
 * @returns {Array<object>} Artikel siap ditulis ke `sanityContent.json` --
 *   `cover` sudah jadi URL plain, `body` sudah diresolve lewat
 *   `resolveBody`. Dokumen tanpa `slug` (belum di-publish lengkap)
 *   dilewati.
 */
export function resolveArticles(urlFor, articleDocs) {
  return (articleDocs || [])
    .filter(doc => doc.slug)
    .map(doc => {
      const cover = resolveImage(urlFor, doc.cover, { width: 1200 });
      return {
        slug: doc.slug,
        title: doc.title,
        author: doc.author,
        date: doc.date,
        excerpt: doc.excerpt,
        cover: cover?.url,
        body: resolveBody(urlFor, doc.body),
      };
    });
}

// ID berkas dari URL Google Drive -- aturan ini diberlakukan DUA KALI: di
// sini (jaring pengaman saat build) dan sebagai validasi schema di
// `studio/schemaTypes/lib/googleDriveUrl.ts` (Studio, dikoreksi saat
// pengurus mengetik). `studio/` dan `site/` adalah paket npm terpisah tanpa
// modul bersama, jadi duplikasi ini DISENGAJA -- kalau salah satu sisi
// diubah, cek pasangannya. Lihat ADR 0011 (men-supersede ADR 0010, yang
// semula menolak Drive) dan
// `.scratch/video-profil-surau/issues/03-rambu-validasi-studio-dan-peringatan-build.md`.
const DRIVE_ID_RE = /^[A-Za-z0-9_-]+$/;

/**
 * @param {string|undefined|null} url
 * @returns {string|null} ID berkas bila `url` bentuk `/file/d/<id>/...` atau
 *   `open?id=<id>` (dua bentuk yang dihasilkan tombol Share Google Drive);
 *   `null` untuk bentuk lain -- termasuk link folder, yang tidak punya satu
 *   berkas video untuk di-embed.
 */
export function extractGoogleDriveFileId(url) {
  if (!url) return null;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, '');
  if (host !== 'drive.google.com') return null;

  const fileMatch = parsed.pathname.match(/^\/file\/d\/([^/]+)/);
  if (fileMatch) {
    const id = fileMatch[1];
    return DRIVE_ID_RE.test(id) ? id : null;
  }

  if (parsed.pathname === '/open') {
    const id = parsed.searchParams.get('id');
    return id && DRIVE_ID_RE.test(id) ? id : null;
  }

  // /drive/folders/<id> dan bentuk lain -- ditolak berbasis bentuk, bukan
  // keterbatasan teknis: link folder tidak menunjuk satu berkas video.
  return null;
}

/**
 * @param {{title?: string, description?: string, videoUrl?: string}|undefined} doc
 *   Dokumen singleton `profilSurau` mentah hasil GROQ.
 * @returns {{title: string, description?: string, embedUrl: string, thumbnailUrl: string}|null}
 *   `null` bila dokumen belum di-publish, `videoUrl` kosong, atau URL-nya
 *   tidak lolos aturan di atas -- pemanggil (`fetch-sanity-content.mjs`)
 *   yang bertanggung jawab menuliskan peringatan build untuk kasus terakhir,
 *   supaya fungsi murni ini tidak melakukan I/O.
 */
export function resolveVideo(doc) {
  if (!doc?.videoUrl) return null;
  const id = extractGoogleDriveFileId(doc.videoUrl);
  if (!id) return null;
  return {
    title: doc.title,
    description: doc.description,
    // Endpoint /preview Drive resmi bisa di-iframe (mengembalikan 200 tanpa
    // X-Frame-Options) -- lihat ADR 0011 untuk risiko kuota tayang harian
    // per berkas yang diterima sadar lewat keputusan ini.
    embedUrl: `https://drive.google.com/file/d/${id}/preview`,
    // Endpoint /thumbnail TIDAK didokumentasikan resmi oleh Google (beda
    // dari hqdefault YouTube yang didokumentasikan) -- dipakai karena tidak
    // ada alternatif resmi untuk mengambil thumbnail video Drive tanpa
    // OAuth. Bisa berhenti bekerja tanpa pemberitahuan; lihat ADR 0011.
    thumbnailUrl: `https://drive.google.com/thumbnail?id=${id}&sz=w1280`,
  };
}

/**
 * @param {Array<object>} galleryDocs Dokumen `galleryItem` mentah hasil
 *   GROQ (`image`, `alt`, `caption`, `meta`, `ratio`, `wide`).
 * @returns {Array<object>} Bentuk siap-render `GallerySection.jsx`
 *   (`src`/`alt`/`ratio`/`position`/`meta`/`caption`/`span`) -- dokumen
 *   tanpa asset gambar (belum diunggah pengurus) dilewati.
 */
export function resolveGallery(urlFor, galleryDocs) {
  return (galleryDocs || [])
    .filter(doc => doc.image?.asset)
    .map(doc => {
      const image = resolveImage(urlFor, doc.image, { width: 1200 });
      return {
        src: image.url,
        alt: doc.alt,
        ratio: doc.ratio,
        position: image.position,
        meta: doc.meta,
        caption: doc.caption,
        span: doc.wide ? 2 : undefined,
      };
    });
}
