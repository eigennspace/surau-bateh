// Ekstraksi koordinat (latitude, longitude) dari teks yang ditempel
// Pengurus di form Jendela Absen: link Google Maps (panjang atau
// disingkat lewat maps.app.goo.gl) atau pasangan koordinat polos
// "lat,lng". Dipisah dari lib/absen/ karena ini murni parsing teks, tidak
// menyentuh db -- dipakai app/api/resolve-lokasi/route.js dan
// JendelaAbsenForm.jsx (lihat juga tombol "pakai lokasi saya sekarang"
// yang memakai navigator.geolocation browser, tidak lewat sini sama sekali).

const HOST_ALLOWLIST = new Set([
  'google.com',
  'www.google.com',
  'maps.google.com',
  'goo.gl',
  'maps.app.goo.gl',
  'g.co',
]);

// Dipakai server (route resolve-lokasi) sebelum fetch link yang ditempel
// Pengurus, supaya endpoint ini tidak jadi proxy fetch sembarang URL
// (SSRF) -- hanya domain Google Maps yang boleh.
export function hostDiizinkan(url) {
  try {
    return HOST_ALLOWLIST.has(new URL(url).hostname);
  } catch {
    return false;
  }
}

function koordinatValid(latStr, lngStr) {
  const latitude = Number(latStr);
  const longitude = Number(lngStr);
  if (Number.isNaN(latitude) || Number.isNaN(longitude)) return null;
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return null;
  return { latitude, longitude };
}

// Mencoba beberapa pola teks/URL Google Maps yang umum ditemui saat
// Pengurus copy-paste dari aplikasi Maps. Urutan penting: pasangan
// koordinat polos dicek dulu (paling presisi kalau memang itu yang
// ditempel), baru pola-pola di dalam URL dari yang paling umum.
export function ekstrakKoordinat(teks) {
  if (!teks) return null;
  const t = teks.trim();

  const polos = t.match(/^(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)$/);
  if (polos) return koordinatValid(polos[1], polos[2]);

  // https://www.google.com/maps/@-0.9,100.4,17z atau .../place/Nama/@-0.9,100.4,17z/...
  const pola3D = t.match(/@(-?\d{1,3}(?:\.\d+)?),(-?\d{1,3}(?:\.\d+)?)/);
  if (pola3D) return koordinatValid(pola3D[1], pola3D[2]);

  // Data pin spesifik di dalam URL "place": !3d{lat}!4d{lng}
  const polaPin = t.match(/!3d(-?\d{1,3}(?:\.\d+)?)!4d(-?\d{1,3}(?:\.\d+)?)/);
  if (polaPin) return koordinatValid(polaPin[1], polaPin[2]);

  // https://maps.google.com/?q=-0.9,100.4
  const polaQuery = t.match(/[?&]q=(-?\d{1,3}(?:\.\d+)?),(-?\d{1,3}(?:\.\d+)?)/);
  if (polaQuery) return koordinatValid(polaQuery[1], polaQuery[2]);

  return null;
}
