import React from 'react';
import { StatBlock, useBreakpoint } from '../ds.js';

export default function StatsSection({ site }) {
  const mobile = useBreakpoint();
  return (
    <section style={{ background: 'var(--surface-brand)', padding: mobile ? 'var(--space-8) var(--space-5)' : 'var(--space-12) var(--space-8)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : `repeat(${site.stats.length},1fr)`, gap: 'var(--space-4)' }}>
        {site.stats.map(s => (
          <StatBlock key={s.label} tone="dark" icon={s.icon} value={s.value} label={s.label} />
        ))}
      </div>
    </section>
  );
}
