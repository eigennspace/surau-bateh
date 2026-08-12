import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import TawajjuhPage from './TawajjuhPage.jsx';
import KonselingPage from './KonselingPage.jsx';
import BaktiSosialPage from './BaktiSosialPage.jsx';
import SilaturahmiPage from './SilaturahmiPage.jsx';
import { deriveSiteData } from '../lib/deriveSiteData.js';
import { NOW, baseRawData } from './programPageTestFixtures.js';

// Empat Halaman Program yang lahir bersama restrukturisasi navigasi. Khitanan
// dan Dauroh punya berkas test sendiri karena aturan filter kategorinya lebih
// berliku (ejaan lama "Daurah", galeri dari Sumber Data).
const PAGES = [
  { name: 'TawajjuhPage', Page: TawajjuhPage, key: 'tawajjuh', overline: 'Kegiatan' },
  { name: 'KonselingPage', Page: KonselingPage, key: 'konseling', overline: 'Kegiatan' },
  { name: 'BaktiSosialPage', Page: BaktiSosialPage, key: 'baktiSosial', overline: 'Sosial' },
  { name: 'SilaturahmiPage', Page: SilaturahmiPage, key: 'silaturahmi', overline: 'Sosial' },
];

describe.each(PAGES)('$name', ({ Page, key, overline }) => {
  it('menampilkan judul, narasi, dan kontak person dari Sumber Data', () => {
    const site = deriveSiteData(baseRawData(), NOW);
    const html = renderToStaticMarkup(<Page site={site} />);

    expect(html).toContain(`Judul ${key}`);
    expect(html).toContain(`Narasi ${key}.`);
    expect(html).toContain(`Kontak ${key}`);
  });

  // Diperiksa lewat posisi, bukan sekadar `toContain`: kata "Kegiatan" juga
  // muncul di pesan "Kegiatan akan segera hadir" di bawah judul, jadi
  // pemeriksaan keberadaan saja akan lolos meski overline-nya hilang.
  it('menampilkan nama grup navigasi induknya sebagai overline, di atas judul', () => {
    const site = deriveSiteData(baseRawData(), NOW);
    const html = renderToStaticMarkup(<Page site={site} />);
    const overlineAt = html.indexOf(overline);
    const titleAt = html.indexOf(`Judul ${key}`);

    expect(overlineAt).toBeGreaterThanOrEqual(0);
    expect(overlineAt).toBeLessThan(titleAt);
  });
});

describe('TawajjuhPage — filter kategori', () => {
  it('menarik ketiga kategori kajian rutin yang dipakai Sumber Data', () => {
    const site = deriveSiteData(baseRawData([
      { day: 'Sel', month: 'Malam', title: 'Tawajjuh Selasa', speaker: 'Tuan Guru', time: 'Malam', place: 'Ruang utama', category: 'Tawajjuh' },
      { day: 'Sab', month: 'Malam', title: 'Kajian Sabtu', speaker: 'Tuan Guru', time: 'Malam', place: 'Ruang utama', category: 'Kajian & Tawajjuh' },
      { day: 'Min', month: 'Pagi', title: 'Pengenalan Rukun', speaker: 'Tuan Guru', time: '09:00', place: 'Ruang utama', category: 'Kajian' },
    ]), NOW);
    const html = renderToStaticMarkup(<TawajjuhPage site={site} />);

    expect(html).toContain('Tawajjuh Selasa');
    expect(html).toContain('Kajian Sabtu');
    expect(html).toContain('Pengenalan Rukun');
  });

  it('tidak ikut menarik event Dauroh maupun kegiatan sosial', () => {
    const site = deriveSiteData(baseRawData([
      { day: 'Kam', month: '13/08/26', title: 'Daurah Aswaja', speaker: 'Tuan Guru', time: 'Malam', place: 'Musholla', category: 'Dauroh' },
      { day: 'Sab', month: '20/09/26', title: 'Khitanan Massal', speaker: 'Tim medis', time: '08:00', place: 'Surau', category: 'Khitanan' },
    ]), NOW);
    const html = renderToStaticMarkup(<TawajjuhPage site={site} />);

    expect(html).not.toContain('Daurah Aswaja');
    expect(html).not.toContain('Khitanan Massal');
    expect(html).toContain('Kegiatan akan segera hadir');
  });
});

describe('KonselingPage', () => {
  // Konseling dilayani per perjanjian, jadi Sumber Data memang tidak punya
  // event berkategori ini -- halaman harus tetap tampil wajar, bukan kosong.
  it('menampilkan pesan jadwal saat tidak ada event, tanpa membocorkan event lain', () => {
    const site = deriveSiteData(baseRawData([
      { day: 'Sel', month: 'Malam', title: 'Tawajjuh Selasa', speaker: 'Tuan Guru', time: 'Malam', place: 'Ruang utama', category: 'Tawajjuh' },
    ]), NOW);
    const html = renderToStaticMarkup(<KonselingPage site={site} />);

    expect(html).toContain('Kegiatan akan segera hadir');
    expect(html).not.toContain('Tawajjuh Selasa');
  });
});
