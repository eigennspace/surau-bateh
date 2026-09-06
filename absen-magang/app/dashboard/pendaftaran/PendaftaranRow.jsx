'use client';

import { useState, useTransition } from 'react';
import { setujuiPendaftaranAction, tolakPendaftaranAction } from './actions.js';

export default function PendaftaranRow({ peserta }) {
  const [keputusan, setKeputusan] = useState(null); // null | 'disetujui' | 'ditolak'
  const [pin, setPin] = useState(null);
  const [pending, startTransition] = useTransition();

  return (
    <tr>
      <td>
        {peserta.nama}
        {pin && (
          <div className="success" style={{ marginTop: 4 }}>
            PIN: <strong>{pin}</strong> — sampaikan ke Peserta secara manual
          </div>
        )}
      </td>
      <td>{peserta.asalKampus}</td>
      <td>{peserta.jurusan}</td>
      <td>{peserta.nim}</td>
      <td>{peserta.noWhatsapp}</td>
      <td>{peserta.periodeMulai} — {peserta.periodeSelesai}</td>
      <td>
        {keputusan ? (
          <span className={`status-badge ${keputusan}`}>{keputusan}</span>
        ) : (
          <>
            <button
              disabled={pending}
              onClick={() => startTransition(async () => {
                const hasil = await setujuiPendaftaranAction(peserta.id);
                setPin(hasil.pin);
                setKeputusan('disetujui');
              })}
            >
              Setujui
            </button>{' '}
            <button
              className="danger"
              disabled={pending}
              onClick={() => startTransition(async () => {
                await tolakPendaftaranAction(peserta.id);
                setKeputusan('ditolak');
              })}
            >
              Tolak
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
