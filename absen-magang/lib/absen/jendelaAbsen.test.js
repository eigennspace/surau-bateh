import { describe, it, expect } from 'vitest';
import { jarakMeter, evaluasiJendela } from './jendelaAbsen.js';

const SURAU = { latitude: -0.9, longitude: 100.4 };
const JENDELA = { ...SURAU, radiusMeter: 100, jamMulai: '07:00', jamSelesai: '16:00' };

describe('jarakMeter', () => {
  it('0 untuk titik yang sama', () => {
    expect(jarakMeter(SURAU, SURAU)).toBeCloseTo(0, 3);
  });

  it('jarak besar untuk titik yang jauh', () => {
    expect(jarakMeter(SURAU, { latitude: SURAU.latitude + 1, longitude: SURAU.longitude })).toBeGreaterThan(100000);
  });
});

describe('evaluasiJendela', () => {
  it('sesuai jendela: dalam radius dan dalam jam kerja', () => {
    const hasil = evaluasiJendela({ ...SURAU, waktu: new Date('2026-02-01T08:00:00') }, JENDELA);
    expect(hasil.sesuaiJendela).toBe(true);
  });

  it('di luar radius saja -> tidak sesuai', () => {
    const hasil = evaluasiJendela(
      { latitude: SURAU.latitude + 1, longitude: SURAU.longitude, waktu: new Date('2026-02-01T08:00:00') },
      JENDELA,
    );
    expect(hasil.dalamRadius).toBe(false);
    expect(hasil.sesuaiJendela).toBe(false);
  });

  it('di luar jam kerja saja -> tidak sesuai', () => {
    const hasil = evaluasiJendela({ ...SURAU, waktu: new Date('2026-02-01T20:00:00') }, JENDELA);
    expect(hasil.dalamJamKerja).toBe(false);
    expect(hasil.sesuaiJendela).toBe(false);
  });

  it('Jendela Absen belum diatur -> selalu tidak sesuai (aman, bukan default lolos)', () => {
    const hasil = evaluasiJendela({ ...SURAU, waktu: new Date('2026-02-01T08:00:00') }, null);
    expect(hasil.sesuaiJendela).toBe(false);
  });
});
