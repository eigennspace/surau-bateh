import React from 'react';
import { ArabicVerse, useBreakpoint } from '../ds.js';

export default function VerseSection() {
  const mobile = useBreakpoint();
  return (
    <section style={{ padding: mobile ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)', background: 'var(--sand-200)' }}>
      <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto' }}>
        <ArabicVerse tone="sand" style={{ background: 'var(--white)', border: '1px solid var(--border-hairline)', padding: mobile ? 'var(--space-8) var(--space-5)' : undefined }}
          arabic="اَلَّذِيۡنَ اٰمَنُوۡا وَتَطۡمَٮِٕنُّ قُلُوۡبُهُمۡ بِذِكۡرِ اللّٰهِ​ ؕ اَلَا بِذِكۡرِ اللّٰهِ تَطۡمَٮِٕنُّ الۡقُلُوۡبُ"
          translation="(yaitu) orang-orang yang beriman dan hati mereka menjadi tenteram dengan mengingat Allah. Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram."
          source="QS. Ar-Ra'd ayat 28" />
      </div>
    </section>
  );
}
