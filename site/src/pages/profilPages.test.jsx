import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import ProfilSurauPage from './ProfilSurauPage.jsx';
import ProfilSalikPage from './ProfilSalikPage.jsx';
import { deriveSiteData } from '../lib/deriveSiteData.js';
import { NOW, baseRawData } from './programPageTestFixtures.js';

// Halaman Profil (lihat CONTEXT.md) -- bukan Halaman Program, jadi berkas
// test-nya sendiri. Fixture-nya sengaja memakai teks yang TIDAK ada di Sumber
// Data sungguhan; itulah yang membuat test ini bisa membedakan "teks dibaca
// dari Sumber Data" dari "teks kebetulan sama karena masih hardcoded".
const profilSurau = {
  hero: {
    badge: 'Badge fixture',
    title: 'Judul hero fixture',
    paragraphs: ['Paragraf hero pertama fixture.', 'Paragraf hero kedua fixture.'],
    photo: { src: 'hero.jpg', alt: 'Alt hero fixture', meta: 'Meta hero fixture', icon: 'hammer', caption: 'Caption hero fixture' },
  },
  pengelolaan: {
    title: 'Judul pengelolaan fixture',
    paragraph: 'Paragraf pengelolaan fixture.',
    photo: { src: 'kelola.jpg', alt: 'Alt pengelolaan fixture', meta: 'Meta pengelolaan fixture', icon: 'users', caption: 'Caption pengelolaan fixture' },
  },
  silsilah: { overline: 'Overline silsilah fixture', title: 'Judul silsilah fixture' },
  pengurus: {
    overline: 'Overline pengurus fixture',
    title: 'Judul pengurus fixture',
    photo: { src: 'pengurus.jpg', alt: 'Alt pengurus fixture', caption: 'Caption pengurus fixture' },
  },
};

const salik = {
  title: 'Judul salik fixture',
  narrative: 'Narasi salik fixture.',
  bullets: ['**Karakter satu** — penjelasan satu fixture.', '**Karakter dua** — penjelasan dua fixture.'],
  closing: 'Penutup salik fixture.',
  gallery: [{ src: 'flyer.jpg', alt: 'Alt flyer fixture' }],
};

const rawData = () => baseRawData([], {
  profilSurau,
  salik,
  ilmuTasawuf: [{ title: 'Simpul silsilah fixture' }],
  stats: [{ icon: 'users', value: '>100', label: 'Label stat fixture' }],
  contact: { maps: '', pengurus: [], salik: { name: 'Kontak salik fixture', role: 'Peran salik fixture', phone: '081200000000' } },
});

const render = Page => renderToStaticMarkup(<Page site={deriveSiteData(rawData(), NOW)} />);

describe('ProfilSurauPage', () => {
  // Inti test ini: memindahkan belasan potong teks dari JSX ke Sumber Data
  // adalah kerja salin-tempel, dan satu paragraf yang tertinggal hardcoded
  // tidak akan terlihat mata karena halamannya tetap tampil normal.
  it('membaca seluruh teks dan caption foto dari Sumber Data', () => {
    const html = render(ProfilSurauPage);
    const expected = [
      'Badge fixture', 'Judul hero fixture', 'Paragraf hero pertama fixture.', 'Paragraf hero kedua fixture.',
      'Alt hero fixture', 'Meta hero fixture', 'Caption hero fixture',
      'Judul pengelolaan fixture', 'Paragraf pengelolaan fixture.',
      'Alt pengelolaan fixture', 'Meta pengelolaan fixture', 'Caption pengelolaan fixture',
      'Overline silsilah fixture', 'Judul silsilah fixture',
      'Overline pengurus fixture', 'Judul pengurus fixture', 'Alt pengurus fixture', 'Caption pengurus fixture',
    ];
    for (const text of expected) expect(html, `"${text}" tidak dirender dari Sumber Data`).toContain(text);
  });

  // Penjaga sebaliknya: kalau ada potongan yang masih hardcoded, ia akan
  // muncul di HTML meski fixture sama sekali tidak menyebutkannya.
  it('tidak menyisakan teks lama yang masih tertulis di JSX', () => {
    const html = render(ProfilSurauPage);
    const leftovers = [
      'Dibangun bersama', 'lereng bukit di tepi nagari', 'Dikelola pengurus, dikerjakan jamaah',
      'laporan kas bulanan', 'Ilmu Tasawuf', 'Musyawarah pengurus dan tuanku',
      'Masa Pembangunan', 'Gotong Royong', 'Lubuk Minturun',
    ];
    for (const text of leftovers) expect(html, `"${text}" masih hardcoded di JSX`).not.toContain(text);
  });

  it('tetap merender silsilah dan dua statistik pertama', () => {
    const html = render(ProfilSurauPage);
    expect(html).toContain('Simpul silsilah fixture');
    expect(html).toContain('Label stat fixture');
  });
});

describe('ProfilSalikPage', () => {
  it('menampilkan judul, narasi, penutup, dan kontak person dari Sumber Data', () => {
    const html = render(ProfilSalikPage);
    expect(html).toContain('Judul salik fixture');
    expect(html).toContain('Narasi salik fixture.');
    expect(html).toContain('Penutup salik fixture.');
    expect(html).toContain('Kontak salik fixture');
  });

  it('merender karakter sebagai daftar <ul> sungguhan, dengan judul yang ditebalkan', () => {
    const html = render(ProfilSalikPage);
    expect(html).toContain('<ul');
    expect(html).toContain('<li');
    expect(html).toContain('<strong>Karakter satu</strong>');
    expect(html).toContain('penjelasan dua fixture.');
    // Markup mentah tidak boleh bocor ke halaman.
    expect(html).not.toContain('**Karakter satu**');
  });

  it('memakai overline "Profil", bukan salah satu grup Halaman Program', () => {
    const html = render(ProfilSalikPage);
    const overlineAt = html.indexOf('Profil');
    const titleAt = html.indexOf('Judul salik fixture');
    expect(overlineAt).toBeGreaterThanOrEqual(0);
    expect(overlineAt).toBeLessThan(titleAt);
  });

  // Halaman ini menjelaskan karakter, bukan agenda -- `events` tidak dikirim,
  // jadi blok Jadwal tidak boleh muncul sama sekali (bukan sekadar kosong
  // berisi "Kegiatan akan segera hadir").
  it('tidak merender blok Jadwal', () => {
    const html = render(ProfilSalikPage);
    expect(html).not.toContain('Jadwal');
    expect(html).not.toContain('Kegiatan akan segera hadir');
  });

  it('menampilkan flyer di blok Dokumentasi', () => {
    const html = render(ProfilSalikPage);
    expect(html).toContain('Dokumentasi');
    expect(html).toContain('Alt flyer fixture');
  });
});
