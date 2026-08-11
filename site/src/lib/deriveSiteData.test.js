import { describe, it, expect } from 'vitest';
import { deriveSiteData } from './deriveSiteData.js';

const IQAMAH_OFFSETS = { Subuh: 12, Dzuhur: 14, Ashar: 12, Maghrib: 8, Isya: 9 };

// Fixture dataset hasil generate — dipakai langsung di tes (bukan dihitung
// ulang oleh `computePrayerTimes`), supaya tes seam ini tetap tidak
// bergantung pada astronomi. Jam-jam di bawah meniru pola pergeseran nyata
// (naik ~1 menit tiap beberapa hari) tapi tidak perlu akurat astronomis —
// hanya perlu berbeda per tanggal supaya tes bisa memverifikasi entri yang
// tepat dipilih. Mencakup 1–16 Agustus 2026 tanpa celah, supaya tabel
// "Pekan ini" (7 hari berurutan) selalu punya data untuk `now` manapun yang
// dipakai tes di berkas ini.
const BASE_MINUTES = { subuh: 4 * 60 + 56, syuruq: 6 * 60 + 12, dzuhur: 12 * 60 + 14, ashar: 15 * 60 + 35, maghrib: 18 * 60 + 21, isya: 19 * 60 + 33 };
function toHHMM(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
const PRAYER_TIMES_DATASET = Array.from({ length: 16 }, (_, i) => {
  const day = i + 1;
  const drift = Math.floor(i / 3); // naik pelan tiap ~3 hari
  return {
    date: `2026-08-${String(day).padStart(2, '0')}`,
    subuh: toHHMM(BASE_MINUTES.subuh + drift),
    syuruq: toHHMM(BASE_MINUTES.syuruq + drift),
    dzuhur: toHHMM(BASE_MINUTES.dzuhur + drift),
    ashar: toHHMM(BASE_MINUTES.ashar + drift),
    maghrib: toHHMM(BASE_MINUTES.maghrib + drift),
    isya: toHHMM(BASE_MINUTES.isya + drift),
  };
});

function baseRawData(overrides = {}) {
  return {
    iqamahOffsets: IQAMAH_OFFSETS,
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

describe('deriveSiteData — times hari ini', () => {
  it('bersumber dari entri dataset yang cocok dengan iqamahOffsets diterapkan (Syuruq dikecualikan)', () => {
    const now = new Date(2026, 7, 10, 10, 0); // 10 Agustus 2026
    const result = deriveSiteData(baseRawData(), now, PRAYER_TIMES_DATASET);

    expect(result.times).toEqual([
      { name: 'Subuh', adzan: '04:59', iqamah: '05:11' },
      { name: 'Syuruq', adzan: '06:15' },
      { name: 'Dzuhur', adzan: '12:17', iqamah: '12:31' },
      { name: 'Ashar', adzan: '15:38', iqamah: '15:50' },
      { name: 'Maghrib', adzan: '18:24', iqamah: '18:32' },
      { name: 'Isya', adzan: '19:36', iqamah: '19:45' },
    ]);
  });

  it('melempar error jelas bila tanggal hari ini tidak ada di dataset', () => {
    const now = new Date(2030, 0, 1);
    expect(() => deriveSiteData(baseRawData(), now, PRAYER_TIMES_DATASET)).toThrow(/2030-01-01/);
  });
});

describe('deriveSiteData — week', () => {
  it('berisi 7 tanggal berurutan mulai hari ini, tiap entri punya offset iqamah diterapkan', () => {
    const now = new Date(2026, 7, 10, 10, 0);
    const result = deriveSiteData(baseRawData(), now, PRAYER_TIMES_DATASET);

    expect(result.week.map(d => d.date)).toEqual([
      '2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13',
      '2026-08-14', '2026-08-15', '2026-08-16',
    ]);
    expect(result.week[0].times.find(t => t.name === 'Subuh')).toEqual({ name: 'Subuh', adzan: '04:59', iqamah: '05:11' });
    expect(result.week[6].times.find(t => t.name === 'Isya')).toEqual({ name: 'Isya', adzan: '19:38', iqamah: '19:47' });
  });

  it('melempar error jelas bila jangkauan dataset tidak mencukupi 7 hari', () => {
    const now = new Date(2026, 7, 15, 10, 0); // hanya 2 hari lagi tersedia di fixture (15, 16)
    expect(() => deriveSiteData(baseRawData(), now, PRAYER_TIMES_DATASET)).toThrow(/2026-08-17/);
  });
});

describe('deriveSiteData — activePrayerName/nextPrayerName', () => {
  it('sebelum Subuh: aktif Isya (hari sebelumnya), berikutnya Subuh', () => {
    const now = new Date(2026, 7, 10, 3, 0); // 03:00
    const result = deriveSiteData(baseRawData(), now, PRAYER_TIMES_DATASET);
    expect(result.activePrayerName).toBe('Isya');
    expect(result.nextPrayerName).toBe('Subuh');
  });

  it('di antara Ashar dan Maghrib: aktif Ashar, berikutnya Maghrib', () => {
    const now = new Date(2026, 7, 10, 16, 40); // 16:40
    const result = deriveSiteData(baseRawData(), now, PRAYER_TIMES_DATASET);
    expect(result.activePrayerName).toBe('Ashar');
    expect(result.nextPrayerName).toBe('Maghrib');
  });

  it('setelah Isya, menjelang tengah malam: aktif Isya, berikutnya Subuh', () => {
    const now = new Date(2026, 7, 10, 23, 0); // 23:00
    const result = deriveSiteData(baseRawData(), now, PRAYER_TIMES_DATASET);
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
    const result = deriveSiteData(baseRawData({ events }), now, PRAYER_TIMES_DATASET);
    expect(result.khatibJumat.title).toBe('Khutbah A');
  });

  it('tidak ada entri berkategori Jumat → null, tanpa error', () => {
    const now = new Date(2026, 7, 10);
    const events = [{ day: '12', month: 'Ags', title: 'Kajian Tafsir', category: 'Kajian Rutin' }];
    const result = deriveSiteData(baseRawData({ events }), now, PRAYER_TIMES_DATASET);
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
    const result = deriveSiteData(baseRawData({ donation }), now, PRAYER_TIMES_DATASET);
    expect(result.donation.campaign).toEqual({
      title: 'Renovasi Atap Surau',
      description: 'Menunggu dana infak jamaah.',
    });
    expect(result.donation.qris).toBe('qris.jpg');
    expect(result.donation.bank).toEqual(donation.bank);
  });

  it('kampanye tidak aktif → hanya QRIS + rekening', () => {
    const now = new Date(2026, 7, 10);
    const result = deriveSiteData(baseRawData(), now, PRAYER_TIMES_DATASET); // campaign.active: false by default
    expect(result.donation.campaign).toBeNull();
    expect(result.donation.qris).toBe('qris.jpg');
    expect(result.donation.bank).toEqual({ name: 'BSI', account: '7771 806 168', holder: 'PONPES RIBATH AS SA ADY' });
  });
});

describe('deriveSiteData — field pass-through', () => {
  it('meneruskan programs, news, contact, stats, gallery tanpa mutasi', () => {
    const raw = baseRawData();
    const now = new Date(2026, 7, 10, 10, 0);
    const result = deriveSiteData(raw, now, PRAYER_TIMES_DATASET);

    expect(result.programs).toBe(raw.programs);
    expect(result.news).toBe(raw.news);
    expect(result.contact).toBe(raw.contact);
    expect(result.stats).toBe(raw.stats);
    expect(result.gallery).toBe(raw.gallery);

    // Input mentah tidak berubah setelah dipanggil.
    expect(raw).toEqual(baseRawData());
  });
});
