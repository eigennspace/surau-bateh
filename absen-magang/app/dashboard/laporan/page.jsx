import { getPool } from '../../../lib/db.js';
import { daftarPeserta } from '../../../lib/absen/index.js';

export const dynamic = 'force-dynamic';

export default async function LaporanPage() {
  const peserta = await daftarPeserta(getPool());

  return (
    <div>
      <h1>Generate Laporan</h1>
      <p>Pilih Peserta dan rentang tanggal. PDF dibuka di tab baru, siap dicetak.</p>
      <form action="/api/laporan" method="GET" target="_blank" className="card">
        <label htmlFor="pesertaId">Peserta</label>
        <select id="pesertaId" name="pesertaId" required>
          {peserta.map(p => (
            <option key={p.id} value={p.id}>{p.nama} — {p.nim}</option>
          ))}
        </select>

        <label htmlFor="tanggalMulai">Tanggal mulai</label>
        <input id="tanggalMulai" name="tanggalMulai" type="date" required />

        <label htmlFor="tanggalSelesai">Tanggal selesai</label>
        <input id="tanggalSelesai" name="tanggalSelesai" type="date" required />

        <button type="submit">Generate PDF</button>
      </form>
    </div>
  );
}
