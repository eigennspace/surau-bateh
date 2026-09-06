import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifikasiSessionToken, SESSION_COOKIE } from '../../lib/session.js';
import { logoutPengurus } from '../login/actions.js';
import { DashboardShell } from '../../components/DashboardShell.jsx';

// Pemeriksaan sesi kedua di server component, selain middleware.js --
// pertahanan berlapis bila middleware suatu saat dilewati (mis. cache).
export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const session = await verifikasiSessionToken(cookieStore.get(SESSION_COOKIE.name)?.value);

  if (!session) {
    redirect('/login');
  }

  return (
    <DashboardShell username={session.username} logoutAction={logoutPengurus}>
      {children}
    </DashboardShell>
  );
}
