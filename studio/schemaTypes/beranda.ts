import {defineField, defineType} from 'sanity'
import {berandaIconField} from './lib/berandaIconOptions'

// beranda — singleton `_id: 'beranda'`, satu dokumen menampung tiga bagian
// Beranda (`/`) yang sebelumnya hand-edited: seksi Hero (sebagian besar
// hardcode di `Hero.jsx`, bukan cuma `sourceData.js`), Program Beranda
// (`SB_DATA.programs`, empat kartu "Kegiatan rutin" di `ProgramsSection.jsx`),
// dan Statistik Beranda (`SB_DATA.stats`, dipakai `StatsSection.jsx` dan
// sebagian oleh Hero). Satu dokumen dengan tiga `fieldset`, BUKAN tiga
// singleton terpisah -- lihat `.scratch/beranda-hero-program-stats-via-sanity/spec.md`.
//
// Judul surau ("Surau Bateh Lori") dan tujuan navigasi tombol CTA Hero
// TETAP dikunci di kode (`Hero.jsx`) -- bukan field editorial, risiko
// salah-arah/link mati. Field `icon` di ketiga bagian dikunci ke dropdown
// terkurasi (`berandaIconField`), bukan teks bebas -- prinsip "kurasi field
// berisiko" yang sudah dipakai `galleryItem.ratio`.
//
// `AgendaSection`/`ArticlesSection`/`GallerySection` di Beranda sudah baca
// dari Sanity sejak fase-fase sebelumnya -- di luar cakupan schema ini.
// `VerseSection` (kutipan ayat tetap) diputuskan tetap di kode, bukan
// bagian dari migrasi ini.
export const beranda = defineType({
  name: 'beranda',
  title: 'Beranda',
  type: 'document',
  fieldsets: [
    {name: 'hero', title: 'Hero', options: {collapsible: true}},
    {name: 'programs', title: 'Program Beranda', options: {collapsible: true}},
    {name: 'stats', title: 'Statistik Beranda', options: {collapsible: true}},
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fieldset: 'hero',
      fields: [
        defineField({
          name: 'locationBadge',
          title: 'Badge lokasi',
          description: 'Teks badge kecil di atas judul, mis. "Lori Lubuk Minturun, Kota Padang".',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline',
          description: 'Paragraf singkat di bawah judul "Surau Bateh Lori" (judulnya sendiri tetap hardcode). Markup **tebal**/*miring* didukung -- ini teks biasa, bukan rich text.',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ctaLabel',
          title: 'Label tombol CTA',
          description: 'Hanya teks tombolnya -- tujuan navigasi tombol ini tetap hardcode di kode, tidak bisa diubah lewat sini.',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Foto background',
          description: 'Atur titik fokus dengan menyeret lingkaran hotspot di Studio.',
          type: 'image',
          options: {hotspot: true},
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'highlights',
          title: 'Baris highlight',
          description: 'Boleh dikosongkan, ditambah, dihapus, atau diurutkan ulang -- urutan array = urutan tampil.',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'heroHighlight',
              fields: [
                berandaIconField('icon', 'Ikon'),
                defineField({
                  name: 'text',
                  title: 'Teks',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {select: {title: 'text', subtitle: 'icon'}},
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'programs',
      title: 'Kartu Program Beranda',
      description: 'Boleh dikosongkan -- urutan array = urutan tampil, drag-reorder bawaan Studio.',
      type: 'array',
      fieldset: 'programs',
      of: [
        {
          type: 'object',
          name: 'berandaProgram',
          fields: [
            berandaIconField('icon', 'Ikon'),
            defineField({name: 'title', title: 'Judul', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'desc', title: 'Deskripsi', type: 'text', rows: 2, validation: (Rule) => Rule.required()}),
            defineField({
              name: 'meta',
              title: 'Jadwal singkat',
              description: 'Mis. "Selasa, Kamis, Sabtu, Minggu · Ba\'da Maghrib".',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'meta'}},
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Item Statistik Beranda',
      description: 'Boleh dikosongkan -- urutan array = urutan tampil.',
      type: 'array',
      fieldset: 'stats',
      of: [
        {
          type: 'object',
          name: 'berandaStat',
          fields: [
            berandaIconField('icon', 'Ikon'),
            defineField({
              name: 'value',
              title: 'Nilai',
              description: 'Teks bebas, bukan angka -- ada nilai seperti "Tiap pekan".',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({
              name: 'showInHero',
              title: 'Tampil di Hero?',
              description: 'Tandai TEPAT SATU item sebagai baris angka jamaah di Hero -- menggantikan pencocokan teks label lama yang rapuh.',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        },
      ],
    }),
  ],
  // Singleton -- judul list-item selalu "Beranda" (bukan diambil dari satu
  // field tertentu, tidak seperti `contact.ts`/`salik.ts`), tapi tetap
  // dibangun lewat `select` (bukan `prepare()` tanpa `select`) supaya
  // subtitle-nya hidup, konsisten dengan pola preview singleton lain.
  preview: {
    select: {subtitle: 'hero.locationBadge'},
    prepare({subtitle}) {
      return {title: 'Beranda', subtitle}
    },
  },
})
