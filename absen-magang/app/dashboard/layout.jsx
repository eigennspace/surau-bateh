import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifikasiSessionToken, SESSION_COOKIE } from '../../lib/session.js';
import { logoutPengurus } from '../login/actions.js';

// Pemeriksaan sesi kedua di server component, selain middleware.js --
// pertahanan berlapis bila middleware suatu saat dilewati (mis. cache).
export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const session = await verifikasiSessionToken(cookieStore.get(SESSION_COOKIE.name)?.value);

  if (!session) {
    redirect('/login');
  }

  return (
    <main className="container">
      <nav className="dashboard-nav">
        <Link href="/dashboard">Beranda</Link>
        <Link href="/dashboard/pendaftaran">Pendaftaran</Link>
        <Link href="/dashboard/jendela-absen">Jendela Absen</Link>
        <Link href="/dashboard/kehadiran">Kehadiran Ditinjau</Link>
        <Link href="/dashboard/laporan">Laporan</Link>
        <form action={logoutPengurus} style={{ marginLeft: 'auto' }}>
          <button type="submit" className="secondary">Keluar ({session.username})</button>
        </form>
      </nav>
      {children}
    </main>
  );
}
