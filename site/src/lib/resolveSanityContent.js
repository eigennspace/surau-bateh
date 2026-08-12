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
