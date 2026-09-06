// Baris database (snake_case, Date dari driver Postgres) <-> objek domain
// (camelCase) yang dipakai fungsi lib/absen dan lapisan UI.

// Kolom DATE (tanpa jam) dikembalikan `pg` sebagai objek Date (tengah
// malam waktu lokal), sedangkan PGlite -- dan test yang menulis literal
// '2026-01-01' -- sering mengembalikan/menerima string. Dinormalkan jadi
// string YYYY-MM-DD supaya konsisten di seluruh app dan aman dirender
// langsung sebagai children JSX (Date bukan children React yang valid).
function tanggalKeString(value) {
  if (!value || typeof value === 'string') return value;
  const d = value instanceof Date ? value : new Date(value);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function pesertaFromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    nama: row.nama,
    asalKampus: row.asal_kampus,
    jurusan: row.jurusan,
    nim: row.nim,
    noWhatsapp: row.no_whatsapp,
    periodeMulai: tanggalKeString(row.periode_mulai),
    periodeSelesai: tanggalKeString(row.periode_selesai),
    statusPendaftaran: row.status_pendaftaran,
    pin: row.pin,
  };
}

function lokasiOpsional(lat, lng) {
  return lat != null && lng != null ? { latitude: lat, longitude: lng } : null;
}

export function kehadiranFromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    pesertaId: row.peserta_id,
    tanggal: tanggalKeString(row.tanggal),
    jamMasuk: row.jam_masuk,
    jamPulang: row.jam_pulang,
    lokasiMasuk: lokasiOpsional(row.lokasi_masuk_lat, row.lokasi_masuk_lng),
    lokasiPulang: lokasiOpsional(row.lokasi_pulang_lat, row.lokasi_pulang_lng),
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
