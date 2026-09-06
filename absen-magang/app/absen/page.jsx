'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GerbangShell } from '../../components/GerbangShell.jsx';
import { Input } from '../../components/ds/Input.jsx';
import { Button } from '../../components/ds/Button.jsx';
import { Badge } from '../../components/ds/Badge.jsx';
import { Card } from '../../components/ds/Card.jsx';

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

// Status izin lokasi browser: 'unsupported' (tidak punya geolocation sama
// sekali), 'prompt' (belum diputuskan atau tidak ada Permissions API buat
// tahu), 'granted', 'denied'. Dipakai LokasiModal untuk menuntun Peserta
// mengaktifkan lokasi sebelum check-in/check-out -- Kehadiran tanpa
// lokasi tetap tersimpan (lihat lib/absen/kehadiran.js) tapi otomatis
// ditandai ditinjau, jadi lebih baik dicegah sejak awal di sini.
function useStatusLokasi() {
  const [status, setStatus] = useState('memeriksa');

  useEffect(() => {
    let permissionStatus;

    async function periksa() {
      if (!navigator.geolocation) {
        setStatus('unsupported');
        return;
      }
      if (!navigator.permissions?.query) {
        // Safari lama dkk: tidak ada Permissions API, tidak bisa tahu
        // status tanpa memicu prompt -- anggap belum diputuskan.
        setStatus('prompt');
        return;
      }
      try {
        permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
        setStatus(permissionStatus.state);
        permissionStatus.onchange = () => setStatus(permissionStatus.state);
      } catch {
        setStatus('prompt');
      }
    }

    periksa();
    return () => {
      if (permissionStatus) permissionStatus.onchange = null;
    };
  }, []);

  return [status, setStatus];
}

// Overlay izin lokasi -- tetap komponen custom (bukan Dialog design system,
// lihat spec Out of Scope), hanya kelas CSS lama (.modal-overlay/.modal-card
// dari globals.css) yang dipakai sehingga tampilannya tidak berubah di
// dalam shell baru.
function LokasiModal({ status, onMinta, onTutup }) {
  if (status === 'memeriksa') return null;

  if (status === 'granted') {
    return (
      <div className="modal-overlay">
        <div className="modal-card">
          <h3>📍 Lokasi sudah aktif</h3>
          <p>Lokasi Anda akan dikirim saat check-in/check-out untuk memastikan Kehadiran tercatat dalam radius surau.</p>
          <Button onClick={onTutup}>Lanjutkan</Button>
        </div>
      </div>
    );
  }

  if (status === 'denied') {
    return (
      <div className="modal-overlay">
        <div className="modal-card">
          <h3>📍 Lokasi belum aktif</h3>
          <p>
            Akses lokasi ditolak. Anda tetap bisa check-in/check-out, tapi Kehadiran akan otomatis ditandai
            "ditinjau" tanpa lokasi. Aktifkan lewat pengaturan izin situs di browser Anda (ikon gembok/info di
            sebelah alamat), lalu coba lagi.
          </p>
          <div className="gerbang-shell__btn-row">
            <Button onClick={onMinta}>Coba lagi</Button>
            <Button tone="secondary" onClick={onTutup}>Lanjutkan tanpa lokasi</Button>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'unsupported') {
    return (
      <div className="modal-overlay">
        <div className="modal-card">
          <h3>📍 Lokasi tidak didukung</h3>
          <p>Browser ini tidak mendukung deteksi lokasi. Kehadiran tetap bisa dicatat, tapi otomatis ditandai "ditinjau".</p>
          <Button onClick={onTutup}>Mengerti</Button>
        </div>
      </div>
    );
  }

  // status === 'prompt'
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>📍 Aktifkan lokasi</h3>
        <p>Absen Magang butuh lokasi Anda untuk mengecek apakah check-in/check-out dilakukan di sekitar surau.</p>
        <div className="gerbang-shell__btn-row">
          <Button onClick={onMinta}>Aktifkan Lokasi</Button>
          <Button tone="secondary" onClick={onTutup}>Lanjutkan tanpa lokasi</Button>
        </div>
      </div>
    </div>
  );
}

export default function AbsenPage() {
  // Peserta memilih dulu mau Check-in atau Check-out ('checkin'/'checkout')
  // sebelum form field yang relevan muncul -- null berarti masih di layar
  // pilihan. Memisahkan form per tipe supaya Peserta check-in tidak
  // disodori field "catatan aktivitas" yang memang cuma relevan saat
  // check-out.
  const [tipe, setTipe] = useState(null);
  const [pin, setPin] = useState('');
  const [catatanAktivitas, setCatatanAktivitas] = useState('');
  const [pesan, setPesan] = useState(null);
  const [pending, setPending] = useState(false);
  const [statusLokasi, setStatusLokasi] = useStatusLokasi();
  // Modal ditutup manual oleh Peserta (baik setelah lihat "sudah aktif"
  // maupun memilih lanjut tanpa lokasi) -- terpisah dari statusLokasi
  // sendiri supaya status 'denied' yang ditutup tidak salah kelabel jadi
  // "aktif" di badge bawah.
  const [modalDitutup, setModalDitutup] = useState(false);

  function pilihTipe(tipeBaru) {
    setTipe(tipeBaru);
    setPesan(null);
    setPin('');
    setCatatanAktivitas('');
  }

  async function mintaLokasi() {
    const lokasi = await ambilLokasi();
    // getCurrentPosition sendiri sudah memicu dialog izin browser (kalau
    // status masih 'prompt') dan Permissions API mendeteksi perubahan
    // otomatis lewat onchange -- ini jaga-jaga kalau browser tidak
    // mendukung onchange, supaya modal tetap update.
    setStatusLokasi(lokasi ? 'granted' : 'denied');
    if (lokasi) setModalDitutup(false); // biar notif "sudah aktif" sempat tampil
  }

  async function submit() {
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
    <GerbangShell subjudul="Check-in / Check-out Peserta">
      {!modalDitutup && (
        <LokasiModal status={statusLokasi} onMinta={mintaLokasi} onTutup={() => setModalDitutup(true)} />
      )}

      <Card>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>Absen Peserta</h1>

        {pesan && <div className={pesan.status === 'error' ? 'error' : 'success'} style={{ marginBottom: 'var(--space-4)' }}>{pesan.teks}</div>}

        <div style={{ marginBottom: 'var(--space-4)' }}>
          {statusLokasi === 'granted' ? (
            <Badge tone="active" icon="map-pin">Lokasi aktif</Badge>
          ) : (
            <Button type="button" tone="secondary" size="sm" icon="map-pin" onClick={() => setModalDitutup(false)}>
              Lokasi belum aktif — ketuk untuk aktifkan
            </Button>
          )}
        </div>

        {tipe === null ? (
          // Layar pilihan: Peserta pilih dulu mau Check-in atau Check-out
          // sebelum melihat field yang relevan saja untuk tipe itu.
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <p style={{ margin: '0 0 var(--space-2)', color: 'var(--text-muted)' }}>
              Mau Check-in atau Check-out?
            </p>
            <Button size="lg" fullWidth onClick={() => pilihTipe('checkin')}>Check-in</Button>
            <Button tone="secondary" size="lg" fullWidth onClick={() => pilihTipe('checkout')}>Check-out</Button>
            <Link href="/daftar" className="gerbang-shell__ganti-pilihan">
              Belum punya PIN? Daftar di sini
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <button type="button" onClick={() => pilihTipe(null)} className="gerbang-shell__ganti-pilihan">
              ← Ganti pilihan ({tipe === 'checkin' ? 'Check-in' : 'Check-out'})
            </button>

            <Input
              label="PIN"
              id="pin"
              value={pin}
              onChange={e => setPin(e.target.value)}
              inputMode="numeric"
              maxLength={6}
              required
              autoFocus
            />

            {tipe === 'checkout' && (
              <Input
                as="textarea"
                label="Catatan aktivitas"
                id="catatanAktivitas"
                rows={3}
                value={catatanAktivitas}
                onChange={e => setCatatanAktivitas(e.target.value)}
              />
            )}

            <Button fullWidth disabled={pending || !pin} onClick={submit}>
              {tipe === 'checkin' ? 'Check-in' : 'Check-out'}
            </Button>
          </div>
        )}
      </Card>

      <div className="gerbang-shell__nav-silang">
        <Link href="/login">Pengurus? Masuk di sini</Link>
      </div>
    </GerbangShell>
  );
}
