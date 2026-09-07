'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { submitPendaftaran } from './actions.js';
import { GerbangShell } from '../../components/GerbangShell.jsx';
import { Input } from '../../components/ds/Input.jsx';
import { Button } from '../../components/ds/Button.jsx';
import { Card } from '../../components/ds/Card.jsx';

const initialState = { status: 'idle' };

export default function DaftarPage() {
  const [state, formAction, pending] = useActionState(submitPendaftaran, initialState);

  if (state.status === 'sukses') {
    return (
      <GerbangShell>
        <Card>
          <h1 style={{ marginBottom: 'var(--space-2)' }}>Pendaftaran terkirim</h1>
          <div className="success">
            Pendaftaran Anda berstatus <strong>menunggu</strong> persetujuan Pengurus. Anda akan diberi PIN
            secara manual oleh Pengurus setelah disetujui.
          </div>
        </Card>
        <div className="gerbang-shell__nav-silang">
          <Link href="/absen">Sudah Peserta? Check-in/out di sini</Link>
        </div>
      </GerbangShell>
    );
  }

  return (
    <GerbangShell>
      <Card>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>Pendaftaran Peserta PL</h1>
        <p style={{ margin: '0 0 var(--space-6)', color: 'var(--text-muted)' }}>
          Isi data berikut untuk mendaftar sebagai Peserta PL di Surau Bateh Lori.
        </p>

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {state.status === 'error' && (
            <div className="error">{state.pesan}</div>
          )}

          <Input label="Nama" name="nama" id="nama" required autoFocus />
          <Input label="Asal kampus/instansi" name="asalKampus" id="asalKampus" required />
          <Input label="Jurusan/prodi" name="jurusan" id="jurusan" required />
          <Input label="NIM" name="nim" id="nim" required />
          <Input label="Nomor WhatsApp" name="noWhatsapp" id="noWhatsapp" required />
          <Input label="Periode PL — mulai" name="periodeMulai" id="periodeMulai" type="date" required />
          <Input label="Periode PL — selesai" name="periodeSelesai" id="periodeSelesai" type="date" required />

          <Button type="submit" fullWidth disabled={pending}>
            {pending ? 'Mengirim…' : 'Kirim Pendaftaran'}
          </Button>
        </form>
      </Card>

      <div className="gerbang-shell__nav-silang">
        <Link href="/absen">Sudah Peserta? Check-in/out di sini</Link>
      </div>
    </GerbangShell>
  );
}
