import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Badge } from '../core/Badge.jsx';

function Node({ item, index, last, silsilah, depth }) {
  const done = item.status === 'selesai', now = item.status === 'berjalan';
  const dotSize = depth ? 26 : 34;
  const dotBg = silsilah ? (depth ? 'var(--maroon-100)' : 'var(--maroon-700)') : done ? 'var(--status-active)' : now ? 'var(--surface-accent)' : 'var(--white)';
  const dotFg = silsilah ? (depth ? 'var(--maroon-800)' : 'var(--gold-400)') : now ? 'var(--slate-900)' : done ? 'var(--white)' : 'var(--text-faint)';
  const line = silsilah ? 'var(--maroon-100)' : 'var(--sand-400)';
  const branches = item.branches || [];
  return (
    <li style={{ display: 'grid', gridTemplateColumns: dotSize + 'px 1fr', columnGap: 'var(--space-4)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ width: dotSize, height: dotSize, flex: '0 0 auto', display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-pill)',
          background: dotBg, color: dotFg, border: '1px solid ' + (silsilah || done || now ? 'transparent' : 'var(--border-strong)'),
          fontVariantNumeric: 'tabular-nums', fontSize: depth ? 'var(--fs-caption)' : 'var(--fs-body-sm)', fontWeight: 'var(--fw-bold)' }}>
          {silsilah ? (item.order ?? index + 1) : <Icon name={done ? 'check' : now ? 'hammer' : 'circle-dashed'} size={15} />}
        </span>
        {(!last || branches.length) ? <span style={{ flex: 1, width: 2, minHeight: 26, background: line }} /> : null}
      </div>
      <div style={{ paddingBottom: last && !branches.length ? 0 : 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: depth ? 'var(--fs-body)' : 'var(--fs-h4)',
            lineHeight: 'var(--lh-snug)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{item.title}</span>
          {item.period ? <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{item.period}</span> : null}
          {now ? <Badge tone="accent">Berjalan</Badge> : null}
        </div>
        {item.role ? <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--maroon-700)', fontWeight: 'var(--fw-semibold)' }}>{item.role}</span> : null}
        {item.description ? <p style={{ margin: 0, fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', lineHeight: 'var(--lh-relaxed)', textWrap: 'pretty' }}>{item.description}</p> : null}
        {branches.length ? (
          <ul style={{ listStyle: 'none', margin: 'var(--space-4) 0 0 10px', padding: 0, borderLeft: '2px solid ' + line,
            display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {branches.map((b, i) => (
              <li key={b.title + i} style={{ display: 'grid', gridTemplateColumns: '16px 1fr', columnGap: 'var(--space-2)', alignItems: 'start' }}>
                <span style={{ height: 2, marginTop: depth ? 12 : 13, background: line }} />
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  <Node item={b} index={i} last depth={depth + 1} silsilah={silsilah} />
                </ul>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}

/** variant: 'roadmap' = tahapan bertanggal & berstatus · 'silsilah' = mata rantai guru/pengurus. Item boleh punya `branches`. */
export function Timeline({ items = [], variant = 'roadmap', style }) {
  const silsilah = variant === 'silsilah';
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', ...style }}>
      {items.map((it, i) => (
        <Node key={it.title + i} item={it} index={i} last={i === items.length - 1} depth={0} silsilah={silsilah} />
      ))}
    </ol>
  );
}
