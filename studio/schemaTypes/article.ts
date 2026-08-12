import {defineField, defineType} from 'sanity'

// article — pengurus menulis dan mem-publish artikel lewat editor Portable
// Text (rich-text), menggantikan alur Markdown-file lama
// (`site/src/data/articles/*.md`). `slug` memakai tipe slug bawaan Sanity
// (auto-generate dari title, tetap bisa diedit manual) -- menggantikan
// derivasi dari nama file yang dipakai `deriveArticles.js`/`slugFromFilename`
// sebelumnya. Lihat ADR 0006 dan `.scratch/cms-migration-sanity/spec.md`.
export const article = defineType({
  name: 'article',
  title: 'Artikel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Penulis',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Tanggal',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Ringkasan',
      description: 'Ringkasan singkat yang tampil di kartu artikel (listing /artikel).',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: 'cover',
      title: 'Sampul',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'body',
      title: 'Isi',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'author', media: 'cover'},
  },
})
