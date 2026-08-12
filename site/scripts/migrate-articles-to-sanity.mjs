#!/usr/bin/env node
// migrate-articles-to-sanity — skrip migrasi SATU KALI (dijalankan manual
// oleh maintainer, tidak masuk `npm run build`): membaca artikel Markdown
// existing (`src/data/articles/*.md`), konversi body -> Portable Text
// (`src/lib/markdownToPortableText.js`), upload gambar (cover + gambar
// inline body) ke asset pipeline Sanity, lalu tulis tiap artikel sebagai
// dokumen `article` ke dataset `production`. Lihat ADR 0006,
// .scratch/cms-migration-sanity/issues/04-artikel-via-sanity.md.
//
// Dijalankan dengan `--dry-run` dulu (default aman -- lihat `main()` di
// bawah) sebelum benar-benar menulis ke dataset produksi, sesuai catatan di
// spec.md. Tidak ditest otomatis (skrip sekali pakai, dibuang setelah
// dipakai) -- transformasi murninya (`markdownToPortableText`) yang ditest.
//
//   node scripts/migrate-articles-to-sanity.mjs --dry-run
//   node scripts/migrate-articles-to-sanity.mjs --write

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';
import { parseFrontmatter, slugFromFilename } from '../src/lib/deriveArticles.js';
import { markdownToPortableText } from '../src/lib/markdownToPortableText.js';
import { loadDotEnv } from './lib/loadDotEnv.mjs';
import { requireSanityWriteEnv } from './lib/sanityEnv.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');
const articlesDir = path.join(siteRoot, 'src', 'data', 'articles');
const publicDir = path.join(siteRoot, 'public');

loadDotEnv(path.join(siteRoot, '.env'));

const write = process.argv.includes('--write');
const dryRun = !write;

async function uploadLocalImage(client, publicRelativePath, cache) {
  if (cache.has(publicRelativePath)) return cache.get(publicRelativePath);
  const absPath = path.join(publicDir, publicRelativePath.replace(/^\/+/, ''));
  if (!existsSync(absPath)) {
    console.warn(`  ! gambar tidak ditemukan di ${path.relative(siteRoot, absPath)}, dilewati`);
    cache.set(publicRelativePath, null);
    return null;
  }
  if (dryRun) {
    console.log(`  [dry-run] akan upload ${path.relative(siteRoot, absPath)}`);
    cache.set(publicRelativePath, { _id: 'dry-run-asset-id' });
    return cache.get(publicRelativePath);
  }
  const asset = await client.assets.upload('image', readFileSync(absPath), {
    filename: path.basename(absPath),
  });
  cache.set(publicRelativePath, asset);
  return asset;
}

async function main() {
  const { projectId, dataset, token } = requireSanityWriteEnv('migrate-articles-to-sanity');
  const client = createClient({ projectId, dataset, token, apiVersion: '2026-01-01', useCdn: false });
  const files = readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  console.log(`migrate-articles-to-sanity: ${files.length} artikel ditemukan di ${path.relative(siteRoot, articlesDir)}${dryRun ? ' (DRY RUN -- tidak menulis apa pun)' : ' (MENULIS ke dataset produksi)'}`);

  const assetCache = new Map();

  for (const file of files) {
    const raw = readFileSync(path.join(articlesDir, file), 'utf8');
    const { data, content } = parseFrontmatter(raw);
    const slug = slugFromFilename(file);
    console.log(`- ${slug}: "${data.title}"`);

    let coverAsset = null;
    if (data.cover) {
      coverAsset = await uploadLocalImage(client, data.cover, assetCache);
    }

    const bodyPlaceholders = markdownToPortableText(content);
    const body = [];
    for (const block of bodyPlaceholders) {
      if (block._type !== 'image') { body.push(block); continue; }
      const asset = await uploadLocalImage(client, block.src, assetCache);
      if (!asset) continue;
      body.push({ _type: 'image', _key: block._key, alt: block.alt, asset: { _type: 'reference', _ref: asset._id } });
    }

    const doc = {
      _type: 'article',
      _id: `article-${slug}`,
      title: data.title,
      slug: { _type: 'slug', current: slug },
      author: data.author,
      date: data.date,
      excerpt: data.excerpt,
      ...(coverAsset ? { cover: { _type: 'image', asset: { _type: 'reference', _ref: coverAsset._id } } } : {}),
      body,
    };

    if (dryRun) {
      console.log(`  [dry-run] akan createOrReplace dokumen _id=${doc._id}, ${body.length} blok body`);
      continue;
    }
    const result = await client.createOrReplace(doc);
    console.log(`  ditulis: ${result._id}`);
  }

  console.log(dryRun
    ? '\nDry run selesai. Jalankan ulang dengan --write untuk benar-benar menulis ke dataset produksi.'
    : '\nMigrasi selesai.');
}

main().catch(err => {
  console.error('migrate-articles-to-sanity: gagal:', err);
  process.exit(1);
});
