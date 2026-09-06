'use server';

import { getPool } from '../../lib/db.js';
import { ajukanPendaftaran } from '../../lib/absen/index.js';

export async function submitPendaftaran(prevState, formData) {
  try {
    await ajukanPendaftaran(getPool(), {
      nama: formData.get('nama'),
      asalKampus: formData.get('asalKampus'),
      jurusan: formData.get('jurusan'),
      nim: formData.get('nim'),
      noWhatsapp: formData.get('noWhatsapp'),
      periodeMulai: formData.get('periodeMulai'),
      periodeSelesai: formData.get('periodeSelesai'),
    });
    return { status: 'sukses' };
  } catch (error) {
    return { status: 'error', pesan: error.message ?? 'Gagal mengirim Pendaftaran' };
  }
}
