import React from 'react';
import { ArabicVerse, useBreakpoint } from '../ds.js';

export default function VerseSection() {
  const mobile = useBreakpoint();
  return (
    <section style={{ padding: mobile ? '0 var(--space-5)' : '0 var(--space-8)', background: 'var(--sand-200)' }}>
      <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto', paddingBottom: mobile ? 'var(--space-12)' : 'var(--gutter-section)' }}>
        <ArabicVerse tone="sand" style={{ background: 'var(--white)', border: '1px solid var(--border-hairline)', padding: mobile ? 'var(--space-8) var(--space-5)' : undefined }}
          arabic="إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ"
          translation="Hanyalah yang memakmurkan masjid Allah orang-orang yang beriman kepada Allah dan hari akhir."
          source="QS. At-Taubah: 18" />
      </div>
    </section>
  );
}
