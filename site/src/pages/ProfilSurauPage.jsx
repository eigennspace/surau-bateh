import React from 'react';
import { Badge, Card, PhotoTile, SectionHeading, StatBlock, Timeline, VideoEmbed, useBreakpoint } from '../ds.js';

const pad = m => (m ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)');

/**
 * Profil Surau — Halaman Profil (lihat CONTEXT.md). Sengaja TIDAK memakai
 * `ProgramSection` seperti Profil Salik: tiap media berpasangan dengan teks
 * di sebelahnya (foto pembangunan bersanding dengan cerita pembangunannya,
 * foto gotong royong dengan kalimat tentang siapa yang mengerjakan, video
 * profil dengan judul/paragraf pengantarnya), sesuatu yang hilang kalau
 * keempatnya dicabut jadi grid dokumentasi seragam.
 *
 * Seluruh teks dan `alt`/`caption`/`meta`/`icon` foto dibaca dari
 * `site.profilSurau` (Sumber Data) sehingga bisa disunting pengurus. Yang
 * TETAP di sini hanyalah keputusan tata letak — `ratio` dan `position` foto,
 * jumlah kolom, warna seksi — supaya komposisi halaman tidak bisa rusak dari
 * berkas data.
 */
export default function ProfilSurauPage({ site }) {
  const mobile = useBreakpoint();
  const { hero, pengelolaan, silsilah, pengurus, video } = site.profilSurau;
  return (
    <div>
      <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr 1fr', gap: mobile ? 'var(--space-8)' : 'var(--space-16)', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', alignItems: 'flex-start' }}>
            <Badge tone="brand" icon="map-pin">{hero.badge}</Badge>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-extrabold)', lineHeight: 'var(--lh-snug)', fontSize: mobile ? 'var(--fs-h2)' : 'var(--fs-h1)', color: 'var(--text-strong)', textWrap: 'balance' }}>{hero.title}</h1>
            {hero.paragraphs.map((text, i) => (
              <p key={i} style={{ margin: 0, font: 'var(--text-body-default)', color: 'var(--text-muted)', maxWidth: 480, textWrap: 'pretty' }}>{text}</p>
            ))}
          </div>
          <PhotoTile src={hero.photo.src} alt={hero.photo.alt} ratio="4 / 5" position="center 45%"
            meta={hero.photo.meta} icon={hero.photo.icon} caption={hero.photo.caption} />
        </div>
      </section>
      {/* Seksi video profil (Sanity, lihat ADR 0012) -- tepat setelah hero,
        sebelum seksi pengelolaan. `video` bisa `null` (belum di-publish atau
        URL-nya tidak sah); tidak dirender sama sekali dalam kasus itu --
        bukan placeholder, bukan ruang kosong (lihat
        `.scratch/video-profil-surau/spec.md`). Tata letak dibuat SERAGAM
        dengan pola "foto berpasangan dengan teks" yang dipakai hero/
        pengelolaan (container-max, grid 2 kolom, teks + media sejajar) --
        bukan pola heading-di-atas-konten yang dipakai silsilah/pengurus.
        Video berada di kolom kanan seperti foto hero, supaya alurnya
        text-kiri/media-kanan konsisten dengan section tepat sebelumnya. */}
      {video ? (
        <section style={{ padding: pad(mobile), background: 'var(--sand-200)' }}>
          <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr 1fr', gap: mobile ? 'var(--space-8)' : 'var(--space-12)', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <h2 style={{ margin: 0, font: 'var(--text-h2)', color: 'var(--text-strong)', textWrap: 'balance' }}>{video.title}</h2>
              {video.description ? (
                <p style={{ margin: 0, font: 'var(--text-body-default)', color: 'var(--text-muted)', maxWidth: 460, textWrap: 'pretty' }}>{video.description}</p>
              ) : null}
            </div>
            <VideoEmbed embedUrl={video.embedUrl} thumbnailUrl={video.thumbnailUrl} title={video.title} />
          </div>
        </section>
      ) : null}
      <section style={{ background: 'var(--surface-dark)', padding: pad(mobile) }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr 1fr', gap: mobile ? 'var(--space-8)' : 'var(--space-12)', alignItems: 'center' }}>
          <PhotoTile src={pengelolaan.photo.src} alt={pengelolaan.photo.alt} ratio="4 / 3" position="center 55%"
            meta={pengelolaan.photo.meta} icon={pengelolaan.photo.icon} caption={pengelolaan.photo.caption} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <h2 style={{ margin: 0, font: 'var(--text-h2)', color: 'var(--sand-100)', textWrap: 'balance' }}>{pengelolaan.title}</h2>
            <p style={{ margin: 0, font: 'var(--text-body-default)', color: 'var(--slate-300)', maxWidth: 460, textWrap: 'pretty' }}>{pengelolaan.paragraph}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'var(--space-4)' }}>
              {site.stats.slice(0, 2).map(s => (
                <StatBlock key={s.label} tone="dark" icon={s.icon} value={s.value} label={s.label} />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
        <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto' }}>
          <SectionHeading overline="Silsilah" title="Ilmu Tauhid" />
          <Card style={{ marginTop: 'var(--space-8)', padding: mobile ? 'var(--space-5)' : 'var(--space-8)' }}>
            <Timeline variant="silsilah" items={site.ilmuTauhid} />
          </Card>
        </div>
      </section> */}
      {/* <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
        <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto' }}>
          <SectionHeading overline="Silsilah" title="Ilmu Fiqh" />
          <Card style={{ marginTop: 'var(--space-8)', padding: mobile ? 'var(--space-5)' : 'var(--space-8)' }}>
            <Timeline variant="silsilah" items={site.ilmuFiqh} />
          </Card>
        </div>
      </section> */}
      <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
        <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto' }}>
          <SectionHeading overline={silsilah.overline} title={silsilah.title} />
          <Card style={{ marginTop: 'var(--space-8)', padding: mobile ? 'var(--space-5)' : 'var(--space-8)' }}>
            <Timeline variant="silsilah" items={site.ilmuTasawuf} />
          </Card>
        </div>
      </section>
      <section style={{ padding: pad(mobile), background: 'var(--sand-200)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <SectionHeading align="center" overline={pengurus.overline} title={pengurus.title} />
          <PhotoTile src={pengurus.photo.src} alt={pengurus.photo.alt} ratio={mobile ? '4 / 3' : '16 / 7'} position="center 45%"
            style={{ marginTop: 'var(--space-8)' }} caption={pengurus.photo.caption} />
        </div>
      </section>
    </div>
  );
}
