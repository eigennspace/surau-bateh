import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Daftar dokumen singleton Studio -- tiap entri satu dokumen dengan `_id`
// TETAP, bukan koleksi:
// 1. Ditampilkan sebagai satu entri yang langsung terbuka untuk diedit
//    (bukan daftar dokumen dengan tombol "buat baru"), dengan
//    `.documentId(id)` tetap.
// 2. Dikeluarkan dari daftar tipe dokumen default supaya tidak muncul dua
//    kali di panel Studio.
// Ditambah `document.newDocumentOptions`/`document.actions` di bawah supaya
// pengurus tidak bisa membuat entri kedua lewat menu "Create new" global
// maupun menghapus/duplicate satu-satunya entri yang ada.
//
// Ini daftar/mapping, BUKAN sepasang konstanta tunggal seperti sebelumnya --
// menambah singleton baru cukup menambah satu entri di sini, tidak perlu
// menyentuh ulang struktur/filter di bawah (lihat
// `.scratch/halaman-program-kontak-salik-via-sanity/issues/01-generalisasi-mekanisme-singleton-studio.md`).
// `profilSurau` adalah singleton PERTAMA di Studio ini (sejarahnya ada di
// `schemaTypes/profilSurau.ts`), jadi entri pertama di daftar ini.
const SINGLETONS = [
  {type: 'profilSurau', id: 'profilSurau', title: 'Profil Surau'},
  {type: 'khitanan', id: 'khitanan', title: 'Halaman Program — Khitanan'},
  {type: 'dauroh', id: 'dauroh', title: 'Halaman Program — Dauroh'},
  {type: 'tawajjuh', id: 'tawajjuh', title: 'Halaman Program — Tawajjuh & Kajian Rutin Ihsan'},
  {type: 'konseling', id: 'konseling', title: 'Halaman Program — Konseling Psikoterapi Tasawuf'},
  {type: 'baktiSosial', id: 'baktiSosial', title: 'Halaman Program — Bakti Sosial'},
  {type: 'silaturahmi', id: 'silaturahmi', title: 'Halaman Program — Silaturahmi & Kerjasama Lembaga'},
  {type: 'contact', id: 'contact', title: 'Kontak Umum'},
  {type: 'salik', id: 'salik', title: 'Profil Salik'},
  {type: 'beranda', id: 'beranda', title: 'Beranda'},
]
const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.type))

export default defineConfig({
  name: 'default',
  title: 'Surau Bateh',

  projectId: 'w5hrk5sv',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Konten')
          .items([
            ...SINGLETONS.map(({type, id, title}) =>
              S.listItem()
                .title(title)
                .id(type)
                .child(S.document().schemaType(type).documentId(id)),
            ),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !SINGLETON_TYPES.has(item.getId() ?? '')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Cegah membuat entri kedua tiap singleton lewat menu "Create new"
    // global (di structure di atas, entri singleton sama sekali tidak lewat
    // alur create-new, jadi ini menutup jalur satunya lagi).
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter((item) => !SINGLETON_TYPES.has(item.templateId))
      }
      return prev
    },
    // Cegah duplicate/delete/unpublish pada dokumen singleton -- hanya satu
    // entri yang boleh ada untuk tiap tipe, dan ia tidak boleh dihapus.
    actions: (prev, {schemaType}) => {
      if (SINGLETON_TYPES.has(schemaType)) {
        return prev.filter(({action}) => !action || !['duplicate', 'delete', 'unpublish'].includes(action))
      }
      return prev
    },
  },
})
