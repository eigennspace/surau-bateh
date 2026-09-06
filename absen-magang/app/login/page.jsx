'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { loginPengurus } from './actions.js';
import { GerbangShell } from '../../components/GerbangShell.jsx';
import { Input } from '../../components/ds/Input.jsx';
import { Button } from '../../components/ds/Button.jsx';
import { Card } from '../../components/ds/Card.jsx';

const initialState = { status: 'idle' };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginPengurus, initialState);

  return (
    <GerbangShell>
      <Card>
        <h1 style={{ marginBottom: 'var(--space-2)' }}>Login Pengurus</h1>
        <p style={{ margin: '0 0 var(--space-6)', color: 'var(--text-muted)' }}>
          Masuk untuk mengelola Pendaftaran, Jendela Absen, Kehadiran, dan Laporan.
        </p>

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {state.status === 'error' && (
            <div className="error">{state.pesan}</div>
          )}

          <Input label="Username" name="username" id="username" required autoFocus />
          <Input label="Password" name="password" id="password" type="password" required />

          <Button type="submit" fullWidth disabled={pending}>
            {pending ? 'Masuk…' : 'Masuk'}
          </Button>
        </form>
      </Card>

      <div className="gerbang-shell__nav-silang">
        <Link href="/absen">Peserta magang? Check-in/out di sini</Link>
      </div>
    </GerbangShell>
  );
}
