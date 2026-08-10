import { describe, it, expect } from 'vitest';
import { deriveSiteData } from './deriveSiteData.js';

const times = [
  { name: 'Subuh', adzan: '04:58', iqamah: '05:10' },
  { name: 'Syuruq', adzan: '06:14' },
  { name: 'Dzuhur', adzan: '12:16', iqamah: '12:30' },
  { name: 'Ashar', adzan: '15:38', iqamah: '15:50' },
  { name: 'Maghrib', adzan: '18:24', iqamah: '18:32' },
  { name: 'Isya', adzan: '19:36', iqamah: '19:45' },
];

function baseRawData(overrides = {}) {
  return {
    times,
    events: [],
    programs: [{ title: 'Program A' }],
    news: [{ title: 'Berita A' }],
    // roadmap: [{ title: 'Tahap 1' }],
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

describe('deriveSiteData — activePrayerName/nextPrayerName', () => {
  it('sebelum Subuh: aktif Isya (hari sebelumnya), berikutnya Subuh', () => {
    const now = new Date(2026, 7, 10, 3, 0); // 03:00
    const result = deriveSiteData(baseRawData(), now);
    expect(result.activePrayerName).toBe('Isya');
    expect(result.nextPrayerName).toBe('Subuh');
  });

  it('di antara Ashar dan Maghrib: aktif Ashar, berikutnya Maghrib', () => {
    const now = new Date(2026, 7, 10, 16, 40); // 16:40
    const result = deriveSiteData(baseRawData(), now);
    expect(result.activePrayerName).toBe('Ashar');
    expect(result.nextPrayerName).toBe('Maghrib');
  });

  it('setelah Isya, menjelang tengah malam: aktif Isya, berikutnya Subuh', () => {
    const now = new Date(2026, 7, 10, 23, 0); // 23:00
    const result = deriveSiteData(baseRawData(), now);
    expect(result.activePrayerName).toBe('Isya');
    expect(result.nextPrayerName).toBe('Subuh');
  });
});

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

// describe('deriveSiteData — field pass-through', () => {
//   it('meneruskan programs, news, roadmap, contact, stats, gallery tanpa mutasi', () => {
//     const raw = baseRawData();
//     const now = new Date(2026, 7, 10, 10, 0);
//     const result = deriveSiteData(raw, now);

//     expect(result.programs).toBe(raw.programs);
//     expect(result.news).toBe(raw.news);
//     expect(result.roadmap).toBe(raw.roadmap);
//     expect(result.contact).toBe(raw.contact);
//     expect(result.stats).toBe(raw.stats);
//     expect(result.gallery).toBe(raw.gallery);

//     // Input mentah tidak berubah setelah dipanggil.
//     expect(raw).toEqual(baseRawData());
//   });
// });
