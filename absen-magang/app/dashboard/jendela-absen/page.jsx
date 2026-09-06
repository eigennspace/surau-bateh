import { getPool } from '../../../lib/db.js';
import { getJendelaAbsen } from '../../../lib/absen/index.js';
import JendelaAbsenForm from './JendelaAbsenForm.jsx';

export const dynamic = 'force-dynamic';

export default async function JendelaAbsenPage() {
  const jendelaAbsen = await getJendelaAbsen(getPool());

  return (
    <div>
      <h1>Jendela Absen</h1>
      <p>Satu pengaturan lokasi + jam kerja yang berlaku untuk semua Peserta.</p>
      <JendelaAbsenForm jendelaAbsen={jendelaAbsen} />
    </div>
  );
}
