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

// ID video (11 karakter) dari URL YouTube -- aturan ini diberlakukan DUA
// KALI: di sini (jaring pengaman saat build) dan sebagai validasi schema di
// `studio/schemaTypes/lib/youtubeUrl.ts` (Studio, dikoreksi saat pengurus
// mengetik). `studio/` dan `site/` adalah paket npm terpisah tanpa modul
// bersama, jadi duplikasi ini DISENGAJA -- kalau salah satu sisi diubah,
// cek pasangannya. Lihat ADR 0012 (men-supersede ADR 0011/Drive, kembali
// ke keputusan ADR 0010) dan
// `.scratch/video-profil-surau/issues/03-rambu-validasi-studio-dan-peringatan-build.md`.
const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/;

/**
 * @param {string|undefined|null} url
 * @returns {string|null} ID video bila `url` bentuk `watch?v=`, `youtu.be/`,
 *   atau `/embed/` yang sah; `null` untuk bentuk lain -- termasuk Shorts
 *   (`/shorts/<id>`), ditolak berbasis bentuk karena orientasi 9:16-nya
 *   merusak bingkai 16:9 seksi ini. Ekor parameter (`t`, `list`, dst) diabaikan
 *   begitu saja karena tidak ikut dibaca di sini.
 */
export function extractYoutubeVideoId(url) {
  if (!url) return null;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\.|^m\./, '');

  if (host === 'youtu.be') {
    const id = parsed.pathname.split('/').filter(Boolean)[0];
    return id && YOUTUBE_ID_RE.test(id) ? id : null;
  }

  if (host === 'youtube.com') {
    if (parsed.pathname === '/watch') {
      const id = parsed.searchParams.get('v');
      return id && YOUTUBE_ID_RE.test(id) ? id : null;
    }
    if (parsed.pathname.startsWith('/embed/')) {
      const id = parsed.pathname.split('/')[2];
      return id && YOUTUBE_ID_RE.test(id) ? id : null;
    }
    // /shorts/<id> -- lihat komentar di atas fungsi.
    return null;
  }

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
  const id = extractYoutubeVideoId(doc.videoUrl);
  if (!id) return null;
  return {
    title: doc.title,
    description: doc.description,
    // youtube-nocookie.com, bukan youtube.com -- menunda cookie pelacak
    // YouTube sampai video benar-benar diputar (lihat `VideoLightbox.jsx`).
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
    // hqdefault, bukan maxresdefault -- yang terakhir hanya ada bila sumber
    // videonya minimal 720p dan sebaliknya membalas 404 di browser.
    thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
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
