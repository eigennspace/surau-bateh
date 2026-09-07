import { SkeletonTable } from '../../../components/ds/Skeleton.jsx';

// Fallback otomatis Next.js selama PendaftaranPage masih await
// daftarPendaftaranMenunggu -- lihat components/ds/Skeleton.jsx.
export default function PendaftaranLoading() {
  return (
    <div>
      <h1>Pendaftaran Menunggu</h1>
      <SkeletonTable columns={['Nama', 'Asal kampus', 'Jurusan', 'NIM', 'WhatsApp', 'Periode PL', 'Keputusan']} />
    </div>
  );
}
