// Jendela Absen: satu pengaturan global (lokasi + jam kerja) yang
// menentukan apakah sebuah Kehadiran dianggap `normal` atau `ditinjau`.
// Lihat absen/CONTEXT.md di root repo untuk definisi istilah.

import { jendelaAbsenFromRow } from './mappers.js';

const BUMI_RADIUS_METER = 6371000;

export async function getJendelaAbsen(db) {
  const { rows } = await db.query('SELECT * FROM jendela_absen WHERE id = $1', ['default']);
  return jendelaAbsenFromRow(rows[0]);
}

export async function setJendelaAbsen(db, { latitude, longitude, radiusMeter, jamMulai, jamSelesai }) {
  const { rows } = await db.query(
    `INSERT INTO jendela_absen (id, latitude, longitude, radius_meter, jam_mulai, jam_selesai)
     VALUES ('default', $1, $2, $3, $4, $5)
     ON CONFLICT (id) DO UPDATE SET
       latitude = EXCLUDED.latitude,
       longitude = EXCLUDED.longitude,
       radius_meter = EXCLUDED.radius_meter,
       jam_mulai = EXCLUDED.jam_mulai,
       jam_selesai = EXCLUDED.jam_selesai
     RETURNING *`,
    [latitude, longitude, radiusMeter, jamMulai, jamSelesai],
  );
  return jendelaAbsenFromRow(rows[0]);
}

// Jarak antara dua titik koordinat (formula haversine), dalam meter.
export function jarakMeter(a, b) {
  const toRad = deg => (deg * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLng = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return BUMI_RADIUS_METER * c;
}

function jamMenit(waktu) {
  return waktu.getHours() * 60 + waktu.getMinutes();
}

function jamStringKeMenit(jamString) {
  const [jam, menit] = jamString.split(':').map(Number);
  return jam * 60 + menit;
}

// Menilai satu event check-in/check-out terhadap Jendela Absen yang berlaku.
// Mengembalikan { dalamRadius, dalamJamKerja, sesuaiJendela }. Bila Jendela
// Absen belum diatur Pengurus, dianggap di luar batas (aman, konsisten
// dengan filosofi "tetap simpan, tandai ditinjau" -- bukan menolak).
export function evaluasiJendela({ latitude, longitude, waktu }, jendelaAbsen) {
  if (!jendelaAbsen) {
    return { dalamRadius: false, dalamJamKerja: false, sesuaiJendela: false };
  }

  const dalamRadius =
    latitude != null &&
    longitude != null &&
    jarakMeter({ latitude, longitude }, jendelaAbsen) <= jendelaAbsen.radiusMeter;

  const menit = jamMenit(waktu);
  const dalamJamKerja =
    menit >= jamStringKeMenit(jendelaAbsen.jamMulai) &&
    menit <= jamStringKeMenit(jendelaAbsen.jamSelesai);

  return { dalamRadius, dalamJamKerja, sesuaiJendela: dalamRadius && dalamJamKerja };
}
