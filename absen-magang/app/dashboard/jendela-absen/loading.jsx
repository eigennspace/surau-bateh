import { SkeletonForm } from '../../../components/ds/Skeleton.jsx';

// Fallback otomatis Next.js selama JendelaAbsenPage masih await
// getJendelaAbsen -- lihat components/ds/Skeleton.jsx.
export default function JendelaAbsenLoading() {
  return (
    <div>
      <h1>Jendela Absen</h1>
      <p>Satu pengaturan lokasi + jam kerja yang berlaku untuk semua Peserta.</p>
      <SkeletonForm fields={6} />
    </div>
  );
}
