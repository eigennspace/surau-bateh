#!/usr/bin/env node
// fetch-sanity-content — skrip build-time yang menarik artikel (`article`)
// dan galeri (`galleryItem`) dari dataset Sanity dan menuliskannya sebagai
// JSON siap-pakai untuk `src/data/articles.js`/`App.jsx`. Mengikuti pola
// `generate-prayer-times.mjs`: skrip I/O tipis di atas config env var,
// dijalankan sebelum `vite build`/`vite dev` (lihat `predev`/`build` di
// `package.json`), hasilnya TIDAK dikomit ke git (lihat `.gitignore`).
//
// Arsitektur build-time fetch (ADR 0006): situs publik tetap 100% static
// export, tidak ada dependency runtime ke Sanity untuk pengunjung -- semua
// resolusi asset gambar (URL, hotspot -> object-position) terjadi di sini,
// bukan di komponen React.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');
const outFile = path.join(siteRoot, 'src', 'generated', 'sanityContent.json');

/**
 * Parser `.env` minimal ditulis tangan -- skrip ini jalan lewat `node`
 * biasa (sebelum `vite build`), bukan lewat Vite, jadi env loading bawaan
 * Vite tidak berlaku di sini. Mengikuti pola parser kecil lain di repo ini
 * (mis. `parseFrontmatter` di `deriveArticles.js`) alih-alih menambah
 * dependency `dotenv` untuk kebutuhan sekecil ini. Variabel yang sudah ada
 * di `process.env` (mis. secrets CI) tidak ditimpa.
 */
function loadDotEnv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    const quoted = (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"));
    if (quoted) value = value.slice(1, -1);
    if (key && !(key in process.env)) process.env[key] = value;
  }
}
loadDotEnv(path.join(siteRoot, '.env'));

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

/**
 * Hotspot Sanity (`{x, y}`, 0..1 relatif terhadap gambar) -> nilai CSS
 * `object-position` ("x% y%"). Menggantikan field `position` bebas-teks
 * yang dulu di-hand-type di `sourceData.js` -- pengurus sekarang mengatur
 * titik fokus dengan menyeret di Studio, bukan mengetik nilai CSS (lihat
 * `studio/schemaTypes/galleryItem.ts`).
 */
function objectPositionFromHotspot(hotspot) {
  if (!hotspot) return undefined;
  const x = Math.round(hotspot.x * 100);
  const y = Math.round(hotspot.y * 100);
  return `${x}% ${y}%`;
}

async function main() {
  if (!projectId || !dataset) {
    console.error(
      'fetch-sanity-content: SANITY_PROJECT_ID/SANITY_DATASET belum diset. ' +
      'Salin site/.env.example ke site/.env dan isi nilainya (lihat .scratch/cms-migration-sanity/issues/01-setup-akun-project-sanity.md).',
    );
    process.exit(1);
  }

  const client = createClient({
    projectId,
    dataset,
    token: token || undefined,
    apiVersion: '2026-01-01',
    // CDN cache dipakai kalau tidak ada token (baca publik) -- bacaan
    // dengan token (draft/private dataset) selalu lewat API langsung supaya
    // tidak baca data basi dari CDN.
    useCdn: !token,
  });
  const builder = createImageUrlBuilder(client);
  const urlFor = source => builder.image(source);

  function resolveImage(image, { width } = {}) {
    if (!image?.asset) return null;
    let img = urlFor(image).auto('format');
    if (width) img = img.width(width);
    return {
      url: img.url(),
      position: objectPositionFromHotspot(image.hotspot),
    };
  }

  function resolveBody(body) {
    return (body || []).map(block => {
      if (block._type !== 'image') return block;
      const resolved = resolveImage(block, { width: 1200 });
      return { ...block, imageUrl: resolved?.url ?? null };
    });
  }

  let articleDocs = [];
  let galleryDocs = [];
  try {
    [articleDocs, galleryDocs] = await Promise.all([
      client.fetch(`*[_type == "article"]{
        title, "slug": slug.current, author, date, excerpt, cover, body
      }`),
      client.fetch(`*[_type == "galleryItem"] | order(coalesce(order, 9999) asc, _createdAt asc){
        image, alt, caption, meta, ratio, wide
      }`),
    ]);
  } catch (err) {
    console.error(`fetch-sanity-content: gagal fetch dari Sanity (project ${projectId}/dataset ${dataset}): ${err.message}`);
    process.exit(1);
  }

  const articles = articleDocs
    .filter(doc => doc.slug)
    .map(doc => {
      const cover = resolveImage(doc.cover, { width: 1200 });
      return {
        slug: doc.slug,
        title: doc.title,
        author: doc.author,
        date: doc.date,
        excerpt: doc.excerpt,
        cover: cover?.url,
        body: resolveBody(doc.body),
      };
    });

  const gallery = galleryDocs
    .filter(doc => doc.image?.asset)
    .map(doc => {
      const image = resolveImage(doc.image, { width: 1200 });
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

  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, JSON.stringify({ articles, gallery }, null, 2) + '\n');
  console.log(
    `fetch-sanity-content: ${articles.length} artikel, ${gallery.length} foto galeri ditulis ke ${path.relative(siteRoot, outFile)}`,
  );
}

main();
