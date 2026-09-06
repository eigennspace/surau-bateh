import { NextResponse } from 'next/server';
import { ekstrakKoordinat, hostDiizinkan } from '../../../lib/lokasi.js';

// Dipakai form Jendela Absen (dashboard, sudah dilindungi middleware) untuk
// menerima teks apa pun yang ditempel Pengurus: pasangan koordinat polos,
// link Google Maps panjang, atau link disingkat (maps.app.goo.gl) yang
// perlu di-follow redirect-nya dulu -- follow redirect dilakukan di server
// supaya tidak kena batasan CORS kalau dilakukan langsung dari browser.
export async function POST(request) {
  const { teks } = await request.json();
  if (!teks || typeof teks !== 'string') {
    return NextResponse.json({ error: 'Tempel link Google Maps atau koordinat "lat,lng"' }, { status: 400 });
  }

  const langsung = ekstrakKoordinat(teks);
  if (langsung) {
    return NextResponse.json(langsung);
  }

  const kemungkinanUrl = teks.trim();
  if (!/^https?:\/\//i.test(kemungkinanUrl)) {
    return NextResponse.json(
      { error: 'Tidak bisa membaca koordinat dari teks ini. Tempel link Google Maps atau koordinat "lat,lng".' },
      { status: 400 },
    );
  }
  if (!hostDiizinkan(kemungkinanUrl)) {
    return NextResponse.json(
      { error: 'Link harus dari google.com, goo.gl, atau maps.app.goo.gl' },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(kemungkinanUrl, { redirect: 'follow', signal: AbortSignal.timeout(5000) });
    const hasil = ekstrakKoordinat(res.url) ?? ekstrakKoordinat(decodeURIComponent(res.url));
    if (!hasil) {
      return NextResponse.json(
        { error: 'Link Google Maps ini tidak mengandung koordinat yang bisa dibaca otomatis. Coba salin koordinat manual dari aplikasi Maps.' },
        { status: 400 },
      );
    }
    return NextResponse.json(hasil);
  } catch {
    return NextResponse.json({ error: 'Gagal membuka link tersebut' }, { status: 400 });
  }
}
