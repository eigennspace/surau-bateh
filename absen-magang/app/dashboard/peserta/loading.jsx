import { SkeletonTable } from '../../../components/ds/Skeleton.jsx';

// Fallback otomatis Next.js selama DaftarPesertaPage masih await
// daftarPeserta -- lihat components/ds/Skeleton.jsx.
export default function PesertaLoading() {
  return (
    <div>
      <h1>Daftar Peserta</h1>
      <p>Seluruh Peserta yang pernah mendaftar, apa pun status Pendaftarannya.</p>
      <SkeletonTable columns={['Nama', 'Asal kampus', 'Jurusan', 'NIM', 'WhatsApp', 'Periode PL', 'Status']} />
    </div>
  );
}
