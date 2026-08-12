import { describe, it, expect } from 'vitest';
import { deriveSiteData } from './deriveSiteData.js';

function baseRawData(overrides = {}) {
  return {
    events: [],
    programs: [{ title: 'Program A' }],
    news: [{ title: 'Berita A' }],
    contact: { maps: 'https://maps.example', pengurus: [] },
    stats: [{ icon: 'users', value: '180', label: 'Jamaah rutin Subuh' }],
    gallery: [{ src: 'foto.jpg', alt: 'Foto', ratio: '4 / 3' }],
    donation: {
      qris: 'qris.jpg',
      bank: { name: 'BSI', account: '7771 806 168', holder: 'PONPES RIBATH AS SA ADY' },
      campaign: { active: false, title: 'Renovasi Atap Surau', description: 'Deskripsi kampanye.' },
    },
    ...overrides,
  };
}

describe('deriveSiteData — khatibJumat', () => {
  it('memilih entri "Jumat" terdekat saat beberapa entri Jumat ada di events', () => {
    const now = new Date(2026, 7, 1, 8, 0); // 1 Agustus 2026
    const events = [
      { day: '8', month: 'Ags', title: 'Khutbah A', category: 'Jumat' },
      { day: '15', month: 'Ags', title: 'Khutbah B', category: 'Jumat' },
      { day: '1', month: 'Ags', title: 'Kajian biasa', category: 'Kajian Rutin' },
    ];
    const result = deriveSiteData(baseRawData({ events }), now);
    expect(result.khatibJumat.title).toBe('Khutbah A');
  });

  it('tidak ada entri berkategori Jumat → null, tanpa error', () => {
    const now = new Date(2026, 7, 10);
    const events = [{ day: '12', month: 'Ags', title: 'Kajian Tafsir', category: 'Kajian Rutin' }];
    const result = deriveSiteData(baseRawData({ events }), now);
    expect(result.khatibJumat).toBeNull();
  });
});

describe('deriveSiteData — events isToday', () => {
  it('menandai isToday true hanya pada event mingguan yang `day`-nya cocok hari ini', () => {
    const now = new Date(2026, 7, 10, 10, 0); // Senin, 10 Agustus 2026
    const events = [
      { day: 'Sen', month: 'Malam', title: 'Tawajjuh', category: 'Tawajjuh' },
      { day: 'Kam', month: 'Malam', title: 'Tawajjuh', category: 'Tawajjuh' },
      { day: 'Sen', month: 'Pagi', title: 'Kajian Lain', category: 'Kajian' },
    ];
    const result = deriveSiteData(baseRawData({ events }), now);
    expect(result.events.map(e => e.isToday)).toEqual([true, false, true]);
  });

  it('tidak pernah menandai isToday pada event kategori Jumat, walau `day` (tanggal) kebetulan cocok dengan angka hari', () => {
    const now = new Date(2026, 7, 10, 10, 0); // 10 Agustus 2026 — tanggal 10
    const events = [
      { day: '10', month: 'Ags', title: 'Khutbah Jumat', category: 'Jumat' },
    ];
    const result = deriveSiteData(baseRawData({ events }), now);
    expect(result.events[0].isToday).toBe(false);
  });
});

describe('deriveSiteData — donation', () => {
  it('kampanye aktif → menyertakan judul & deskripsi', () => {
    const now = new Date(2026, 7, 10);
    const donation = {
      qris: 'qris.jpg',
      bank: { name: 'BSI', account: '7771 806 168', holder: 'PONPES RIBATH AS SA ADY' },
      campaign: { active: true, title: 'Renovasi Atap Surau', description: 'Menunggu dana infak jamaah.' },
    };
    const result = deriveSiteData(baseRawData({ donation }), now);
    expect(result.donation.campaign).toEqual({
      title: 'Renovasi Atap Surau',
      description: 'Menunggu dana infak jamaah.',
    });
    expect(result.donation.qris).toBe('qris.jpg');
    expect(result.donation.bank).toEqual(donation.bank);
  });

  it('kampanye tidak aktif → hanya QRIS + rekening', () => {
    const now = new Date(2026, 7, 10);
    const result = deriveSiteData(baseRawData(), now); // campaign.active: false by default
    expect(result.donation.campaign).toBeNull();
    expect(result.donation.qris).toBe('qris.jpg');
    expect(result.donation.bank).toEqual({ name: 'BSI', account: '7771 806 168', holder: 'PONPES RIBATH AS SA ADY' });
  });
});

describe('deriveSiteData — field pass-through', () => {
  it('meneruskan programs, news, contact, stats, gallery tanpa mutasi', () => {
    const raw = baseRawData();
    const now = new Date(2026, 7, 10, 10, 0);
    const result = deriveSiteData(raw, now);

    expect(result.programs).toBe(raw.programs);
    expect(result.news).toBe(raw.news);
    expect(result.contact).toBe(raw.contact);
    expect(result.stats).toBe(raw.stats);
    expect(result.gallery).toBe(raw.gallery);

    // Input mentah tidak berubah setelah dipanggil.
    expect(raw).toEqual(baseRawData());
  });
});
