import {defineType} from 'sanity'
import {programFields} from './lib/programFields'

// baktiSosial — Halaman Program, singleton (lihat catatan di `khitanan.ts`).
export const baktiSosial = defineType({
  name: 'baktiSosial',
  title: 'Halaman Program — Bakti Sosial',
  type: 'document',
  fields: programFields(),
  preview: {select: {title: 'title'}},
})
