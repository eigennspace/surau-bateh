import React from 'react';
import { Badge, Card, EventItem, SectionHeading, Tag, useBreakpoint } from '../ds.js';
import ContactCard from './ContactCard.jsx';

const pad = m => (m ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)');
const WEEKDAY_ORDER = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
const ALL_DAY = 'Semua Hari';

/**
 * Singkatan hari-dalam-minggu untuk keperluan filter, berlaku sama untuk
 * kegiatan mingguan (`day` sudah singkatan hari, mis. "Sel") maupun
 * kegiatan sekali-jalan bertanggal (`day` adalah angka tanggal-di-bulan,
 * mis. "13" -- singkatan harinya diturunkan dari `dayName`, nama hari
 * lengkap hasil `resolveEvents`, mis. "Kamis" -> "Kam"). Dengan begitu
 * filter tab tetap murni "Hari" (Sen/Sel/Rab/Kam/Jum/Sab/Min), bukan
 * tanggal, dan kegiatan sekali-jalan tetap ikut tersaring saat tab hari
 * yang cocok dipilih.
 */
function weekdayFilterKey(event) {
  return event.dayName ? event.dayName.slice(0, 3) : event.day;
}

function deriveDays(events) {
  const present = new Set(events.map(weekdayFilterKey).filter(Boolean));
  return [ALL_DAY, ...WEEKDAY_ORDER.filter(d => present.has(d))];
}

function NewsItem({ n }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={n.link}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        background: 'var(--surface-card)',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4)',
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        transform: hover ? 'translateY(-2px)' : 'none',
        transition: 'var(--transition-control)',
      }}
    >
      <Badge tone="neutral" style={{ alignSelf: 'flex-start', fontSize: 'var(--fs-overline)' }}>{n.tag}</Badge>
      <span style={{ font: 'var(--text-label)', fontSize: 'var(--fs-body)', color: 'var(--text-strong)' }}>{n.title}</span>
      {n.description ? (
        <p
          style={{
            margin: 0,
            font: 'var(--text-body-default)',
            fontSize: 'var(--fs-body-sm)',
            color: 'var(--text-muted)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {n.description}
        </p>
      ) : null}
      <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-faint)' }}>{n.date}</span>
    </a>
  );
}

export default function AgendaSection({ site, compact, onNavigate }) {
  const mobile = useBreakpoint();
  const [dayFilter, setDayFilter] = React.useState(ALL_DAY);
  const days = React.useMemo(() => deriveDays(site.events), [site.events]);
  const list = site.events.filter(e => dayFilter === ALL_DAY || weekdayFilterKey(e) === dayFilter);

  const emptyMessage = dayFilter === ALL_DAY
    ? 'Belum ada agenda.'
    : `Belum ada agenda di hari ${dayFilter}.`;

  return (
    <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: (compact || mobile) ? 'minmax(0,1fr)' : '1.4fr .8fr', gap: mobile ? 'var(--space-8)' : 'var(--space-12)', alignItems: 'start' }}>
        <div>
          <SectionHeading overline="Agenda" title="Kajian dan kegiatan pekan ini" />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: 'var(--space-6) 0' }}>
            {days.map(d => <Tag key={d} selected={dayFilter === d} onClick={() => setDayFilter(d)}>{d}</Tag>)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {list.map(e => <EventItem key={`${e.day}-${e.title}`} {...e} />)}
            {list.length === 0 ? <p style={{ color: 'var(--text-muted)', font: 'var(--text-body-default)' }}>{emptyMessage}</p> : null}
          </div>
        </div>
        {compact ? null : (
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <Card tone="sand">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                <span style={{ fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Pengumuman</span>
                {site.news?.length > 0 ? 
                
                (site.news.map(n => <NewsItem key={n.title} n={n} />)) : (
                  <div
                    style={{
                      padding: 'var(--space-4)',
                      textAlign: 'center',
                      color: 'var(--text-faint)',
                      fontSize: 'var(--fs-body)',
                    }}
                  >
                    Belum ada pengumuman.
                  </div>
                )}
              </div>
            </Card>
            <Card tone="dark">
              <ContactCard contact={site.contact} tone="dark" />
            </Card>
          </aside>
        )}
      </div>
    </section>
  );
}
