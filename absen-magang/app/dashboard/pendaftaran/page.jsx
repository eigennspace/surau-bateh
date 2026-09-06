import { getPool } from '../../../lib/db.js';
import { daftarPendaftaranMenunggu } from '../../../lib/absen/index.js';
import { PendaftaranTableRow, PendaftaranCard } from './PendaftaranRow.jsx';
import { ResponsiveTable } from '../../../components/ds/ResponsiveTable.jsx';
import { EmptyState } from '../../../components/ds/EmptyState.jsx';

export const dynamic = 'force-dynamic';

export default async function PendaftaranPage() {
  const daftar = await daftarPendaftaranMenunggu(getPool());

  return (
    <div>
      <h1>Pendaftaran Menunggu</h1>
      {daftar.length === 0 ? (
        <EmptyState icon="user-plus">Tidak ada Pendaftaran yang menunggu saat ini.</EmptyState>
      ) : (
        <ResponsiveTable
          columns={['Nama', 'Asal kampus', 'Jurusan', 'NIM', 'WhatsApp', 'Periode Magang', 'Keputusan']}
          rows={daftar.map(peserta => <PendaftaranTableRow key={peserta.id} peserta={peserta} />)}
          cards={daftar.map(peserta => <PendaftaranCard key={peserta.id} peserta={peserta} />)}
        />
      )}
    </div>
  );
}
