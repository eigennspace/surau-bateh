'use client';

import { useActionState } from 'react';
import { simpanJendelaAbsen } from './actions.js';

const initialState = { status: 'idle' };

export default function JendelaAbsenForm({ jendelaAbsen }) {
  const [state, formAction, pending] = useActionState(simpanJendelaAbsen, initialState);

  return (
    <form action={formAction} className="card">
      {state.status === 'error' && <div className="error">{state.pesan}</div>}
      {state.status === 'sukses' && <div className="success">Jendela Absen tersimpan.</div>}

      <label htmlFor="latitude">Latitude</label>
      <input id="latitude" name="latitude" type="number" step="any" defaultValue={jendelaAbsen?.latitude ?? ''} required />

      <label htmlFor="longitude">Longitude</label>
      <input id="longitude" name="longitude" type="number" step="any" defaultValue={jendelaAbsen?.longitude ?? ''} required />

      <label htmlFor="radiusMeter">Radius (meter)</label>
      <input id="radiusMeter" name="radiusMeter" type="number" step="any" min="1" defaultValue={jendelaAbsen?.radiusMeter ?? ''} required />

      <label htmlFor="jamMulai">Jam kerja — mulai</label>
      <input id="jamMulai" name="jamMulai" type="time" defaultValue={jendelaAbsen?.jamMulai ?? ''} required />

      <label htmlFor="jamSelesai">Jam kerja — selesai</label>
      <input id="jamSelesai" name="jamSelesai" type="time" defaultValue={jendelaAbsen?.jamSelesai ?? ''} required />

      <button type="submit" disabled={pending}>{pending ? 'Menyimpan…' : 'Simpan Jendela Absen'}</button>
    </form>
  );
}
