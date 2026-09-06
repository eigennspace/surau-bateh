'use client';

import { useActionState, useState } from 'react';
import { simpanJendelaAbsen } from './actions.js';

const initialState = { status: 'idle' };

function angkaAtauKosong(value) {
  return value === '' || value === null || value === undefined ? '' : value;
}

export default function JendelaAbsenForm({ jendelaAbsen }) {
  const [state, formAction, pending] = useActionState(simpanJendelaAbsen, initialState);

  // Latitude/longitude jadi controlled supaya tombol "pakai lokasi saya
  // sekarang" dan "ambil koordinat dari link Maps" bisa mengisinya --
  // FormData tetap membaca value ini apa adanya saat form disubmit.
  const [latitude, setLatitude] = useState(angkaAtauKosong(jendelaAbsen?.latitude));
  const [longitude, setLongitude] = useState(angkaAtauKosong(jendelaAbsen?.longitude));

  const [lokasiSaya, setLokasiSaya] = useState({ status: 'idle' }); // idle | mencari | error
  const [tempelMaps, setTempelMaps] = useState('');
  const [resolveMaps, setResolveMaps] = useState({ status: 'idle' }); // idle | mencari | error

  function pakaiLokasiSaya() {
    if (!navigator.geolocation) {
      setLokasiSaya({ status: 'error', pesan: 'Browser ini tidak mendukung deteksi lokasi.' });
      return;
    }
    setLokasiSaya({ status: 'mencari' });
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        setLokasiSaya({ status: 'idle' });
      },
      err => setLokasiSaya({ status: 'error', pesan: `Gagal mengambil lokasi: ${err.message}` }),
      { timeout: 8000 },
    );
  }

  async function ambilDariMaps() {
    if (!tempelMaps.trim()) return;
    setResolveMaps({ status: 'mencari' });
    try {
      const res = await fetch('/api/resolve-lokasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teks: tempelMaps }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResolveMaps({ status: 'error', pesan: data.error ?? 'Gagal membaca link tersebut' });
        return;
      }
      setLatitude(data.latitude);
      setLongitude(data.longitude);
      setResolveMaps({ status: 'idle' });
    } catch {
      setResolveMaps({ status: 'error', pesan: 'Terjadi kesalahan jaringan, coba lagi.' });
    }
  }

  const bisaLihatPeta = latitude !== '' && longitude !== '';

  return (
    <form action={formAction} className="card">
      {state.status === 'error' && <div className="error">{state.pesan}</div>}
      {state.status === 'sukses' && <div className="success">Jendela Absen tersimpan.</div>}

      <div style={{ marginBottom: 'var(--space-4)' }}>
        <button type="button" className="secondary" onClick={pakaiLokasiSaya} disabled={lokasiSaya.status === 'mencari'}>
          {lokasiSaya.status === 'mencari' ? 'Mengambil lokasi…' : '📍 Pakai lokasi saya sekarang'}
        </button>
        {lokasiSaya.status === 'error' && <div className="error" style={{ marginTop: 'var(--space-2)' }}>{lokasiSaya.pesan}</div>}
      </div>

      <label htmlFor="tempelMaps">Atau tempel link Google Maps</label>
      <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
        <input
          id="tempelMaps"
          value={tempelMaps}
          onChange={e => setTempelMaps(e.target.value)}
          placeholder="https://maps.app.goo.gl/... atau -0.9, 100.4"
          style={{ flex: 1 }}
        />
        <button type="button" className="secondary" onClick={ambilDariMaps} disabled={resolveMaps.status === 'mencari' || !tempelMaps.trim()}>
          {resolveMaps.status === 'mencari' ? 'Membaca…' : 'Ambil koordinat'}
        </button>
      </div>
      {resolveMaps.status === 'error' && <div className="error" style={{ marginTop: 'var(--space-2)' }}>{resolveMaps.pesan}</div>}
      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-caption)', marginTop: 'var(--space-1)', marginBottom: 'var(--space-4)' }}>
        Buka lokasi surau di Google Maps, ketuk "Bagikan", salin link-nya, lalu tempel di sini.
      </p>

      <label htmlFor="latitude">Latitude</label>
      <input
        id="latitude"
        name="latitude"
        type="number"
        step="any"
        value={latitude}
        onChange={e => setLatitude(e.target.value)}
        required
      />

      <label htmlFor="longitude">Longitude</label>
      <input
        id="longitude"
        name="longitude"
        type="number"
        step="any"
        value={longitude}
        onChange={e => setLongitude(e.target.value)}
        required
      />

      {bisaLihatPeta && (
        <p style={{ marginTop: `calc(var(--space-4) * -1)`, marginBottom: 'var(--space-4)' }}>
          <a href={`https://www.google.com/maps?q=${latitude},${longitude}`} target="_blank" rel="noreferrer">
            Lihat titik ini di peta ↗
          </a>
        </p>
      )}

      <label htmlFor="radiusMeter">Radius (meter)</label>
      <input id="radiusMeter" name="radiusMeter" type="number" step="any" min="1" defaultValue={jendelaAbsen?.radiusMeter ?? ''} required />

      <label htmlFor="jamMulai">Jam kerja — mulai</label>
      <input id="jamMulai" name="jamMulai" type="time" defaultValue={jendelaAbsen?.jamMulai ?? ''} required />

      <label htmlFor="jamSelesai">Jam kerja — selesai</label>
      <input id="jamSelesai" name="jamSelesai" type="time" defaultValue={jendelaAbsen?.jamSelesai ?? ''} required />

      <button type="submit" disabled={pending}>{pending ? 'Menyimpan…' : 'Simpan Jendela Absen'}</button>
    </form>
  );
}
