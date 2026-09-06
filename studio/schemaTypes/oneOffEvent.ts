import {defineField, defineType} from 'sanity'
import {eventFields} from './lib/eventFields'
import {weekdayName} from './lib/weekdayName'

// oneOffEvent — event sekali-jalan bertanggal (mis. "Daurah Aswaja" tanggal
// tertentu), berbeda dari kegiatan mingguan berulang (`recurringEvent.ts`).
// `date` memakai tipe date bawaan Sanity (date picker sungguhan) --
// menggantikan hack lama yang menaruh string tanggal ("13/08/26") ke field
// bernama `month`, yang membuat pengurus bisa salah isi dan Studio tidak
// bisa menampilkan input yang sesuai. Lihat ADR 0013 dan
// `.scratch/jadwal-pengumuman-via-sanity/spec.md`.
export const oneOffEvent = defineType({
  name: 'oneOffEvent',
  title: 'Kegiatan Sekali-Jalan',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Tanggal',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    ...eventFields(),
  ],
  preview: {
    select: {title: 'title', date: 'date', timeLabel: 'timeLabel'},
    // Hari (mis. "Kamis") ditampilkan di depan tanggal -- pengurus melihat
    // hari kegiatan langsung di daftar dokumen tanpa harus menghitungnya
    // sendiri dari tanggal, konsisten dengan preview `recurringEvent.ts`
    // yang sudah menampilkan hari (`dayOfWeek`) apa adanya.
    prepare: ({title, date, timeLabel}) => ({
      title,
      subtitle: [weekdayName(date), date, timeLabel].filter(Boolean).join(' · '),
    }),
  },
})
