import { PGlite } from '@electric-sql/pglite';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const schemaPath = fileURLToPath(new URL('../../db/schema.sql', import.meta.url));

// Database Postgres sungguhan (PGlite mengompilasi Postgres asli ke WASM,
// bukan mock) yang hidup di memori, dipakai test lib/absen/*.test.js --
// sesuai keputusan testing di spec: "diuji terhadap database test sungguhan
// (bukan mock koneksi database)". Satu instance baru per test supaya test
// terisolasi satu sama lain.
export async function createTestDb() {
  const db = await PGlite.create();
  const schema = await readFile(schemaPath, 'utf8');
  await db.exec(schema);
  return db;
}
