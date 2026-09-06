import { describe, it, expect } from 'vitest';
import { ekstrakKoordinat, hostDiizinkan } from './lokasi.js';

describe('ekstrakKoordinat', () => {
  it('pasangan koordinat polos "lat,lng"', () => {
    expect(ekstrakKoordinat('-0.9, 100.4')).toEqual({ latitude: -0.9, longitude: 100.4 });
  });

  it('pasangan koordinat polos tanpa spasi', () => {
    expect(ekstrakKoordinat('-0.9,100.4')).toEqual({ latitude: -0.9, longitude: 100.4 });
  });

  it('URL Google Maps dengan pola @lat,lng,zoom', () => {
    expect(ekstrakKoordinat('https://www.google.com/maps/@-0.9,100.4,17z')).toEqual({ latitude: -0.9, longitude: 100.4 });
  });

  it('URL Google Maps place dengan pola @lat,lng di tengah path', () => {
    const url = 'https://www.google.com/maps/place/Surau+Bateh+Lori/@-0.9,100.4,17z/data=!3m1!4b1';
    expect(ekstrakKoordinat(url)).toEqual({ latitude: -0.9, longitude: 100.4 });
  });

  it('URL dengan data pin !3d{lat}!4d{lng} bila tidak ada pola @', () => {
    const url = 'https://www.google.com/maps/place/data=!3d-0.9!4d100.4';
    expect(ekstrakKoordinat(url)).toEqual({ latitude: -0.9, longitude: 100.4 });
  });

  it('URL query ?q=lat,lng', () => {
    expect(ekstrakKoordinat('https://maps.google.com/?q=-0.9,100.4')).toEqual({ latitude: -0.9, longitude: 100.4 });
  });

  it('null untuk teks yang tidak mengandung koordinat', () => {
    expect(ekstrakKoordinat('https://maps.app.goo.gl/abc123')).toBeNull();
    expect(ekstrakKoordinat('bukan koordinat')).toBeNull();
    expect(ekstrakKoordinat('')).toBeNull();
    expect(ekstrakKoordinat(null)).toBeNull();
  });

  it('null untuk koordinat di luar jangkauan valid', () => {
    expect(ekstrakKoordinat('999,999')).toBeNull();
  });
});

describe('hostDiizinkan', () => {
  it('true untuk domain Google Maps', () => {
    expect(hostDiizinkan('https://www.google.com/maps/@-0.9,100.4,17z')).toBe(true);
    expect(hostDiizinkan('https://maps.app.goo.gl/abc123')).toBe(true);
    expect(hostDiizinkan('https://goo.gl/maps/abc')).toBe(true);
  });

  it('false untuk domain lain (cegah SSRF lewat endpoint resolve-lokasi)', () => {
    expect(hostDiizinkan('https://evil.example.com/@-0.9,100.4')).toBe(false);
    expect(hostDiizinkan('http://169.254.169.254/latest/meta-data')).toBe(false);
  });

  it('false untuk teks yang bukan URL valid', () => {
    expect(hostDiizinkan('bukan url')).toBe(false);
  });
});
