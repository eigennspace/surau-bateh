// hhmm — utilitas kecil untuk jam dalam format string `HH:MM` (24 jam),
// dipakai bersama oleh `prayerTimeCalculator.js` (menerapkan ihtiyat) dan
// `deriveSiteData.js` (menerapkan offset iqamah). Bukan tempat logika
// domain apa pun -- murni konversi menit-dalam-hari ↔ string.

export function parseMinutesOfDay(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

export function formatMinutesOfDay(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function addMinutesToHHMM(hhmm, minutesToAdd) {
  return formatMinutesOfDay(parseMinutesOfDay(hhmm) + minutesToAdd);
}
