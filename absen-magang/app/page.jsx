import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container">
      <h1>Absen Magang</h1>
      <p>Surau Bateh Lori — pencatatan kehadiran mahasiswi/intern magang.</p>
      <div className="card">
        <h3>Peserta magang</h3>
        <p><Link href="/daftar">Daftar sebagai Peserta baru</Link></p>
        <p><Link href="/absen">Check-in / Check-out dengan PIN</Link></p>
      </div>
      <div className="card">
        <h3>Pengurus</h3>
        <p><Link href="/login">Masuk ke dashboard Pengurus</Link></p>
      </div>
    </main>
  );
}
