import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import DaurohPage from './DaurohPage.jsx';
import { deriveSiteData } from '../lib/deriveSiteData.js';

const IQAMAH_OFFSETS = { Subuh: 12, Dzuhur: 14, Ashar: 12, Maghrib: 8, Isya: 9 };
const BASE_MINUTES = { subuh: 4 * 60 + 56, syuruq: 6 * 60 + 12, dzuhur: 12 * 60 + 14, ashar: 15 * 60 + 35, maghrib: 18 * 60 + 21, isya: 19 * 60 + 33 };
function toHHMM(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
const PRAYER_TIMES_DATASET = Array.from({ length: 20 }, (_, i) => {
  const day = i + 1;
  return {
    date: `2026-08-${String(day).padStart(2, '0')}`,
    subuh: toHHMM(BASE_MINUTES.subuh), syuruq: toHHMM(BASE_MINUTES.syuruq), dzuhur: toHHMM(BASE_MINUTES.dzuhur),
    ashar: toHHMM(BASE_MINUTES.ashar), maghrib: toHHMM(BASE_MINUTES.maghrib), isya: toHHMM(BASE_MINUTES.isya),
  };
});
const NOW = new Date(2026, 7, 10, 10, 0);

function baseRawData(events) {
  return {
    iqamahOffsets: IQAMAH_OFFSETS,
    events,
    programs: [], news: [],
    contact: {
      maps: '', pengurus: [],
      khitanan: { name: 'Angku Bosa', role: 'Kontak Program Khitanan', phone: '081374720759' },
      dauroh: { name: 'Muhammad Galang', role: 'Kontak Program Dauroh', phone: '082171136418' },
    },
    khitanan: { title: 'Khitanan', narrative: 'Narasi program khitanan surau.' },
    dauroh: { title: 'Dauroh', narrative: 'Narasi program dauroh surau.' },
    stats: [], gallery: [],
    donation: { qris: 'qris.jpg', bank: { name: 'BSI', account: '1', holder: 'X' }, campaign: { active: false, title: '', description: '' } },
  };
}

describe('DaurohPage', () => {
  it('menampilkan narasi program dan kontak person dengan nomor yang benar', () => {
    const site = deriveSiteData(baseRawData([]), NOW, PRAYER_TIMES_DATASET);
    const html = renderToStaticMarkup(<DaurohPage site={site} />);

    expect(html).toContain('Narasi program dauroh surau.');
    expect(html).toContain('Muhammad Galang');
    expect(html).toContain('082171136418');
  });

  it('menampilkan pesan "Kegiatan akan segera hadir" saat tidak ada event berkategori Dauroh', () => {
    const site = deriveSiteData(baseRawData([
      { day: 'Sel', month: 'Malam', title: 'Tawajjuh', speaker: 'Tuan Guru', time: 'Malam', place: 'Ruang utama', category: 'Tawajjuh' },
    ]), NOW, PRAYER_TIMES_DATASET);
    const html = renderToStaticMarkup(<DaurohPage site={site} />);

    expect(html).toContain('Kegiatan akan segera hadir');
    expect(html).not.toContain('Tawajjuh');
  });

  it('menampilkan event berkategori Dauroh (ejaan final), tidak ikut membocorkan event kategori lain', () => {
    const site = deriveSiteData(baseRawData([
      { day: 'Kam', month: '13/08/26', title: 'Daurah Aswaja', speaker: 'Tuan Guru', time: 'Malam', place: 'Musholla', category: 'Dauroh' },
      { day: 'Kam', month: 'Malam', title: 'Tawajjuh', speaker: 'Tuan Guru', time: 'Malam', place: 'Ruang utama', category: 'Tawajjuh' },
      { day: 'Min', month: 'Pagi', title: 'Kajian Pagi', speaker: 'Tuan Guru', time: '09:00', place: 'Ruang utama', category: 'Kajian' },
    ]), NOW, PRAYER_TIMES_DATASET);
    const html = renderToStaticMarkup(<DaurohPage site={site} />);

    expect(html).toContain('Daurah Aswaja');
    expect(html).not.toContain('Tawajjuh');
    expect(html).not.toContain('Kajian Pagi');
    expect(html).not.toContain('Kegiatan akan segera hadir');
  });

  it('juga menerima event dengan ejaan lama "Daurah" pada kategori (bukan hanya "Dauroh")', () => {
    const site = deriveSiteData(baseRawData([
      { day: 'Kam', month: '13/08/26', title: 'Daurah Ejaan Lama', speaker: 'Tuan Guru', time: 'Malam', place: 'Musholla', category: 'Daurah' },
    ]), NOW, PRAYER_TIMES_DATASET);
    const html = renderToStaticMarkup(<DaurohPage site={site} />);

    expect(html).toContain('Daurah Ejaan Lama');
    expect(html).not.toContain('Kegiatan akan segera hadir');
  });
});
