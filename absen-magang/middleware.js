import { NextResponse } from 'next/server';
import { verifikasiSessionToken, SESSION_COOKIE } from './lib/session.js';

// Semua route di bawah /dashboard butuh sesi Pengurus yang valid. Route
// publik (form Pendaftaran, check-in/check-out PIN, login) tidak disentuh.
export async function middleware(request) {
  const token = request.cookies.get(SESSION_COOKIE.name)?.value;
  const session = await verifikasiSessionToken(token);

  if (!session) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // /api/laporan juga dilindungi -- satu-satunya route API yang dipanggil
  // langsung dari dashboard Pengurus (form GET, bukan fetch), bukan dari
  // Peserta publik.
  matcher: ['/dashboard/:path*', '/api/laporan'],
};
