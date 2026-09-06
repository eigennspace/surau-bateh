// weekdayName — nama hari Indonesia lengkap dari tanggal polos `YYYY-MM-DD`
// (tipe `date` Sanity). Dipakai HANYA untuk preview daftar dokumen
// `oneOffEvent.ts` di Studio -- pengurus melihat "Kamis" langsung di daftar
// tanpa harus menghitung sendiri dari tanggalnya, konsisten dengan
// `recurringEvent.ts` yang preview-nya sudah menampilkan hari
// (`dayOfWeek`) apa adanya. Duplikat sengaja dari logika serupa di
// `site/src/lib/parseIsoDate.js`/`resolveSanityContent.js` (lihat
// komentar di `lib/youtubeUrl.ts` untuk alasan duplikasi lintas
// studio/site: dua paket npm terpisah tanpa modul bersama).
const DAY_NAMES_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})/

export function weekdayName(isoDate?: string): string | undefined {
  const match = ISO_DATE_RE.exec(isoDate || '')
  if (!match) return undefined
  const [, year, month, day] = match
  // `Date` LOKAL (bukan `new Date(isoDate)`) -- yang terakhir menafsirkan
  // tanggal polos sebagai UTC tengah malam, bisa mundur satu hari di zona
  // waktu di belakang UTC.
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  return DAY_NAMES_ID[date.getDay()]
}
