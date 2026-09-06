import {defineType} from 'sanity'
import {programFields} from './lib/programFields'

// tawajjuh — Halaman Program, singleton (lihat catatan di `khitanan.ts`).
export const tawajjuh = defineType({
  name: 'tawajjuh',
  title: 'Halaman Program — Tawajjuh & Kajian Rutin Ihsan',
  type: 'document',
  fields: programFields(),
  preview: {select: {title: 'title'}},
})
