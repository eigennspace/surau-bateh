import {defineField} from 'sanity'

// personFields — field kontak person (`name`/`role`/`phone`, ketiganya
// required) yang identik di `programFields.ts` (`person`), `contact.ts`
// (`pengurusItem`), dan `salik.ts` (`person`) -- diekstrak ke sini supaya
// tidak dobel-tulis tiga kali, mengikuti pola `eventFields.ts`.
export function personFields() {
  return [
    defineField({name: 'name', title: 'Nama', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'role', title: 'Peran', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'phone',
      title: 'Nomor telepon/WhatsApp',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ]
}
