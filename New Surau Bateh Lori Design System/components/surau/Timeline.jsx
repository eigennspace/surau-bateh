import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Badge } from '../core/Badge.jsx';

// Geometri cabang. Cabang bukan mata rantai: ia menggantung dari tulang
// punggung mata rantai induknya lewat siku `↳`, tidak bernomor, dan selalu
// jadi blok tersendiri di bawah induknya (tidak pernah bersanding di kanan,
// termasuk di desktop) supaya batas antar nama tetap jelas.
const B_RUN = 20;      // panjang lengan mendatar siku
const B_DOT = 12;      // diameter titik cabang
const B_ELBOW_H = 10;  // tinggi siku — menaruh titik sejajar baris teks pertama
const B_COL = B_RUN + B_DOT;
const B_SPINE = B_RUN + B_DOT / 2 - 1; // x tulang punggung cabang (untuk anaknya)

/** Menempelkan daftar cabang ke tulang punggung induk: tepi kiri siku digeser
 *  balik ke garis vertikal induk, jadi siku benar-benar keluar dari garis itu. */
function branchListStyle(gap, spineFromTextEdge) {
  return {
    listStyle: 'none', padding: 0,
    margin: `var(--space-4) 0 0 calc(-1 * (${gap} + ${spineFromTextEdge}px))`,
    display: 'flex', flexDirection: 'column', gap: 'var(--space-4)'
  };
}

function Branch({ item, line }) {
  const branches = item.branches || [];
  return (
    <li style={{ display: 'grid', gridTemplateColumns: B_COL + 'px 1fr', columnGap: 'var(--space-3)' }}>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 0, top: 0, width: B_RUN, height: B_ELBOW_H,
          borderLeft: '2px solid ' + line, borderBottom: '2px solid ' + line, borderBottomLeftRadius: 8 }} />
        <span style={{ position: 'absolute', left: B_RUN, top: B_ELBOW_H - B_DOT / 2, width: B_DOT, height: B_DOT,
          borderRadius: 'var(--radius-pill)', background: line === 'var(--maroon-100)' ? 'var(--maroon-300)' : line }} />
        {branches.length ? (
          <span style={{ position: 'absolute', left: B_SPINE, top: B_ELBOW_H + B_DOT / 2, bottom: 0, width: 2, background: line }} />
        ) : null}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-snug)',
          fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{item.title}</span>
        {item.description ? <p style={{ margin: 0, fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', lineHeight: 'var(--lh-relaxed)', textWrap: 'pretty' }}>{item.description}</p> : null}
        {branches.length ? (
          <ul style={branchListStyle('var(--space-3)', B_COL - B_SPINE)}>
            {branches.map((b, i) => <Branch key={b.title + i} item={b} line={line} />)}
          </ul>
        ) : null}
      </div>
    </li>
  );
}

function Node({ item, last, silsilah }) {
  const done = item.status === 'selesai', now = item.status === 'berjalan';
  // Mata rantai silsilah dipenanda titik polos berukuran sama dengan titik
  // cabang — tidak bernomor. `order` di Sumber Data hanya menjaga urutan
  // penulisan, bukan sesuatu yang ditampilkan.
  const dotSize = silsilah ? B_DOT : 34;
  const dotBg = silsilah ? 'var(--maroon-300)' : done ? 'var(--status-active)' : now ? 'var(--surface-accent)' : 'var(--white)';
  const dotFg = now ? 'var(--slate-900)' : done ? 'var(--white)' : 'var(--text-faint)';
  const line = silsilah ? 'var(--maroon-100)' : 'var(--sand-400)';
  const branches = item.branches || [];
  return (
    <li style={{ display: 'grid', gridTemplateColumns: dotSize + 'px 1fr', columnGap: 'var(--space-4)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ width: dotSize, height: dotSize, flex: '0 0 auto',
          // Titik silsilah disejajarkan ke tengah baris pertama judul, bukan ke
          // atas blok — dihitung dari token supaya ikut kalau tipografi berubah.
          marginTop: silsilah ? `calc((var(--fs-h4) * var(--lh-snug) - ${B_DOT}px) / 2)` : 0,
          display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-pill)',
          background: dotBg, color: dotFg, border: '1px solid ' + (silsilah || done || now ? 'transparent' : 'var(--border-strong)') }}>
          {silsilah ? null : <Icon name={done ? 'check' : now ? 'hammer' : 'circle-dashed'} size={15} />}
        </span>
        {(!last || branches.length) ? <span style={{ flex: 1, width: 2, minHeight: 26, background: line }} /> : null}
      </div>
      <div style={{ paddingBottom: last && !branches.length ? 0 : 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-h4)',
            lineHeight: 'var(--lh-snug)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{item.title}</span>
          {item.period ? <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{item.period}</span> : null}
          {now ? <Badge tone="accent">Berjalan</Badge> : null}
        </div>
        {item.role ? <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--maroon-700)', fontWeight: 'var(--fw-semibold)' }}>{item.role}</span> : null}
        {item.description ? <p style={{ margin: 0, fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', lineHeight: 'var(--lh-relaxed)', textWrap: 'pretty' }}>{item.description}</p> : null}
        {branches.length ? (
          <ul style={branchListStyle('var(--space-4)', dotSize - (dotSize / 2 - 1))}>
            {branches.map((b, i) => <Branch key={b.title + i} item={b} line={line} />)}
          </ul>
        ) : null}
      </div>
    </li>
  );
}

/** variant: 'roadmap' = tahapan bertanggal & berstatus · 'silsilah' = mata rantai guru/pengurus.
 *  Item boleh punya `branches` — tokoh yang berguru pada mata rantai itu tetapi sanad tidak
 *  diteruskan lewatnya. Cabang tidak ikut penomoran sanad, dan boleh bersarang. */
export function Timeline({ items = [], variant = 'roadmap', style }) {
  const silsilah = variant === 'silsilah';
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-sans)', ...style }}>
      {items.map((it, i) => (
        <Node key={it.title + i} item={it} last={i === items.length - 1} silsilah={silsilah} />
      ))}
    </ol>
  );
}
