import {defineType} from 'sanity'
import {programFields} from './lib/programFields'

// silaturahmi — Halaman Program, singleton (lihat catatan di `khitanan.ts`).
export const silaturahmi = defineType({
  name: 'silaturahmi',
  title: 'Halaman Program — Silaturahmi & Kerjasama Lembaga',
  type: 'document',
  fields: programFields(),
  preview: {select: {title: 'title'}},
})
