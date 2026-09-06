import { SkeletonStatCards } from '../../components/ds/Skeleton.jsx';

// Fallback otomatis Next.js selama DashboardHome (app/dashboard/page.jsx)
// masih await query DB -- lihat components/ds/Skeleton.jsx.
export default function DashboardLoading() {
  return (
    <div>
      <h1>Dashboard Pengurus</h1>
      <p>Ringkasan pekerjaan yang menunggu Anda hari ini.</p>
      <SkeletonStatCards count={3} />
    </div>
  );
}
