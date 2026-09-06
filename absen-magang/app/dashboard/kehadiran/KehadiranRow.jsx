'use client';

import { useState, useTransition } from 'react';
import { setujuiKehadiranAction, tolakKehadiranAction, koreksiKehadiranAction } from './actions.js';
import { Card } from '../../../components/ds/Card.jsx';
import { Button } from '../../../components/ds/Button.jsx';
import { Badge } from '../../../components/ds/Badge.jsx';
import { Icon } from '../../../components/ds/Icon.jsx';

function toLocalInputValue(waktu) {
  if (!waktu) return '';
  const d = new Date(waktu);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// Satu baris lokasi (check-in atau check-out): jarak dari titik Jendela
// Absen + tautan peta, atau keterangan kalau Peserta tidak mengirim lokasi
// sama sekali (izin GPS ditolak browser) -- itu juga alasan sah kenapa
// sebuah Kehadiran ditandai ditinjau, bukan cuma "di luar radius".
function BarisLokasi({ label, lokasi, jarakMeter, radiusMeter }) {
  if (!lokasi) {
    return (
      <div className="entry-card__field">
        <span className="entry-card__label">{label}</span>
        <Badge tone="accent">lokasi tidak terkirim</Badge>
      </div>
    );
  }
  const diLuarRadius = radiusMeter != null && jarakMeter > radiusMeter;
  return (
    <div className="entry-card__field">
      <span className="entry-card__label">{label}</span>
      <span className="entry-card__value" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <a href={`https://www.google.com/maps?q=${lokasi.latitude},${lokasi.longitude}`} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Icon name="map-pin" size={14} /> peta
        </a>
        {jarakMeter != null && (
          <Badge tone={diLuarRadius ? 'accent' : 'active'}>{jarakMeter}m dari titik</Badge>
        )}
      </span>
    </div>
  );
}

// State + handler keputusan (Setujui/Tolak/Koreksi jam) satu Kehadiran --
// dipakai KehadiranTableRow dan KehadiranCard agar tidak ada duplikasi
// logika antara mode tabel (desktop) dan kartu (mobile), lihat spec.md
// ticket 04.
function useKeputusanKehadiran(kehadiran) {
  const [keputusan, setKeputusan] = useState(null);
  const [koreksi, setKoreksi] = useState(false);
  const [jamMasuk, setJamMasuk] = useState(toLocalInputValue(kehadiran.jamMasuk));
  const [jamPulang, setJamPulang] = useState(toLocalInputValue(kehadiran.jamPulang));
  const [pending, startTransition] = useTransition();

  function setujui() {
    startTransition(async () => {
      await setujuiKehadiranAction(kehadiran.id);
      setKeputusan('normal');
    });
  }

  function tolak() {
    startTransition(async () => {
      await tolakKehadiranAction(kehadiran.id);
      setKeputusan('ditolak');
    });
  }

  function simpanKoreksi() {
    startTransition(async () => {
      await koreksiKehadiranAction(kehadiran.id, { jamMasuk, jamPulang });
      setKeputusan('normal');
    });
  }

  return {
    keputusan, koreksi, setKoreksi, jamMasuk, setJamMasuk, jamPulang, setJamPulang,
    pending, setujui, tolak, simpanKoreksi,
  };
}

function AksiKehadiran({ state, fullWidth }) {
  const { koreksi, setKoreksi, pending, setujui, tolak, simpanKoreksi } = state;
  const wrapStyle = fullWidth ? { display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' } : { display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' };

  if (koreksi) {
    return (
      <div style={wrapStyle}>
        <Button tone="primary" size="sm" disabled={pending} onClick={simpanKoreksi} fullWidth={fullWidth}>
          Simpan koreksi
        </Button>
      </div>
    );
  }

  return (
    <div style={wrapStyle}>
      <Button tone="primary" size="sm" disabled={pending} onClick={setujui} fullWidth={fullWidth}>
        Setujui
      </Button>
      <Button tone="secondary" size="sm" disabled={pending} onClick={tolak} fullWidth={fullWidth}>
        Tolak
      </Button>
      <Button tone="ghost" size="sm" disabled={pending} onClick={() => setKoreksi(true)} fullWidth={fullWidth}>
        Koreksi jam
      </Button>
    </div>
  );
}

export function KehadiranTableRow({ kehadiran }) {
  const state = useKeputusanKehadiran(kehadiran);
  const { keputusan, koreksi, jamMasuk, setJamMasuk, jamPulang, setJamPulang } = state;

  if (keputusan) {
    return (
      <tr>
        <td>{kehadiran.pesertaNama}</td>
        <td>{kehadiran.tanggal}</td>
        <td colSpan={4}><Badge tone={keputusan === 'ditolak' ? 'neutral' : 'active'}>{keputusan}</Badge></td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{kehadiran.pesertaNama}</td>
      <td>{kehadiran.tanggal}</td>
      <td>
        {koreksi ? (
          <input type="datetime-local" value={jamMasuk} onChange={e => setJamMasuk(e.target.value)} style={{ marginBottom: 0 }} />
        ) : (
          kehadiran.jamMasuk ? new Date(kehadiran.jamMasuk).toLocaleString('id-ID') : '-'
        )}
      </td>
      <td>
        {koreksi ? (
          <input type="datetime-local" value={jamPulang} onChange={e => setJamPulang(e.target.value)} style={{ marginBottom: 0 }} />
        ) : (
          kehadiran.jamPulang ? new Date(kehadiran.jamPulang).toLocaleString('id-ID') : '-'
        )}
      </td>
      <td>
        <BarisLokasi label="Masuk" lokasi={kehadiran.lokasiMasuk} jarakMeter={kehadiran.jarakMasukMeter} radiusMeter={kehadiran.jendelaRadiusMeter} />
        <BarisLokasi label="Pulang" lokasi={kehadiran.lokasiPulang} jarakMeter={kehadiran.jarakPulangMeter} radiusMeter={kehadiran.jendelaRadiusMeter} />
      </td>
      <td>
        <AksiKehadiran state={state} />
      </td>
    </tr>
  );
}

export function KehadiranCard({ kehadiran }) {
  const state = useKeputusanKehadiran(kehadiran);
  const { keputusan, koreksi, jamMasuk, setJamMasuk, jamPulang, setJamPulang } = state;

  return (
    <Card>
      <h3 style={{ marginBottom: 'var(--space-1)' }}>{kehadiran.pesertaNama}</h3>
      <div className="entry-card__field">
        <span className="entry-card__label">Tanggal</span>
        <span className="entry-card__value">{kehadiran.tanggal}</span>
      </div>

      {keputusan ? (
        <div className="entry-card__field">
          <span className="entry-card__label">Status</span>
          <Badge tone={keputusan === 'ditolak' ? 'neutral' : 'active'}>{keputusan}</Badge>
        </div>
      ) : (
        <>
          <div className="entry-card__field">
            <span className="entry-card__label">Jam masuk</span>
            {koreksi ? (
              <input type="datetime-local" value={jamMasuk} onChange={e => setJamMasuk(e.target.value)} style={{ marginBottom: 0, width: 'auto' }} />
            ) : (
              <span className="entry-card__value">{kehadiran.jamMasuk ? new Date(kehadiran.jamMasuk).toLocaleString('id-ID') : '-'}</span>
            )}
          </div>
          <div className="entry-card__field">
            <span className="entry-card__label">Jam pulang</span>
            {koreksi ? (
              <input type="datetime-local" value={jamPulang} onChange={e => setJamPulang(e.target.value)} style={{ marginBottom: 0, width: 'auto' }} />
            ) : (
              <span className="entry-card__value">{kehadiran.jamPulang ? new Date(kehadiran.jamPulang).toLocaleString('id-ID') : '-'}</span>
            )}
          </div>
          <BarisLokasi label="Lokasi masuk" lokasi={kehadiran.lokasiMasuk} jarakMeter={kehadiran.jarakMasukMeter} radiusMeter={kehadiran.jendelaRadiusMeter} />
          <BarisLokasi label="Lokasi pulang" lokasi={kehadiran.lokasiPulang} jarakMeter={kehadiran.jarakPulangMeter} radiusMeter={kehadiran.jendelaRadiusMeter} />
          <AksiKehadiran state={state} fullWidth />
        </>
      )}
    </Card>
  );
}
