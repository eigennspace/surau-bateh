import React from 'react';
import { Badge, Card, EventItem, SectionHeading, Tag, Button, useBreakpoint } from '../ds.js';
import DonationCard from './DonationCard.jsx';

const pad = m => (m ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)');
const CATEGORIES = ['Semua', 'Kajian & Tawajjuh', 'Gotong Royong', 'Silat'];

export default function AgendaSection({ site, compact, onNavigate }) {
  const mobile = useBreakpoint();
  const [filter, setFilter] = React.useState('Semua');
  const list = site.events.filter(e => filter === 'Semua' || e.category === filter);

  return (
    <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: (compact || mobile) ? 'minmax(0,1fr)' : '1.4fr .8fr', gap: mobile ? 'var(--space-8)' : 'var(--space-12)', alignItems: 'start' }}>
        <div>
          <SectionHeading overline="Agenda" title="Kajian dan kegiatan pekan ini" />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: 'var(--space-6) 0' }}>
            {CATEGORIES.map(c => <Tag key={c} selected={filter === c} onClick={() => setFilter(c)}>{c}</Tag>)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {list.map(e => <EventItem key={e.title} {...e} onClick={() => {}} />)}
            {list.length === 0 ? <p style={{ color: 'var(--text-muted)', font: 'var(--text-body-default)' }}>Belum ada agenda pada kategori ini.</p> : null}
          </div>
        </div>
        {compact ? null : (
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <Card tone="sand">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                <span style={{ fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Pengumuman</span>
                {site.news?.length > 0 ? 
                
                (site.news.map(n => (
                  <a key={n.title} href="#" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Badge tone="neutral" style={{ alignSelf: 'flex-start', fontSize: 'var(--fs-overline)' }}>{n.tag}</Badge>
                    <span style={{ font: 'var(--text-label)', fontSize: 'var(--fs-body)', color: 'var(--text-strong)' }}>{n.title}</span>
                    <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-faint)' }}>{n.date}</span>
                  </a>
                ))) : (
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
              <DonationCard donation={site.donation} tone="dark" qrisSize={128} />
              <Button tone="accent" size="sm" fullWidth style={{ marginTop: 'var(--space-5)' }} icon="hand-coins"
                onClick={() => onNavigate && onNavigate('Infak')}>Ikut Berinfak</Button>
            </Card>
          </aside>
        )}
      </div>
    </section>
  );
}
