import React from 'react';

/** Ikon Lucide (CDN lucide-static) dirender lewat CSS mask agar mewarisi currentColor. */
export function Icon({ name, size = 18, strokeColor, style, title }) {
  const url = `url("https://cdn.jsdelivr.net/npm/lucide-static@0.469.0/icons/${name}.svg")`;
  return (
    <span role="img" aria-label={title || name} style={{ display: 'inline-block', width: size, height: size, flex: '0 0 auto',
      backgroundColor: strokeColor || 'currentColor', WebkitMaskImage: url, maskImage: url,
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskSize: 'contain', maskSize: 'contain',
      WebkitMaskPosition: 'center', maskPosition: 'center', ...style }} />
  );
}
