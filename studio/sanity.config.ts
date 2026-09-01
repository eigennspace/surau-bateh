import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// `profilSurau` adalah singleton PERTAMA di Studio ini -- satu dokumen
// dengan `_id` tetap, bukan koleksi. Struktur kustom di bawah:
// 1. Menampilkannya sebagai satu entri yang langsung terbuka untuk diedit
//    (bukan daftar dokumen dengan tombol "buat baru"), dengan
//    `.documentId(SINGLETON_ID)` tetap.
// 2. Mengeluarkannya dari daftar tipe dokumen default supaya tidak muncul
//    dua kali di panel Studio.
// Ditambah `document.newDocumentOptions`/`document.actions` di bawah supaya
// pengurus tidak bisa membuat entri kedua lewat menu "Create new" global
// maupun menghapus/duplicate satu-satunya entri yang ada.
const SINGLETON_TYPE = 'profilSurau'
const SINGLETON_ID = 'profilSurau'

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
            S.listItem()
              .title('Profil Surau')
              .id(SINGLETON_TYPE)
              .child(S.document().schemaType(SINGLETON_TYPE).documentId(SINGLETON_ID)),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => item.getId() !== SINGLETON_TYPE),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Cegah membuat entri kedua `profilSurau` lewat menu "Create new" global
    // (di structure di atas, entri singleton sama sekali tidak lewat alur
    // create-new, jadi ini menutup jalur satunya lagi).
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter((item) => item.templateId !== SINGLETON_TYPE)
      }
      return prev
    },
    // Cegah duplicate/delete/unpublish pada dokumen singleton -- hanya satu
    // entri yang boleh ada, dan ia tidak boleh dihapus.
    actions: (prev, {schemaType}) => {
      if (schemaType === SINGLETON_TYPE) {
        return prev.filter(({action}) => !action || !['duplicate', 'delete', 'unpublish'].includes(action))
      }
      return prev
    },
  },
})
