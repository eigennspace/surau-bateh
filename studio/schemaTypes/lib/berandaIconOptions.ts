import {defineField} from 'sanity'

// berandaIconOptions — daftar ikon terkurasi (`options.list` tertutup, bukan
// teks bebas) dipakai ulang oleh ketiga field icon di `beranda.ts`
// (`hero.highlights[].icon`, `programs[].icon`, `stats[].icon`) --
// mengikuti prinsip "kurasi field berisiko" yang sudah dipakai
// `galleryItem.ratio`, dan pola ekstraksi helper bersama `programFields.ts`/
// `eventFields.ts`. Seed awal disalin dari ikon yang sudah dipakai kode
// situs sekarang (`Hero.jsx`/`ProgramsSection.jsx`/`StatsSection.jsx` via
// `SB_DATA.programs`/`SB_DATA.stats`) -- daftar ini indikatif, boleh
// diperluas bila ada ikon lain yang relevan, selama tetap berupa
// `options.list` tertutup.
export const BERANDA_ICON_OPTIONS = [
  {title: 'Mic (kajian/ceramah)', value: 'mic'},
  {title: 'Swords (silat)', value: 'swords'},
  {title: 'Users (jamaah/komunitas)', value: 'users'},
  {title: 'Calendar days (jadwal/gotong royong)', value: 'calendar-days'},
  {title: 'Heart handshake (santunan/kepedulian)', value: 'heart-handshake'},
  {title: 'Map pin (lokasi)', value: 'map-pin'},
]

/** Field `icon` string dengan dropdown terkurasi di atas -- dipakai ulang di
 * tiga tempat berbeda di `beranda.ts` supaya daftarnya tidak dobel-tulis. */
export function berandaIconField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'string',
    options: {list: BERANDA_ICON_OPTIONS},
    validation: (Rule) => Rule.required(),
  })
}
