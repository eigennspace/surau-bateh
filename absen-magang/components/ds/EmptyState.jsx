import { Card } from './Card.jsx';
import { Icon } from './Icon.jsx';

// Pola empty-state ringan (ikon + teks) dipakai Pendaftaran & Kehadiran
// Ditinjau saat daftarnya kosong (lihat spec.md, Implementation Decisions:
// "Empty state").
export function EmptyState({ icon = 'inbox', children }) {
  return (
    <Card>
      <div className="empty-state">
        <Icon name={icon} size={32} className="empty-state__icon" style={{ color: 'var(--text-faint)' }} />
        <p className="empty-state__text">{children}</p>
      </div>
    </Card>
  );
}
