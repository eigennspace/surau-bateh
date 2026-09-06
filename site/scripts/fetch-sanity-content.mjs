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
import { resolveArticles, resolveGallery, resolveVideo, resolveEvents, resolveNews, resolveProgram, resolveContact, resolveSalik, resolveBeranda } from '../src/lib/resolveSanityContent.js';

// Enam Halaman Program, satu type per program (ADR 0014) -- semuanya
// singleton dengan bentuk field identik (`programFields.ts`), jadi query +
// resolve dilakukan lewat satu loop, bukan ditulis ulang 6x.
const PROGRAM_TYPES = ['khitanan', 'dauroh', 'tawajjuh', 'konseling', 'baktiSosial', 'silaturahmi'];

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
  let recurringEventDocs = [];
  let oneOffEventDocs = [];
  let newsDocs = [];
  let programDocs = [];
  let contactDoc = null;
  let salikDoc = null;
  let berandaDoc = null;
  try {
    [articleDocs, galleryDocs, profilSurauDoc, recurringEventDocs, oneOffEventDocs, newsDocs, programDocs, contactDoc, salikDoc, berandaDoc] = await Promise.all([
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
      client.fetch(`*[_type == "recurringEvent"]{
        dayOfWeek, timeLabel, title, speaker, place, category
      }`),
      client.fetch(`*[_type == "oneOffEvent"]{
        date, timeLabel, title, speaker, place, category
      }`),
      client.fetch(`*[_type == "news"] | order(date desc){
        tag, title, date, link, description
      }`),
      // Keenam Halaman Program -- masing-masing singleton `[0]` sendiri
      // (pola sama seperti `profilSurau` di atas), ditarik lewat satu query
      // per type (bukan satu query gabungan) supaya dokumen yang belum
      // pernah di-publish jelas jadi `null` per-program, bukan ikut hilang
      // dari hasil.
      Promise.all(PROGRAM_TYPES.map(type => client.fetch(`*[_type == "${type}"][0]{title, narrative, person, gallery}`))),
      client.fetch(`*[_type == "contact"][0]{address, mapsUrl, pengurus}`),
      client.fetch(`*[_type == "salik"][0]{title, narrative, bullets, closing, person, gallery}`),
      // Singleton Beranda -- Hero + Program Beranda + Statistik Beranda
      // dalam satu dokumen (lihat `studio/schemaTypes/beranda.ts`).
      client.fetch(`*[_type == "beranda"][0]{hero{locationBadge, tagline, ctaLabel, backgroundImage, highlights}, programs, stats}`),
    ]);
  } catch (err) {
    console.error(`fetch-sanity-content: gagal fetch dari Sanity (project ${projectId}/dataset ${dataset}): ${err.message}`);
    process.exit(1);
  }

  const articles = resolveArticles(urlFor, articleDocs);
  const gallery = resolveGallery(urlFor, galleryDocs);
  const video = resolveVideo(profilSurauDoc);
  const events = resolveEvents(recurringEventDocs, oneOffEventDocs);
  const news = resolveNews(newsDocs);
  const programs = Object.fromEntries(
    PROGRAM_TYPES.map((type, i) => [type, resolveProgram(urlFor, programDocs[i])]),
  );
  const contact = resolveContact(contactDoc);
  const salik = resolveSalik(urlFor, salikDoc);
  const beranda = resolveBeranda(urlFor, berandaDoc);
  // Validasi schema di Studio adalah jaring utama (lihat
  // `studio/schemaTypes/profilSurau.ts`); ini jaring pengaman untuk sisa
  // kasus yang lolos. Build TETAP berhasil -- satu salah-tempel pada satu
  // seksi tidak boleh menjatuhkan seluruh situs saat deploy otomatis
  // berjalan lewat webhook (lihat
  // `.scratch/video-profil-surau/issues/03-rambu-validasi-studio-dan-peringatan-build.md`).
  if (profilSurauDoc?.videoUrl && !video) {
    console.warn(
      `fetch-sanity-content: URL video Profil Surau ditolak (bukan link video YouTube yang sah), seksi video tidak akan tampil: ${profilSurauDoc.videoUrl}`,
    );
  }

  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, JSON.stringify({ articles, gallery, video, events, news, ...programs, contact, salik, beranda }, null, 2) + '\n');
  const missingPrograms = PROGRAM_TYPES.filter(type => !programs[type]);
  if (missingPrograms.length > 0) {
    console.warn(`fetch-sanity-content: dokumen belum pernah di-publish untuk: ${missingPrograms.join(', ')} -- halaman terkait akan tampil kosong.`);
  }
  if (!contact) console.warn('fetch-sanity-content: dokumen "contact" belum pernah di-publish -- halaman /kontak akan tampil kosong.');
  if (!salik) console.warn('fetch-sanity-content: dokumen "salik" belum pernah di-publish -- halaman /profil-salik akan tampil kosong.');
  if (!beranda) console.warn('fetch-sanity-content: dokumen "beranda" belum pernah di-publish -- Hero/Program Beranda/Statistik Beranda akan tampil kosong.');
  console.log(
    `fetch-sanity-content: ${articles.length} artikel, ${gallery.length} foto galeri, video profil ${video ? 'ada' : 'tidak ada'}, ${events.length} kegiatan, ${news.length} pengumuman, ${PROGRAM_TYPES.length - missingPrograms.length}/${PROGRAM_TYPES.length} Halaman Program, kontak ${contact ? 'ada' : 'tidak ada'}, salik ${salik ? 'ada' : 'tidak ada'}, beranda ${beranda ? 'ada' : 'tidak ada'} ditulis ke ${path.relative(siteRoot, outFile)}`,
  );
}

main();
