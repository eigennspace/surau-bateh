import React from 'react';

/**
 * Mengurai `**tebal**` dan `*miring*` di dalam satu baris teks jadi node
 * React.
 *
 * Ini SENGAJA menggandakan `parseInline` yang ada di dalam
 * `design-system/components/core/SectionHeading.jsx`: berkas itu di-vendor
 * dari folder design system lewat `npm run sync-ds` (ADR 0003), jadi apa pun
 * yang diekspor dari sana akan hilang pada sync berikutnya. Markup yang
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
