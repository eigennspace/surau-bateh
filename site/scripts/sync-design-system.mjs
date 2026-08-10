#!/usr/bin/env node
// Menyalin subset runtime dari `New Surau Bateh Lori Design System/` (folder
// terpisah di root repo, dipakai skill authoring/desain) ke
// `site/src/design-system/` (dipakai situs saat build).
//
// Situs TIDAK lagi mengimpor langsung dari folder design system (lihat ADR
// 0003) — jalankan skrip ini secara sengaja, sebagai `npm run sync-ds`, tiap
// kali desain sumber berubah dan situs perlu ditarik ke versi terbaru.
//
// Skrip ini hanya menyalin apa yang benar-benar dipakai situs saat runtime:
// komponen yang diekspor `src/ds.js` (plus dependensi internalnya), token
// CSS, `styles.css`, dan aset (foto/logo) yang diimpor kode situs. Berkas
// authoring (`*.prompt.md`, `*.d.ts`, `*.card.html`, `guidelines/`,
// `ui_kits/`, `uploads/`, dll) sengaja tidak disalin — itu tetap milik skill
// design system, bukan dependency situs.

import { cpSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(siteRoot, '..');
const dsRoot = path.join(repoRoot, 'New Surau Bateh Lori Design System');
const target = path.join(siteRoot, 'src', 'design-system');

// Komponen yang diekspor `src/ds.js`, plus dependensi internalnya
// (mis. PrayerTimeRow dipakai PrayerTimeTable tapi tidak diekspor sendiri).
const COMPONENT_FILES = [
  'core/Badge.jsx',
  'core/Button.jsx',
  'core/Card.jsx',
  'core/Icon.jsx',
  'core/SectionHeading.jsx',
  'core/Tag.jsx',
  'core/useBreakpoint.js',
  'feedback/Dialog.jsx',
  'feedback/Toast.jsx',
  'feedback/Tooltip.jsx',
  'forms/Checkbox.jsx',
  'forms/Input.jsx',
  'forms/RadioGroup.jsx',
  'forms/Select.jsx',
  'forms/Switch.jsx',
  'navigation/BottomBar.jsx',
  'navigation/Footer.jsx',
  'navigation/NavBar.jsx',
  'navigation/Tabs.jsx',
  'surau/ArabicVerse.jsx',
  'surau/EventItem.jsx',
  'surau/PhotoTile.jsx',
  'surau/PrayerTimeRow.jsx',
  'surau/PrayerTimeTable.jsx',
  'surau/StatBlock.jsx',
  'surau/Timeline.jsx',
];

const TOKEN_FILES = [
  'colors.css',
  'elevation.css',
  'fonts.css',
  'motion.css',
  'radii.css',
  'spacing.css',
  'typography.css',
];

// Foto & logo yang diimpor langsung oleh kode situs (Hero, App, sourceData,
// ProfilePage).
const ASSET_FILES = [
  'foto-surau.jpg',
  'qris-surau-lori.jpg',
  'logo-mark.png',
  'photos/interior-ruang-salat.png',
  'photos/majelis-jamaah.jpg',
  'photos/gotong-royong-halaman.jpg',
  'photos/latihan-silat.jpg',
  'photos/pengurus-surau.jpg',
  'photos/gotong-royong-jamaah.jpg',
  'photos/pembangunan-surau.jpg',
  'photos/gotong-royong-belakang.jpg',
];

function copyFile(relPath, subdir) {
  const from = path.join(dsRoot, subdir, relPath);
  const to = path.join(target, subdir, relPath);
  mkdirSync(path.dirname(to), { recursive: true });
  cpSync(from, to);
}

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });

for (const f of COMPONENT_FILES) copyFile(f, 'components');
for (const f of TOKEN_FILES) copyFile(f, 'tokens');
for (const f of ASSET_FILES) copyFile(f, 'assets');
cpSync(path.join(dsRoot, 'styles.css'), path.join(target, 'styles.css'));

console.log(`Disalin ${COMPONENT_FILES.length} komponen, ${TOKEN_FILES.length} token, ${ASSET_FILES.length} aset, dan styles.css ke ${path.relative(repoRoot, target)}/`);
