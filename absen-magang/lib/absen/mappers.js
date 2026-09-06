// Baris database (snake_case, Date dari driver Postgres) <-> objek domain
// (camelCase) yang dipakai fungsi lib/absen dan lapisan UI.

export function pesertaFromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    nama: row.nama,
    asalKampus: row.asal_kampus,
    jurusan: row.jurusan,
    nim: row.nim,
    noWhatsapp: row.no_whatsapp,
    periodeMulai: row.periode_mulai,
    periodeSelesai: row.periode_selesai,
    statusPendaftaran: row.status_pendaftaran,
    pin: row.pin,
  };
}

export function kehadiranFromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    pesertaId: row.peserta_id,
    tanggal: row.tanggal,
    jamMasuk: row.jam_masuk,
    jamPulang: row.jam_pulang,
    catatanAktivitas: row.catatan_aktivitas,
    status: row.status,
  };
}

export function jendelaAbsenFromRow(row) {
  if (!row) return null;
  return {
    latitude: row.latitude,
    longitude: row.longitude,
    radiusMeter: row.radius_meter,
    jamMulai: row.jam_mulai,
    jamSelesai: row.jam_selesai,
  };
}

export function pengurusFromRow(row) {
  if (!row) return null;
  return { id: row.id, username: row.username, passwordHash: row.password_hash };
}
