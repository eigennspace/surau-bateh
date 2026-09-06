import { getPool } from '../../../lib/db.js';
import { daftarPeserta } from '../../../lib/absen/index.js';
import { PesertaTableRow, PesertaCard } from './PesertaRow.jsx';
import { ResponsiveTable } from '../../../components/ds/ResponsiveTable.jsx';
import { EmptyState } from '../../../components/ds/EmptyState.jsx';

export const dynamic = 'force-dynamic';

export default async function DaftarPesertaPage() {
  const daftar = await daftarPeserta(getPool());

  return (
    <div>
      <h1>Daftar Peserta</h1>
      <p>Seluruh Peserta yang pernah mendaftar, apa pun status Pendaftarannya.</p>
      {daftar.length === 0 ? (
        <EmptyState icon="users">Belum ada Peserta yang terdaftar.</EmptyState>
      ) : (
        <ResponsiveTable
          columns={['Nama', 'Asal kampus', 'Jurusan', 'NIM', 'WhatsApp', 'Periode Magang', 'Status']}
          rows={daftar.map(peserta => <PesertaTableRow key={peserta.id} peserta={peserta} />)}
          cards={daftar.map(peserta => <PesertaCard key={peserta.id} peserta={peserta} />)}
        />
      )}
    </div>
  );
}
