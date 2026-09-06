import { getPool } from '../../../lib/db.js';
import { daftarPendaftaranMenunggu } from '../../../lib/absen/index.js';
import PendaftaranRow from './PendaftaranRow.jsx';

export const dynamic = 'force-dynamic';

export default async function PendaftaranPage() {
  const daftar = await daftarPendaftaranMenunggu(getPool());

  return (
    <div>
      <h1>Pendaftaran Menunggu</h1>
      {daftar.length === 0 ? (
        <p>Tidak ada Pendaftaran yang menunggu saat ini.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Asal kampus</th>
              <th>Jurusan</th>
              <th>NIM</th>
              <th>WhatsApp</th>
              <th>Periode Magang</th>
              <th>Keputusan</th>
            </tr>
          </thead>
          <tbody>
            {daftar.map(peserta => (
              <PendaftaranRow key={peserta.id} peserta={peserta} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
