import React from 'react';
export function DonationProgress({ title = 'Pembangunan Ruang Wudhu', collected = 0, target = 1, currency = 'Rp', deadline, style }) {
  const pct = Math.min(100, Math.round((collected / target) * 100));
  const fmt = n => currency + ' ' + n.toLocaleString('id-ID');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontFamily: 'var(--font-sans)', ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)', alignItems: 'baseline' }}>
        <span style={{ font: 'var(--text-h4)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{title}</span>
        <span style={{ font: 'var(--text-label)', color: 'var(--maroon-700)', fontVariantNumeric: 'tabular-nums' }}>{pct}%</span>
      </div>
      <div style={{ height: 10, borderRadius: 'var(--radius-pill)', background: 'var(--sand-300)', overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', borderRadius: 'var(--radius-pill)',
          background: 'linear-gradient(90deg,var(--maroon-700),var(--gold-500))', transition: 'width var(--dur-slow) var(--ease-standard)' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
        <span><strong style={{ color: 'var(--text-strong)' }}>{fmt(collected)}</strong> terkumpul</span>
        <span>Target {fmt(target)}{deadline ? ' · ' + deadline : ''}</span>
      </div>
    </div>
  );
}
