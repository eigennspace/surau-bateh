#!/usr/bin/env node
// migrate-events-news-to-sanity — skrip migrasi SATU KALI: membaca 8 entri
// `events` + 1 entri `news` existing dari `SB_DATA` (`src/data/sourceData.js`)
// dan mengunggahnya sebagai dokumen `recurringEvent`/`oneOffEvent`/`news` ke
// dataset Sanity. Lihat ADR 0013,
// `.scratch/jadwal-pengumuman-via-sanity/issues/01-jadwal-kegiatan-events-via-sanity.md`
// dan `02-pengumuman-news-via-sanity.md`.
//
// Manifest di bawah SENGAJA menyalin data mentah dari `SB_DATA.events`/
// `SB_DATA.news` pada saat migrasi ini ditulis (bukan binding import) --
// mengikuti pola `migrate-gallery-to-sanity.mjs` (Fase 1, sudah dihapus di
// tiket cutover-nya): entri "Daurah Aswaja" satu-satunya yang punya tanggal
// sungguhan di field `month` ("13/08/26") -- diklasifikasi jadi
// `oneOffEvent` dengan `date: '2026-08-13'`, tujuh entri lain jadi
// `recurringEvent` (`day` -> `dayOfWeek`, `time` -> `timeLabel`, `month`
// lama dibuang -- sudah tidak ada makna terpisah sejak `timeLabel`
// menggantikan gabungan lama `month`+`time`, lihat `resolveEvents` di
// `src/lib/resolveSanityContent.js`).
//
//   node scripts/migrate-events-news-to-sanity.mjs --dry-run
//   node scripts/migrate-events-news-to-sanity.mjs --write

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';
import { loadDotEnv } from './lib/loadDotEnv.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');

loadDotEnv(path.join(siteRoot, '.env'));

// Urutan & isi menyalin persis `SB_DATA.events` di `sourceData.js` pada saat
// migrasi ini ditulis.
const RECURRING_EVENTS = [
  { dayOfWeek: 'Sel', timeLabel: "Ba'da Maghrib", title: 'Tawajjuh', speaker: 'Tuan Guru Surau Bateh', place: 'Ruang utama', category: 'Tawajjuh' },
  { dayOfWeek: 'Kam', timeLabel: "Ba'da Maghrib", title: 'Tawajjuh', speaker: 'Tuan Guru Surau Bateh', place: 'Ruang utama', category: 'Tawajjuh' },
  { dayOfWeek: 'Sab', timeLabel: "Ba'da Isya", title: 'Latihan Silat Tradisi', speaker: 'Pelatih sasaran surau', place: 'Lapangan', category: 'Silat' },
  { dayOfWeek: 'Sab', timeLabel: "Ba'da Maghrib", title: 'Kajian & Tawajjuh', speaker: 'Tuan Guru Surau Bateh', place: 'Ruang utama', category: 'Kajian & Tawajjuh' },
  { dayOfWeek: 'Min', timeLabel: '09:00 WIB', title: '(Khusus Salik Baru) Pengenalan Tiga Rukun Agama', speaker: 'Tuan Guru Surau Bateh', place: 'Ruang utama', category: 'Kajian' },
  { dayOfWeek: 'Min', timeLabel: 'Siang', title: 'Kajian & Tawajjuh Jama\'ah Wanita', speaker: 'Tuan Guru Surau Bateh', place: 'Ruang utama', category: 'Kajian & Tawajjuh' },
  { dayOfWeek: 'Min', timeLabel: "Ba'da Maghrib", title: 'Tawajjuh & Penguatan Karakter Ikhlas Mahasiswa/i', speaker: 'Tuan Guru Surau Bateh', place: 'Ruang utama', category: 'Kajian & Tawajjuh' },
];

const ONE_OFF_EVENTS = [
  { date: '2026-08-13', timeLabel: "Ba'da Maghrib", title: 'Daurah Aswaja', speaker: 'Tuan Guru Surau Bateh', place: 'Musholla Al Mukmin Berok', category: 'Dauroh' },
];

const NEWS = [
  { tag: 'Pengumuman', title: 'Pendataan Data Salik Surau Bateh', date: '2026-08-08', link: 'https://forms.gle/2Se3M6uMp6P2QP4t6', description: 'Harap bagi para Salik yang belum mengisi Formulir pendataan, untuk segera mengisi dengan klik bagian pengumuman ini.' },
];

const write = process.argv.includes('--write');
const dryRun = !write;

async function main() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  const token = process.env.SANITY_API_TOKEN;
  if (!projectId || !dataset || !token) {
    console.error('migrate-events-news-to-sanity: SANITY_PROJECT_ID/SANITY_DATASET/SANITY_API_TOKEN belum diset (lihat site/.env.example). Token butuh hak tulis (bukan role Viewer).');
    process.exit(1);
  }

  const client = createClient({ projectId, dataset, token, apiVersion: '2026-01-01', useCdn: false });
  const total = RECURRING_EVENTS.length + ONE_OFF_EVENTS.length + NEWS.length;
  console.log(`migrate-events-news-to-sanity: ${total} dokumen (${RECURRING_EVENTS.length} recurringEvent, ${ONE_OFF_EVENTS.length} oneOffEvent, ${NEWS.length} news)${dryRun ? ' (DRY RUN -- tidak menulis apa pun)' : ' (MENULIS ke dataset produksi)'}`);

  const docs = [
    ...RECURRING_EVENTS.map((entry, i) => ({ _type: 'recurringEvent', _id: `recurringEvent-${i}`, ...entry })),
    ...ONE_OFF_EVENTS.map((entry, i) => ({ _type: 'oneOffEvent', _id: `oneOffEvent-${i}`, ...entry })),
    ...NEWS.map((entry, i) => ({ _type: 'news', _id: `news-${i}`, ...entry })),
  ];

  for (const doc of docs) {
    console.log(`- [${doc._type}] ${doc._id}: ${doc.title}`);
    if (dryRun) {
      console.log('  [dry-run] akan createOrReplace dokumen di atas');
      continue;
    }
    const result = await client.createOrReplace(doc);
    console.log(`  ditulis: ${result._id}`);
  }

  console.log(dryRun
    ? '\nDry run selesai. Jalankan ulang dengan --write untuk benar-benar menulis ke dataset produksi.'
    : '\nMigrasi selesai.');
}

main().catch(err => {
  console.error('migrate-events-news-to-sanity: gagal:', err);
  process.exit(1);
});
