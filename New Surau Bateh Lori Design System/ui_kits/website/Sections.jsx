const NS = window.SurauBatehLoriDesignSystem_c76578;
window.useKitBreakpoint = NS.useBreakpoint || function (query = '(max-width: 860px)') {
  const [m, setM] = React.useState(() => window.matchMedia(query).matches);
  React.useEffect(() => { const mm = window.matchMedia(query); const h = e => setM(e.matches); setM(mm.matches); mm.addEventListener('change', h); return () => mm.removeEventListener('change', h); }, [query]);
  return m;
};
const useKit = window.useKitBreakpoint;
const pad = m => (m ? 'var(--space-12) var(--space-5)' : 'var(--gutter-section) var(--space-8)');
const { Card, SectionHeading, Badge, Button, Icon, Tag, EventItem, StatBlock, DonationProgress, ArabicVerse, Tabs } = NS;
// Fail-soft: komponen baru mungkin belum ada di bundel yang termuat.
const Timeline = NS.Timeline || function TimelineFallback({ items = [] }) {
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {items.map(it => (
        <li key={it.title} style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 'var(--space-5)', borderLeft: '2px solid var(--sand-400)' }}>
          <span style={{ font: 'var(--text-h4)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{it.title}</span>
          {it.period ? <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>{it.period}</span> : null}
          {it.description ? <span style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>{it.description}</span> : null}
        </li>
      ))}
    </ol>
  );
};
// Fail-soft: kit tetap tampil meski bundel belum memuat PhotoTile.
const PhotoTile = NS.PhotoTile || function PhotoTileFallback({ src, alt = '', caption, meta, icon, ratio = '4 / 3', position = 'center', style }) {
  return (
    <figure style={{ margin: 0, position: 'relative', aspectRatio: ratio, borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', ...style }}>
      <img src={src} alt={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: position }} />
      {(caption || meta) ? (
        <figcaption style={{ position: 'absolute', inset: 'auto 0 0 0', padding: '38px var(--space-5) var(--space-5)', background: 'var(--overlay-scrim)', color: 'var(--sand-100)', fontFamily: 'var(--font-sans)' }}>
          {meta ? <span style={{ display: 'block', fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: 5 }}>{meta}</span> : null}
          {caption ? <span style={{ display: 'block', font: 'var(--text-label)', fontSize: 'var(--fs-body)' }}>{caption}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
};

function ProgramsSection() {
  const mobile = useKit();
  return (
    <section style={{ padding: pad(mobile), background: 'var(--sand-200)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading align="center" overline="Program" title="Kegiatan rutin Surau Bateh Lori"
          description="Empat program yang berjalan sepanjang pekan, dikelola pengurus dan didukung infak jamaah." />
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : 'repeat(4,1fr)', gap: 'var(--space-4)', marginTop: 'var(--space-8)' }}>
          {window.SB_DATA.programs.map(p => (
            <Card key={p.title} interactive style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ width: 42, height: 42, display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-md)', background: 'var(--surface-brand-soft)', color: 'var(--maroon-700)' }}>
                <Icon name={p.icon} size={20} />
              </span>
              <h3 style={{ margin: 0, font: 'var(--text-h4)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{p.title}</h3>
              <p style={{ margin: 0, fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', lineHeight: 'var(--lh-relaxed)' }}>{p.desc}</p>
              <span style={{ marginTop: 'auto', paddingTop: 10, fontSize: 'var(--fs-caption)', color: 'var(--maroon-700)', fontWeight: 'var(--fw-semibold)' }}>{p.meta}</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function VerseSection() {
  const mobile = useKit();
  return (
    <section style={{ padding: mobile ? '0 var(--space-5)' : '0 var(--space-8)', background: 'var(--sand-200)' }}>
      <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto', paddingBottom: mobile ? 'var(--space-12)' : 'var(--gutter-section)' }}>
        <ArabicVerse tone="sand" style={{ background: 'var(--white)', border: '1px solid var(--border-hairline)', padding: mobile ? 'var(--space-8) var(--space-5)' : undefined }}
          arabic="إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ"
          translation="Hanyalah yang memakmurkan masjid Allah orang-orang yang beriman kepada Allah dan hari akhir."
          source="QS. At-Taubah: 18" />
      </div>
    </section>
  );
}

function AgendaSection({ compact }) {
  const mobile = useKit();
  const [filter, setFilter] = React.useState('Semua');
  const cats = ['Semua', 'Kajian Rutin', 'Tahsin', 'Silat', 'Jumat'];
  const list = window.SB_DATA.events.filter(e => filter === 'Semua' || e.category === filter);
  return (
    <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: (compact || mobile) ? 'minmax(0,1fr)' : '1.4fr .8fr', gap: mobile ? 'var(--space-8)' : 'var(--space-12)', alignItems: 'start' }}>
        <div>
          <SectionHeading overline="Agenda" title="Kajian dan kegiatan pekan ini" />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: 'var(--space-6) 0' }}>
            {cats.map(c => <Tag key={c} selected={filter === c} onClick={() => setFilter(c)}>{c}</Tag>)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {list.map(e => <EventItem key={e.title} {...e} onClick={() => {}} />)}
            {list.length === 0 ? <p style={{ color: 'var(--text-muted)', font: 'var(--text-body-default)' }}>Belum ada agenda pada kategori ini.</p> : null}
          </div>
        </div>
        {(compact) ? null : (
          <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <Card tone="sand">
              <span style={{ fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Pengumuman</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                {window.SB_DATA.news.map(n => (
                  <a key={n.title} href="#" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Badge tone="neutral" style={{ alignSelf: 'flex-start', fontSize: 'var(--fs-overline)' }}>{n.tag}</Badge>
                    <span style={{ font: 'var(--text-label)', fontSize: 'var(--fs-body)', color: 'var(--text-strong)' }}>{n.title}</span>
                    <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-faint)' }}>{n.date}</span>
                  </a>
                ))}
              </div>
            </Card>
            <Card tone="dark">
              <DonationProgress title="Renovasi Atap Surau" collected={38500000} target={75000000} deadline="hingga 30 Sep"
                style={{ color: 'var(--text-on-dark)' }} />
              <Button tone="accent" size="sm" fullWidth style={{ marginTop: 'var(--space-5)' }} icon="hand-coins">Ikut Berinfak</Button>
            </Card>
          </aside>
        )}
      </div>
    </section>
  );
}

function StatsSection() {
  const mobile = useKit();
  return (
    <section style={{ background: 'var(--surface-brand)', padding: mobile ? 'var(--space-8) var(--space-5)' : 'var(--space-12) var(--space-8)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : 'repeat(3,1fr)', gap: 'var(--space-4)' }}>
        <StatBlock tone="dark" icon="users" value="180" label="Jamaah rutin Subuh" />
        <StatBlock tone="dark" icon="mic" value="8" label="Kajian per bulan" />
        <StatBlock tone="dark" icon="calendar-days" value="Tiap pekan" label="Gotong royong halaman" />
      </div>
    </section>
  );
}

function GallerySection() {
  const P = '../../assets/photos/';
  const mobile = useKit();
  return (
    <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <SectionHeading overline="Dokumentasi" title="Suasana surau" description="Foto-foto kegiatan yang direkam pengurus surau." />
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2,minmax(0,1fr))' : 'repeat(4,1fr)', gridAutoRows: 'auto', gap: 'var(--space-3)', marginTop: 'var(--space-8)' }}>
          <PhotoTile src={P + 'interior-ruang-salat.png'} alt="Ruang salat surau" ratio="16 / 9" style={{ gridColumn: 'span 2' }}
            meta="Ruang Utama" icon="map-pin" caption="Karpet ruang salat selepas Dzuhur." />
          <PhotoTile src={P + 'majelis-jamaah.jpg'} alt="Majelis jamaah" ratio="16 / 9" style={{ gridColumn: 'span 2' }}
            meta="Kajian Rutin" icon="mic" caption="Majelis ba'da Isya, jamaah putra dan putri." />
          <PhotoTile src={P + 'gotong-royong-halaman.jpg'} alt="Gotong royong halaman surau" ratio="3 / 4"
            meta="Gotong Royong" icon="users" caption="Membersihkan lereng halaman." />
          <PhotoTile src={P + 'latihan-silat.jpg'} alt="Latihan silat di surau" ratio="3 / 4" position="center 35%"
            meta="Remaja" icon="users" caption="Latihan silat tradisi, malam pekanan." />
          <PhotoTile src={P + 'pengurus-surau.jpg'} alt="Pengurus surau" ratio="3 / 4" position="center 40%"
            meta="Pengurus" icon="users" caption="Pengurus dan tuanku selepas musyawarah." />
          <PhotoTile src={P + 'gotong-royong-jamaah.jpg'} alt="Jamaah bekerja di halaman" ratio="3 / 4"
            meta="Gotong Royong" icon="users" caption="Jamaah menanam di halaman atas." />
        </div>
      </div>
    </section>
  );
}

function ProfilePage() {
  const P = '../../assets/photos/';
  const mobile = useKit();
  return (
    <div>
      <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr 1fr', gap: mobile ? 'var(--space-8)' : 'var(--space-16)', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', alignItems: 'flex-start' }}>
            <Badge tone="brand" icon="map-pin">Lori Lubuk Minturun, Kota Padang</Badge>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-extrabold)', lineHeight: 'var(--lh-snug)', fontSize: mobile ? 'var(--fs-h2)' : 'var(--fs-h1)', color: 'var(--text-strong)', textWrap: 'balance' }}>Dibangun bersama, dari halaman yang masih tanah</h1>
            <p style={{ margin: 0, font: 'var(--text-body-default)', color: 'var(--text-muted)', maxWidth: 480, textWrap: 'pretty' }}>
              Surau Bateh Lori berdiri di lereng bukit di tepi nagari. Bangunan dua lantai dengan surambi kayu ini dikerjakan bertahap oleh jamaah sendiri — dari tiang beton dan tumpukan batu bata sampai ruang salat berkarpet yang dipakai hari ini.
            </p>
            <p style={{ margin: 0, font: 'var(--text-body-default)', color: 'var(--text-muted)', maxWidth: 480, textWrap: 'pretty' }}>
              Setiap pekan halaman dan lerengnya dibersihkan bergiliran. Pekerjaan itu tidak pernah selesai, dan justru dari situ surau ini hidup.
            </p>
          </div>
          <PhotoTile src={P + 'pembangunan-surau.jpg'} alt="Masa pembangunan surau" ratio="4 / 5" position="center 45%"
            meta="Masa Pembangunan" icon="hammer" caption="Memasang dinding bata di sisi surambi bawah." />
        </div>
      </section>
      <section style={{ background: 'var(--surface-dark)', padding: pad(mobile) }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr 1fr', gap: mobile ? 'var(--space-8)' : 'var(--space-12)', alignItems: 'center' }}>
          <PhotoTile src={P + 'gotong-royong-belakang.jpg'} alt="Membersihkan sisi belakang surau" ratio="4 / 3" position="center 55%"
            meta="Gotong Royong" icon="users" caption="Merapikan area surau" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <h2 style={{ margin: 0, font: 'var(--text-h2)', color: 'var(--sand-100)', textWrap: 'balance' }}>Dikelola pengurus, dikerjakan jamaah</h2>
            <p style={{ margin: 0, font: 'var(--text-body-default)', color: 'var(--slate-300)', maxWidth: 460, textWrap: 'pretty' }}>
              Pengurus surau mengatur jadwal khatib, kajian pekanan, dan laporan kas bulanan. Kegiatan hariannya dijalankan bergiliran oleh jamaah sekitar.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'var(--space-4)' }}>
              <StatBlock tone="dark" icon="users" value="180" label="Jamaah rutin Subuh" />
              <StatBlock tone="dark" icon="mic" value="8" label="Kajian per bulan" />
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: pad(mobile), background: 'var(--sand-100)' }}>
        <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto' }}>
          <SectionHeading overline="Roadmap" title="Tahapan pembangunan surau"
            description="Dikerjakan bertahap sesuai dana infak yang terkumpul." />
          <Card style={{ marginTop: 'var(--space-8)', padding: mobile ? 'var(--space-5)' : 'var(--space-8)' }}>
            <Timeline variant="roadmap" items={window.SB_DATA.roadmap} />
          </Card>
          <Card tone="sand" style={{ marginTop: 'var(--space-6)' }}>
            <span style={{ fontSize: 'var(--fs-overline)', letterSpacing: 'var(--ls-overline)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Silsilah guru surau</span>
            <p style={{ margin: '8px 0 0', fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>
              Bagian ini sengaja dikosongkan sampai pengurus memastikan nama dan urutan mata rantainya. Strukturnya sudah siap: <code>&lt;Timeline variant="silsilah" /&gt;</code>.
            </p>
          </Card>
        </div>
      </section>
      <section style={{ padding: pad(mobile), background: 'var(--sand-200)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <SectionHeading align="center" overline="Pengurus" title="Musyawarah pengurus dan tuanku" />
          <PhotoTile src={P + 'pengurus-surau.jpg'} alt="Pengurus surau berfoto bersama" ratio={mobile ? '4 / 3' : '16 / 7'} position="center 45%"
            style={{ marginTop: 'var(--space-8)' }} caption="Selepas musyawarah pengurus di ruang utama." />
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  const c = window.SB_DATA.contact;
  const mobile = useKit();
  return (
    <section style={{ padding: pad(mobile), background: 'var(--sand-200)', minHeight: 560 }}>
      <div style={{ maxWidth: 'var(--container-narrow)', margin: '0 auto' }}>
        <SectionHeading align="center" overline="Kontak" title="Menghubungi pengurus surau"
          description="Untuk pertanyaan jadwal kajian, khatib Jumat, atau penyaluran infak." />
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr)' : '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-8)' }}>
          {c.pengurus.map(p => (
            <Card key={p.name} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <span style={{ width: 42, height: 42, display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-md)', background: 'var(--surface-brand-soft)', color: 'var(--maroon-700)' }}>
                <Icon name="user" size={20} />
              </span>
              <div>
                <div style={{ font: 'var(--text-h4)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{p.name}</div>
                <div style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>{p.role}</div>
              </div>
              <a href={'tel:' + p.phone} style={{ display: 'flex', alignItems: 'center', gap: 8, font: 'var(--text-label)', fontSize: 'var(--fs-body)', textDecoration: 'none', fontVariantNumeric: 'tabular-nums' }}>
                <Icon name="phone" size={16} />{p.phone}
              </a>
              <Button tone="secondary" size="sm" icon="message-circle" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>Kirim WhatsApp</Button>
            </Card>
          ))}
          <Card tone="sand" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <span style={{ width: 42, height: 42, display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-md)', background: 'var(--white)', color: 'var(--maroon-700)' }}>
              <Icon name="map-pin" size={20} />
            </span>
            <div>
              <div style={{ font: 'var(--text-h4)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>Lokasi surau</div>
              <div style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)' }}>Lori Lubuk Minturun, Kota Padang, Sumatera Barat</div>
            </div>
            <a href={c.maps} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, font: 'var(--text-label)', fontSize: 'var(--fs-body)', textDecoration: 'none', marginTop: 'auto' }}>
              <Icon name="map" size={16} />Buka di Google Maps
            </a>
          </Card>
        </div>
        <Card tone="calm" style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Icon name="clock" size={18} style={{ color: 'var(--teal-800)', marginTop: 2 }} />
          <p style={{ margin: 0, fontSize: 'var(--fs-body-sm)', color: 'var(--text-body)' }}>
            Pengurus paling mudah ditemui di surau selepas Maghrib. Jalan menuju surau menanjak — kabari lebih dahulu bila datang bersama rombongan.
          </p>
        </Card>
      </div>
    </section>
  );
}

Object.assign(window, { ProgramsSection, VerseSection, AgendaSection, StatsSection, GallerySection, ProfilePage, ContactPage });
