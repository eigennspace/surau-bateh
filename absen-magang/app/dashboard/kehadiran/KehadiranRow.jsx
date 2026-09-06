'use client';

import { useState, useTransition } from 'react';
import { setujuiKehadiranAction, tolakKehadiranAction, koreksiKehadiranAction } from './actions.js';

function toLocalInputValue(waktu) {
  if (!waktu) return '';
  const d = new Date(waktu);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
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
        <td colSpan={3}><span className={`status-badge ${keputusan}`}>{keputusan}</span></td>
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
