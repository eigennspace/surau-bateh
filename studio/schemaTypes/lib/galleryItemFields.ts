import {defineField} from 'sanity'

// galleryItemFields — field satu entri galeri dokumentasi (`image`/`alt`/
// `caption`/`meta`) yang identik di `programFields.ts` (`programGalleryItem`)
// dan `salik.ts` (`salikGalleryItem`) -- diekstrak ke sini supaya tidak
// dobel-tulis, mengikuti pola `eventFields.ts`. Beda dari `galleryItem.ts`
// (dokumen Beranda): tidak ada `ratio`/`wide`/`order` -- lihat komentar di
// `programFields.ts` untuk alasannya.
export function galleryItemFields() {
  return [
    defineField({
      name: 'image',
      title: 'Foto',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'alt', title: 'Teks alternatif', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'caption', title: 'Caption', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'meta', title: 'Label kategori', type: 'string'}),
  ]
}
