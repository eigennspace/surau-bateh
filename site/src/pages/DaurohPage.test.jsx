import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import DaurohPage from './DaurohPage.jsx';
import { deriveSiteData } from '../lib/deriveSiteData.js';
import { NOW, baseRawData } from './programPageTestFixtures.js';

describe('DaurohPage', () => {
  it('menampilkan narasi program dan kontak person dengan nomor yang benar', () => {
    const site = deriveSiteData(baseRawData(), NOW);
    const html = renderToStaticMarkup(<DaurohPage site={site} />);

    expect(html).toContain('Narasi dauroh.');
    expect(html).toContain('Kontak dauroh');
    expect(html).toContain('081000000001');
  });

  it('menampilkan pesan "Kegiatan akan segera hadir" saat tidak ada event berkategori Dauroh', () => {
    const site = deriveSiteData(baseRawData([
      { day: 'Sel', month: 'Malam', title: 'Tawajjuh', speaker: 'Tuan Guru', time: 'Malam', place: 'Ruang utama', category: 'Tawajjuh' },
    ]), NOW);
    const html = renderToStaticMarkup(<DaurohPage site={site} />);

    expect(html).toContain('Kegiatan akan segera hadir');
    expect(html).not.toContain('Tawajjuh');
  });

  it('menampilkan event berkategori Dauroh (ejaan final), tidak ikut membocorkan event kategori lain', () => {
    const site = deriveSiteData(baseRawData([
      { day: 'Kam', month: '13/08/26', title: 'Daurah Aswaja', speaker: 'Tuan Guru', time: 'Malam', place: 'Musholla', category: 'Dauroh' },
      { day: 'Kam', month: 'Malam', title: 'Tawajjuh', speaker: 'Tuan Guru', time: 'Malam', place: 'Ruang utama', category: 'Tawajjuh' },
      { day: 'Min', month: 'Pagi', title: 'Kajian Pagi', speaker: 'Tuan Guru', time: '09:00', place: 'Ruang utama', category: 'Kajian' },
    ]), NOW);
    const html = renderToStaticMarkup(<DaurohPage site={site} />);

    expect(html).toContain('Daurah Aswaja');
    expect(html).not.toContain('Tawajjuh');
    expect(html).not.toContain('Kajian Pagi');
    expect(html).not.toContain('Kegiatan akan segera hadir');
  });

  it('juga menerima event dengan ejaan lama "Daurah" pada kategori (bukan hanya "Dauroh")', () => {
    const site = deriveSiteData(baseRawData([
      { day: 'Kam', month: '13/08/26', title: 'Daurah Ejaan Lama', speaker: 'Tuan Guru', time: 'Malam', place: 'Musholla', category: 'Daurah' },
    ]), NOW);
    const html = renderToStaticMarkup(<DaurohPage site={site} />);

    expect(html).toContain('Daurah Ejaan Lama');
    expect(html).not.toContain('Kegiatan akan segera hadir');
  });
});
