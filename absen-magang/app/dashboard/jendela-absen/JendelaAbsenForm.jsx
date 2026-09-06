'use client';

import { useActionState, useState } from 'react';
import { simpanJendelaAbsen } from './actions.js';
import { Card } from '../../../components/ds/Card.jsx';
import { Input } from '../../../components/ds/Input.jsx';
import { Button } from '../../../components/ds/Button.jsx';

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
    <Card>
      <form action={formAction}>
        {state.status === 'error' && <div className="error">{state.pesan}</div>}
        {state.status === 'sukses' && <div className="success">Jendela Absen tersimpan.</div>}

        <div style={{ marginBottom: 'var(--space-4)' }}>
          <Button type="button" tone="secondary" icon="map-pin" onClick={pakaiLokasiSaya} disabled={lokasiSaya.status === 'mencari'}>
            {lokasiSaya.status === 'mencari' ? 'Mengambil lokasi…' : 'Pakai lokasi saya sekarang'}
          </Button>
          {lokasiSaya.status === 'error' && <div className="error" style={{ marginTop: 'var(--space-2)' }}>{lokasiSaya.pesan}</div>}
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-end', marginBottom: 'var(--space-1)' }}>
          <Input
            id="tempelMaps"
            label="Atau tempel link Google Maps"
            value={tempelMaps}
            onChange={e => setTempelMaps(e.target.value)}
            placeholder="https://maps.app.goo.gl/... atau -0.9, 100.4"
            style={{ flex: 1 }}
          />
          <Button type="button" tone="secondary" onClick={ambilDariMaps} disabled={resolveMaps.status === 'mencari' || !tempelMaps.trim()}>
            {resolveMaps.status === 'mencari' ? 'Membaca…' : 'Ambil koordinat'}
          </Button>
        </div>
        {resolveMaps.status === 'error' && <div className="error" style={{ marginTop: 'var(--space-2)' }}>{resolveMaps.pesan}</div>}
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-caption)', marginTop: 'var(--space-1)', marginBottom: 'var(--space-4)' }}>
          Buka lokasi surau di Google Maps, ketuk "Bagikan", salin link-nya, lalu tempel di sini.
        </p>

        <Input
          id="latitude"
          name="latitude"
          label="Latitude"
          type="number"
          step="any"
          value={latitude}
          onChange={e => setLatitude(e.target.value)}
          required
          style={{ marginBottom: 'var(--space-4)' }}
        />

        <Input
          id="longitude"
          name="longitude"
          label="Longitude"
          type="number"
          step="any"
          value={longitude}
          onChange={e => setLongitude(e.target.value)}
          required
          style={{ marginBottom: 'var(--space-4)' }}
        />

        {bisaLihatPeta && (
          <p style={{ marginTop: `calc(var(--space-4) * -1)`, marginBottom: 'var(--space-4)' }}>
            <a href={`https://www.google.com/maps?q=${latitude},${longitude}`} target="_blank" rel="noreferrer">
              Lihat titik ini di peta ↗
            </a>
          </p>
        )}

        <Input
          id="radiusMeter"
          name="radiusMeter"
          label="Radius (meter)"
          type="number"
          step="any"
          min="1"
          defaultValue={jendelaAbsen?.radiusMeter ?? ''}
          required
          style={{ marginBottom: 'var(--space-4)' }}
        />

        <Input
          id="jamMulai"
          name="jamMulai"
          label="Jam kerja — mulai"
          type="time"
          defaultValue={jendelaAbsen?.jamMulai ?? ''}
          required
          style={{ marginBottom: 'var(--space-4)' }}
        />

        <Input
          id="jamSelesai"
          name="jamSelesai"
          label="Jam kerja — selesai"
          type="time"
          defaultValue={jendelaAbsen?.jamSelesai ?? ''}
          required
          style={{ marginBottom: 'var(--space-5)' }}
        />

        <Button type="submit" disabled={pending} fullWidth>{pending ? 'Menyimpan…' : 'Simpan Jendela Absen'}</Button>
      </form>
    </Card>
  );
}
