import { NextResponse } from 'next/server';
import { getPool } from '../../../../lib/db.js';
import { catatKehadiran } from '../../../../lib/absen/index.js';
import { statusUntukError } from '../../../../lib/absen/httpError.js';

export async function POST(request) {
  const body = await request.json();
  try {
    const kehadiran = await catatKehadiran(getPool(), {
      pin: body.pin,
      tipe: 'checkout',
      waktu: new Date(),
      latitude: body.latitude,
      longitude: body.longitude,
      catatanAktivitas: body.catatanAktivitas,
    });
    return NextResponse.json({ kehadiran });
  } catch (error) {
    return NextResponse.json({ error: error.message ?? 'Gagal check-out' }, { status: statusUntukError(error) });
  }
}
