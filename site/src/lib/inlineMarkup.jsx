import React from 'react';

/**
 * Mengurai `**tebal**` dan `*miring*` di dalam satu baris teks jadi node
 * React.
 *
 * Ini menggandakan `parseInline` yang ada di dalam
 * `design-system/components/core/SectionHeading.jsx`. Alasan aslinya sudah
 * gugur: berkas itu dulu bisa tertimpa `npm run sync-ds`, yang sekarang tidak
 * ada lagi (ADR 0009). Yang tetap berlaku adalah batas lapisannya — komponen
 * design system tidak mengimpor helper situs, dan sebaliknya. Markup yang
 * dipahami keduanya harus tetap sama, supaya pengurus tidak perlu tahu teks
 * mana yang dirender lewat jalur yang mana.
 */
export function parseInlineMarkup(text) {
  const tokens = String(text).split(/(\*\*.+?\*\*|\*.+?\*)/g).filter(Boolean);
  return tokens.map((token, i) => {
    if (token.startsWith('**') && token.endsWith('**')) return <strong key={i}>{token.slice(2, -2)}</strong>;
    if (token.startsWith('*') && token.endsWith('*')) return <em key={i}>{token.slice(1, -1)}</em>;
    return token;
  });
}
