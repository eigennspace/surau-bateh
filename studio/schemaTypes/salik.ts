import {defineField, defineType} from 'sanity'
import {personFields} from './lib/personFields'
import {galleryItemFields} from './lib/galleryItemFields'

// salik — Halaman Profil Salik (lihat istilah "Halaman Profil" di
// CONTEXT.md, bukan Halaman Program) -- singleton `_id: 'salik'`.
//
// `person` DITAMBAHKAN di sini di luar daftar field yang tersurat di tiket
// 04 (`title`/`narrative`/`bullets`/`closing`/`gallery`) -- `ProfilSalikPage`
// meminjam `ProgramSection` yang SELALU merender kartu kontak person (lihat
// `ProgramSection.jsx`), dan data lama menyediakannya lewat
// `SB_DATA.contact.salik`. Tiket cutover (05) menghapus SELURUH field
// `contact` dari `sourceData.js`, termasuk `.salik` -- tanpa field ini di
// sini, kartu kontak Profil Salik akan diam-diam kehilangan datanya begitu
// cutover berjalan. Bentuknya identik `person` di `lib/personFields.ts`
// (dipakai juga oleh `lib/programFields.ts` dan `contact.ts`).
export const salik = defineType({
  name: 'salik',
  title: 'Profil Salik',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'narrative',
      title: 'Narasi',
      description:
        'Boleh multi-paragraf (pisahkan dengan baris kosong). Markup **tebal**/*miring* didukung -- ini teks biasa, bukan rich text.',
      type: 'text',
      rows: 8,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bullets',
      title: 'Daftar karakter',
      description: 'Tiap item boleh pakai markup **tebal**.',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'closing',
      title: 'Paragraf penutup',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'person',
      title: 'Kontak person',
      type: 'object',
      fields: personFields(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galeri',
      description: 'Boleh dikosongkan.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'salikGalleryItem',
          fields: galleryItemFields(),
          preview: {select: {title: 'caption', subtitle: 'meta', media: 'image'}},
        },
      ],
    }),
  ],
  preview: {select: {title: 'title'}},
})
