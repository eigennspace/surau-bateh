'use client';

import { useEffect, useState } from 'react';

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

function LokasiModal({ status, onMinta, onTutup }) {
  if (status === 'memeriksa') return null;

  if (status === 'granted') {
    return (
      <div className="modal-overlay">
        <div className="modal-card">
          <h3>📍 Lokasi sudah aktif</h3>
          <p>Lokasi Anda akan dikirim saat check-in/check-out untuk memastikan Kehadiran tercatat dalam radius surau.</p>
          <button onClick={onTutup}>Lanjutkan</button>
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
          <button onClick={onMinta}>Coba lagi</button>{' '}
          <button className="secondary" onClick={onTutup}>Lanjutkan tanpa lokasi</button>
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
          <button onClick={onTutup}>Mengerti</button>
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
        <button onClick={onMinta}>Aktifkan Lokasi</button>{' '}
        <button className="secondary" onClick={onTutup}>Lanjutkan tanpa lokasi</button>
      </div>
    </div>
  );
}

export default function AbsenPage() {
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

  async function mintaLokasi() {
    const lokasi = await ambilLokasi();
    // getCurrentPosition sendiri sudah memicu dialog izin browser (kalau
    // status masih 'prompt') dan Permissions API mendeteksi perubahan
    // otomatis lewat onchange -- ini jaga-jaga kalau browser tidak
    // mendukung onchange, supaya modal tetap update.
    setStatusLokasi(lokasi ? 'granted' : 'denied');
    if (lokasi) setModalDitutup(false); // biar notif "sudah aktif" sempat tampil
  }

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

      {!modalDitutup && (
        <LokasiModal status={statusLokasi} onMinta={mintaLokasi} onTutup={() => setModalDitutup(true)} />
      )}

      <div className="card">
        {pesan && <div className={pesan.status === 'error' ? 'error' : 'success'}>{pesan.teks}</div>}

        <p>
          {statusLokasi === 'granted' ? (
            <span className="status-badge normal">📍 Lokasi aktif</span>
          ) : (
            <button type="button" className="secondary" onClick={() => setModalDitutup(false)}>
              📍 Lokasi belum aktif — ketuk untuk aktifkan
            </button>
          )}
        </p>

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
