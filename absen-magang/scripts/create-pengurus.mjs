// Provisioning akun Pengurus dari command line -- tidak ada form self-signup
// (lihat spec.md: hanya satu akun personal Pengurus, dibuat manual).
//
// Pemakaian: DATABASE_URL=... node scripts/create-pengurus.mjs <username> <password>
import pg from 'pg';
import { buatPengurus } from '../lib/absen/pengurus.js';

const { Pool } = pg;

async function main() {
  const [username, password] = process.argv.slice(2);
  if (!username || !password) {
    console.error('Pemakaian: node scripts/create-pengurus.mjs <username> <password>');
    process.exit(1);
  }
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL belum diatur (lihat .env.example)');
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const pengurus = await buatPengurus(pool, { username, password });
    console.log(`Pengurus dibuat: ${pengurus.username} (id ${pengurus.id})`);
  } finally {
    await pool.end();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
