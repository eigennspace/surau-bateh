import React from 'react';
import { Card, Icon, SectionHeading, useBreakpoint } from '../ds.js';

const pad = m =>
  m
    ? 'var(--space-12) var(--space-5)'
    : 'var(--gutter-section) var(--space-8)';

export default function ProgramsSection({ site }) {
  const mobile = useBreakpoint();

  return (
    <section
      style={{
        padding: pad(mobile),
        background: 'var(--sand-200)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
        }}
      >
        <SectionHeading
          align="center"
          overline="Program"
          title="Kegiatan rutin Surau Bateh Lori"
          description="Program yang berjalan sepanjang pekan, dikelola pengurus dan didukung infak jamaah."
        />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'var(--space-4)',
            marginTop: 'var(--space-8)',
          }}
        >
          {site.programs.map(p => (
            <Card
              key={p.title}
              interactive
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,

                // Mobile: 1 kolom
                // Desktop: maksimal 4 card per baris
                flex: mobile
                  ? '0 0 100%'
                  : '0 1 calc(25% - var(--space-4))',

                // Mencegah card terlalu besar/kecil
                maxWidth: mobile ? '100%' : '320px',
                minWidth: mobile ? '100%' : '220px',
              }}
            >
              <span
                style={{
                  width: 42,
                  height: 42,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--surface-brand-soft)',
                  color: 'var(--maroon-700)',
                }}
              >
                <Icon name={p.icon} size={20} />
              </span>

              <h3
                style={{
                  margin: 0,
                  font: 'var(--text-h4)',
                  fontWeight: 'var(--fw-bold)',
                  color: 'var(--text-strong)',
                }}
              >
                {p.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: 'var(--fs-body-sm)',
                  color: 'var(--text-muted)',
                  lineHeight: 'var(--lh-relaxed)',
                }}
              >
                {p.desc}
              </p>

              <span
                style={{
                  marginTop: 'auto',
                  paddingTop: 10,
                  fontSize: 'var(--fs-caption)',
                  color: 'var(--maroon-700)',
                  fontWeight: 'var(--fw-semibold)',
                }}
              >
                {p.meta}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}