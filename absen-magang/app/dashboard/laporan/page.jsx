import { getPool } from '../../../lib/db.js';
import { daftarPeserta } from '../../../lib/absen/index.js';
import { Card } from '../../../components/ds/Card.jsx';
import { Input } from '../../../components/ds/Input.jsx';
import { Button } from '../../../components/ds/Button.jsx';

export const dynamic = 'force-dynamic';

export default async function LaporanPage() {
  const peserta = await daftarPeserta(getPool());

  return (
    <div>
      <h1>Generate Laporan</h1>
      <p>Pilih Peserta dan rentang tanggal. PDF dibuka di tab baru, siap dicetak.</p>
      <Card>
        <form action="/api/laporan" method="GET" target="_blank">
          <div className="ds-field">
            <label htmlFor="pesertaId">Peserta</label>
            <select id="pesertaId" name="pesertaId" required className="ds-select">
              {peserta.map(p => (
                <option key={p.id} value={p.id}>{p.nama} — {p.nim}</option>
              ))}
            </select>
          </div>

          <Input
            id="tanggalMulai"
            name="tanggalMulai"
            label="Tanggal mulai"
            type="date"
            required
            style={{ marginBottom: 'var(--space-4)' }}
          />

          <Input
            id="tanggalSelesai"
            name="tanggalSelesai"
            label="Tanggal selesai"
            type="date"
            required
            style={{ marginBottom: 'var(--space-5)' }}
          />

          <Button type="submit" icon="file-text" fullWidth>Generate PDF</Button>
        </form>
      </Card>
    </div>
  );
}
