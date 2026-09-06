'use client';

import { useActionState } from 'react';
import { loginPengurus } from './actions.js';

const initialState = { status: 'idle' };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginPengurus, initialState);

  return (
    <main className="container">
      <h1>Login Pengurus</h1>
      <form action={formAction} className="card">
        {state.status === 'error' && <div className="error">{state.pesan}</div>}

        <label htmlFor="username">Username</label>
        <input id="username" name="username" required autoFocus />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />

        <button type="submit" disabled={pending}>{pending ? 'Masuk…' : 'Masuk'}</button>
      </form>
    </main>
  );
}
