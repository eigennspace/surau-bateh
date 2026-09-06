// parseIsoDate — parsing tanggal polos `YYYY-MM-DD` (tipe `date` Sanity,
// tanpa jam/zona waktu) jadi `Date` LOKAL lewat regex, bukan
// `new Date(dateStr)` -- yang terakhir menafsirkan string semacam itu
// sebagai UTC tengah malam, yang bisa mundur satu hari saat ditampilkan di
// zona waktu di belakang UTC. Dipakai bersama oleh `deriveArticles.js`
// (label tanggal artikel) dan `resolveSanityContent.js` (label tanggal
// event/pengumuman) supaya logika parsing ini tidak dobel-tulis di modul
// yang berbeda.
const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})/;

/**
 * @param {string|undefined|null} dateStr
 * @returns {Date|null} `null` bila `dateStr` tidak berbentuk `YYYY-MM-DD`
 *   (di awal string, ekor seperti jam/zona diabaikan).
 */
export function parseIsoDate(dateStr) {
  const match = ISO_DATE_RE.exec(dateStr || '');
  if (!match) return null;
  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}
