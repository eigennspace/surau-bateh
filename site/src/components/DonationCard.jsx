import React from 'react';
import { Badge, Icon } from '../ds.js';

/**
 * Bentuk donasi siap-render (QRIS + rekening, dengan bingkai kampanye
 * opsional) — menggantikan `DonationProgress` (collected/target/deadline)
 * yang tidak lagi dipakai di manapun di situs produksi.
 */
export default function DonationCard({ donation, tone = 'light', qrisSize = 180, mobile=false }) {
  if (!donation) return null;
  const dark = tone === 'dark';
  const strong = dark ? 'var(--sand-100)' : 'var(--text-strong)';
  const muted = dark ? 'rgba(253,251,246,.72)' : 'var(--text-muted)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {donation.campaign ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 'var(--space-4)',
          borderRadius: 'var(--radius-md)', background: dark ? 'rgba(253,251,246,.08)' : 'var(--surface-brand-soft)',
          border: '1px solid ' + (dark ? 'rgba(253,251,246,.18)' : 'var(--maroon-300)') }}>
          <Badge tone={dark ? 'accent' : 'brand'} icon="hand-coins" style={{ alignSelf: 'flex-start' }}>Kampanye Donasi</Badge>
          <span style={{ font: 'var(--text-h4)', fontWeight: 'var(--fw-bold)', color: strong }}>{donation.campaign.title}</span>
          <span style={{ fontSize: 'var(--fs-body-sm)', color: muted }}>{donation.campaign.description}</span>
        </div>
      ) : null}

      <div
  style={{
    display: 'flex',
    flexDirection: mobile ? 'column' : 'row',
    alignItems: 'center',
    gap: 'var(--space-6)',
    width: '100%',
  }}
>
  {/* QRIS */}
  <div
    style={{
      width: qrisSize,
      height: qrisSize,
      flex: '0 0 auto',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      background: dark ? 'var(--white)' : 'var(--sand-100)',
      border:
        '1px solid ' +
        (dark
          ? 'rgba(253,251,246,.18)'
          : 'var(--border-default)'),
    }}
  >
    <img
      src={donation.qris}
      alt="Kode QRIS Surau Bateh Lori"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      }}
    />
  </div>

  {/* Divider */}
  <div
    aria-hidden="true"
    style={{
      width: mobile ? '100%' : 1,
      height: mobile ? 1 : 120,
      flex: '0 0 auto',
      background: 'var(--border-default)',
    }}
  />

  {/* Bank information */}
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      minWidth: mobile ? 0 : 200,
      alignItems: mobile ? 'center' : 'flex-start',
      textAlign: mobile ? 'center' : 'left',
    }}
  >
    <span
      style={{
        fontSize: 'var(--fs-overline)',
        letterSpacing: 'var(--ls-overline)',
        textTransform: 'uppercase',
        color: muted,
      }}
    >
      Transfer Bank
    </span>

    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: mobile ? 'center' : 'flex-start',
        gap: 6,
        font: 'var(--text-label)',
        fontSize: 'var(--fs-body)',
        color: strong,
      }}
    >
      <Icon name="landmark" size={16} />
      {donation.bank.name}
    </span>

    <span
      style={{
        fontVariantNumeric: 'tabular-nums',
        fontSize: 'var(--fs-body-lg)',
        fontWeight: 'var(--fw-bold)',
        color: strong,
      }}
    >
      {donation.bank.account}
    </span>

    <span
      style={{
        fontSize: 'var(--fs-body-sm)',
        color: muted,
      }}
    >
      a.n. {donation.bank.holder}
    </span>
  </div>
</div>
    </div>
  );
}
