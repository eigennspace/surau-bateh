import {defineType} from 'sanity'
import {programFields} from './lib/programFields'

// konseling — Halaman Program, singleton (lihat catatan di `khitanan.ts`).
export const konseling = defineType({
  name: 'konseling',
  title: 'Halaman Program — Konseling Psikoterapi Tasawuf',
  type: 'document',
  fields: programFields(),
  preview: {select: {title: 'title'}},
})
