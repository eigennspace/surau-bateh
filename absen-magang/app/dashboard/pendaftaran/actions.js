'use server';

import { getPool } from '../../../lib/db.js';
import { setujuiPendaftaran, tolakPendaftaran } from '../../../lib/absen/index.js';

// Sengaja tidak revalidatePath di sini: baris yang baru diputuskan tetap
// tampil di layar (dengan PIN, untuk approve) sampai Pengurus pindah/reload
// halaman -- lihat PendaftaranRow.jsx untuk state lokal setelah keputusan.

export async function setujuiPendaftaranAction(pesertaId) {
  const disetujui = await setujuiPendaftaran(getPool(), pesertaId);
  return { pin: disetujui.pin };
}

export async function tolakPendaftaranAction(pesertaId) {
  await tolakPendaftaran(getPool(), pesertaId);
}
