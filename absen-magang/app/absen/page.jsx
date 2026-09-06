'use client';

import { useState } from 'react';

function ambilLokasi() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => resolve(null),
      { timeout: 8000 },
    );
  });
}

export default function AbsenPage() {
  const [pin, setPin] = useState('');
  const [catatanAktivitas, setCatatanAktivitas] = useState('');
  const [pesan, setPesan] = useState(null);
  const [pending, setPending] = useState(false);

  async function submit(tipe) {
    setPending(true);
    setPesan(null);
    try {
      const lokasi = await ambilLokasi();
      const res = await fetch(`/api/kehadiran/${tipe}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin,
          latitude: lokasi?.latitude,
          longitude: lokasi?.longitude,
          catatanAktivitas: tipe === 'checkout' ? catatanAktivitas : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPesan({ status: 'error', teks: data.error });
        return;
      }
      const label = tipe === 'checkin' ? 'Check-in' : 'Check-out';
      const catatan = data.kehadiran.status === 'ditinjau'
        ? ' Tercatat sebagai "ditinjau" -- akan diperiksa Pengurus.'
        : '';
      setPesan({ status: 'sukses', teks: `${label} berhasil.${catatan}` });
    } catch {
      setPesan({ status: 'error', teks: 'Terjadi kesalahan jaringan, coba lagi.' });
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="container">
      <h1>Absen Peserta</h1>
      <div className="card">
        {pesan && <div className={pesan.status === 'error' ? 'error' : 'success'}>{pesan.teks}</div>}

        <label htmlFor="pin">PIN</label>
        <input id="pin" value={pin} onChange={e => setPin(e.target.value)} inputMode="numeric" maxLength={6} required />

        <label htmlFor="catatanAktivitas">Catatan aktivitas (diisi saat check-out)</label>
        <textarea
          id="catatanAktivitas"
          rows={3}
          value={catatanAktivitas}
          onChange={e => setCatatanAktivitas(e.target.value)}
        />

        <button disabled={pending || !pin} onClick={() => submit('checkin')}>Check-in</button>{' '}
        <button className="secondary" disabled={pending || !pin} onClick={() => submit('checkout')}>Check-out</button>
      </div>
    </main>
  );
}
