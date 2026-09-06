import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { pengurusFromRow } from './mappers.js';

const SALT_ROUNDS = 10;

// Membuat akun Pengurus baru (username + password ter-hash). Dipakai lewat
// script provisioning (scripts/create-pengurus.mjs), bukan form publik --
// tidak ada self-signup untuk Pengurus.
export async function buatPengurus(db, { username, password }) {
  const id = randomUUID();
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const { rows } = await db.query(
    `INSERT INTO pengurus (id, username, password_hash) VALUES ($1, $2, $3) RETURNING *`,
    [id, username, passwordHash],
  );
  return pengurusFromRow(rows[0]);
}

// Memverifikasi username+password login Pengurus. Mengembalikan Pengurus
// (tanpa passwordHash) bila valid, null bila tidak -- pemanggil (route
// login) yang memutuskan pesan error dan status HTTP.
export async function verifikasiLoginPengurus(db, { username, password }) {
  const { rows } = await db.query('SELECT * FROM pengurus WHERE username = $1', [username]);
  const pengurus = rows[0];
  if (!pengurus) return null;

  const cocok = await bcrypt.compare(password, pengurus.password_hash);
  if (!cocok) return null;

  return { id: pengurus.id, username: pengurus.username };
}
