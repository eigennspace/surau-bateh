import { Card } from '../../../components/ds/Card.jsx';
import { Badge } from '../../../components/ds/Badge.jsx';

// Baris/kartu Peserta di halaman "Daftar Peserta" -- murni tampilan, tanpa
// aksi (Setujui/Tolak sudah ditangani di halaman Pendaftaran); status
// pendaftaran ditampilkan sebagai Badge, mengikuti pemetaan tone yang sama
// dipakai PendaftaranRow/KehadiranRow.
const TONE_STATUS = { menunggu: 'accent', disetujui: 'active', ditolak: 'neutral' };

export function PesertaTableRow({ peserta }) {
  return (
    <tr>
      <td>{peserta.nama}</td>
      <td>{peserta.asalKampus}</td>
      <td>{peserta.jurusan}</td>
      <td>{peserta.nim}</td>
      <td>{peserta.noWhatsapp}</td>
      <td>{peserta.periodeMulai} — {peserta.periodeSelesai}</td>
      <td><Badge tone={TONE_STATUS[peserta.statusPendaftaran] ?? 'neutral'}>{peserta.statusPendaftaran}</Badge></td>
    </tr>
  );
}

export function PesertaCard({ peserta }) {
  return (
    <Card>
      <h3 style={{ marginBottom: 'var(--space-3)' }}>{peserta.nama}</h3>
      <div className="entry-card__field">
        <span className="entry-card__label">Asal kampus</span>
        <span className="entry-card__value">{peserta.asalKampus}</span>
      </div>
      <div className="entry-card__field">
        <span className="entry-card__label">Jurusan</span>
        <span className="entry-card__value">{peserta.jurusan}</span>
      </div>
      <div className="entry-card__field">
        <span className="entry-card__label">NIM</span>
        <span className="entry-card__value">{peserta.nim}</span>
      </div>
      <div className="entry-card__field">
        <span className="entry-card__label">WhatsApp</span>
        <span className="entry-card__value">{peserta.noWhatsapp}</span>
      </div>
      <div className="entry-card__field">
        <span className="entry-card__label">Periode Magang</span>
        <span className="entry-card__value">{peserta.periodeMulai} — {peserta.periodeSelesai}</span>
      </div>
      <div className="entry-card__field">
        <span className="entry-card__label">Status</span>
        <Badge tone={TONE_STATUS[peserta.statusPendaftaran] ?? 'neutral'}>{peserta.statusPendaftaran}</Badge>
      </div>
    </Card>
  );
}
