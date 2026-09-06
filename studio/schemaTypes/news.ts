import {defineField, defineType} from 'sanity'

// news — pengumuman yang tampil di panel Agenda Beranda (tag, judul,
// tanggal, link opsional, deskripsi opsional). Menggantikan array `news` di
// `sourceData.js`. `date` memakai tipe date bawaan Sanity -- diformat ulang
// jadi string tanggal Indonesia ("8 Agustus 2026") saat resolve
// (`resolveNews`, `src/lib/resolveSanityContent.js`), bukan disimpan sebagai
// string bebas seperti data lama. Lihat ADR 0013 dan
// `.scratch/jadwal-pengumuman-via-sanity/spec.md`.
export const news = defineType({
  name: 'news',
  title: 'Pengumuman',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag',
      description: 'Label singkat di atas judul, mis. "Pengumuman", "Laporan", "Kegiatan".',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Tanggal',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      description: 'Opsional -- tautan yang dituju saat pengumuman diklik (mis. formulir pendataan).',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {title: 'title', tag: 'tag', date: 'date'},
    prepare: ({title, tag, date}) => ({
      title,
      subtitle: [tag, date].filter(Boolean).join(' · '),
    }),
  },
})
