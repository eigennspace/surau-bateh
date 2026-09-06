import pg from 'pg';

const { Pool } = pg;

let pool;

// Koneksi Postgres produksi (lihat ADR 0015 di root repo: database terpisah
// dari Sanity). Dibuat lazy supaya modul ini aman diimport di test tanpa
// DATABASE_URL terpasang -- test memakai db PGlite sendiri (lihat
// lib/absen/testDb.js), bukan pool ini.
export function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL belum diatur');
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pool;
}
