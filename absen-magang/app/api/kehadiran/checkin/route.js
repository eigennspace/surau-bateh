import { NextResponse } from 'next/server';
import { getPool } from '../../../../lib/db.js';
import { catatKehadiran, AbsenError } from '../../../../lib/absen/index.js';

export async function POST(request) {
  const body = await request.json();
  try {
    const kehadiran = await catatKehadiran(getPool(), {
      pin: body.pin,
      tipe: 'checkin',
      waktu: new Date(),
      latitude: body.latitude,
      longitude: body.longitude,
    });
    return NextResponse.json({ kehadiran });
  } catch (error) {
    const status = error instanceof AbsenError ? 400 : 500;
    return NextResponse.json({ error: error.message ?? 'Gagal check-in' }, { status });
  }
}
