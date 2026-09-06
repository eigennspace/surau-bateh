import { SignJWT, jwtVerify } from 'jose';

const COOKIE_NAME = 'absen_pengurus_session';
const MAX_AGE_DETIK = 60 * 60 * 8; // 8 jam

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET belum diatur');
  return new TextEncoder().encode(secret);
}

export async function buatSessionToken(pengurus) {
  return new SignJWT({ sub: pengurus.id, username: pengurus.username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_DETIK}s`)
    .sign(secretKey());
}

export async function verifikasiSessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return { id: payload.sub, username: payload.username };
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = { name: COOKIE_NAME, maxAge: MAX_AGE_DETIK };
