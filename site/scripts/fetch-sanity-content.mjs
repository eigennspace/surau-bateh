#!/usr/bin/env node
// fetch-sanity-content — skrip build-time yang menarik artikel (`article`)
// dan galeri (`galleryItem`) dari dataset Sanity dan menuliskannya sebagai
// JSON siap-pakai untuk `src/data/articles.js`/`App.jsx`. Mengikuti pola
// skrip I/O tipis di atas modul transformasi
// murni yang sudah diuji terpisah (`src/lib/resolveSanityContent.js`,
// lihat `resolveSanityContent.test.js`), dijalankan sebelum `vite
// build`/`vite dev` (lihat `predev`/`build` di `package.json`), hasilnya
// TIDAK dikomit ke git (lihat `.gitignore`).
//
// Arsitektur build-time fetch (ADR 0006): situs publik tetap 100% static
// export, tidak ada dependency runtime ke Sanity untuk pengunjung -- semua
// resolusi asset gambar (URL, hotspot -> object-position) terjadi di sini,
// bukan di komponen React.

import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import { loadDotEnv } from './lib/loadDotEnv.mjs';
import { resolveArticles, resolveGallery, resolveVideo } from '../src/lib/resolveSanityContent.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');
const outFile = path.join(siteRoot, 'src', 'generated', 'sanityContent.json');

loadDotEnv(path.join(siteRoot, '.env'));

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

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

  let articleDocs = [];
  let galleryDocs = [];
  let profilSurauDoc = null;
  try {
    [articleDocs, galleryDocs, profilSurauDoc] = await Promise.all([
      client.fetch(`*[_type == "article"]{
        title, "slug": slug.current, author, date, excerpt, cover, body
      }`),
      client.fetch(`*[_type == "galleryItem"] | order(coalesce(order, 9999) asc, _createdAt asc){
        image, alt, caption, meta, ratio, wide
      }`),
      // Singleton -- satu dokumen `_id: "profilSurau"` (lihat structure
      // kustom di `studio/sanity.config.ts`), `[0]` mengambil satu-satunya
      // entri atau `null` bila belum pernah di-publish.
      client.fetch(`*[_type == "profilSurau"][0]{title, description, videoUrl}`),
    ]);
  } catch (err) {
    console.error(`fetch-sanity-content: gagal fetch dari Sanity (project ${projectId}/dataset ${dataset}): ${err.message}`);
    process.exit(1);
  }

  const articles = resolveArticles(urlFor, articleDocs);
  const gallery = resolveGallery(urlFor, galleryDocs);
  const video = resolveVideo(profilSurauDoc);
  // Validasi schema di Studio adalah jaring utama (lihat
  // `studio/schemaTypes/profilSurau.ts`); ini jaring pengaman untuk sisa
  // kasus yang lolos. Build TETAP berhasil -- satu salah-tempel pada satu
  // seksi tidak boleh menjatuhkan seluruh situs saat deploy otomatis
  // berjalan lewat webhook (lihat
  // `.scratch/video-profil-surau/issues/03-rambu-validasi-studio-dan-peringatan-build.md`).
  if (profilSurauDoc?.videoUrl && !video) {
    console.warn(
      `fetch-sanity-content: URL video Profil Surau ditolak (bukan link berkas Google Drive yang sah), seksi video tidak akan tampil: ${profilSurauDoc.videoUrl}`,
    );
  }

  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, JSON.stringify({ articles, gallery, video }, null, 2) + '\n');
  console.log(
    `fetch-sanity-content: ${articles.length} artikel, ${gallery.length} foto galeri, video profil ${video ? 'ada' : 'tidak ada'} ditulis ke ${path.relative(siteRoot, outFile)}`,
  );
}

main();
