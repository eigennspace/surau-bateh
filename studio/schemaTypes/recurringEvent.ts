import {defineField, defineType} from 'sanity'
import {eventFields} from './lib/eventFields'

// recurringEvent — event kajian/tawajjuh yang berulang tiap minggu di hari
// yang sama (mis. Tawajjuh tiap Selasa malam). Menggantikan entri `events`
// lama di `sourceData.js` yang meng-overload field `day`/`month` untuk dua
// makna berbeda -- di sini `dayOfWeek` HANYA berarti hari-dalam-minggu
// (dikunci dropdown, bukan teks bebas, supaya tidak bisa diisi tanggal
// nyasar seperti hack lama), dan `timeLabel` menggantikan gabungan lama
// `month`+`time` jadi satu label waktu bebas teks (mis. "Ba'da Maghrib",
// "09:00 WIB") -- persis pola yang sudah ada di data lama, cuma field-nya
// dirapikan. Event sekali-jalan bertanggal (mis. Daurah Aswaja) punya
// schema terpisah, lihat `oneOffEvent.ts`. Lihat ADR 0013 dan
// `.scratch/jadwal-pengumuman-via-sanity/spec.md`.
export const recurringEvent = defineType({
  name: 'recurringEvent',
  title: 'Kegiatan Mingguan',
  type: 'document',
  fields: [
    defineField({
      name: 'dayOfWeek',
      title: 'Hari',
      description: 'Hari kegiatan berulang tiap minggu.',
      type: 'string',
      options: {
        list: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    ...eventFields(),
  ],
  preview: {
    select: {title: 'title', dayOfWeek: 'dayOfWeek', timeLabel: 'timeLabel'},
    prepare: ({title, dayOfWeek, timeLabel}) => ({
      title,
      subtitle: [dayOfWeek, timeLabel].filter(Boolean).join(' · '),
    }),
  },
})
