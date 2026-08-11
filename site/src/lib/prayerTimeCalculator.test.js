import { describe, it, expect } from 'vitest';
import { computePrayerTimes } from './prayerTimeCalculator.js';

// Koordinat Surau Bateh Lori, Kota Padang (WIB/UTC+7).
const SURAU_BATEH_LORI = { latitude: -0.8317255, longitude: 100.4060905 };

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

describe('computePrayerTimes — invarian urutan', () => {
  const sampleDates = [
    new Date(2026, 0, 15),
    new Date(2026, 3, 1),
    new Date(2026, 6, 20),
    new Date(2026, 11, 10),
  ];

  for (const date of sampleDates) {
    it(`Subuh < Syuruq < Dzuhur < Ashar < Maghrib < Isya pada ${date.toDateString()}`, () => {
      const times = computePrayerTimes({ ...SURAU_BATEH_LORI, date });
      const order = ['subuh', 'syuruq', 'dzuhur', 'ashar', 'maghrib', 'isya'].map(
        name => toMinutes(times[name]),
      );
      for (let i = 1; i < order.length; i++) {
        expect(order[i]).toBeGreaterThan(order[i - 1]);
      }
    });
  }
});

describe('computePrayerTimes — kasus tepi tanggal', () => {
  it('pergantian tahun 31 Des → 1 Jan tidak error, dan tetap konsisten', () => {
    const dec31 = computePrayerTimes({ ...SURAU_BATEH_LORI, date: new Date(2025, 11, 31) });
    const jan1 = computePrayerTimes({ ...SURAU_BATEH_LORI, date: new Date(2026, 0, 1) });

    for (const times of [dec31, jan1]) {
      expect(toMinutes(times.subuh)).toBeLessThan(toMinutes(times.syuruq));
      expect(toMinutes(times.isya)).toBeGreaterThan(toMinutes(times.maghrib));
    }
  });
});

describe('computePrayerTimes — bentuk output', () => {
  it('mengembalikan enam jam dalam format HH:MM', () => {
    const times = computePrayerTimes({ ...SURAU_BATEH_LORI, date: new Date(2026, 7, 10) });
    expect(Object.keys(times).sort()).toEqual(
      ['ashar', 'dzuhur', 'isya', 'maghrib', 'subuh', 'syuruq'].sort(),
    );
    for (const value of Object.values(times)) {
      expect(value).toMatch(/^\d{2}:\d{2}$/);
    }
  });
});

// Titik referensi nyata Kemenag: NOT INCLUDED.
//
// Norma proyek ini melarang mengarang angka referensi. Ticket ini meminta
// implementer mengonfirmasi minimal satu titik jadwal resmi Kemenag untuk
// Kota Padang pada tanggal tertentu, dibandingkan dengan toleransi kecil
// (mis. ±1 menit), sebelum menulis assersinya.
//
// WebFetch/WebSearch tidak tersedia (error infrastruktur) sepanjang sesi
// implementasi ini, sehingga angka itu tidak bisa dikonfirmasi tanpa
// mengarang. Tes ini SENGAJA belum ditulis -- lihat catatan di ADR 0004 dan
// tindak lanjuti secara manual: buka jadwal shalat Kemenag untuk Kota Padang
// (mis. bimasislam.kemenag.go.id) untuk satu tanggal, lalu tambahkan test
// case di atas yang membandingkan `computePrayerTimes` terhadap angka itu.
