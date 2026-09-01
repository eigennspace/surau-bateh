import {defineField, defineType} from 'sanity'
import {extractYoutubeVideoId} from './lib/youtubeUrl'

// profilSurau — singleton PERTAMA di Studio ini (lihat catatan struktur
// singleton di `sanity.config.ts`): satu dokumen dengan `_id` tetap
// (`profilSurau`), bukan koleksi. Cakupannya sengaja dibatasi pada seksi
// video Halaman Profil Surau -- sejarah, foto, dan silsilah TETAP di Sumber
// Data (`site/src/data/sourceData.js`). Nama dokumen mengikuti cabang data
// yang sudah ada di sana (`profilSurau`), bukan dinamai menurut isinya saat
// ini ("video profil"), supaya ia jadi pintu masuk wajar bila kelak sisa
// Halaman Profil Surau ikut pindah ke Sanity.
//
// Video di-host di YouTube, BUKAN diunggah sebagai asset Sanity dan BUKAN
// disematkan dari Google Drive -- lihat ADR 0010 untuk alasan aslinya dan
// ADR 0012 (men-supersede ADR 0011, percobaan singkat memakai Drive yang
// terbukti punya masalah sharing/403 dan kontrol pemutar yang menutupi
// video, tidak bisa diperbaiki karena iframe-nya lintas-origin). Tidak ada
// field yang mengendalikan tata letak (rasio/lebar/warna): itu keputusan
// kode, konsisten dengan prinsip "kurasi field berisiko" yang dipakai
// `galleryItem.ts`.
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
      title: 'Link video YouTube',
      description: 'Tempel link dari tombol Share YouTube -- bentuk watch?v=, youtu.be/, atau /embed/ semuanya diterima, dan ekor seperti penanda waktu/playlist tidak perlu dibersihkan. Link Shorts tidak diterima (orientasi videonya tidak cocok dengan bingkai seksi ini).',
      type: 'url',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true // pesan "wajib diisi" sudah ditangani Rule.required()
          return extractYoutubeVideoId(value)
            ? true
            : 'Link ini bukan link video YouTube yang sah. Yang diterima: watch?v=<id>, youtu.be/<id>, atau /embed/<id> -- link Shorts, channel, atau situs lain tidak diterima.'
        }),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'videoUrl'},
  },
})
