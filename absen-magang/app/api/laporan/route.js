import { NextResponse } from 'next/server';
import { getPool } from '../../../lib/db.js';
import { generateLaporan } from '../../../lib/absen/index.js';
import { statusUntukError } from '../../../lib/absen/httpError.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pesertaId = searchParams.get('pesertaId');
  const tanggalMulai = searchParams.get('tanggalMulai');
  const tanggalSelesai = searchParams.get('tanggalSelesai');

  if (!pesertaId || !tanggalMulai || !tanggalSelesai) {
    return NextResponse.json({ error: 'pesertaId, tanggalMulai, dan tanggalSelesai wajib diisi' }, { status: 400 });
  }

  try {
    const pdf = await generateLaporan(getPool(), { pesertaId, tanggalMulai, tanggalSelesai });
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="laporan-${pesertaId}-${tanggalMulai}-${tanggalSelesai}.pdf"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message ?? 'Gagal membuat Laporan' }, { status: statusUntukError(error) });
  }
}
