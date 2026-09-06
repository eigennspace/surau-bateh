import {defineType} from 'sanity'
import {programFields} from './lib/programFields'

// khitanan — Halaman Program, singleton (`_id` sama persis dengan nama type,
// mengikuti pola `profilSurau`, didaftarkan lewat mekanisme singleton di
// `sanity.config.ts`). Lihat `programFields.ts` untuk field bersama, ADR 0013,
// dan ADR 0014.
export const khitanan = defineType({
  name: 'khitanan',
  title: 'Halaman Program — Khitanan',
  type: 'document',
  fields: programFields(),
  preview: {select: {title: 'title'}},
})
