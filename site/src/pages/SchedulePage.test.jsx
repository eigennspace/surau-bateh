import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import SchedulePage from './SchedulePage.jsx';
import Hero from '../components/Hero.jsx';
import { deriveSiteData } from '../lib/deriveSiteData.js';

// Fixture dataset hasil generate, sama pola dengan deriveSiteData.test.js --
// mencakup beberapa tanggal berurutan supaya `now` manapun di rentang ini
// (dan "Pekan ini" 7 hari ke depan) punya data.
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

function baseRawData() {
  return {
    iqamahOffsets: IQAMAH_OFFSETS,
    events: [],
    programs: [], news: [], contact: { maps: '', pengurus: [] },
    stats: [{ icon: 'users', value: '180', label: 'Jamaah rutin Subuh' }],
    gallery: [],
    donation: { qris: 'qris.jpg', bank: { name: 'BSI', account: '1', holder: 'X' }, campaign: { active: false, title: '', description: '' } },
  };
}

describe('SchedulePage — tanggal yang ditampilkan mengikuti hari ini, bukan hardcode', () => {
  it('menampilkan label tanggal Masehi untuk `now` yang dipakai, walau `now` bukan 10 Agustus', () => {
    const now = new Date(2026, 7, 11, 10, 0); // 11 Agustus 2026 (bukan 10 Agustus, tanggal default hardcode DS)
    const site = deriveSiteData(baseRawData(), now, PRAYER_TIMES_DATASET);
    const html = renderToStaticMarkup(<SchedulePage site={site} />);

    expect(html).toContain('11 Agustus 2026');
    expect(html).not.toContain('Senin, 10 Agustus 2026');
  });
});

describe('Hero — kartu jadwal shalat di beranda juga mengikuti hari ini', () => {
  it('menampilkan label tanggal Masehi untuk `now` yang dipakai, walau `now` bukan 10 Agustus', () => {
    const now = new Date(2026, 7, 11, 10, 0); // 11 Agustus 2026
    const site = deriveSiteData(baseRawData(), now, PRAYER_TIMES_DATASET);
    const html = renderToStaticMarkup(<Hero site={site} onNavigate={() => {}} />);

    expect(html).toContain('11 Agustus 2026');
    expect(html).not.toContain('Senin, 10 Agustus 2026');
  });
});
