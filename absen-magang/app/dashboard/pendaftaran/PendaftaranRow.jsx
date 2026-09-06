'use client';

import { useState, useTransition } from 'react';
import { setujuiPendaftaranAction, tolakPendaftaranAction } from './actions.js';
import { Card } from '../../../components/ds/Card.jsx';
import { Button } from '../../../components/ds/Button.jsx';
import { Badge } from '../../../components/ds/Badge.jsx';

// State + handler keputusan (Setujui/Tolak) satu calon Peserta -- dipakai
// oleh PendaftaranTableRow dan PendaftaranCard sehingga logikanya tidak
// diduplikasi antara mode tabel (desktop) dan kartu (mobile), lihat
// spec.md ticket 03: "PendaftaranRow ... direstrukturisasi agar bisa
// dipakai kedua mode ini tanpa duplikasi logika".
function useKeputusanPendaftaran(peserta) {
  const [keputusan, setKeputusan] = useState(null); // null | 'disetujui' | 'ditolak'
  const [pin, setPin] = useState(null);
  const [pending, startTransition] = useTransition();

  function setujui() {
    startTransition(async () => {
      const hasil = await setujuiPendaftaranAction(peserta.id);
      setPin(hasil.pin);
      setKeputusan('disetujui');
    });
  }

  function tolak() {
    startTransition(async () => {
      await tolakPendaftaranAction(peserta.id);
      setKeputusan('ditolak');
    });
  }

  return { keputusan, pin, pending, setujui, tolak };
}

function AksiKeputusan({ keputusan, pending, setujui, tolak, fullWidth }) {
  if (keputusan) {
    return <Badge tone={keputusan === 'disetujui' ? 'active' : 'neutral'}>{keputusan}</Badge>;
  }
  return (
    <div className={fullWidth ? 'entry-card__actions' : undefined} style={fullWidth ? undefined : { display: 'flex', gap: 'var(--space-2)' }}>
      <Button tone="primary" size="sm" disabled={pending} onClick={setujui} fullWidth={fullWidth}>
        Setujui
      </Button>
      <Button tone="secondary" size="sm" disabled={pending} onClick={tolak} fullWidth={fullWidth}>
        Tolak
      </Button>
    </div>
  );
}

function PinReveal({ pin }) {
  if (!pin) return null;
  return (
    <div className="success" style={{ marginTop: 4 }}>
      PIN: <strong>{pin}</strong> — sampaikan ke Peserta secara manual
    </div>
  );
}

export function PendaftaranTableRow({ peserta }) {
  const { keputusan, pin, pending, setujui, tolak } = useKeputusanPendaftaran(peserta);

  return (
    <tr>
      <td>
        {peserta.nama}
        <PinReveal pin={pin} />
      </td>
      <td>{peserta.asalKampus}</td>
      <td>{peserta.jurusan}</td>
      <td>{peserta.nim}</td>
      <td>{peserta.noWhatsapp}</td>
      <td>{peserta.periodeMulai} — {peserta.periodeSelesai}</td>
      <td>
        <AksiKeputusan keputusan={keputusan} pending={pending} setujui={setujui} tolak={tolak} />
      </td>
    </tr>
  );
}

export function PendaftaranCard({ peserta }) {
  const { keputusan, pin, pending, setujui, tolak } = useKeputusanPendaftaran(peserta);

  return (
    <Card>
      <h3 style={{ marginBottom: 'var(--space-3)' }}>{peserta.nama}</h3>
      <div className="entry-card__field">
        <span className="entry-card__label">Asal kampus</span>
        <span className="entry-card__value">{peserta.asalKampus}</span>
      </div>
      <div className="entry-card__field">
        <span className="entry-card__label">Jurusan</span>
        <span className="entry-card__value">{peserta.jurusan}</span>
      </div>
      <div className="entry-card__field">
        <span className="entry-card__label">NIM</span>
        <span className="entry-card__value">{peserta.nim}</span>
      </div>
      <div className="entry-card__field">
        <span className="entry-card__label">WhatsApp</span>
        <span className="entry-card__value">{peserta.noWhatsapp}</span>
      </div>
      <div className="entry-card__field">
        <span className="entry-card__label">Periode Magang</span>
        <span className="entry-card__value">{peserta.periodeMulai} — {peserta.periodeSelesai}</span>
      </div>
      <PinReveal pin={pin} />
      <AksiKeputusan keputusan={keputusan} pending={pending} setujui={setujui} tolak={tolak} fullWidth />
    </Card>
  );
}
