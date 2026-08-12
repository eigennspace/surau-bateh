import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import KhitananPage from './KhitananPage.jsx';
import { deriveSiteData } from '../lib/deriveSiteData.js';
import { NOW, baseRawData } from './programPageTestFixtures.js';

describe('KhitananPage', () => {
  it('menampilkan narasi program dan kontak person dengan nomor yang benar', () => {
    const site = deriveSiteData(baseRawData(), NOW);
    const html = renderToStaticMarkup(<KhitananPage site={site} />);

    expect(html).toContain('Narasi khitanan.');
    expect(html).toContain('Kontak khitanan');
    expect(html).toContain('081000000000');
  });

  it('menampilkan pesan "Kegiatan akan segera hadir" saat tidak ada event berkategori Khitanan', () => {
    const site = deriveSiteData(baseRawData([
      { day: 'Sel', month: 'Malam', title: 'Tawajjuh', speaker: 'Tuan Guru', time: 'Malam', place: 'Ruang utama', category: 'Tawajjuh' },
    ]), NOW);
    const html = renderToStaticMarkup(<KhitananPage site={site} />);

    expect(html).toContain('Kegiatan akan segera hadir');
    expect(html).not.toContain('Tawajjuh');
  });

  it('menampilkan event berkategori Khitanan, tidak ikut membocorkan event kategori lain', () => {
    const site = deriveSiteData(baseRawData([
      { day: 'Sab', month: '20/09/26', title: 'Khitanan Massal', speaker: 'Tim medis', time: '08:00', place: 'Surau', category: 'Khitanan' },
      { day: 'Kam', month: 'Malam', title: 'Tawajjuh', speaker: 'Tuan Guru', time: 'Malam', place: 'Ruang utama', category: 'Tawajjuh' },
      { day: 'Min', month: 'Pagi', title: 'Kajian Pagi', speaker: 'Tuan Guru', time: '09:00', place: 'Ruang utama', category: 'Kajian' },
    ]), NOW);
    const html = renderToStaticMarkup(<KhitananPage site={site} />);

    expect(html).toContain('Khitanan Massal');
    expect(html).not.toContain('Tawajjuh');
    expect(html).not.toContain('Kajian Pagi');
    expect(html).not.toContain('Kegiatan akan segera hadir');
  });

  // Galeri pindah dari `import` di komponen halaman ke Sumber Data; test ini
  // yang menahan agar tidak diam-diam balik jadi hardcode.
  it('merender foto dokumentasi dari galeri di Sumber Data, bukan dari import di komponen', () => {
    const site = deriveSiteData(baseRawData([], {
      khitanan: {
        title: 'Khitanan',
        narrative: 'Narasi khitanan.',
        gallery: [{ src: '/foto-khitanan.jpeg', alt: 'Dokumentasi kegiatan khitanan' }],
      },
    }), NOW);
    const html = renderToStaticMarkup(<KhitananPage site={site} />);

    expect(html).toContain('/foto-khitanan.jpeg');
    expect(html).toContain('Dokumentasi');
  });

  it('tidak merender blok Dokumentasi saat galeri kosong', () => {
    const site = deriveSiteData(baseRawData(), NOW);
    const html = renderToStaticMarkup(<KhitananPage site={site} />);

    expect(html).not.toContain('Dokumentasi');
  });
});
