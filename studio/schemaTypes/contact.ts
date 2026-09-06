import {defineField, defineType} from 'sanity'
import {personFields} from './lib/personFields'

// contact — kontak UMUM halaman `/kontak` (alamat, link Google Maps, daftar
// pengurus surau) -- singleton `_id: 'contact'`. Terpisah dari kontak person
// per-Halaman Program (field `person` di `khitanan`/`dauroh`/dst, lihat
// `lib/programFields.ts`): `pengurus` di sini adalah daftar pengurus umum
// yang tampil di halaman `/kontak` sendiri, bukan kontak satu program
// tertentu. Lihat ADR 0013 dan
// `.scratch/halaman-program-kontak-salik-via-sanity/issues/03-kontak-umum-via-sanity.md`.
export const contact = defineType({
  name: 'contact',
  title: 'Kontak Umum',
  type: 'document',
  fields: [
    defineField({
      name: 'address',
      title: 'Alamat',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mapsUrl',
      title: 'Link Google Maps',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pengurus',
      title: 'Daftar pengurus',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pengurusItem',
          fields: personFields(),
          preview: {select: {title: 'name', subtitle: 'role'}},
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {select: {title: 'address'}},
})
