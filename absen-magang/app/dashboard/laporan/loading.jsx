import { SkeletonForm } from '../../../components/ds/Skeleton.jsx';

// Fallback otomatis Next.js selama LaporanPage masih await daftarPeserta
// (isi <select> Peserta) -- lihat components/ds/Skeleton.jsx.
export default function LaporanLoading() {
  return (
    <div>
      <h1>Generate Laporan</h1>
      <p>Pilih Peserta dan rentang tanggal. PDF dibuka di tab baru, siap dicetak.</p>
      <SkeletonForm fields={3} />
    </div>
  );
}
