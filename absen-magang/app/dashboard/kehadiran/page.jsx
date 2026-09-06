import { getPool } from '../../../lib/db.js';
import { daftarKehadiranDitinjauDenganPeserta } from '../../../lib/absen/index.js';
import KehadiranRow from './KehadiranRow.jsx';

export const dynamic = 'force-dynamic';

export default async function KehadiranDitinjauPage() {
  const daftar = await daftarKehadiranDitinjauDenganPeserta(getPool());

  return (
    <div>
      <h1>Kehadiran Ditinjau</h1>
      {daftar.length === 0 ? (
        <p>Tidak ada Kehadiran berstatus ditinjau saat ini.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Peserta</th>
              <th>Tanggal</th>
              <th>Jam masuk</th>
              <th>Jam pulang</th>
              <th>Lokasi</th>
              <th>Keputusan</th>
            </tr>
          </thead>
          <tbody>
            {daftar.map(k => <KehadiranRow key={k.id} kehadiran={k} />)}
          </tbody>
        </table>
      )}
    </div>
  );
}
