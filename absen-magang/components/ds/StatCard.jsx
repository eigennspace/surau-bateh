import Link from 'next/link';
import { Card } from './Card.jsx';
import { Icon } from './Icon.jsx';

// Kartu statistik Beranda -- angka + label, jadi Link ke halaman terkait
// (lihat spec.md, User Story 1-4). Tiga kartu dipakai dashboard/page.jsx,
// tanpa query database baru (angka dihitung dari fungsi lib/absen yang
// sudah ada).
export function StatCard({ label, value, href, icon }) {
  return (
    <Link href={href} className="stat-card">
      <Card interactive style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <Icon name={icon} size={28} style={{ color: 'var(--text-brand)', flex: '0 0 auto' }} />
        <div>
          <div className="stat-card__value">{value}</div>
          <div className="stat-card__label">{label}</div>
        </div>
      </Card>
    </Link>
  );
}
