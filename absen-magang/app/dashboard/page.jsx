import { getPool } from '../../lib/db.js';
import { daftarPendaftaranMenunggu, daftarKehadiranDitinjauDenganPeserta, daftarPeserta } from '../../lib/absen/index.js';
import { StatCard } from '../../components/ds/StatCard.jsx';

export const dynamic = 'force-dynamic';

export default async function DashboardHome() {
  const pool = getPool();
  const [pendaftaranMenunggu, kehadiranDitinjau, peserta] = await Promise.all([
    daftarPendaftaranMenunggu(pool),
    daftarKehadiranDitinjauDenganPeserta(pool),
    daftarPeserta(pool),
  ]);
  const pesertaAktif = peserta.filter(p => p.statusPendaftaran === 'disetujui');

  return (
    <div>
      <h1>Dashboard Pengurus</h1>
      <p>Ringkasan pekerjaan yang menunggu Anda hari ini.</p>
      <div className="stat-card-grid">
        <StatCard
          label="Pendaftaran menunggu"
          value={pendaftaranMenunggu.length}
          href="/dashboard/pendaftaran"
          icon="user-plus"
        />
        <StatCard
          label="Kehadiran perlu ditinjau"
          value={kehadiranDitinjau.length}
          href="/dashboard/kehadiran"
          icon="clipboard-check"
        />
        <StatCard
          label="Peserta aktif"
          value={pesertaAktif.length}
          href="/dashboard/peserta"
          icon="users"
        />
      </div>
    </div>
  );
}
