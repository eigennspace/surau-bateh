'use client';

import { useState, useTransition } from 'react';
import { setujuiKehadiranAction, tolakKehadiranAction, koreksiKehadiranAction } from './actions.js';

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
    return <div>{label}: <span className="status-badge ditinjau">lokasi tidak terkirim</span></div>;
  }
  const diLuarRadius = radiusMeter != null && jarakMeter > radiusMeter;
  return (
    <div>
      {label}:{' '}
      <a href={`https://www.google.com/maps?q=${lokasi.latitude},${lokasi.longitude}`} target="_blank" rel="noreferrer">
        peta
      </a>
      {jarakMeter != null && (
        <> — <span className={diLuarRadius ? 'status-badge ditinjau' : 'status-badge normal'}>{jarakMeter}m dari titik</span></>
      )}
    </div>
  );
}

export default function KehadiranRow({ kehadiran }) {
  const [keputusan, setKeputusan] = useState(null);
  const [koreksi, setKoreksi] = useState(false);
  const [jamMasuk, setJamMasuk] = useState(toLocalInputValue(kehadiran.jamMasuk));
  const [jamPulang, setJamPulang] = useState(toLocalInputValue(kehadiran.jamPulang));
  const [pending, startTransition] = useTransition();

  if (keputusan) {
    return (
      <tr>
        <td>{kehadiran.pesertaNama}</td>
        <td>{kehadiran.tanggal}</td>
        <td colSpan={4}><span className={`status-badge ${keputusan}`}>{keputusan}</span></td>
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
        <BarisLokasi
          label="Masuk"
          lokasi={kehadiran.lokasiMasuk}
          jarakMeter={kehadiran.jarakMasukMeter}
          radiusMeter={kehadiran.jendelaRadiusMeter}
        />
        <BarisLokasi
          label="Pulang"
          lokasi={kehadiran.lokasiPulang}
          jarakMeter={kehadiran.jarakPulangMeter}
          radiusMeter={kehadiran.jendelaRadiusMeter}
        />
      </td>
      <td>
        {koreksi ? (
          <button
            disabled={pending}
            onClick={() => startTransition(async () => {
              await koreksiKehadiranAction(kehadiran.id, { jamMasuk, jamPulang });
              setKeputusan('normal');
            })}
          >
            Simpan koreksi
          </button>
        ) : (
          <>
            <button
              disabled={pending}
              onClick={() => startTransition(async () => {
                await setujuiKehadiranAction(kehadiran.id);
                setKeputusan('normal');
              })}
            >
              Setujui
            </button>{' '}
            <button
              className="danger"
              disabled={pending}
              onClick={() => startTransition(async () => {
                await tolakKehadiranAction(kehadiran.id);
                setKeputusan('ditolak');
              })}
            >
              Tolak
            </button>{' '}
            <button className="secondary" disabled={pending} onClick={() => setKoreksi(true)}>
              Koreksi jam
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
