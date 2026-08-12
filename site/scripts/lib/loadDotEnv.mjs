// loadDotEnv — parser `.env` minimal ditulis tangan, dipakai skrip
// build-time `fetch-sanity-content.mjs` (skrip migrasi satu-kali yang dulu
// juga memakainya sudah dihapus di tiket cutover, lihat
// `.scratch/cms-migration-sanity/issues/06-cutover-hapus-pipeline-lama.md`).
// Skrip ini jalan lewat `node` biasa (sebelum `vite build`), bukan lewat
// Vite, jadi env loading bawaan Vite tidak berlaku. Parser kecil ditulis
// tangan alih-alih menambah dependency `dotenv` untuk kebutuhan sekecil
// ini -- konsisten dengan aversi repo ini pada dependency untuk parsing
// sederhana. Variabel yang sudah ada di `process.env` (mis. secrets CI)
// tidak ditimpa.

import { existsSync, readFileSync } from 'node:fs';

export function loadDotEnv(file) {
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
