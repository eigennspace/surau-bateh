// Evaluasi Jendela Absen: satu pengaturan global (lokasi + jam kerja) yang
// menentukan apakah sebuah Kehadiran dianggap `normal` atau `ditinjau`.
// Lihat absen/CONTEXT.md di root repo untuk definisi istilah.

const BUMI_RADIUS_METER = 6371000;

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
