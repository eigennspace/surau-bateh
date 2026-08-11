#!/usr/bin/env node
// generate-prayer-times — skrip build-time yang menghasilkan dataset jadwal
// shalat metode Kemenag untuk ~1 tahun ke depan dari tanggal skrip
// dijalankan, memakai `computePrayerTimes` (site/src/lib/prayerTimeCalculator.js)
// dan koordinat lokasi dari Sumber Data (`sourceData.js`).
//
// Dijalankan sebagai bagian dari `npm run build` (lihat package.json), jadi
// CI (`deploy.yml`, yang menjalankan `npm run build`) otomatis mendapat data
// segar tiap kali situs di-build -- tanpa cron/jadwal rebuild terpisah.
//
// Berkas hasil generate (`src/generated/prayerTimes.json`) TIDAK dikomit ke
// git (lihat `.gitignore`) -- ini data turunan, bisa dibangkitkan ulang
// kapan saja dari `location` di Sumber Data, bukan sumber kebenaran.
//
// Mengikuti pola `sync-design-system.mjs`: skrip I/O tipis di atas modul
// murni yang sudah diuji terpisah, jadi skrip ini sendiri tidak punya tes.

import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { computePrayerTimes } from '../src/lib/prayerTimeCalculator.js';
// Diimpor dari `location.js`, bukan `sourceData.js` -- `sourceData.js`
// menarik import gambar lewat pipeline aset Vite, yang tidak bisa dijalankan
// lewat Node biasa di luar Vite (skrip ini berjalan build-time, sebelum
// `vite build`).
import { LOCATION } from '../src/data/location.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');
const outFile = path.join(siteRoot, 'src', 'generated', 'prayerTimes.json');

// ≥1 tahun supaya situs tidak pernah kehabisan tanggal di antara dua kali
// deploy, walau deploy jarang terjadi.
const DAYS_AHEAD = 370;

function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function main() {
  const location = LOCATION;
  if (!location || typeof location.latitude !== 'number' || typeof location.longitude !== 'number') {
    console.error(
      'generate-prayer-times: location.js tidak valid (butuh { latitude, longitude }). ' +
      'Build dihentikan -- situs tidak boleh tayang tanpa jadwal shalat yang benar.',
    );
    process.exit(1);
  }

  const entries = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  for (let i = 0; i < DAYS_AHEAD; i++) {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    let times;
    try {
      times = computePrayerTimes({ latitude: location.latitude, longitude: location.longitude, date });
    } catch (err) {
      console.error(`generate-prayer-times: gagal menghitung jadwal untuk ${toDateKey(date)}: ${err.message}`);
      process.exit(1);
    }
    entries.push({ date: toDateKey(date), ...times });
  }

  if (entries.length === 0) {
    console.error('generate-prayer-times: tidak ada entri dihasilkan. Build dihentikan.');
    process.exit(1);
  }

  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, JSON.stringify(entries, null, 2) + '\n');
  console.log(`generate-prayer-times: ${entries.length} hari (${entries[0].date} .. ${entries[entries.length - 1].date}) ditulis ke ${path.relative(siteRoot, outFile)}`);
}

main();
