import React from 'react';
import { Badge, Button, Icon, useBreakpoint } from '../ds.js';
import { parseInlineMarkup } from '../lib/inlineMarkup.jsx';

export default function Hero({ site, onNavigate }) {
  const mobile = useBreakpoint();
  const hero = site.hero;
  // Angka jamaah rutin: dicari lewat `stats.find(s => s.showInHero)`
  // (field dari Studio, tiket 01) -- menggantikan pencocokan teks label
  // (`label.toLowerCase().includes('jamaah')`) yang rapuh, tidak tahan
  // bila pengurus mengubah kata-kata label.
  const jamaahRutin = site.stats.find(s => s.showInHero);
  const highlights = hero?.highlights || [];
  const backgroundImageUrl = hero?.backgroundImage?.url;
  const backgroundPosition = hero?.backgroundImage?.position || 'center 58%';
  return (
    <section style={{ position: 'relative', boxSizing: 'border-box',
      // 68px ≈ NavBar rendered height on large view (14px*2 padding + 38px logo + 1px border),
      // so hero + header together fill the viewport instead of stopping short of it.
      minHeight: mobile ? undefined : 'calc(100vh - 68px)',
      display: mobile ? undefined : 'flex', alignItems: mobile ? undefined : 'center',
      padding: mobile ? '48px var(--space-5) var(--space-12)' : '96px var(--space-8) var(--gutter-section)', overflow: 'hidden',
      backgroundImage: backgroundImageUrl
        ? `linear-gradient(100deg,rgba(34,38,44,.86) 0%,rgba(34,38,44,.68) 42%,rgba(34,38,44,.44) 72%,rgba(34,38,44,.52) 100%), url(${backgroundImageUrl})`
        : 'linear-gradient(100deg,rgba(34,38,44,.86) 0%,rgba(34,38,44,.68) 42%,rgba(34,38,44,.44) 72%,rgba(34,38,44,.52) 100%)',
      backgroundSize: 'cover', backgroundPosition }}>
      {/* Grid satu kolom: kolom kanan dulu berisi kartu jadwal shalat, yang
          sudah dihapus bersama fiturnya (ADR 0007). */}
      <div style={{ width: '100%', maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'flex-start' }}>
          {hero?.locationBadge ? (
            <Badge tone="brand" icon="map-pin" style={{ background: 'rgba(253,251,246,.92)', color: 'var(--maroon-700)' }}>{hero.locationBadge}</Badge>
          ) : null}
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-extrabold)', lineHeight: 'var(--lh-tight)', fontSize: mobile ? 'var(--fs-h1)' : 'var(--fs-display-1)', letterSpacing: 'var(--ls-display)', color: 'var(--sand-100)', textWrap: 'balance', textShadow: '0 2px 20px rgba(34,38,44,.35)' }}>
            Surau Bateh Lori
          </h1>
          {hero?.tagline ? (
            <p style={{ margin: 0, font: 'var(--text-body-default)', fontSize: 'var(--fs-body-lg)', color: 'rgba(253,251,246,.86)', maxWidth: 460, textWrap: 'pretty' }}>
              {parseInlineMarkup(hero.tagline)}
            </p>
          ) : null}
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', width: mobile ? '100%' : 'auto' }}>
            <Button tone="accent" size="lg" icon="calendar-days" fullWidth={mobile} onClick={() => onNavigate('Jadwal Kegiatan')}>{hero?.ctaLabel || 'Lihat Agenda'}</Button>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-5)', flexWrap: 'wrap', paddingTop: 'var(--space-4)', color: 'rgba(253,251,246,.72)', fontSize: 'var(--fs-body-sm)' }}>
            {jamaahRutin ? (
              <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Icon name="users" size={15} />{jamaahRutin.value} jamaah rutin</span>
            ) : null}
            {highlights.map((h, i) => (
              <span key={`${h.icon}-${i}`} style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Icon name={h.icon} size={15} />{h.text}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
