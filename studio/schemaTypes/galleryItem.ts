import {defineField, defineType} from 'sanity'

// galleryItem — pengurus mengunggah foto baru ke galeri Beranda lewat
// Studio. Field yang bisa merusak tata letak grid (`ratio`, lebar kolom)
// DIKUNCI sebagai dropdown pilihan tetap, bukan bebas diisi -- konsisten
// dengan prinsip "kurasi field berisiko" di `spec.md`. Posisi fokus foto
// (dulu field `position`/object-position bebas teks) DIHAPUS dari schema
// sepenuhnya dan digantikan oleh hotspot bawaan Sanity pada field `image`
// (`options.hotspot`) -- pengurus mengatur titik fokus dengan menyeret
// lingkaran di Studio, bukan mengetik nilai CSS; frontend menghitung
// object-position dari `hotspot.x`/`hotspot.y` saat fetch build-time. Field
// editorial murni (`alt`, `caption`, `meta`) tetap bebas diedit tanpa
// batasan. Lihat ADR 0006 dan `.scratch/cms-migration-sanity/issues/05-galeri-via-sanity.md`.
export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Galeri',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Foto',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Teks alternatif',
      description: 'Deskripsi singkat foto untuk pembaca layar/SEO.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'meta',
      title: 'Label kategori',
      description: 'Label singkat di atas caption, mis. "Kajian Rutin", "Gotong Royong".',
      type: 'string',
    }),
    defineField({
      name: 'ratio',
      title: 'Rasio foto',
      description: 'Menentukan tinggi ubin galeri -- dikunci ke pilihan yang sudah teruji cocok dengan grid, bukan teks bebas.',
      type: 'string',
      options: {
        list: [
          {title: 'Lanskap (16:9)', value: '16 / 9'},
          {title: 'Potret (3:4)', value: '3 / 4'},
        ],
        layout: 'radio',
      },
      initialValue: '16 / 9',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'wide',
      title: 'Ubin lebar (2 kolom)?',
      description: 'Aktifkan untuk foto yang ingin ditampilkan melebar 2 kolom grid, bukan 1.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Urutan',
      description: 'Angka lebih kecil tampil lebih dulu di galeri. Kosongkan untuk urut berdasarkan tanggal unggah.',
      type: 'number',
    }),
  ],
  preview: {
    select: {title: 'caption', subtitle: 'meta', media: 'image'},
  },
})
