'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPool } from '../../lib/db.js';
import { verifikasiLoginPengurus } from '../../lib/absen/pengurus.js';
import { buatSessionToken, SESSION_COOKIE } from '../../lib/session.js';

export async function loginPengurus(prevState, formData) {
  const username = formData.get('username');
  const password = formData.get('password');

  const pengurus = await verifikasiLoginPengurus(getPool(), { username, password });
  if (!pengurus) {
    return { status: 'error', pesan: 'Username atau password salah' };
  }

  const token = await buatSessionToken(pengurus);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE.name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_COOKIE.maxAge,
  });

  redirect('/dashboard');
}

export async function logoutPengurus() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE.name);
  redirect('/login');
}
