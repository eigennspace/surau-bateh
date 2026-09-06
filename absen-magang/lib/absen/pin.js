import { randomInt } from 'node:crypto';

// PIN 6 digit -- diberikan sekali saat Pendaftaran disetujui, dipakai
// Peserta menggantikan akun/kata sandi (lihat Implementation Decisions
// di spec.md). Dicoba ulang sampai tidak bentrok dengan PIN aktif lain.
export async function generatePinUnik(db) {
  for (let percobaan = 0; percobaan < 20; percobaan += 1) {
    const pin = String(randomInt(0, 1_000_000)).padStart(6, '0');
    const { rows } = await db.query('SELECT 1 FROM peserta WHERE pin = $1', [pin]);
    if (rows.length === 0) {
      return pin;
    }
  }
  throw new Error('Gagal generate PIN unik setelah beberapa percobaan');
}
