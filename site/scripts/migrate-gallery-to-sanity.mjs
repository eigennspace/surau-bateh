#!/usr/bin/env node
// migrate-gallery-to-sanity — skrip migrasi SATU KALI: membaca entri galeri
// existing dari `SB_DATA.gallery` (`src/data/sourceData.js`), upload tiap
// gambar lokal ke asset pipeline Sanity, buat dokumen `galleryItem` per
// entri (mempertahankan urutan lewat field `order`). Lihat ADR 0006,
// .scratch/cms-migration-sanity/issues/05-galeri-via-sanity.md.
//
// Manifest di bawah SENGAJA menyalin data mentah dari `sourceData.js`
// (path file, bukan binding import) -- skrip ini jalan lewat `node` biasa
// (sebelum `vite build`), dan `sourceData.js` menarik import gambar lewat
// pipeline aset Vite yang tidak bisa di-resolve di luar Vite, persis
// alasan yang sama didokumentasikan di `generate-prayer-times.mjs` untuk
// kenapa skrip itu mengimpor dari `location.js`, bukan `sourceData.js`.
//
// Field `position` (object-position CSS bebas-teks) di data lama TIDAK
// dibawa apa adanya -- schema `galleryItem` menggantikannya dengan hotspot
// bawaan Sanity (lihat `studio/schemaTypes/galleryItem.ts`), jadi entri
// yang dulu punya `position` diberi hotspot perkiraan yang setara di sini;
// pengurus bisa menyesuaikan hotspot lebih presisi langsung di Studio.
//
//   node scripts/migrate-gallery-to-sanity.mjs --dry-run
//   node scripts/migrate-gallery-to-sanity.mjs --write

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');
const assetsDir = path.join(siteRoot, 'src', 'design-system', 'assets');

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

// hotspot perkiraan (x/y 0..1) untuk entri yang dulu punya `position` bebas
// teks -- lihat catatan di atas. `width`/`height` adalah ukuran kotak fokus,
// bukan crop; nilai kecil supaya titik fokusnya presisi di sekitar x/y.
const HOTSPOT_BOX = { height: 0.4, width: 0.4 };

// Urutan & isi menyalin persis `SB_DATA.gallery` di `sourceData.js` pada
// saat migrasi ini ditulis.
const GALLERY_MANIFEST = [
  { file: 'photos/pengurus-surau.jpg', alt: 'Pengurus surau', ratio: '16 / 9', hotspot: { x: 0.5, y: 0.4, ...HOTSPOT_BOX }, meta: 'Pengurus', caption: 'Guru Surau Bateh', wide: true },
  { file: 'photos/majelis-jamaah.jpg', alt: 'Majelis jamaah', ratio: '16 / 9', meta: 'Kajian Rutin', caption: 'Majelis ba’da Isya bersama jamaah', wide: true },
  { file: 'photos/flyer-silaturahmi-ilmiah.jpeg', alt: 'Flyer Silaturahmi Ilmiah', ratio: '16 / 9', hotspot: { x: 0.5, y: 0.4, ...HOTSPOT_BOX }, meta: 'flyer-silaturahmi-ilmiah-uin-imam-bonjol-padang', caption: 'Flyer silaturahmi ilmiah UIN imam bonjol padang', wide: true },
  { file: 'photos/silaturahmi-ilmiah.jpeg', alt: 'Dokumentasi Silaturahmi Ilmiah', ratio: '16 / 9', hotspot: { x: 0.5, y: 0.4, ...HOTSPOT_BOX }, meta: 'dokumentasi-silaturahmi-ilmiah-uin-imam-bonjol-padang', caption: 'Dokumentasi silaturahmi ilmiah UIN imam bonjol padang', wide: true },
  { file: 'flyer/daurah-aswaja-13-agus.jpeg', alt: 'Daurah Aswaja, Kamis 13 Agustus 2026', ratio: '3 / 4', meta: 'Daurah Aswaja', caption: 'Daurah Aswaja' },
  { file: 'flyer/karakter-salik.jpeg', alt: '8 Karakter Salik Surah Bateh', ratio: '3 / 4', meta: 'karakter-salik', caption: '8 Karakter Salik Surah Bateh' },
  { file: 'background-daurah.jpeg', alt: 'Flyer Daurah', ratio: '16 / 9', meta: 'Flyer Daurah', caption: 'Daurah Aswaja by Surau Bateh Lori', wide: true },
  { file: 'photos/daurah-pertama.jpeg', alt: 'Daurah Pertama', ratio: '16 / 9', meta: 'Daurah', caption: 'Daurah Perdana, di Mushalla Al-Ikhlas Talao Mundam. Masyarakat sangat antusias dengan tema kajian yaitu, menyempurnakan Rukun Agama terkhusus pada kajian Ihsan.', wide: true },
  { file: 'photos/undangan-uin-ib-padang.jpeg', alt: 'Undangan UIN IB', ratio: '16 / 9', meta: 'Undangan', caption: 'Surau Bateh di Undang oleh Prodi Tasawuf dan Psikoterapi UIN IB Padang dalam rangka evaluasi kurikulum', wide: true },
  { file: 'photos/gotong-royong-halaman.jpg', alt: 'Gotong royong halaman surau', ratio: '3 / 4', meta: 'Gotong Royong', caption: 'Membersihkan lereng halaman.' },
  { file: 'photos/latihan-silat.jpg', alt: 'Latihan silat di surau', ratio: '3 / 4', hotspot: { x: 0.5, y: 0.35, ...HOTSPOT_BOX }, meta: 'Remaja', caption: 'Latihan silat tradisi, malam pekanan.' },
  { file: 'photos/interior-ruang-salat.png', alt: 'Ruang shalat surau', ratio: '3 / 4', meta: 'Ruang Utama', caption: 'Karpet ruang shalat selepas Dzuhur.' },
  { file: 'photos/gotong-royong-jamaah.jpg', alt: 'Jamaah bekerja di halaman', ratio: '3 / 4', meta: 'Gotong Royong', caption: 'Jamaah membersihkan halaman atas.' },
];

const write = process.argv.includes('--write');
const dryRun = !write;

async function main() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  const token = process.env.SANITY_API_TOKEN;
  if (!projectId || !dataset || !token) {
    console.error('migrate-gallery-to-sanity: SANITY_PROJECT_ID/SANITY_DATASET/SANITY_API_TOKEN belum diset (lihat site/.env.example). Token butuh hak tulis (bukan role Viewer).');
    process.exit(1);
  }

  const client = createClient({ projectId, dataset, token, apiVersion: '2026-01-01', useCdn: false });
  console.log(`migrate-gallery-to-sanity: ${GALLERY_MANIFEST.length} entri galeri${dryRun ? ' (DRY RUN -- tidak menulis apa pun)' : ' (MENULIS ke dataset produksi)'}`);

  for (let i = 0; i < GALLERY_MANIFEST.length; i++) {
    const entry = GALLERY_MANIFEST[i];
    const absPath = path.join(assetsDir, entry.file);
    console.log(`- [${i}] ${entry.file}`);
    if (!existsSync(absPath)) {
      console.warn(`  ! gambar tidak ditemukan di ${path.relative(siteRoot, absPath)}, dilewati`);
      continue;
    }

    if (dryRun) {
      console.log(`  [dry-run] akan upload ${path.relative(siteRoot, absPath)} + createOrReplace galleryItem-${i}`);
      continue;
    }

    const asset = await client.assets.upload('image', readFileSync(absPath), { filename: path.basename(absPath) });
    const doc = {
      _type: 'galleryItem',
      _id: `galleryItem-${i}`,
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
        ...(entry.hotspot ? { hotspot: entry.hotspot } : {}),
      },
      alt: entry.alt,
      caption: entry.caption,
      meta: entry.meta,
      ratio: entry.ratio,
      wide: Boolean(entry.wide),
      order: i,
    };
    const result = await client.createOrReplace(doc);
    console.log(`  ditulis: ${result._id}`);
  }

  console.log(dryRun
    ? '\nDry run selesai. Jalankan ulang dengan --write untuk benar-benar menulis ke dataset produksi.'
    : '\nMigrasi selesai.');
}

main().catch(err => {
  console.error('migrate-gallery-to-sanity: gagal:', err);
  process.exit(1);
});
