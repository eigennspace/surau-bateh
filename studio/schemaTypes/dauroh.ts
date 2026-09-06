import {defineType} from 'sanity'
import {programFields} from './lib/programFields'

// dauroh — Halaman Program, singleton (lihat catatan di `khitanan.ts`).
export const dauroh = defineType({
  name: 'dauroh',
  title: 'Halaman Program — Dauroh',
  type: 'document',
  fields: programFields(),
  preview: {select: {title: 'title'}},
})
