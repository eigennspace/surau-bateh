import {defineField} from 'sanity'

// eventFields — field yang identik antara `recurringEvent.ts` (kegiatan
// mingguan berulang) dan `oneOffEvent.ts` (kegiatan sekali-jalan bertanggal)
// -- keduanya beda hanya di field "kapan"-nya (`dayOfWeek` vs `date`),
// sisanya (label waktu bebas teks, judul, pembicara, tempat, kategori) sama
// persis. Diekstrak ke sini supaya tidak dobel-tulis (termasuk deskripsi
// `category` yang cukup panjang) di dua schema tersebut. Lihat ADR 0013 dan
// `.scratch/jadwal-pengumuman-via-sanity/spec.md`.
export function eventFields() {
  return [
    defineField({
      name: 'timeLabel',
      title: 'Label waktu',
      description: 'Kapan kegiatan berlangsung, teks bebas -- mis. "Ba\'da Maghrib", "09:00 WIB".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Judul kegiatan',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'speaker',
      title: 'Pengisi/pembicara',
      type: 'string',
    }),
    defineField({
      name: 'place',
      title: 'Tempat',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      description: 'Dipakai untuk memfilter jadwal tiap Halaman Program (Tawajjuh, Dauroh, Silat, dsb) -- samakan ejaan dengan kategori yang sudah ada bila kegiatan ini milik Halaman Program yang sudah ada, supaya tersaring dengan benar.',
      type: 'string',
    }),
  ]
}
