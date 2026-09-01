import {defineField, defineType} from 'sanity'
import {extractGoogleDriveFileId} from './lib/googleDriveUrl'

// profilSurau — singleton PERTAMA di Studio ini (lihat catatan struktur
// singleton di `sanity.config.ts`): satu dokumen dengan `_id` tetap
// (`profilSurau`), bukan koleksi. Cakupannya sengaja dibatasi pada seksi
// video Halaman Profil Surau -- sejarah, foto, dan silsilah TETAP di Sumber
// Data (`site/src/data/sourceData.js`). Nama dokumen mengikuti cabang data
// yang sudah ada di sana (`profilSurau`), bukan dinamai menurut isinya saat
// ini ("video profil"), supaya ia jadi pintu masuk wajar bila kelak sisa
// Halaman Profil Surau ikut pindah ke Sanity.
//
// Video di-host di Google Drive, BUKAN diunggah sebagai asset Sanity --
// lihat ADR 0011 (men-supersede ADR 0010, yang semula memilih YouTube dan
// menolak Drive) untuk alasan lengkap dan risiko kuota tayang harian yang
// diterima sadar lewat keputusan ini. Tidak ada field yang mengendalikan
// tata letak (rasio/lebar/warna): itu keputusan kode, konsisten dengan
// prinsip "kurasi field berisiko" yang dipakai `galleryItem.ts`.
export const profilSurau = defineType({
  name: 'profilSurau',
  title: 'Profil Surau',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul seksi video',
      description: 'Jadi sumber alt thumbnail, title iframe, dan aria-label tombol play -- tidak ada field aksesibilitas terpisah.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Paragraf pengantar',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'videoUrl',
      title: 'Link video Google Drive',
      description: 'Tempel link dari tombol Share Google Drive (pastikan aksesnya "Anyone with the link can view") -- bentuk /file/d/<id>/view dan open?id=<id> sama-sama diterima. Link folder tidak diterima -- harus menunjuk satu berkas video.',
      type: 'url',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true // pesan "wajib diisi" sudah ditangani Rule.required()
          return extractGoogleDriveFileId(value)
            ? true
            : 'Link ini bukan link berkas Google Drive yang sah. Yang diterima: drive.google.com/file/d/<id>/... atau drive.google.com/open?id=<id> -- link folder atau situs lain tidak diterima.'
        }),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'videoUrl'},
  },
})
