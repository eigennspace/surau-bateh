'use client';

import { useActionState } from 'react';
import { submitPendaftaran } from './actions.js';

const initialState = { status: 'idle' };

export default function DaftarPage() {
  const [state, formAction, pending] = useActionState(submitPendaftaran, initialState);

  if (state.status === 'sukses') {
    return (
      <main className="container">
        <h1>Pendaftaran terkirim</h1>
        <div className="card success">
          Pendaftaran Anda berstatus <strong>menunggu</strong> persetujuan Pengurus. Anda akan diberi PIN
          secara manual oleh Pengurus setelah disetujui.
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>Pendaftaran Peserta Magang</h1>
      <form action={formAction} className="card">
        {state.status === 'error' && <div className="error">{state.pesan}</div>}

        <label htmlFor="nama">Nama</label>
        <input id="nama" name="nama" required />

        <label htmlFor="asalKampus">Asal kampus/instansi</label>
        <input id="asalKampus" name="asalKampus" required />

        <label htmlFor="jurusan">Jurusan/prodi</label>
        <input id="jurusan" name="jurusan" required />

        <label htmlFor="nim">NIM</label>
        <input id="nim" name="nim" required />

        <label htmlFor="noWhatsapp">Nomor WhatsApp</label>
        <input id="noWhatsapp" name="noWhatsapp" required />

        <label htmlFor="periodeMulai">Periode Magang — mulai</label>
        <input id="periodeMulai" name="periodeMulai" type="date" required />

        <label htmlFor="periodeSelesai">Periode Magang — selesai</label>
        <input id="periodeSelesai" name="periodeSelesai" type="date" required />

        <button type="submit" disabled={pending}>{pending ? 'Mengirim…' : 'Kirim Pendaftaran'}</button>
      </form>
    </main>
  );
}
