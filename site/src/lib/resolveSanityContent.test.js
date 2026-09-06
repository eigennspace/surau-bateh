import { describe, it, expect } from 'vitest';
import { objectPositionFromHotspot, resolveImage, resolveBody, resolveArticles, resolveGallery, extractYoutubeVideoId, resolveVideo, resolveEvents, resolveNews, resolveProgram, resolveContact, resolveSalik } from './resolveSanityContent.js';

// `urlFor` palsu -- meniru bentuk builder `@sanity/image-url` (method
// chaining `.auto()`/`.width()`/`.url()`) tanpa memanggil Sanity sungguhan.
function fakeUrlFor(source) {
  const params = {};
  const builder = {
    auto: () => builder,
    width: w => { params.width = w; return builder; },
    url: () => `https://cdn.example.test/${source.asset._ref}${params.width ? `?w=${params.width}` : ''}`,
  };
  return builder;
}

describe('objectPositionFromHotspot', () => {
  it('mengubah hotspot 0..1 jadi persentase CSS', () => {
    expect(objectPositionFromHotspot({ x: 0.5, y: 0.4 })).toBe('50% 40%');
  });

  it('undefined bila tidak ada hotspot', () => {
    expect(objectPositionFromHotspot(undefined)).toBeUndefined();
  });
});

describe('resolveImage', () => {
  it('null bila image tidak punya asset', () => {
    expect(resolveImage(fakeUrlFor, undefined)).toBeNull();
    expect(resolveImage(fakeUrlFor, {})).toBeNull();
  });

  it('menghasilkan url + position dari hotspot', () => {
    const result = resolveImage(fakeUrlFor, { asset: { _ref: 'img-1' }, hotspot: { x: 0.5, y: 0.35 } }, { width: 1200 });
    expect(result.url).toBe('https://cdn.example.test/img-1?w=1200');
    expect(result.position).toBe('50% 35%');
  });
});

describe('resolveBody', () => {
  it('menambahkan imageUrl ke blok image, blok lain diteruskan apa adanya', () => {
    const body = [
      { _type: 'block', _key: 'b1', children: [{ text: 'Halo' }] },
      { _type: 'image', _key: 'img1', asset: { _ref: 'img-2' } },
    ];
    const result = resolveBody(fakeUrlFor, body);
    expect(result[0]).toEqual(body[0]);
    expect(result[1].imageUrl).toBe('https://cdn.example.test/img-2?w=1200');
  });

  it('array kosong untuk body kosong/undefined', () => {
    expect(resolveBody(fakeUrlFor, undefined)).toEqual([]);
  });
});

describe('resolveArticles', () => {
  it('melewati dokumen tanpa slug, meresolve cover + body', () => {
    const docs = [
      { title: 'Tanpa slug', slug: undefined },
      {
        title: 'Judul', slug: 'judul', author: 'A', date: '2026-08-01', excerpt: 'x',
        cover: { asset: { _ref: 'cover-1' } },
        body: [{ _type: 'image', _key: 'i1', asset: { _ref: 'body-1' } }],
      },
    ];
    const result = resolveArticles(fakeUrlFor, docs);
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('judul');
    expect(result[0].cover).toBe('https://cdn.example.test/cover-1?w=1200');
    expect(result[0].body[0].imageUrl).toBe('https://cdn.example.test/body-1?w=1200');
  });
});

describe('resolveGallery', () => {
  it('melewati dokumen tanpa asset image, memetakan wide -> span', () => {
    const docs = [
      { alt: 'Tanpa gambar', image: undefined },
      { alt: 'Foto', caption: 'Caption', meta: 'Meta', ratio: '16 / 9', wide: true, image: { asset: { _ref: 'g-1' } } },
    ];
    const result = resolveGallery(fakeUrlFor, docs);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ alt: 'Foto', caption: 'Caption', meta: 'Meta', ratio: '16 / 9', span: 2 });
    expect(result[0].src).toBe('https://cdn.example.test/g-1?w=1200');
  });

  it('span undefined bila wide falsy', () => {
    const [item] = resolveGallery(fakeUrlFor, [{ image: { asset: { _ref: 'g-2' } } }]);
    expect(item.span).toBeUndefined();
  });
});

describe('extractYoutubeVideoId', () => {
  const ID = 'dQw4w9WgXcQ';

  it('menerima bentuk watch?v=, youtu.be/, dan /embed/ untuk ID video yang sama', () => {
    expect(extractYoutubeVideoId(`https://www.youtube.com/watch?v=${ID}`)).toBe(ID);
    expect(extractYoutubeVideoId(`https://youtu.be/${ID}`)).toBe(ID);
    expect(extractYoutubeVideoId(`https://www.youtube.com/embed/${ID}`)).toBe(ID);
  });

  it('membuang ekor penanda waktu/playlist dari hasil', () => {
    expect(extractYoutubeVideoId(`https://www.youtube.com/watch?v=${ID}&t=42s&list=PL123`)).toBe(ID);
    expect(extractYoutubeVideoId(`https://youtu.be/${ID}?t=42`)).toBe(ID);
  });

  it('menolak link Shorts', () => {
    expect(extractYoutubeVideoId(`https://www.youtube.com/shorts/${ID}`)).toBeNull();
  });

  it('null untuk URL kosong/sembarang/bukan YouTube', () => {
    expect(extractYoutubeVideoId(undefined)).toBeNull();
    expect(extractYoutubeVideoId('')).toBeNull();
    expect(extractYoutubeVideoId('bukan-url')).toBeNull();
    expect(extractYoutubeVideoId('https://vimeo.com/12345')).toBeNull();
    expect(extractYoutubeVideoId('https://www.youtube.com/channel/UC123')).toBeNull();
  });
});

describe('resolveVideo', () => {
  const ID = 'dQw4w9WgXcQ';
  const validDoc = { title: 'Judul video fixture', description: 'Paragraf pengantar fixture.', videoUrl: `https://youtu.be/${ID}` };

  it('null bila dokumen tidak ada, videoUrl kosong, atau URL sembarang', () => {
    expect(resolveVideo(undefined)).toBeNull();
    expect(resolveVideo({ title: 'X', videoUrl: '' })).toBeNull();
    expect(resolveVideo({ title: 'X', videoUrl: 'https://vimeo.com/1' })).toBeNull();
    expect(resolveVideo({ title: 'X', videoUrl: `https://www.youtube.com/shorts/${ID}` })).toBeNull();
  });

  it('embedUrl memakai domain youtube-nocookie', () => {
    const result = resolveVideo(validDoc);
    expect(result.embedUrl).toBe(`https://www.youtube-nocookie.com/embed/${ID}`);
  });

  it('thumbnailUrl memakai varian hqdefault dan ID video yang benar', () => {
    const result = resolveVideo(validDoc);
    expect(result.thumbnailUrl).toBe(`https://i.ytimg.com/vi/${ID}/hqdefault.jpg`);
  });

  it('title/description diteruskan apa adanya', () => {
    const result = resolveVideo(validDoc);
    expect(result.title).toBe('Judul video fixture');
    expect(result.description).toBe('Paragraf pengantar fixture.');
  });
});

describe('resolveEvents', () => {
  it('recurringEvent -> day = dayOfWeek, month dikosongkan, timeLabel jadi time', () => {
    const recurringDocs = [
      { dayOfWeek: 'Sel', timeLabel: "Ba'da Maghrib", title: 'Tawajjuh', speaker: 'Tuan Guru', place: 'Ruang utama', category: 'Tawajjuh' },
    ];
    const [event] = resolveEvents(recurringDocs, []);
    expect(event).toEqual({
      day: 'Sel', month: '', title: 'Tawajjuh', speaker: 'Tuan Guru', time: "Ba'da Maghrib", place: 'Ruang utama', category: 'Tawajjuh',
    });
  });

  it('oneOffEvent -> day/month dari `date` dalam bentuk yang dikenali deriveKhatibJumat/deriveEventsWithToday, ditambah dayName', () => {
    const oneOffDocs = [
      { date: '2026-08-13', timeLabel: "Ba'da Maghrib", title: 'Daurah Aswaja', speaker: 'Tuan Guru', place: 'Musholla Al Mukmin Berok', category: 'Dauroh' },
    ];
    const [event] = resolveEvents([], oneOffDocs);
    expect(event).toEqual({
      day: '13', month: 'Ags', dayName: 'Kamis', title: 'Daurah Aswaja', speaker: 'Tuan Guru', time: "Ba'da Maghrib", place: 'Musholla Al Mukmin Berok', category: 'Dauroh',
    });
  });

  it('oneOffEvent dayName cocok dengan hari-dalam-minggu tanggalnya', () => {
    // 2026-08-16 adalah hari Minggu.
    const [event] = resolveEvents([], [{ date: '2026-08-16', timeLabel: 'Pagi', title: 'Kegiatan Minggu', category: 'Kajian' }]);
    expect(event.dayName).toBe('Minggu');
  });

  it('menggabungkan recurringEvent + oneOffEvent jadi satu array', () => {
    const recurringDocs = [{ dayOfWeek: 'Sab', timeLabel: "Ba'da Isya", title: 'Latihan Silat', category: 'Silat' }];
    const oneOffDocs = [{ date: '2026-08-13', timeLabel: "Ba'da Maghrib", title: 'Daurah Aswaja', category: 'Dauroh' }];
    const result = resolveEvents(recurringDocs, oneOffDocs);
    expect(result).toHaveLength(2);
    expect(result.map(e => e.title)).toEqual(['Latihan Silat', 'Daurah Aswaja']);
  });

  it('oneOffEvent yang tanggalnya sudah lewat TETAP ditampilkan (tidak ada expiry -- persis perilaku data lama)', () => {
    const oneOffDocs = [{ date: '2020-01-01', timeLabel: 'Siang', title: 'Sudah lama lewat', category: 'Dauroh' }];
    const result = resolveEvents([], oneOffDocs);
    expect(result).toHaveLength(1);
  });

  it('array kosong untuk recurringDocs/oneOffDocs kosong/undefined', () => {
    expect(resolveEvents(undefined, undefined)).toEqual([]);
  });
});

// Regresi dipindah dari `src/data/sourceData.test.js` sejak tiket cutover
// (.scratch/jadwal-pengumuman-via-sanity/issues/03-cutover-hapus-events-news-lama.md)
// -- dulu menguji `SB_DATA.events` langsung, sekarang menguji hasil
// `resolveEvents` atas fixture yang menyalin isi kegiatan produksi saat ini
// (lihat riwayat `scripts/migrate-events-news-to-sanity.mjs`, sudah dihapus
// setelah dipakai), supaya invarian yang sama tetap terjaga meski
// sumbernya sekarang Sanity, bukan lagi berkas di repo ini.
describe('resolveEvents — regresi jadwal kegiatan produksi', () => {
  const recurringDocs = [
    { dayOfWeek: 'Sel', timeLabel: "Ba'da Maghrib", title: 'Tawajjuh', category: 'Tawajjuh' },
    { dayOfWeek: 'Kam', timeLabel: "Ba'da Maghrib", title: 'Tawajjuh', category: 'Tawajjuh' },
    { dayOfWeek: 'Sab', timeLabel: "Ba'da Isya", title: 'Latihan Silat Tradisi', category: 'Silat' },
    { dayOfWeek: 'Sab', timeLabel: "Ba'da Maghrib", title: 'Kajian & Tawajjuh', category: 'Kajian & Tawajjuh' },
    { dayOfWeek: 'Min', timeLabel: '09:00 WIB', title: '(Khusus Salik Baru) Pengenalan Tiga Rukun Agama', category: 'Kajian' },
    { dayOfWeek: 'Min', timeLabel: 'Siang', title: 'Kajian & Tawajjuh Jama\'ah Wanita', category: 'Kajian & Tawajjuh' },
    { dayOfWeek: 'Min', timeLabel: "Ba'da Maghrib", title: 'Tawajjuh & Penguatan Karakter Ikhlas Mahasiswa/i', category: 'Kajian & Tawajjuh' },
  ];
  const oneOffDocs = [
    { date: '2026-08-13', timeLabel: "Ba'da Maghrib", title: 'Daurah Aswaja', category: 'Dauroh' },
  ];

  // AgendaSection.jsx me-render tiap event dengan React key `${day}-${title}`
  // -- sebelumnya key itu hanya `title`, dan karena beberapa event berbagi
  // title yang sama ("Kajian & Tawajjuh" muncul 4x/pekan), key itu tabrakan
  // dan React salah mencocokkan node lama/baru saat filter kategori
  // berpindah bolak-balik, meninggalkan event "hantu" (kelihatan seperti
  // duplikasi data). Tes ini mengunci invarian itu supaya entri kegiatan
  // baru yang ditambah pengurus lewat Studio tidak diam-diam merusak key.
  it('menghasilkan key `${day}-${title}` yang unik untuk tiap kegiatan', () => {
    const events = resolveEvents(recurringDocs, oneOffDocs);
    const keys = events.map(e => `${e.day}-${e.title}`);
    expect(new Set(keys).size).toBe(keys.length);
  });

  // DaurohPage.jsx memfilter `site.events` berdasarkan `category === 'Dauroh'`
  // (bukan ejaan lama "Daurah") untuk menemukan jadwal Dauroh ("Daurah
  // Aswaja"). Tes ini mengunci ejaan kategori itu supaya perubahan
  // konten di Studio di masa depan tidak diam-diam merusak halaman Dauroh.
  it('memakai ejaan kategori "Dauroh" (bukan "Daurah")', () => {
    const categories = resolveEvents(recurringDocs, oneOffDocs).map(e => e.category);
    expect(categories).not.toContain('Daurah');
    expect(categories).toContain('Dauroh');
  });
});

describe('resolveNews', () => {
  it('memformat date ISO jadi string tanggal Indonesia, meneruskan tag/title apa adanya', () => {
    const docs = [{ tag: 'Pengumuman', title: 'Pendataan Data Salik', date: '2026-08-08', link: 'https://forms.gle/x', description: 'Deskripsi.' }];
    const result = resolveNews(docs);
    expect(result).toEqual([
      { tag: 'Pengumuman', title: 'Pendataan Data Salik', date: '8 Agustus 2026', link: 'https://forms.gle/x', description: 'Deskripsi.' },
    ]);
  });

  it('link/description kosong jadi undefined, bukan string kosong', () => {
    const [result] = resolveNews([{ tag: 'Pengumuman', title: 'X', date: '2026-08-08' }]);
    expect(result.link).toBeUndefined();
    expect(result.description).toBeUndefined();
  });

  it('array kosong untuk newsDocs kosong/undefined', () => {
    expect(resolveNews(undefined)).toEqual([]);
  });
});

describe('resolveProgram', () => {
  const person = { name: 'Kontak fixture', role: 'Peran fixture', phone: '081200000000' };

  it('galeri terisi -> src/alt/caption/meta/position ter-resolve, TANPA field ratio', () => {
    const doc = {
      title: 'Judul fixture', narrative: 'Narasi fixture.', person,
      gallery: [{ image: { asset: { _ref: 'g-1' }, hotspot: { x: 0.5, y: 0.4 } }, alt: 'Alt fixture', caption: 'Caption fixture', meta: 'Meta fixture' }],
    };
    const result = resolveProgram(fakeUrlFor, doc);
    expect(result.title).toBe('Judul fixture');
    expect(result.narrative).toBe('Narasi fixture.');
    expect(result.gallery).toHaveLength(1);
    expect(result.gallery[0]).toEqual({
      src: 'https://cdn.example.test/g-1?w=1200', alt: 'Alt fixture', position: '50% 40%', meta: 'Meta fixture', caption: 'Caption fixture',
    });
    expect(result.gallery[0].ratio).toBeUndefined();
  });

  it('galeri kosong/undefined tidak error, tetap array kosong', () => {
    expect(resolveProgram(fakeUrlFor, { title: 'X', narrative: 'Y', person, gallery: [] }).gallery).toEqual([]);
    expect(resolveProgram(fakeUrlFor, { title: 'X', narrative: 'Y', person }).gallery).toEqual([]);
  });

  it('meneruskan person (name/role/phone) apa adanya', () => {
    const result = resolveProgram(fakeUrlFor, { title: 'X', narrative: 'Y', person, gallery: [] });
    expect(result.person).toEqual(person);
  });

  it('markup **bold**/*italic* di narrative diteruskan mentah, tidak diparse', () => {
    const doc = { title: 'X', narrative: 'Teks **tebal** dan *miring*.', person, gallery: [] };
    expect(resolveProgram(fakeUrlFor, doc).narrative).toBe('Teks **tebal** dan *miring*.');
  });

  it('null bila dokumen belum pernah di-publish', () => {
    expect(resolveProgram(fakeUrlFor, null)).toBeNull();
    expect(resolveProgram(fakeUrlFor, undefined)).toBeNull();
  });
});

describe('resolveContact', () => {
  it('meneruskan address, dan maps dari field mapsUrl', () => {
    const doc = { address: 'Alamat fixture', mapsUrl: 'https://maps.example.test/x', pengurus: [] };
    const result = resolveContact(doc);
    expect(result.address).toBe('Alamat fixture');
    expect(result.maps).toBe('https://maps.example.test/x');
  });

  it('pengurus dikembalikan sebagai array, termasuk kasus 1 item', () => {
    const doc = { address: 'A', mapsUrl: 'https://x.test', pengurus: [{ name: 'Ustadz Anshor', role: 'Pengurus surau', phone: '081261246706' }] };
    const result = resolveContact(doc);
    expect(result.pengurus).toEqual([{ name: 'Ustadz Anshor', role: 'Pengurus surau', phone: '081261246706' }]);
  });

  it('pengurus array kosong untuk field kosong/undefined, tidak error', () => {
    expect(resolveContact({ address: 'A', mapsUrl: 'https://x.test' }).pengurus).toEqual([]);
  });

  it('null bila dokumen belum pernah di-publish', () => {
    expect(resolveContact(null)).toBeNull();
    expect(resolveContact(undefined)).toBeNull();
  });
});

describe('resolveSalik', () => {
  const person = { name: 'Kontak salik fixture', role: 'Peran salik fixture', phone: '081200000000' };

  it('bullets diteruskan sebagai array string, closing apa adanya', () => {
    const doc = { title: 'X', narrative: 'Y', bullets: ['**Satu** — a.', '**Dua** — b.'], closing: 'Penutup fixture.', person, gallery: [] };
    const result = resolveSalik(fakeUrlFor, doc);
    expect(result.bullets).toEqual(['**Satu** — a.', '**Dua** — b.']);
    expect(result.closing).toBe('Penutup fixture.');
  });

  it('bullets array kosong untuk field kosong/undefined, gallery kosong tidak error', () => {
    const result = resolveSalik(fakeUrlFor, { title: 'X', narrative: 'Y', closing: 'Z', person });
    expect(result.bullets).toEqual([]);
    expect(result.gallery).toEqual([]);
  });

  it('markup **bold** di bullets/closing/narrative diteruskan mentah, tidak diparse', () => {
    const doc = { title: 'X', narrative: '**Narasi tebal**', bullets: ['**Bullet tebal**'], closing: '**Penutup tebal**', person, gallery: [] };
    const result = resolveSalik(fakeUrlFor, doc);
    expect(result.narrative).toBe('**Narasi tebal**');
    expect(result.bullets[0]).toBe('**Bullet tebal**');
    expect(result.closing).toBe('**Penutup tebal**');
  });

  it('null bila dokumen belum pernah di-publish', () => {
    expect(resolveSalik(fakeUrlFor, null)).toBeNull();
    expect(resolveSalik(fakeUrlFor, undefined)).toBeNull();
  });
});
