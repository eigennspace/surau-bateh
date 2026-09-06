import {defineField} from 'sanity'
import {personFields} from './personFields'
import {galleryItemFields} from './galleryItemFields'

// programFields — field yang identik di keenam schema type Halaman Program
// (`khitanan`/`dauroh`/`tawajjuh`/`konseling`/`baktiSosial`/`silaturahmi`),
// diekstrak ke sini supaya tidak dobel-tulis, mengikuti pola `eventFields.ts`.
// Lihat ADR 0013, ADR 0014 (kenapa enam type terpisah, bukan satu type
// bersama), dan `.scratch/halaman-program-kontak-salik-via-sanity/spec.md`.
//
// `person` (kontak person program) sekarang jadi bagian dokumen program itu
// sendiri, MENGGANTIKAN objek `contact.<program>` lama yang di-key per-program
// di `sourceData.js` -- keputusan eksplisit ADR 0013 (satu program, satu
// dokumen, satu kontak).
//
// `gallery` -- array objek inline (bukan referensi ke dokumen `galleryItem`
// Beranda): tiap Halaman Program hanya menampilkan galerinya sendiri, jadi
// tidak ada manfaat berbagi dokumen lintas-halaman. TIDAK ada field `ratio`
// -- grid Halaman Program selalu kotak (1:1), dipaku di `ProgramSection.jsx`,
// konsisten dengan prinsip "kurasi field berisiko" yang dipakai
// `galleryItem.ratio`.
export function programFields() {
  return [
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
        'Boleh multi-paragraf (pisahkan dengan baris kosong). Markup **tebal**/*miring* didukung, sama seperti yang sudah biasa dipakai -- ini teks biasa, bukan rich text.',
      type: 'text',
      rows: 8,
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
      title: 'Galeri dokumentasi',
      description: 'Boleh dikosongkan -- beberapa program memang belum punya dokumentasi foto.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'programGalleryItem',
          fields: galleryItemFields(),
          preview: {select: {title: 'caption', subtitle: 'meta', media: 'image'}},
        },
      ],
    }),
  ]
}
