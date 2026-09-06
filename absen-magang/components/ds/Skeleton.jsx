import { Card } from './Card.jsx';

// Skeleton loading dipakai lewat convention `loading.jsx` Next.js App
// Router: setiap page.jsx di app/dashboard/** adalah async server
// component (dynamic = 'force-dynamic') yang langsung await query DB,
// jadi Next otomatis menampilkan sibling loading.jsx ini sebagai
// fallback instan sementara data masih di-fetch di server -- tanpa
// perlu ubah page.jsx yang sudah ada. Shimmer-nya lewat CSS
// `.skeleton` (lihat styles/dashboard.css), animasinya di-skip
// otomatis untuk pengguna dengan prefers-reduced-motion (lihat CSS).

/** Blok dasar skeleton -- persegi panjang dengan shimmer. */
export function Skeleton({ width = '100%', height = 16, radius = 'var(--radius-sm)', style }) {
  return <div className="skeleton" style={{ width, height, borderRadius: radius, ...style }} />;
}

/** Tiru StatCard: ikon bulat + dua baris teks, dipakai grid 3 kolom di Beranda. */
function SkeletonStatCard() {
  return (
    <Card style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
      <Skeleton width={28} height={28} radius="var(--radius-pill)" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', flex: 1 }}>
        <Skeleton width={48} height={28} />
        <Skeleton width="70%" height={14} />
      </div>
    </Card>
  );
}

export function SkeletonStatCards({ count = 3 }) {
  return (
    <div className="stat-card-grid">
      {Array.from({ length: count }).map((_, i) => <SkeletonStatCard key={i} />)}
    </div>
  );
}

/** Tiru ResponsiveTable: baris tabel skeleton di desktop, kartu skeleton di mobile. */
export function SkeletonTable({ columns, rows = 4 }) {
  return (
    <div className="responsive-table">
      <table className="responsive-table__table">
        <thead>
          <tr>
            {columns.map(kolom => <th key={kolom}>{kolom}</th>)}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i}>
              {columns.map((kolom, j) => (
                <td key={kolom}><Skeleton width={j === 0 ? '80%' : '60%'} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="responsive-table__cards">
        {Array.from({ length: rows }).map((_, i) => (
          <Card key={i}>
            <Skeleton width="50%" height={18} style={{ marginBottom: 'var(--space-3)' }} />
            {columns.slice(1).map((kolom, j) => (
              <div key={kolom} className="entry-card__field">
                <Skeleton width="30%" height={12} />
                <Skeleton width="40%" height={12} />
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}

/** Tiru Card berisi form: label + input persegi panjang, per field. */
export function SkeletonForm({ fields = 3 }) {
  return (
    <Card>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 'var(--space-4)' }}>
          <Skeleton width={100} height={12} />
          <Skeleton height={44} radius="var(--radius-md)" />
        </div>
      ))}
      <Skeleton height={44} radius="var(--radius-md)" />
    </Card>
  );
}
