import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createTestDb } from './testDb.js';
import { buatPengurus, verifikasiLoginPengurus } from './pengurus.js';

let db;

beforeEach(async () => {
  db = await createTestDb();
  await buatPengurus(db, { username: 'pengurus1', password: 'rahasia123' });
});

afterEach(async () => {
  await db.close();
});

describe('verifikasiLoginPengurus', () => {
  it('kredensial valid -> mengembalikan Pengurus', async () => {
    const hasil = await verifikasiLoginPengurus(db, { username: 'pengurus1', password: 'rahasia123' });
    expect(hasil).not.toBeNull();
    expect(hasil.username).toBe('pengurus1');
    expect(hasil.passwordHash).toBeUndefined();
  });

  it('password salah -> null', async () => {
    const hasil = await verifikasiLoginPengurus(db, { username: 'pengurus1', password: 'salah' });
    expect(hasil).toBeNull();
  });

  it('username tidak ada -> null', async () => {
    const hasil = await verifikasiLoginPengurus(db, { username: 'tidak-ada', password: 'apapun' });
    expect(hasil).toBeNull();
  });
});
