import { SkeletonTable } from '../../../components/ds/Skeleton.jsx';

// Fallback otomatis Next.js selama KehadiranDitinjauPage masih await
// daftarKehadiranDitinjauDenganPeserta -- lihat components/ds/Skeleton.jsx.
export default function KehadiranLoading() {
  return (
    <div>
      <h1>Kehadiran Ditinjau</h1>
      <SkeletonTable columns={['Peserta', 'Tanggal', 'Jam masuk', 'Jam pulang', 'Lokasi', 'Keputusan']} />
    </div>
  );
}
