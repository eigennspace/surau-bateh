'use server';

import { revalidatePath } from 'next/cache';
import { getPool } from '../../../lib/db.js';
import { setJendelaAbsen } from '../../../lib/absen/index.js';

export async function simpanJendelaAbsen(prevState, formData) {
  try {
    await setJendelaAbsen(getPool(), {
      latitude: Number(formData.get('latitude')),
      longitude: Number(formData.get('longitude')),
      radiusMeter: Number(formData.get('radiusMeter')),
      jamMulai: formData.get('jamMulai'),
      jamSelesai: formData.get('jamSelesai'),
    });
    revalidatePath('/dashboard/jendela-absen');
    return { status: 'sukses' };
  } catch (error) {
    return { status: 'error', pesan: error.message ?? 'Gagal menyimpan Jendela Absen' };
  }
}
