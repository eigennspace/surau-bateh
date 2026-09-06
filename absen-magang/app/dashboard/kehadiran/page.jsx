import { getPool } from '../../../lib/db.js';
import { daftarKehadiranDitinjauDenganPeserta } from '../../../lib/absen/index.js';
import { KehadiranTableRow, KehadiranCard } from './KehadiranRow.jsx';
import { ResponsiveTable } from '../../../components/ds/ResponsiveTable.jsx';
import { EmptyState } from '../../../components/ds/EmptyState.jsx';

export const dynamic = 'force-dynamic';

export default async function KehadiranDitinjauPage() {
  const daftar = await daftarKehadiranDitinjauDenganPeserta(getPool());

  return (
    <div>
      <h1>Kehadiran Ditinjau</h1>
      {daftar.length === 0 ? (
        <EmptyState icon="clipboard-check">Tidak ada Kehadiran berstatus ditinjau saat ini.</EmptyState>
      ) : (
        <ResponsiveTable
          columns={['Peserta', 'Tanggal', 'Jam masuk', 'Jam pulang', 'Lokasi', 'Keputusan']}
          rows={daftar.map(k => <KehadiranTableRow key={k.id} kehadiran={k} />)}
          cards={daftar.map(k => <KehadiranCard key={k.id} kehadiran={k} />)}
        />
      )}
    </div>
  );
}
